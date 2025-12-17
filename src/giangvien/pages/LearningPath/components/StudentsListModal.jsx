import { useState, useMemo } from 'react';
import { X, Search, SortAsc, SortDesc, Users, Mail, Phone, TrendingUp, Filter } from 'lucide-react';

const StudentsListModal = ({ isOpen, onClose, students = [], moduleName = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // name-asc, name-desc, score-asc, score-desc
  const [filterClass, setFilterClass] = useState('all');

  if (!isOpen) return null;

  // Debug log
  console.log('StudentsListModal rendered:', { 
    isOpen, 
    studentsCount: students?.length || 0,
    moduleName 
  });

  // Lấy danh sách lớp học duy nhất
  const uniqueClasses = useMemo(() => {
    try {
      if (!students || students.length === 0) return [];
      
      const classSet = new Set();
      students.forEach(student => {
        if (student && student.classes && Array.isArray(student.classes) && student.classes.length > 0) {
          student.classes.forEach(cls => {
            if (cls && cls.id && cls.name) {
              classSet.add(JSON.stringify(cls));
            }
          });
        }
      });
      return Array.from(classSet).map(cls => JSON.parse(cls));
    } catch (error) {
      console.error('Error calculating uniqueClasses:', error);
      return [];
    }
  }, [students]);

  // Lọc và sắp xếp sinh viên
  const filteredAndSortedStudents = useMemo(() => {
    try {
      if (!students || students.length === 0) return [];
      
      let filtered = students.filter(student => {
        if (!student) return false;
        
        const matchesSearch = 
          (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.studentId && student.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesClass = filterClass === 'all' || 
          (student.classes && Array.isArray(student.classes) && student.classes.some(cls => cls && cls.id === parseInt(filterClass)));

        return matchesSearch && matchesClass;
      });

      // Sắp xếp
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return (a.name || '').localeCompare(b.name || '', 'vi');
          case 'name-desc':
            return (b.name || '').localeCompare(a.name || '', 'vi');
          case 'score-asc':
            return (a.averageScore || 0) - (b.averageScore || 0);
          case 'score-desc':
            return (b.averageScore || 0) - (a.averageScore || 0);
          default:
            return 0;
        }
      });

      return filtered;
    } catch (error) {
      console.error('Error filtering/sorting students:', error);
      return [];
    }
  }, [students, searchTerm, sortBy, filterClass]);

  const getScoreColor = (score) => {
    if (score >= 8.0) return 'text-green-600 bg-green-50';
    if (score >= 6.5) return 'text-blue-600 bg-blue-50';
    if (score >= 5.0) return 'text-yellow-600 bg-yellow-50';
    if (score >= 4.0) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'bg-green-100 text-green-600', text: 'Đang học' },
      at_risk: { class: 'bg-red-100 text-red-600', text: 'Có nguy cơ' },
      completed: { class: 'bg-blue-100 text-blue-600', text: 'Hoàn thành' },
      dropped: { class: 'bg-gray-100 text-gray-600', text: 'Đã bỏ học' }
    };
    return statusConfig[status] || statusConfig.active;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Danh Sách Sinh Viên</h2>
                <p className="text-blue-100 text-sm">
                  {moduleName} • {filteredAndSortedStudents.length} sinh viên
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên, MSSV, email..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Filter by Class */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all appearance-none bg-white"
              >
                <option value="all">Tất cả lớp học</option>
                {uniqueClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all appearance-none bg-white"
              >
                <option value="name-asc">Tên A → Z</option>
                <option value="name-desc">Tên Z → A</option>
                <option value="score-desc">Điểm cao → thấp</option>
                <option value="score-asc">Điểm thấp → cao</option>
              </select>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredAndSortedStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Không tìm thấy sinh viên
              </h3>
              <p className="text-gray-500">
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedStudents.map((student, index) => (
                <div
                  key={student.id || index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 text-lg">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">{student.studentId}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(student.status).class}`}>
                      {getStatusBadge(student.status).text}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    {student.email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="truncate">{student.email}</span>
                      </div>
                    )}
                    {student.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{student.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Điểm TB:</span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getScoreColor(student.averageScore || 0)}`}>
                      {(student.averageScore || 0).toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Tiến độ hoàn thành</span>
                      <span className="font-medium">{student.completionRate || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${student.completionRate || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {student.classes && student.classes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {student.classes.map((cls, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                        >
                          {cls.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold">{filteredAndSortedStudents.length}</span> / <span className="font-semibold">{students.length}</span> sinh viên
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsListModal;
