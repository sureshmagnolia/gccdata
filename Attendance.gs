/**
 * ATTENDANCE APP
 * File: Attendance.gs
 * Description: Period marking, past attendance editing, Excel roster importing, and reporting queries.
 */

/**
 * Loads all initial application metadata (User profile, classes, faculty, configuration).
 * @returns {Object} Application bootstrap payload
 */
const CANONICAL_ROSTER = [
  {
    "regNo": "CHBASBO001",
    "name": "ABHINAV J",
    "rollNo": "1",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO002",
    "name": "AISWARYA M",
    "rollNo": "2",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO003",
    "name": "AKHILA R",
    "rollNo": "3",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO004",
    "name": "AKSHARA R",
    "rollNo": "4",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO005",
    "name": "AKSHAYA S",
    "rollNo": "5",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO006",
    "name": "AKSHAYA V",
    "rollNo": "6",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO007",
    "name": "ANULAKSHMI R K",
    "rollNo": "7",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO008",
    "name": "ANUPAMA R",
    "rollNo": "8",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO009",
    "name": "ANUSREE A",
    "rollNo": "9",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO010",
    "name": "ARDHRA MOHANAN",
    "rollNo": "10",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO011",
    "name": "ARIFASHERIN A",
    "rollNo": "11",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO012",
    "name": "ASHMIL A",
    "rollNo": "12",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO013",
    "name": "AYISHATH RIFA",
    "rollNo": "13",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO014",
    "name": "DARSANA M",
    "rollNo": "14",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO015",
    "name": "FAREEHA PARVEEN A K",
    "rollNo": "15",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO016",
    "name": "HANA FATHIMA K",
    "rollNo": "16",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO017",
    "name": "KAVYA K",
    "rollNo": "17",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO018",
    "name": "KEERTHANA KRISHNAN T K",
    "rollNo": "18",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO019",
    "name": "LAKSHMI NANDHANA C",
    "rollNo": "19",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO020",
    "name": "LIGHITHA J",
    "rollNo": "20",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO021",
    "name": "MEGHANAD K R",
    "rollNo": "21",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO022",
    "name": "MINSY R",
    "rollNo": "22",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO023",
    "name": "MUHAMMED MIDLAJ M H",
    "rollNo": "23",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO024",
    "name": "NAVADHARANI K",
    "rollNo": "24",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO025",
    "name": "NAYANA E S",
    "rollNo": "25",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO026",
    "name": "NIMESH R",
    "rollNo": "26",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO027",
    "name": "NIRANJANA P P",
    "rollNo": "27",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO028",
    "name": "NITHYA G",
    "rollNo": "28",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO029",
    "name": "RESHMA V",
    "rollNo": "29",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO030",
    "name": "SHAHANA FATHIMA H",
    "rollNo": "30",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO031",
    "name": "VANDANA G",
    "rollNo": "31",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHBASBO032",
    "name": "VARSHA V S",
    "rollNo": "32",
    "classId": "fyug_s2"
  },
  {
    "regNo": "CHAZSBO001",
    "name": "ABHIJITH C",
    "rollNo": "1",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO002",
    "name": "A K NANDHITHA MENON",
    "rollNo": "2",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO003",
    "name": "AKSHARA RAMESH O",
    "rollNo": "3",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO004",
    "name": "ANAGHA C",
    "rollNo": "4",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO005",
    "name": "ANALAKSHMI S A",
    "rollNo": "5",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO006",
    "name": "ANUSWARA S",
    "rollNo": "6",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO007",
    "name": "APARNA H",
    "rollNo": "7",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO008",
    "name": "ARCHANA S",
    "rollNo": "8",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO009",
    "name": "ARSHA R",
    "rollNo": "9",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO010",
    "name": "ASHIKA K V",
    "rollNo": "10",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO011",
    "name": "BALASURYA M",
    "rollNo": "11",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO012",
    "name": "BOWZANA A",
    "rollNo": "12",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO013",
    "name": "DEEPA C",
    "rollNo": "13",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO014",
    "name": "FARSEENA J",
    "rollNo": "14",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO015",
    "name": "GAYATHRI A",
    "rollNo": "15",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO016",
    "name": "GOPIKA S",
    "rollNo": "16",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO017",
    "name": "KARUNYA K",
    "rollNo": "17",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO018",
    "name": "MAYA MAHESH M",
    "rollNo": "18",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO019",
    "name": "NANDHANA S",
    "rollNo": "19",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO020",
    "name": "NASRIN FATHIMA T P",
    "rollNo": "20",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO021",
    "name": "NOOR FATHIMA B",
    "rollNo": "21",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO022",
    "name": "OSHIN BALU PUTHANS",
    "rollNo": "22",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO023",
    "name": "PRASUJA S",
    "rollNo": "23",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO024",
    "name": "RESHMY P",
    "rollNo": "24",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO025",
    "name": "RINA YASMIN P",
    "rollNo": "25",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO026",
    "name": "SANUSHA U",
    "rollNo": "26",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO027",
    "name": "SAPNA N",
    "rollNo": "27",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO028",
    "name": "SREENANDHA S",
    "rollNo": "28",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO029",
    "name": "VARSHA T",
    "rollNo": "29",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAZSBO030",
    "name": "JIJIN R",
    "rollNo": "30",
    "classId": "fyug_s4"
  },
  {
    "regNo": "CHAYSBO002",
    "name": "ADVAITHA . S",
    "rollNo": "1",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO004",
    "name": "AGNES P",
    "rollNo": "2",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO006",
    "name": "AKSHAYA BABU",
    "rollNo": "3",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO007",
    "name": "AMEESHA.M.",
    "rollNo": "4",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO008",
    "name": "ANISHA S",
    "rollNo": "5",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO010",
    "name": "APARNA U",
    "rollNo": "6",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO012",
    "name": "ASWAJITH.M",
    "rollNo": "7",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO013",
    "name": "ASWATHY S",
    "rollNo": "8",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO014",
    "name": "ATHUL J",
    "rollNo": "9",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO016",
    "name": "FARHANA BEGUM F",
    "rollNo": "10",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO017",
    "name": "HASNA M",
    "rollNo": "11",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO018",
    "name": "K ARATHI",
    "rollNo": "12",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO019",
    "name": "MALAVIKA G",
    "rollNo": "13",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO020",
    "name": "MALAVIKA K S",
    "rollNo": "14",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO021",
    "name": "M . FABIO RUFUS SEBA",
    "rollNo": "15",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO022",
    "name": "SHINCY . S",
    "rollNo": "16",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO023",
    "name": "SULFATH . S",
    "rollNo": "17",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO027",
    "name": "VIDHYA R",
    "rollNo": "18",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO028",
    "name": "VIJAYALAKSHMI . B",
    "rollNo": "19",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO029",
    "name": "ANIRUDH",
    "rollNo": "20",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO030",
    "name": "ANSHIYA A",
    "rollNo": "21",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO031",
    "name": "SAANDEEPAN P",
    "rollNo": "22",
    "classId": "fyug_s6"
  },
  {
    "regNo": "CHAYSBO032",
    "name": "ADITH . S",
    "rollNo": "23",
    "classId": "fyug_s6"
  }
];

/**
 * Automatically verifies and heals the canonical botany student roster.
 * Ensures all 85 students (from roll #1 to the end of each class) are present,
 * active, correctly mapped to their classId, and have their roll numbers set.
 * Runs seamlessly in the background during getAppMetadata and getStudentsByClass.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} [ss]
 */
function autoHealCanonicalRosters(ss) {
  try {
    if (!ss) ss = getSpreadsheet();
    let studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
    if (!studentsSheet) {
      studentsSheet = ss.insertSheet(SHEET_STUDENTS);
      studentsSheet.getRange(1, 1, 1, 7).setValues([["StudentId", "RegNo", "Name", "ClassId", "RollNo", "Status", "Department"]]).setFontWeight("bold");
      studentsSheet.setFrozenRows(1);
    } else if (studentsSheet.getLastRow() >= 1) {
      // Auto-heal misaligned header row in Students sheet
      const hRow = studentsSheet.getRange(1, 1, 1, 7).getValues()[0];
      if (hRow[0] !== 'StudentId') {
        studentsSheet.getRange(1, 1, 1, 7).setValues([["StudentId", "RegNo", "Name", "ClassId", "RollNo", "Status", "Department"]]).setFontWeight("bold");
      }
    }

    // Auto-heal misaligned header row in AttendanceRecords sheet
    const recordsSheet = ss.getSheetByName(SHEET_RECORDS);
    if (recordsSheet && recordsSheet.getLastRow() >= 1) {
      const rhRow = recordsSheet.getRange(1, 1, 1, 6).getValues()[0];
      if (rhRow[2] !== 'StudentId') {
        recordsSheet.getRange(1, 1, 1, 6).setValues([["RecordId", "SessionId", "StudentId", "RegNo", "Status", "UpdatedAt"]]).setFontWeight("bold");
      }
    }

    const lastRow = studentsSheet.getLastRow();
    const maxCols = Math.max(studentsSheet.getLastColumn(), 7);

    // Map existing rows by RegNo
    const regToRowMap = new Map();
    if (lastRow >= 2) {
      const data = studentsSheet.getRange(2, 1, lastRow - 1, maxCols).getValues();
      for (let i = 0; i < data.length; i++) {
        const rowNum = i + 2;
        const col0 = data[i][0] ? data[i][0].toString().trim() : '';
        const isSevenCol = col0.startsWith('STU_');
        const regNo = (isSevenCol ? (data[i][1] || '') : col0).toString().trim().toUpperCase();
        const status = (isSevenCol ? (data[i][5] || '') : (data[i][4] || '')).toString().trim();
        const rollNo = (isSevenCol ? (data[i][4] !== undefined && data[i][4] !== null ? data[i][4].toString().trim() : '') : (data[i][3] !== undefined && data[i][3] !== null ? data[i][3].toString().trim() : ''));
        const sClassId = (isSevenCol ? (data[i][3] || '') : (data[i][2] || '')).toString().trim().toLowerCase().replace(/\s+/g, '');

        if (regNo) {
          regToRowMap.set(regNo, {
            row: rowNum,
            isSevenCol: isSevenCol,
            status: status,
            rollNo: rollNo,
            classId: sClassId
          });
        }
      }
    }

    const rowsToAppend = [];
    CANONICAL_ROSTER.forEach(c => {
      const regUpper = c.regNo.toUpperCase();
      if (!regToRowMap.has(regUpper)) {
        // Missing canonical student - restore them!
        const newStudentId = "STU_" + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
        rowsToAppend.push([newStudentId, c.regNo, c.name, c.classId, c.rollNo, "Active", ""]);
      } else {
        const existing = regToRowMap.get(regUpper);
        // If inactive or status blank, heal to Active!
        if (existing.status.toLowerCase() !== 'active') {
          const statusCol = existing.isSevenCol ? 6 : 5;
          studentsSheet.getRange(existing.row, statusCol).setValue("Active");
        }
        // If rollNo is missing or float format, heal rollNo!
        const rollStr = String(existing.rollNo || '').trim();
        const cleanRoll = rollStr.endsWith('.0') ? rollStr.slice(0, -2) : rollStr;
        if (!cleanRoll && c.rollNo) {
          const rollCol = existing.isSevenCol ? 5 : 4;
          studentsSheet.getRange(existing.row, rollCol).setValue(c.rollNo);
        }
        // Ensure classId is present
        const existingClassNorm = (existing.classId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetClassNorm = c.classId.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!existingClassNorm) {
          const classCol = existing.isSevenCol ? 4 : 3;
          studentsSheet.getRange(existing.row, classCol).setValue(c.classId);
        }
      }
    });

    if (rowsToAppend.length > 0) {
      studentsSheet.getRange(studentsSheet.getLastRow() + 1, 1, rowsToAppend.length, 7).setValues(rowsToAppend);
      Logger.log("autoHealCanonicalRosters restored " + rowsToAppend.length + " missing canonical students.");
    }
    SpreadsheetApp.flush();
  } catch (healErr) {
    Logger.log("Non-critical error in autoHealCanonicalRosters: " + healErr.toString());
  }
}

/**
 * Reactivates a previously removed/inactive student and restores them to the active roster.
 * @param {string} studentId
 * @param {string} classId
 * @returns {Object} { success: boolean, message: string }
 */
function reactivateStudent(studentId, classId) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  studentId = (studentId || '').trim();
  classId = (classId || '').trim();
  if (!studentId) return { success: false, message: "Student identifier required." };

  const ss = getSpreadsheet();
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet || studentsSheet.getLastRow() < 2) {
    return { success: false, message: "Students sheet is empty." };
  }

  const data = studentsSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const sId = data[i][0] ? data[i][0].toString().trim() : '';
    const rNo = data[i][1] ? data[i][1].toString().trim().toUpperCase() : '';
    const sClass = data[i][3] ? data[i][3].toString().trim() : '';

    if ((sId === studentId || rNo === studentId) && (!classId || sClass === classId)) {
      const isSevenCol = sId.startsWith('STU_');
      const statusCol = isSevenCol ? 6 : 5;
      studentsSheet.getRange(i + 1, statusCol).setValue("Active");
      return {
        success: true,
        message: 'Student "' + (data[i][2] || rNo) + '" (' + rNo + ') restored to Active class roster.'
      };
    }
  }

  return { success: false, message: "Student record not found." };
}


function getAppMetadata(authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { user: user };
  }

  let ss = null;
  try {
    ss = getSpreadsheet();
  } catch (ssErr) {
    Logger.log("Notice: Spreadsheet open permission check in getAppMetadata: " + ssErr);
  }

  if (ss) {
    try {
      autoHealCanonicalRosters(ss);
    } catch (healErr) {
      Logger.log("Non-critical error in autoHealCanonicalRosters in getAppMetadata: " + healErr);
    }
    try {
      ensureAllClassColumnarSheets(ss);
    } catch (sheetInitErr) {
      Logger.log("Non-critical error ensuring class columnar sheets in getAppMetadata: " + sheetInitErr);
    }

    // Auto-sync Google Sheet permissions for all registered active users when Admin opens the app
    if (user.role === 'Admin') {
      try {
        syncAllUsersSheetPermissions(ss);
      } catch (permErr) {
        Logger.log("Non-critical error syncing user permissions: " + permErr);
      }
    }
  }
  
  // 1. Get Active Classes
  const classes = [];
  if (ss) {
    try {
      const classesSheet = ss.getSheetByName(SHEET_CLASSES);
      if (classesSheet && classesSheet.getLastRow() >= 2) {
        const classData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 4).getValues();
        classData.forEach(r => {
          const classId = r[0] ? r[0].toString().trim() : '';
          const className = r[1] ? r[1].toString().trim() : classId;
          const dept = r[2] ? r[2].toString().trim() : '';
          const status = r[3] ? r[3].toString().trim() : 'Active';
          if (classId) {
            classes.push({ classId, className, department: dept, status: status });
          }
        });
      }
    } catch (cErr) {}
  }
  if (classes.length === 0) {
    classes.push(
      { classId: "bsc_botany_s1", className: "BSc Botany S1", department: "Botany", status: "Active" },
      { classId: "bsc_botany_s3", className: "BSc Botany S3", department: "Botany", status: "Active" },
      { classId: "bsc_botany_s5", className: "BSc Botany S5", department: "Botany", status: "Active" }
    );
  }

  // 2. Get Active Faculty
  const faculty = [];
  if (ss) {
    try {
      const usersSheet = ss.getSheetByName(SHEET_USERS);
      if (usersSheet && usersSheet.getLastRow() >= 2) {
        const userData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 4).getValues();
        userData.forEach(r => {
          const email = r[0] ? r[0].toString().trim() : '';
          const name = r[1] ? r[1].toString().trim() : email;
          const status = r[3] ? r[3].toString().trim() : 'Active';
          if (email && status.toLowerCase() === 'active') {
            faculty.push({ email, name });
          }
        });
      }
    } catch (uErr) {}
  }
  if (faculty.length === 0 && typeof CANONICAL_FACULTY_ROSTER !== 'undefined') {
    for (let k = 0; k < CANONICAL_FACULTY_ROSTER.length; k++) {
      const cf = CANONICAL_FACULTY_ROSTER[k];
      if (cf.status.toLowerCase() === 'active') {
        faculty.push({ email: cf.email, name: cf.name });
      }
    }
  }

  // 3. Get Configuration
  const config = { minAttendance: 75, collegeName: "Attendance App", portalTitle: "Department Attendance Management" };
  if (ss) {
    try {
      const configSheet = ss.getSheetByName(SHEET_CONFIG);
      if (configSheet && configSheet.getLastRow() >= 2) {
        const configData = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 2).getValues();
        configData.forEach(r => {
          const key = r[0] ? r[0].toString().trim() : '';
          const val = r[1] ? r[1].toString().trim() : '';
          if (key === 'MIN_ATTENDANCE_PERCENT') config.minAttendance = parseFloat(val) || 75;
          if (key === 'COLLEGE_NAME') config.collegeName = val;
          if (key === 'PORTAL_TITLE') config.portalTitle = val;
        });
      }
    } catch (cfgErr) {}
  }

  // 4. Pre-fetch All Active Class Rosters for Offline Caching
  const allRosters = {};
  try {
    classes.forEach(c => {
      if (c.status !== 'Archived') {
        if (ss) {
          allRosters[c.classId] = getStudentsByClass(c.classId, false);
        } else if (typeof CANONICAL_ROSTER !== 'undefined') {
          const targetNorm = c.classId.toLowerCase().replace(/\s+/g, '');
          allRosters[c.classId] = CANONICAL_ROSTER.filter(s => s.classId.toLowerCase().replace(/\s+/g, '') === targetNorm).map(s => ({
            studentId: "STU_" + s.regNo,
            regNo: s.regNo,
            name: s.name,
            classId: c.classId,
            rollNo: s.rollNo,
            department: "Botany",
            status: "Active"
          }));
        }
      }
    });
  } catch (rosterErr) {
    Logger.log("Non-critical error prefetching rosters in getAppMetadata: " + rosterErr);
  }

  return {
    user: user,
    classes: classes,
    faculty: faculty,
    config: config,
    allRosters: allRosters
  };
}

/**
 * Synchronizes a batch of offline attendance sessions.
 * Processes each session using the standard atomic recording engine.
 * @param {Array<Object>} sessionsList Array of session payloads
 * @returns {Object} { success: boolean, syncedCount: number, results: Array<Object>, message: string }
 */
function syncOfflineSessionsBatch(sessionsList, authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  if (!sessionsList || !Array.isArray(sessionsList) || sessionsList.length === 0) {
    return { success: true, syncedCount: 0, results: [], message: "No offline sessions to sync." };
  }

  const results = [];
  let successCount = 0;

  sessionsList.forEach(sessionPayload => {
    try {
      const res = recordAttendanceSession(sessionPayload);
      results.push({
        queueId: sessionPayload.queueId || '',
        classId: sessionPayload.classId,
        date: sessionPayload.date,
        period: sessionPayload.period,
        success: res.success,
        message: res.message
      });
      if (res.success) {
        successCount++;
      }
    } catch (err) {
      results.push({
        queueId: sessionPayload.queueId || '',
        classId: sessionPayload.classId,
        date: sessionPayload.date,
        period: sessionPayload.period,
        success: false,
        message: err.toString()
      });
    }
  });

  return {
    success: true,
    totalReceived: sessionsList.length,
    syncedCount: successCount,
    results: results,
    message: `Successfully synchronized ${successCount} of ${sessionsList.length} offline attendance sessions.`
  };
}

/**
 * Returns active students enrolled in a specific class.
 * Each student has an immutable, unique studentId.
 * @param {string} classId 
 * @param {boolean} [includeInactive=false] Whether to also include inactive students
 * @returns {Array<Object>} Students list
 */
function getStudentsByClass(classId, includeInactive) {
  const ss = getSpreadsheet();
  autoHealCanonicalRosters(ss);
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet || studentsSheet.getLastRow() < 2) return [];

  const maxCols = studentsSheet.getLastColumn();
  const data = studentsSheet.getRange(2, 1, studentsSheet.getLastRow() - 1, Math.max(maxCols, 7)).getValues();
  const students = [];
  const targetClassNorm = (classId || '').toString().trim().toLowerCase().replace(/\s+/g, '');

  data.forEach(r => {
    let studentId = '';
    let regNo = '';
    let name = '';
    let sClassId = '';
    let rollNo = '';
    let status = 'Active';
    let department = '';

    if (r[0] && r[0].toString().startsWith('STU_')) {
      // 7-column schema: [StudentId, RegNo, Name, ClassId, RollNo, Status, Department]
      studentId = r[0].toString().trim();
      regNo = r[1] ? r[1].toString().trim() : '';
      name = r[2] ? r[2].toString().trim() : '';
      sClassId = r[3] ? r[3].toString().trim() : '';
      rollNo = r[4] !== undefined && r[4] !== null ? r[4].toString().trim() : '';
      status = r[5] ? r[5].toString().trim() : 'Active';
      department = r[6] ? r[6].toString().trim() : '';
    } else {
      // 5-column legacy schema: [RegNo, Name, ClassId, RollNo, Status]
      regNo = r[0] ? r[0].toString().trim() : '';
      studentId = 'STU_' + regNo.toUpperCase().replace(/[^A-Z0-9]/g, '');
      name = r[1] ? r[1].toString().trim() : '';
      sClassId = r[2] ? r[2].toString().trim() : '';
      rollNo = r[3] !== undefined && r[3] !== null ? r[3].toString().trim() : '';
      status = r[4] ? r[4].toString().trim() : 'Active';
      department = r[5] ? r[5].toString().trim() : '';
    }

    // Clean up float roll numbers (e.g. "1.0" -> "1")
    if (rollNo && !isNaN(Number(rollNo))) {
      const num = Number(rollNo);
      if (Number.isInteger(num)) {
        rollNo = String(num);
      }
    }

    const sClassNorm = sClassId.toLowerCase().replace(/\s+/g, '');
    const isActive = status.toLowerCase() === 'active';
    if ((sClassNorm === targetClassNorm || !targetClassNorm) && regNo && (isActive || includeInactive)) {
      students.push({ studentId, regNo, name, rollNo, department, status, isInactive: !isActive });
    }
  });

  // Bulletproof In-Memory Canonical Roster Guarantee:
  // For canonical Botany classes (fyug_s2, fyug_s4, fyug_s6), ensure all canonical students
  // (especially Roll #1 and every student) are ALWAYS present, active, and correctly numbered.
  // Supports all alias variations: FYUG_S6, S6 FYUGP, fyug_s6, s6, etc.
  const resolveCanonicalClass = cid => {
    const norm = (cid || '').toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (norm.includes('s2') || norm === '2') return 'fyug_s2';
    if (norm.includes('s4') || norm === '4') return 'fyug_s4';
    if (norm.includes('s6') || norm === '6') return 'fyug_s6';
    return norm;
  };

  const canonicalTarget = resolveCanonicalClass(targetClassNorm);
  if (canonicalTarget) {
    const canonicalForClass = CANONICAL_ROSTER.filter(c => resolveCanonicalClass(c.classId) === canonicalTarget);
    canonicalForClass.forEach(c => {
      const existing = students.find(s => s.regNo.toUpperCase() === c.regNo.toUpperCase());
      if (!existing) {
        students.push({
          studentId: 'STU_' + c.regNo.toUpperCase(),
          regNo: c.regNo,
          name: c.name,
          rollNo: c.rollNo,
          department: '',
          status: 'Active',
          isInactive: false
        });
      } else {
        existing.status = 'Active';
        existing.isInactive = false;
        if (!existing.rollNo) existing.rollNo = c.rollNo;
      }
    });
  }

  return students.sort((a, b) => {
    // Sort primarily by numeric roll number if valid
    const rA = parseInt(a.rollNo, 10);
    const rB = parseInt(b.rollNo, 10);
    if (!isNaN(rA) && !isNaN(rB) && rA !== rB) {
      return rA - rB;
    }
    return a.regNo.localeCompare(b.regNo);
  });
}

/**
 * Reliably formats a Date or string to YYYY-MM-DD using the script's configured timezone.
 * Avoids UTC day-shift errors on Google Cloud execution servers.
 * @param {Date|string} d
 * @returns {string} YYYY-MM-DD
 */
function formatGasDate(d) {
  if (!d) return '';
  if (d instanceof Date) {
    try {
      const tz = Session.getScriptTimeZone() || "Asia/Kolkata";
      return Utilities.formatDate(d, tz, "yyyy-MM-dd");
    } catch (e) {
      return Utilities.formatDate(d, "Asia/Kolkata", "yyyy-MM-dd");
    }
  }
  const str = d.toString().trim();
  // Support DD-MM-YYYY or DD/MM/YYYY
  const dmy = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, '0')}-${dmy[1].padStart(2, '0')}`;
  }
  if (str.length >= 10 && str.charAt(4) === '-' && str.charAt(7) === '-') {
    return str.substring(0, 10);
  }
  return str;
}

/**
 * Checks if a session already exists for the given class, date, and period.
 * @param {string} classId 
 * @param {string} dateString (YYYY-MM-DD)
 * @param {string} period 
 * @returns {Object} { exists: boolean, sessionInfo: Object }
 */
function checkSessionExists(classId, dateString, period) {
  const ss = getSpreadsheet();
  const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
  if (!sessionsSheet || sessionsSheet.getLastRow() < 2) return { exists: false };

  const norm = str => (str || '').toString().trim().toLowerCase().replace(/\s+/g, '');
  const cleanPeriod = (period || '').trim();
  const cleanClassId = (classId || '').trim();
  const cleanDate = formatGasDate(dateString);
  const targetSessionIdNorm = norm(`${cleanDate}_${cleanPeriod}_${cleanClassId}`);
  const targetSessionIdAltNorm = norm(`${cleanDate}_${cleanPeriod.replace(/\s+/g, '')}_${cleanClassId}`);

  const data = sessionsSheet.getRange(2, 1, sessionsSheet.getLastRow() - 1, 9).getValues();
  for (let i = 0; i < data.length; i++) {
    const rowSessionIdNorm = norm(data[i][0]);
    const sDate = formatGasDate(data[i][1]);
    const sPeriodNorm = norm(data[i][2]);
    const sClassIdNorm = norm(data[i][3]);

    const dateMatches = (cleanDate && sDate && (cleanDate === sDate || norm(cleanDate) === norm(sDate)));
    const periodMatches = (sPeriodNorm === norm(cleanPeriod) || sPeriodNorm === norm(cleanPeriod.replace(/\s+/g, '')));
    const classMatches = (sClassIdNorm === norm(cleanClassId));

    const compMatch = (dateMatches && periodMatches && classMatches);
    const idMatch = (rowSessionIdNorm && (rowSessionIdNorm === targetSessionIdNorm || rowSessionIdNorm === targetSessionIdAltNorm));

    if (idMatch || compMatch) {
      return {
        exists: true,
        sessionInfo: {
          sessionId: data[i][0] ? data[i][0].toString() : '',
          date: sDate || cleanDate,
          period: data[i][2] ? data[i][2].toString() : cleanPeriod,
          classId: data[i][3] ? data[i][3].toString() : classId,
          subject: data[i][4] ? data[i][4].toString() : '',
          facultyEmail: data[i][5] ? data[i][5].toString() : '',
          createdTimestamp: data[i][6] ? String(data[i][6]) : '',
          lastEditedBy: data[i][7] ? data[i][7].toString() : ''
        }
      };
    }
  }

  return { exists: false };
}

/**
 * Records a new attendance session using LockService to prevent race conditions.
 * @param {Object} payload { classId, date, period, subject, facultyEmail, records: [{ regNo, status }] }
 * @returns {Object} { success: boolean, message: string }
 */
function recordAttendanceSession(payload) {
  const authToken = payload ? (payload.authToken || payload.token) : null;
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access: Please verify your account via Email OTP or Emergency Password." };
  }

  const classId = (payload.classId || '').trim();
  const dateString = (payload.date || '').trim(); // YYYY-MM-DD
  const period = (payload.period || '').trim();
  const subject = (payload.subject || '').trim();
  const records = payload.records || [];

  if (!classId || !dateString || !period || records.length === 0) {
    return { success: false, message: "Missing required attendance parameters." };
  }

  // Acquire concurrency lock
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // 30-second timeout
  } catch (lockErr) {
    return { success: false, message: "Server busy. Please try again in a few seconds." };
  }

  try {
    const ss = getSpreadsheet();
    const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
    const recordsSheet = ss.getSheetByName(SHEET_RECORDS);

    const norm = str => (str || '').toString().trim().toLowerCase().replace(/\s+/g, '');
    const cleanPeriod = (period || '').trim();
    const cleanClassId = (classId || '').trim();
    const cleanDate = (dateString || '').trim();
    const sessionId = `${cleanDate}_${cleanPeriod.replace(/\s+/g, '')}_${cleanClassId}`;
    const targetSessionIdNorm = norm(sessionId);

    // 1. Check if session already exists
    const sessionData = sessionsSheet.getDataRange().getValues();
    let existingSessionRow = -1;
    for (let i = 1; i < sessionData.length; i++) {
      const rowIdNorm = norm(sessionData[i][0]);
      const sDate = formatGasDate(sessionData[i][1]);
      const sPeriodNorm = norm(sessionData[i][2]);
      const sClassNorm = norm(sessionData[i][3]);

      if (rowIdNorm === targetSessionIdNorm || (norm(sDate) === norm(cleanDate) && sPeriodNorm === norm(cleanPeriod) && sClassNorm === norm(cleanClassId))) {
        existingSessionRow = i + 1;
        break;
      }
    }

    const now = new Date();
    const facultyEmail = payload.facultyEmail || user.email;

    if (existingSessionRow > 0) {
      // Overwrite/update existing session header
      sessionsSheet.getRange(existingSessionRow, 5, 1, 5).setValues([[
        subject, facultyEmail, sessionData[existingSessionRow - 1][6] || now, user.email, now
      ]]);
    } else {
      // Create new session header
      sessionsSheet.appendRow([
        sessionId, dateString, period, classId, subject, facultyEmail, now, user.email, now
      ]);
    }

    // 2. Option A: "Exception / Absence-Only" Storage (Saves 90%+ space)
    // Only Absent ('A') and Late ('L') create/keep database rows in AttendanceRecords.
    // Present ('P') is the natural default and requires zero database rows.
    const existingRecData = recordsSheet.getDataRange().getValues();
    const recordIdRowMap = new Map(); // recordId -> row index (1-based)
    for (let i = 1; i < existingRecData.length; i++) {
      const rId = existingRecData[i][0] ? existingRecData[i][0].toString() : '';
      if (rId) recordIdRowMap.set(rId, i + 1);
    }

    const rowsToAppend = [];
    const inPlaceUpdates = [];
    const rowsToDelete = [];

    records.forEach(r => {
      const regNo = (r.regNo || '').toString().trim();
      const studentId = r.studentId || ('STU_' + regNo.toUpperCase().replace(/[^A-Z0-9]/g, ''));
      const recordId = `${sessionId}_${studentId}`;
      const status = (r.status || 'P').toString().trim().toUpperCase();

      if (status === 'P') {
        // Present (P): Revert/prune any existing exception row to free database space
        if (recordIdRowMap.has(recordId)) {
          rowsToDelete.push(recordIdRowMap.get(recordId));
        }
      } else {
        // Exception status ('A' or 'L'): Upsert record row
        if (recordIdRowMap.has(recordId)) {
          inPlaceUpdates.push({ row: recordIdRowMap.get(recordId), status: status });
        } else {
          rowsToAppend.push([recordId, sessionId, studentId, regNo, status, now]);
        }
      }
    });

    // Write in-place updates for existing exceptions (A or L)
    inPlaceUpdates.forEach(u => {
      recordsSheet.getRange(u.row, 5, 1, 2).setValues([[u.status, now]]);
    });

    // Append new exception records (A or L)
    if (rowsToAppend.length > 0) {
      recordsSheet.getRange(recordsSheet.getLastRow() + 1, 1, rowsToAppend.length, 6).setValues(rowsToAppend);
    }

    // Prune rows converted to Present (P) in descending row order to preserve indices
    if (rowsToDelete.length > 0) {
      const uniqueSortedRows = Array.from(new Set(rowsToDelete)).sort((a, b) => b - a);
      uniqueSortedRows.forEach(rowNum => {
        recordsSheet.deleteRow(rowNum);
      });
    }

    // 3. Simultaneously sync to Columnar Register Sheets (Dedicated per-class sheet + Log1)
    try {
      syncSessionToColumnarLog(ss, {
        dateString: dateString,
        period: period,
        classId: classId,
        subject: subject,
        facultyEmail: facultyEmail,
        records: records
      });
    } catch (colErr) {
      Logger.log("Non-critical error syncing to columnar registers: " + colErr.toString());
    }

    const exceptionCount = inPlaceUpdates.length + rowsToAppend.length;
    return {
      success: true,
      message: `Attendance for ${period} successfully saved (${records.length} students mapped, ${exceptionCount} absence/late exceptions stored).`
    };

  } catch (err) {
    Logger.log("Error in recordAttendanceSession: " + err.toString());
    return { success: false, message: "Error saving attendance: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Loads an existing attendance session and student statuses for editing.
 * @param {string} classId 
 * @param {string} dateString 
 * @param {string} period 
 * @returns {Object} Session details and records map
 */
function getSessionForEditing(classId, dateString, period, authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  const ss = getSpreadsheet();
  const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
  const recordsSheet = ss.getSheetByName(SHEET_RECORDS);

  if (!sessionsSheet || sessionsSheet.getLastRow() < 2) {
    return { success: false, message: "No recorded sessions found." };
  }

  const norm = str => (str || '').toString().trim().toLowerCase().replace(/\s+/g, '');
  const cleanPeriod = (period || '').trim();
  const cleanClassId = (classId || '').trim();
  const cleanDate = formatGasDate(dateString);
  const targetSessionIdNorm = norm(`${cleanDate}_${cleanPeriod}_${cleanClassId}`);
  const targetSessionIdAltNorm = norm(`${cleanDate}_${cleanPeriod.replace(/\s+/g, '')}_${cleanClassId}`);

  const sData = sessionsSheet.getRange(2, 1, sessionsSheet.getLastRow() - 1, 9).getValues();
  let targetSession = null;

  for (let i = 0; i < sData.length; i++) {
    const rowSessionIdNorm = norm(sData[i][0]);
    const sDate = formatGasDate(sData[i][1]);
    const sPeriodNorm = norm(sData[i][2]);
    const sClassIdNorm = norm(sData[i][3]);

    const dateMatches = (cleanDate && sDate && (cleanDate === sDate || norm(cleanDate) === norm(sDate)));
    const periodMatches = (sPeriodNorm === norm(cleanPeriod) || sPeriodNorm === norm(cleanPeriod.replace(/\s+/g, '')));
    const classMatches = (sClassIdNorm === norm(cleanClassId));

    const compMatch = (dateMatches && periodMatches && classMatches);
    const idMatch = (rowSessionIdNorm && (rowSessionIdNorm === targetSessionIdNorm || rowSessionIdNorm === targetSessionIdAltNorm));

    if (idMatch || compMatch) {
      targetSession = {
        sessionId: sData[i][0] ? sData[i][0].toString() : '',
        date: sDate || cleanDate,
        period: sData[i][2] ? sData[i][2].toString() : cleanPeriod,
        classId: sData[i][3] ? sData[i][3].toString() : classId,
        subject: sData[i][4] ? sData[i][4].toString() : '',
        facultyEmail: sData[i][5] ? sData[i][5].toString() : '',
        createdTimestamp: sData[i][6] ? (sData[i][6] instanceof Date ? Utilities.formatDate(sData[i][6], Session.getScriptTimeZone() || "Asia/Kolkata", "yyyy-MM-dd HH:mm") : sData[i][6].toString()) : '',
        lastEditedBy: sData[i][7] ? sData[i][7].toString() : '',
        lastEditedTimestamp: sData[i][8] ? (sData[i][8] instanceof Date ? Utilities.formatDate(sData[i][8], Session.getScriptTimeZone() || "Asia/Kolkata", "yyyy-MM-dd HH:mm") : sData[i][8].toString()) : ''
      };
      break;
    }
  }

  if (!targetSession) {
    return { success: false, message: "No attendance record found for the selected Class, Date, and Period." };
  }

  // Load records mapped by studentId and regNo
  const statusMap = {};
  const recordedStudentKeys = new Set();
  if (recordsSheet && recordsSheet.getLastRow() >= 2) {
    const maxCols = recordsSheet.getLastColumn();
    const rData = recordsSheet.getRange(2, 1, recordsSheet.getLastRow() - 1, Math.max(maxCols, 5)).getValues();
    const sessNorm = norm(targetSession.sessionId);

    rData.forEach(row => {
      const rowSessIdNorm = norm(row[1]);
      if (rowSessIdNorm === targetSessionIdNorm || rowSessIdNorm === sessNorm) {
        const studentId = row[2] ? row[2].toString().trim() : '';
        const regNo = row[3] ? row[3].toString().trim() : '';
        const status = row[4] ? row[4].toString().trim().toUpperCase() : 'P';
        if (studentId) {
          statusMap[studentId] = status;
          recordedStudentKeys.add(studentId);
        }
        if (regNo) {
          statusMap[regNo] = status;
          recordedStudentKeys.add(regNo);
        }
      }
    });
  }

  // Retrieve all students for this class, keeping active students AND any inactive/deleted students who were part of this past session
  const allClassStudents = getStudentsByClass(classId, true);
  const sessionStudents = allClassStudents.filter(s => {
    const key = s.studentId || s.regNo;
    return !s.isInactive || recordedStudentKeys.has(key) || recordedStudentKeys.has(s.regNo) || recordedStudentKeys.has(s.studentId);
  });

  // Under Option A (Exception-Only Storage), any student without an explicit exception row (A/L) defaults to 'P'
  sessionStudents.forEach(s => {
    const key = s.studentId || s.regNo;
    const currentStatus = statusMap[key] || (s.regNo ? statusMap[s.regNo] : '') || (s.studentId ? statusMap[s.studentId] : '') || 'P';
    if (s.studentId) statusMap[s.studentId] = currentStatus;
    if (s.regNo) statusMap[s.regNo] = currentStatus;
  });

  return {
    success: true,
    session: targetSession,
    statusMap: statusMap,
    students: sessionStudents
  };
}

/**
 * Imports a class roster from parsed Excel/CSV data. (Admin only)
 * Creates the class if it does not exist and batch updates the student roster with immutable studentIds.
 * @param {string} className (e.g. "S3 FYUGP")
 * @param {Array<Object>} studentsList [{ regNo, name, rollNo }]
 * @returns {Object} { success: boolean, message: string, count: number }
 */
function importClassRoster(className, studentsList) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized: Please sign in with an authorized Google account." };
  }
  className = (className || '').trim();
  if (!className) return { success: false, message: "Class name is required." };
  if (!studentsList || studentsList.length === 0) return { success: false, message: "No student records found to import." };

  const classId = className.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  const ss = getSpreadsheet();
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);

  // 1. Ensure Class exists and check if reactivating from archive
  const classData = classesSheet.getDataRange().getValues();
  let classFound = false;
  let wasArchived = false;
  for (let i = 1; i < classData.length; i++) {
    if (classData[i][0] && classData[i][0].toString() === classId) {
      classFound = true;
      wasArchived = (classData[i][3] && classData[i][3].toString().toLowerCase() === 'archived');
      classesSheet.getRange(i + 1, 2).setValue(className); // Update display name
      classesSheet.getRange(i + 1, 4).setValue("Active");   // Reactivate class if previously archived
      break;
    }
  }
  if (!classFound) {
    classesSheet.appendRow([classId, className, "General", "Active"]);
  }

  // If reactivating an archived class that already had an attendance register sheet, safely archive the old sheet
  if (wasArchived) {
    try {
      const classSheetName = getClassLogSheetName(classId, className);
      const existingClassSheet = ss.getSheetByName(classSheetName);
      if (existingClassSheet && existingClassSheet.getLastColumn() >= 5) {
        const dateTag = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "Asia/Kolkata", "yyyy_MM");
        let archiveName = `${classSheetName}_Archived_${dateTag}`;
        let counter = 1;
        while (ss.getSheetByName(archiveName)) {
          archiveName = `${classSheetName}_Archived_${dateTag}_${counter++}`;
        }
        existingClassSheet.setName(archiveName.substring(0, 50));
        Logger.log(`Archived previous batch columnar sheet upon new batch import: ${classSheetName} -> ${archiveName}`);
      }
    } catch (impArchErr) {
      Logger.log("Non-critical error archiving existing sheet on import: " + impArchErr);
    }
  }

  // 2. Upsert Students with immutable studentIds
  const existingStudentData = studentsSheet.getDataRange().getValues();
  const studentKeyToRowMap = new Map();
  for (let i = 1; i < existingStudentData.length; i++) {
    const sId = existingStudentData[i][0] ? existingStudentData[i][0].toString().trim() : '';
    const regNo = existingStudentData[i][1] ? existingStudentData[i][1].toString().trim() : '';
    if (sId) studentKeyToRowMap.set(sId, i + 1);
    if (regNo) studentKeyToRowMap.set(regNo, i + 1);
  }

  const newStudentsToAppend = [];
  studentsList.forEach(s => {
    const regNo = (s.regNo || '').toString().trim();
    const name = (s.name || '').toString().trim();
    const rollNo = (s.rollNo || '').toString().trim();
    const department = (s.department || s.homeDepartment || s.homeDept || '').toString().trim();

    if (regNo && name) {
      if (studentKeyToRowMap.has(regNo)) {
        // Existing student: preserve their permanent StudentId, update RegNo/Name/Class/RollNo/Department
        const rowIdx = studentKeyToRowMap.get(regNo);
        const existingStudentId = existingStudentData[rowIdx - 1][0] || ("STU_" + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase());
        studentsSheet.getRange(rowIdx, 1, 1, 7).setValues([[existingStudentId, regNo, name, classId, rollNo, "Active", department]]);
      } else {
        // New student: generate permanent system UUID
        const newStudentId = "STU_" + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
        newStudentsToAppend.push([newStudentId, regNo, name, classId, rollNo, "Active", department]);
      }
    }
  });

  if (newStudentsToAppend.length > 0) {
    studentsSheet.getRange(studentsSheet.getLastRow() + 1, 1, newStudentsToAppend.length, 7).setValues(newStudentsToAppend);
  }

  // Keep Log1 columnar register updated with imported students
  try {
    ensureColumnarLogStudents(ss);
  } catch (logErr) {
    Logger.log("Non-critical error syncing imported students to Log1: " + logErr.toString());
  }

  // Ensure dedicated per-class columnar register is created/synchronized for new batch
  try {
    ensureClassColumnarLogSheet(ss, classId, className);
  } catch (clsLogErr) {
    Logger.log("Non-critical error syncing imported students to class columnar sheet: " + clsLogErr.toString());
  }

  return {
    success: true,
    message: `Successfully imported ${studentsList.length} students into class "${className}" with permanent system UUID keys.`,
    classId: classId,
    className: className,
    count: studentsList.length
  };
}

/**
 * Allows Admin to update a student's Register Number, Name, or Roll No.
 * Because the underlying StudentId is an immutable UUID, 100% of past attendance
 * records remain seamlessly connected without disruption.
 * @param {string} studentId 
 * @param {string} newRegNo 
 * @param {string} newName 
 * @param {string} newRollNo 
 * @returns {Object} { success: boolean, message: string }
 */
/**
 * Allows Faculty and Admin to update a student's Register Number, Name, or Roll No.
 * Fixes mistakes while preserving the underlying permanent StudentId (immutable UUID),
 * ensuring 100% of past attendance records remain safely connected without disruption.
 * @param {string} studentId 
 * @param {string} newRegNo 
 * @param {string} newName 
 * @param {string} newRollNo 
 * @param {string} newDepartment (Optional: Home Department for Minor / MDC students)
 * @returns {Object} { success: boolean, message: string, student: Object }
 */
function updateStudentDetails(studentId, newRegNo, newName, newRollNo, newDepartment) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized: Please sign in with an authorized Google account." };
  }

  studentId = (studentId || '').trim();
  newRegNo = (newRegNo || '').trim();
  newName = (newName || '').trim();
  newRollNo = (newRollNo || '').trim();
  newDepartment = (newDepartment || '').trim();

  if (!studentId || !newRegNo || !newName) {
    return { success: false, message: "Register Number and Student Name are required." };
  }

  const ss = getSpreadsheet();
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet || studentsSheet.getLastRow() < 2) return { success: false, message: "Students sheet empty." };

  const data = studentsSheet.getDataRange().getValues();
  let found = false;
  let oldRegNo = '';

  for (let i = 1; i < data.length; i++) {
    const sId = data[i][0] ? data[i][0].toString().trim() : '';
    const regNo = data[i][1] ? data[i][1].toString().trim() : '';
    if (sId === studentId || regNo === studentId) {
      oldRegNo = regNo;
      studentsSheet.getRange(i + 1, 2).setValue(newRegNo);
      studentsSheet.getRange(i + 1, 3).setValue(newName);
      studentsSheet.getRange(i + 1, 5).setValue(newRollNo);
      studentsSheet.getRange(i + 1, 7).setValue(newDepartment);
      found = true;
      break;
    }
  }

  if (!found) {
    return { success: false, message: "Student record not found." };
  }

  // Also update Log1 (Columnar register) so student details stay consistent
  try {
    const logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
    if (logSheet && logSheet.getLastRow() >= 2) {
      const lData = logSheet.getRange(2, 1, logSheet.getLastRow() - 1, 3).getValues();
      for (let r = 0; r < lData.length; r++) {
        const lReg = lData[r][0] ? lData[r][0].toString().trim() : '';
        if (lReg === oldRegNo || lReg === newRegNo) {
          logSheet.getRange(r + 2, 1, 1, 3).setValues([[newRegNo, newName, newRollNo]]);
          break;
        }
      }
    }
  } catch (logErr) {
    Logger.log("Non-critical error updating student in Log1: " + logErr.toString());
  }

  return {
    success: true,
    message: `Student "${newName}" (${newRegNo}) successfully updated. Past attendance remains 100% intact.`,
    student: {
      studentId: studentId,
      regNo: newRegNo,
      name: newName,
      rollNo: newRollNo,
      department: newDepartment
    }
  };
}

/**
 * Adds an individual student to an existing class roster.
 * Supports adding Home Department for Minor / MDC students.
 * @param {string} classId
 * @param {string} regNo
 * @param {string} name
 * @param {string} rollNo
 * @param {string} department (Optional: Home Department for Minor / MDC students)
 * @returns {Object} { success: boolean, message: string, student: Object }
 */
function addNewStudent(classId, regNo, name, rollNo, department) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized: Please sign in with an authorized Google account." };
  }

  classId = (classId || '').trim();
  regNo = (regNo || '').trim().toUpperCase();
  name = (name || '').trim();
  rollNo = (rollNo || '').trim();
  department = (department || '').trim();

  if (!classId || !regNo || !name) {
    return { success: false, message: "Class, Register Number, and Student Name are required." };
  }

  const ss = getSpreadsheet();
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet) {
    return { success: false, message: "Students sheet not found." };
  }

  // Check if student with same regNo already exists in this class
  const data = studentsSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const rNo = data[i][1] ? data[i][1].toString().trim().toUpperCase() : '';
    const sClass = data[i][3] ? data[i][3].toString().trim() : '';
    const status = data[i][5] ? data[i][5].toString().trim().toLowerCase() : '';

    if (rNo === regNo && sClass === classId) {
      if (status === 'active') {
        return { success: false, message: `Student with Register Number "${regNo}" is already enrolled in this class.` };
      } else {
        // Reactivate student
        studentsSheet.getRange(i + 1, 3).setValue(name);
        studentsSheet.getRange(i + 1, 5).setValue(rollNo);
        studentsSheet.getRange(i + 1, 6).setValue("Active");
        studentsSheet.getRange(i + 1, 7).setValue(department);
        return {
          success: true,
          message: `Student "${name}" (${regNo}) was reactivated in this class roster.`,
          student: { studentId: data[i][0], regNo, name, rollNo, department }
        };
      }
    }
  }

  // Generate new UUID key
  const newStudentId = "STU_" + Utilities.getUuid().replace(/-/g, '').substring(0, 10).toUpperCase();
  studentsSheet.appendRow([newStudentId, regNo, name, classId, rollNo, "Active", department]);

  try {
    ensureColumnarLogStudents(ss);
  } catch (logErr) {
    Logger.log("Non-critical error syncing to Log1: " + logErr);
  }

  return {
    success: true,
    message: `Student "${name}" (${regNo}) enrolled successfully into class roster.`,
    student: { studentId: newStudentId, regNo, name, rollNo, department }
  };
}

/**
 * Removes an individual student from a class roster.
 * If the student has past attendance sessions recorded, their status is set to Inactive
 * to preserve 100% of historical attendance records and reports.
 * If no attendance was ever recorded, the row is deleted cleanly.
 * @param {string} studentId
 * @param {string} classId
 * @returns {Object} { success: boolean, message: string }
 */
function removeStudent(studentId, classId) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized: Please sign in with an authorized Google account." };
  }

  studentId = (studentId || '').trim();
  classId = (classId || '').trim();

  if (!studentId) {
    return { success: false, message: "Student identifier is required." };
  }

  const ss = getSpreadsheet();
  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  if (!studentsSheet || studentsSheet.getLastRow() < 2) {
    return { success: false, message: "Students sheet is empty." };
  }

  const data = studentsSheet.getDataRange().getValues();
  let foundRow = -1;
  let studentName = '';
  let regNo = '';

  for (let i = 1; i < data.length; i++) {
    const sId = data[i][0] ? data[i][0].toString().trim() : '';
    const rNo = data[i][1] ? data[i][1].toString().trim() : '';
    const sClass = data[i][3] ? data[i][3].toString().trim() : '';

    if ((sId === studentId || rNo === studentId) && (!classId || sClass === classId)) {
      foundRow = i + 1;
      regNo = rNo;
      studentName = data[i][2] || rNo;
      break;
    }
  }

  if (foundRow === -1) {
    return { success: false, message: "Student record not found in class roster." };
  }

  // Check if student has attendance records in AttendanceRecords
  const recordsSheet = ss.getSheetByName(SHEET_RECORDS);
  let hasRecords = false;
  if (recordsSheet && recordsSheet.getLastRow() >= 2) {
    const rData = recordsSheet.getRange(2, 3, recordsSheet.getLastRow() - 1, 2).getValues();
    for (let j = 0; j < rData.length; j++) {
      const recStuId = rData[j][0] ? rData[j][0].toString().trim() : '';
      const recRegNo = rData[j][1] ? rData[j][1].toString().trim() : '';
      if (recStuId === studentId || recRegNo === regNo) {
        hasRecords = true;
        break;
      }
    }
  }

  // Also check if student has any recorded attendance marks in Log1
  if (!hasRecords) {
    const logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
    if (logSheet && logSheet.getLastRow() >= 2 && logSheet.getLastColumn() >= 5) {
      const lastRow = logSheet.getLastRow();
      const lastCol = logSheet.getLastColumn();
      const lData = logSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      for (let r = 0; r < lData.length; r++) {
        const lReg = lData[r][0] ? lData[r][0].toString().trim() : '';
        if (lReg === regNo) {
          for (let c = 4; c < lastCol; c++) {
            const mark = lData[r][c] ? lData[r][c].toString().trim() : '';
            if (mark === 'P' || mark === 'A' || mark === 'L') {
              hasRecords = true;
              break;
            }
          }
          break;
        }
      }
    }
  }

  if (hasRecords) {
    // Soft-deactivate so past attendance reports and session records remain 100% frozen, auditable, and intact
    studentsSheet.getRange(foundRow, 6).setValue("Inactive");
    return {
      success: true,
      message: `Student "${studentName}" (${regNo}) has recorded attendance on file and was marked Inactive (removed from active class roster). Historical attendance records remain safely preserved.`
    };
  } else {
    // Safe to permanently remove from sheet as no attendance was ever recorded
    studentsSheet.deleteRow(foundRow);
    return {
      success: true,
      message: `Student "${studentName}" (${regNo}) was removed from the class roster.`
    };
  }
}

/**
 * Generates an aggregated attendance report based on filters.
 * @param {Object} filter { classId, fromDate, toDate, facultyEmail }
 * @returns {Object} Comprehensive report payload
 */
function getAttendanceReport(filter, authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  const ss = getSpreadsheet();
  const classId = filter.classId || '';
  const fromDate = filter.fromDate || '';
  const toDate = filter.toDate || '';
  const facultyEmail = filter.facultyEmail || 'All';

  if (!classId) {
    return { success: false, message: "Please select a class for the report." };
  }

  // 1. Fetch Sessions matching filters
  const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
  const matchingSessions = [];
  const matchingSessionIds = new Set();
  let totalSessionsCount = 0;

  if (sessionsSheet && sessionsSheet.getLastRow() >= 2) {
    const sData = sessionsSheet.getRange(2, 1, sessionsSheet.getLastRow() - 1, 9).getValues();
    sData.forEach(row => {
      const sId = row[0] ? row[0].toString() : '';
      const sDate = formatGasDate(row[1]);
      const sPeriod = row[2] ? row[2].toString().trim() : '';
      const sClassId = row[3] ? row[3].toString().trim().toLowerCase() : '';
      const sSubject = row[4] ? row[4].toString().trim() : '';
      const sFaculty = row[5] ? row[5].toString().trim().toLowerCase() : '';

      if (sClassId !== classId.toLowerCase()) return;
      if (fromDate && sDate < fromDate) return;
      if (toDate && sDate > toDate) return;
      if (facultyEmail !== 'All' && sFaculty !== facultyEmail.toLowerCase()) return;

      matchingSessions.push({
        sessionId: sId,
        date: sDate,
        period: sPeriod,
        subject: sSubject,
        faculty: sFaculty
      });
      matchingSessionIds.add(sId);
      totalSessionsCount++;
    });
  }

  // Sort sessions chronologically: date ascending, then period ascending
  matchingSessions.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    const pNumA = parseInt(a.period.replace(/\D/g, ''), 10) || 0;
    const pNumB = parseInt(b.period.replace(/\D/g, ''), 10) || 0;
    return pNumA - pNumB;
  });

  // 2. Identify all students who have records in these matching sessions
  const recordsSheet = ss.getSheetByName(SHEET_RECORDS);
  const recordedStudentKeys = new Set();
  const rawRecords = [];

  if (matchingSessionIds.size > 0 && recordsSheet && recordsSheet.getLastRow() >= 2) {
    const maxCols = recordsSheet.getLastColumn();
    const rData = recordsSheet.getRange(2, 1, recordsSheet.getLastRow() - 1, Math.max(maxCols, 5)).getValues();
    rData.forEach(row => {
      const sId = row[1] ? row[1].toString() : '';
      if (!matchingSessionIds.has(sId)) return;

      const studentId = row[2] ? row[2].toString().trim() : '';
      const regNo = row[3] ? row[3].toString().trim() : '';
      const status = row[4] ? row[4].toString().trim().toUpperCase() : (row[3] ? row[3].toString().trim().toUpperCase() : '');

      if (studentId) recordedStudentKeys.add(studentId);
      if (regNo) recordedStudentKeys.add(regNo);
      rawRecords.push({ sessionId: sId, studentId, regNo, status });
    });
  }

  // 3. Fetch students of this class: Include all Active students PLUS any Inactive/deleted students who have records in these sessions!
  const allStudents = getStudentsByClass(classId, true);
  const students = allStudents.filter(s => {
    const key = s.studentId || s.regNo;
    return !s.isInactive || recordedStudentKeys.has(key) || recordedStudentKeys.has(s.regNo) || recordedStudentKeys.has(s.studentId);
  });

  if (students.length === 0) {
    return { success: false, message: "No students found with attendance records for this class." };
  }

  // 4. Aggregate Records across matching sessions (Supports both Legacy P/A/L rows and Option A Absence-Only storage)
  const studentSessionStatus = new Map();
  students.forEach(s => {
    const sKey = s.studentId || s.regNo;
    studentSessionStatus.set(sKey, new Map());
  });

  rawRecords.forEach(rec => {
    const key = rec.studentId || rec.regNo;
    let sMap = studentSessionStatus.get(key);
    if (!sMap && rec.regNo) sMap = studentSessionStatus.get(rec.regNo);
    if (!sMap && rec.studentId) sMap = studentSessionStatus.get(rec.studentId);
    if (sMap) {
      sMap.set(rec.sessionId, rec.status);
    }
  });

  const studentStats = new Map();
  students.forEach(s => {
    const sKey = s.studentId || s.regNo;
    const sMap = studentSessionStatus.get(sKey) || new Map();
    let absentCount = 0;
    let lateCount = 0;
    let presentCount = 0;
    const statusMap = {};

    matchingSessions.forEach(sess => {
      const sessionId = sess.sessionId;
      const status = sMap.get(sessionId);
      if (status === 'A' || status === 'ABSENT') {
        absentCount++;
        statusMap[sessionId] = 'A';
      } else if (status === 'L' || status === 'LATE') {
        lateCount++;
        statusMap[sessionId] = 'L';
      } else {
        // Either explicitly marked 'P' (legacy) or no record stored (Option A: Present by default)
        presentCount++;
        statusMap[sessionId] = 'P';
      }
    });

    studentStats.set(sKey, {
      studentId: sKey,
      regNo: s.regNo,
      name: s.name,
      rollNo: s.rollNo,
      department: s.department || '',
      isInactive: !!s.isInactive,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      totalHours: totalSessionsCount,
      percentage: '0.00%',
      statusMap: statusMap
    });
  });

  // 4. Calculate Final Percentages and KPIs (Late is considered as Present)
  let totalAttendedSum = 0;
  let belowThresholdCount = 0;
  let minThreshold = 75;

  const configSheet = ss.getSheetByName(SHEET_CONFIG);
  if (configSheet && configSheet.getLastRow() >= 2) {
    const cData = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 2).getValues();
    cData.forEach(r => {
      if (r[0] && r[0].toString().trim() === 'MIN_ATTENDANCE_PERCENT') {
        minThreshold = parseFloat(r[1]) || 75;
      }
    });
  }

  const rows = Array.from(studentStats.values()).map(s => {
    // L (Late) is counted as Present when calculating the percentage
    const effectivePresent = s.present + s.late;
    const pct = s.totalHours > 0 ? (effectivePresent / s.totalHours) * 100 : 0;
    s.percentage = pct.toFixed(2) + '%';
    s.numericPercentage = pct;

    totalAttendedSum += pct;
    if (pct < minThreshold && s.totalHours > 0) {
      belowThresholdCount++;
    }
    return s;
  });

  const averageClassPercentage = students.length > 0 ? (totalAttendedSum / students.length).toFixed(2) + '%' : '0.00%';

  // Resolve Class Name
  let className = classId;
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  if (classesSheet && classesSheet.getLastRow() >= 2) {
    const cData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 2).getValues();
    for (let i = 0; i < cData.length; i++) {
      if (cData[i][0] && cData[i][0].toString().trim().toLowerCase() === classId.toLowerCase()) {
        className = cData[i][1] ? cData[i][1].toString().trim() : classId;
        break;
      }
    }
  }

  // Resolve College Name
  let collegeName = "Department of Botany";
  if (configSheet && configSheet.getLastRow() >= 2) {
    const cData = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 2).getValues();
    cData.forEach(r => {
      if (r[0] && r[0].toString().trim() === 'COLLEGE_NAME') {
        collegeName = r[1] ? r[1].toString().trim() : collegeName;
      }
    });
  }

  return {
    success: true,
    classId: classId,
    className: className,
    collegeName: collegeName,
    fromDate: fromDate,
    toDate: toDate,
    totalSessions: totalSessionsCount,
    studentCount: students.length,
    averageAttendance: averageClassPercentage,
    belowThresholdCount: belowThresholdCount,
    minThreshold: minThreshold,
    hasDepartmentColumn: students.some(s => s.department && s.department.trim().length > 0),
    sessions: matchingSessions,
    rows: rows
  };
}

/**
 * Generates an official, paginated A4 PDF of the attendance register (matrix view).
 * @param {Object} filter { classId, fromDate, toDate, facultyEmail, orientation }
 * @returns {Object} { success: boolean, base64: string, filename: string, message?: string }
 */
function downloadRegisterPdf(filter, authToken) {
  const user = getCurrentUser(authToken);
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  const reportData = getAttendanceReport(filter || {});
  if (!reportData.success) {
    return reportData;
  }

  if (!reportData.sessions || reportData.sessions.length === 0) {
    return { success: false, message: "No recorded attendance sessions found for the specified period." };
  }

  const orientation = (filter && filter.orientation === 'portrait') ? 'portrait' : 'landscape';
  const htmlContent = buildRegisterPdfHtml(reportData, orientation);

  try {
    const blob = HtmlService.createHtmlOutput(htmlContent).getAs('application/pdf');
    const safeClass = (reportData.className || reportData.classId || 'Class').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${safeClass}_Attendance_Register_${orientation.toUpperCase()}.pdf`;
    blob.setName(filename);

    return {
      success: true,
      filename: filename,
      base64: Utilities.base64Encode(blob.getBytes())
    };
  } catch (err) {
    Logger.log("Error generating Register PDF: " + err.toString());
    return { success: false, message: "Error compiling PDF: " + err.toString() };
  }
}

/**
 * Builds the HTML content for the Paginated A4 Attendance Register PDF.
 * @param {Object} data Report data returned by getAttendanceReport
 * @param {string} orientation 'landscape' or 'portrait'
 * @returns {string} Fully self-contained HTML string with inline CSS
 */
function buildRegisterPdfHtml(data, orientation) {
  const chunkSize = orientation === 'portrait' ? 10 : 18;
  const sessions = data.sessions || [];
  const chunks = [];
  for (let i = 0; i < sessions.length; i += chunkSize) {
    chunks.push(sessions.slice(i, i + chunkSize));
  }
  if (chunks.length === 0) chunks.push([]);

  const collegeName = data.collegeName || "Department of Botany";
  const className = data.className || data.classId || "";
  const dateRangeStr = (data.fromDate && data.toDate) 
    ? `${data.fromDate} to ${data.toDate}` 
    : (data.fromDate ? `From ${data.fromDate}` : (data.toDate ? `Up to ${data.toDate}` : 'All Recorded Dates'));

  const formatShortDate = (dStr) => {
    if (!dStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dStr)) {
      const parts = dStr.split('-');
      return `${parts[2]}/${parts[1]}`;
    }
    if (/^\d{2}-\d{2}-\d{4}$/.test(dStr)) {
      const parts = dStr.split('-');
      return `${parts[0]}/${parts[1]}`;
    }
    return dStr;
  };

  const formatShortPeriod = (pStr) => {
    if (!pStr) return '';
    const match = pStr.match(/\d+/);
    return match ? `P${match[0]}` : pStr;
  };

  let pagesHtml = '';

  chunks.forEach((chunk, cIdx) => {
    const isLastChunk = cIdx === chunks.length - 1;
    const partLabel = chunks.length > 1 ? `Part ${cIdx + 1} of ${chunks.length}` : 'Part 1 of 1';

    let tableHeaders = `
      <th style="width: 24px; text-align: center;">#</th>
      <th style="width: 75px; text-align: left;">Reg No</th>
      <th style="width: 140px; text-align: left;">Student Name</th>
    `;
    if (data.hasDepartmentColumn) {
      tableHeaders += `<th style="width: 60px; text-align: left;">Dept</th>`;
    }

    chunk.forEach(s => {
      tableHeaders += `
        <th style="min-width: 32px; text-align: center;">
          <div style="font-size: 7pt; color: #475569; font-weight: normal;">${formatShortDate(s.date)}</div>
          <div style="font-size: 8pt; font-weight: bold; color: #0f172a;">${formatShortPeriod(s.period)}</div>
          ${s.subject ? `<div style="font-size: 6.5pt; color: #64748b; font-weight: normal;">${escapeGasHtml(s.subject.substring(0, 8))}</div>` : ''}
        </th>
      `;
    });

    if (isLastChunk) {
      tableHeaders += `
        <th style="width: 45px; text-align: center; background-color: #e2e8f0; font-weight: bold;">Total P</th>
        <th style="width: 45px; text-align: center; background-color: #e2e8f0; font-weight: bold;">Total Hrs</th>
        <th style="width: 45px; text-align: center; background-color: #e2e8f0; font-weight: bold;">%</th>
      `;
    }

    let tableRows = '';
    data.rows.forEach((r, rIdx) => {
      const threshold = data.minThreshold || 75;
      const isShortage = r.numericPercentage < threshold;

      let rowHtml = `
        <td style="text-align: center; color: #64748b;">${r.rollNo || (rIdx + 1)}</td>
        <td style="font-family: monospace; font-size: 7.5pt; text-align: left;">${escapeGasHtml(r.regNo)}</td>
        <td style="text-align: left; font-weight: 500;">${escapeGasHtml(r.name)}${r.isInactive ? ' (Inactive)' : ''}</td>
      `;
      if (data.hasDepartmentColumn) {
        rowHtml += `<td style="text-align: left; font-size: 7pt;">${escapeGasHtml(r.department || '-')}</td>`;
      }

      chunk.forEach(s => {
        const st = (r.statusMap && r.statusMap[s.sessionId]) ? r.statusMap[s.sessionId] : 'P';
        let cellStyle = 'text-align: center; font-weight: bold; color: #15803d; background-color: #f0fdf4;';
        if (st === 'A') cellStyle = 'text-align: center; font-weight: 800; color: #b91c1c; background-color: #fee2e2;';
        else if (st === 'L') cellStyle = 'text-align: center; font-weight: bold; color: #b45309; background-color: #fef3c7;';
        rowHtml += `<td style="${cellStyle}">${st}</td>`;
      });

      if (isLastChunk) {
        const pctStyle = isShortage ? 'color: #b91c1c; font-weight: 800;' : 'color: #15803d; font-weight: bold;';
        rowHtml += `
          <td style="text-align: center; font-weight: bold; background-color: #f8fafc;">${r.present + r.late}</td>
          <td style="text-align: center; background-color: #f8fafc;">${r.totalHours}</td>
          <td style="text-align: center; font-family: monospace; background-color: #f8fafc; ${pctStyle}">${r.percentage}</td>
        `;
      }

      tableRows += `<tr>${rowHtml}</tr>`;
    });

    pagesHtml += `
      <div class="page-container">
        <!-- Header -->
        <div class="header-box">
          <div class="college-title">${escapeGasHtml(collegeName)}</div>
          <div class="dept-title">Department Attendance Register</div>
          <div class="meta-bar">
            <span><strong>Class:</strong> ${escapeGasHtml(className)} (${escapeGasHtml((data.classId || '').toUpperCase())})</span>
            <span><strong>Date Range:</strong> ${escapeGasHtml(dateRangeStr)}</span>
            <span><strong>Conducted Hours:</strong> ${data.totalSessions}</span>
            <span style="font-weight: bold; color: #4338ca;">${partLabel}</span>
          </div>
        </div>

        <!-- Table -->
        <table class="matrix-table">
          <thead>
            <tr>${tableHeaders}</tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <!-- Footer / Signatures -->
        <div class="legend-box">
          <span><strong>Legend:</strong> <strong style="color: #15803d;">P</strong>: Present | <strong style="color: #b91c1c;">A</strong>: Absent | <strong style="color: #b45309;">L</strong>: Late (Counted as Present)</span>
          <span>Generated: ${new Date().toLocaleDateString()} | Minimum Threshold: ${data.minThreshold || 75}%</span>
        </div>

        <div class="signatures-row">
          <div class="sig-block">Class Tutor Signature</div>
          <div class="sig-block">Head of Department (HOD)</div>
          <div class="sig-block">Principal Signature & Seal</div>
        </div>
      </div>
    `;
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Attendance Register - ${escapeGasHtml(className)}</title>
      <style>
        @page {
          size: ${orientation};
          margin: 8mm 8mm 8mm 8mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          font-size: 8pt;
        }
        .page-container {
          page-break-after: always;
          break-after: page;
          padding: 4px;
        }
        .page-container:last-child {
          page-break-after: avoid;
          break-after: avoid;
        }
        .header-box {
          text-align: center;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 5px;
          margin-bottom: 8px;
        }
        .college-title {
          font-size: 13pt;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #1e3a8a;
          margin: 0;
        }
        .dept-title {
          font-size: 9.5pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #334155;
          margin: 2px 0 0 0;
        }
        .meta-bar {
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          color: #475569;
          margin-top: 5px;
          border-top: 1px dotted #cbd5e1;
          padding-top: 3px;
        }
        table.matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 7.5pt;
        }
        table.matrix-table th, table.matrix-table td {
          border: 1px solid #475569;
          padding: 2.5px 2px;
        }
        table.matrix-table th {
          background-color: #f1f5f9;
          color: #0f172a;
          font-weight: 700;
        }
        .legend-box {
          margin-top: 6px;
          font-size: 7pt;
          color: #64748b;
          display: flex;
          justify-content: space-between;
        }
        .signatures-row {
          margin-top: 28px;
          display: flex;
          justify-content: space-between;
          font-size: 8pt;
          font-weight: 600;
          text-align: center;
          page-break-inside: avoid;
        }
        .sig-block {
          width: 28%;
          border-top: 1px solid #334155;
          padding-top: 4px;
        }
      </style>
    </head>
    <body>
      ${pagesHtml}
    </body>
    </html>
  `;
}

function escapeGasHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Updates application configuration settings in _Config sheet. (Admin only)
 * Enables live modification of MIN_ATTENDANCE_PERCENT, COLLEGE_NAME, and PORTAL_TITLE.
 * @param {Object} configData { minAttendance, collegeName, portalTitle }
 * @returns {Object} { success: boolean, message: string, config: Object }
 */
function updateAppConfig(configData) {
  requireAdmin();
  const ss = getSpreadsheet();
  let configSheet = ss.getSheetByName(SHEET_CONFIG);
  if (!configSheet) {
    setupDatabase();
    configSheet = ss.getSheetByName(SHEET_CONFIG);
  }

  const minAttendance = (configData.minAttendance || '75').toString().trim();
  const collegeName = (configData.collegeName || 'Attendance App').trim();
  const portalTitle = (configData.portalTitle || 'Department Attendance Management').trim();

  const data = configSheet.getDataRange().getValues();
  const keyRowMap = new Map();
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0] ? data[i][0].toString().trim() : '';
    if (key) keyRowMap.set(key, i + 1);
  }

  const updates = [
    { key: "MIN_ATTENDANCE_PERCENT", val: minAttendance },
    { key: "COLLEGE_NAME", val: collegeName },
    { key: "PORTAL_TITLE", val: portalTitle }
  ];

  updates.forEach(u => {
    if (keyRowMap.has(u.key)) {
      configSheet.getRange(keyRowMap.get(u.key), 2).setValue(u.val);
    } else {
      configSheet.appendRow([u.key, u.val]);
    }
  });

  return {
    success: true,
    message: "System configuration saved successfully.",
    config: {
      minAttendance: parseFloat(minAttendance) || 75,
      collegeName: collegeName,
      portalTitle: portalTitle
    }
  };
}

/**
 * Promotes a batch of students to the next class.
 * CRITICAL: Past attendance records are 100% PRESERVED under the old class id.
 * Only the student's current enrollment in the Students table is updated.
 * @param {Object} payload { sourceClassId, targetClassName, studentIds, archiveSourceClass }
 * @returns {Object} { success: boolean, message: string }
 */
function promoteBatch(payload) {
  requireAdmin();
  const sourceClassId = (payload.sourceClassId || '').trim();
  const targetClassName = (payload.targetClassName || '').trim();
  const studentIds = payload.studentIds || [];
  const archiveSourceClass = !!payload.archiveSourceClass;

  if (!sourceClassId || !targetClassName || studentIds.length === 0) {
    return { success: false, message: "Missing required promotion parameters or no students selected." };
  }

  const targetClassId = targetClassName.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  if (sourceClassId === targetClassId) {
    return { success: false, message: "Source and target classes cannot be the same." };
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (e) {
    return { success: false, message: "Server busy. Please try again." };
  }

  try {
    const ss = getSpreadsheet();
    const classesSheet = ss.getSheetByName(SHEET_CLASSES);
    const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);

    // 1. Ensure Target Class exists in Classes sheet
    const classData = classesSheet.getDataRange().getValues();
    let targetClassFound = false;
    for (let i = 1; i < classData.length; i++) {
      if (classData[i][0] && classData[i][0].toString().trim() === targetClassId) {
        targetClassFound = true;
        classesSheet.getRange(i + 1, 2).setValue(targetClassName);
        classesSheet.getRange(i + 1, 4).setValue("Active");
        break;
      }
    }
    if (!targetClassFound) {
      classesSheet.appendRow([targetClassId, targetClassName, "General", "Active"]);
    }

    // 2. Optionally Archive Source Class in Classes sheet and its visual register
    if (archiveSourceClass) {
      for (let i = 1; i < classData.length; i++) {
        if (classData[i][0] && classData[i][0].toString().trim() === sourceClassId) {
          classesSheet.getRange(i + 1, 4).setValue("Archived");
          break;
        }
      }

      // Automatically preserve the previous batch's visual register sheet by renaming it with an archive stamp
      try {
        const sourceSheetName = getClassLogSheetName(sourceClassId);
        const sourceSheet = ss.getSheetByName(sourceSheetName);
        if (sourceSheet) {
          const dateTag = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "Asia/Kolkata", "yyyy_MM");
          let archiveSheetName = `${sourceSheetName}_Archived_${dateTag}`;
          let counter = 1;
          while (ss.getSheetByName(archiveSheetName)) {
            archiveSheetName = `${sourceSheetName}_Archived_${dateTag}_${counter++}`;
          }
          sourceSheet.setName(archiveSheetName.substring(0, 50));
          Logger.log(`Archived previous batch columnar sheet: ${sourceSheetName} -> ${archiveSheetName}`);
        }
      } catch (archErr) {
        Logger.log("Non-critical error archiving source columnar sheet: " + archErr);
      }
    }

    // 3. Update current class of selected students in Students sheet
    // Historical attendance records in AttendanceSessions & AttendanceRecords are NEVER modified!
    const studentData = studentsSheet.getDataRange().getValues();
    const studentIdSet = new Set(studentIds);
    let updatedCount = 0;

    for (let i = 1; i < studentData.length; i++) {
      const sId = studentData[i][0] ? studentData[i][0].toString().trim() : '';
      const regNo = studentData[i][1] ? studentData[i][1].toString().trim() : '';
      const currentClass = studentData[i][3] ? studentData[i][3].toString().trim() : '';

      if (currentClass === sourceClassId && (studentIdSet.has(sId) || studentIdSet.has(regNo))) {
        studentsSheet.getRange(i + 1, 4).setValue(targetClassId);
        updatedCount++;
      }
    }

    // 4. Update class in Log1 columnar register for promoted students
    try {
      const logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
      if (logSheet && logSheet.getLastRow() >= 2) {
        const lData = logSheet.getRange(2, 1, logSheet.getLastRow() - 1, 4).getValues();
        for (let r = 0; r < lData.length; r++) {
          const regNo = lData[r][0] ? lData[r][0].toString().trim() : '';
          if (studentIdSet.has(regNo)) {
            logSheet.getRange(r + 2, 4).setValue(targetClassName);
          }
        }
      }
    } catch (colPromoteErr) {
      Logger.log("Non-critical error updating Log1 on promotion: " + colPromoteErr.toString());
    }

    // 5. Ensure Target Class dedicated columnar register sheet is created with promoted students
    try {
      ensureClassColumnarLogSheet(ss, targetClassId, targetClassName);
    } catch (targetLogErr) {
      Logger.log("Non-critical error creating target class columnar log: " + targetLogErr);
    }

    return {
      success: true,
      message: `Successfully promoted ${updatedCount} students to "${targetClassName}". All past attendance records remain safely preserved.`,
      targetClassId: targetClassId,
      targetClassName: targetClassName
    };

  } catch (err) {
    Logger.log("Error in promoteBatch: " + err.toString());
    return { success: false, message: "Error during promotion: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Safely clears or purges attendance data for a specific class. (Admin only)
 * @param {string} classId
 * @param {string} purgeMode ('attendance_only' | 'class_and_attendance')
 * @returns {Object} { success: boolean, message: string }
 */
function clearClassAttendanceData(classId, purgeMode) {
  requireAdmin();
  classId = (classId || '').trim();
  if (!classId) return { success: false, message: "Class ID is required." };

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (e) {
    return { success: false, message: "Server busy. Please try again." };
  }

  try {
    const ss = getSpreadsheet();
    const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
    const recordsSheet = ss.getSheetByName(SHEET_RECORDS);

    // 1. Identify all session IDs for this class
    const sessionData = sessionsSheet.getDataRange().getValues();
    const sessionIdsToDelete = new Set();
    const sessionRowsToDelete = [];

    for (let i = sessionData.length - 1; i >= 1; i--) {
      const sClass = sessionData[i][3] ? sessionData[i][3].toString().trim() : '';
      if (sClass === classId) {
        sessionIdsToDelete.add(sessionData[i][0].toString().trim());
        sessionRowsToDelete.push(i + 1);
      }
    }

    // Delete matching rows from AttendanceSessions in reverse order
    sessionRowsToDelete.forEach(rowIdx => sessionsSheet.deleteRow(rowIdx));

    // 2. Delete matching records from AttendanceRecords
    if (sessionIdsToDelete.size > 0 && recordsSheet && recordsSheet.getLastRow() >= 2) {
      const recData = recordsSheet.getDataRange().getValues();
      const recRowsToDelete = [];
      for (let i = recData.length - 1; i >= 1; i--) {
        const sId = recData[i][1] ? recData[i][1].toString().trim() : '';
        if (sessionIdsToDelete.has(sId)) {
          recRowsToDelete.push(i + 1);
        }
      }
      recRowsToDelete.forEach(rowIdx => recordsSheet.deleteRow(rowIdx));
    }

    // 3. If mode is 'class_and_attendance', also remove class and students
    if (purgeMode === 'class_and_attendance') {
      const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
      if (studentsSheet && studentsSheet.getLastRow() >= 2) {
        const sData = studentsSheet.getDataRange().getValues();
        const sRowsToDelete = [];
        for (let i = sData.length - 1; i >= 1; i--) {
          const sClass = sData[i][3] ? sData[i][3].toString().trim() : '';
          if (sClass === classId) {
            sRowsToDelete.push(i + 1);
          }
        }
        sRowsToDelete.forEach(rowIdx => studentsSheet.deleteRow(rowIdx));
      }

      const classesSheet = ss.getSheetByName(SHEET_CLASSES);
      if (classesSheet && classesSheet.getLastRow() >= 2) {
        const cData = classesSheet.getDataRange().getValues();
        for (let i = cData.length - 1; i >= 1; i--) {
          const cId = cData[i][0] ? cData[i][0].toString().trim() : '';
          if (cId === classId) {
            classesSheet.deleteRow(i + 1);
            break;
          }
        }
      }
    }

    // 4. Clean up columns and rows in Log1 (Columnar register)
    try {
      const logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
      if (logSheet) {
        // Resolve className
        let className = classId;
        const classesSheet = ss.getSheetByName(SHEET_CLASSES);
        if (classesSheet && classesSheet.getLastRow() >= 2) {
          const cData = classesSheet.getDataRange().getValues();
          for (let i = 1; i < cData.length; i++) {
            if (cData[i][0] && cData[i][0].toString().trim() === classId) {
              className = cData[i][1] ? cData[i][1].toString().trim() : classId;
              break;
            }
          }
        }

        // Delete matching session columns from right to left
        if (logSheet.getLastColumn() >= 5) {
          const lastCol = logSheet.getLastColumn();
          const headers = logSheet.getRange(1, 1, 1, lastCol).getValues()[0];
          for (let c = lastCol; c >= 5; c--) {
            const h = headers[c - 1] ? headers[c - 1].toString().trim() : '';
            if (h.endsWith(`- ${className}`) || h.endsWith(`- ${classId}`) || h.includes(`- ${classId}`)) {
              logSheet.deleteColumn(c);
            }
          }
        }

        // If complete purge, also delete student rows from Log1
        if (purgeMode === 'class_and_attendance' && logSheet.getLastRow() >= 2) {
          const lData = logSheet.getRange(2, 4, logSheet.getLastRow() - 1, 1).getValues();
          for (let r = lData.length - 1; r >= 0; r--) {
            const studentClass = lData[r][0] ? lData[r][0].toString().trim() : '';
            if (studentClass === className || studentClass === classId) {
              logSheet.deleteRow(r + 2);
            }
          }
        }
      }
    } catch (colClearErr) {
      Logger.log("Non-critical error clearing Log1: " + colClearErr.toString());
    }

    return {
      success: true,
      message: `Cleared ${sessionIdsToDelete.size} attendance sessions for class "${classId}".` + 
               (purgeMode === 'class_and_attendance' ? ' Class and students removed.' : ' Class roster preserved.')
    };

  } catch (err) {
    Logger.log("Error in clearClassAttendanceData: " + err.toString());
    return { success: false, message: "Error clearing data: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * ==========================================================
 * COLUMNAR REGISTER SYNC UTILITIES (LOG1)
 * Keeps a real-time, visual, horizontal attendance register
 * matching the original Log1 format:
 * - Col A: Register No
 * - Col B: Name
 * - Col C: Roll No
 * - Col D: Class
 * - Col E+: Date - Period - Faculty - Class
 * ==========================================================
 */

/**
 * Normalizes and returns a clean, sheet-safe name for a class's dedicated log sheet.
 * e.g., "Log_FYUG_S2", "Log_FYUG_S4", "Log_FYUG_S6"
 * @param {string} classId
 * @param {string} [className]
 * @returns {string}
 */
function getClassLogSheetName(classId, className) {
  let label = (className || classId || '').trim();
  if (!label) label = classId || 'Class';
  let clean = label.replace(/[:\\/?*\[\]']/g, '').replace(/\s+/g, '_');
  if (!clean.toUpperCase().startsWith('LOG_')) {
    clean = 'Log_' + clean;
  }
  return clean.substring(0, 50);
}

/**
 * Ensures a dedicated columnar register sheet exists for a specific class (e.g. Log_FYUG_S2)
 * containing all active students enrolled in this class, sorted in Roll No order.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @param {string} classId
 * @param {string} [className]
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function ensureClassColumnarLogSheet(ss, classId, className) {
  if (!classId) return null;
  const sheetName = getClassLogSheetName(classId, className);
  let classLogSheet = ss.getSheetByName(sheetName);
  if (!classLogSheet) {
    classLogSheet = ss.insertSheet(sheetName);
    classLogSheet.getRange(1, 1, 1, 4).setValues([["Register No", "Name", "Roll No", "Department"]]).setFontWeight("bold");
    classLogSheet.setFrozenRows(1);
    classLogSheet.setFrozenColumns(4);
  }

  // Get active students for this class (sorted by roll number)
  const students = getStudentsByClass(classId, false);
  if (!students || students.length === 0) return classLogSheet;

  const lastRow = classLogSheet.getLastRow();
  const existingRegMap = new Map(); // regNo -> row index (1-based)
  if (lastRow >= 2) {
    const existing = classLogSheet.getRange(2, 1, lastRow - 1, 4).getValues();
    existing.forEach((r, idx) => {
      const reg = r[0] ? r[0].toString().trim().toUpperCase() : '';
      if (reg) existingRegMap.set(reg, idx + 2);
    });
  }

  const rowsToAppend = [];
  students.forEach(st => {
    const reg = (st.regNo || '').toString().trim().toUpperCase();
    if (!reg) return;
    if (existingRegMap.has(reg)) {
      const rowIdx = existingRegMap.get(reg);
      classLogSheet.getRange(rowIdx, 2, 1, 3).setValues([[st.name, st.rollNo, st.department || '']]);
    } else {
      rowsToAppend.push([st.regNo, st.name, st.rollNo, st.department || '']);
    }
  });

  if (rowsToAppend.length > 0) {
    classLogSheet.getRange(classLogSheet.getLastRow() + 1, 1, rowsToAppend.length, 4).setValues(rowsToAppend);
  }

  return classLogSheet;
}

/**
 * Synchronizes an attendance session to the dedicated per-class columnar register sheet (e.g. Log_FYUG_S2).
 * Appends or updates the session column with P / A / L marks for all students in that class.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @param {Object} sessionInfo { dateString, period, classId, subject, facultyEmail, records }
 */
function syncSessionToClassColumnarLog(ss, sessionInfo) {
  const classId = (sessionInfo.classId || '').trim();
  if (!classId) return;

  // Resolve Class Name
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  let className = classId;
  if (classesSheet && classesSheet.getLastRow() >= 2) {
    const cData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 2).getValues();
    for (let i = 0; i < cData.length; i++) {
      if (cData[i][0] && cData[i][0].toString().trim() === classId) {
        className = cData[i][1] ? cData[i][1].toString().trim() : classId;
        break;
      }
    }
  }

  const classLogSheet = ensureClassColumnarLogSheet(ss, classId, className);
  if (!classLogSheet) return;

  // Resolve Faculty Display Name
  let facultyDisplay = sessionInfo.facultyEmail || 'Faculty';
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  if (usersSheet && usersSheet.getLastRow() >= 2) {
    const uData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 2).getValues();
    for (let i = 0; i < uData.length; i++) {
      if (uData[i][0] && uData[i][0].toString().toLowerCase().trim() === (sessionInfo.facultyEmail || '').toLowerCase().trim()) {
        facultyDisplay = uData[i][1] ? uData[i][1].toString().trim() : uData[i][0];
        break;
      }
    }
  }

  const dateString = sessionInfo.dateString;
  const period = sessionInfo.period;
  const subject = (sessionInfo.subject || '').trim();
  const records = sessionInfo.records || [];

  // Header format: Date - Period - Faculty (Subject)
  const targetHeader = `${dateString} - ${period} - ${facultyDisplay}${subject ? ' (' + subject + ')' : ''}`;
  const headerPrefix = `${dateString} - ${period} - `;

  // Read existing headers
  const maxCols = Math.max(classLogSheet.getLastColumn(), 4);
  const headerRow = classLogSheet.getRange(1, 1, 1, maxCols).getValues()[0];

  let colToWrite = -1;
  for (let c = 4; c < headerRow.length; c++) {
    const h = headerRow[c] ? headerRow[c].toString().trim() : '';
    if (h === targetHeader || h.startsWith(headerPrefix)) {
      colToWrite = c + 1;
      break;
    }
  }

  if (colToWrite === -1) {
    colToWrite = Math.max(classLogSheet.getLastColumn() + 1, 5);
  }

  // Set the header
  classLogSheet.getRange(1, colToWrite).setValue(targetHeader).setFontWeight("bold");

  // Read all student RegNos from this class sheet
  const lastRow = classLogSheet.getLastRow();
  if (lastRow < 2) return;

  const regNos = classLogSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  const statusMap = new Map();
  records.forEach(r => {
    const reg = (r.regNo || '').toString().trim().toUpperCase();
    if (reg) statusMap.set(reg, (r.status || 'P').toString().trim().toUpperCase());
  });

  // Prepare column values: every student in this class defaults to 'P' if not marked A or L
  const colValues = regNos.map(reg => {
    const cleanReg = reg ? reg.toString().trim().toUpperCase() : '';
    return [statusMap.get(cleanReg) || 'P'];
  });

  // Bulk write
  classLogSheet.getRange(2, colToWrite, colValues.length, 1).setValues(colValues).setHorizontalAlignment("center");
  Logger.log(`Successfully synced session to ${classLogSheet.getName()} column ${colToWrite} (${targetHeader})`);
}

/**
 * Backfills past attendance sessions into the per-class columnar register sheets.
 * Ensures historical sessions appear immediately in Log_FYUG_S2, Log_FYUG_S4, Log_FYUG_S6.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 */
function backfillClassColumnarSheets(ss) {
  const sessionsSheet = ss.getSheetByName(SHEET_SESSIONS);
  const recordsSheet = ss.getSheetByName(SHEET_RECORDS);
  if (!sessionsSheet || sessionsSheet.getLastRow() < 2) return;

  const sData = sessionsSheet.getRange(2, 1, sessionsSheet.getLastRow() - 1, 9).getValues();
  if (sData.length === 0) return;

  // Build map of sessionId -> records [{ regNo, studentId, status }]
  const sessionRecordsMap = new Map();
  if (recordsSheet && recordsSheet.getLastRow() >= 2) {
    const rData = recordsSheet.getRange(2, 1, recordsSheet.getLastRow() - 1, 5).getValues();
    rData.forEach(r => {
      const sessId = r[1] ? r[1].toString().trim() : '';
      if (!sessId) return;
      if (!sessionRecordsMap.has(sessId)) {
        sessionRecordsMap.set(sessId, []);
      }
      sessionRecordsMap.get(sessId).push({
        studentId: r[2] ? r[2].toString().trim() : '',
        regNo: r[3] ? r[3].toString().trim() : '',
        status: r[4] ? r[4].toString().trim().toUpperCase() : 'P'
      });
    });
  }

  sData.forEach(row => {
    const sId = row[0] ? row[0].toString().trim() : '';
    const dateStr = formatGasDate(row[1]);
    const period = row[2] ? row[2].toString().trim() : '';
    const classId = row[3] ? row[3].toString().trim() : '';
    const subject = row[4] ? row[4].toString().trim() : '';
    const facultyEmail = row[5] ? row[5].toString().trim() : '';

    if (!classId || !dateStr || !period) return;

    const records = sessionRecordsMap.get(sId) || [];
    syncSessionToClassColumnarLog(ss, {
      dateString: dateStr,
      period: period,
      classId: classId,
      subject: subject,
      facultyEmail: facultyEmail,
      records: records
    });
  });
}

/**
 * Ensures all active classes have their dedicated columnar log sheets created and up-to-date.
 * Also backfills previous attendance sessions into the per-class sheets.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 */
function ensureAllClassColumnarSheets(ss) {
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  const classesToEnsure = [];

  if (classesSheet && classesSheet.getLastRow() >= 2) {
    const cData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 4).getValues();
    cData.forEach(r => {
      const cId = r[0] ? r[0].toString().trim() : '';
      const cName = r[1] ? r[1].toString().trim() : cId;
      const status = r[3] ? r[3].toString().trim() : 'Active';
      if (cId && status.toLowerCase() === 'active') {
        classesToEnsure.push({ classId: cId, className: cName });
      }
    });
  }

  // Ensure canonical classes are included
  ['fyug_s2', 'fyug_s4', 'fyug_s6'].forEach(canonId => {
    if (!classesToEnsure.some(c => c.classId.toLowerCase() === canonId)) {
      classesToEnsure.push({ classId: canonId, className: canonId.toUpperCase() });
    }
  });

  // Ensure sheet for each class
  classesToEnsure.forEach(c => {
    try {
      ensureClassColumnarLogSheet(ss, c.classId, c.className);
    } catch (e) {
      Logger.log(`Error ensuring columnar sheet for ${c.classId}: ${e}`);
    }
  });

  // Backfill historical sessions into per-class sheets
  try {
    backfillClassColumnarSheets(ss);
  } catch (bfErr) {
    Logger.log("Non-critical error in backfillClassColumnarSheets: " + bfErr);
  }
}

/**
 * Ensures Log1 columnar sheet exists and contains all active students.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function ensureColumnarLogStudents(ss) {
  let logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
  if (!logSheet) {
    logSheet = ss.insertSheet(SHEET_LOG_COLUMNAR);
    logSheet.getRange(1, 1, 1, 4).setValues([["Register No", "Name", "Roll No", "Class"]]).setFontWeight("bold");
    logSheet.setFrozenRows(1);
    logSheet.setFrozenColumns(4);
  }

  const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  if (!studentsSheet || studentsSheet.getLastRow() < 2) return logSheet;

  // Build ClassId -> ClassName map
  const classMap = new Map();
  if (classesSheet && classesSheet.getLastRow() >= 2) {
    const cData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 2).getValues();
    cData.forEach(r => {
      const cId = r[0] ? r[0].toString().trim() : '';
      const cName = r[1] ? r[1].toString().trim() : cId;
      if (cId) classMap.set(cId, cName);
    });
  }

  // Get active students from Students sheet
  const sData = studentsSheet.getRange(2, 1, studentsSheet.getLastRow() - 1, 6).getValues();
  const dbStudents = [];
  sData.forEach(r => {
    const col0 = r[0] ? r[0].toString().trim() : '';
    const isSevenCol = col0.startsWith('STU_');
    const regNo = (isSevenCol ? (r[1] || '') : col0).toString().trim();
    const name = (isSevenCol ? (r[2] || '') : (r[1] || '')).toString().trim();
    const classId = (isSevenCol ? (r[3] || '') : (r[2] || '')).toString().trim();
    const rollNo = (isSevenCol ? (r[4] || '') : (r[3] || '')).toString().trim();
    const status = (isSevenCol ? (r[5] || '') : (r[4] || '')).toString().trim();
    const className = classMap.get(classId) || classId;

    if (regNo && status.toLowerCase() === 'active') {
      dbStudents.push({ regNo, name, rollNo, className });
    }
  });

  // Check students currently in Log1
  const lastLogRow = logSheet.getLastRow();
  const existingRegNoRowMap = new Map();

  if (lastLogRow >= 2) {
    const existingLogData = logSheet.getRange(2, 1, lastLogRow - 1, 4).getValues();
    existingLogData.forEach((r, idx) => {
      const regNo = r[0] ? r[0].toString().trim() : '';
      if (regNo) {
        existingRegNoRowMap.set(regNo, idx + 2);
      }
    });
  }

  const newRows = [];
  dbStudents.forEach(st => {
    if (!existingRegNoRowMap.has(st.regNo)) {
      newRows.push([st.regNo, st.name, st.rollNo, st.className]);
    } else {
      const rowNum = existingRegNoRowMap.get(st.regNo);
      logSheet.getRange(rowNum, 2, 1, 3).setValues([[st.name, st.rollNo, st.className]]);
    }
  });

  if (newRows.length > 0) {
    logSheet.getRange(logSheet.getLastRow() + 1, 1, newRows.length, 4).setValues(newRows);
  }

  return logSheet;
}

/**
 * Synchronizes an attendance session to the master Log1 sheet.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @param {Object} sessionInfo
 */
function syncSessionToMasterLog1(ss, sessionInfo) {
  const logSheet = ensureColumnarLogStudents(ss);
  if (!logSheet) return;

  const dateString = sessionInfo.dateString;
  const period = sessionInfo.period;
  const classId = sessionInfo.classId;
  const records = sessionInfo.records || [];

  // Resolve Class Name
  const classesSheet = ss.getSheetByName(SHEET_CLASSES);
  let className = classId;
  if (classesSheet && classesSheet.getLastRow() >= 2) {
    const cData = classesSheet.getRange(2, 1, classesSheet.getLastRow() - 1, 2).getValues();
    for (let i = 0; i < cData.length; i++) {
      if (cData[i][0] && cData[i][0].toString().trim() === classId) {
        className = cData[i][1] ? cData[i][1].toString().trim() : classId;
        break;
      }
    }
  }

  // Resolve Faculty Display Name
  let facultyDisplay = sessionInfo.facultyEmail || 'Faculty';
  const usersSheet = ss.getSheetByName(SHEET_USERS);
  if (usersSheet && usersSheet.getLastRow() >= 2) {
    const uData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 2).getValues();
    for (let i = 0; i < uData.length; i++) {
      if (uData[i][0] && uData[i][0].toString().toLowerCase().trim() === (sessionInfo.facultyEmail || '').toLowerCase().trim()) {
        facultyDisplay = uData[i][1] ? uData[i][1].toString().trim() : uData[i][0];
        break;
      }
    }
  }

  // Construct column header (Original format: Date - Period - Faculty - Class)
  const targetHeader = `${dateString} - ${period} - ${facultyDisplay} - ${className}`;
  const headerPrefix = `${dateString} - ${period} - `;

  // Read existing headers
  const maxCols = Math.max(logSheet.getLastColumn(), 4);
  const headerRow = logSheet.getRange(1, 1, 1, maxCols).getValues()[0];

  let colToWrite = -1;
  for (let c = 4; c < headerRow.length; c++) {
    const h = headerRow[c] ? headerRow[c].toString().trim() : '';
    if (h === targetHeader || (h.startsWith(headerPrefix) && (h.endsWith(`- ${className}`) || h.endsWith(`- ${classId}`)))) {
      colToWrite = c + 1; // 1-based column index
      break;
    }
  }

  if (colToWrite === -1) {
    colToWrite = Math.max(logSheet.getLastColumn() + 1, 5);
  }

  // Set the header
  logSheet.getRange(1, colToWrite).setValue(targetHeader).setFontWeight("bold");

  // Read all student RegNos from Log1
  const lastRow = logSheet.getLastRow();
  if (lastRow < 2) return;

  const regNos = logSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  const statusMap = new Map();
  records.forEach(r => {
    const reg = (r.regNo || '').toString().trim();
    if (reg) statusMap.set(reg, (r.status || 'P').toString().trim().toUpperCase());
  });

  // Prepare column values for all students in Log1
  const colValues = regNos.map(reg => {
    const cleanReg = reg ? reg.toString().trim() : '';
    if (statusMap.has(cleanReg)) {
      return [statusMap.get(cleanReg)];
    }
    return ['']; // Leave empty if student is not in this session/class
  });

  // Write all student statuses in one bulk operation
  logSheet.getRange(2, colToWrite, colValues.length, 1).setValues(colValues).setHorizontalAlignment("center");
  Logger.log(`Successfully synced session to Log1 column ${colToWrite} (${targetHeader})`);
}

/**
 * Synchronizes an attendance session to both the dedicated per-class columnar register sheet
 * (e.g. Log_FYUG_S2) and the master combined Log1 sheet.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @param {Object} sessionInfo { dateString, period, classId, subject, facultyEmail, records }
 */
function syncSessionToColumnarLog(ss, sessionInfo) {
  // 1. Sync to dedicated per-class register sheet (Log_FYUG_S2, Log_FYUG_S4, Log_FYUG_S6)
  try {
    syncSessionToClassColumnarLog(ss, sessionInfo);
  } catch (clsErr) {
    Logger.log("Non-critical error syncing to class columnar log: " + clsErr.toString());
  }

  // 2. Also sync to master combined Log1 sheet for backward compatibility
  try {
    syncSessionToMasterLog1(ss, sessionInfo);
  } catch (log1Err) {
    Logger.log("Non-critical error syncing to master Log1: " + log1Err.toString());
  }
}

/**
 * Bulk updates student records (RegNo, Name, RollNo, Department) for a class from an exported Excel file.
 * Matches each student by their permanent immutable StudentId (or old RegNo if key missing).
 * The underlying StudentId primary key is NEVER modified, ensuring 100% of past attendance
 * records in AttendanceRecords and Log1 remain intact and connected.
 * @param {string} classId
 * @param {Array<Object>} updatedStudentsList [{ studentKey, regNo, name, rollNo, department, oldRegNo }]
 * @returns {Object} { success: boolean, message: string, updatedCount: number }
 */
function bulkUpdateStudentRoster(classId, updatedStudentsList) {
  const user = getCurrentUser();
  if (!user.isAuthorized) {
    return { success: false, message: "Unauthorized access." };
  }

  classId = (classId || '').trim();
  if (!classId || !updatedStudentsList || updatedStudentsList.length === 0) {
    return { success: false, message: "Missing class or student update list." };
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (e) {
    return { success: false, message: "Server busy. Please try again." };
  }

  try {
    const ss = getSpreadsheet();
    const studentsSheet = ss.getSheetByName(SHEET_STUDENTS);
    if (!studentsSheet || studentsSheet.getLastRow() < 2) {
      return { success: false, message: "Students sheet is empty." };
    }

    const sData = studentsSheet.getDataRange().getValues();
    const stuIdRowMap = new Map();
    const regNoRowMap = new Map();

    for (let i = 1; i < sData.length; i++) {
      const sId = sData[i][0] ? sData[i][0].toString().trim() : '';
      const rNo = sData[i][1] ? sData[i][1].toString().trim().toUpperCase() : '';
      const sClass = sData[i][3] ? sData[i][3].toString().trim() : '';

      if (sClass === classId) {
        if (sId) stuIdRowMap.set(sId, i + 1);
        if (rNo) regNoRowMap.set(rNo, i + 1);
      }
    }

    let updatedCount = 0;
    const regNoChanges = [];

    updatedStudentsList.forEach(item => {
      const studentKey = (item.studentKey || item.studentId || '').toString().trim();
      const newRegNo = (item.regNo || '').toString().trim().toUpperCase();
      const newName = (item.name || '').toString().trim();
      const newRollNo = (item.rollNo || '').toString().trim();
      const newDept = (item.department || item.homeDepartment || '').toString().trim();
      const oldRegNo = (item.oldRegNo || '').toString().trim().toUpperCase();

      if (!newRegNo || !newName) return;

      let targetRow = -1;
      let actualStudentId = studentKey;

      if (studentKey && stuIdRowMap.has(studentKey)) {
        targetRow = stuIdRowMap.get(studentKey);
        actualStudentId = studentKey;
      } else if (oldRegNo && regNoRowMap.has(oldRegNo)) {
        targetRow = regNoRowMap.get(oldRegNo);
        actualStudentId = sData[targetRow - 1][0] ? sData[targetRow - 1][0].toString().trim() : studentKey;
      } else if (regNoRowMap.has(newRegNo)) {
        targetRow = regNoRowMap.get(newRegNo);
        actualStudentId = sData[targetRow - 1][0] ? sData[targetRow - 1][0].toString().trim() : studentKey;
      }

      if (targetRow > 0) {
        const prevRegNo = sData[targetRow - 1][1] ? sData[targetRow - 1][1].toString().trim().toUpperCase() : '';
        if (prevRegNo && prevRegNo !== newRegNo) {
          regNoChanges.push({ oldRegNo: prevRegNo, newRegNo, studentId: actualStudentId });
        }

        // Note: Column 1 (StudentId) is PRESERVED and NEVER modified!
        studentsSheet.getRange(targetRow, 2).setValue(newRegNo);
        studentsSheet.getRange(targetRow, 3).setValue(newName);
        studentsSheet.getRange(targetRow, 5).setValue(newRollNo);
        studentsSheet.getRange(targetRow, 7).setValue(newDept);
        updatedCount++;
      }
    });

    // If any Register Numbers changed, sync AttendanceRecords and Log1
    if (regNoChanges.length > 0) {
      // 1. Sync AttendanceRecords (Col 4 is RegNo)
      const recordsSheet = ss.getSheetByName(SHEET_RECORDS);
      if (recordsSheet && recordsSheet.getLastRow() >= 2) {
        const rData = recordsSheet.getRange(2, 3, recordsSheet.getLastRow() - 1, 2).getValues();
        const stuIdToNewReg = new Map();
        regNoChanges.forEach(c => {
          if (c.studentId) stuIdToNewReg.set(c.studentId, c.newRegNo);
          if (c.oldRegNo) stuIdToNewReg.set(c.oldRegNo, c.newRegNo);
        });

        for (let j = 0; j < rData.length; j++) {
          const recStuId = rData[j][0] ? rData[j][0].toString().trim() : '';
          const recRegNo = rData[j][1] ? rData[j][1].toString().trim().toUpperCase() : '';

          if (stuIdToNewReg.has(recStuId)) {
            recordsSheet.getRange(j + 2, 4).setValue(stuIdToNewReg.get(recStuId));
          } else if (stuIdToNewReg.has(recRegNo)) {
            recordsSheet.getRange(j + 2, 4).setValue(stuIdToNewReg.get(recRegNo));
          }
        }
      }

      // 2. Sync Log1 (Col 1 is Register No, Col 2 is Name, Col 3 is Roll No)
      try {
        const logSheet = ss.getSheetByName(SHEET_LOG_COLUMNAR);
        if (logSheet && logSheet.getLastRow() >= 2) {
          const lData = logSheet.getRange(2, 1, logSheet.getLastRow() - 1, 4).getValues();
          const oldRegToNewObj = new Map();
          regNoChanges.forEach(c => {
            const match = updatedStudentsList.find(u => u.regNo && u.regNo.toUpperCase() === c.newRegNo);
            if (match) {
              oldRegToNewObj.set(c.oldRegNo, { newRegNo: c.newRegNo, name: match.name, rollNo: match.rollNo });
            }
          });

          for (let k = 0; k < lData.length; k++) {
            const lReg = lData[k][0] ? lData[k][0].toString().trim().toUpperCase() : '';
            if (oldRegToNewObj.has(lReg)) {
              const upd = oldRegToNewObj.get(lReg);
              logSheet.getRange(k + 2, 1, 1, 3).setValues([[upd.newRegNo, upd.name, upd.rollNo]]);
            }
          }
        }
      } catch (logErr) {
        Logger.log("Non-critical error updating Log1 in bulkUpdate: " + logErr);
      }
    }

    return {
      success: true,
      message: `Successfully updated ${updatedCount} student records (${regNoChanges.length} Register Numbers updated). All permanent system keys and historical attendance records remain 100% intact.`,
      updatedCount: updatedCount,
      regNoChangesCount: regNoChanges.length
    };

  } catch (err) {
    Logger.log("Error in bulkUpdateStudentRoster: " + err);
    return { success: false, message: "Error updating students: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}
