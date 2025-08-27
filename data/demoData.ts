export const demoData = {
  rooms: [
    { id: "room-101", name: "Room 101" },
    { id: "room-102", name: "Room 102" },
    { id: "room-103", name: "Room 103" },
    { id: "room-201", name: "Room 201" },
    { id: "lab-cs-301", name: "Computer Science Lab 301" },
    { id: "lab-cs-302", name: "Computer Science Lab 302" },
    { id: "lab-ece-401", name: "ECE Lab 401" },
    { id: "lab-mech-501", name: "Mechanical Lab 501" },
    { id: "hall-main", name: "Main Lecture Hall" },
    { id: "seminar-201", name: "Seminar Hall 201" },
    { id: "workshop-601", name: "Workshop 601" },
    { id: "drawing-hall", name: "Engineering Drawing Hall" }
  ],

  subjects: [
    { id: "subject-dsa", name: "Data Structures & Algorithms" },
    { id: "subject-os", name: "Operating Systems" },
    { id: "subject-dbms", name: "Database Management Systems" },
    { id: "subject-cn", name: "Computer Networks" },
    { id: "subject-dld", name: "Digital Logic Design" },
    { id: "subject-coa", name: "Computer Organization & Architecture" },
    { id: "subject-se", name: "Software Engineering" },
    { id: "subject-ai", name: "Artificial Intelligence" },
    { id: "subject-ml", name: "Machine Learning" },
    { id: "subject-web", name: "Web Technologies" },
    { id: "subject-mobile", name: "Mobile Application Development" },
    { id: "subject-cyber", name: "Cyber Security" },
    { id: "subject-signals", name: "Signals & Systems" },
    { id: "subject-vlsi", name: "VLSI Design" },
    { id: "subject-embedded", name: "Embedded Systems" },
    { id: "subject-thermo", name: "Thermodynamics" },
    { id: "subject-fluid", name: "Fluid Mechanics" },
    { id: "subject-som", name: "Strength of Materials" }
  ],

  teachers: [
    { id: "teacher-001", name: "Prof. Rajesh Kumar", department: "Computer Science & Engineering" },
    { id: "teacher-002", name: "Dr. Priya Sharma", department: "Computer Science & Engineering" },
    { id: "teacher-003", name: "Prof. Arjun Singh", department: "Electronics & Communication" },
    { id: "teacher-004", name: "Dr. Meera Patel", department: "Computer Science & Engineering" },
    { id: "teacher-005", name: "Prof. Vikram Gupta", department: "Mechanical Engineering" },
    { id: "teacher-006", name: "Dr. Anita Rao", department: "Electronics & Communication" },
    { id: "teacher-007", name: "Prof. Suresh Reddy", department: "Computer Science & Engineering" },
    { id: "teacher-008", name: "Dr. Kavita Joshi", department: "Information Technology" },
    { id: "teacher-009", name: "Prof. Deepak Verma", department: "Electronics & Communication" },
    { id: "teacher-010", name: "Dr. Sanjay Agarwal", department: "Mechanical Engineering" },
    { id: "teacher-011", name: "Prof. Neha Mittal", department: "Computer Science & Engineering" },
    { id: "teacher-012", name: "Dr. Ramesh Chandra", department: "Information Technology" }
  ],

  branches: [
    { id: "branch-cse", name: "Computer Science & Engineering", code: "CSE" },
    { id: "branch-it", name: "Information Technology", code: "IT" },
    { id: "branch-ece", name: "Electronics & Communication", code: "ECE" },
    { id: "branch-me", name: "Mechanical Engineering", code: "ME" }
  ],

  divisions: [
    { id: "div-cse-2a", name: "CSE 2A", year: "2", branch_id: "branch-cse" },
    { id: "div-cse-2b", name: "CSE 2B", year: "2", branch_id: "branch-cse" },
    { id: "div-cse-3a", name: "CSE 3A", year: "3", branch_id: "branch-cse" },
    { id: "div-it-2a", name: "IT 2A", year: "2", branch_id: "branch-it" },
    { id: "div-ece-2a", name: "ECE 2A", year: "2", branch_id: "branch-ece" },
    { id: "div-me-3a", name: "ME 3A", year: "3", branch_id: "branch-me" }
  ],

  students: [
    { id: "student-001", name: "Aarav Sharma", division_id: "div-cse-2a", roll_number: "CSE2001" },
    { id: "student-002", name: "Diya Patel", division_id: "div-cse-2a", roll_number: "CSE2002" },
    { id: "student-003", name: "Arjun Kumar", division_id: "div-cse-2a", roll_number: "CSE2003" },
    { id: "student-004", name: "Ananya Singh", division_id: "div-cse-2b", roll_number: "CSE2051" },
    { id: "student-005", name: "Karan Gupta", division_id: "div-cse-2b", roll_number: "CSE2052" },
    { id: "student-006", name: "Riya Joshi", division_id: "div-cse-3a", roll_number: "CSE3001" },
    { id: "student-007", name: "Rohit Verma", division_id: "div-it-2a", roll_number: "IT2001" },
    { id: "student-008", name: "Priya Reddy", division_id: "div-it-2a", roll_number: "IT2002" },
    { id: "student-009", name: "Aditya Agarwal", division_id: "div-ece-2a", roll_number: "ECE2001" },
    { id: "student-010", name: "Sneha Mittal", division_id: "div-ece-2a", roll_number: "ECE2002" },
    { id: "student-011", name: "Vikash Yadav", division_id: "div-me-3a", roll_number: "ME3001" },
    { id: "student-012", name: "Pooja Chandra", division_id: "div-me-3a", roll_number: "ME3002" }
  ],

  classes: [
    // Today's classes (August 24, 2025) - Saturday
    {
      id: "class-001",
      lecture_number: "Period 1",
      subject_id: "subject-dsa",
      division_id: "div-cse-2a",
      teacher_id: "teacher-001",
      room_id: "room-101",
      start_date: "2025-08-28T04:00:00Z", // 9:30 AM IST
      end_date: "2025-08-24T04:50:00Z"   // 10:20 AM IST
    },
    {
      id: "class-002",
      lecture_number: "Period 2",
      subject_id: "subject-os",
      division_id: "div-cse-2a",
      teacher_id: "teacher-002",
      room_id: "room-101",
      start_date: "2025-08-26T04:50:00Z", // 10:20 AM IST
      end_date: "2025-08-24T05:40:00Z"   // 11:10 AM IST
    },
    {
      id: "class-003",
      lecture_number: "Period 3",
      subject_id: "subject-dbms",
      division_id: "div-cse-2b",
      teacher_id: "teacher-004",
      room_id: "lab-cs-301",
      start_date: "2025-08-24T06:00:00Z", // 11:30 AM IST
      end_date: "2025-08-24T06:50:00Z"   // 12:20 PM IST
    },
    {
      id: "class-004",
      lecture_number: "Period 4",
      subject_id: "subject-cn",
      division_id: "div-cse-2a",
      teacher_id: "teacher-007",
      room_id: "room-102",
      start_date: "2025-08-25T06:50:00Z", // 12:20 PM IST
      end_date: "2025-08-24T07:40:00Z"   // 1:10 PM IST
    },
    {
      id: "class-005",
      lecture_number: "Period 5",
      subject_id: "subject-web",
      division_id: "div-it-2a",
      teacher_id: "teacher-008",
      room_id: "lab-cs-302",
      start_date: "2025-08-25T08:30:00Z", // 2:00 PM IST (After lunch)
      end_date: "2025-08-24T09:20:00Z"   // 2:50 PM IST
    },
    {
      id: "class-006",
      lecture_number: "Period 6",
      subject_id: "subject-signals",
      division_id: "div-ece-2a",
      teacher_id: "teacher-003",
      room_id: "room-201",
      start_date: "2025-08-24T09:20:00Z", // 2:50 PM IST
      end_date: "2025-08-24T10:10:00Z"   // 3:40 PM IST
    },
    {
      id: "class-007",
      lecture_number: "Period 7",
      subject_id: "subject-ai",
      division_id: "div-cse-3a",
      teacher_id: "teacher-011",
      room_id: "lab-cs-301",
      start_date: "2025-08-24T10:10:00Z", // 3:40 PM IST
      end_date: "2025-08-24T11:00:00Z"   // 4:30 PM IST
    },
    {
      id: "class-008",
      lecture_number: "Period 8",
      subject_id: "subject-thermo",
      division_id: "div-me-3a",
      teacher_id: "teacher-005",
      room_id: "room-103",
      start_date: "2025-08-24T11:00:00Z", // 4:30 PM IST
      end_date: "2025-08-24T11:50:00Z"   // 5:20 PM IST
    }
  ],

  attendance: [
    // Class 1 - DSA (CSE 2A) - Mixed attendance
    { id: "att-001", student_id: "student-001", class_id: "class-001", status: "PRESENT", successful_scan_count: 5, marked_by: "SYSTEM" },
    { id: "att-002", student_id: "student-002", class_id: "class-001", status: "LATE", successful_scan_count: 2, marked_by: "SYSTEM" },
    { id: "att-003", student_id: "student-003", class_id: "class-001", status: "PRESENT", successful_scan_count: 4, marked_by: "SYSTEM" },

    // Class 2 - OS (CSE 2A) - Good attendance
    { id: "att-004", student_id: "student-001", class_id: "class-002", status: "PRESENT", successful_scan_count: 6, marked_by: "SYSTEM" },
    { id: "att-005", student_id: "student-002", class_id: "class-002", status: "PRESENT", successful_scan_count: 5, marked_by: "SYSTEM" },
    { id: "att-006", student_id: "student-003", class_id: "class-002", status: "ABSENT", successful_scan_count: 0, marked_by: "TEACHER" },

    // Class 3 - DBMS (CSE 2B) - Lab class with some absences
    { id: "att-007", student_id: "student-004", class_id: "class-003", status: "PRESENT", successful_scan_count: 7, marked_by: "SYSTEM" },
    { id: "att-008", student_id: "student-005", class_id: "class-003", status: "ABSENT", successful_scan_count: 0, marked_by: "TEACHER" },

    // Class 4 - CN (CSE 2A) - Post lunch, some late arrivals
    { id: "att-009", student_id: "student-001", class_id: "class-004", status: "LATE", successful_scan_count: 3, marked_by: "SYSTEM" },
    { id: "att-010", student_id: "student-002", class_id: "class-004", status: "PRESENT", successful_scan_count: 4, marked_by: "SYSTEM" },
    { id: "att-011", student_id: "student-003", class_id: "class-004", status: "PRESENT", successful_scan_count: 5, marked_by: "SYSTEM" },

    // Class 5 - Web Tech (IT 2A) - Lab session, good participation
    { id: "att-012", student_id: "student-007", class_id: "class-005", status: "PRESENT", successful_scan_count: 8, marked_by: "SYSTEM" },
    { id: "att-013", student_id: "student-008", class_id: "class-005", status: "PRESENT", successful_scan_count: 6, marked_by: "SYSTEM" },

    // Class 6 - Signals (ECE 2A) - Technical subject
    { id: "att-014", student_id: "student-009", class_id: "class-006", status: "PRESENT", successful_scan_count: 4, marked_by: "SYSTEM" },
    { id: "att-015", student_id: "student-010", class_id: "class-006", status: "LATE", successful_scan_count: 2, marked_by: "SYSTEM" },

    // Class 7 - AI (CSE 3A) - Advanced class, high engagement
    { id: "att-016", student_id: "student-006", class_id: "class-007", status: "PRESENT", successful_scan_count: 9, marked_by: "SYSTEM" },

    // Class 8 - Thermodynamics (ME 3A) - Core mechanical subject
    { id: "att-017", student_id: "student-011", class_id: "class-008", status: "PRESENT", successful_scan_count: 5, marked_by: "SYSTEM" },
    { id: "att-018", student_id: "student-012", class_id: "class-008", status: "ABSENT", successful_scan_count: 0, marked_by: "TEACHER" },

    // Additional historical attendance for better stats
    { id: "att-019", student_id: "student-001", class_id: "class-005", status: "PRESENT", successful_scan_count: 4, marked_by: "SYSTEM" },
    { id: "att-020", student_id: "student-002", class_id: "class-006", status: "LATE", successful_scan_count: 1, marked_by: "SYSTEM" },
    { id: "att-021", student_id: "student-003", class_id: "class-007", status: "ABSENT", successful_scan_count: 0, marked_by: "TEACHER" },
    { id: "att-022", student_id: "student-004", class_id: "class-008", status: "PRESENT", successful_scan_count: 6, marked_by: "SYSTEM" }
  ]
};
