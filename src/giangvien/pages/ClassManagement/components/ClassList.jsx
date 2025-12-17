import React, { useState } from 'react';
import { Users, TrendingUp, ExternalLink, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddNewStudentModal from './AddNewStudentModal';

const ClassList = ({ classes, onAddStudent }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleAddStudent = (studentData) => {
    // Gọi callback từ parent để cập nhật state
    if (onAddStudent && selectedClass) {
      onAddStudent(selectedClass.id, studentData);
    }
    
    // Hiển thị thông báo thành công
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>✅ Đã thêm sinh viên ${studentData.name} vào lớp ${selectedClass.name}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const openAddModal = (classItem) => {
    setSelectedClass(classItem);
    setShowAddModal(true);
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'status-badge status-active', text: 'Đang diễn ra' },
      upcoming: { class: 'status-badge status-pending', text: 'Sắp diễn ra' },
      completed: { class: 'status-badge status-completed', text: 'Hoàn thành' },
      cancelled: { class: 'status-badge status-at-risk', text: 'Đã hủy' }
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

  const getCompletionColor = (rate) => {
    if (rate >= 8.0) return 'bg-success-600';
    if (rate >= 7.0) return 'bg-primary-600';
    if (rate >= 6.0) return 'bg-warning-600';
    return 'bg-danger-600';
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lớp học
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sinh viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiến độ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm TB
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {classItem.name}
                    </div>
                    <div className="text-sm text-gray-500">{classItem.course}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(classItem.status).class}>
                    {getStatusBadge(classItem.status).text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">{classItem.enrolledStudents}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{Math.round(classItem.completionRate || 0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(classItem.completionRate || 0)}`}
                          style={{ width: `${classItem.completionRate || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                    <span className={`text-sm font-medium ${getPerformanceColor(classItem.averageScore || 0)}`}>
                      {(classItem.averageScore || 0).toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openAddModal(classItem)}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-medium"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Thêm SV
                    </button>
                    <Link 
                      to={`/classes/${classItem.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      Chi tiết
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {selectedClass && (
        <AddNewStudentModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedClass(null);
          }}
          onAdd={handleAddStudent}
          classData={selectedClass}
        />
      )}
    </div>
  );
};

export default ClassList;