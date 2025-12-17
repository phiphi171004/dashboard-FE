import React from 'react';
import { Filter, X } from 'lucide-react';
import SmartSearchInput from '../../../components/SmartSearchInput';

const StudentFilters = ({ filters, onFilterChange, students }) => {
  const getUniqueValues = (key, subKey = null) => {
    const values = new Set();
    students.forEach(student => {
      if (subKey) {
        student[key]?.forEach(item => values.add(item[subKey]));
      } else {
        values.add(student[key]);
      }
    });
    return Array.from(values).filter(Boolean);
  };

  const courses = getUniqueValues('courses', 'name');
  const classes = getUniqueValues('classes', 'name');

  const clearFilters = () => {
    Object.keys(filters).forEach(key => {
      if (key !== 'search') {
        onFilterChange(key, 'all');
      }
    });
    onFilterChange('search', '');
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key !== 'search' ? value !== 'all' : value !== ''
  );

  return (
    <div className="card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Bộ lọc tìm kiếm</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <SmartSearchInput
              value={filters.search}
              onChange={(value) => onFilterChange('search', value)}
              placeholder="Tên, email, mã sinh viên..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang học</option>
              <option value="at_risk">Có nguy cơ</option>
              <option value="completed">Hoàn thành</option>
              <option value="dropped">Đã bỏ học</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khóa học
            </label>
            <select
              value={filters.course}
              onChange={(e) => onFilterChange('course', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả khóa học</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hiệu suất
            </label>
            <select
              value={filters.performance}
              onChange={(e) => onFilterChange('performance', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="excellent">Giỏi (≥8.0)</option>
              <option value="good">Khá (6.5-7.9)</option>
              <option value="average">Trung bình (5.0-6.4)</option>
              <option value="weak">Yếu (4.0-4.9)</option>
              <option value="poor">Kém (&lt;4.0)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mức độ rủi ro
            </label>
            <select
              value={filters.riskLevel}
              onChange={(e) => onFilterChange('riskLevel', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFilters;