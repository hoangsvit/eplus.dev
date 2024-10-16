---
title: "Khám Phá Hai Cách Đơn Giản Để Custom Laravel: Macro và Mixin"
seoTitle: "Khám Phá Hai Cách Đơn Giản Để Custom Laravel: Macro và Mixin"
seoDescription: "Hôm nay mình sẽ chia sẻ với mọi người hai cách đơn giản để custom Laravel là Macro và Mixin."
datePublished: Tue Jul 23 2024 02:06:12 GMT+0000 (Coordinated Universal Time)
cuid: clyxry5ce000a09mgb305bekf
slug: kham-pha-hai-cach-don-gian-de-custom-laravel-macro-va-mixin
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Y5yxdx2a4PI/upload/7d69e7435a8a4a1f3dcb0a72d8d8eb51.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721700354646/f44c5f82-90c0-4416-83d6-fb4eaf891cc7.avif

---

Hi anh em, lại là mình đây

Hôm nay mình sẽ chia sẻ với mọi người hai cách đơn giản để custom **Laravel** là **Macro** và **Mixin**.

Trong thực tế, đôi khi bạn sẽ muốn bổ sung một số hàm, hoặc override lại một số phương thức của Laravel theo mong muốn: việc extends trực tiếp từ framework sẽ khá cồng kềnh. Macro và Mixin là hai tính năng Laravel cho phép bạn mở rộng các class có sẵn của framework một cách tương đối nhanh chóng (mà đôi khi ta không để ý vì docs viết về chúng khá ngắn gọn). Hy vọng là một chút tips nhỏ ae đọc chơi trước khi đi ngủ

(Hôm trước viết về Request LifeCycle nghe vẻ hơi nặng đô cho buổi tối)

PS: Tình hình mình đang bí content chia sẻ rồi, anh em muốn bọn mình sharing gì trong nội dung đăng bài và livestream thì comment nhé

---

Macro là một cách để mở rộng các lớp hiện có của framework mà không cần phải sửa đổi mã nguồn gốc. Điều này rất hữu ích khi bạn muốn thêm chức năng mới hoặc tùy chỉnh hành vi của một class mà không phải kế thừa và ghi đè các phương thức hiện có. Trong ví dụ này, lớp Collection cho phép bạn macro ra một phương thức bất kỳ để sử dụng.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721700149835/405f361f-5c73-4b46-87db-be38b0d76820.jpeg align="center")

Vẫn là macro, nhưng lần này thì bạn có thể can thiệp vào HttpClient của Laravel. Macro bản chất là một trait trong Laravel, nó có tên là MacroableTrait. Khi Trait này được sử dụng trong class, nó sẽ hook vào 2 magic method là **call và** callStatic để xử lý khi bạn cần đến nó.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721700174588/f2a1bcce-bffa-4dd0-aacf-98fc3b5a6072.jpeg align="center")

Macro có vẻ oke, nhưng sẽ đến lúc bạn thấy việc đăng ký từng hàm macro vào ServiceProvider làm code không được clean và khó kiểm soát. Oke chúng ta có mixin, đơn giản là giúp bạn tách các phương thức bạn cần ra một class riêng biệt, và load tất cả chúng vào (có thể ghi đè cả các macro trước đó luôn). Các bạn cũng có thể tách Macro / Mixin ra một Provider riêng biệt để tiện quản lý

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721700195753/682b337a-5169-4e81-a6eb-fa06fc005f35.jpeg align="center")

Trích nguồn: [Nguyễn Thế Huy - Group Laravel Việt Nam](https://www.facebook.com/groups/vietnam.laravel/posts/2471690543220956/)