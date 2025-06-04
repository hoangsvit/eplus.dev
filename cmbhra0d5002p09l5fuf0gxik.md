---
title: "🕵️‍♂️ Fake My History – Tạo lịch sử duyệt web "đẹp đẽ" chỉ trong một nốt nhạc"
seoTitle: "🕵️‍♂️ Fake My History – Tạo lịch sử duyệt web "đẹp đẽ" chỉ trong một "
seoDescription: "Dạo này em có nghịch một chút và viết ra một extension nhỏ cho trình duyệt có tên là Fake My History.
Ý tưởng bắt nguồn từ một tính năng khá thú vị trên Ope"
datePublished: Wed Jun 04 2025 09:39:17 GMT+0000 (Coordinated Universal Time)
cuid: cmbhra0d5002p09l5fuf0gxik
slug: fake-my-history-tao-lich-su-duyet-web-dep-de-chi-trong-mot-not-nhac
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749029884862/9bcac4da-5f13-4169-8cf8-4c19ac47ee8c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749029915049/89d2052b-8621-49ac-b519-77f0c40454d9.png
tags: extension, chrome-extension, fake-my-history, developer-mode

---

Chào mọi người 👋

Dạo này em có nghịch một chút và viết ra một **extension nhỏ cho trình duyệt** có tên là **Fake My History**.  
Ý tưởng bắt nguồn từ một tính năng khá thú vị trên **Opera GX** – *Fake My History*, cho phép thay thế lịch sử web thật bằng những trang tri thức như Wikipedia, Stack Overflow, hay các diễn đàn học tập.  
Vừa nhìn vào là thấy kiểu: “Đúng chuẩn học sinh chăm ngoan – sống tích cực” 😄

Vì em không dùng Opera GX nên quyết định... **tự code lại** cho các trình duyệt khác. Và đây là thành quả:

---

## 🌟 Fake My History có gì hay?

✅ **Tự động xóa lịch sử duyệt web mới**  
✅ **Ghi đè bằng các trang uy tín, tri thức** (có thể tùy chỉnh nội dung theo ý thích)  
✅ **Hoạt động âm thầm**, không cần thao tác gì sau khi cài  
✅ **Mã nguồn mở**, dễ dàng học hỏi hoặc chỉnh sửa  
✅ **Giao diện đơn giản**, ai cũng dùng được

> 👉 GitHub Repo: [https://github.com/letho1608/fake\_my\_history](https://github.com/letho1608/fake_my_history)

---

## ⚙️ Cách cài đặt (rất đơn giản luôn)

Hiện tại extension chỉ có thể **cài thủ công** qua chế độ Developer Mode, nhưng thao tác cũng nhanh gọn:

1. Clone hoặc tải repo từ GitHub về máy
    
2. Mở trình duyệt (Chrome-based), truy cập `chrome://extensions/`
    
3. Bật **Developer mode** (góc trên bên phải)
    
4. Chọn **Load unpacked** và trỏ vào thư mục chứa mã nguồn
    
5. Hoàn tất! Extension sẽ chạy nền ngay lập tức 🎉
    

---

## 🛠 Cấu trúc source code (dành cho anh em thích vọc)

```plaintext
cssCopyEdit├── manifest.json     # Cấu hình chính của extension
├── background.js     # Script xử lý logic xóa & ghi lịch sử
├── popup.html        # Giao diện popup người dùng
├── popup.js          # Xử lý nút bấm và sự kiện
├── fakeData.js       # Danh sách các trang “giả”
└── images/           # Icon các kích thước
```

---

## ⚠️ Lưu ý nhỏ

Extension chỉ dành cho **mục đích học tập và thử nghiệm**. Không khuyến khích dùng để **đánh lừa người khác** hay **che giấu hành vi không lành mạnh** nhé 😅

---

## 🤝 Góp ý & đóng góp

Mọi ý kiến, góp ý hay cải tiến đều **rất được hoan nghênh**.  
Cứ thoải mái tạo **issue** hoặc **pull request** trên GitHub nha!

---

Cảm ơn mọi người đã đọc tới đây. Ai thấy vui vui thì cứ thử cài chơi, sửa thêm hoặc chia sẻ để nhiều người dùng hơn nhé 🙌  
Chúc mọi người... duyệt web tích cực 😎

---

Bài viết tạo tự động bởi AI