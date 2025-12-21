import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Clock, Calendar, BookOpen, Plus, Edit, 
  FileText, Video, CheckCircle, AlertCircle, Play
} from 'lucide-react';
import { mockDashboardData } from '../../data/mockData';

const ModuleDetailNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});

  useEffect(() => {
    loadModule();
  }, [id]);

  const loadModule = () => {
    try {
      // Load từ localStorage trước
      const storedModules = JSON.parse(localStorage.getItem('giangvien_modules') || '[]');
      let foundModule = storedModules.find(m => m.id === parseInt(id));

      // Nếu không tìm thấy, load từ mockData
      if (!foundModule) {
        const courseIndex = parseInt(id) - 1;
        const course = mockDashboardData.courseMonitoring?.[courseIndex];
        
        if (course) {
          // Convert course từ mockData sang format module
          foundModule = {
            id: parseInt(id),
            name: course.name,
            description: `Khóa học ${course.name}`,
            duration: course.duration,
            enrolledStudents: course.enrolledStudents,
            completionRate: course.completionRate,
            averageScore: course.averageScore,
            status: course.completionRate === 100 ? 'completed' : course.completionRate > 0 ? 'in-progress' : 'pending',
            weeks: [] // Sẽ được tạo bên dưới
          };

          // Tạo weeks nếu chưa có
          const weekCount = parseInt(course.duration) || 12;
          foundModule.weeks = Array.from({ length: weekCount }, (_, i) => ({
            id: i + 1,
            title: `Tuần ${i + 1}`,
            description: '',
            status: 'pending',
            materials: [],
            assignments: []
          }));
        }
      }

      setModule(foundModule);
    } catch (error) {
      console.error('❌ Lỗi khi load module:', error);
      setModule(null);
    }
  };

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  const handleAddContent = (weekId, type) => {
    console.log(`Thêm ${type} cho tuần ${weekId}`);
    // TODO: Implement modal thêm nội dung
  };

  const handleUpdateWeek = (weekId, field, value) => {
    setModule(prev => {
      const updatedWeeks = prev.weeks.map(week =>
        week.id === weekId ? { ...week, [field]: value } : week
      );
      
      const updatedModule = { ...prev, weeks: updatedWeeks };
      
      // Lưu vào localStorage
      const storedModules = JSON.parse(localStorage.getItem('giangvien_modules') || '[]');
      const moduleIndex = storedModules.findIndex(m => m.id === prev.id);
      
      if (moduleIndex >= 0) {
        storedModules[moduleIndex] = updatedModule;
        localStorage.setItem('giangvien_modules', JSON.stringify(storedModules));
      }
      
      return updatedModule;
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hoàn thành', icon: CheckCircle },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đang học', icon: Play },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Chưa bắt đầu', icon: Clock }
    };
    return config[status] || config.pending;
  };

  if (!module) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusBadge(module.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/learning-path')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-700 flex items-center space-x-3">
              <span className="text-4xl">📚</span>
              <span>{module.name}</span>
            </h1>
            <p className="text-gray-600 mt-1">{module.description}</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-lg ${statusInfo.bg} ${statusInfo.text} flex items-center space-x-2`}>
          <StatusIcon className="h-4 w-4" />
          <span className="font-medium">{statusInfo.label}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Số tuần</p>
              <p className="text-2xl font-bold text-blue-600">{module.weeks?.length || 0}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="card p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sinh viên</p>
              <p className="text-2xl font-bold text-green-600">{module.enrolledStudents || 0}</p>
            </div>
            <Users className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="card p-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tiến độ</p>
              <p className="text-2xl font-bold text-purple-600">{module.completionRate || 0}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="card p-4 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Điểm TB</p>
              <p className="text-2xl font-bold text-orange-600">{module.averageScore || 0}</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Danh sách tuần */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary-600" />
            <span>Nội dung các tuần học</span>
          </h2>
          <p className="text-sm text-gray-500">
            💡 Click vào từng tuần để thêm nội dung và bài tập
          </p>
        </div>

        <div className="space-y-3">
          {module.weeks && module.weeks.length > 0 ? (
            module.weeks.map((week) => {
              const isExpanded = expandedWeeks[week.id];
              
              return (
                <div key={week.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors">
                  {/* Week Header */}
                  <button
                    onClick={() => toggleWeek(week.id)}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                        <span className="text-primary-600 font-bold">{week.id}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-700">{week.title}</h3>
                        {week.description && (
                          <p className="text-sm text-gray-500 mt-1">{week.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FileText className="h-4 w-4" />
                        <span>{week.materials?.length || 0} tài liệu</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <BookOpen className="h-4 w-4" />
                        <span>{week.assignments?.length || 0} bài tập</span>
                      </div>
                      <svg
                        className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Week Content */}
                  {isExpanded && (
                    <div className="p-6 bg-white border-t border-gray-200">
                      {/* Mô tả tuần */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả nội dung tuần học
                        </label>
                        <textarea
                          value={week.description || ''}
                          onChange={(e) => handleUpdateWeek(week.id, 'description', e.target.value)}
                          placeholder="Nhập mô tả chi tiết về nội dung sẽ học trong tuần này..."
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                        />
                      </div>

                      {/* Tài liệu và Bài tập */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tài liệu */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <span>Tài liệu</span>
                            </h4>
                            <button
                              onClick={() => handleAddContent(week.id, 'material')}
                              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center space-x-1"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Thêm</span>
                            </button>
                          </div>
                          
                          {week.materials && week.materials.length > 0 ? (
                            <div className="space-y-2">
                              {week.materials.map((material, idx) => (
                                <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <p className="text-sm font-medium text-gray-700">{material.title}</p>
                                  <p className="text-xs text-gray-500 mt-1">{material.type}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Chưa có tài liệu</p>
                            </div>
                          )}
                        </div>

                        {/* Bài tập */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-green-600" />
                              <span>Bài tập</span>
                            </h4>
                            <button
                              onClick={() => handleAddContent(week.id, 'assignment')}
                              className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm flex items-center space-x-1"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Thêm</span>
                            </button>
                          </div>
                          
                          {week.assignments && week.assignments.length > 0 ? (
                            <div className="space-y-2">
                              {week.assignments.map((assignment, idx) => (
                                <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-200">
                                  <p className="text-sm font-medium text-gray-700">{assignment.title}</p>
                                  <p className="text-xs text-gray-500 mt-1">Hạn: {assignment.dueDate}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Chưa có bài tập</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có tuần học nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailNew;
