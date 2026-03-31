---
title: "Cách đổi tài khoản GitHub Copilot trong VS Code (Multi-Account)"
seoTitle: "Cách đổi tài khoản GitHub Copilot trong VS Code (Multi-Account)"
seoDescription: "Hướng dẫn đổi tài khoản GitHub Copilot theo workspace trong VS Code mà không cần đăng xuất GitHub"
datePublished: 2025-12-26T06:26:57.160Z
cuid: cmjmhoah4000602ic1vgiglwb
slug: cach-doi-tai-khoan-github-copilot-trong-vs-code-multi-account
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1766730243343/89c87ebe-6c3d-450a-a842-c541146ec3a5.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1766730338773/c73a43a5-0362-4b23-b265-17a516cbd8ad.png
tags: vs-code, github-copilot, cach-doi-tai-khoan-github-copilot-trong-vs-code-multi-account

---

> Áp dụng khi **VS Code đã đăng nhập nhiều GitHub account** và muốn chọn **account Copilot theo từng workspace**  
> ❌ Không cần sign out GitHub

---

## 🎯 Mục tiêu

* Chọn **GitHub account nào Copilot / Copilot Chat sẽ sử dụng**
    
* Áp dụng **chỉ cho workspace hiện tại**
    
* Dùng **nhiều Copilot (cá nhân / công ty)** trên cùng VS Code
    

---

## 🧭 Các bước thực hiện

### **Bước 1: Mở Accounts menu**

* Ở **góc dưới bên trái** VS Code
    
* Click **icon 👤 Accounts**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766730529048/ef0f938f-6fc6-404b-bf0d-5ec12bfff838.png align="center")

Bạn sẽ thấy danh sách nhiều GitHub account (ví dụ):

* `davidnguyen-94 (GitHub)`
    
* `hoangsvit (GitHub)`
    

---

### **Bước 2: Mở quản lý account cho extension**

Chọn:

```apache
Manage Extension Account Preferences...
```

---

### **Bước 3: Chọn extension GitHub Copilot**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766730571619/21b208da-c8df-4df7-b51e-a2343f730ec0.png align="center")

Trong danh sách extension, chọn:

```apache
GitHub Copilot Chat
```

---

### **Bước 4: Chọn GitHub account cho workspace**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766730589077/56c03c7d-5ff5-4a02-980a-3a2dea1cde73.png align="center")

Popup sẽ hiện:

**GitHub Copilot Chat – Account Preferences For This Workspace**

Danh sách account:

* `davidnguyen-94`
    
* `luan-eplus (Current account)`
    

👉 **Click account bạn muốn Copilot sử dụng**

✔ Copilot Chat sẽ đổi account **ngay lập tức**

---

## ✅ Kết quả

* Copilot Chat dùng **đúng GitHub account đã chọn**
    
* Không ảnh hưởng:
    
    * Git repository
        
    * GitHub account chính của VS Code
        
* Áp dụng **riêng cho workspace này**
    

---

## 🔍 Kiểm tra Copilot đã đổi account chưa

### Cách 1: Command Palette

```apache
Ctrl + Shift + P
→ GitHub Copilot: Check Status
```

### Cách 2: Copilot Chat

* Mở Copilot Chat
    
* Gửi thử một câu hỏi
    
* Nếu account **không có Copilot** → VS Code sẽ báo lỗi ngay
    

---

## ⚠️ Lưu ý quan trọng

| Hiểu nhầm | Thực tế |
| --- | --- |
| Copilot có tài khoản riêng | ❌ Không |
| Phải sign out GitHub | ❌ Không cần |
| Đổi account Git repo | ❌ Không liên quan |
| Workspace khác tự áp dụng | ❌ Phải chọn lại |

> **Copilot = GitHub account được chọn trong Extension Account Preferences**

---

## 🧠 Khi nào nên dùng cách này?

* Có **Copilot cá nhân + Copilot công ty**
    
* Muốn:
    
    * Project A → dùng Copilot công ty
        
    * Project B → dùng Copilot cá nhân
        
* Không muốn cài nhiều VS Code / VS Code Insiders
    

---

## 🛠 Troubleshooting

### Copilot vẫn dùng account cũ

```apache
Ctrl + Shift + P
→ Developer: Reload Window
```

### Copilot không hoạt động

* Kiểm tra GitHub account có **Copilot license**
    
* Kiểm tra workspace đã chọn đúng account chưa
    

---

## 📌 Ghi chú

* Thiết lập này là **per-workspace**
    
* Workspace mới → cần chọn lại account
    
* Đây là **best practice** khi dùng nhiều GitHub account trên VS Code