/**
 * Service quản lý thông tin giảng viên
 * Đảm bảo tính nhất quán trong việc hiển thị tên giảng viên trên toàn hệ thống
 */

const teacherService = {
  /**
   * Lấy thông tin giảng viên hiện tại từ sessionStorage
   * @returns {Object} Thông tin giảng viên
   */
  getCurrentTeacher: () => {
    try {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return {
          id: user?.id || 1,
          fullName: user?.full_name || 'TS. Võ Đại Nhân',
          email: user?.email || 'nhan354a@gmail.com',
          phone: user?.phone || '0901234567',
          position: user?.position || 'Tiến sĩ',
          department: user?.department || 'Khoa Công nghệ Thông tin',
          avatar: user?.avatar || null
        };
      }
    } catch (error) {
      console.error('❌ Lỗi khi lấy thông tin giảng viên:', error);
    }
    
    // Trả về thông tin mặc định nếu không có trong sessionStorage
    return {
      id: 1,
      fullName: 'TS. Võ Đại Nhân',
      email: 'nhan354a@gmail.com',
      phone: '0901234567',
      position: 'Tiến sĩ',
      department: 'Khoa Công nghệ Thông tin',
      avatar: null
    };
  },

  /**
   * Lấy tên đầy đủ của giảng viên (bao gồm học hàm học vị)
   * @returns {string} Tên đầy đủ
   */
  getFullName: () => {
    const teacher = teacherService.getCurrentTeacher();
    return teacher.fullName;
  },

  /**
   * Lấy tên ngắn gọn (không có học hàm học vị)
   * @returns {string} Tên ngắn
   */
  getShortName: () => {
    const fullName = teacherService.getFullName();
    // Loại bỏ học hàm học vị (TS., ThS., GS., PGS., etc.)
    return fullName.replace(/^(TS\.|ThS\.|GS\.|PGS\.|CN\.|KS\.)\s*/i, '');
  },

  /**
   * Lấy học hàm học vị
   * @returns {string} Học hàm học vị
   */
  getTitle: () => {
    const fullName = teacherService.getFullName();
    const match = fullName.match(/^(TS\.|ThS\.|GS\.|PGS\.|CN\.|KS\.)/i);
    return match ? match[1] : '';
  },

  /**
   * Cập nhật thông tin giảng viên vào sessionStorage
   * @param {Object} teacherData - Thông tin giảng viên mới
   */
  updateTeacher: (teacherData) => {
    try {
      const currentData = sessionStorage.getItem('user');
      const user = currentData ? JSON.parse(currentData) : {};
      
      const updatedUser = {
        ...user,
        full_name: teacherData.fullName || user.full_name,
        email: teacherData.email || user.email,
        phone: teacherData.phone || user.phone,
        position: teacherData.position || user.position,
        department: teacherData.department || user.department,
        avatar: teacherData.avatar || user.avatar
      };
      
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ Đã cập nhật thông tin giảng viên');
      return true;
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật thông tin giảng viên:', error);
      return false;
    }
  },

  /**
   * Khởi tạo thông tin giảng viên mặc định (dùng cho demo)
   */
  initDefaultTeacher: () => {
    const existingUser = sessionStorage.getItem('user');
    if (!existingUser) {
      const defaultTeacher = {
        id: 1,
        full_name: 'TS. Võ Đại Nhân',
        email: 'nhan354a@gmail.com',
        phone: '0901234567',
        position: 'Tiến sĩ',
        department: 'Khoa Công nghệ Thông tin',
        role: 'teacher'
      };
      sessionStorage.setItem('user', JSON.stringify(defaultTeacher));
      console.log('✅ Đã khởi tạo thông tin giảng viên mặc định');
    }
  }
};

export default teacherService;
