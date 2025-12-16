import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, TrendingUp, CheckCircle, AlertCircle, Play, Plus } from 'lucide-react';
import { mockDashboardData } from '../../data/mockData';
import StudentsListModal from './components/StudentsListModal';
import localStorageService from '../../services/localStorageService';

const LearningPath = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [modules, setModules] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    // Load danh sách sinh viên từ localStorage
    const storedStudents = localStorageService.getStudents();
    console.log('📊 Loaded students:', storedStudents?.length || 0);
    setAllStudents(storedStudents || []);
    
    try {
      // Chuyển đổi dữ liệu từ mockDashboardData.courseMonitoring thành modules
      if (!mockDashboardData || !mockDashboardData.courseMonitoring) {
        console.error('mockDashboardData không tồn tại');
        setModules([]);
        return;
      }

      const courseModules = mockDashboardData.courseMonitoring.map((course, index) => {
        
        // Tính toán tiến độ và trạng thái
        const progress = course.completionRate || 0;
        let status = 'pending';
        if (progress === 100) status = 'completed';
        else if (progress > 0) status = 'in-progress';

        // Tạo danh sách tuần học với tên bài học cụ thể
        const weekCount = parseInt(course.duration) || 4;
        
        // Định nghĩa tên bài học cho từng khóa
        const weekTopics = {
          'Nhập môn lập trình': [
            'Giới thiệu lập trình và Python',
            'Biến, kiểu dữ liệu và toán tử',
            'Cấu trúc điều khiển (if-else, loops)',
            'Hàm và module',
            'Danh sách và tuple',
            'Dictionary và set',
            'Xử lý file',
            'Exception handling',
            'OOP cơ bản',
            'Thư viện chuẩn',
            'Dự án thực hành',
            'Tổng kết và kiểm tra'
          ],
          'Kĩ thuật lập trình': [
            'Con trỏ cơ bản',
            'Toán tử con trỏ và mảng',
            'Con trỏ và hàm',
            'Cấp phát động bộ nhớ',
            'Struct và union',
            'File I/O',
            'Xử lý chuỗi nâng cao',
            'Linked list',
            'Stack và queue',
            'Debugging và testing'
          ],
          'Lập trình hướng đối tượng': [
            'Giới thiệu OOP',
            'Class và object',
            'Constructor và destructor',
            'Encapsulation',
            'Inheritance (Kế thừa)',
            'Polymorphism (Đa hình)',
            'Abstract class và interface',
            'Exception handling trong OOP',
            'Design patterns cơ bản',
            'SOLID principles',
            'Unit testing',
            'Dự án OOP',
            'Best practices',
            'Code review',
            'Refactoring',
            'Final project'
          ],
          'Cấu trúc dữ liệu và giải thuật': [
            'Giới thiệu CTDL & GT',
            'Array và linked list',
            'Stack và queue',
            'Tree cơ bản',
            'Binary search tree',
            'AVL tree',
            'Heap và priority queue',
            'Graph cơ bản',
            'Graph traversal (DFS, BFS)',
            'Sorting algorithms',
            'Searching algorithms',
            'Dynamic programming'
          ]
        };

        const topics = weekTopics[course.name] || Array(weekCount).fill(null).map((_, i) => `Bài học ${i + 1}`);
        
        const weeks = [];
        for (let i = 1; i <= weekCount; i++) {
          const weekProgress = (progress / weekCount) * i;
          let weekStatus = 'pending';
          let weekScore = null;
          
          if (weekProgress >= 100) {
            weekStatus = 'completed';
            weekScore = course.averageScore + (Math.random() * 0.5 - 0.25); // Điểm dao động nhẹ
          } else if (weekProgress > 0 && weekProgress < 100) {
            weekStatus = 'in-progress';
          }
          
          weeks.push({
            week: i,
            title: topics[i - 1] || `Bài học ${i}`,
            status: weekStatus,
            score: weekScore ? parseFloat(weekScore.toFixed(1)) : null
          });
        }

        // Icon cho từng khóa học
        const icons = ['📚', '💻', '🔢', '🌐', '🎨', '🔧'];
        
        return {
          id: index + 1,
          title: course.name || 'Khóa học',
          icon: icons[index % icons.length],
          progress: progress,
          status: status,
          students: course.enrolledStudents || 0,
          duration: course.duration || '4 tuần',
          avgScore: course.averageScore || 0,
          weeks: weeks
        };
      });

      setModules(courseModules);
    } catch (error) {
      console.error('Lỗi khi load dữ liệu lộ trình học:', error);
      setModules([]);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'from-green-400 to-green-600';
    if (progress >= 50) return 'from-blue-400 to-indigo-600';
    if (progress > 0) return 'from-orange-400 to-orange-600';
    return 'from-gray-300 to-gray-400';
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hoàn thành' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đang học' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Chưa bắt đầu' }
    };
    return config[status] || config.pending;
  };

  const filteredModules = modules.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') return m.status === 'in-progress';
    if (filter === 'completed') return m.status === 'completed';
    if (filter === 'pending') return m.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <span className="text-4xl">🗺️</span>
            <span>Lộ Trình Học</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Theo dõi tiến độ học tập và lộ trình của sinh viên
          </p>
        </div>

        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Thêm Module Mới</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="card p-4 bg-gradient-to-br from-blue-50 to-indigo-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setFilter('all')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng Module</p>
              <p className="text-3xl font-bold text-blue-600">{modules.length}</p>
            </div>
            <BookOpen className="h-10 w-10 text-blue-500 opacity-50" />
          </div>
        </div>

        <div 
          className="card p-4 bg-gradient-to-br from-green-50 to-emerald-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setFilter('completed')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-3xl font-bold text-green-600">
                {modules.filter(m => m.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500 opacity-50" />
          </div>
        </div>

        <div 
          className="card p-4 bg-gradient-to-br from-orange-50 to-amber-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setFilter('in-progress')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang học</p>
              <p className="text-3xl font-bold text-orange-600">
                {modules.filter(m => m.status === 'in-progress').length}
              </p>
            </div>
            <Play className="h-10 w-10 text-orange-500 opacity-50" />
          </div>
        </div>

        <div 
          className="card p-4 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => {
            console.log('Clicked students card, opening modal...');
            console.log('Students count:', allStudents.length);
            setShowStudentsModal(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sinh viên</p>
              <p className="text-3xl font-bold text-purple-600">
                {allStudents.length}
              </p>
            </div>
            <Users className="h-10 w-10 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'Tất cả', count: modules.length },
          { value: 'in-progress', label: 'Đang học', count: modules.filter(m => m.status === 'in-progress').length },
          { value: 'completed', label: 'Hoàn thành', count: modules.filter(m => m.status === 'completed').length },
          { value: 'pending', label: 'Sắp tới', count: modules.filter(m => m.status === 'pending').length }
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              filter === f.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              filter === f.value ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Timeline View - Collapsed by default */}
      <div className="space-y-4">
        {filteredModules.map((module, index) => {
          const statusBadge = getStatusBadge(module.status);
          const isExpanded = expandedModules[module.id] || false;
          
          return (
            <div
              key={module.id}
              className="card hover:shadow-lg transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Module Header - Clickable to expand/collapse */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedModules(prev => ({ ...prev, [module.id]: !isExpanded }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{module.students} sinh viên</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{module.duration}</span>
                        </div>
                        {module.avgScore && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>Điểm TB: {module.avgScore}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-gray-900">{module.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/learning-path/${module.id}`);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      Xem chi tiết
                    </button>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(module.progress)} transition-all duration-1000 ease-out`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Weeks Timeline - Expandable */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="space-y-2">
                    {module.weeks.map((week, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/learning-path/${module.id}/week?week=${week.week}`);
                        }}
                      >
                        <div className="flex-shrink-0">
                          {getStatusIcon(week.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">
                              Tuần {week.week}: {week.title}
                            </span>
                            {week.score && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                Điểm: {week.score}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Xem chi tiết →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Không tìm thấy module nào
          </h3>
          <p className="text-gray-600">
            Thử thay đổi bộ lọc hoặc thêm module mới
          </p>
        </div>
      )}

      {/* Students List Modal */}
      {showStudentsModal && (
        <StudentsListModal
          isOpen={showStudentsModal}
          onClose={() => setShowStudentsModal(false)}
          students={allStudents || []}
          moduleName="Lộ Trình Học"
        />
      )}
    </div>
  );
};

export default LearningPath;
