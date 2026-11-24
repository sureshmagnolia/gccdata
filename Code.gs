/**
 * ATTENDANCE APP
 * File: Code.gs
 * Description: Core router, database configuration, include helper, and one-click database setup/migration.
 */

// ================= CONFIGURATION =================
const SPREADSHEET_ID = "1K2VTTCSi97ctLBo3KEKtJ9rxsHBJkT1z0TEpmiA7guQ";

// Database Sheet Names
const SHEET_CONFIG = "_Config";
const SHEET_USERS = "Users";
const SHEET_CLASSES = "Classes";
const SHEET_STUDENTS = "Students";
const SHEET_SESSIONS = "AttendanceSessions";
const SHEET_RECORDS = "AttendanceRecords";
const SHEET_LOG_COLUMNAR = "Log1"; // Columnar Register Sheet (Original format)

// Legacy Sheet Names (for migration)
const LEGACY_STUDENT_DB = "StudentDB";
const LEGACY_FACULTY = "Faculty";

/**
 * Returns the active spreadsheet instance.
 * Supports both container-bound and standalone script setups.
 */
function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {
    // Fall back to ID
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * Serves the HTML Web Application or returns JSON if an API action parameter is supplied.
 * Evaluates template to include ClientScript.html.
 * @param {Object} [e]
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequest(e.parameter.action, e.parameter);
  }
  const template = HtmlService.createTemplateFromFile('AttendanceApp');
  return template.evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setTitle('Attendance App');
}

/**
 * Universal JSON REST API endpoint for external web frontends (Vercel, GitHub Pages, etc.).
 * Receives JSON payloads, calls backend business logic, and returns JSON.
 * @param {Object} e - Event parameter containing postData
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }
    const action = payload.action;
    return handleApiRequest(action, payload);
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * Helper to return JSON text output with proper mime type.
 * @param {Object} data
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Universal API Request Handler routing actions from external fetch calls.
 * Supports both named parameter objects and args array.
 * @param {string} action
 * @param {Object} payload
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function handleApiRequest(action, payload) {
  payload = payload || {};
  const args = Array.isArray(payload.args) ? payload.args : [];

  let result = null;
  try {
    switch (action) {
      case 'getAppMetadata':
        result = getAppMetadata(args[0] || payload.authToken);
        break;

      case 'recordAttendanceSession':
        result = recordAttendanceSession(args[0] || payload.payload || payload);
        break;

      case 'verifyGoogleLogin':
        result = verifyGoogleLogin(args[0] || payload.email, args[1] || payload.googleIdToken);
        break;

      case 'verifyEmergencyPassword':
        result = verifyEmergencyPassword(args[0] || payload.email, args[1] || payload.password);
        break;

      case 'sendLoginOTP':
        result = sendLoginOTP(args[0] || payload.email);
        break;

      case 'verifyLoginOTP':
        result = verifyLoginOTP(args[0] || payload.email, args[1] || payload.otp);
        break;

      case 'getSessionForEditing':
        result = getSessionForEditing(args[0] || payload.classId, args[1] || payload.date, args[2] || payload.period, args[3] || payload.authToken);
        break;

      case 'getAttendanceReport':
        result = getAttendanceReport(args[0] || payload.filter, args[1] || payload.authToken);
        break;

      case 'downloadRegisterPdf':
        result = downloadRegisterPdf(args[0] || payload.filter, args[1] || payload.authToken);
        break;

      case 'syncOfflineSessionsBatch':
        result = syncOfflineSessionsBatch(args[0] || payload.sessionsList, args[1] || payload.authToken);
        break;

      case 'getStudentsByClass':
        result = getStudentsByClass(args[0] || payload.classId, args[1] || payload.includeInactive);
        break;

      case 'getCurrentUserEmail':
        result = getCurrentUserEmail();
        break;

      case 'getAuthDiagnostics':
        result = getAuthDiagnostics(args[0] || payload.clientInfo);
        break;

      case 'syncDrivePermissions':
        result = syncDrivePermissions(args[0] || payload.authToken);
        break;

      case 'getUsersList':
        result = getUsersList(args[0] || payload.authToken);
        break;

      case 'addUser':
        result = addUser(args[0] || payload.userData, args[1] || payload.authToken);
        break;

      case 'setUserStatus':
        result = setUserStatus(args[0] || payload.targetEmail, args[1] || payload.newStatus, args[2] || payload.authToken);
        break;

      case 'deleteUser':
        result = deleteUser(args[0] || payload.targetEmail, args[1] || payload.authToken);
        break;

      case 'updateAppConfig':
        result = updateAppConfig(args[0] || payload.configData);
        break;

      case 'addNewStudent':
        result = addNewStudent(args[0], args[1], args[2], args[3], args[4]);
        break;

      case 'updateStudentDetails':
        result = updateStudentDetails(args[0], args[1], args[2], args[3], args[4]);
        break;

      case 'reactivateStudent':
        result = reactivateStudent(args[0], args[1]);
        break;

      case 'removeStudent':
        result = removeStudent(args[0], args[1]);
        break;

      case 'bulkUpdateStudentRoster':
        result = bulkUpdateStudentRoster(args[0], args[1]);
        break;

      case 'importClassRoster':
        result = importClassRoster(args[0], args[1]);
        break;

      case 'promoteBatch':
        result = promoteBatch(args[0] || payload.payload || payload);
        break;

      case 'clearClassAttendanceData':
        result = clearClassAttendanceData(args[0] || payload.classId, args[1] || payload.purgeMode);
        break;

      case 'ping':
        result = { success: true, timestamp: new Date().toISOString(), message: "Botany Attendance API live" };
        break;

      default:
        result = { success: false, message: "Unknown action: " + action };
        break;
    }
  } catch (execErr) {
    result = { success: false, error: execErr.toString() };
  }

  return createJsonResponse(result);
}

/**
 * Automatically creates a dedicated extension menu directly in Google Sheets
 * when the spreadsheet is opened.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('📋 Attendance App')
      .addItem('🚀 Launch Attendance Portal', 'showAttendanceDialog')
      .addItem('📱 Open in Sidebar', 'showAttendanceSidebar')
      .addSeparator()
      .addItem('⚙️ Initialize / Verify Database', 'setupDatabase')
      .addItem('🌐 Web App Mobile Link', 'showWebAppUrlDialog')
      .addToUi();
  } catch (e) {
    Logger.log("Menu creation skipped in non-UI environment: " + e.toString());
  }
}

/**
 * Opens the Attendance App inside a high-resolution dialog modal in Google Sheets.
 */
function showAttendanceDialog() {
  const html = HtmlService.createTemplateFromFile('AttendanceApp')
    .evaluate()
    .setWidth(1080)
    .setHeight(750);
  SpreadsheetApp.getUi().showModalDialog(html, 'College Attendance Portal');
}

/**
 * Opens the Attendance App docked inside the right-hand sidebar of Google Sheets.
 */
function showAttendanceSidebar() {
  const html = HtmlService.createTemplateFromFile('AttendanceApp')
    .evaluate()
    .setTitle('Attendance Portal');
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Displays the standalone deployment URL or instructions to open the app on mobile.
 */
function showWebAppUrlDialog() {
  const ui = SpreadsheetApp.getUi();
  const url = ScriptApp.getService().getUrl();
  if (url) {
    const htmlOutput = HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:16px;line-height:1.5;">' +
      '<p><strong>Standalone Mobile Web App URL:</strong></p>' +
      '<p><a href="' + url + '" target="_blank" style="color:#2563eb;word-break:break-all;">' + url + '</a></p>' +
      '<p style="font-size:12px;color:#64748b;">Bookmark this link on your smartphone to mark attendance anytime without opening Google Sheets.</p>' +
      '</div>'
    ).setWidth(450).setHeight(180);
    ui.showModalDialog(htmlOutput, 'Mobile Web App Link');
  } else {
    ui.alert(
      'Web App Not Deployed Yet',
      'To enable standalone mobile access on phones:\n\n' +
      '1. In the Sheet, go to Extensions > Apps Script.\n' +
      '2. Click "Deploy" > "New deployment" > "Web app".\n' +
      '3. Set access to "Anyone" and click Deploy.\n\n' +
      'You can also use the app directly inside this Sheet by clicking:\n"📋 Attendance App" > "🚀 Launch Attendance Portal".',
      ui.ButtonSet.OK
    );
  }
}

/**
 * Helper function for HTML templates to include partial files.
 * @param {string} filename 
 * @returns {string} File content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * ONE-CLICK SETUP & MIGRATION UTILITY
 * Run this function once from the Apps Script Editor or Admin panel.
 * 1. Creates all required normalized database sheets if missing.
 * 2. Adds the current user as Super Admin in the Users sheet.
 * 3. Migrates existing students from StudentDB into Classes & Students.
 * 4. Migrates existing faculty from Faculty sheet into Users.
 */
function setupDatabase() {
  const ss = getSpreadsheet();
  const currentUserEmail = Session.getActiveUser().getEmail().toLowerCase().trim();
  const results = [];

  // 1. Setup _Config
  let configSheet = ss.getSheetByName(SHEET_CONFIG);
  if (!configSheet) {
    configSheet = ss.insertSheet(SHEET_CONFIG);
    configSheet.getRange(1, 1, 1, 2).setValues([["Key", "Value"]]).setFontWeight("bold");
    configSheet.appendRow(["MIN_ATTENDANCE_PERCENT", "75"]);
    configSheet.appendRow(["COLLEGE_NAME", "Attendance App"]);
    configSheet.appendRow(["PORTAL_TITLE", "Department Attendance Management Portal"]);
    configSheet.setFrozenRows(1);
    results.push("Created _Config sheet.");
  }

  // 2. Setup Users
  let usersSheet = ss.getSheetByName(SHEET_USERS);
  if (!usersSheet) {
    usersSheet = ss.insertSheet(SHEET_USERS);
    usersSheet.getRange(1, 1, 1, 5).setValues([["Email", "Name", "Role", "Status", "CreatedDate"]]).setFontWeight("bold");
    usersSheet.setFrozenRows(1);
    results.push("Created Users sheet.");
  }

  // Ensure current user is Admin
  const userRows = usersSheet.getDataRange().getValues();
  let adminExists = false;
  for (let i = 1; i < userRows.length; i++) {
    if (userRows[i][0] && userRows[i][0].toString().toLowerCase().trim() === currentUserEmail) {
      adminExists = true;
      break;
    }
  }
  if (!adminExists && currentUserEmail) {
    usersSheet.appendRow([currentUserEmail, "Super Admin", "Admin", "Active", new Date()]);
    results.push(`Added ${currentUserEmail} as Admin.`);
  }

  // Migrate legacy Faculty into Users sheet if present
  const legacyFacultySheet = ss.getSheetByName(LEGACY_FACULTY);
  if (legacyFacultySheet && legacyFacultySheet.getLastRow() >= 2) {
    const facultyData = legacyFacultySheet.getRange(2, 1, legacyFacultySheet.getLastRow() - 1, 2).getValues();
    const existingEmails = new Set(usersSheet.getDataRange().getValues().slice(1).map(r => r[0].toString().toLowerCase().trim()));
    
    facultyData.forEach(row => {
      const name = row[0] ? row[0].toString().trim() : '';
      const email = row[1] ? row[1].toString().toLowerCase().trim() : '';
      if (email && !existingEmails.has(email)) {
        usersSheet.appendRow([email, name || email, "Faculty", "Active", new Date()]);
        existingEmails.add(email);
        results.push(`Migrated faculty ${email} (${name}).`);
      }
    });
  }

  // 3. Setup Classes
  let classesSheet = ss.getSheetByName(SHEET_CLASSES);
  if (!classesSheet) {
    classesSheet = ss.insertSheet(SHEET_CLASSES);
    classesSheet.getRange(1, 1, 1, 4).setValues([["ClassId", "ClassName", "Department", "Status"]]).setFontWeight("bold");
    classesSheet.setFrozenRows(1);
    results.push("Created Classes sheet.");
  }

  // 4. Setup Students
  let studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet) {
    studentsSheet = ss.insertSheet(SHEET_STUDENTS);
    studentsSheet.getRange(1, 1, 1, 7).setValues([["StudentId", "RegNo", "Name", "ClassId", "RollNo", "Status", "Department"]]).setFontWeight("bold");
    studentsSheet.setFrozenRows(1);
    results.push("Created Students sheet.");
  } else {
    // Ensure Department column exists for Minor / MDC courses
    if (studentsSheet.getLastColumn() < 7 || studentsSheet.getRange(1, 7).getValue().toString().trim() === "") {
      studentsSheet.getRange(1, 7).setValue("Department").setFontWeight("bold");
      results.push("Verified Department column in Students sheet.");
    }
    // Verify and heal all canonical botany class rosters (ensures roll #1 to end are present & active)
    try {
      autoHealCanonicalRosters(ss);
      results.push("Verified and healed canonical student rosters across all classes.");
    } catch (e) {
      Logger.log("Error in autoHealCanonicalRosters: " + e.toString());
    }
  }

  // Migrate legacy StudentDB if Students sheet is empty
  const legacyStudentSheet = ss.getSheetByName(LEGACY_STUDENT_DB);
  if (legacyStudentSheet && legacyStudentSheet.getLastRow() >= 2 && studentsSheet.getLastRow() <= 1) {
    const studentData = legacyStudentSheet.getRange(2, 1, legacyStudentSheet.getLastRow() - 1, 3).getValues();
    const classMap = new Map();
    const newStudents = [];

    studentData.forEach(row => {
      const regNo = row[0] ? row[0].toString().trim() : '';
      const name = row[1] ? row[1].toString().trim() : '';
      const rawClass = row[2] ? row[2].toString().trim() : 'General';
      if (regNo && name) {
        const classId = rawClass.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
        const studentId = "STU_" + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
        if (!classMap.has(classId)) {
          classMap.set(classId, rawClass);
        }
        newStudents.push([studentId, regNo, name, classId, "", "Active"]);
      }
    });

    // Insert Classes
    classMap.forEach((className, classId) => {
      classesSheet.appendRow([classId, className, "General", "Active"]);
    });

    // Insert Students in bulk
    if (newStudents.length > 0) {
      studentsSheet.getRange(2, 1, newStudents.length, 6).setValues(newStudents);
      results.push(`Migrated ${newStudents.length} students across ${classMap.size} classes from StudentDB with unique StudentIds.`);
    }
  }

  // 5. Setup AttendanceSessions
  let sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
  if (!sessionsSheet) {
    sessionsSheet = ss.insertSheet(SHEET_SESSIONS);
    sessionsSheet.getRange(1, 1, 1, 9).setValues([[
      "SessionId", "Date", "Period", "ClassId", "Subject", "FacultyEmail", "CreatedTimestamp", "LastEditedBy", "LastEditedTimestamp"
    ]]).setFontWeight("bold");
    sessionsSheet.setFrozenRows(1);
    results.push("Created AttendanceSessions sheet.");
  }

  // 6. Setup AttendanceRecords
  let recordsSheet = ss.getSheetByName(SHEET_RECORDS);
  if (!recordsSheet) {
    recordsSheet = ss.insertSheet(SHEET_RECORDS);
    recordsSheet.getRange(1, 1, 1, 6).setValues([["RecordId", "SessionId", "StudentId", "RegNo", "Status", "UpdatedAt"]]).setFontWeight("bold");
    recordsSheet.setFrozenRows(1);
    results.push("Created AttendanceRecords sheet.");
  }

  // 7. Setup Log1 (Columnar Register Sheet)
  let logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_LOG_COLUMNAR);
    logSheet.getRange(1, 1, 1, 4).setValues([["Register No", "Name", "Roll No", "Class"]]).setFontWeight("bold");
    logSheet.setFrozenRows(1);
    logSheet.setFrozenColumns(4);
    results.push("Created Log1 columnar register sheet.");
  }

  // 8. Setup Dedicated Per-Class Columnar Sheets (e.g. Log_FYUG_S2, Log_FYUG_S4, Log_FYUG_S6)
  try {
    if (typeof ensureAllClassColumnarSheets === 'function') {
      ensureAllClassColumnarSheets(ss);
      results.push("Initialized dedicated per-class columnar sheets (Log_FYUG_S2, Log_FYUG_S4, Log_FYUG_S6).");
    }
  } catch (clsLogInitErr) {
    results.push("Note: Dedicated per-class sheets will initialize on first app load.");
  }

  Logger.log("Setup complete:\n" + results.join("\n"));
  try {
    const ui = SpreadsheetApp.getUi();
    if (ui) {
      ui.alert('Database Verification Complete', results.length > 0 ? results.join('\n') : 'All database sheets and configurations are already initialized and up-to-date.', ui.ButtonSet.OK);
    }
  } catch (e) {
    // Non-UI context
  }
  return { success: true, log: results };
}
