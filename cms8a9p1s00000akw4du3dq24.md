---
title: "Daily Tech Brief — 31/07/2026"
seoTitle: "Daily Tech Brief — 31/07/2026"
seoDescription: "Tin công nghệ 31/07/2026: OpenAI giảm giá GPT-5.6, GitHub ra mắt stacked PR, Vercel Sandbox hỗ trợ multi-agent và cdnjs chuyển lên Cloudflare."
datePublished: 2026-07-31T01:48:13.506Z
cuid: cms8a9p1s00000akw4du3dq24
slug: daily-tech-brief-31-07-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1aa24325-7cde-4c32-b6e6-6d2ed4d9c5b4.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/26c12d62-072b-4f3b-9adb-7fd50624aed3.png
tags: cloudflare, opensource, devtools, vercel, openai, mcp, githubcopilot, gpt56, daily-tech-brief, daily-tech-brief-31-07-2026

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source và những công nghệ đáng chú ý trong ngày.

* * *

## 📌 Executive Summary

*   OpenAI giảm mạnh giá GPT-5.6 Luna và Terra, đồng thời chuyển Priority Processing sang Fast mode với tốc độ cao hơn cho workload cần phản hồi nhanh.
    
*   GitHub Models đã chính thức ngừng hoạt động, bao gồm playground, model catalog, inference API và BYOK endpoint.
    
*   GitHub đưa stacked pull requests vào Public Preview để chia thay đổi lớn thành nhiều lớp có thể review và merge theo thứ tự.
    
*   GitHub Actions có cú pháp `$/` mới để gọi action hoặc reusable workflow trong cùng repository tại đúng commit đang chạy.
    
*   Copilot trong VS Code tăng khả năng quản lý nhiều agent session, hỗ trợ worktree và hiển thị hoạt động của subagent rõ hơn.
    
*   Visual Studio có agent mới dựa trên Copilot SDK, skill chính thức cho .NET và Azure cùng khả năng review một đoạn code được chọn.
    
*   Vercel Sandbox cho phép nhiều agent chạy dưới các Linux user tách biệt nhưng vẫn có thể cộng tác qua shared group directory.
    
*   `mcp-handler` 2.0 hỗ trợ đặc tả Model Context Protocol ngày 28/07/2026 và MCP TypeScript SDK v2.
    
*   Cloudflare đã chuyển toàn bộ cdnjs sang Developer Platform để vận hành khoảng 9 tỷ request mỗi ngày bằng Workers, R2, Queues và các dịch vụ liên quan.
    
*   Vercel sẽ chuyển tiếp `Server-Timing` đến trình duyệt từ ngày 10/08, giúp Developer quan sát database, cache và backend timing trực tiếp trong DevTools.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Bản tin ngày 31/07 tập trung vào quá trình biến AI agent và hạ tầng phát triển thành những thành phần có thể vận hành ở quy mô thật. Model rẻ hơn là một phần của câu chuyện, nhưng thay đổi đáng chú ý hơn nằm ở môi trường chạy agent, cách cô lập quyền, cách review nhiều session và cách kiểm soát thay đổi trong repository. Vercel Sandbox, Copilot trong VS Code và stacked pull requests đều đang giải quyết các vấn đề xuất hiện khi một nhiệm vụ không còn được thực hiện bởi một Developer trong một branch duy nhất.

Một xu hướng khác là giảm những giả định ngầm trong CI/CD. Cú pháp `$/` của GitHub Actions giữ action nội bộ ở đúng commit của workflow, còn stacked pull requests ghi rõ quan hệ phụ thuộc giữa các pull request. Hai cập nhật này đều giúp pipeline và reviewer hiểu chính xác phiên bản nào đang được sử dụng, thay vì dựa vào checkout, branch động hoặc quy trình thủ công.

Ở tầng nền tảng, Cloudflare đang sử dụng chính Developer Platform để chạy cdnjs với lưu lượng lớn, trong khi Vercel chuẩn bị cho phép truyền `Server-Timing` xuyên qua CDN. Đây là những cập nhật ít gây chú ý hơn một model mới, nhưng ảnh hưởng trực tiếp đến cách Developer xây dựng, quan sát và tối ưu ứng dụng production.

* * *

## 📰 Tin nổi bật

### 🤖 AI & AI Coding

#### OpenAI giảm giá GPT-5.6 Luna và Terra

##### 🚀 Chuyện gì xảy ra?

Ngày 30/07, OpenAI công bố cập nhật về hiệu quả chi phí của dòng GPT-5.6. Giá GPT-5.6 Luna được giảm 80%, còn GPT-5.6 Terra giảm 20% cho cả context ngắn và context dài.

OpenAI cũng đưa Fast mode vào API để thay thế Priority Processing. Với GPT-5.6 Sol, Fast mode có thể cung cấp tốc độ cao hơn tới 2,5 lần so với Standard processing với mức giá gấp đôi. Những request đang sử dụng tùy chọn priority sẽ được chuyển sang Fast mode để giữ khả năng tương thích.

##### 🎯 Vì sao đáng quan tâm?

Giảm giá model nhỏ và trung bình có thể tác động lớn hơn việc tăng benchmark của model mạnh nhất. Background agent, phân loại dữ liệu, chuẩn hóa nội dung và xử lý hàng loạt thường tạo ra hàng triệu request, nên chênh lệch chi phí nhỏ trên từng tác vụ sẽ cộng dồn rất nhanh.

Fast mode cũng làm rõ hơn sự đánh đổi giữa latency và giá. Không phải mọi request đều cần tốc độ tối đa; một tác vụ chạy nền thường phù hợp với Standard hơn, trong khi autocomplete hoặc voice agent có thể hưởng lợi trực tiếp từ Fast mode.

##### 💡 Developer nên làm gì?

Phân loại workload thành interactive và background thay vì chọn một model cùng processing mode cho mọi request. Đo chi phí trên tác vụ thành công, latency ở p95 và tỷ lệ retry trước khi thay đổi model mặc định.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [OpenAI — Advancing the price-performance frontier with GPT-5.6](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)

* * *

#### Inkling Small xuất hiện trên Vercel AI Gateway

##### 🚀 Chuyện gì xảy ra?

Vercel bổ sung Inkling Small của Thinking Machines vào AI Gateway. Model được định vị là một generalist nhỏ hơn Inkling đầy đủ, nhưng vẫn hướng đến reasoning, agentic coding, tool use và xử lý đầu vào hình ảnh hoặc âm thanh.

Inkling Small hỗ trợ điều chỉnh thinking effort để cân bằng chất lượng, chi phí và latency. Với tác vụ thị giác, model có thể crop, zoom và kiểm tra từng khu vực hình ảnh bằng công cụ thay vì chỉ phân tích toàn bộ ảnh trong một lượt.

Model có thể được gọi qua định danh `thinkingmachines/inkling-small` và tương thích với tùy chọn Zero Data Retention của AI Gateway.

##### 🎯 Vì sao đáng quan tâm?

Model nhỏ ngày càng phù hợp với vai trò worker trong agent workflow. Một hệ thống không nhất thiết phải dùng model lớn cho từng bước đọc file, trích thông tin, kiểm tra ảnh hoặc gọi tool.

Khả năng điều chỉnh reasoning effort giúp cùng một model phục vụ nhiều loại nhiệm vụ. Tuy nhiên, Developer vẫn cần kiểm thử theo workload cụ thể thay vì dựa vào mô tả “tương đương model lớn hơn”.

##### 💡 Developer nên làm gì?

Thử Inkling Small trên tác vụ có đáp án kiểm chứng được như trích dữ liệu từ biểu đồ, phân loại issue hoặc sửa lỗi nhỏ. So sánh cost, latency và tỷ lệ phải chuyển tiếp sang model lớn hơn.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Vercel — Inkling Small is now available on AI Gateway](https://vercel.com/changelog/inkling-small-now-available-on-ai-gateway)

* * *

### ☁️ Cloud & DevOps

#### Vercel Sandbox cho phép nhiều agent chạy cô lập trong cùng môi trường

##### 🚀 Chuyện gì xảy ra?

Vercel cập nhật `@vercel/sandbox` SDK với khả năng tạo nhiều Linux user và group trong cùng một Sandbox. Mỗi agent có thể chạy dưới một user riêng, có home directory riêng và không được đọc, ghi hoặc liệt kê file của user khác.

Khi cần phối hợp, ứng dụng có thể tạo một group và shared directory, sau đó thêm các agent liên quan vào group. Ví dụ, coding agent và review agent có thể giữ workspace riêng nhưng chia sẻ artifact cuối cùng qua một thư mục chung.

##### 🎯 Vì sao đáng quan tâm?

Multi-agent workflow thường được mô tả ở tầng prompt, nhưng isolation thực tế lại nằm ở hệ điều hành và filesystem. Nếu mọi agent cùng chạy dưới một user, một agent có thể vô tình sửa hoặc đọc trạng thái của agent khác.

Mô hình Linux user quen thuộc, dễ kiểm tra và ít phụ thuộc vào việc model có tuân thủ prompt hay không. Tuy vậy, các agent vẫn chia sẻ cùng kernel và sandbox lifecycle, nên đây không phải mức cô lập tương đương nhiều máy ảo độc lập.

##### 💡 Developer nên làm gì?

Tách coder, reviewer và test runner thành các user riêng. Chỉ tạo shared directory cho artifact cần cộng tác và tránh đặt secret dùng chung trong thư mục mà mọi agent đều có thể đọc.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Vercel — Run multiple isolated agents in a single Sandbox](https://vercel.com/changelog/run-multiple-isolated-agents-in-a-single-sandbox)

* * *

#### Cloudflare chuyển toàn bộ cdnjs lên Developer Platform

##### 🚀 Chuyện gì xảy ra?

Cloudflare công bố chi tiết quá trình chuyển cdnjs sang vận hành hoàn toàn trên Cloudflare Developer Platform. Việc chuyển đổi thực tế hoàn tất từ ngày 23/06, còn bài engineering blog được phát hành ngày 30/07.

Theo Cloudflare, cdnjs phục vụ trung bình khoảng 108.000 request mỗi giây, tương đương khoảng 9 tỷ request mỗi ngày, với cache hit rate khoảng 98,6%. Hệ thống mới sử dụng nhiều thành phần gồm Workers, Workflows, D1, Queues, Workers Cache, R2, KV và Containers.

##### 🎯 Vì sao đáng quan tâm?

Đây là một case study đáng giá vì cdnjs không phải workload demo. Nó là hạ tầng công khai được nhúng trong lượng lớn website, tutorial và CodePen, nên mọi thay đổi đều phải giữ compatibility cùng độ ổn định cao.

Quá trình migration cũng buộc Cloudflare phát hiện và cải thiện giới hạn của chính nền tảng. Với Developer, bài học quan trọng là một kiến trúc serverless lớn hiếm khi chỉ sử dụng một sản phẩm; nó là sự kết hợp giữa compute, storage, queue, database và cache.

##### 💡 Developer nên làm gì?

Đọc kiến trúc migration để tham khảo cách tách metadata, artifact, queue và request serving. Không sao chép nguyên kiến trúc cdnjs nếu workload của dự án không có cùng quy mô hoặc access pattern.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Cloudflare — Migrating cdnjs to Cloudflare’s Developer Platform](https://blog.cloudflare.com/cdnjs-dev-platform-migration/)

* * *

#### Vercel chuẩn bị chuyển tiếp `Server-Timing` đến trình duyệt

##### 🚀 Chuyện gì xảy ra?

Vercel thông báo từ ngày 10/08/2026, CDN của nền tảng sẽ ngừng xóa response header `Server-Timing` và bắt đầu chuyển header này đến client.

Ứng dụng có thể sử dụng `Server-Timing` để công bố các metric backend như thời gian query database, cache hit hoặc thời gian xử lý một service. Các giá trị sẽ xuất hiện trong Network panel của trình duyệt và trong `PerformanceServerTiming` qua Performance API.

Developer không muốn công khai dữ liệu timing vẫn có thể thêm transform trong `vercel.json` để xóa header trước khi response được gửi đến client.

##### 🎯 Vì sao đáng quan tâm?

Frontend monitoring thường chỉ nhìn thấy tổng thời gian request. `Server-Timing` giúp Developer phân biệt request chậm vì database, cache, API nội bộ hay application code mà không cần mở hệ thống tracing riêng cho từng lần debug.

Mặt khác, tên metric và mô tả có thể vô tình tiết lộ kiến trúc backend. Đây là lý do cần kiểm tra header trước khi thay đổi có hiệu lực.

##### 💡 Developer nên làm gì?

Rà soát ứng dụng đang trả `Server-Timing` trước ngày 10/08. Giữ metric hữu ích như `db`, `cache` hoặc `app`, nhưng loại bỏ hostname, tên service nội bộ và thông tin có thể hỗ trợ reconnaissance.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Vercel — Server-Timing response headers will pass through](https://vercel.com/changelog/server-timing-header)

* * *

### 💻 GitHub & Open Source

#### GitHub Models chính thức ngừng hoạt động

##### 🚀 Chuyện gì xảy ra?

Ngày 30/07, GitHub hoàn tất quá trình retirement của GitHub Models. Playground, model catalog, inference API và BYOK endpoint không còn khả dụng với bất kỳ khách hàng nào, kể cả tài khoản đã có hoạt động trước đó.

GitHub khuyến nghị Microsoft Foundry cho dự án cần truy cập model catalog và sử dụng GitHub Copilot cho workflow AI nằm trực tiếp trong nền tảng GitHub.

##### 🎯 Vì sao đáng quan tâm?

Những dự án dùng GitHub Models API không chỉ mất giao diện thử nghiệm mà còn mất endpoint production. Đây là thay đổi có thể làm hỏng application, notebook hoặc CI nếu migration chưa được thực hiện.

Việc retirement cũng cho thấy model gateway là một lớp dependency cần được quản lý giống database hoặc payment provider. Một API tiện lợi không bảo đảm tồn tại lâu dài.

##### 💡 Developer nên làm gì?

Tìm kiếm endpoint GitHub Models trong source code, environment variable, GitHub Actions và tài liệu nội bộ. Chuyển workload sang provider mới, chạy compatibility test và xóa credential không còn sử dụng.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [GitHub — GitHub Models is now retired](https://github.blog/changelog/2026-07-30-github-models-is-now-retired/)

* * *

#### Stacked pull requests bước vào Public Preview

##### 🚀 Chuyện gì xảy ra?

GitHub đưa stacked pull requests vào Public Preview. Developer có thể chia một thay đổi lớn thành chuỗi pull request nhỏ, trong đó mỗi pull request phụ thuộc vào lớp trước đó.

Stack có thể được tạo và quản lý từ CLI extension hoặc GitHub.com. Reviewer xem từng lớp độc lập, trong khi GitHub hiển thị quan hệ giữa các pull request và hỗ trợ merge toàn bộ stack theo đúng thứ tự.

##### 🎯 Vì sao đáng quan tâm?

Pull request quá lớn khó review, còn nhiều pull request phụ thuộc nhau trước đây thường được quản lý bằng tên branch, mô tả thủ công hoặc convention riêng của đội.

Stacked PR giúp giữ từng diff nhỏ nhưng vẫn thể hiện toàn bộ chuỗi thay đổi. Rủi ro là review ở lớp sau có thể trở nên khó hiểu nếu reviewer chưa nắm lớp trước hoặc base branch thay đổi liên tục.

##### 💡 Developer nên làm gì?

Thử stacked PR với một refactor có thể chia theo tầng: chuẩn bị interface, chuyển implementation, sau đó xóa code cũ. Mỗi lớp vẫn phải chạy test độc lập và có mục đích rõ ràng.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub — Stacked pull requests are now in public preview](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/)

* * *

#### GitHub Actions có cú pháp `$/` cho action cùng repository

##### 🚀 Chuyện gì xảy ra?

GitHub Actions bổ sung cú pháp self-repository mới. Giá trị `uses:` bắt đầu bằng `$/` sẽ tham chiếu action hoặc reusable workflow trong cùng repository tại đúng commit đang chạy.

Cú pháp hoạt động ở các vị trí trước đây hỗ trợ `./`, bao gồm workflow step, composite action, nested composition và reusable workflow call. Không cần checkout repository chỉ để sử dụng action nội bộ.

Tính năng yêu cầu Actions runner phiên bản 2.336.0 trở lên.

##### 🎯 Vì sao đáng quan tâm?

Cú pháp `./` phụ thuộc vào workspace đã checkout, còn hardcode branch hoặc tag có thể làm action nội bộ chạy khác phiên bản với workflow gọi nó.

`$/` giữ mọi thành phần ở cùng commit và tương thích với policy bắt buộc pin action bằng full-length commit SHA. Điều này giảm cả maintenance burden lẫn rủi ro supply chain.

##### 💡 Developer nên làm gì?

Chuyển các action nội bộ từ `./` hoặc tham chiếu branch sang `$/` khi runner đã đủ mới. Kiểm tra self-hosted runner trước vì runner cũ sẽ không hiểu cú pháp này.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub — Reference same-repository actions with self-repository syntax](https://github.blog/changelog/2026-07-30-reference-same-repository-actions-with-self-repository-syntax/)

* * *

#### GitHub giới hạn remote control của Copilot theo thiết bị quản lý

##### 🚀 Chuyện gì xảy ra?

GitHub cho phép enterprise và organization giới hạn thiết bị nào được quyền host phiên Copilot remote control. Quản trị viên có thể chỉ cho phép thiết bị được tổ chức quản lý thay vì mọi máy đã đăng nhập tài khoản GitHub.

Tính năng nhắm đến các workflow trong đó người dùng điều khiển một phiên Copilot đang chạy trên máy khác hoặc tiếp tục công việc từ một thiết bị từ xa.

##### 🎯 Vì sao đáng quan tâm?

Remote control có thể mở đường truy cập đến source code, terminal và credential trên máy host. Xác thực tài khoản người dùng là chưa đủ nếu thiết bị điều khiển không tuân thủ chính sách của doanh nghiệp.

Giới hạn theo managed device giúp kết hợp Copilot với device trust hiện có. Tuy nhiên, đội IT vẫn cần quản lý trạng thái thiết bị và quy trình thu hồi khi máy bị mất hoặc nhân viên rời tổ chức.

##### 💡 Developer nên làm gì?

Enterprise nên bật giới hạn managed device trước khi triển khai remote control rộng rãi. Kiểm tra session log, thời gian hết hạn và khả năng thu hồi quyền từ hệ thống quản lý thiết bị.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [GitHub — Limit remote control to managed devices](https://github.blog/changelog/2026-07-30-limit-remote-control-to-managed-devices/)

* * *

### 🌐 Browser Extensions & Web Platform

#### Chrome 152 bước vào Beta trên desktop và iOS

##### 🚀 Chuyện gì xảy ra?

Google đưa Chrome 152 lên Beta channel cho Windows, macOS và Linux trong ngày 30/07. Chrome Beta 152 phiên bản `152.0.7977.11` cũng bắt đầu được đưa lên App Store cho iOS.

Beta channel là giai đoạn để Developer kiểm tra thay đổi web platform trước khi phiên bản được đẩy sang Stable. Trong cùng ngày, Chrome Dev 153 phiên bản `153.0.7978.2` cũng được phát hành cho Android.

##### 🎯 Vì sao đáng quan tâm?

Chu kỳ Chrome nhanh khiến thời gian phát hiện regression trước Stable khá ngắn. Extension và web app chỉ kiểm thử trên Stable thường biết đến thay đổi khi phần lớn người dùng đã cập nhật.

Chrome trên iOS có engine và giới hạn nền tảng khác desktop, vì vậy không nên xem kết quả test trên Windows hoặc macOS là đại diện cho iPhone.

##### 💡 Developer nên làm gì?

Thêm Chrome Beta vào CI hoặc smoke-test định kỳ. Kiểm tra authentication, service worker, storage, extension messaging, responsive viewport và các API thử nghiệm đang sử dụng.

**Mức độ quan trọng:** ⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Chrome Releases — Chrome Beta for Desktop](https://chromereleases.googleblog.com/2026/07/chrome-beta-for-desktop-update_01933553911.html)

* * *

#### ChromeOS LTC được cập nhật lên phiên bản 150

##### 🚀 Chuyện gì xảy ra?

Google phát hành ChromeOS LTC phiên bản `150.0.7871.213`, platform version `16700.60.0`, cho phần lớn thiết bị đang sử dụng Long-term Support Candidate channel.

Kênh LTS chính vẫn ở LTS-144 đến ngày 06/10/2026. LTC cho phép doanh nghiệp kiểm tra phiên bản tương lai trước khi nó trở thành baseline LTS mới.

##### 🎯 Vì sao đáng quan tâm?

Doanh nghiệp dùng ChromeOS thường có extension bắt buộc, kiosk app, certificate và policy phức tạp. Chờ đến lúc LTS chuyển phiên bản mới mới kiểm thử sẽ để lại rất ít thời gian xử lý.

LTC là môi trường phù hợp để phát hiện lỗi tương thích nhưng không nên được triển khai đồng loạt đến thiết bị production quan trọng.

##### 💡 Developer nên làm gì?

Chọn một nhóm thiết bị thử nghiệm chạy LTC-150 và kiểm tra extension, SSO, VPN, kiosk mode cùng thiết bị ngoại vi trước tháng 10.

**Mức độ quan trọng:** ⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Chrome Releases — ChromeOS Long Term Support Channel Update](https://chromereleases.googleblog.com/2026/07/long-term-support-channel-update-for_02055466180.html)

* * *

### 🚀 DevTools

#### Copilot trong VS Code cải thiện quản lý nhiều agent session

##### 🚀 Chuyện gì xảy ra?

GitHub tổng hợp các thay đổi Copilot trong VS Code từ phiên bản 1.127 đến 1.131. Agents window có bố cục mới, khả năng mở file và diff cạnh conversation, hiển thị số dòng thêm hoặc xóa và hỗ trợ chuyển đổi giữa inline diff với side-by-side diff.

Developer có thể khởi chạy Copilot, Claude hoặc Codex session trong Git worktree riêng, nhóm và sắp xếp session, đồng thời theo dõi model, thời gian chạy và tool call hiện tại của từng subagent.

VS Code cũng bổ sung quick chat không cần workspace, multi-chat session và các cải tiến về dictation cùng screen reader trong integrated terminal.

##### 🎯 Vì sao đáng quan tâm?

Khi nhiều agent làm việc trên cùng repository, vấn đề lớn nhất không chỉ là tạo code mà là tránh ghi đè trạng thái, hiểu agent nào đang làm gì và review kết quả theo từng nhánh.

Worktree là một cơ chế Git quen thuộc và có thể kiểm tra độc lập với model. Việc hiển thị tool call của subagent cũng giúp Developer phát hiện agent bị kẹt hoặc đang thực hiện hành động ngoài dự kiến.

##### 💡 Developer nên làm gì?

Dùng worktree cho các agent sửa code song song và yêu cầu mỗi session tạo commit riêng. Không cho nhiều agent ghi trực tiếp vào cùng working tree.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub — Copilot in Visual Studio Code, July 2026 releases](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases)

* * *

#### Visual Studio có agent mới và skill chính thức cho .NET, Azure

##### 🚀 Chuyện gì xảy ra?

GitHub cập nhật Copilot trong Visual Studio 2026 với một agent mới ở trạng thái Public Preview. Agent được xây trên cùng Copilot SDK đang cung cấp năng lực cho Copilot CLI.

Visual Studio cũng có built-in skills do đội .NET và Azure xây dựng. Các skill tắt mặc định để Developer xem xét rồi chủ động bật. Ngoài ra, người dùng có thể chọn một đoạn code, dùng `Copilot Actions > Review Selection` và nhận inline review comment.

Organization owner sử dụng Copilot Business hoặc Enterprise có thể áp dụng custom instruction ở cấp tổ chức.

##### 🎯 Vì sao đáng quan tâm?

Skill do đội framework xây dựng có khả năng chứa context sát hơn với convention chính thức so với instruction chung. Review Selection cũng phù hợp với trường hợp Developer chỉ cần kiểm tra một thuật toán hoặc đoạn code nhạy cảm mà không muốn agent đọc toàn project.

Tuy nhiên, skill vẫn là instruction cho model, không phải static analyzer. Kết quả cần được kiểm tra bằng compiler, test và công cụ chuyên dụng.

##### 💡 Developer nên làm gì?

Bật từng skill theo workload thay vì bật tất cả. Dùng review selection cho code liên quan concurrency, authentication hoặc resource lifecycle, sau đó xác nhận nhận xét bằng analyzer của .NET.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub — Copilot in Visual Studio, July update](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-july-update/)

* * *

#### `mcp-handler` 2.0 hỗ trợ đặc tả MCP mới

##### 🚀 Chuyện gì xảy ra?

Vercel phát hành `mcp-handler@2.0.0` với hỗ trợ đặc tả Model Context Protocol ngày 28/07/2026 và MCP TypeScript SDK v2.

Thư viện được thiết kế để giúp Developer xây MCP server trên các web framework phổ biến như Next.js, Nuxt và Svelte mà không phải tự triển khai toàn bộ transport cùng request handling.

##### 🎯 Vì sao đáng quan tâm?

MCP đang thay đổi nhanh, nên server phụ thuộc đặc tả cũ có thể gặp vấn đề khi client chuyển sang transport hoặc lifecycle mới. Việc thư viện trung gian cập nhật giúp giảm lượng protocol code mà application phải duy trì.

Nâng major version vẫn có thể chứa breaking change. Developer cần đọc migration guide và không nên cập nhật trực tiếp production chỉ vì đặc tả mới đã được công bố.

##### 💡 Developer nên làm gì?

Tạo branch nâng cấp riêng, chạy interoperability test với các MCP client đang hỗ trợ và kiểm tra lại authentication, session lifecycle cùng streaming behavior.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Vercel — Latest MCP spec supported in mcp-handler](https://vercel.com/changelog/latest-mcp-spec-now-supported-in-mcp-handler)

* * *

## 🔥 Top 5 đáng chú ý nhất hôm nay

| Chủ đề | Lý do đáng chú ý |
| --- | --- |
| GitHub Models ngừng hoạt động | Có thể làm hỏng trực tiếp ứng dụng hoặc CI vẫn gọi inference API cũ và yêu cầu migration ngay. |
| Stacked pull requests | Giúp chia thay đổi lớn thành các lớp nhỏ hơn nhưng vẫn giữ quan hệ phụ thuộc và thứ tự merge rõ ràng. |
| Vercel Sandbox multi-user | Đưa isolation của multi-agent xuống tầng Linux user thay vì chỉ dựa vào prompt hoặc convention. |
| Cú pháp `$/` trong GitHub Actions | Giữ action nội bộ ở cùng commit với workflow và hỗ trợ policy pin full SHA tốt hơn. |
| cdnjs trên Cloudflare Developer Platform | Cung cấp case study thực tế về vận hành serverless ở quy mô hàng tỷ request mỗi ngày. |

* * *

## 🛠 Công cụ đáng thử hôm nay

### Vercel Sandbox

*   **Dùng để làm gì:** Chạy code và AI agent trong môi trường Linux cô lập.
    
*   **Điểm nổi bật:** Hỗ trợ nhiều user, group, shared directory, snapshot và fork.
    
*   **Phù hợp với:** Coding agent, code runner và hệ thống kiểm thử nhiều tenant.
    
*   **Link:** [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox)
    

### mcp-handler

*   **Dùng để làm gì:** Xây MCP server trên Next.js, Nuxt, Svelte và web framework.
    
*   **Điểm nổi bật:** Hỗ trợ đặc tả MCP 28/07/2026 và TypeScript SDK v2.
    
*   **Phù hợp với:** TypeScript Developer xây tool hoặc data connector cho AI agent.
    
*   **Link:** [mcp-handler](https://github.com/vercel/mcp-handler)
    

### GitHub Stacked Pull Requests

*   **Dùng để làm gì:** Chia một thay đổi lớn thành chuỗi pull request phụ thuộc nhau.
    
*   **Điểm nổi bật:** Review từng lớp và merge stack theo thứ tự.
    
*   **Phù hợp với:** Đội xử lý refactor, migration hoặc feature có nhiều bước.
    
*   **Link:** [GitHub Changelog](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/)
    

### Server Timing API

*   **Dùng để làm gì:** Đưa metric backend đến browser DevTools và Performance API.
    
*   **Điểm nổi bật:** Cho phép phân biệt database, cache và application timing trên từng request.
    
*   **Phù hợp với:** Full-stack Developer và đội performance.
    
*   **Link:** [MDN — Server-Timing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing)
    

### Cloudflare Developer Platform

*   **Dùng để làm gì:** Xây hệ thống edge bằng Workers, R2, Queues, D1, KV và Containers.
    
*   **Điểm nổi bật:** Đang vận hành toàn bộ cdnjs với lưu lượng lớn.
    
*   **Phù hợp với:** Developer xây API, CDN, workflow và ứng dụng global.
    
*   **Link:** [Cloudflare Developers](https://developers.cloudflare.com/)
    

* * *

## 📚 Bài viết nên đọc

### Advancing the price-performance frontier with GPT-5.6

OpenAI giải thích thay đổi giá, Fast mode và cách lựa chọn mức intelligence phù hợp với kết quả cần đạt. Bài viết hữu ích với đội đang tối ưu chi phí agent dựa trên cost per successful task.

**Đọc bài:** [OpenAI](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)

### Migrating cdnjs to Cloudflare’s Developer Platform

Bài engineering blog trình bày kiến trúc phục vụ khoảng 9 tỷ request mỗi ngày và các giới hạn nền tảng được phát hiện trong quá trình migration. Developer sẽ nhận được một case study thực tế về cache, queue, object storage và edge compute.

**Đọc bài:** [Cloudflare](https://blog.cloudflare.com/cdnjs-dev-platform-migration/)

### Stacked pull requests are now in public preview

GitHub giải thích cách tạo stack, review từng lớp và merge toàn bộ chuỗi thay đổi. Bài viết phù hợp với đội thường xuyên gặp pull request quá lớn hoặc nhiều branch phụ thuộc nhau.

**Đọc bài:** [GitHub](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/)

### Copilot in Visual Studio Code, July 2026 releases

Bài tổng hợp mô tả Agents window, worktree, multi-chat, subagent tracking và accessibility. Đây là tài liệu nên đọc với Developer đang chạy nhiều coding agent song song trong cùng repository.

**Đọc bài:** [GitHub](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases)

### Reference same-repository actions with self-repository syntax

Changelog giải thích cú pháp `$/`, yêu cầu runner và lợi ích khi pin action bằng commit SHA. Nội dung có thể áp dụng trực tiếp cho repository đang duy trì custom action nội bộ.

**Đọc bài:** [GitHub](https://github.blog/changelog/2026-07-30-reference-same-repository-actions-with-self-repository-syntax/)

* * *

## 🚀 GitHub Repository nổi bật

#### vercel/mcp-handler

*   **Language:** TypeScript
    
*   **Use case:** Xây MCP server trên các web framework phổ biến
    
*   **Điểm nổi bật:** Hỗ trợ MCP TypeScript SDK v2 và đặc tả mới
    
*   **GitHub:** [vercel/mcp-handler](https://github.com/vercel/mcp-handler)
    

#### cdnjs/cdnjs

*   **Language:** JavaScript và automation configuration
    
*   **Use case:** Quản lý thư viện được phân phối qua cdnjs
    
*   **Điểm nổi bật:** Hạ tầng open source phục vụ JavaScript và CSS library trên quy mô lớn
    
*   **GitHub:** [cdnjs/cdnjs](https://github.com/cdnjs/cdnjs)
    

#### modelcontextprotocol/typescript-sdk

*   **Language:** TypeScript
    
*   **Use case:** Xây MCP client và server bằng TypeScript
    
*   **Điểm nổi bật:** Reference SDK cho đặc tả Model Context Protocol
    
*   **GitHub:** [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)
    

#### vercel/ai

*   **Language:** TypeScript
    
*   **Use case:** Xây ứng dụng AI và agent trên web
    
*   **Điểm nổi bật:** Hỗ trợ nhiều model provider, streaming và tool calling
    
*   **GitHub:** [vercel/ai](https://github.com/vercel/ai)
    

* * *

## 💬 Góc nhìn của mình

Tin mình đánh giá cao nhất hôm nay là cú pháp `$/` trong GitHub Actions. Nó nhỏ hơn nhiều so với một model mới, nhưng giải quyết đúng một vấn đề tồn tại lâu: workflow và action nội bộ có thể không chạy cùng phiên bản nếu repository phải checkout hoặc tham chiếu branch riêng.

Stacked pull requests cũng là một thay đổi thực tế. Nhiều pull request lớn không xuất phát từ việc Developer thích tạo diff hàng nghìn dòng, mà vì GitHub trước đây chưa thể hiện tốt quan hệ giữa các lớp thay đổi. Khi dependency được nền tảng hiểu trực tiếp, việc chia nhỏ sẽ bớt tốn công quản lý hơn.

Ở phía AI, việc GPT-5.6 Luna giảm giá mạnh nhắc lại rằng model lớn nhất không nên là lựa chọn mặc định cho mọi thứ. Một agent workflow tốt cần routing: model nhỏ xử lý bước thường xuyên, model lớn chỉ được gọi khi confidence thấp hoặc nhiệm vụ có rủi ro cao.

Vercel Sandbox multi-user là nền tảng kỹ thuật phù hợp với hướng này. Coder và reviewer không nên cùng chạy dưới một identity rồi chỉ được nhắc bằng prompt rằng “không được sửa file của nhau”. Isolation nên được áp dụng bằng permission mà hệ điều hành thực thi.

Tuy nhiên, nhiều Linux user trong một sandbox không giải quyết mọi rủi ro. Các agent vẫn có thể dùng chung network, process resource hoặc secret nếu cấu hình không cẩn thận. Đây là một primitive hữu ích, không phải giải pháp bảo mật hoàn chỉnh.

Case study cdnjs cũng đáng đọc vì nó cho thấy serverless ở quy mô lớn không đơn giản là viết một Worker. Hệ thống cần storage, queue, metadata database, cache và workflow orchestration. Từ “serverless” mô tả cách vận hành tài nguyên, không có nghĩa kiến trúc biến mất.

Việc GitHub Models đóng cửa là lời nhắc khá rõ về platform dependency. Khi dùng một model gateway, đội phát triển nên giữ abstraction đủ mỏng để đổi endpoint, model identifier và authentication mà không phải sửa toàn bộ business logic.

Cuối cùng, mình thích thay đổi `Server-Timing` của Vercel vì nó đưa backend performance đến gần Developer hơn. Nhưng mọi observability feature cũng có thể trở thành information disclosure nếu metric chứa tên service hoặc cấu trúc nội bộ. Quan sát tốt luôn cần đi cùng kiểm soát dữ liệu.

* * *

## 📝 Kết luận

Daily Tech Brief ngày 31/07 cho thấy hạ tầng dành cho AI agent và quy trình phát triển đang trưởng thành nhanh: agent có user riêng, session có worktree riêng, thay đổi lớn có stack riêng và action nội bộ được khóa theo đúng commit đang chạy.

Hành động thực tế hôm nay là kiểm tra xem dự án còn dùng GitHub Models hay không, nâng self-hosted Actions runner trước khi áp dụng cú pháp `$/` và tách agent song song sang workspace độc lập. Những thay đổi này không làm demo trông ấn tượng hơn, nhưng giúp workflow đáng tin cậy hơn khi được đưa vào production.