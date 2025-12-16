import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Users, Clock, CheckCircle, Play, AlertCircle,
  FileText, Video, BookOpen, Download, Calendar, Target, Plus
} from 'lucide-react';
import { mockDashboardData, mockStudentTrackingData } from '../../data/mockData';
import AddMaterialModal from '../ClassDetail/components/AddMaterialModal';
import localStorageService from '../../services/localStorageService';

const WeekDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const weekNumber = parseInt(searchParams.get('week')) || 1;
  const [weekData, setWeekData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const courseIndex = parseInt(id) - 1;
    const course = mockDashboardData.courseMonitoring[courseIndex];
    
    if (course) {
      // Định nghĩa tên bài học
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

      const weekCount = parseInt(course.duration) || 4;
      const topics = weekTopics[course.name] || Array(weekCount).fill(null).map((_, i) => `Bài học ${i + 1}`);
      const progress = course.completionRate || 0;
      const weekProgress = (progress / weekCount) * weekNumber;
      
      let weekStatus = 'pending';
      if (weekProgress >= 100) weekStatus = 'completed';
      else if (weekProgress > 0) weekStatus = 'in-progress';

      const courseStudents = mockStudentTrackingData.students.filter(student =>
        student.courses.some(c => c.name === course.name)
      );

      const completedCount = Math.floor((weekProgress / 100) * courseStudents.length);

      // Tạo dữ liệu tuần
      const week = {
        week: weekNumber,
        title: topics[weekNumber - 1] || `Bài học ${weekNumber}`,
        status: weekStatus,
        description: `Nội dung chi tiết về ${topics[weekNumber - 1] || `Bài học ${weekNumber}`}. Sinh viên sẽ học các khái niệm cơ bản và thực hành qua các bài tập.`,
        completedStudents: completedCount,
        totalStudents: courseStudents.length,
        materials: [
          { id: 1, name: 'Slide bài giảng.pdf', type: 'pdf', size: '2.5 MB' },
          { id: 2, name: 'Tài liệu tham khảo.docx', type: 'doc', size: '1.2 MB' },
          { id: 3, name: 'Code examples.zip', type: 'zip', size: '5.8 MB' }
        ],
        videos: [
          { id: 1, title: 'Video bài giảng phần 1', duration: '25:30', views: completedCount },
          { id: 2, title: 'Video bài giảng phần 2', duration: '18:45', views: Math.floor(completedCount * 0.8) },
          { id: 3, title: 'Demo thực hành', duration: '32:15', views: Math.floor(completedCount * 0.6) }
        ],
        assignments: [
          { id: 1, title: 'Bài tập thực hành', dueDate: '15/12/2024', submitted: completedCount, total: courseStudents.length },
          { id: 2, title: 'Bài tập nâng cao', dueDate: '18/12/2024', submitted: Math.floor(completedCount * 0.7), total: courseStudents.length }
        ],
        learningObjectives: [
          `Hiểu rõ khái niệm về ${topics[weekNumber - 1]}`,
          'Áp dụng kiến thức vào bài tập thực hành',
          'Phát triển kỹ năng tư duy logic',
          'Hoàn thành các bài tập được giao'
        ],
        startDate: `${weekNumber * 7 - 6}/09/2024`,
        endDate: `${weekNumber * 7}/09/2024`
      };

      setWeekData(week);
      setModuleData({
        id: parseInt(id),
        title: course.name,
        icon: ['📚', '💻', '🔢', '🌐'][courseIndex % 4]
      });
      
      // Load materials từ localStorage
      const storageKey = `week_${id}_${weekNumber}_materials`;
      const storedMaterials = localStorageService.getClassMaterials(storageKey) || [];
      
      // Tách materials và videos
      const docs = storedMaterials.filter(m => m.type === 'document' || m.type === 'link');
      const vids = storedMaterials.filter(m => m.type === 'video');
      
      // Merge với dữ liệu mặc định
      setMaterials([...week.materials, ...docs]);
      setVideos([...week.videos, ...vids]);
    }
  }, [id, weekNumber]);

  const handleAddMaterial = (newMaterial) => {
    const storageKey = `week_${id}_${weekNumber}_materials`;
    const material = {
      ...newMaterial,
      id: Date.now(),
      uploadedAt: new Date().toISOString()
    };

    // Lưu vào localStorage
    const storedMaterials = localStorageService.getClassMaterials(storageKey) || [];
    storedMaterials.push(material);
    localStorageService.saveClassMaterials(storageKey, storedMaterials);

    // Cập nhật state
    if (material.type === 'video') {
      setVideos(prev => [...prev, {
        id: material.id,
        title: material.title,
        duration: material.duration ? `${Math.floor(material.duration / 60)}:${(material.duration % 60).toString().padStart(2, '0')}` : '0:00',
        views: 0
      }]);
    } else {
      setMaterials(prev => [...prev, {
        id: material.id,
        name: material.title,
        size: material.size ? `${(material.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A'
      }]);
    }

    setShowAddMaterialModal(false);

    // Notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>✅ Đã thêm ${material.type === 'video' ? 'video' : 'tài liệu'} thành công</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  if (!weekData || !moduleData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (weekData.status) {
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'in-progress':
        return <Play className="h-8 w-8 text-blue-500" />;
      default:
        return <AlertCircle className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    const config = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hoàn thành' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đang học' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Chưa bắt đầu' }
    };
    return config[weekData.status] || config.pending;
  };

  const statusBadge = getStatusBadge();
  const completionRate = ((weekData.completedStudents / weekData.totalStudents) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/learning-path/${id}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Quay lại {moduleData.title}</span>
        </button>
      </div>

      {/* Week Header Card */}
      <div className="card p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-6xl">{moduleData.icon}</span>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Tuần {weekData.week}: {weekData.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">{weekData.description}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Thời gian</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{weekData.startDate} - {weekData.endDate}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Sinh viên</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{weekData.completedStudents}/{weekData.totalStudents}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Tài liệu</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{weekData.materials.length}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Hoàn thành</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{completionRate}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Tỷ lệ hoàn thành</span>
                <span className="font-bold text-gray-900">{completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Objectives */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span>Mục tiêu học tập</span>
            </h3>
            <ul className="space-y-3">
              {weekData.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Tài liệu học tập</span>
              </h3>
              <button
                onClick={() => setShowAddMaterialModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Thêm tài liệu</span>
              </button>
            </div>
            <div className="space-y-3">
              {materials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{material.name}</p>
                      <p className="text-sm text-gray-500">{material.size}</p>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span>Video bài giảng</span>
            </h3>
            <div className="space-y-3">
              {videos.map(video => (
                <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Play className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{video.title}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </span>
                        <span>•</span>
                        <span>{video.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary text-sm">
                    Xem ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Assignments */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span>Bài tập</span>
            </h3>
            <div className="space-y-3">
              {weekData.assignments.map(assignment => (
                <div key={assignment.id} className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">{assignment.title}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Hạn nộp:</span>
                      <span className="font-medium text-gray-900">{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Đã nộp:</span>
                      <span className="font-medium text-gray-900">{assignment.submitted}/{assignment.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-600"
                        style={{ width: `${(assignment.submitted / assignment.total * 100).toFixed(0)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Material Modal */}
      <AddMaterialModal
        isOpen={showAddMaterialModal}
        onClose={() => setShowAddMaterialModal(false)}
        onAdd={handleAddMaterial}
      />
    </div>
  );
};

export default WeekDetail;
