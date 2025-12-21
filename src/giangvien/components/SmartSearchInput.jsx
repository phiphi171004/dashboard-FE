import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SmartSearchInput - Component tìm kiếm đơn giản
 * Chỉ tìm kiếm khi người dùng bấm Enter
 */
const SmartSearchInput = ({ 
  value = '', 
  onChange, 
  placeholder = 'Tìm kiếm...', 
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  // Sync với prop value từ bên ngoài
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // KHÔNG tự động search - chỉ cập nhật input value
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Chỉ search khi bấm Enter
      onChange(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Xóa"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Helper text */}
      {inputValue && (
        <p className="text-xs text-gray-500 mt-1">
          💡 Nhấn Enter để tìm kiếm
        </p>
      )}
    </div>
  );
};

export default SmartSearchInput;
