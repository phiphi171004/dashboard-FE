import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ClassDetailHeader from './components/ClassDetailHeader';
import StudentList from './components/StudentList';
import AssignmentProgress from './components/AssignmentProgress';
import ClassSchedule from './components/ClassSchedule';
import CourseMaterials from './components/CourseMaterials';
import { mockClassData, mockStudentTrackingData } from '../../data/mockData';
import { getAssignmentsForClass } from '../../data/assignmentsData';
import localStorageService from '../../services/localStorageService';

const ClassDetail = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    loadClassDetail();
  }, [id]);

  const loadClassDetail = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const classId = parseInt(id);
      
      // Lấy dữ liệu từ localStorage trước, nếu không có thì dùng mockData
      const storedClasses = localStorageService.getClasses();
      const storedClassDetails = localStorageService.getClassDetails();
      
      const foundClass = storedClasses 
        ? storedClasses.find(c => c.id === classId)
        : mockClassData.classes.find(c => c.id === classId);
        
      const details = storedClassDetails && storedClassDetails[classId]
        ? storedClassDetails[classId]
        : mockClassData.classDetails[classId];
      
      if (foundClass && details) {
        // Tính toán tiến độ dựa theo lịch học
        const scheduleList = details.schedule || [];
        const completedSessions = scheduleList.filter(s => s.status === 'completed').length;
        const totalSessions = scheduleList.length;
        
        // Tính toán tiến độ hoàn thành bài tập của sinh viên
        const students = details.students || [];
        let calculatedCompletion = 0;
        
        if (students.length > 0) {
          // Tính trung bình % hoàn thành bài tập của các sinh viên
          const totalCompletionRate = students.reduce((sum, student) => {
            return sum + (student.completionRate || 0);
          }, 0);
          calculatedCompletion = Math.round(totalCompletionRate / students.length);
        }
        
        // Lấy số lượng tài liệu từ localStorage
        const materials = localStorageService.getClassMaterials(classId) || [];
        
        // Lấy danh sách bài tập từ ASSIGNMENTS_LIST dựa trên courseId của lớp
        const storedStudents = localStorageService.getStudents();
        const studentsToUse = storedStudents || mockStudentTrackingData.students;
        
        // Lọc sinh viên trong lớp này (nếu có)
        const classStudents = studentsToUse.filter(s => 
          details.students.some(cs => cs.id === s.id)
        );
        
        // Lấy bài tập từ ASSIGNMENTS_LIST và tính toán số liệu từ dữ liệu sinh viên
        const assignments = getAssignmentsForClass(foundClass.courseId, classStudents);
        
        const combinedData = {
          ...foundClass,
          students: details.students,
          assignments: assignments, // Sử dụng assignments từ ASSIGNMENTS_LIST
          scheduleList: scheduleList,
          materials: materials,
          enrolledStudents: details.students.length, // Đồng bộ số lượng sinh viên từ students array
          completionRate: calculatedCompletion,  // Ghi đè bằng giá trị tính toán từ sinh viên
          completedSessions,
          totalSessions
        };
        setClassData(combinedData);
      } else {
        setClassData(null);
      }
    } catch (error) {
      console.error('Error loading class detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="card p-6 mb-6">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="card p-6">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Không tìm thấy lớp học
        </h3>
        <p className="text-gray-500 mb-4">
          Lớp học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link to="/classes" className="btn-primary">
          Quay lại danh sách lớp học
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'students', label: 'Sinh viên', count: classData.students?.length || 0 },
    { id: 'assignments', label: 'Bài tập', count: classData.assignments?.length || 0 },
    { id: 'materials', label: 'Tài liệu', count: classData.materials?.length || 0 },
    { id: 'schedule', label: 'Lịch học', count: classData.scheduleList?.length || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link to="/classes" className="hover:text-primary-600 transition-colors">
          Quản lý lớp học
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{classData.name}</span>
      </div>

      {/* Back Button */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/classes"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Link>
      </div>

      {/* Class Header */}
      <ClassDetailHeader classData={classData} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'students' && (
          <StudentList 
            students={classData.students} 
            classId={classData.id}
            classData={classData}
            onStudentsAdded={(newStudents) => {
              setClassData(prev => ({
                ...prev,
                students: [...prev.students, ...newStudents],
                enrolledStudents: prev.enrolledStudents + newStudents.length
              }));
            }}
            onStudentRemoved={(studentId) => {
              // Cập nhật state khi xóa sinh viên
              setClassData(prev => ({
                ...prev,
                students: prev.students.filter(s => s.id !== studentId),
                enrolledStudents: prev.enrolledStudents - 1
              }));
              
              // Reload lại dữ liệu để đồng bộ
              setTimeout(() => loadClassDetail(), 500);
            }}
          />
        )}
        {activeTab === 'assignments' && (
          <AssignmentProgress assignments={classData.assignments} classId={classData.id} />
        )}
        {activeTab === 'materials' && (
          <CourseMaterials classId={classData.id} materials={classData.materials || []} />
        )}
        {activeTab === 'schedule' && (
          <ClassSchedule schedule={classData.scheduleList} classId={classData.id} />
        )}
      </div>
    </div>
  );
};

export default ClassDetail;