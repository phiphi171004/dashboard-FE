import { useState } from 'react';
import { X, FileText, Link as LinkIcon, Upload, AlertCircle } from 'lucide-react';

const AddDocumentModal = ({ isOpen, onClose, onAdd }) => {
  const [uploadType, setUploadType] = useState('file'); // file hoặc link
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    file: null,
    size: 0
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
      newErrors.file = 'Vui lòng chọn file';
    }
    
    // Validate file size (max 50MB)
    if (uploadType === 'file' && formData.file && formData.file.size > 50 * 1024 * 1024) {
      newErrors.file = 'File vượt quá giới hạn 50MB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const material = {
        type: uploadType === 'link' ? 'link' : 'document',
        title: formData.title,
        description: formData.description,
        url: formData.url,
        fileName: formData.file?.name,
        size: formData.size
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
      size: 0
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
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Thêm Tài Liệu Học Tập</h2>
                <p className="text-blue-100 text-sm">
                  Tải lên file tài liệu hoặc thêm liên kết
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
              Chọn cách thêm tài liệu <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUploadType('file')}
                className={`p-5 border-2 rounded-xl transition-all ${
                  uploadType === 'file'
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Upload className={`h-10 w-10 mx-auto mb-3 ${
                  uploadType === 'file' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-semibold block ${
                  uploadType === 'file' ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  Tải lên file
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  PDF, DOC, PPT, ZIP
                </span>
              </button>

              <button
                type="button"
                onClick={() => setUploadType('link')}
                className={`p-5 border-2 rounded-xl transition-all ${
                  uploadType === 'link'
                    ? 'border-green-600 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <LinkIcon className={`h-10 w-10 mx-auto mb-3 ${
                  uploadType === 'link' ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-semibold block ${
                  uploadType === 'link' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  Thêm liên kết
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  Google Drive, Dropbox...
                </span>
              </button>
            </div>
          </div>

          {/* Upload file */}
          {uploadType === 'file' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chọn file tài liệu <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-gray-50">
                <Upload className="h-14 w-14 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Chọn file từ máy tính
                </label>
                <p className="text-sm text-gray-500 mt-3">
                  Hỗ trợ: PDF, DOC, DOCX, PPT, PPTX, ZIP, RAR
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Dung lượng tối đa: 50MB
                </p>
                {formData.file && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-blue-700">
                          {formData.file.name}
                        </p>
                        <p className="text-xs text-blue-600">
                          {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
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
                Đường dẫn liên kết <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, url: e.target.value }));
                  setErrors(prev => ({ ...prev, url: '' }));
                }}
                placeholder="https://drive.google.com/file/..."
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.url
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                }`}
              />
              <p className="text-xs text-gray-500 mt-2">
                Ví dụ: Google Drive, Dropbox, OneDrive, hoặc bất kỳ URL nào
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
              Tiêu đề tài liệu <span className="text-red-500">*</span>
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
              placeholder="Mô tả ngắn gọn về nội dung tài liệu..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-all resize-none"
            />
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Thêm tài liệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;
