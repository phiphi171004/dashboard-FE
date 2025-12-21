import { useState } from 'react';
import { Filter, Mail, Phone, TrendingUp, TrendingDown, UserPlus, Trash2 } from 'lucide-react';
import SmartSearchInput from '../../../components/SmartSearchInput';
import AddStudentModal from '../../ClassManagement/components/AddStudentModal';
import { mockStudentTrackingData } from '../../../data/mockData';
import localStorageService from '../../../services/localStorageService';

const StudentList = ({ students = [], classId, classData, onStudentsAdded, onStudentRemoved }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddStudents = (newStudents) => {
    if (onStudentsAdded) {
      onStudentsAdded(newStudents);
    }
    setShowAddModal(false);
  };

  const handleRemoveStudent = (student) => {
    // Xác nhận trước khi xóa
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa sinh viên "${student.name}" (${student.studentId}) khỏi lớp này?`
    );
    
    if (!confirmed) return;

    // Xóa khỏi localStorage classDetails
    const success = localStorageService.removeStudentFromClass(classId, student.id);
    
    if (success) {
      // Lấy số lượng sinh viên SAU KHI xóa
      const classDetails = localStorageService.getClassDetails();
      const currentStudentCount = classDetails[classId]?.students.length || 0;
      
      // Cập nhật số lượng sinh viên trong danh sách classes
      localStorageService.updateClassStudentCount(classId, currentStudentCount);
      
      // Gọi callback để cập nhật UI
      if (onStudentRemoved) {
        onStudentRemoved(student.id);
      }
      
      // Hiển thị thông báo
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span>🗑️ Đã xóa sinh viên ${student.name} khỏi lớp</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      console.log('✅ Đã xóa sinh viên:', student.name);
      console.log('📊 Số sinh viên còn lại:', currentStudentCount);
      console.log('💾 Đã cập nhật localStorage classes với số lượng:', currentStudentCount);
    } else {
      alert('❌ Không thể xóa sinh viên. Vui lòng thử lại!');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'status-badge status-active', text: 'Đang học' },
      at_risk: { class: 'status-badge status-at-risk', text: 'Có nguy cơ' },
      completed: { class: 'status-badge status-completed', text: 'Hoàn thành' },
      dropped: { class: 'status-badge bg-gray-100 text-gray-600', text: 'Đã bỏ học' }
    };

    return statusConfig[status] || statusConfig.active;
  };

  const getPerformanceColor = (score) => {
    if (score >= 8.0) return 'text-success-600';      // Giỏi
    if (score >= 6.5) return 'text-primary-600';      // Khá
    if (score >= 5.0) return 'text-warning-600';      // Trung bình
    if (score >= 4.0) return 'text-orange-600';       // Yếu
    return 'text-danger-600';                          // Kém
  };

  const filteredAndSortedStudents = students
    ?.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score':
          return b.averageScore - a.averageScore;
        case 'progress':
          return b.completionRate - a.completionRate;
        default:
          return 0;
      }
    }) || [];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <SmartSearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Tìm kiếm sinh viên..."
              className="w-64"
            />
            
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Thêm sinh viên</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang học</option>
              <option value="at_risk">Có nguy cơ</option>
              <option value="completed">Hoàn thành</option>
              <option value="dropped">Đã bỏ học</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="progress">Sắp xếp theo tiến độ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Sinh viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Tiến độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Bài tập
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-600">{student.name}</div>
                        <div className="text-sm text-gray-600">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(student.status).class}>
                      {getStatusBadge(student.status).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{Math.round(student.completionRate || 0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${student.completionRate || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div>
                      <span className="font-medium">{student.completedAssignments}</span>
                      <span className="text-gray-600">/{student.totalAssignments}</span>
                    </div>
                    <div className="text-xs text-gray-600">hoàn thành</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <a
                        href={`mailto:${student.email}`}
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        title="Gửi email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href={`tel:${student.phone}`}
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        title="Gọi điện"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleRemoveStudent(student)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:shadow-md transition-all"
                      title="Xóa sinh viên khỏi lớp"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedStudents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Không tìm thấy sinh viên nào
          </h3>
          <p className="text-gray-500">
            Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      )}

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        classData={classData || { name: '', course: '' }}
        allStudents={mockStudentTrackingData.students}
        onAddStudents={handleAddStudents}
      />
    </div>
  );
};

export default StudentList;
