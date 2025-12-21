// Service quản lý localStorage cho dữ liệu sinh viên và lớp học

const STORAGE_KEYS = {
  STUDENTS: 'giangvien_students',
  CLASS_DETAILS: 'giangvien_class_details',
  CLASSES: 'giangvien_classes'
};

class LocalStorageService {
  // Lấy danh sách sinh viên
  getStudents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading students from localStorage:', error);
      return null;
    }
  }

  // Lưu danh sách sinh viên
  saveStudents(students) {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
      return true;
    } catch (error) {
      console.error('Error saving students to localStorage:', error);
      return false;
    }
  }

  // Thêm sinh viên mới
  addStudent(student) {
    try {
      const students = this.getStudents() || [];
      students.push(student);
      this.saveStudents(students);
      return true;
    } catch (error) {
      console.error('Error adding student:', error);
      return false;
    }
  }

  // Xóa sinh viên
  removeStudent(studentId) {
    try {
      const students = this.getStudents() || [];
      const filtered = students.filter(s => s.id !== studentId);
      this.saveStudents(filtered);
      return true;
    } catch (error) {
      console.error('Error removing student:', error);
      return false;
    }
  }

  // Lấy chi tiết lớp học
  getClassDetails() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLASS_DETAILS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading class details from localStorage:', error);
      return null;
    }
  }

  // Lưu chi tiết lớp học
  saveClassDetails(classDetails) {
    try {
      localStorage.setItem(STORAGE_KEYS.CLASS_DETAILS, JSON.stringify(classDetails));
      return true;
    } catch (error) {
      console.error('Error saving class details to localStorage:', error);
      return false;
    }
  }

  // Thêm sinh viên vào lớp
  addStudentToClass(classId, student) {
    try {
      const classDetails = this.getClassDetails() || {};
      
      if (!classDetails[classId]) {
        classDetails[classId] = { students: [] };
      }
      
      // Kiểm tra sinh viên đã có trong lớp chưa
      const exists = classDetails[classId].students.some(s => s.studentId === student.studentId);
      if (exists) {
        console.warn('Student already exists in class');
        return false;
      }
      
      classDetails[classId].students.push(student);
      this.saveClassDetails(classDetails);
      return true;
    } catch (error) {
      console.error('Error adding student to class:', error);
      return false;
    }
  }

  // Xóa sinh viên khỏi lớp
  removeStudentFromClass(classId, studentId) {
    try {
      const classDetails = this.getClassDetails() || {};
      
      if (classDetails[classId]) {
        classDetails[classId].students = classDetails[classId].students.filter(
          s => s.id !== studentId
        );
        this.saveClassDetails(classDetails);
      }
      
      return true;
    } catch (error) {
      console.error('Error removing student from class:', error);
      return false;
    }
  }

  // Lấy danh sách lớp học
  getClasses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLASSES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading classes from localStorage:', error);
      return null;
    }
  }

  // Lưu danh sách lớp học
  saveClasses(classes) {
    try {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
      return true;
    } catch (error) {
      console.error('Error saving classes to localStorage:', error);
      return false;
    }
  }

  // Cập nhật số lượng sinh viên trong lớp
  updateClassStudentCount(classId, count) {
    try {
      const classes = this.getClasses();
      if (classes) {
        const updatedClasses = classes.map(c => 
          c.id === classId ? { ...c, enrolledStudents: count } : c
        );
        this.saveClasses(updatedClasses);
      }
      return true;
    } catch (error) {
      console.error('Error updating class student count:', error);
      return false;
    }
  }

  // Xóa tất cả dữ liệu (reset)
  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEYS.STUDENTS);
      localStorage.removeItem(STORAGE_KEYS.CLASS_DETAILS);
      localStorage.removeItem(STORAGE_KEYS.CLASSES);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Lấy tài liệu của lớp
  getClassMaterials(classId) {
    try {
      const key = `${STORAGE_KEYS.CLASS_DETAILS}_materials_${classId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading class materials:', error);
      return null;
    }
  }

  // Lưu tài liệu của lớp
  saveClassMaterials(classId, materials) {
    try {
      const key = `${STORAGE_KEYS.CLASS_DETAILS}_materials_${classId}`;
      localStorage.setItem(key, JSON.stringify(materials));
      return true;
    } catch (error) {
      console.error('Error saving class materials:', error);
      return false;
    }
  }

  // Khởi tạo dữ liệu từ mockData (chỉ chạy lần đầu)
  initializeFromMockData(mockData) {
    try {
      // Chỉ khởi tạo nếu chưa có dữ liệu
      if (!this.getClassDetails()) {
        this.saveClassDetails(mockData.classDetails);
      }
      if (!this.getClasses()) {
        this.saveClasses(mockData.classes);
      }
      if (!this.getStudents()) {
        this.saveStudents(mockData.students);
      }
      return true;
    } catch (error) {
      console.error('Error initializing from mock data:', error);
      return false;
    }
  }
}

export default new LocalStorageService();
