---
title: "Cách Sử Dụng Gmail SMTP với Cloudflare Email Routing: Hướng Dẫn Từng Bước"
seoTitle: "Cách Sử Dụng Gmail SMTP với Cloudflare Email Routing: Hướng Dẫn Từng B"
seoDescription: "Tìm hiểu cách gửi email qua Gmail SMTP kết hợp với Cloudflare Email Routing trong hướng dẫn chi tiết này."
datePublished: Fri Oct 25 2024 03:48:51 GMT+0000 (Coordinated Universal Time)
cuid: cm2o708fq000509jocpfofg88
slug: cach-su-dung-gmail-smtp-voi-cloudflare-email-routing-huong-dan-tung-buoc
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729828063993/d96ac354-7ccb-4477-9a44-7e8e6a8d4fc4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1729828107074/84ae921b-0ed7-4bb4-9bb0-a0b172bd79ea.png
tags: gmail-smtp, cloudflare-email-routing

---

Tìm hiểu cách gửi email qua Gmail SMTP kết hợp với Cloudflare Email Routing trong hướng dẫn chi tiết này.

**Bước 1: Bật Xác Thực Hai Yếu Tố (2FA)**  
Để thực hiện phương pháp này, bạn cần bật xác thực hai yếu tố cho tài khoản Google của mình. Nếu chưa kích hoạt, bạn có thể làm theo hướng dẫn tại đây → Bật 2FA cho tài khoản Google của bạn.

**Bước 2: Tạo Mật Khẩu Ứng Dụng cho Mail**  
Trong cài đặt tài khoản Google, tạo một Mật khẩu Ứng dụng dành riêng cho Mail. Thực hiện theo hướng dẫn tại đây → Tạo Mật khẩu Ứng dụng. Sau khi tạo mật khẩu, bạn sẽ sử dụng nó cùng với địa chỉ Gmail của mình trong phần cài đặt SMTP của Google.

Khi tạo Mật khẩu Ứng dụng, chọn "Mail" làm ứng dụng và chọn thiết bị là máy tính của bạn. Nhấp vào "Tạo" và nhớ sao chép mật khẩu được tạo ra vì bạn sẽ cần dùng sau này.

**Bước 3: Thêm Địa Chỉ Email Được Điều Hướng Qua Cloudflare Vào Gmail**  
Mở Gmail và vào Cài đặt → Tài khoản → Gửi thư với tư cách. Tại đây, nhấp vào "Thêm địa chỉ email khác" và điền thông tin với tên của bạn và địa chỉ email đã được điều hướng qua Cloudflare. Bỏ chọn tùy chọn "Xem như là bí danh" và nhấp vào "Bước tiếp theo."

**Bước 4: Điền Vào Biểu Mẫu Tiếp Theo**

* Máy chủ SMTP: `smtp.gmail.com`
    
* Cổng: `587`
    
* Tên đăng nhập: Địa chỉ Gmail của bạn (bao gồm @gmail.com)
    
* Mật khẩu: Mật khẩu Ứng dụng bạn đã tạo ở Bước 2
    
* Giữ TLS được bật
    
* Nhấp vào "Thêm tài khoản"
    

Sau đó, bạn sẽ nhận được một email từ Gmail yêu cầu xác nhận quyền sở hữu bằng cách cung cấp mã. Nhập mã vào hộp thoại hoặc nhấp vào liên kết trong email xác nhận để hoàn tất quá trình.

**Bước 5: Thiết Lập Bản Ghi SPF và Chính Sách DMARC trong DNS của Cloudflare**  
**Bản ghi SPF**

* Loại: `TXT`
    
* Tên: `@`
    
* TTL: tự động
    
* Nội dung:  
    `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`
    

**Chính sách DMARC**  
Nếu bạn muốn thiết lập Chính sách DMARC hoặc đã có, hãy đảm bảo rằng tham số `p` được đặt là `none`. Nếu không, email của bạn có thể không được xác thực và bị chặn.

Bạn có thể sử dụng Quản lý DMARC của Cloudflare để thiết lập chính sách cho việc giám sát email gửi đi.

**Ví dụ Bản ghi TXT:**

```plaintext
Copy codev=DMARC1; p=none; rua=mailto:<email-báo-cáo-của-bạn>
```

**Hoàn thành!**  
Bạn đã cấu hình thành công Gmail SMTP với Cloudflare Email Routing. Bây giờ, khi soạn thư mới trong Gmail, bạn có thể chọn địa chỉ email mới của mình từ danh sách. Ngoài ra, khi trả lời email nhận được tại địa chỉ mới này, địa chỉ đó sẽ tự động xuất hiện trong trường "Từ".

**Ghi nhận**  
Hướng dẫn này được dựa trên các nguồn tài liệu đã công bố dưới đây:

* Diễn đàn Cộng đồng Cloudflare - Cách Sử Dụng Gmail SMTP Để Gửi Từ Địa Chỉ Email Được Điều Hướng Qua Cloudflare Email Routing
    
* ImprovMX - Gửi Email Sử Dụng Gmail