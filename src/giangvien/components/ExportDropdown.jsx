import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileSpreadsheet, File, Share2, Mail, Printer, X } from 'lucide-react';

const ExportDropdown = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeStudentDetails: true,
    summaryOnly: false
  });
  const dropdownRef = useRef(null);

  const exportFormats = [
    {
      value: 'pdf',
      label: 'PDF',
      icon: FileText,
      description: 'Định dạng phổ biến, dễ chia sẻ',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      value: 'excel',
      label: 'Excel',
      icon: FileSpreadsheet,
      description: 'Phân tích dữ liệu chi tiết',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      value: 'csv',
      label: 'CSV',
      icon: File,
      description: 'Dữ liệu thô, tương thích cao',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      if (onExport) {
        onExport(selectedFormat, exportOptions);
      }
      alert(`Đang xuất báo cáo dưới định dạng ${selectedFormat.toUpperCase()}...`);
      setIsOpen(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    alert(`Đang thực hiện: ${action}`);
    setIsOpen(false);
  };

  const toggleOption = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary flex items-center space-x-2"
      >
        <Download className="h-4 w-4" />
        <span>Xuất báo cáo</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-slideDown">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Download className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Xuất báo cáo</h3>
                  <p className="text-xs text-gray-600">Tải xuất và chia sẻ báo cáo</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Format Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Chọn định dạng xuất
                </label>
                
                <div className="space-y-2">
                  {exportFormats.map((format) => {
                    const Icon = format.icon;
                    const isSelected = selectedFormat === format.value;
                    
                    return (
                      <button
                        key={format.value}
                        onClick={() => setSelectedFormat(format.value)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-white shadow-sm' : format.bgColor
                        }`}>
                          <Icon className={format.color} size={20} />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-sm text-gray-900">{format.label}</h4>
                          <p className="text-xs text-gray-600">{format.description}</p>
                        </div>
                        
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Export Options */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Tùy chọn xuất</h4>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeCharts}
                      onChange={() => toggleOption('includeCharts')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Bao gồm biểu đồ</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeStudentDetails}
                      onChange={() => toggleOption('includeStudentDetails')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Bao gồm chi tiết sinh viên</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={exportOptions.summaryOnly}
                      onChange={() => toggleOption('summaryOnly')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Chỉ dữ liệu tóm tắt</span>
                  </label>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  isExporting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Đang xuất...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Xuất báo cáo {selectedFormat.toUpperCase()}</span>
                  </>
                )}
              </button>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Hành động nhanh</h4>
                
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleQuickAction('Chia sẻ')}
                    className="flex flex-col items-center gap-2 p-3 bg-white hover:bg-blue-50 rounded-lg transition-all border border-gray-200 hover:border-blue-300 hover:shadow-sm group"
                  >
                    <Share2 size={18} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Chia sẻ</span>
                  </button>
                  
                  <button 
                    onClick={() => handleQuickAction('Email')}
                    className="flex flex-col items-center gap-2 p-3 bg-white hover:bg-green-50 rounded-lg transition-all border border-gray-200 hover:border-green-300 hover:shadow-sm group"
                  >
                    <Mail size={18} className="text-gray-600 group-hover:text-green-600 transition-colors" />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-green-700">Email</span>
                  </button>
                  
                  <button 
                    onClick={() => handleQuickAction('In')}
                    className="flex flex-col items-center gap-2 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-gray-200 hover:border-purple-300 hover:shadow-sm group"
                  >
                    <Printer size={18} className="text-gray-600 group-hover:text-purple-600 transition-colors" />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-purple-700">In</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportDropdown;
