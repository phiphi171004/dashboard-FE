import { useState, useEffect } from 'react';
import { 
  FileText, Video, Link as LinkIcon, Download, 
  Trash2, Plus, File, PlayCircle, ExternalLink,
  Clock, Eye
} from 'lucide-react';
import AddMaterialModal from './AddMaterialModal';
import localStorageService from '../../../services/localStorageService';

const CourseMaterials = ({ classId, materials = [] }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [materialType, setMaterialType] = useState('all'); // all, document, video, link
  const [localMaterials, setLocalMaterials] = useState(materials);

  // Load materials từ localStorage khi component mount
  useEffect(() => {
    const storedMaterials = localStorageService.getClassMaterials(classId);
    if (storedMaterials && storedMaterials.length > 0) {
      setLocalMaterials(storedMaterials);
    }
  }, [classId]);

  const handleAddMaterial = (newMaterial) => {
    const material = {
      ...newMaterial,
      id: Date.now(),
      classId: classId,
      uploadedAt: new Date().toISOString(),
      views: 0,
      downloads: 0
    };

    // Thêm vào state
    setLocalMaterials(prev => [...prev, material]);
    
    // Lưu vào localStorage
    const storedMaterials = localStorageService.getClassMaterials(classId) || [];
    storedMaterials.push(material);
    localStorageService.saveClassMaterials(classId, storedMaterials);
    
    setShowAddModal(false);
    
    // Notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>✅ Đã thêm tài liệu thành công</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleDeleteMaterial = (materialId) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?');
    if (!confirmed) return;

    // Xóa khỏi state
    setLocalMaterials(prev => prev.filter(m => m.id !== materialId));
    
    // Xóa khỏi localStorage
    const storedMaterials = localStorageService.getClassMaterials(classId) || [];
    const updated = storedMaterials.filter(m => m.id !== materialId);
    localStorageService.saveClassMaterials(classId, updated);
    
    // Notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span>🗑️ Đã xóa tài liệu</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const filteredMaterials = localMaterials.filter(m => {
    if (materialType === 'all') return true;
    return m.type === materialType;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-red-500" />;
      case 'link':
        return <LinkIcon className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Nhóm tài liệu theo loại
  const documents = filteredMaterials.filter(m => m.type === 'document');
  const videos = filteredMaterials.filter(m => m.type === 'video');
  const links = filteredMaterials.filter(m => m.type === 'link');

  return (
    <div className="space-y-6">
      {/* Header với nút thêm */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Tài liệu học tập</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMaterialType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                materialType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả ({localMaterials.length})
            </button>
            <button
              onClick={() => setMaterialType('document')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                materialType === 'document'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tài liệu ({documents.length})
            </button>
            <button
              onClick={() => setMaterialType('video')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                materialType === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Video ({videos.length})
            </button>
            <button
              onClick={() => setMaterialType('link')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                materialType === 'link'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Liên kết ({links.length})
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Thêm tài liệu</span>
        </button>
      </div>

      {/* Danh sách tài liệu */}
      {filteredMaterials.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
            <FileText className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có tài liệu nào
          </h3>
          <p className="text-gray-500 mb-4">
            Thêm tài liệu, video hoặc liên kết để chia sẻ với sinh viên
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Thêm tài liệu đầu tiên</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="card p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getFileIcon(material.type)}
                </div>

                {/* Nội dung */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {material.title}
                  </h3>
                  {material.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {material.description}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {material.type === 'document' && material.size && (
                      <span className="flex items-center space-x-1">
                        <File className="h-4 w-4" />
                        <span>{formatFileSize(material.size)}</span>
                      </span>
                    )}
                    {material.type === 'video' && material.duration && (
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(material.duration)}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{material.views || 0} lượt xem</span>
                    </span>
                    {material.type === 'document' && (
                      <span className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{material.downloads || 0} lượt tải</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {material.type === 'document' && (
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Tải xuống"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                  {material.type === 'video' && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      title="Xem ngay"
                    >
                      <PlayCircle className="h-5 w-5" />
                      <span>Xem ngay</span>
                    </button>
                  )}
                  {material.type === 'link' && (
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      title="Mở liên kết"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Mở</span>
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Material Modal */}
      <AddMaterialModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMaterial}
      />
    </div>
  );
};

export default CourseMaterials;
