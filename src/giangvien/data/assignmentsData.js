/**
 * Danh sách 20 bài tập chung cho tất cả sinh viên (4 môn × 5 bài tập)
 * Bài tập được giao cho tất cả 10 sinh viên từ 3 lớp: 22CT111, 22CT112, 22CT113
 *
 * Sinh viên và trạng thái nộp bài:
 * - SV 1 (Nguyễn Văn Minh): 18/20 bài - tốt
 * - SV 2 (Trần Thị Hương): 17/20 bài - tốt
 * - SV 3 (Lê Hoàng Nam): 8/20 bài - CÓ NGUY CƠ (12 bài missing)
 * - SV 4 (Phạm Thị Lan): 16/20 bài - khá
 * - SV 5 (Vũ Đức Thành): 19/20 bài - xuất sắc
 * - SV 6 (Hoàng Thị Mai): 20/20 bài - hoàn thành
 * - SV 7 (Đặng Văn Hùng): 14/20 bài - trung bình
 * - SV 8 (Bùi Thị Ngọc): 18/20 bài - tốt
 * - SV 9 (Lý Minh Tuấn): 8/20 bài - CÓ NGUY CƠ (12 bài missing)
 * - SV 10 (Ngô Thị Thu): 18/20 bài - tốt
 *
 * Tổng: 156/200 bài = 78% submission rate
 */

// Danh sách bài tập đầy đủ - CHUNG cho tất cả lớp (10 sinh viên)
export const ASSIGNMENTS_LIST = [
  // ========== MÔN 1: NHẬP MÔN LẬP TRÌNH (5 bài) ==========
  {
    id: 1,
    title: 'Biến và Kiểu dữ liệu',
    description: 'Làm quen với các kiểu dữ liệu cơ bản và cách khai báo biến',
    instructions:
      'Khai báo biến, các kiểu dữ liệu int/float/string/boolean, nhập xuất dữ liệu',
    course: 'Nhập môn lập trình',
    courseId: 'intro-prog',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-09-15T08:00:00',
    dueDate: '2024-09-22T23:59:00',
    updatedAt: '2024-09-23T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 3, // SV 3, 9 nộp muộn + 1 SV khác
    averageScore: 7.8,
    maxScore: 10,
  },
  {
    id: 2,
    title: 'Cấu trúc điều khiển',
    description: 'Làm việc với câu lệnh if-else và switch-case',
    instructions: 'Viết chương trình kiểm tra điều kiện, switch-case, nested if',
    course: 'Nhập môn lập trình',
    courseId: 'intro-prog',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-09-25T08:00:00',
    dueDate: '2024-10-02T23:59:00',
    updatedAt: '2024-10-03T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 2, // SV 3, 9 nộp muộn
    averageScore: 7.5,
    maxScore: 10,
  },
  {
    id: 3,
    title: 'Vòng lặp',
    description: 'Sử dụng for, while, do-while để giải quyết bài toán',
    instructions: 'Tính tổng dãy số, in bảng cửu chương, tìm số nguyên tố',
    course: 'Nhập môn lập trình',
    courseId: 'intro-prog',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-05T08:00:00',
    dueDate: '2024-10-12T23:59:00',
    updatedAt: '2024-10-13T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.8,
    maxScore: 10,
  },
  {
    id: 4,
    title: 'Hàm và thủ tục',
    description: 'Xây dựng và sử dụng hàm trong chương trình',
    instructions: 'Viết hàm tính toán, truyền tham số, giá trị trả về',
    course: 'Nhập môn lập trình',
    courseId: 'intro-prog',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-15T08:00:00',
    dueDate: '2024-10-22T23:59:00',
    updatedAt: '2024-10-23T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 2,
    averageScore: 8.0,
    maxScore: 10,
  },
  {
    id: 5,
    title: 'Mảng một chiều',
    description: 'Làm việc với mảng và các thao tác cơ bản',
    instructions: 'Khai báo mảng, duyệt mảng, tìm min/max, sắp xếp cơ bản',
    course: 'Nhập môn lập trình',
    courseId: 'intro-prog',
    className: 'Tất cả lớp',
    status: 'active',
    startDate: '2024-12-01T08:00:00',
    dueDate: '2024-12-20T23:59:00',
    updatedAt: '2024-12-15T10:00:00',
    totalStudents: 10,
    submittedCount: 6, // SV 3, 9, 7, 4 chưa nộp (bài active)
    lateSubmissions: 0,
    averageScore: 8.2,
    maxScore: 10,
  },

  // ========== MÔN 2: KĨ THUẬT LẬP TRÌNH (5 bài) ==========
  {
    id: 6,
    title: 'Con trỏ cơ bản',
    description: 'Làm quen với con trỏ và địa chỉ bộ nhớ',
    instructions: 'Khai báo con trỏ, toán tử &, *, truyền tham chiếu',
    course: 'Kĩ thuật lập trình',
    courseId: 'prog-technique',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-09-20T08:00:00',
    dueDate: '2024-09-27T23:59:00',
    updatedAt: '2024-09-28T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 4, // SV 3, 9 + 2 SV khác nộp muộn
    averageScore: 7.2,
    maxScore: 10,
  },
  {
    id: 7,
    title: 'Con trỏ và mảng',
    description: 'Sử dụng con trỏ để thao tác với mảng',
    instructions: 'Duyệt mảng bằng con trỏ, pointer arithmetic, mảng con trỏ',
    course: 'Kĩ thuật lập trình',
    courseId: 'prog-technique',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-01T08:00:00',
    dueDate: '2024-10-08T23:59:00',
    updatedAt: '2024-10-09T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 3, // SV 3, 9 + 1 SV khác nộp muộn
    averageScore: 7.4,
    maxScore: 10,
  },
  {
    id: 8,
    title: 'Cấp phát động',
    description: 'Quản lý bộ nhớ với malloc, calloc, free',
    instructions: 'Cấp phát động, giải phóng bộ nhớ, tránh memory leak',
    course: 'Kĩ thuật lập trình',
    courseId: 'prog-technique',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-10T08:00:00',
    dueDate: '2024-10-17T23:59:00',
    updatedAt: '2024-10-18T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.5,
    maxScore: 10,
  },
  {
    id: 9,
    title: 'File I/O',
    description: 'Đọc và ghi file trong C/C++',
    instructions: 'Mở/đóng file, đọc/ghi text file, binary file',
    course: 'Kĩ thuật lập trình',
    courseId: 'prog-technique',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-20T08:00:00',
    dueDate: '2024-10-27T23:59:00',
    updatedAt: '2024-10-28T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 8.0,
    maxScore: 10,
  },
  {
    id: 10,
    title: 'Đệ quy',
    description: 'Kỹ thuật đệ quy và ứng dụng',
    instructions: 'Viết hàm đệ quy, đệ quy đuôi, quy hoạch động',
    course: 'Kĩ thuật lập trình',
    courseId: 'prog-technique',
    className: 'Tất cả lớp',
    status: 'active',
    startDate: '2024-12-05T08:00:00',
    dueDate: '2024-12-25T23:59:00',
    updatedAt: '2024-12-18T10:00:00',
    totalStudents: 10,
    submittedCount: 6, // SV 3, 9, 7, 4 chưa nộp (bài active)
    lateSubmissions: 0,
    averageScore: 7.8,
    maxScore: 10,
  },

  // ========== MÔN 3: LẬP TRÌNH HƯỚNG ĐỐI TƯỢNG (5 bài) ==========
  {
    id: 11,
    title: 'Lớp và đối tượng',
    description: 'Tạo class và khởi tạo đối tượng',
    instructions: 'Định nghĩa class, constructor, destructor, tạo object',
    course: 'Lập trình hướng đối tượng',
    courseId: 'oop',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-09-25T08:00:00',
    dueDate: '2024-10-02T23:59:00',
    updatedAt: '2024-10-03T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 2, // SV 3, 9 nộp muộn
    averageScore: 7.6,
    maxScore: 10,
  },
  {
    id: 12,
    title: 'Đóng gói và trừu tượng',
    description: 'Encapsulation và Abstraction trong OOP',
    instructions: 'Private/public, getter/setter, abstract class',
    course: 'Lập trình hướng đối tượng',
    courseId: 'oop',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-05T08:00:00',
    dueDate: '2024-10-12T23:59:00',
    updatedAt: '2024-10-13T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 3, // SV 3, 9 + 1 SV khác nộp muộn
    averageScore: 7.5,
    maxScore: 10,
  },
  {
    id: 13,
    title: 'Kế thừa',
    description: 'Inheritance và các loại kế thừa',
    instructions: 'Single/multiple inheritance, override methods, super',
    course: 'Lập trình hướng đối tượng',
    courseId: 'oop',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-15T08:00:00',
    dueDate: '2024-10-22T23:59:00',
    updatedAt: '2024-10-23T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.9,
    maxScore: 10,
  },
  {
    id: 14,
    title: 'Đa hình',
    description: 'Polymorphism và virtual functions',
    instructions: 'Virtual functions, pure virtual, upcasting/downcasting',
    course: 'Lập trình hướng đối tượng',
    courseId: 'oop',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-25T08:00:00',
    dueDate: '2024-11-01T23:59:00',
    updatedAt: '2024-11-02T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.8,
    maxScore: 10,
  },
  {
    id: 15,
    title: 'Design Patterns cơ bản',
    description: 'Singleton, Factory, Observer patterns',
    instructions: 'Áp dụng các design patterns phổ biến vào bài toán thực tế',
    course: 'Lập trình hướng đối tượng',
    courseId: 'oop',
    className: 'Tất cả lớp',
    status: 'active',
    startDate: '2024-12-10T08:00:00',
    dueDate: '2024-12-30T23:59:00',
    updatedAt: '2024-12-18T10:00:00',
    totalStudents: 10,
    submittedCount: 5, // SV 3, 9, 7, 4, 2 chưa nộp (bài active)
    lateSubmissions: 0,
    averageScore: 8.0,
    maxScore: 10,
  },

  // ========== MÔN 4: CẤU TRÚC DỮ LIỆU VÀ GIẢI THUẬT (5 bài) ==========
  {
    id: 16,
    title: 'Danh sách liên kết',
    description: 'Linked List đơn và đôi',
    instructions: 'Cài đặt linked list, thêm/xóa node, duyệt danh sách',
    course: 'Cấu trúc dữ liệu và giải thuật',
    courseId: 'data-struct-algo',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-01T08:00:00',
    dueDate: '2024-10-08T23:59:00',
    updatedAt: '2024-10-09T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 2, // SV 3, 9 nộp muộn
    averageScore: 7.5,
    maxScore: 10,
  },
  {
    id: 17,
    title: 'Stack và Queue',
    description: 'Cài đặt và ứng dụng Stack, Queue',
    instructions: 'Cài đặt stack/queue bằng mảng và linked list, ứng dụng',
    course: 'Cấu trúc dữ liệu và giải thuật',
    courseId: 'data-struct-algo',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-10T08:00:00',
    dueDate: '2024-10-17T23:59:00',
    updatedAt: '2024-10-18T10:00:00',
    totalStudents: 10,
    submittedCount: 10, // Tất cả 10 SV đều nộp
    lateSubmissions: 2, // SV 3, 9 nộp muộn
    averageScore: 7.6,
    maxScore: 10,
  },
  {
    id: 18,
    title: 'Cây nhị phân',
    description: 'Binary Tree và các phép duyệt',
    instructions: 'Cài đặt binary tree, duyệt preorder/inorder/postorder',
    course: 'Cấu trúc dữ liệu và giải thuật',
    courseId: 'data-struct-algo',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-10-20T08:00:00',
    dueDate: '2024-10-27T23:59:00',
    updatedAt: '2024-10-28T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.8,
    maxScore: 10,
  },
  {
    id: 19,
    title: 'Sắp xếp và tìm kiếm',
    description: 'Các thuật toán sorting và searching',
    instructions: 'Bubble sort, quick sort, binary search, linear search',
    course: 'Cấu trúc dữ liệu và giải thuật',
    courseId: 'data-struct-algo',
    className: 'Tất cả lớp',
    status: 'completed',
    startDate: '2024-11-01T08:00:00',
    dueDate: '2024-11-08T23:59:00',
    updatedAt: '2024-11-09T10:00:00',
    totalStudents: 10,
    submittedCount: 8, // SV 3, 9 chưa nộp
    lateSubmissions: 1,
    averageScore: 7.5,
    maxScore: 10,
  },
  {
    id: 20,
    title: 'AVL Tree',
    description: 'Cây AVL và cân bằng cây',
    instructions: 'Cài đặt AVL tree, các phép xoay, insert/delete node',
    course: 'Cấu trúc dữ liệu và giải thuật',
    courseId: 'data-struct-algo',
    className: 'Tất cả lớp',
    status: 'active',
    startDate: '2024-12-15T08:00:00',
    dueDate: '2025-01-05T23:59:00',
    updatedAt: '2024-12-18T10:00:00',
    totalStudents: 10,
    submittedCount: 4, // SV 3, 9, 7, 4, 2, 1 chưa nộp (bài active mới)
    lateSubmissions: 0,
    averageScore: 8.5,
    maxScore: 10,
  },
];

// Export hàm helper để tính toán stats
export const calculateAssignmentStats = () => {
  const total = ASSIGNMENTS_LIST.length;
  const active = ASSIGNMENTS_LIST.filter((a) => a.status === 'active').length;
  const completed = ASSIGNMENTS_LIST.filter(
    (a) => a.status === 'completed'
  ).length;
  const overdue = ASSIGNMENTS_LIST.filter((a) => a.status === 'overdue').length;

  const totalSubmissions = ASSIGNMENTS_LIST.reduce(
    (sum, a) => sum + a.submittedCount,
    0
  );
  const totalPossible = ASSIGNMENTS_LIST.reduce(
    (sum, a) => sum + a.totalStudents,
    0
  );
  const avgSubmissionRate = Math.round((totalSubmissions / totalPossible) * 100);

  const avgScore =
    ASSIGNMENTS_LIST.reduce((sum, a) => sum + a.averageScore, 0) / total;

  return {
    totalAssignments: total,
    activeAssignments: active,
    completedAssignments: completed,
    overdueAssignments: overdue,
    averageSubmissionRate: avgSubmissionRate,
    averageScore: Math.round(avgScore * 10) / 10,
  };
};

/**
 * Tạo danh sách đầy đủ 20 bài tập cho một sinh viên dựa trên courses và progress
 * Map với ASSIGNMENTS_LIST để có ID và thông tin chính xác
 */
const generateStudentFullAssignments = (student, assignmentsList = ASSIGNMENTS_LIST) => {
  const fullAssignments = [];
  
  if (!student.courses || student.courses.length === 0) {
    return [];
  }

  // Tạo map từ recentAssignments để tìm nhanh (theo ID)
  const recentMap = {};
  if (student.recentAssignments && Array.isArray(student.recentAssignments)) {
    student.recentAssignments.forEach(assignment => {
      // Map theo ID (ưu tiên nhất)
      if (assignment.id) {
        recentMap[assignment.id] = assignment;
      }
      // Map theo title để backup
      if (assignment.title) {
        recentMap[assignment.title] = assignment;
      }
    });
  }

  // Tính tổng số bài đã hoàn thành từ completedAssignments
  const totalCompleted = student.completedAssignments || 0;
  const totalAssignments = student.totalAssignments || assignmentsList.length;
  const completionRate = totalAssignments > 0 ? (totalCompleted / totalAssignments) : 0;

  // Duyệt qua tất cả bài tập trong ASSIGNMENTS_LIST (đảm bảo đủ 20 bài)
  assignmentsList.forEach((assignment) => {
    // Tìm trong recentAssignments theo ID (ưu tiên) hoặc title
    let studentAssignment = recentMap[assignment.id] || recentMap[assignment.title];
    
    if (studentAssignment) {
      // Có trong recentAssignments, dùng dữ liệu thực tế
      // Kiểm tra xem có nộp muộn không dựa trên submittedDate và dueDate
      let actualStatus = studentAssignment.status || 'completed';
      
      // Nếu có submittedDate và dueDate, kiểm tra xem có nộp muộn không
      if (studentAssignment.submittedDate && assignment.dueDate) {
        const submittedDate = new Date(studentAssignment.submittedDate);
        const dueDate = new Date(assignment.dueDate);
        
        // Nếu nộp sau dueDate, đánh dấu là late
        if (submittedDate > dueDate && (actualStatus === 'completed' || actualStatus === 'late')) {
          actualStatus = 'late';
        } else if (submittedDate <= dueDate && actualStatus === 'completed') {
          actualStatus = 'completed';
        }
      }
      
      fullAssignments.push({
        id: assignment.id,
        title: assignment.title,
        courseName: assignment.course,
        status: actualStatus,
        score: studentAssignment.score !== undefined && studentAssignment.score !== null 
          ? studentAssignment.score 
          : (studentAssignment.status === 'completed' || studentAssignment.status === 'late' ? 0 : 0),
        submittedDate: studentAssignment.submittedDate || null
      });
    } else {
      // Không có trong recentAssignments, suy luận từ completedAssignments
      // Tính số bài đã hoàn thành cho đến bài tập này
      const assignmentIndex = assignmentsList.findIndex(a => a.id === assignment.id);
      const shouldBeCompleted = assignmentIndex < totalCompleted;
      
      if (shouldBeCompleted) {
        // Đã hoàn thành (dựa trên completedAssignments)
        // Tìm điểm trung bình từ môn học tương ứng
        const course = student.courses.find(c => c.id === assignment.courseId);
        fullAssignments.push({
          id: assignment.id,
          title: assignment.title,
          courseName: assignment.course,
          status: 'completed',
          score: course?.score || 0,
          submittedDate: null
        });
      } else {
        // Chưa hoàn thành
        fullAssignments.push({
          id: assignment.id,
          title: assignment.title,
          courseName: assignment.course,
          status: 'missing',
          score: 0,
          submittedDate: null
        });
      }
    }
  });

  return fullAssignments;
};

/**
 * Tính toán chi tiết sinh viên cho một bài tập cụ thể từ dữ liệu sinh viên
 * 
 * @param {Object} assignment - Bài tập cần tính toán
 * @param {Array} students - Danh sách sinh viên với recentAssignments
 * @returns {Object} { submitted: [], notSubmitted: [], lateSubmitted: [] }
 */
export const getAssignmentStudentDetails = (assignment, students) => {
  if (!assignment || !students || students.length === 0) {
    return { submitted: [], notSubmitted: [], lateSubmitted: [] };
  }

  const submitted = [];
  const notSubmitted = [];
  const lateSubmitted = [];

  students.forEach(student => {
    // Tạo danh sách đầy đủ 20 bài tập cho sinh viên này
    const studentFullAssignments = generateStudentFullAssignments(student, ASSIGNMENTS_LIST);
    
    // Tìm bài tập trong danh sách đầy đủ
    const studentAssignment = studentFullAssignments.find(a => a.id === assignment.id);
    
    if (studentAssignment) {
      const submissionData = {
        id: student.id,
        name: student.name,
        studentId: student.studentId,
        email: student.email,
        phone: student.phone,
        score: studentAssignment.score || null,
        submittedAt: studentAssignment.submittedDate || null,
        status: studentAssignment.status
      };

      if (studentAssignment.status === 'completed') {
        // Đã nộp đúng hạn
        submitted.push(submissionData);
      } else if (studentAssignment.status === 'late') {
        // Nộp muộn
        lateSubmitted.push(submissionData);
      } else if (studentAssignment.status === 'missing') {
        // Chưa nộp
        notSubmitted.push(submissionData);
      }
    } else {
      // Nếu không tìm thấy bài tập, coi như chưa nộp
      notSubmitted.push({
        id: student.id,
        name: student.name,
        studentId: student.studentId,
        email: student.email,
        phone: student.phone,
        score: null,
        submittedAt: null,
        status: 'missing'
      });
    }
  });

  return { submitted, notSubmitted, lateSubmitted };
};

/**
 * Tính toán số liệu bài tập từ dữ liệu sinh viên
 * Đảm bảo đồng bộ với trang theo dõi sinh viên
 * 
 * @param {Array} students - Danh sách sinh viên với recentAssignments
 * @param {Array} assignments - Danh sách bài tập (mặc định là ASSIGNMENTS_LIST)
 * @returns {Array} Danh sách bài tập đã được cập nhật số liệu
 */
export const calculateAssignmentStatsFromStudents = (students, assignments = ASSIGNMENTS_LIST) => {
  if (!students || students.length === 0) {
    return assignments;
  }

  // Tạo map để đếm số liệu cho mỗi bài tập
  const assignmentStats = {};
  
  // Khởi tạo stats cho tất cả bài tập
  assignments.forEach(assignment => {
    assignmentStats[assignment.id] = {
      submittedCount: 0,
      lateSubmissions: 0,
      notSubmittedCount: 0,
      totalScore: 0,
      scoreCount: 0,
      totalStudents: 0
    };
  });

  // Duyệt qua tất cả sinh viên và đếm số liệu
  students.forEach(student => {
    // Tạo danh sách đầy đủ 20 bài tập cho sinh viên này
    const studentFullAssignments = generateStudentFullAssignments(student, assignments);
    
    // Đếm số sinh viên có bài tập này (tất cả sinh viên đều có 20 bài tập)
    assignments.forEach(assignment => {
      assignmentStats[assignment.id].totalStudents++;
      
      // Tìm bài tập trong danh sách đầy đủ của sinh viên
      const studentAssignment = studentFullAssignments.find(a => a.id === assignment.id);
      
      if (studentAssignment) {
        if (studentAssignment.status === 'completed') {
          // Đã nộp đúng hạn
          assignmentStats[assignment.id].submittedCount++;
          if (studentAssignment.score && studentAssignment.score > 0) {
            assignmentStats[assignment.id].totalScore += studentAssignment.score;
            assignmentStats[assignment.id].scoreCount++;
          }
        } else if (studentAssignment.status === 'late') {
          // Nộp muộn
          assignmentStats[assignment.id].submittedCount++;
          assignmentStats[assignment.id].lateSubmissions++;
          if (studentAssignment.score && studentAssignment.score > 0) {
            assignmentStats[assignment.id].totalScore += studentAssignment.score;
            assignmentStats[assignment.id].scoreCount++;
          }
        } else if (studentAssignment.status === 'missing') {
          // Chưa nộp
          assignmentStats[assignment.id].notSubmittedCount++;
        }
      } else {
        // Nếu không tìm thấy, coi như chưa nộp
        assignmentStats[assignment.id].notSubmittedCount++;
      }
    });
  });

  // Cập nhật assignments với số liệu đã tính
  return assignments.map(assignment => {
    const stats = assignmentStats[assignment.id] || {
      submittedCount: 0,
      lateSubmissions: 0,
      notSubmittedCount: 0,
      totalScore: 0,
      scoreCount: 0,
      totalStudents: 0
    };

    // Tính điểm trung bình
    const averageScore = stats.scoreCount > 0 
      ? Math.round((stats.totalScore / stats.scoreCount) * 10) / 10 
      : assignment.averageScore || 0;

    // Số sinh viên thực tế = số đã nộp + số chưa nộp
    // Hoặc lấy từ totalStudents đã đếm, hoặc giữ nguyên giá trị gốc
    const actualTotalStudents = Math.max(
      assignment.totalStudents,
      stats.submittedCount + stats.notSubmittedCount,
      stats.totalStudents || 0
    );

    return {
      ...assignment,
      submittedCount: stats.submittedCount,
      lateSubmissions: stats.lateSubmissions,
      totalStudents: actualTotalStudents,
      averageScore: averageScore
    };
  });
};

/**
 * Lấy danh sách bài tập cho một lớp học cụ thể từ ASSIGNMENTS_LIST
 * 
 * @param {string} courseId - ID của môn học (ví dụ: 'intro-prog', 'prog-technique', 'oop', 'data-struct-algo')
 * @param {Array} students - Danh sách sinh viên trong lớp (tùy chọn, để tính số liệu)
 * @returns {Array} Danh sách bài tập của môn học đó
 */
export const getAssignmentsForClass = (courseId, students = []) => {
  // Lọc các bài tập theo courseId
  const classAssignments = ASSIGNMENTS_LIST.filter(a => a.courseId === courseId);
  
  // Nếu có students, tính toán số liệu từ dữ liệu sinh viên thực tế
  if (students.length > 0) {
    return calculateAssignmentStatsFromStudents(students, classAssignments);
  }
  
  return classAssignments;
};