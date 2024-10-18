---
title: "Design Pattern trong thực tế"
seoTitle: "Design Pattern trong thực tế"
seoDescription: "Để học một cái gì đó mình cần phải trả lời được lý do vì sao bạn cần phải học nó. Nếu không thì rất dễ rơi vào tình trạng học vẹt, vì mình không hiểu lý do"
datePublished: Wed Aug 07 2024 07:30:24 GMT+0000 (Coordinated Universal Time)
cuid: clzjj4usm000a09i79qhkcipq
slug: design-pattern-trong-thuc-te
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723015664515/cdff27c0-f10a-4280-bc9b-87805319aaf3.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723015801919/6328b105-b1f4-4346-aafd-04cc2c2923e5.jpeg
tags: design-pattern-trong-thuc-te

---

Hi mọi người

Mình join group **J2Team** đã lâu nhưng chưa bao giờ thử đăng bài cả. Hôm nay mình thử chia sẻ một chút kiến thức của mình, xoay quanh **Design Pattern** và mô hình Dependency Injection, hy vọng sẽ được admin duyệt

**DESIGN PATTERN LÀ GÌ ?, VÌ SAO CẦN HỌC DESIGN PATTERN ?. GIỚI THIỆU DEPENDENCY INJECTION.**

Để học một cái gì đó mình cần phải trả lời được lý do vì sao bạn cần phải học nó. Nếu không thì rất dễ rơi vào tình trạng học vẹt, vì mình không hiểu lý do vì sao cần làm như thế. Vậy **Design Pattern** là gì ?. Về cơ bản, DP là tập hợp các mẫu thiết kế, các công thức đã được chứng minh là hiệu quả trong các tình huống cụ thể, giúp người xây dựng phần mềm tiết kiệm thời gian, tăng hiệu quả và dễ dàng "bảo trì bảo dưỡng" ứng dụng. Khái niệm DP thực ra đã có từ rất lâu ở các ngành nghề khác, và các mẫu thiết kế trong OOP chỉ là các ánh xạ vào lập trình.

Cái khó khi bạn áp dụng DP đó là, khác với các thuật toán có mô hình code rõ ràng, các DP gần như chỉ là các bản mô tả (blueprint) cách giải quyết cho vấn đề. Việc áp dụng DP vào thực tế phụ thuộc nhiều vào cách ta "đánh hơi" tình huống để sử dụng cho phù hợp. Đó cũng là lý do vì sao bạn có thể đã thuộc nằm lòng cách cài đặt DP, nhưng vẫn gặp khó khăn khi cần triển khai vào bài toán cụ thể.

Ví dụ minh họa kinh điển là cách thiết kế "bóng đèn - đui đèn": Một mẫu thiết kế tốt cho phép bạn linh hoạt thay đổi giữa bóng và đui, trong khi thiết kế tồi khiến cái đèn của bạn không thể thay thế (tight coupling) =&gt; bạn buộc phải mua một cái đèn mới, thay vì chỉ cần thay bóng. Hãy tưởng tượng cái đèn nhà vệ sinh của mình bị hỏng, và nếu phải thay tuốt tuồn tuột từ trên xuống dưới thì thực sự là cơn ác mộng !

## **DEPENDENCY INJECTION (DI)**

**DI là giải pháp thiết kế cho chính bài toán bóng đèn - đui đèn bên trên.** Ae nếu làm việc với NestJS chắc đã rất quen thuộc với bộ IoC Container của framework này. Tuy nhiên, với các bạn mới bắt đầu với OOP, việc inject các thành phần qua constructor nhiều khi khá máy móc (mình code như vậy vì trên docs họ triển khai như vậy thôi)

**Về cốt lõi, DI đại diện cho triết lý "Composition Over Inheritance"**. Một đối tượng nên được tạo thành từ các viên gạch nhỏ hơn từ bên ngoài, thay vì chúng ta tự khởi tạo trong chính đối tượng đó. Hãy quay trở lại với ví dụ trên: Nếu ta đã có một cái đui, ta có thể inject bất kỳ cái đèn nào vào cái đui đó để thu được một cái đèn như ý muốn. Cần đèn xanh, có. Cần đèn vàng, có. Cần đèn nhấp nháy, easy (**Đoạn này nghe quen quen phải không, DI giúp chúng ta tạo nên tính Đa hình (Polymorphism). Ta có thế chế ra đủ loại đèn mà mình muốn**). Nếu cái đui gắn chặt vào một cái đèn (giống như nó tự khởi tạo new một cái đèn bên trong nó), rõ ràng là rất tồi tệ (ko thể thay đèn mà sẽ phải vứt nguyên mua cái mới). Khi ta tách được đèn và đui, việc của chúng ta là thiết kế một lớp trừu tượng, ở đây chính là cái trôn để xoáy đèn vào đui của nó. Cái đèn chỉ cần "implement" "interace trôn đèn", và miễn là nó implemnt interface này, nó sẽ luôn xoáy được vào đui, và chắc chắn nó sẽ hoạt động được. Rất trực quan và dễ hiểu đúng không các bạn ?

Tới đoạn này, chúng ta đã có thể hiểu vì sao mô hình này được gọi là "IoC" hay Inversion of Control (Đảo ngược sự phụ thuộc). Thay vì code của bạn đi từ trên xuống dưới và tự nó khởi tạo những thứ nó cần, thì bây giờ nó sử dụng những phụ thuộc được "inject" từ ngoài vào. Từ bây giờ bạn có thể thay đổi "hành vi" của đối tượng từ bên ngoài, chứ không cần trực tiếp thay đổi bên trong nữa. Đây chính là sự đảo ngược kiểm soát, cũng như đảm bảo yếu tố SOLID (các nguyên tắc phổ biến trong OOP). Và tất nhiên, DI giúp bạn dễ dàng hơn trong việc test - mockup code của mình

TL; DR Vì sao các framework web hiện đại đặt Dependency Injection và IoC Container làm core - concept quan trọng:

1. DI giúp thực thi tính đa hình trong OOP
    
2. Đảm bảo các nguyên tắc SOLID.
    
3. Code dễ maintain, dễ test hơn.
    

Cám ơn các bạn đã đọc bài, cám ơn admin đã duyệt bài ạ. Hy vọng sẽ có thêm nhiều cơ hội để chia sẻ thêm về cách "đánh hơi" áp dụng Design Pattern trong thực tế đến với ae

---

Tài liệu:

* [https://refactoring.guru/design-patterns/structural-patterns](https://refactoring.guru/design-patterns/structural-patterns)
    

**Nguồn:**[Nguyễn Thế Huy - J2TEAM Community](https://www.facebook.com/groups/j2team.community/posts/2438916643107108)