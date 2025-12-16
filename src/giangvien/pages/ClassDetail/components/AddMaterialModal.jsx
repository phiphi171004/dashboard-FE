import { useState } from 'react';
import { X, FileText, Video, Link as LinkIcon, Upload, AlertCircle } from 'lucide-react';

const AddMaterialModal = ({ isOpen, onClose, onAdd }) => {
  const [materialType, setMaterialType] = useState('document'); // document, video, link
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
    
    if (materialType === 'link' && !formData.url.trim()) {
      newErrors.url = 'Vui lòng nhập URL';
    } else if (materialType === 'link' && formData.url.trim()) {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = 'URL không hợp lệ';
      }
    }
    
    if ((materialType === 'document' || materialType === 'video') && !formData.file) {
      newErrors.file = 'Vui lòng chọn file';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const material = {
        type: materialType,
        title: formData.title,
        description: formData.description,
        url: formData.url,
        fileName: formData.file?.name,
        size: formData.size,
        duration: formData.duration
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
    setMaterialType('document');
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
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Thêm Tài Liệu Học Tập</h2>
                <p className="text-blue-100 text-sm">
                  Tải lên tài liệu, video hoặc thêm liên kết
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
          {/* Chọn loại tài liệu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loại tài liệu <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMaterialType('document')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  materialType === 'document'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className={`h-8 w-8 mx-auto mb-2 ${
                  materialType === 'document' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  materialType === 'document' ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Tài liệu
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterialType('video')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  materialType === 'video'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Video className={`h-8 w-8 mx-auto mb-2 ${
                  materialType === 'video' ? 'text-red-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  materialType === 'video' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  Video
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMaterialType('link')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  materialType === 'link'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <LinkIcon className={`h-8 w-8 mx-auto mb-2 ${
                  materialType === 'link' ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  materialType === 'link' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  Liên kết
                </span>
              </button>
            </div>
          </div>

          {/* Upload file (cho document và video) */}
          {(materialType === 'document' || materialType === 'video') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chọn file <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={materialType === 'document' ? '.pdf,.doc,.docx,.ppt,.pptx,.zip' : '.mp4,.avi,.mov,.mkv'}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  Click để chọn file
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  {materialType === 'document' 
                    ? 'PDF, DOC, DOCX, PPT, PPTX, ZIP (Max 50MB)'
                    : 'MP4, AVI, MOV, MKV (Max 500MB)'}
                </p>
                {formData.file && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">
                      {formData.file.name}
                    </p>
                    <p className="text-xs text-blue-600">
                      {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
              {errors.file && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.file}</span>
                </div>
              )}
            </div>
          )}

          {/* URL (cho link) */}
          {materialType === 'link' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, url: e.target.value }));
                  setErrors(prev => ({ ...prev, url: '' }));
                }}
                placeholder="https://example.com/video"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.url
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.url && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.url}</span>
                </div>
              )}
            </div>
          )}

          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                setErrors(prev => ({ ...prev, title: '' }));
              }}
              placeholder="Ví dụ: Slide bài giảng chương 1"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.title
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.title && (
              <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
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
              placeholder="Mô tả ngắn gọn về tài liệu..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Duration (cho video) */}
          {materialType === 'video' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thời lượng (giây)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                placeholder="Ví dụ: 1530 (25 phút 30 giây)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Thêm tài liệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialModal;
