# ExportDropdown Component

Component dropdown đẹp mắt để xuất báo cáo với nhiều tùy chọn.

## Tính năng

- ✅ Chọn định dạng xuất: PDF, Excel, CSV
- ✅ Tùy chọn nội dung xuất (biểu đồ, chi tiết sinh viên, tóm tắt)
- ✅ Hành động nhanh: Chia sẻ, Email, In
- ✅ Animation mượt mà
- ✅ Responsive design
- ✅ Click outside để đóng
- ✅ Loading state khi đang xuất

## Cách sử dụng

### Import component

```jsx
import ExportDropdown from '../../components/ExportDropdown';
```

### Sử dụng cơ bản

```jsx
<ExportDropdown 
  onExport={(format, options) => {
    console.log('Format:', format); // 'pdf', 'excel', hoặc 'csv'
    console.log('Options:', options); // { includeCharts, includeStudentDetails, summaryOnly }
  }}
/>
```

### Tùy chỉnh button style

```jsx
<ExportDropdown 
  onExport={(format, options) => {
    // Xử lý xuất báo cáo
  }}
  buttonClassName="btn-secondary flex items-center space-x-2"
/>
```

## Props

| Prop | Type | Mô tả | Mặc định |
|------|------|-------|----------|
| `onExport` | `function` | Callback khi xuất báo cáo `(format, options) => void` | - |
| `buttonClassName` | `string` | Custom class cho button trigger | `'btn-primary flex items-center space-x-2'` |

## Đã áp dụng vào

- ✅ Dashboard (Trang chủ)
- ✅ Quản lý lớp học
- ✅ Theo dõi sinh viên

## Thiết kế

Component được thiết kế dựa trên trang Reports với:
- Card-based format selection
- Checkbox options
- Quick action buttons
- Gradient button
- Smooth animations
