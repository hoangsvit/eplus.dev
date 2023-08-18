---
title: "Quên mật khẩu Linux trên WSL? Đây là cách thiết lập lại nó một cách dễ dàng"
seoTitle: "Quên mật khẩu Linux trên WSL? Đây là cách thiết lập lại nó một cách dễ"
seoDescription: "WSL (Windows Hệ thống con cho Linux) là một công cụ tiện dụng cho những người muốn tận hưởng sức mạnh của dòng lệnh Linux từ sự thoải mái của Windows."
datePublished: Fri Aug 18 2023 02:03:27 GMT+0000 (Coordinated Universal Time)
cuid: cllfy4zlu000908l4gx6o4zuj
slug: quen-mat-khau-linux-tren-wsl-day-la-cach-thiet-lap-lai-no-mot-cach-de-dang
canonical: https://websetnet.net/vi/forgot-linux-password-on-wsl-heres-how-to-reset-it-easily/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1692324595245/42271291-adfb-4854-8813-d5ad62b6f546.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1692324608826/e15ee75f-9ff2-4e82-a693-d35a6eeaa444.jpeg
tags: ubuntu, linux, debian, passwords, wsl

---

WSL (Windows Hệ thống con cho Linux) là một công cụ tiện dụng cho những người muốn tận hưởng sức mạnh của dòng lệnh Linux từ sự thoải mái của Windows.

Khi bạn cài đặt Linux bằng WSL trên Windows, bạn được yêu cầu tạo tên người dùng và mật khẩu. Người dùng này được tự động đăng nhập khi bạn khởi động Linux trên WSL.

Bây giờ, vấn đề là nếu bạn không sử dụng nó một thời gian, bạn có thể quên mật khẩu tài khoản của WSL. Và điều này sẽ trở thành vấn đề nếu bạn phải sử dụng lệnh với sudo vì ở đây bạn sẽ cần nhập mật khẩu.

![Đừng lo lắng. Bạn có thể dễ dàng thiết lập lại nó.](https://cdn.hashnode.com/res/hashnode/image/upload/v1692323800883/0d004f83-1305-44bd-bc60-0eb43139ccd3.webp align="center")

## **Đặt lại mật khẩu đã quên cho Ubuntu hoặc bất kỳ bản phân phối Linux nào khác trên WSL**

Để đặt lại mật khẩu Linux trong WSL, bạn phải:

* Chuyển người dùng mặc định sang root
    
* Đặt lại mật khẩu cho người dùng bình thường
    
* Chuyển lại người dùng mặc định thành người dùng bình thường
    

Hãy để tôi chỉ cho bạn các bước chi tiết và kèm theo ảnh chụp màn hình.

### **Bước 1: Chuyển sang root làm người dùng mặc định**

Sẽ là khôn ngoan khi ghi lại tên người dùng bình thường / thông thường của tài khoản của bạn. Như bạn có thể thấy, tên người dùng tài khoản thông thường của tôi là abhishek.

![Ghi lại tên người dùng tài khoản](https://cdn.hashnode.com/res/hashnode/image/upload/v1692323835963/5b56bbbf-b93e-4089-aefc-9c3a3f54df57.webp align="center")

Người dùng root trong WSL đã được mở khóa và chưa đặt mật khẩu. Điều này có nghĩa là bạn có thể chuyển sang người dùng root và sau đó sử dụng sức mạnh của root để đặt lại mật khẩu.

Vì bạn không nhớ mật khẩu tài khoản, nên việc chuyển đổi sang người dùng root được thực hiện bằng cách thay đổi cấu hình của ứng dụng WSL Linux của bạn và đặt nó sử dụng người dùng root theo mặc định.

Điều này được thực hiện thông qua Windows Command Prompt và bạn sẽ cần biết lệnh nào bạn cần chạy cho bản phân phối Linux của mình.

Thông tin này thường được cung cấp trong phần mô tả của ứng dụng phân phối trong [Windows Cửa hàng sách](https://www.microsoft.com/en-us/store/apps/windows). Đây là nơi bạn đã tải xuống bản phân phối của mình ngay từ đầu.

![Biết lệnh để chạy cho ứng dụng phân phối của bạn](https://cdn.hashnode.com/res/hashnode/image/upload/v1692323864835/7fd7a1fb-bb14-4192-9513-dfa5e6a91eec.webp align="center")

Từ Windows trình đơn, bắt đầu dấu nhắc lệnh:

![Khởi động Command Prompt](https://cdn.hashnode.com/res/hashnode/image/upload/v1692323966070/252e5687-802f-4546-8fbf-66a25e93f1b2.png align="center")

Tại đây, hãy sử dụng lệnh phân phối của bạn theo cách này. Nếu bạn đang sử dụng ứng dụng Ubuntu từ Windows lưu trữ, lệnh sẽ là:

```apache
ubuntu config --default-user root
```

Trong ảnh chụp màn hình, tôi đang sử dụng ứng dụng Ubuntu 20.04 từ Windows cửa hàng. Vì vậy, tôi đã sử dụng lệnh ubuntu2004.

![Đặt root làm người dùng mặc định trong cấu hình của ứng dụng Linux](https://cdn.hashnode.com/res/hashnode/image/upload/v1692324010636/b1304dce-7424-4696-b73a-85ef3be42d6b.webp align="center")

Để giúp bạn đỡ rắc rối, tôi liệt kê một số bản phân phối và các lệnh tương ứng của chúng trong bảng này:

| **Ứng dụng phân phối** | **Windows Lệnh** |
| --- | --- |
| Ubuntu | ubuntu config –default-user root |
| Ubuntu 20.04 | ubuntu2004 config –root người dùng mặc định |
| Ubuntu 18.04 | ubuntu1804 config –root người dùng mặc định |
| Debian | cấu hình debian – root người dùng mặc định |
| Linux Kali | cấu hình kali –default-user root |

### **Bước 2: Đặt lại mật khẩu cho tài khoản**

Bây giờ, nếu bạn khởi động ứng dụng phân phối Linux, bạn phải đăng nhập bằng quyền root. Bạn có thể đặt lại mật khẩu cho tài khoản người dùng bình thường.

Bạn có nhớ tên người dùng trong WSL không? Nếu không, bạn luôn có thể kiểm tra nội dung của thư mục / home. Khi bạn có tên người dùng, hãy sử dụng lệnh này:

```apache
passwd username
```

Nó sẽ yêu cầu bạn nhập mật khẩu mới. **Khi bạn gõ vào đây, sẽ không có gì được hiển thị trên màn hình. Điều đó là bình thường. Chỉ cần nhập mật khẩu mới và nhấn enter.** Bạn sẽ phải nhập lại mật khẩu mới để xác nhận và một lần nữa, sẽ không có gì hiển thị trên màn hình khi bạn nhập mật khẩu.

![Đặt lại mật khẩu cho người dùng thông thường](https://cdn.hashnode.com/res/hashnode/image/upload/v1692324051019/6c2bd87b-bc4b-4dca-9761-bdaee1abba93.webp align="center")

Xin chúc mừng. Mật khẩu cho tài khoản người dùng đã được đặt lại. Nhưng bạn vẫn chưa hoàn thành. Người dùng mặc định vẫn là root. Bạn nên thay đổi nó trở lại người dùng tài khoản thông thường của bạn, nếu không nó sẽ tiếp tục đăng nhập với tư cách người dùng root.

### **Bước 3: Đặt lại người dùng thông thường làm mặc định**

Bạn sẽ cần tên người dùng tài khoản thông thường mà bạn đã sử dụng với [lệnh passwd](https://linuxhandbook.com/passwd-command/) trong bước trước.

Bắt đầu Windows dấu nhắc lệnh một lần nữa. **Sử dụng lệnh phân phối của bạn** theo cách tương tự bạn đã làm trong bước 1. Tuy nhiên, lần này, hãy thay thế root bằng người dùng thông thường.

```apache
ubuntu config --default-user username
```

![Đặt người dùng thông thường làm người dùng mặc định](https://cdn.hashnode.com/res/hashnode/image/upload/v1692324090367/9512e0bd-65c8-44e1-9abb-3c6f74b10823.webp align="center")

Bây giờ khi bạn khởi động ứng dụng phân phối Linux của mình trong WSL, bạn sẽ đăng nhập với tư cách người dùng thông thường. Bạn đã đặt lại mật khẩu mới và có thể sử dụng nó để chạy các lệnh với sudo.

Nếu bạn quên mật khẩu một lần nữa trong tương lai, bạn biết các bước để đặt lại mật khẩu.

## **Nếu việc đặt lại mật khẩu WSL dễ dàng như vậy, thì đây không phải là một rủi ro bảo mật sao?**

Không hẳn vậy. Bạn cần có quyền truy cập vật lý vào máy tính cùng với quyền truy cập vào Windows tài khoản. Nếu ai đó đã có nhiều quyền truy cập này, họ có thể làm được nhiều việc hơn là chỉ thay đổi mật khẩu Linux trong WSL.

## **Bạn có thể đặt lại mật khẩu WSL không?**

Tôi đã cung cấp cho bạn các lệnh và giải thích các bước. Tôi hy vọng điều này hữu ích cho bạn và bạn đã có thể đặt lại mật khẩu của bản phân phối Linux của mình trong WSL.

Nếu bạn vẫn gặp vấn đề hoặc nếu bạn có câu hỏi về chủ đề này, vui lòng hỏi trong phần bình luận.

Source:

%[https://websetnet.net/vi/forgot-linux-password-on-wsl-heres-how-to-reset-it-easily/]