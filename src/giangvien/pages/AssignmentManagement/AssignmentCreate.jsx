import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Upload, X, Calendar, Clock, Users, FileText, Plus, Trash2 } from 'lucide-react';

const AssignmentCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    courseId: '',
    classId: '',
    startDate: '',
    dueDate: '',
    maxScore: 100,
    allowLateSubmission: true,
    lateSubmissionPenalty: 10,
    maxAttempts: 1,
    showScoreToStudents: true,
    requireFiles: true,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'txt'],
    maxFileSize: 10,
    // Auto Grading
    enableAutoGrading: false,
    assignmentType: 'code',
    programmingLanguage: 'python',
    timeLimit: 5,
    memoryLimit: 256
  });
  
  const [testCases, setTestCases] = useState([
    { input: '', output: '', score: 10 }
  ]);
  
  const [gradingCriteria, setGradingCriteria] = useState({
    testCases: 60,
    codeQuality: 20,
    performance: 10,
    documentation: 10
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const courseOptions = [
    { value: 'intro-prog', label: 'Nhập môn lập trình' },
    { value: 'prog-technique', label: 'Kĩ thuật lập trình' },
    { value: 'oop', label: 'Lập trình hướng đối tượng' },
    { value: 'data-struct-algo', label: 'Cấu trúc dữ liệu và giải thuật' }
  ];

  const classOptions = [
    { value: '1', label: 'Lập Trình Web Frontend - Lớp A', courseId: 'web-dev' },
    { value: '2', label: 'Lập Trình Web Frontend - Lớp B', courseId: 'web-dev' },
    { value: '3', label: 'Mobile Development - Lớp A', courseId: 'mobile-dev' },
    { value: '4', label: 'Data Science Cơ Bản - Lớp A', courseId: 'data-science' },
    { value: '5', label: 'Machine Learning Nâng Cao', courseId: 'ai-ml' },
    { value: '6', label: 'Backend Development - Lớp A', courseId: 'backend' },
    { value: '7', label: 'DevOps Fundamentals - Lớp A', courseId: 'devops' }
  ];

  const filteredClassOptions = formData.courseId 
    ? classOptions.filter(cls => cls.courseId === formData.courseId)
    : classOptions;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.courseId || !formData.classId) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
      }

      if (new Date(formData.startDate) >= new Date(formData.dueDate)) {
        alert('Ngày bắt đầu phải trước ngày hết hạn');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make an actual API call to create the assignment
      console.log('Creating assignment:', { ...formData, attachedFiles });
      
      alert('Tạo bài tập thành công!');
      navigate('/assignments');
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Có lỗi xảy ra khi tạo bài tập!');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      // Simulate API call to save draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Đã lưu bản nháp!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Có lỗi xảy ra khi lưu bản nháp!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/assignments"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo Bài Tập Mới</h1>
            <p className="text-gray-600 mt-1">
              Tạo bài tập mới cho sinh viên
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Lưu nháp</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Xem trước</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề bài tập *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập tiêu đề bài tập..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả ngắn *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Mô tả ngắn gọn về bài tập..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hướng dẫn chi tiết
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Hướng dẫn chi tiết cách làm bài tập..."
                  />
                </div>
              </div>
            </div>

            {/* Assignment Settings */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cài đặt bài tập
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Điểm tối đa
                  </label>
                  <input
                    type="number"
                    name="maxScore"
                    value={formData.maxScore}
                    onChange={handleInputChange}
                    min="1"
                    max="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lần nộp tối đa
                  </label>
                  <input
                    type="number"
                    name="maxAttempts"
                    value={formData.maxAttempts}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phạt nộp muộn (%)
                  </label>
                  <input
                    type="number"
                    name="lateSubmissionPenalty"
                    value={formData.lateSubmissionPenalty}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={!formData.allowLateSubmission}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kích thước file tối đa (MB)
                  </label>
                  <input
                    type="number"
                    name="maxFileSize"
                    value={formData.maxFileSize}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowLateSubmission"
                    checked={formData.allowLateSubmission}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Cho phép nộp muộn</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showScoreToStudents"
                    checked={formData.showScoreToStudents}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hiển thị điểm cho sinh viên</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="requireFiles"
                    checked={formData.requireFiles}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bắt buộc đính kèm file</span>
                </label>
              </div>
            </div>

            {/* Auto Grading Configuration */}
            <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cấu Hình Tự Động Chấm</h3>
                  <p className="text-sm text-gray-600">Tiết kiệm 80-90% thời gian chấm bài</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableAutoGrading"
                    checked={formData.enableAutoGrading}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    ✅ Bật tự động chấm điểm
                  </span>
                </label>
              </div>

              {formData.enableAutoGrading && (
                <div className="space-y-4 pl-8 border-l-4 border-blue-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại bài tập
                      </label>
                      <select
                        name="assignmentType"
                        value={formData.assignmentType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="code">Bài tập lập trình (Code)</option>
                        <option value="quiz">Trắc nghiệm (Quiz)</option>
                        <option value="essay">Tự luận (Essay)</option>
                      </select>
                    </div>

                    {formData.assignmentType === 'code' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngôn ngữ lập trình
                        </label>
                        <select
                          name="programmingLanguage"
                          value={formData.programmingLanguage}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="python">Python</option>
                          <option value="javascript">JavaScript</option>
                          <option value="java">Java</option>
                          <option value="cpp">C++</option>
                          <option value="c">C</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời gian chạy tối đa (giây)
                      </label>
                      <input
                        type="number"
                        name="timeLimit"
                        value={formData.timeLimit}
                        onChange={handleInputChange}
                        min="1"
                        max="60"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Memory tối đa (MB)
                      </label>
                      <input
                        type="number"
                        name="memoryLimit"
                        value={formData.memoryLimit}
                        onChange={handleInputChange}
                        min="64"
                        max="1024"
                        step="64"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Test Cases */}
                  {formData.assignmentType === 'code' && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">📋 Test Cases</h4>
                        <button
                          type="button"
                          onClick={() => setTestCases([...testCases, { input: '', output: '', score: 10 }])}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Thêm Test Case</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {testCases.map((testCase, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Test Case {index + 1}</span>
                              {testCases.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => setTestCases(testCases.filter((_, i) => i !== index))}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="Input"
                                value={testCase.input}
                                onChange={(e) => {
                                  const newTestCases = [...testCases];
                                  newTestCases[index].input = e.target.value;
                                  setTestCases(newTestCases);
                                }}
                                className="px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                              <input
                                type="text"
                                placeholder="Expected Output"
                                value={testCase.output}
                                onChange={(e) => {
                                  const newTestCases = [...testCases];
                                  newTestCases[index].output = e.target.value;
                                  setTestCases(newTestCases);
                                }}
                                className="px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                              <input
                                type="number"
                                placeholder="Điểm"
                                value={testCase.score}
                                onChange={(e) => {
                                  const newTestCases = [...testCases];
                                  newTestCases[index].score = parseInt(e.target.value) || 0;
                                  setTestCases(newTestCases);
                                }}
                                className="px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grading Criteria */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">🎯 Tiêu Chí Chấm Điểm</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Test cases passed</span>
                        <input
                          type="number"
                          value={gradingCriteria.testCases}
                          onChange={(e) => setGradingCriteria({...gradingCriteria, testCases: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">điểm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Code quality</span>
                        <input
                          type="number"
                          value={gradingCriteria.codeQuality}
                          onChange={(e) => setGradingCriteria({...gradingCriteria, codeQuality: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">điểm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Performance</span>
                        <input
                          type="number"
                          value={gradingCriteria.performance}
                          onChange={(e) => setGradingCriteria({...gradingCriteria, performance: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">điểm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Documentation</span>
                        <input
                          type="number"
                          value={gradingCriteria.documentation}
                          onChange={(e) => setGradingCriteria({...gradingCriteria, documentation: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">điểm</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-sm text-gray-900">Tổng</span>
                          <span className="text-lg text-blue-600">
                            {Object.values(gradingCriteria).reduce((a, b) => a + b, 0)} điểm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File Attachments */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tài liệu đính kèm
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tải lên tài liệu
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Kéo thả file vào đây hoặc click để chọn
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-secondary cursor-pointer"
                    >
                      Chọn file
                    </label>
                  </div>
                </div>

                {attachedFiles.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      File đã chọn ({attachedFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-danger-600 hover:text-danger-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course and Class Selection */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Phân công
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khóa học *
                  </label>
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Chọn khóa học</option>
                    {courseOptions.map(course => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lớp học *
                  </label>
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={!formData.courseId}
                  >
                    <option value="">Chọn lớp học</option>
                    {filteredClassOptions.map(cls => (
                      <option key={cls.value} value={cls.value}>
                        {cls.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thời gian
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hạn nộp *
                  </label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Sticky Action Buttons - Compact */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <Link
            to="/assignments"
            className="px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg border border-gray-200 flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Hủy</span>
          </Link>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Đang tạo...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Tạo Bài Tập</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentCreate;