# 🎵 NĐGC WEBSITE - HUẤN LƯỢN DỰ ÁN VÀ HƯỚNG DẪN CẤU TRÚC FILE

Chào mừng bạn đến với dự án Website Bio & Music Player chính thức của nhóm **NĐGC (New Wave / Underground Music Team)**.

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN (FILE STRUCTURE)

Để website hoạt động hoàn hảo và nhận đủ các tệp hình ảnh/âm thanh, hãy tạo cấu trúc thư mục trên máy tính của bạn đúng như sau:

```text
ndgc-website/
├── index.html             # File giao diện chính HTML
├── style.css              # File định dạng giao diện & hiệu ứng Dark Neon CSS
├── script.js             # File xử lý tương tác 3D, Music Player & JavaScript
├── README.md              # File tài liệu hướng dẫn
└── assets/
    ├── images/            # Thư mục chứa tất cả hình ảnh
    │   ├── logo.png       # Logo chính của NĐGC
    │   ├── noxious.jpg    # Ảnh thành viên NOXIOUS
    │   ├── hexxo.jpg      # Ảnh thành viên HEXXO
    │   ├── thokawi.jpg    # Ảnh thành viên THOKAWI
    │   ├── lilziddy.jpg   # Ảnh thành viên LILZIDDY
    │   └── zura.jpg       # Ảnh thành viên ZURA
    └── audio/             # Thư mục chứa các tệp nhạc .mp3
        ├── song1.mp3      # Bài hát 01
        ├── song2.mp3      # Bài hát 02
        └── song3.mp3      # Bài hát 03
```

---

## 🖼️ HƯỚNG DẪN THAY ĐỔI ẢNH & NHẠC

### 1. Thay ảnh Logo và Thành viên:
* Copy các file ảnh đại diện của bạn vào thư mục `assets/images/`.
* Tên các file ảnh phải trùng khớp với tên khai báo trong mảng `membersData` ở file `script.js`:
  ```javascript
  avatar: "assets/images/noxious.jpg"
  ```
* Nếu muốn đổi tên file hoặc đường dẫn, bạn chỉ cần mở `script.js` và cập nhật lại đường dẫn tương ứng.

### 2. Thay nhạc cho Music Player:
* Copy các file nhạc `.mp3` của bạn vào thư mục `assets/audio/`.
* Mở file `script.js`, tìm mảng `playlistData` và sửa lại tiêu đề, tên ca sĩ và đường dẫn bài hát:
  ```javascript
  const playlistData = [
      {
          title: "TÊN BÀI HÁT MỚI",
          artist: "NĐGC Artist",
          src: "assets/audio/song1.mp3",
          cover: "assets/images/noxious.jpg"
      }
  ];
  ```

---

## 🚀 HIỆU ỨNG 3D VÀ CÁC THƯ VIỆN SỬ DỤNG

Dự án sử dụng các thư viện CDN nhẹ và tốc độ cao:
1. **Three.js**: Dùng để render khối cầu Wireframe 3D tương tác chuột ở nền website.
2. **Vanilla-Tilt.js**: Tạo hiệu ứng nghiêng 3D (3D Card Tilt) khi di chuột qua các thẻ thành viên.
3. **Particles.js**: Hiệu ứng các hạt New Wave lơ lửng background.
4. **HTML5 Audio Visualizer**: Render sóng nhạc chạy theo thời gian thực trên Canvas.