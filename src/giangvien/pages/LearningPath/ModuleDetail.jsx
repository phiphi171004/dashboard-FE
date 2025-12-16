import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Clock, TrendingUp, CheckCircle, Play, 
  AlertCircle, Calendar, Target, Award, BookOpen, FileText,
  Video, MessageSquare, BarChart3, Edit, Trash2
} from 'lucide-react';
import { mockDashboardData, mockStudentTrackingData } from '../../data/mockData';

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [module, setModule] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu khóa học từ mockData
    const courseIndex = parseInt(id) - 1;
    const course = mockDashboardData.courseMonitoring[courseIndex];
    
    if (course) {
      // Lấy danh sách sinh viên học khóa này
      const courseStudents = mockStudentTrackingData.students.filter(student =>
        student.courses.some(c => c.name === course.name)
      );

      // Tính toán tiến độ và trạng thái
      const progress = course.completionRate;
      let status = 'pending';
      if (progress === 100) status = 'completed';
      else if (progress > 0) status = 'in-progress';

      // Tạo danh sách tuần học với tên bài học cụ thể
      const weekCount = parseInt(course.duration) || 4;
      
      // Định nghĩa tên bài học cho từng khóa (giống LearningPath)
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
          weekScore = course.averageScore + (Math.random() * 0.5 - 0.25);
        } else if (weekProgress > 0 && weekProgress < 100) {
          weekStatus = 'in-progress';
        }
        
        const completedCount = Math.floor((weekProgress / 100) * courseStudents.length);
        
        weeks.push({
          week: i,
          title: topics[i - 1] || `Bài học ${i}`,
          status: weekStatus,
          score: weekScore ? parseFloat(weekScore.toFixed(1)) : null,
          completedStudents: completedCount,
          totalStudents: courseStudents.length,
          materials: Math.floor(Math.random() * 3) + 3,
          assignments: Math.floor(Math.random() * 2) + 1,
          videos: Math.floor(Math.random() * 3) + 2
        });
      }

      // Tất cả sinh viên (không chỉ top 3)
      const allStudents = courseStudents
        .sort((a, b) => b.averageScore - a.averageScore)
        .map(s => ({
          id: s.id,
          name: s.name,
          score: s.averageScore,
          progress: s.completionRate
        }));

      // Hoạt động gần đây với tên bài học cụ thể
      const recentActivities = courseStudents.slice(0, 3).map((s, idx) => {
        const weekNum = Math.floor(Math.random() * weekCount) + 1;
        const weekInfo = weeks.find(w => w.week === weekNum);
        return {
          id: idx + 1,
          student: s.name,
          action: ['Hoàn thành bài tập', 'Xem video bài giảng', 'Nộp bài tập'][idx],
          week: weekNum,
          weekTitle: weekInfo ? weekInfo.title : `Tuần ${weekNum}`,
          time: `${idx + 2} giờ trước`
        };
      });

      const icons = ['📚', '💻', '🔢', '🌐', '🎨', '🔧'];

      setModule({
        id: parseInt(id),
        title: course.name,
        icon: icons[courseIndex % icons.length],
        description: `Khóa học ${course.name} với thời lượng ${course.duration}, bao gồm các kiến thức cơ bản và nâng cao.`,
        progress: progress,
        status: status,
        students: course.enrolledStudents,
        duration: course.duration,
        avgScore: course.averageScore,
        startDate: '01/09/2024',
        endDate: '30/12/2024',
        instructor: 'TS. Nguyễn Văn An',
        weeks: weeks,
        learningObjectives: [
          `Nắm vững kiến thức cơ bản về ${course.name}`,
          'Áp dụng kiến thức vào thực tế',
          'Phát triển kỹ năng giải quyết vấn đề',
          'Hoàn thành các bài tập và dự án'
        ],
        topStudents: allStudents.slice(0, 3), // Top 3 cho sidebar
        allStudents: allStudents, // Tất cả sinh viên cho tab
        recentActivities: recentActivities
      });
    }
  }, [id]);

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

  const getStatusBadge = (status) => {
    const config = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hoàn thành' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đang học' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Chưa bắt đầu' }
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

  const statusBadge = getStatusBadge(module.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/learning-path')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Quay lại Lộ Trình Học</span>
        </button>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Chỉnh sửa</span>
          </button>
          <button className="btn-danger flex items-center space-x-2">
            <Trash2 className="h-4 w-4" />
            <span>Xóa</span>
          </button>
        </div>
      </div>

      {/* Module Header Card */}
      <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="text-6xl">{module.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                  {statusBadge.label}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{module.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Sinh viên</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{module.students}</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Thời lượng</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{module.duration}</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Điểm TB</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{module.avgScore}</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">Tiến độ</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{module.progress}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-700 font-medium">Tiến độ tổng thể</span>
            <span className="font-bold text-gray-900">{module.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-1000"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-gray-200 bg-white rounded-t-lg">
        <div className="flex space-x-8 px-6 pt-4">
          {[
            { id: 'overview', label: 'Tổng quan', icon: BookOpen },
            { id: 'weeks', label: 'Nội dung tuần', icon: Calendar },
            { id: 'students', label: 'Sinh viên', icon: Users },
            { id: 'analytics', label: 'Phân tích', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-4 transition-all duration-200 -mb-0.5 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 font-bold bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Objectives */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Mục tiêu học tập</span>
              </h3>
              <ul className="space-y-3">
                {module.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activities */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <span>Hoạt động gần đây</span>
              </h3>
              <div className="space-y-3">
                {module.recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.student}</p>
                        <p className="text-sm text-gray-600">{activity.action} - Tuần {activity.week}: {activity.weekTitle}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Module Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Giảng viên</span>
                  <span className="font-medium text-gray-900">{module.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ngày bắt đầu</span>
                  <span className="font-medium text-gray-900">{module.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ngày kết thúc</span>
                  <span className="font-medium text-gray-900">{module.endDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Số tuần</span>
                  <span className="font-medium text-gray-900">{module.weeks.length} tuần</span>
                </div>
              </div>
            </div>

            {/* Top Students */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Sinh viên xuất sắc</span>
              </h3>
              <div className="space-y-3">
                {module.topStudents.map((student, idx) => (
                  <div key={student.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Điểm: {student.score}</span>
                        <span>•</span>
                        <span>Tiến độ: {student.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'weeks' && (
        <div className="space-y-4">
          {module.weeks.map((week, idx) => {
            const completionRate = (week.completedStudents / week.totalStudents * 100).toFixed(0);
            
            return (
              <div 
                key={idx} 
                className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/learning-path/${module.id}/week?week=${week.week}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getStatusIcon(week.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Tuần {week.week}: {week.title}
                        </h3>
                        {week.score && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Điểm TB: {week.score}
                          </span>
                        )}
                      </div>

                      {/* Week Stats */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{week.materials} tài liệu</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-sm">{week.assignments} bài tập</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Video className="h-4 w-4" />
                          <span className="text-sm">{week.videos} video</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{week.completedStudents}/{week.totalStudents} SV</span>
                        </div>
                      </div>

                      {/* Completion Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Tỷ lệ hoàn thành</span>
                          <span className="font-semibold text-gray-900">{completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn-primary text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/learning-path/${module.id}/week?week=${week.week}`);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'students' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Danh sách sinh viên ({module.allStudents.length})
            </h3>
            <button className="btn-primary">
              Xuất danh sách
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">STT</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Họ tên</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Tiến độ</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Điểm TB</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {module.allStudents.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-800">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="h-2 rounded-full bg-blue-600 transition-all"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-700">{student.score}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Đang học
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Phân tích tiến độ</h3>
            <div className="space-y-4">
              {module.weeks.map((week, idx) => {
                const completionRate = (week.completedStudents / week.totalStudents * 100).toFixed(0);
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Tuần {week.week}</span>
                      <span className="text-sm text-gray-600">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Phân tích điểm số</h3>
            <div className="space-y-4">
              {module.weeks.filter(w => w.score).map((week, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Tuần {week.week}</p>
                    <p className="text-sm text-gray-600">{week.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{week.score}</p>
                    <p className="text-xs text-gray-500">Điểm TB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
