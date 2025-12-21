import { useState } from 'react';
import { X, FileText, BookOpen, Link, Upload, Clock } from 'lucide-react';

const AddWeekContentModal = ({ isOpen, onClose, onAdd, weekId, contentType }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: contentType === 'video' ? 'video' : contentType === 'material' ? 'document' : 'homework',
    url: '',
    dueDate: '',
    points: 100,
    duration: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContent = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      url: formData.url,
      createdAt: new Date().toISOString(),
      ...(contentType === 'video' && {
        duration: formData.duration
      }),
      ...(contentType === 'assignment' && {
        dueDate: formData.dueDate,
        points: formData.points
      })
    };

    onAdd(weekId, contentType, newContent);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: contentType === 'video' ? 'video' : contentType === 'material' ? 'document' : 'homework',
      url: '',
      dueDate: '',
      points: 100,
      duration: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  const isVideo = contentType === 'video';
  const isMaterial = contentType === 'material';
  const isAssignment = contentType === 'assignment';
  
  let title = 'Thêm Nội Dung';
  let bgColor = 'bg-blue-50';
  let iconBg = 'bg-blue-100';
  let iconColor = 'text-blue-600';
  
  if (isVideo) {
    title = 'Thêm Video Bài Giảng';
    bgColor = 'bg-purple-50';
    iconBg = 'bg-purple-100';
    iconColor = 'text-purple-600';
  } else if (isMaterial) {
    title = 'Thêm Tài Liệu';
    bgColor = 'bg-blue-50';
    iconBg = 'bg-blue-100';
    iconColor = 'text-blue-600';
  } else if (isAssignment) {
    title = 'Thêm Bài Tập';
    bgColor = 'bg-green-50';
    iconBg = 'bg-green-100';
    iconColor = 'text-green-600';
  }
  
  const Icon = isVideo ? () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ) : isMaterial ? FileText : BookOpen;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 border-b border-gray-200 ${bgColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={isMaterial ? "VD: Slide bài giảng tuần 1" : "VD: Bài tập về nhà tuần 1"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Loại */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loại {isVideo ? 'video' : isMaterial ? 'tài liệu' : 'bài tập'} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {isVideo ? (
                <>
                  <option value="video">🎥 Video bài giảng</option>
                  <option value="youtube">📺 YouTube</option>
                  <option value="vimeo">🎬 Vimeo</option>
                  <option value="recorded">🔴 Video ghi hình</option>
                </>
              ) : isMaterial ? (
                <>
                  <option value="document">📄 Tài liệu PDF</option>
                  <option value="slide">📊 Slide bài giảng</option>
                  <option value="link">🔗 Link tham khảo</option>
                  <option value="code">💻 Code mẫu</option>
                </>
              ) : (
                <>
                  <option value="homework">📝 Bài tập về nhà</option>
                  <option value="quiz">❓ Bài kiểm tra</option>
                  <option value="project">🚀 Dự án</option>
                  <option value="exercise">💪 Bài thực hành</option>
                </>
              )}
            </select>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={isMaterial ? "Mô tả nội dung tài liệu..." : "Mô tả yêu cầu bài tập..."}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
          </div>

          {/* URL/Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Link className="inline h-4 w-4 mr-1" />
              {isVideo ? 'Link video' : 'Link tài liệu'}
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder={isVideo ? "https://youtube.com/watch?v=..." : "https://..."}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 {isVideo ? 'Nhập link YouTube, Vimeo hoặc link video khác' : 'Có thể để trống nếu tải file lên sau'}
            </p>
          </div>

          {/* Thời lượng video */}
          {isVideo && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Thời lượng video
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="VD: 15 phút, 1 giờ 30 phút"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}

          {/* Thông tin bài tập (chỉ hiện khi là assignment) */}
          {isAssignment && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hạn nộp <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Điểm tối đa
                </label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg ${
                isVideo
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : isMaterial
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Upload className="inline h-4 w-4 mr-2" />
              Thêm {isVideo ? 'video' : isMaterial ? 'tài liệu' : 'bài tập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWeekContentModal;
