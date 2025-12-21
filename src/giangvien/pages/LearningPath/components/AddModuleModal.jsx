import { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Users, FileText, Calendar, AlertCircle } from 'lucide-react';
import { mockClassData } from '../../../data/mockData';

const AddModuleModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    totalWeeks: '',
    selectedClasses: [], // Thay đổi: Chọn nhiều lớp
    status: 'active',
    startDate: '',
    endDate: '',
    instructor: 'TS. Nguyễn Văn An',
    objectives: '',
    prerequisites: ''
  });

  const [errors, setErrors] = useState({});
  const [availableClasses, setAvailableClasses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  // Load danh sách lớp
  useEffect(() => {
    if (mockClassData && mockClassData.classes) {
      // Lấy danh sách lớp duy nhất (theo tên lớp)
      const uniqueClasses = {};
      mockClassData.classes.forEach(cls => {
        if (!uniqueClasses[cls.name]) {
          uniqueClasses[cls.name] = {
            name: cls.name,
            totalStudents: cls.enrolledStudents,
            courses: [cls.course]
          };
        } else {
          uniqueClasses[cls.name].courses.push(cls.course);
        }
      });
      setAvailableClasses(Object.values(uniqueClasses));
    }
  }, []);

  // Tính tổng số sinh viên khi chọn lớp
  useEffect(() => {
    const total = formData.selectedClasses.reduce((sum, className) => {
      const classInfo = availableClasses.find(c => c.name === className);
      return sum + (classInfo?.totalStudents || 0);
    }, 0);
    setTotalStudents(total);
  }, [formData.selectedClasses, availableClasses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleClassToggle = (className) => {
    setFormData(prev => {
      const isSelected = prev.selectedClasses.includes(className);
      return {
        ...prev,
        selectedClasses: isSelected
          ? prev.selectedClasses.filter(c => c !== className)
          : [...prev.selectedClasses, className]
      };
    });
    // Clear error when user selects
    if (errors.selectedClasses) {
      setErrors(prev => ({
        ...prev,
        selectedClasses: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên môn học';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả môn học';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Vui lòng nhập thời lượng';
    }

    if (!formData.totalWeeks) {
      newErrors.totalWeeks = 'Vui lòng nhập số tuần';
    } else if (parseInt(formData.totalWeeks) < 1 || parseInt(formData.totalWeeks) > 52) {
      newErrors.totalWeeks = 'Số tuần phải từ 1 đến 52';
    }

    if (formData.selectedClasses.length === 0) {
      newErrors.selectedClasses = 'Vui lòng chọn ít nhất một lớp';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Tạo danh sách tuần học
      const weeks = [];
      const weekCount = parseInt(formData.totalWeeks);
      for (let i = 1; i <= weekCount; i++) {
        weeks.push({
          id: i,
          title: `Tuần ${i}`,
          description: `Nội dung học tuần ${i}`,
          status: 'pending',
          progress: 0
        });
      }

      // Xác định status dựa trên ngày
      let moduleStatus = 'pending';
      const now = new Date();
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (now >= startDate && now <= endDate) {
        moduleStatus = 'in-progress';
      } else if (now > endDate) {
        moduleStatus = 'completed';
      }

      const newModule = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        totalWeeks: weekCount,
        enrolledStudents: totalStudents,
        selectedClasses: formData.selectedClasses,
        status: moduleStatus,
        startDate: formData.startDate,
        endDate: formData.endDate,
        instructor: formData.instructor,
        objectives: formData.objectives,
        prerequisites: formData.prerequisites,
        completionRate: 0,
        averageScore: 0,
        weeks: weeks,
        createdAt: new Date().toISOString()
      };

      console.log('📝 Creating new module:', newModule);
      onAdd(newModule);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      duration: '',
      totalWeeks: '',
      selectedClasses: [],
      status: 'active',
      startDate: '',
      endDate: '',
      instructor: 'TS. Nguyễn Văn An',
      objectives: '',
      prerequisites: ''
    });
    setErrors({});
    setTotalStudents(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Thêm Môn Học Mới</h2>
              <p className="text-sm text-primary-100">Tạo môn học mới cho lộ trình đào tạo</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary-600" />
                Thông tin cơ bản
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tên môn học */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên môn học <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="VD: Lập trình Web nâng cao"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.name ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Mô tả */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả môn học <span className="text-danger-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Mô tả ngắn gọn về nội dung và mục tiêu của môn học..."
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                      errors.description ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Giảng viên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảng viên phụ trách
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                {/* Trạng thái */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="draft">Bản nháp</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Thời gian và quy mô */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Thời gian và quy mô
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thời lượng */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời lượng <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="VD: 45 giờ"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.duration ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.duration}
                    </p>
                  )}
                </div>

                {/* Số tuần */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tuần <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalWeeks"
                    value={formData.totalWeeks}
                    onChange={handleChange}
                    min="1"
                    max="52"
                    placeholder="VD: 12"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.totalWeeks ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.totalWeeks && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.totalWeeks}
                    </p>
                  )}
                </div>

                {/* Ngày bắt đầu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.startDate ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                {/* Ngày kết thúc */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.endDate ? 'border-danger-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.endDate}
                    </p>
                  )}
                </div>

                {/* Chọn lớp */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="h-4 w-4 inline mr-1" />
                    Chọn lớp học <span className="text-danger-600">*</span>
                  </label>
                  
                  {/* Hiển thị tổng số sinh viên */}
                  {totalStudents > 0 && (
                    <div className="mb-3 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                      <p className="text-sm text-primary-700 font-medium">
                        📊 Tổng số sinh viên: <span className="text-lg font-bold">{totalStudents}</span> sinh viên
                        {formData.selectedClasses.length > 0 && (
                          <span className="text-xs ml-2">
                            ({formData.selectedClasses.length} lớp)
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Danh sách lớp */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border rounded-lg max-h-60 overflow-y-auto ${
                    errors.selectedClasses ? 'border-danger-500 bg-danger-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    {availableClasses.length > 0 ? (
                      availableClasses.map((classInfo) => {
                        const isSelected = formData.selectedClasses.includes(classInfo.name);
                        return (
                          <button
                            key={classInfo.name}
                            type="button"
                            onClick={() => handleClassToggle(classInfo.name)}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${
                              isSelected
                                ? 'border-primary-500 bg-primary-100 shadow-md'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-semibold ${
                                isSelected ? 'text-primary-700' : 'text-gray-700'
                              }`}>
                                {classInfo.name}
                              </span>
                              {isSelected && (
                                <span className="text-primary-600">✓</span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{classInfo.totalStudents} sinh viên</span>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="col-span-3 text-center py-4 text-gray-500">
                        Không có lớp nào
                      </div>
                    )}
                  </div>
                  
                  {errors.selectedClasses && (
                    <p className="mt-2 text-sm text-danger-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.selectedClasses}
                    </p>
                  )}
                  
                  <p className="mt-2 text-xs text-gray-500">
                    💡 Chọn một hoặc nhiều lớp để thêm vào môn học này
                  </p>
                </div>
              </div>
            </div>

            {/* Mục tiêu và yêu cầu */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Mục tiêu và yêu cầu
              </h3>
              
              <div className="space-y-4">
                {/* Mục tiêu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mục tiêu học tập
                  </label>
                  <textarea
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Sinh viên sẽ nắm được những kiến thức và kỹ năng gì sau khi hoàn thành môn học..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  />
                </div>

                {/* Yêu cầu tiên quyết */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yêu cầu tiên quyết
                  </label>
                  <textarea
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Sinh viên cần có kiến thức gì trước khi học môn này..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Lưu ý */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Lưu ý:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Các trường có dấu <span className="text-danger-600">*</span> là bắt buộc</li>
                    <li>Sau khi tạo môn học, bạn có thể thêm nội dung chi tiết cho từng tuần</li>
                    <li>Thông tin có thể chỉnh sửa sau khi tạo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium shadow-sm hover:shadow-md"
          >
            Tạo môn học
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;
