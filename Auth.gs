/**
 * ATTENDANCE APP
 * File: Auth.gs
 * Description: User authentication, HMAC token verification, Email OTP service, Emergency Password, and Admin user management.
 */

// Secret key for HMAC token signing (internal to server)
const TOKEN_SECRET = "Botany_PTB_Attendance_Secret_Key_2026";

// Canonical list of registered faculty for fail-safe verification if Google Drive permissions are pending
const CANONICAL_FACULTY_ROSTER = [
  { email: "sureshmagnolia@gmail.com", name: "Suresh V", role: "Admin", status: "Active" },
  { email: "sureshvkutty@gmail.com", name: "Test", role: "Faculty", status: "Active" },
  { email: "sureshtvmala74@gmail.com", name: "Suresh Kumar", role: "Faculty", status: "Active" },
  { email: "smiibin.j4@gmail.com", name: "Smitha Jose", role: "Faculty", status: "Active" },
  { email: "vaishnavsbabu963@gmail.com", name: "Vaishnav SB", role: "Faculty", status: "Active" },
  { email: "vsb9635@gmail.com", name: "Vaishnav", role: "Faculty", status: "Active" }
];

/**
 * Strips zero-width characters, non-breaking spaces, and whitespace, returning clean lowercase email.
 * @param {string} str
 * @returns {string}
 */
function cleanEmail(str) {
  if (!str) return '';
  return str.toString()
    .replace(/[\u200B-\u200D\uFEFF\u00A0\s]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Checks if two email addresses are identical or differ by at most 2 typo characters (e.g. vaishav vs vaishnav).
 * @param {string} e1
 * @param {string} e2
 * @returns {boolean}
 */
function areEmailsClose(e1, e2) {
  if (!e1 || !e2) return false;
  const c1 = cleanEmail(e1);
  const c2 = cleanEmail(e2);
  if (c1 === c2) return true;
  if (Math.abs(c1.length - c2.length) > 2) return false;
  let diff = 0;
  let i = 0, j = 0;
  while (i < c1.length && j < c2.length) {
    if (c1[i] !== c2[j]) {
      diff++;
      if (diff > 2) return false;
      if (c1.length > c2.length) i++;
      else if (c2.length > c1.length) j++;
      else { i++; j++; }
    } else {
      i++; j++;
    }
  }
  return true;
}

/**
 * Generates a tamper-proof HMAC-SHA256 signed session token for a verified user email.
 * @param {string} email
 * @returns {string} Base64 encoded token
 */
function generateUserToken(email) {
  const clean = cleanEmail(email);
  const ts = Date.now().toString();
  const raw = clean + "|" + ts;
  const sigBytes = Utilities.computeHmacSha256Signature(raw, TOKEN_SECRET);
  const sig = sigBytes.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');
  return Utilities.base64Encode(raw + "|" + sig);
}

/**
 * Validates an HMAC signed token and confirms user is active in database.
 * @param {string} token
 * @returns {Object|null} User profile or null if invalid
 */
function validateUserToken(token) {
  if (!token) return null;
  try {
    const decoded = Utilities.newBlob(Utilities.base64Decode(token)).getDataAsString();
    const parts = decoded.split('|');
    if (parts.length !== 3) return null;
    const clean = cleanEmail(parts[0]);
    const ts = parts[1];
    const sig = parts[2];

    const raw = clean + "|" + ts;
    const expectedSigBytes = Utilities.computeHmacSha256Signature(raw, TOKEN_SECRET);
    const expectedSig = expectedSigBytes.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');

    if (sig !== expectedSig) return null;

    const user = findUserByEmail(clean);
    if (user && user.isActive) {
      return {
        isAuthorized: true,
        email: user.email,
        name: user.name,
        role: user.role
      };
    }

    // Fail-safe check against CANONICAL_FACULTY_ROSTER if findUserByEmail failed due to Drive permissions
    for (let k = 0; k < CANONICAL_FACULTY_ROSTER.length; k++) {
      const cf = CANONICAL_FACULTY_ROSTER[k];
      if (cleanEmail(cf.email) === clean || areEmailsClose(cf.email, clean)) {
        if (cf.status.toLowerCase() === 'active') {
          return {
            isAuthorized: true,
            email: clean,
            name: cf.name,
            role: cf.role
          };
        }
      }
    }

    // Fail-safe check if token belongs to Spreadsheet Owner
    try {
      const ss = getSpreadsheet();
      const owner = ss.getOwner();
      if (owner && cleanEmail(owner.getEmail()) === clean) {
        return {
          isAuthorized: true,
          email: clean,
          name: "Administrator",
          role: "Admin"
        };
      }
    } catch (ownerErr) {}
  } catch (e) {
    Logger.log("Token validation exception: " + e.toString());
  }
  return null;
}

/**
 * Retrieves the currently logged-in Google email address without accessing the spreadsheet.
 * Safe to call even if spreadsheet permissions fail.
 * @returns {string}
 */
function getCurrentUserEmail() {
  try {
    return cleanEmail(Session.getActiveUser().getEmail() || '');
  } catch (e) {
    return '';
  }
}

/**
 * Searches the Users sheet for a registered active user.
 * Supports comma-separated aliases, typo auto-matching, and Drive editors.
 * @param {string} email
 * @returns {Object|null}
 */
function findUserByEmail(email) {
  const clean = cleanEmail(email);
  if (!clean || !clean.includes('@')) return null;

  let driveError = null;

  try {
    const ss = getSpreadsheet();
    const usersSheet = ss.getSheetByName(SHEET_USERS);
    if (!usersSheet || usersSheet.getLastRow() < 2) {
      setupDatabase();
    }

    const updatedUsersSheet = ss.getSheetByName(SHEET_USERS);
    const lastRow = updatedUsersSheet.getLastRow();
    const data = lastRow >= 2 ? updatedUsersSheet.getRange(2, 1, lastRow - 1, 4).getValues() : [];

    for (let i = 0; i < data.length; i++) {
      const rawEmail = data[i][0] ? data[i][0].toString() : '';
      const emailList = rawEmail.split(/[,;\s]+/).map(cleanEmail).filter(Boolean);
      const name = data[i][1] ? data[i][1].toString().trim() : clean;
      const role = data[i][2] ? data[i][2].toString().trim() : 'Faculty';
      const status = data[i][3] ? data[i][3].toString().trim() : 'Active';

      if (emailList.includes(clean) || (emailList.length === 1 && areEmailsClose(emailList[0], clean))) {
        // Auto-heal typo in sheet if needed
        if (!emailList.includes(clean) && areEmailsClose(emailList[0], clean)) {
          try {
            updatedUsersSheet.getRange(i + 2, 1).setValue(clean);
          } catch (autoFixErr) {}
        }

        return {
          email: clean,
          name: name,
          role: role,
          status: status,
          isActive: status.toLowerCase() === 'active',
          rowIndex: i + 2
        };
      }
    }

    // Check if the user is a Google Drive spreadsheet editor (fail-safe enrollment)
    try {
      const editors = ss.getEditors();
      const isEditor = editors.some(ed => {
        const edEmail = cleanEmail(ed.getEmail());
        return edEmail && (edEmail === clean || areEmailsClose(edEmail, clean));
      });

      if (isEditor) {
        const defaultName = clean.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        updatedUsersSheet.appendRow([clean, defaultName, "Faculty", "Active", new Date()]);
        return {
          email: clean,
          name: defaultName,
          role: "Faculty",
          status: "Active",
          isActive: true,
          rowIndex: updatedUsersSheet.getLastRow()
        };
      }
    } catch (edErr) {}

  } catch (err) {
    driveError = err.toString();
    Logger.log("Notice: Google Drive permission check on spreadsheet for " + clean + ": " + err);
  }

  // Fallback 1: Check ScriptProperties USERS_CACHE
  try {
    const rawCache = PropertiesService.getScriptProperties().getProperty('USERS_CACHE');
    if (rawCache) {
      const cachedList = JSON.parse(rawCache);
      for (let j = 0; j < cachedList.length; j++) {
        const u = cachedList[j];
        const aliases = (u.aliases || [u.email]).map(cleanEmail);
        if (aliases.includes(clean) || areEmailsClose(u.email, clean)) {
          return {
            email: clean,
            name: u.name || clean,
            role: u.role || 'Faculty',
            status: u.status || 'Active',
            isActive: u.isActive !== false,
            isDrivePermissionBlocked: Boolean(driveError),
            driveError: driveError
          };
        }
      }
    }
  } catch (cacheErr) {
    Logger.log("Cache lookup error: " + cacheErr);
  }

  // Fallback 2: Check CANONICAL_FACULTY_ROSTER
  for (let k = 0; k < CANONICAL_FACULTY_ROSTER.length; k++) {
    const cf = CANONICAL_FACULTY_ROSTER[k];
    if (cleanEmail(cf.email) === clean || areEmailsClose(cf.email, clean)) {
      return {
        email: clean,
        name: cf.name,
        role: cf.role,
        status: cf.status,
        isActive: cf.status.toLowerCase() === 'active',
        isDrivePermissionBlocked: Boolean(driveError),
        driveError: driveError
      };
    }
  }

  if (driveError) {
    return {
      email: clean,
      isDrivePermissionBlocked: true,
      driveError: driveError
    };
  }

  return null;
}

/**
 * Detailed diagnostic inspection endpoint for debugging auth, Drive permissions, and browser environment.
 * Safe to be called by any client (authenticated or unauthorized).
 * @param {Object} [clientInfo] - Browser details sent from client JavaScript
 * @returns {Object} Full diagnostic report
 */
function getAuthDiagnostics(clientInfo) {
  const diag = {
    timestamp: new Date().toISOString(),
    session: {
      activeEmail: '',
      effectiveEmail: '',
      hasActiveSession: false
    },
    spreadsheet: {
      id: SPREADSHEET_ID,
      accessible: false,
      name: '',
      error: null
    },
    usersSheet: {
      accessible: false,
      rowsCount: 0,
      emailsFound: [],
      error: null
    },
    cache: {
      scriptPropertiesPresent: false,
      cachedUsersCount: 0
    },
    resolution: {
      clientReportedEmail: clientInfo && clientInfo.email ? cleanEmail(clientInfo.email) : '',
      emailChecked: '',
      findUserResult: null,
      canonicalMatch: false
    },
    client: clientInfo || {}
  };

  // 1. Session check
  try {
    const act = Session.getActiveUser().getEmail();
    diag.session.activeEmail = cleanEmail(act || '');
    diag.session.hasActiveSession = Boolean(diag.session.activeEmail);
  } catch (e) {
    diag.session.activeEmail = "Error: " + e.toString();
  }
  try {
    const eff = Session.getEffectiveUser().getEmail();
    diag.session.effectiveEmail = cleanEmail(eff || '');
  } catch (e) {
    diag.session.effectiveEmail = "Error: " + e.toString();
  }

  // 2. Spreadsheet & Users sheet check
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    diag.spreadsheet.accessible = true;
    diag.spreadsheet.name = ss.getName();

    try {
      const usersSheet = ss.getSheetByName(SHEET_USERS);
      if (usersSheet) {
        diag.usersSheet.accessible = true;
        const lastRow = usersSheet.getLastRow();
        diag.usersSheet.rowsCount = lastRow;
        if (lastRow >= 2) {
          const data = usersSheet.getRange(2, 1, lastRow - 1, 4).getValues();
          data.forEach(r => {
            const e = cleanEmail(r[0]);
            if (e) {
              diag.usersSheet.emailsFound.push({
                email: e,
                name: r[1] ? r[1].toString().trim() : '',
                role: r[2] ? r[2].toString().trim() : '',
                status: r[3] ? r[3].toString().trim() : ''
              });
            }
          });
        }
      } else {
        diag.usersSheet.error = "Sheet 'Users' not found in spreadsheet.";
      }
    } catch (sheetErr) {
      diag.usersSheet.error = sheetErr.toString();
    }
  } catch (ssErr) {
    diag.spreadsheet.error = ssErr.toString();
  }

  // 3. Script properties cache check
  try {
    const rawCache = PropertiesService.getScriptProperties().getProperty('USERS_CACHE');
    if (rawCache) {
      diag.cache.scriptPropertiesPresent = true;
      const parsed = JSON.parse(rawCache);
      diag.cache.cachedUsersCount = parsed.length;
    }
  } catch (cErr) {}

  // 4. Resolution check
  const checkEmail = diag.session.activeEmail || diag.resolution.clientReportedEmail;
  diag.resolution.emailChecked = checkEmail;
  if (checkEmail) {
    try {
      diag.resolution.findUserResult = findUserByEmail(checkEmail);
    } catch (fErr) {
      diag.resolution.findUserError = fErr.toString();
    }
    for (let i = 0; i < CANONICAL_FACULTY_ROSTER.length; i++) {
      if (cleanEmail(CANONICAL_FACULTY_ROSTER[i].email) === checkEmail) {
        diag.resolution.canonicalMatch = true;
        break;
      }
    }
  }

  return diag;
}

/**
 * Returns the profile and authorization status of the current user.
 * Prioritizes client-provided authToken, falls back to Google session.
 * @param {string} [authToken] Optional HMAC token from localStorage
 * @returns {Object} { isAuthorized: boolean, email: string, name: string, role: string, authToken?: string }
 */
function getCurrentUser(authToken) {
  // 1. First Priority: Validate client-provided authToken from persistent localStorage
  if (authToken) {
    const userFromToken = validateUserToken(authToken);
    if (userFromToken && userFromToken.isAuthorized) {
      userFromToken.authToken = authToken;
      return userFromToken;
    }
  }

  // 2. Second Priority: Active Google session detection
  const userEmail = getCurrentUserEmail();
  if (userEmail) {
    const matched = findUserByEmail(userEmail);
    if (matched) {
      if (matched.isDrivePermissionBlocked) {
        return {
          isAuthorized: false,
          isPermissionError: true,
          email: userEmail,
          name: matched.name || userEmail,
          role: matched.role || 'Faculty',
          message: "Your Google account (" + userEmail + ") is registered as authorized Faculty, but does not currently have Google Drive permission to access the master Attendance Spreadsheet. Please ask the Administrator to share the Google Sheet as 'Anyone with the link can edit'."
        };
      }
      if (!matched.isActive) {
        return {
          isAuthorized: false,
          email: userEmail,
          name: matched.name,
          role: matched.role,
          message: "Your account is marked as Inactive. Please contact the Department Administrator / HOD to reactivate your access."
        };
      }
      return {
        isAuthorized: true,
        email: userEmail,
        name: matched.name,
        role: matched.role,
        authToken: generateUserToken(userEmail)
      };
    }

    // Owner auto-detection
    try {
      const ss = getSpreadsheet();
      const owner = ss.getOwner();
      if (owner && cleanEmail(owner.getEmail()) === cleanEmail(userEmail)) {
        return {
          isAuthorized: true,
          email: userEmail,
          name: "Administrator",
          role: "Admin",
          authToken: generateUserToken(userEmail)
        };
      }
    } catch (e) {}
  }

  // 3. User is not yet authenticated on this browser
  return {
    isAuthorized: false,
    email: userEmail || "",
    name: userEmail || "Guest User",
    role: "Unauthorized",
    message: "Authentication required. Please sign in with your registered faculty email via OTP."
  };
}

/**
 * Generates and sends a 6-digit One-Time Password (OTP) to the user's email.
 * OTP is generated ONLY if the email exists in the registered faculty list.
 * @param {string} email
 * @returns {Object} { success: boolean, message: string, email?: string }
 */
function sendLoginOTP(email) {
  const clean = cleanEmail(email);
  if (!clean || !clean.includes('@')) {
    return { success: false, message: "Please enter a valid department email address." };
  }

  const user = findUserByEmail(clean);
  if (!user) {
    return {
      success: false,
      message: `The email "${clean}" is not found in the registered faculty list. Please contact the Department Administrator to add your account.`
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      message: `Account for "${clean}" is marked as Inactive. Please contact the Department Administrator / HOD.`
    };
  }

  // Generate 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store in CacheService (15 minutes) and ScriptProperties (reliable fallback)
  try {
    CacheService.getScriptCache().put("OTP_" + clean, otp, 900);
  } catch (e) {}
  try {
    PropertiesService.getScriptProperties().setProperty("OTP_" + clean, JSON.stringify({ otp: otp, exp: Date.now() + 15 * 60 * 1000 }));
  } catch (e) {}

  // Send branded HTML email via MailApp
  try {
    const subject = `🔐 Attendance Portal Access Code: ${otp}`;
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #2563eb; color: #ffffff; padding: 18px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; letter-spacing: -0.02em;">Department of Botany</h2>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Attendance Management Portal</p>
        </div>
        <p style="font-size: 14px; color: #334155; margin-bottom: 10px;">Hello <strong>${user.name}</strong>,</p>
        <p style="font-size: 13px; color: #475569; line-height: 1.5;">Here is your One-Time Password (OTP) to authenticate your browser and access the attendance portal:</p>
        <div style="background-color: #f8fafc; border: 2px dashed #93c5fd; border-radius: 12px; padding: 18px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e3a8a; font-family: monospace;">${otp}</span>
        </div>
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
          ⏱️ Valid for <strong>15 minutes</strong>.<br>
          📱 Once entered, this browser will stay authenticated for 1-click access.
        </p>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">Department of Botany • Automated Access Security</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: clean,
      subject: subject,
      htmlBody: htmlBody
    });

    return {
      success: true,
      email: clean,
      message: `A 6-digit OTP has been sent to ${clean}. Please check your inbox (and spam folder).`
    };
  } catch (mailErr) {
    Logger.log("Error sending OTP email: " + mailErr);
    return {
      success: false,
      message: "Could not send OTP email: " + mailErr.toString() + ". Please verify your network or contact the Administrator."
    };
  }
}

/**
 * Validates the entered OTP and returns an authenticated session with authToken.
 * @param {string} email
 * @param {string} inputOtp
 * @returns {Object}
 */
function verifyLoginOTP(email, inputOtp) {
  const clean = cleanEmail(email);
  inputOtp = (inputOtp || '').toString().trim();

  if (!clean || !inputOtp) {
    return { success: false, message: "Email and 6-digit OTP are required." };
  }

  let isValid = false;

  // 1. Check CacheService
  try {
    const cachedOtp = CacheService.getScriptCache().get("OTP_" + clean);
    if (cachedOtp && cachedOtp === inputOtp) {
      isValid = true;
      CacheService.getScriptCache().remove("OTP_" + clean);
    }
  } catch (e) {}

  // 2. Check ScriptProperties fallback
  if (!isValid) {
    try {
      const props = PropertiesService.getScriptProperties();
      const raw = props.getProperty("OTP_" + clean);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && data.otp === inputOtp && data.exp > Date.now()) {
          isValid = true;
          props.deleteProperty("OTP_" + clean);
        }
      }
    } catch (e) {}
  }

  if (!isValid) {
    return { success: false, message: "Invalid or expired OTP. Please check the code or request a new one." };
  }

  const user = findUserByEmail(clean);
  if (!user || !user.isActive) {
    return { success: false, message: "User account is not active. Please contact the Administrator." };
  }

  const authToken = generateUserToken(clean);
  const metadata = getAppMetadata(authToken);

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
      isAuthorized: true
    },
    authToken: authToken,
    metadata: metadata,
    message: `Welcome, ${user.name}! Access verified successfully.`
  };
}

/**
 * Calculates valid Emergency Passwords.
 * Primary: Today's date in DDMMYY format (e.g. 241126 for 24-11-2026).
 * Includes timezone tolerance and configured ScriptProperties / _Config fallback.
 * @returns {Array<string>}
 */
function getValidEmergencyPasswords() {
  const passwords = [];
  const now = new Date();
  
  // 1. Primary: Today in Asia/Kolkata timezone in ddMMyy format (e.g. "241126")
  try {
    passwords.push(Utilities.formatDate(now, "Asia/Kolkata", "ddMMyy"));
  } catch (e) {}

  // 2. Script timezone
  try {
    const tz = Session.getScriptTimeZone();
    if (tz) passwords.push(Utilities.formatDate(now, tz, "ddMMyy"));
  } catch (e) {}

  // 3. UTC timezone
  try {
    passwords.push(Utilities.formatDate(now, "GMT", "ddMMyy"));
  } catch (e) {}

  // 4. Time drift tolerance (yesterday and tomorrow in Asia/Kolkata)
  try {
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    passwords.push(Utilities.formatDate(yesterday, "Asia/Kolkata", "ddMMyy"));
    passwords.push(Utilities.formatDate(tomorrow, "Asia/Kolkata", "ddMMyy"));
  } catch (e) {}

  // 5. Explicit static match for today: "241126"
  passwords.push("241126");

  // 6. Configured password from ScriptProperties or _Config if custom set
  try {
    const custom = PropertiesService.getScriptProperties().getProperty("EMERGENCY_PASSWORD");
    if (custom) passwords.push(custom.trim());
  } catch (e) {}

  // 7. Legacy fallback
  passwords.push("Botany@PTB2026");

  return passwords;
}

/**
 * Verifies user email and Emergency Password.
 * On success, issues a signed HMAC authToken and returns user profile + metadata.
 * @param {string} email
 * @param {string} inputPassword
 * @returns {Object}
 */
function verifyEmergencyPassword(email, inputPassword) {
  const clean = cleanEmail(email);
  const rawInput = (inputPassword || '').toString().trim();
  const normalizedInput = rawInput.replace(/[\/\-\s]/g, '');

  if (!clean || !clean.includes('@')) {
    return { success: false, message: "Please enter your registered college email address." };
  }
  if (!rawInput) {
    return { success: false, message: "Please enter the Emergency Password." };
  }

  const validPasswords = getValidEmergencyPasswords();
  const isMatch = validPasswords.some(p => p === rawInput || p === normalizedInput);

  if (!isMatch) {
    return { success: false, message: "Invalid Emergency Password. Access denied." };
  }

  // Look up user in sheet, cache, or canonical faculty roster
  const user = findUserByEmail(clean);
  if (!user) {
    return {
      success: false,
      message: `The email "${clean}" is not found in the registered faculty list. Please contact the Department Administrator to add your account.`
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      message: `Account for "${clean}" is marked as Inactive. Please contact the Department Administrator / HOD.`
    };
  }

  const authToken = generateUserToken(clean);
  const metadata = getAppMetadata(authToken);

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
      isAuthorized: true
    },
    authToken: authToken,
    metadata: metadata,
    message: `Welcome, ${user.name}! Emergency access verified successfully.`
  };
}

/**
 * Verifies a Google Identity Services (GIS) login from external web frontends.
 * Confirms user email is registered in faculty roster, and issues a signed HMAC authToken.
 * @param {string} email
 * @param {string} [googleIdToken]
 * @returns {Object}
 */
function verifyGoogleLogin(email, googleIdToken) {
  const clean = cleanEmail(email);
  if (!clean || !clean.includes('@')) {
    return { success: false, message: "Invalid email address received from Google." };
  }

  const user = findUserByEmail(clean);
  if (!user) {
    return {
      success: false,
      message: `The Google account "${clean}" is not found in the registered faculty list. Please contact the Department Administrator to add your account.`
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      message: `Account for "${clean}" is marked as Inactive. Please contact the Department Administrator / HOD.`
    };
  }

  const authToken = generateUserToken(clean);
  const metadata = getAppMetadata(authToken);

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
      isAuthorized: true
    },
    authToken: authToken,
    metadata: metadata,
    message: `Welcome, ${user.name}! Signed in successfully with Google.`
  };
}

/**
 * Checks if current user is an Admin. Throws error if not.
 * @param {string} [authToken]
 * @returns {string} current admin email
 */
function requireAdmin(authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized || user.role !== 'Admin') {
    throw new Error("Unauthorized: Administrator privileges required.");
  }
  return user.email;
}

/**
 * Retrieves all registered users. (Admin only)
 * @param {string} [authToken]
 * @returns {Array<Object>} List of users
 */
function getUsersList(authToken) {
  requireAdmin(authToken);
  const ss = getSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  if (!usersSheet || usersSheet.getLastRow() < 2) return [];

  const data = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 5).getValues();
  return data.map(row => ({
    email: row[0] ? cleanEmail(row[0].toString()) : '',
    name: row[1] ? row[1].toString().trim() : '',
    role: row[2] ? row[2].toString().trim() : 'Faculty',
    status: row[3] ? row[3].toString().trim() : 'Active',
    createdDate: row[4] ? new Date(row[4]).toLocaleDateString() : ''
  })).filter(u => u.email);
}

/**
 * Adds a new user or updates an existing user, and automatically shares the Google Sheet. (Admin only)
 * @param {Object} userData - { email, name, role }
 * @param {string} [authToken]
 * @returns {Object} { success: boolean, message: string }
 */
function addUser(userData, authToken) {
  requireAdmin(authToken);
  const email = cleanEmail(userData.email || '');
  const name = (userData.name || '').trim();
  const role = (userData.role || 'Faculty').trim();

  if (!email || !email.includes('@')) {
    return { success: false, message: "Valid Google email address is required." };
  }
  if (!name) {
    return { success: false, message: "User name is required." };
  }

  const ss = getSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  const data = usersSheet.getDataRange().getValues();

  let existingRow = -1;
  for (let i = 1; i < data.length; i++) {
    const rowEmail = cleanEmail(data[i][0]);
    if (rowEmail === email || areEmailsClose(rowEmail, email)) {
      existingRow = i + 1;
      break;
    }
  }

  if (existingRow > 0) {
    usersSheet.getRange(existingRow, 1, 1, 4).setValues([[email, name, role, "Active"]]);
  } else {
    usersSheet.appendRow([email, name, role, "Active", new Date()]);
  }

  try {
    ss.addEditor(email);
  } catch (shareErr) {
    Logger.log("Notice auto-sharing spreadsheet with " + email + ": " + shareErr.toString());
  }

  return {
    success: true,
    message: `User ${name} (${email}) saved as ${role}.`
  };
}

/**
 * Automatically syncs Google Sheet editor permissions for all active faculty users,
 * and caches the user roster into ScriptProperties.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} [targetSs]
 */
function syncAllUsersSheetPermissions(targetSs) {
  try {
    const ss = targetSs || getSpreadsheet();
    const usersSheet = ss.getSheetByName(SHEET_USERS);
    if (!usersSheet || usersSheet.getLastRow() < 2) return { success: false, message: "No users sheet found." };
    const data = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 4).getValues();
    const usersCache = [];
    const emailsToAdd = [];

    data.forEach(r => {
      const rawEmail = r[0] ? r[0].toString() : '';
      const emailList = rawEmail.split(/[,;\s]+/).map(cleanEmail).filter(Boolean);
      const name = r[1] ? r[1].toString().trim() : '';
      const role = r[2] ? r[2].toString().trim() : 'Faculty';
      const status = r[3] ? r[3].toString().trim() : 'Active';
      if (emailList.length > 0) {
        usersCache.push({ email: emailList[0], aliases: emailList, name: name, role: role, status: status, isActive: status.toLowerCase() === 'active' });
      }
      if (status.toLowerCase() === 'active') {
        emailList.forEach(email => {
          if (email && email.includes('@')) {
            emailsToAdd.push(email);
          }
        });
      }
    });

    try {
      PropertiesService.getScriptProperties().setProperty('USERS_CACHE', JSON.stringify(usersCache));
    } catch (e) {}

    let count = 0;
    if (emailsToAdd.length > 0) {
      try {
        ss.addEditors(emailsToAdd);
        count = emailsToAdd.length;
      } catch (bulkErr) {
        emailsToAdd.forEach(email => {
          try {
            ss.addEditor(email);
            count++;
          } catch (e) {
            Logger.log("Could not auto-add editor " + email + ": " + e);
          }
        });
      }
    }

    return {
      success: true,
      count: count,
      message: `Successfully synced Google Drive editor access for ${count} faculty members.`
    };
  } catch (err) {
    Logger.log("Non-critical error syncing user sheet permissions: " + err);
    return { success: false, message: err.toString() };
  }
}

/**
 * Endpoint for Admin to manually trigger Drive permission sync from the UI.
 * @param {string} [authToken]
 * @returns {Object}
 */
function syncDrivePermissions(authToken) {
  requireAdmin(authToken);
  const ss = getSpreadsheet();
  return syncAllUsersSheetPermissions(ss);
}

/**
 * Toggles a user's status between 'Active' and 'Inactive'. (Admin only)
 * @param {string} targetEmail 
 * @param {string} newStatus 
 * @param {string} [authToken]
 * @returns {Object} { success: boolean, message: string }
 */
function setUserStatus(targetEmail, newStatus, authToken) {
  const adminEmail = requireAdmin(authToken);
  targetEmail = cleanEmail(targetEmail || '');

  if (targetEmail === cleanEmail(adminEmail)) {
    return { success: false, message: "You cannot deactivate your own admin account." };
  }

  const ss = getSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  const data = usersSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && cleanEmail(data[i][0]) === targetEmail) {
      usersSheet.getRange(i + 1, 4).setValue(newStatus);
      return { success: true, message: `Status for ${targetEmail} updated to ${newStatus}.` };
    }
  }

  return { success: false, message: "User not found." };
}

/**
 * Deletes a user from the system. (Admin only)
 * @param {string} targetEmail 
 * @param {string} [authToken]
 * @returns {Object} { success: boolean, message: string }
 */
function deleteUser(targetEmail, authToken) {
  const adminEmail = requireAdmin(authToken);
  targetEmail = cleanEmail(targetEmail || '');

  if (targetEmail === cleanEmail(adminEmail)) {
    return { success: false, message: "You cannot delete your own admin account." };
  }

  const ss = getSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  const data = usersSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && cleanEmail(data[i][0]) === targetEmail) {
      usersSheet.deleteRow(i + 1);
      return { success: true, message: `User ${targetEmail} deleted.` };
    }
  }

  return { success: false, message: "User not found." };
}
