# 📚 TỔNG HỢP TÀI LIỆU HỆ THỐNG DASHBOARD GIẢNG VIÊN

> **Tài liệu tổng hợp đầy đủ** về các tính năng, fix bugs và hướng dẫn sử dụng hệ thống Dashboard Giảng Viên

---

## 📑 MỤC LỤC

1. [Hệ Thống Quản Lý Tài Liệu](#1-hệ-thống-quản-lý-tài-liệu)
2. [Quản Lý Sinh Viên](#2-quản-lý-sinh-viên)
3. [Hệ Thống Đa Ngôn Ngữ](#3-hệ-thống-đa-ngôn-ngữ)
4. [Modal Danh Sách Sinh Viên](#4-modal-danh-sách-sinh-viên)

---

## 1. HỆ THỐNG QUẢN LÝ TÀI LIỆU

### 📖 Tổng Quan
Hệ thống cho phép giảng viên dễ dàng chia sẻ tài liệu, video và liên kết với sinh viên.

### 🎯 Vị Trí Sử Dụng
- **Chi tiết lớp học** → Tab "Tài liệu" → Nút "Thêm tài liệu"
- **Chi tiết tuần học** → Phần "Tài liệu học tập" → Nút "Thêm tài liệu"

### ✨ Tính Năng Chính

#### Loại Tài Liệu Hỗ Trợ
- **Tài liệu**: PDF, DOC, DOCX, PPT, PPTX, ZIP (Max 50MB)
- **Video**: MP4, AVI, MOV, MKV (Max 500MB)
- **Liên kết**: URL đến tài nguyên bên ngoài (YouTube, Google Drive, v.v.)

#### Thông Tin Tài Liệu
- Tiêu đề (bắt buộc)
- Mô tả (tùy chọn)
- File/URL
- Kích thước file (tự động)
- Thời lượng video (tùy chọn, tính bằng giây)
- Số lượt xem
- Số lượt tải (cho tài liệu)

#### Bộ Lọc
- **Tất cả**: Hiển thị tất cả tài liệu
- **Tài liệu**: Chỉ hiển thị file tài liệu
- **Video**: Chỉ hiển thị video
- **Liên kết**: Chỉ hiển thị các liên kết

#### Thao Tác
- **Tải xuống**: Cho tài liệu file
- **Xem ngay**: Cho video
- **Mở liên kết**: Cho URL (mở tab mới)
- **Xóa**: Xóa tài liệu khỏi danh sách

### 💾 Lưu Trữ Dữ Liệu
- Lưu vào **localStorage**
- Dữ liệu tồn tại vĩnh viễn cho đến khi xóa
- Mỗi lớp học/tuần học có danh sách tài liệu riêng
- **Key lưu trữ**: 
  - Lớp học: `class_${classId}_materials`
  - Tuần học: `week_${moduleId}_${weekNumber}_materials`

### 📝 Quy Trình Thêm Tài Liệu

1. **Chọn Loại**: Click nút "Thêm tài liệu" → Chọn Tài liệu/Video/Liên kết
2. **Upload/Nhập**: 
   - Tài liệu/Video: Click chọn file từ máy tính
   - Liên kết: Nhập URL
3. **Điền Thông Tin**: Nhập tiêu đề, mô tả, thời lượng (nếu là video)
4. **Xác Nhận**: Click "Thêm tài liệu" → Thông báo thành công

### ✅ Validation
- Tiêu đề không được để trống
- URL phải hợp lệ (cho liên kết)
- File phải được chọn (cho tài liệu/video)
- Định dạng file phải đúng

### 🎨 Giao Diện
- **Nút "Thêm tài liệu"**: Màu xanh nổi bật
- **Bộ lọc**: Dễ dàng chuyển đổi giữa các loại
- **Card tài liệu**: Hiển thị đầy đủ thông tin
- **Icon màu sắc**: 
  - 🔵 Xanh dương: Tài liệu
  - 🔴 Đỏ: Video
  - 🟢 Xanh lá: Liên kết

---

## 2. QUẢN LÝ SINH VIÊN

### 🎯 Vấn Đề Đã Giải Quyết

#### A. Đồng Bộ Số Lượng Sinh Viên

**Vấn đề**: Khi xóa sinh viên trong chi tiết lớp, số lượng ở card lớp học không cập nhật

**Nguyên nhân**:
- Chỉ cập nhật `classDetails` trong localStorage
- Không cập nhật `classes` array
- Trang ClassManagement load từ `classes` array

**Giải pháp**:

1. **StudentList.jsx** - Cập nhật sau khi xóa:
```javascript
const handleRemoveStudent = (student) => {
  // Xóa khỏi classDetails
  localStorageService.removeStudentFromClass(classId, student.id);
  
  // Lấy số lượng SAU KHI xóa
  const classDetails = localStorageService.getClassDetails();
  const currentStudentCount = classDetails[classId]?.students.length || 0;
  
  // Cập nhật classes array
  localStorageService.updateClassStudentCount(classId, currentStudentCount);
};
```

2. **ClassManagement.jsx** - Đồng bộ khi load:
```javascript
const loadClassData = async () => {
  const storedClasses = localStorageService.getClasses();
  const classDetails = localStorageService.getClassDetails();
  
  // Đồng bộ số lượng từ classDetails
  if (classDetails) {
    classesToUse = classesToUse.map(classItem => {
      const details = classDetails[classItem.id];
      if (details && details.students) {
        return {
          ...classItem,
          enrolledStudents: details.students.length
        };
      }
      return classItem;
    });
    localStorageService.saveClasses(classesToUse);
  }
};
```

3. **Auto Reload** - Khi quay lại trang:
```javascript
useEffect(() => {
  loadClassData();
  
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      loadClassData();
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

**Luồng đồng bộ**:
1. Xóa sinh viên → Cập nhật `classDetails`
2. Lấy số lượng mới từ `classDetails.students.length`
3. Cập nhật `classes[classId].enrolledStudents`
4. Callback cập nhật UI
5. Auto reload khi quay lại trang

#### B. Hiển Thị Sinh Viên Mới Trong Trang Theo Dõi

**Vấn đề**: Sinh viên mới không xuất hiện trong trang "Theo Dõi Sinh Viên"

**Nguyên nhân**:
- Trang StudentTracking load từ `mockData` (hard-coded)
- Không đọc từ localStorage

**Giải pháp**:

1. **StudentTracking.jsx** - Load từ localStorage:
```javascript
const loadStudentData = async () => {
  // Lấy từ localStorage
  const storedStudents = localStorageService.getStudents();
  
  // Fallback về mockData nếu không có
  const studentsToUse = storedStudents || mockStudentTrackingData.students;
  
  setStudents(studentsToUse);
};
```

2. **ClassManagement.jsx** - Thêm đầy đủ thông tin:
```javascript
const handleAddStudent = (classId, studentData) => {
  const classInfo = classes.find(c => c.id === classId);
  
  const newStudent = {
    id: Date.now(),
    name: studentData.name,
    studentId: studentData.studentId,
    email: studentData.email || `${studentData.studentId}@student.edu.vn`,
    phone: studentData.phone || '',
    status: 'active',
    completionRate: 0,
    averageScore: 0,
    // Thông tin lớp học
    courses: classInfo ? [{ id: classInfo.courseId, name: classInfo.course }] : [],
    classes: classInfo ? [{ id: classInfo.id, name: classInfo.name }] : [],
    riskLevel: 'low'
  };
  
  // Lưu vào cả 2 nơi
  localStorageService.addStudentToClass(classId, newStudent);
  localStorageService.addStudent(newStudent);
};
```

**Cấu trúc sinh viên đầy đủ**:
```javascript
{
  id: 1734345678901,
  name: "Nguyễn Văn A",
  studentId: "22CT111",
  email: "22CT111@student.edu.vn",
  phone: "0123456789",
  status: "active",
  completionRate: 0,
  averageScore: 0,
  courses: [{ id: "CS101", name: "Nhập môn lập trình" }],
  classes: [{ id: 1, name: "22CT111" }],
  riskLevel: "low"
}
```

### ✅ Test Cases

#### Test Xóa Sinh Viên
1. Vào Quản lý lớp học → Ghi nhớ số lượng (ví dụ: 6)
2. Chi tiết → Tab Sinh viên → Xóa 1 sinh viên
3. ✅ Số lượng giảm xuống 5
4. Quay lại Quản lý lớp học
5. ✅ Card hiển thị 5 sinh viên

#### Test Thêm Sinh Viên
1. Quản lý lớp học → Click "Thêm SV"
2. Nhập thông tin → Thêm sinh viên
3. ✅ Card cập nhật số lượng ngay
4. Vào "Theo Dõi Sinh Viên"
5. ✅ Sinh viên mới xuất hiện

#### Test Reload
1. Thêm/xóa sinh viên
2. Reload trang (F5)
3. ✅ Số lượng vẫn chính xác

---

## 3. HỆ THỐNG ĐA NGÔN NGỮ

### 🌍 Ngôn Ngữ Hỗ Trợ

- 🇻🇳 **Tiếng Việt** - Ngôn ngữ mặc định
- 🇺🇸 **English** - Tiếng Anh
- 🇫🇷 **Français** - Tiếng Pháp

### 📝 Cách Thay Đổi Ngôn Ngữ

1. Click icon **bánh răng** (⚙️) ở góc phải header
2. Chọn **Ngôn ngữ** mong muốn
3. Chọn **Theme** (Sáng/Tối/Tự động)
4. Chọn **Kích thước chữ** (Nhỏ/Vừa/Lớn)
5. Click **"Lưu thay đổi"**
6. Toàn bộ giao diện thay đổi ngay lập tức!

### ✨ Các Phần Được Dịch

#### Dashboard
- Tiêu đề trang
- Bộ lọc (khóa học, lớp, mức độ, trạng thái)
- Nút "Làm mới", "Xuất báo cáo"

#### Menu Người Dùng
- "Hồ sơ của tôi"
- "Cài đặt"
- "Đăng xuất"

#### Hồ Sơ
- Họ và tên, MSGV, Email, Địa chỉ, Số điện thoại

#### Xuất Báo Cáo
- Định dạng: PDF, Excel, CSV
- Tùy chọn xuất
- Hành động: Chia sẻ, Email, In

#### Cài Đặt
- Chủ đề giao diện
- Kích thước chữ
- Ngôn ngữ
- Nút: Lưu thay đổi, Hủy, Đóng

### 💡 Tính Năng Nổi Bật

#### 1. Pending Changes System
- Chọn settings → Hiển thị preview
- Phải bấm "Lưu thay đổi" mới áp dụng
- Có thể "Hủy" để quay lại
- Warning "Bạn có thay đổi chưa lưu"

#### 2. Real-time Language Switch
- Thay đổi ngay lập tức khi bấm "Lưu"
- KHÔNG cần F5 hay reload
- Tất cả component tự động cập nhật

#### 3. Dark Mode Support
- Hoạt động tốt trong cả Light và Dark mode
- Text color tự động điều chỉnh

#### 4. Font Size Support
- 3 mức: Small (14px), Medium (16px), Large (20px)
- Áp dụng cho toàn bộ app

### 🔧 Sử Dụng Cho Developer

```jsx
import { useAppSettings } from '../contexts/AppSettingsContext';

const MyComponent = () => {
  const { t } = useAppSettings();
  
  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <p>{t('dashboardSubtitle')}</p>
      <button>{t('exportReport')}</button>
    </div>
  );
};
```

### 📚 Translation Keys

**Common**: `name`, `settings`, `save`, `cancel`, `close`, `edit`, `delete`, `search`, `filter`, `export`, `refresh`

**Settings**: `theme`, `language`, `fontSize`, `light`, `dark`, `auto`, `small`, `medium`, `large`, `saveChanges`

**Dashboard**: `dashboard`, `dashboardTitle`, `overview`, `statistics`, `reports`

**User**: `profile`, `myProfile`, `logout`, `fullName`, `email`, `address`, `phone`

**Actions**: `viewDetails`, `download`, `upload`, `share`, `print`

**Status**: `active`, `inactive`, `pending`, `completed`, `studying`, `atRisk`

**Filters**: `allCourses`, `allClasses`, `allLevels`, `allStatuses`

**Performance**: `excellent`, `good`, `average`, `poor`

**Export**: `exportReport`, `exportFormat`, `exportPDF`, `exportExcel`, `exportCSV`

---

## 4. MODAL DANH SÁCH SINH VIÊN

### 📖 Tổng Quan
Modal hiển thị danh sách sinh viên với chức năng lọc, tìm kiếm và sắp xếp mạnh mẽ.

### 🎯 Vị Trí Sử Dụng
- **Trang Lộ Trình Học** → Click card "Sinh viên" (màu tím)
- Hiển thị tất cả sinh viên trong hệ thống

### ✨ Tính Năng

#### 1. Tìm Kiếm
- **Tìm theo**: Tên, MSSV, Email
- **Real-time**: Kết quả cập nhật ngay khi gõ

#### 2. Lọc Theo Lớp
- **Dropdown**: Chọn lớp học cụ thể
- **Tùy chọn**: "Tất cả lớp học" hoặc tên lớp
- **Tự động**: Danh sách lớp từ dữ liệu sinh viên

#### 3. Sắp Xếp
- **Tên A → Z**: Sắp xếp theo tên (tiếng Việt)
- **Tên Z → A**: Sắp xếp ngược
- **Điểm cao → thấp**: Theo điểm TB giảm dần
- **Điểm thấp → cao**: Theo điểm TB tăng dần

#### 4. Hiển Thị Thông Tin
- **Avatar**: Chữ cái đầu với màu gradient
- **Tên và MSSV**: Thông tin cơ bản
- **Trạng thái**: Badge màu
- **Email và SĐT**: Liên hệ
- **Điểm TB**: Với màu theo mức độ
- **Tiến độ**: Progress bar với %
- **Danh sách lớp**: Các lớp đang học

#### 5. Màu Sắc Điểm Số
- **≥ 8.0**: 🟢 Xanh lá (Giỏi)
- **6.5 - 7.9**: 🔵 Xanh dương (Khá)
- **5.0 - 6.4**: 🟡 Vàng (Trung bình)
- **4.0 - 4.9**: 🟠 Cam (Yếu)
- **< 4.0**: 🔴 Đỏ (Kém)

#### 6. Trạng Thái
- **Đang học** (active): Badge xanh lá
- **Có nguy cơ** (at_risk): Badge đỏ
- **Hoàn thành** (completed): Badge xanh dương
- **Đã bỏ học** (dropped): Badge xám

### 🔧 Tích Hợp Vào Trang

```jsx
// 1. Import
import StudentsListModal from './components/StudentsListModal';
import localStorageService from '../../services/localStorageService';

// 2. State
const [showStudentsModal, setShowStudentsModal] = useState(false);
const [allStudents, setAllStudents] = useState([]);

// 3. Load dữ liệu
useEffect(() => {
  const storedStudents = localStorageService.getStudents();
  setAllStudents(storedStudents || []);
}, []);

// 4. Trigger button
<div onClick={() => setShowStudentsModal(true)}>
  <Users className="h-10 w-10" />
  <p>{allStudents.length} sinh viên</p>
</div>

// 5. Render modal
<StudentsListModal
  isOpen={showStudentsModal}
  onClose={() => setShowStudentsModal(false)}
  students={allStudents}
  moduleName="Lộ Trình Học"
/>
```

### 📱 Responsive Design

- **Desktop (≥ 1024px)**: Modal 6xl, Grid 2 cột, Filters 3 cột
- **Tablet (768-1023px)**: Modal 90%, Grid 2 cột, Filters 3 cột
- **Mobile (< 768px)**: Modal 95%, Grid 1 cột, Filters 1 cột (stack)

### ⚡ Tối Ưu Hiệu Suất

**useMemo**:
- `uniqueClasses`: Chỉ tính lại khi `students` thay đổi
- `filteredAndSortedStudents`: Chỉ tính lại khi filters thay đổi

**Lợi ích**:
- Tránh tính toán không cần thiết
- Render nhanh với danh sách lớn
- Trải nghiệm mượt mà

---

## 📊 TỔNG KẾT

### ✅ Tính Năng Đã Hoàn Thành

1. **Quản Lý Tài Liệu**
   - ✅ Thêm tài liệu/video/liên kết
   - ✅ Lọc theo loại
   - ✅ Xóa tài liệu
   - ✅ Lưu vào localStorage
   - ✅ Tích hợp vào lớp học và tuần học

2. **Quản Lý Sinh Viên**
   - ✅ Đồng bộ số lượng sinh viên
   - ✅ Thêm/xóa sinh viên
   - ✅ Hiển thị trong trang Theo Dõi
   - ✅ Auto reload khi quay lại trang
   - ✅ Lưu đầy đủ thông tin

3. **Hệ Thống Đa Ngôn Ngữ**
   - ✅ 3 ngôn ngữ (VI/EN/FR)
   - ✅ Thay đổi toàn bộ giao diện
   - ✅ Pending changes system
   - ✅ Dark mode support
   - ✅ Font size support

4. **Modal Danh Sách Sinh Viên**
   - ✅ Tìm kiếm real-time
   - ✅ Lọc theo lớp
   - ✅ Sắp xếp 4 kiểu
   - ✅ Hiển thị đầy đủ thông tin
   - ✅ Responsive design
   - ✅ Performance optimization

### 🎯 Nguyên Tắc Thiết Kế

1. **Đồng Bộ Dữ Liệu**: Luôn đồng bộ giữa localStorage và UI
2. **Real-time Update**: Cập nhật ngay lập tức, không cần reload
3. **User-Friendly**: Giao diện trực quan, dễ sử dụng
4. **Performance**: Tối ưu với useMemo, useCallback
5. **Responsive**: Hoạt động tốt trên mọi thiết bị
6. **Accessibility**: Hỗ trợ đa ngôn ngữ, dark mode, font size

### 🚀 Hướng Phát Triển

1. **Export/Import**: Xuất dữ liệu ra Excel, PDF
2. **Notification**: Thông báo real-time
3. **Analytics**: Thống kê chi tiết hơn
4. **Collaboration**: Chia sẻ tài liệu giữa giảng viên
5. **Mobile App**: Phát triển app di động
6. **AI Integration**: Gợi ý tài liệu, phân tích sinh viên

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề hoặc cần hỗ trợ:
1. Kiểm tra console log (F12)
2. Xem lại tài liệu này
3. Liên hệ team phát triển

---

**Cập nhật lần cuối**: 16/12/2025
**Phiên bản**: 1.0.0
**Tác giả**: Kiro AI Assistant

---

🎉 **Chúc bạn sử dụng hệ thống hiệu quả!**
