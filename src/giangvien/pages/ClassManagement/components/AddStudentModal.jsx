import { useState } from 'react';
import { X, Search, UserPlus, Check } from 'lucide-react';

const AddStudentModal = ({ isOpen, onClose, classData, allStudents, onAddStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  if (!isOpen) return null;

  // Lọc sinh viên chưa có trong lớp
  const currentStudentIds = classData.students?.map(s => s.id) || [];
  const availableStudents = allStudents.filter(s => !currentStudentIds.includes(s.id));

  // Lọc theo tìm kiếm
  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAddStudents = () => {
    const studentsToAdd = allStudents.filter(s => selectedStudents.includes(s.id));
    onAddStudents(studentsToAdd);
    setSelectedStudents([]);
    setSearchTerm('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Thêm sinh viên vào lớp
                  </h3>
                  <p className="text-sm text-blue-100 mt-1">
                    {classData.name} - {classData.course}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm sinh viên theo tên, MSSV, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Selected Count */}
            {selectedStudents.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  Đã chọn <span className="font-bold">{selectedStudents.length}</span> sinh viên
                </p>
              </div>
            )}

            {/* Student List */}
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <UserPlus className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-gray-600">
                    {availableStudents.length === 0
                      ? 'Tất cả sinh viên đã có trong lớp'
                      : 'Không tìm thấy sinh viên nào'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudents.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        onClick={() => toggleStudent(student.id)}
                        className={`p-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50 hover:bg-blue-100'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            {/* Avatar */}
                            <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center font-bold text-white ${
                              isSelected ? 'bg-blue-600' : 'bg-gray-400'
                            }`}>
                              {student.name.charAt(0)}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {student.name}
                                </h4>
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                  {student.studentId}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                <span>{student.email}</span>
                                <span>•</span>
                                <span>Điểm TB: {student.averageScore}</span>
                                <span>•</span>
                                <span>Hoàn thành: {student.completionRate}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Checkbox */}
                          <div className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="h-4 w-4 text-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Có <span className="font-semibold">{availableStudents.length}</span> sinh viên có thể thêm
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Hủy
              </button>
              <button
                onClick={handleAddStudents}
                disabled={selectedStudents.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Thêm {selectedStudents.length > 0 && `(${selectedStudents.length})`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
