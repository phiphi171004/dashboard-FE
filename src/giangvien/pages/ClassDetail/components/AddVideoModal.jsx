import { useState } from 'react';
import { X, Video, Link as LinkIcon, Upload, AlertCircle } from 'lucide-react';

const AddVideoModal = ({ isOpen, onClose, onAdd }) => {
  const [uploadType, setUploadType] = useState('file'); // file hoặc link
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    file: null,
    size: 0,
    duration: 0
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    }
    
    if (uploadType === 'link' && !formData.url.trim()) {
      newErrors.url = 'Vui lòng nhập URL';
    } else if (uploadType === 'link' && formData.url.trim()) {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = 'URL không hợp lệ';
      }
    }
    
    if (uploadType === 'file' && !formData.file) {
      newErrors.file = 'Vui lòng chọn file video';
    }
    
    // Validate file size (max 5GB = 5120MB)
    if (uploadType === 'file' && formData.file && formData.file.size > 5 * 1024 * 1024 * 1024) {
      newErrors.file = 'Video vượt quá giới hạn 5GB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const material = {
        type: 'video',
        title: formData.title,
        description: formData.description,
        url: formData.url,
        fileName: formData.file?.name,
        size: formData.size,
        duration: formData.duration,
        isLink: uploadType === 'link'
      };
      
      onAdd(material);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      file: null,
      size: 0,
      duration: 0
    });
    setErrors({});
    setUploadType('file');
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file,
        size: file.size,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '')
      }));
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Thêm Video Bài Giảng</h2>
                <p className="text-red-100 text-sm">
                  Tải lên video hoặc thêm liên kết YouTube, Vimeo
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Chọn cách thêm */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Chọn cách thêm video <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`p-5 border-2 rounded-xl transition-all ${
                  uploadType === 'file'
                    ? 'border-red-600 bg-red-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Upload className={`h-10 w-10 mx-auto mb-3 ${
                  uploadType === 'file' ? 'text-red-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-semibold block ${
                  uploadType === 'file' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  Tải lên video
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  MP4, AVI, MOV, MKV
                </span>
              </button>

              <button
                type="button"
                onClick={() => setUploadType('link')}
                className={`p-5 border-2 rounded-xl transition-all ${
                  uploadType === 'link'
                    ? 'border-purple-600 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <LinkIcon className={`h-10 w-10 mx-auto mb-3 ${
                  uploadType === 'link' ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-semibold block ${
                  uploadType === 'link' ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  Thêm liên kết
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  YouTube, Vimeo, Drive...
                </span>
              </button>
            </div>
          </div>

          {/* Upload file */}
          {uploadType === 'file' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chọn file video <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 transition-colors bg-gray-50">
                <Video className="h-14 w-14 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".mp4,.avi,.mov,.mkv,.webm,.flv"
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Chọn video từ máy tính
                </label>
                <p className="text-sm text-gray-500 mt-3">
                  Hỗ trợ: MP4, AVI, MOV, MKV, WEBM, FLV
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Dung lượng tối đa: <span className="font-semibold text-red-600">5GB</span>
                </p>
                {formData.file && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-3">
                      <Video className="h-8 w-8 text-red-600" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-red-700">
                          {formData.file.name}
                        </p>
                        <p className="text-xs text-red-600">
                          {formData.file.size >= 1024 * 1024 * 1024 
                            ? `${(formData.file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`
                            : `${(formData.file.size / (1024 * 1024)).toFixed(2)} MB`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {errors.file && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.file}</span>
                </div>
              )}
            </div>
          )}

          {/* URL */}
          {uploadType === 'link' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Đường dẫn video <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, url: e.target.value }));
                  setErrors(prev => ({ ...prev, url: '' }));
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.url
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              <p className="text-xs text-gray-500 mt-2">
                Hỗ trợ: YouTube, Vimeo, Google Drive, hoặc bất kỳ URL video nào
              </p>
              {errors.url && (
                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.url}</span>
                </div>
              )}
            </div>
          )}

          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiêu đề video <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                setErrors(prev => ({ ...prev, title: '' }));
              }}
              placeholder="Ví dụ: Bài giảng 1 - Giới thiệu về lập trình"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-red-500 focus:ring-red-200'
              }`}
            />
            {errors.title && (
              <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả (tùy chọn)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả ngắn gọn về nội dung video..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-200 transition-all resize-none"
            />
          </div>

          {/* Thời lượng */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thời lượng video (giây) - Tùy chọn
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              placeholder="Ví dụ: 1530 (tương đương 25 phút 30 giây)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-200 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              Nhập thời lượng bằng giây. Ví dụ: 300 = 5 phút, 1800 = 30 phút
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Thêm video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoModal;
