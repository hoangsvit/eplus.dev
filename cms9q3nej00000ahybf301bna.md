---
title: "Daily Tech Brief — 01/08/2026"
seoTitle: "Daily Tech Brief — 01/08/2026"
seoDescription: "Tin công nghệ 01/08/2026: GitHub quản trị model theo team, npm siết token bypass-2FA, Vercel thêm AI budget và Passport đạt GA"
datePublished: 2026-08-01T01:59:11.460Z
cuid: cms9q3nej00000ahybf301bna
slug: daily-tech-brief-01-08-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/431657b3-d2d8-488c-8e87-8eaa0e30e5ab.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/04d04b72-ec04-4fd3-a5ef-706a3519818f.png
tags: daily-tech-brief, daily-tech-brief-01-08-2026

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source và những công nghệ đáng chú ý trong ngày.

* * *

## 📌 Executive Summary

*   GitHub thử nghiệm policy theo enterprise team, cho phép cấp thêm model Copilot dựa trên vai trò thay vì chỉ dựa vào organization.
    
*   Gemini 2.5 Pro và Gemini 3 Flash đã bị loại khỏi toàn bộ trải nghiệm GitHub Copilot, buộc workflow phải chuyển sang model thay thế.
    
*   npm chặn token bypass-2FA thực hiện các thao tác quản trị nhạy cảm và chuẩn bị loại bỏ quyền publish trực tiếp vào tháng 01/2027.
    
*   Vercel AI Gateway hỗ trợ ngân sách theo team, project và API key, đồng thời tự chặn request khi bất kỳ giới hạn liên quan nào bị vượt.
    
*   Vercel Passport đạt General Availability, hỗ trợ bảo vệ deployment bằng Okta, Microsoft Entra ID hoặc nhà cung cấp OIDC.
    
*   Vercel MCP cập nhật đặc tả ngày 28/07/2026 với protocol core stateless và cơ chế authorization được gia cố.
    
*   AI Gateway có trang log riêng để theo dõi chi phí, token, thời lượng và đường fallback của từng request.
    
*   Vercel Observability bổ sung structured search cho workflow run theo environment, region, deployment và custom attribute.
    
*   OpenAI bổ sung SynthID watermarking cho audio được tạo bằng GPT-Live qua ChatGPT Voice và API.
    
*   Google Cloud nhấn mạnh AI Threat Defense cần trở thành một năng lực quản trị và phòng thủ liên tục, không chỉ là tập hợp công cụ bảo mật rời rạc.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Bức tranh công nghệ sáng 01/08 tập trung rõ vào ba vấn đề: **quản trị model AI, kiểm soát chi phí inference và bảo vệ chuỗi cung ứng phần mềm**. GitHub đang chuyển quyền truy cập model từ policy gắn với tài nguyên sang policy gần với con người và vai trò hơn. Cùng lúc đó, việc loại bỏ hai model Gemini khỏi Copilot nhắc lại rằng model catalog là một dependency có vòng đời và cần được quản lý như runtime hoặc API bên ngoài.

Ở phía vận hành AI, Vercel đưa budget, request log và hardened authorization đến gần workflow production hơn. Đây là những thành phần ít hấp dẫn trong demo nhưng quyết định một hệ thống có thể chạy lâu dài hay không: ai được sử dụng model nào, mỗi project được tiêu bao nhiêu, request đã fallback qua đâu và truy cập MCP được xác thực thế nào.

npm tiếp tục thu hẹp quyền của token có khả năng bỏ qua 2FA. Thay đổi này có thể làm một số automation cũ bất tiện hơn, nhưng nó loại bỏ khả năng một token bị rò rỉ tự mở rộng quyền, thêm maintainer hoặc thay đổi cấu hình publish. Supply-chain security đang chuyển dần từ cảnh báo sang cưỡng chế ở tầng nền tảng.

* * *

## 📰 Tin nổi bật

### 🤖 AI & AI Coding

#### GitHub thử nghiệm cấp quyền model Copilot theo enterprise team

##### 🚀 Chuyện gì xảy ra?

GitHub đưa **enterprise teams model policy targeting** vào Public Preview cho khách hàng GitHub Enterprise dùng Copilot Business hoặc Copilot Enterprise.

Quản trị viên có thể đặt một tập model nền cho toàn enterprise, sau đó cấp thêm các model được đánh dấu `Optional` cho từng enterprise team. Cách tiếp cận này phù hợp với việc phân quyền theo vai trò, cấp độ đào tạo hoặc nhóm thử nghiệm thay vì phải bật model cho toàn bộ organization.

Policy sử dụng chiến lược least-restrictive: nếu một người dùng được cấp model từ bất kỳ enterprise team nào, họ có quyền dùng model đó. Khi Enterprise teams mode được bật, model settings ở cấp organization không còn được áp dụng. GitHub dự kiến phần lớn enterprise có thể opt in từ ngày 03/08. [oai\_citation:0‡The GitHub Blog](https://github.blog/changelog/2026-07-31-enterprise-teams-model-policy-targeting-in-public-preview/?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Doanh nghiệp thường cần cho nhóm AI platform hoặc nhóm thử nghiệm dùng model mới trước phần còn lại của công ty. Policy theo team phù hợp với cách nhân sự thực sự làm việc hơn policy chỉ gắn với repository hoặc organization.

Tuy nhiên, chiến lược least-restrictive đòi hỏi việc quản lý membership rất cẩn thận. Một người thuộc nhiều team có thể nhận quyền rộng hơn dự kiến chỉ vì một trong các team được cấp model thử nghiệm.

##### 💡 Developer nên làm gì?

Trước khi bật preview, hãy lập bảng `team → model → mục đích → ngày review`. Kiểm tra người dùng thuộc nhiều team và đặt quy trình tự động thu hồi membership khi vai trò thay đổi.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub Changelog](https://github.blog/changelog/2026-07-31-enterprise-teams-model-policy-targeting-in-public-preview/)

* * *

#### Gemini 2.5 Pro và Gemini 3 Flash bị loại khỏi GitHub Copilot

##### 🚀 Chuyện gì xảy ra?

Từ ngày 31/07, GitHub đã deprecated Gemini 2.5 Pro và Gemini 3 Flash trên toàn bộ trải nghiệm Copilot, gồm Copilot Chat, inline edit, ask mode, agent mode và code completion.

GitHub đề xuất Gemini 3.1 Pro Preview thay cho Gemini 2.5 Pro và Gemini 3.6 Flash thay cho Gemini 3 Flash. Quản trị viên Copilot Enterprise có thể cần bật policy cho model thay thế trước khi người dùng nhìn thấy chúng trong model selector. [oai\_citation:1‡The GitHub Blog](https://github.blog/changelog/2026-07-31-gemini-2-5-pro-and-gemini-3-flash-deprecated/?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Workflow AI có thể phụ thuộc vào model identifier ngay cả khi người dùng không chọn model thủ công. Agent configuration, benchmark nội bộ, tài liệu hướng dẫn và policy enterprise đều có thể trở nên lỗi thời cùng lúc.

Model thay thế cũng không nhất thiết có cùng latency, giá, context window hoặc hành vi tool calling. Việc đổi tên trong config mà không regression test có thể tạo ra thay đổi khó nhận thấy trong chất lượng pull request hoặc code review.

##### 💡 Developer nên làm gì?

Tìm kiếm hai model identifier cũ trong policy, IDE settings, agent config và tài liệu nội bộ. Chạy lại bộ prompt hoặc issue benchmark trước khi đặt model mới làm mặc định.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub Changelog](https://github.blog/changelog/2026-07-31-gemini-2-5-pro-and-gemini-3-flash-deprecated/)

* * *

#### GPT-Live bổ sung watermark SynthID cho audio được tạo

##### 🚀 Chuyện gì xảy ra?

OpenAI cập nhật thông báo GPT-Live vào ngày 31/07, cho biết audio được hỗ trợ tạo bằng GPT-Live qua ChatGPT Voice và OpenAI API hiện có SynthID watermarking. [oai\_citation:2‡OpenAI](https://openai.com/index/introducing-gpt-live/?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Voice agent ngày càng được sử dụng trong hỗ trợ khách hàng, nội dung và giao diện hội thoại thời gian thực. Khi chất lượng âm thanh tổng hợp tiến gần giọng nói tự nhiên, provenance trở thành một thành phần quan trọng của hệ thống.

Watermark không thay thế disclosure trong giao diện và cũng không giải quyết mọi hình thức biến đổi audio. Tuy nhiên, đây là thêm một tín hiệu kỹ thuật hỗ trợ nhận biết nội dung tổng hợp.

##### 💡 Developer nên làm gì?

Ứng dụng tạo voice nên vẫn thông báo rõ cho người nghe rằng họ đang tương tác với AI. Lưu metadata về model, thời gian tạo và session ID bên cạnh audio thay vì chỉ dựa vào watermark.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [OpenAI — Introducing GPT-Live](https://openai.com/index/introducing-gpt-live/)

* * *

### ☁️ Cloud & DevOps

#### Vercel AI Gateway hỗ trợ ngân sách theo team và project

##### 🚀 Chuyện gì xảy ra?

Vercel AI Gateway cho phép đặt spend budget ở ba cấp: team, project và API key. Một request có thể đồng thời chịu nhiều budget và phải vượt qua tất cả; nếu bất kỳ budget nào đã chạm giới hạn, request bị từ chối.

Budget có thể reset theo ngày, tuần, tháng hoặc là giới hạn tích lũy. Hệ thống hỗ trợ cảnh báo email khi mức sử dụng đạt 50%, 75% và 100%, đồng thời cho phép đặt default budget cho project hoặc API key chưa có cấu hình riêng. BYOK spend không được tính mặc định. [oai\_citation:3‡Vercel](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Một API key budget không đủ khi nhiều key cùng thuộc một project hoặc khi một team vận hành nhiều ứng dụng. Budget theo scope giúp đặt trần ở cấp business unit hoặc sản phẩm mà không phụ thuộc cách key được chia nhỏ.

Cơ chế chặn cứng cũng có mặt trái: ứng dụng production có thể ngừng trả lời khi chạm giới hạn. Budget cần đi kèm degradation strategy, không chỉ email alert.

##### 💡 Developer nên làm gì?

Đặt budget ở cả team và project, nhưng cấu hình cảnh báo trước khi chạm trần. Xây fallback an toàn như chuyển model nhỏ hơn, tắt tác vụ nền hoặc trả thông báo thay vì để request thất bại không kiểm soát.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Vercel — AI Gateway spend budgets](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts)

* * *

#### AI Gateway có trang request log riêng

##### 🚀 Chuyện gì xảy ra?

Vercel bổ sung trang log dành riêng cho AI Gateway. Mỗi request có thể được kiểm tra theo chi phí, token đầu vào và đầu ra, thời lượng cùng đường fallback giữa các provider.

Trang changelog ngày 31/07 cũng cho biết các log có thể được lọc và chia sẻ thông qua URL, giúp các thành viên trong đội truy cập cùng một góc nhìn điều tra. [oai\_citation:4‡Vercel](https://vercel.com/changelog?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Khi dùng gateway đa provider, câu hỏi “request này do model nào thực sự xử lý?” không còn đơn giản. Fallback có thể thay đổi latency, chi phí và chất lượng mà application log thông thường không thể hiện đầy đủ.

Log tập trung giúp liên kết lỗi người dùng với model route cụ thể. Dù vậy, đội phát triển vẫn cần correlation ID giữa gateway, application trace và business event.

##### 💡 Developer nên làm gì?

Đưa request ID của gateway vào structured log của ứng dụng. Tạo dashboard theo cost per successful task thay vì chỉ tổng token hoặc tổng request.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Vercel Changelog](https://vercel.com/changelog)

* * *

#### Vercel Workflows có structured search trong Observability

##### 🚀 Chuyện gì xảy ra?

Danh sách Workflow run trong Vercel Observability hỗ trợ tìm kiếm có cấu trúc theo workflow, environment, deployment ID, region và custom run attribute. Developer cũng có thể dán trực tiếp run ID để mở đúng lần chạy.

Các bộ lọc được lưu trong URL nên có thể chia sẻ cho thành viên khác. Ví dụ, truy vấn có thể giới hạn một workflow tại preview environment và một region cụ thể. [oai\_citation:5‡Vercel](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Workflow bất đồng bộ thường khó debug vì log phân tán theo nhiều lần retry, môi trường và region. Structured search giúp thu hẹp không gian điều tra mà không phải nhớ chính xác run ID.

Custom attribute đặc biệt hữu ích nếu ứng dụng gắn tenant, order ID hoặc job type vào workflow run.

##### 💡 Developer nên làm gì?

Chuẩn hóa một tập custom attribute nhỏ như `tenant`, `job_type`, `source` và `correlation_id`. Tránh gắn dữ liệu nhạy cảm hoặc giá trị có cardinality quá cao không phục vụ điều tra.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Vercel — Expanded workflow search](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability)

* * *

#### Laguna S 2.1 được tăng gấp 10 lần capacity trên AI Gateway

##### 🚀 Chuyện gì xảy ra?

Vercel cho biết Laguna S 2.1 của Poolside có capacity cao hơn 10 lần trên AI Gateway, áp dụng cho cả phiên bản trả phí và miễn phí.

Thay đổi nhắm đến các workload agentic coding có lưu lượng cao và tác vụ chạy dài. [oai\_citation:6‡Vercel](https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Capacity limit có thể trở thành nút thắt với hệ thống agent dù model đạt chất lượng tốt. Việc tăng giới hạn giúp giảm rate-limit và retry, nhưng không tự động bảo đảm chi phí hoặc thời gian hoàn thành tốt hơn.

##### 💡 Developer nên làm gì?

Giảm retry cưỡng bức sau khi capacity tăng và đo lại throughput thật. Không tăng concurrency chỉ vì hạn mức cao hơn nếu downstream tool hoặc repository API vẫn có giới hạn thấp hơn.

**Mức độ quan trọng:** ⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Vercel — Laguna S 2.1 capacity](https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway)

* * *

### 💻 GitHub & Open Source

#### npm hạn chế token bypass-2FA thực hiện thao tác quản trị

##### 🚀 Chuyện gì xảy ra?

npm granular access token được cấu hình bypass 2FA không còn được dùng để tạo hoặc xóa token, thay đổi package access, thêm maintainer, chỉnh trusted publishing hay quản lý membership và package grant trong organization.

Các thao tác này giờ yêu cầu một phiên tương tác có 2FA. GitHub cho biết đến tháng 01/2027, token bypass-2FA cũng sẽ mất quyền publish trực tiếp; hướng migration được khuyến nghị là trusted publishing qua OIDC hoặc staged publishing. [oai\_citation:7‡The GitHub Blog](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Một token publish bị rò rỉ trước đây có thể được sử dụng để mở rộng quyền: tạo token mới, thêm maintainer hoặc thay đổi chính sách package. Việc tách publish automation khỏi account administration làm giảm đáng kể blast radius.

Thay đổi sắp tới có thể ảnh hưởng pipeline cũ dùng token dài hạn. Các dự án trì hoãn migration đến cuối năm sẽ có ít thời gian xử lý lỗi hơn.

##### 💡 Developer nên làm gì?

Kiểm kê token npm và loại bỏ token bypass-2FA khỏi tác vụ quản trị. Chuyển publish automation sang trusted publishing ngay trong quý này thay vì chờ đến tháng 01/2027.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [GitHub — Restricting npm bypass-2FA tokens](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/)

* * *

### 🚀 DevTools

#### Vercel MCP cập nhật đặc tả mới và hardened authorization

##### 🚀 Chuyện gì xảy ra?

Vercel MCP đã hỗ trợ đặc tả MCP ngày 28/07/2026. Bản cập nhật sử dụng stateless protocol core và cơ chế authorization được gia cố; các client hiện tại không cần thay đổi để tiếp tục kết nối. [oai\_citation:8‡Vercel](https://vercel.com/changelog?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

MCP server có thể đứng giữa agent và dữ liệu deployment, log hoặc project configuration. Vì vậy, lỗi session handling hoặc authorization có thể mở rộng thành quyền truy cập ngoài dự kiến.

Stateless core giúp giảm phụ thuộc vào session state phía server, nhưng authorization vẫn cần được thiết kế theo từng tool và từng tài nguyên.

##### 💡 Developer nên làm gì?

Kiểm tra token scope của MCP connection và danh sách tool thực sự cần thiết. Không xem việc client tương thích ngược là lý do bỏ qua regression test về authentication và permission.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 1 phút  
**Nguồn:** [Vercel Changelog](https://vercel.com/changelog)

* * *

### 🔒 Security

#### Vercel Passport đạt General Availability

##### 🚀 Chuyện gì xảy ra?

Vercel Passport đã đạt GA và cho phép bảo vệ deployment bằng Okta, Microsoft Entra ID hoặc bất kỳ OIDC provider tương thích nào.

Sau khi người dùng xác thực, Vercel chuyển một signed identity token đến deployment. Package `@vercel/passport` cung cấp `getIdentity()` để đọc danh tính và `verifyIdentity()` để kiểm tra token trong downstream service, gồm signature, project, owner và environment. Passport hiện khả dụng trên gói Enterprise. [oai\_citation:9‡Vercel](https://vercel.com/changelog/vercel-passport-generally-available?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

Preview deployment thường chứa tính năng chưa phát hành, dữ liệu giả lập hoặc giao diện quản trị. Password dùng chung khó thu hồi theo cá nhân và không phản ánh group membership của doanh nghiệp.

Passport đưa identity provider hiện có vào trước deployment và cho phép application code tiếp tục authorization dựa trên claim đã xác minh.

##### 💡 Developer nên làm gì?

Dùng Passport để xác thực, nhưng vẫn kiểm tra group hoặc role trong ứng dụng. Với downstream service, phải xác minh cả project và environment để tránh token từ preview được chấp nhận ở production.

**Mức độ quan trọng:** ⭐⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Vercel — Passport GA](https://vercel.com/changelog/vercel-passport-generally-available)

* * *

#### Google Cloud kêu gọi đưa AI Threat Defense vào năng lực quản trị cốt lõi

##### 🚀 Chuyện gì xảy ra?

Google Cloud công bố Cloud CISO Perspectives mới, cho rằng tổ chức cần chuyển từ bảo mật thủ công và phản ứng sang phòng thủ AI-native, liên tục và tự động.

Bài viết nhấn mạnh quản trị phải theo kịp tốc độ, phạm vi và quy mô của mối đe dọa có hỗ trợ AI, đồng thời kết hợp context nội bộ với nền tảng phòng thủ thống nhất. [oai\_citation:10‡Google Cloud](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-why-ai-threat-defense-is-the-new-boardroom-baseline?utm_source=chatgpt.com)

##### 🎯 Vì sao đáng quan tâm?

AI agent làm tăng số lượng hành động máy có thể thực hiện và số bề mặt cần giám sát. Một tập hợp công cụ rời rạc không đủ nếu alert, identity, data access và response workflow không được kết nối.

Tuy nhiên, “AI-powered defense” không nên trở thành lý do để tự động hóa hành động phá hủy mà không có approval hoặc rollback.

##### 💡 Developer nên làm gì?

Bắt đầu bằng inventory: agent nào có quyền gì, dữ liệu nào được truy cập và log ở đâu. Tự động hóa detection trước, sau đó mới mở rộng sang response có giới hạn và phê duyệt.

**Mức độ quan trọng:** ⭐⭐⭐⭐  
**Thời gian đọc:** 2 phút  
**Nguồn:** [Google Cloud](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-why-ai-threat-defense-is-the-new-boardroom-baseline)

* * *

## 🔥 Top 5 đáng chú ý nhất hôm nay

| Chủ đề | Lý do đáng chú ý |
| --- | --- |
| npm thu hẹp quyền token bypass-2FA | Giảm khả năng token bị rò rỉ tự mở rộng quyền và đặt thời hạn rõ ràng cho migration sang OIDC. |
| Copilot policy theo enterprise team | Cho phép quản trị model theo vai trò nhưng yêu cầu kiểm soát chặt membership và quyền cộng dồn. |
| AI Gateway spend budgets | Đưa giới hạn chi phí về cấp team và project, đồng thời có thể chặn request production khi vượt trần. |
| Gemini model deprecation trong Copilot | Nhắc lại rằng model identifier và model policy cần quy trình lifecycle, regression test và phương án thay thế. |
| Vercel Passport GA | Thay password deployment dùng chung bằng identity doanh nghiệp và signed token có thể xác minh ở backend. |

* * *

## 🛠 Công cụ đáng thử hôm nay

### npm Trusted Publishing

*   **Dùng để làm gì:** Publish package từ CI bằng OIDC mà không lưu npm token dài hạn.
    
*   **Điểm nổi bật:** Giảm rủi ro credential bị đánh cắp và phù hợp với lộ trình loại bỏ direct publish bằng token bypass-2FA.
    
*   **Phù hợp với:** Maintainer npm package và organization có release automation.
    
*   **Link:** [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers)
    

### Vercel AI Gateway Budgets

*   **Dùng để làm gì:** Đặt giới hạn chi phí inference theo team, project hoặc API key.
    
*   **Điểm nổi bật:** Có default budget, refresh period, email alert và hard spending cap.
    
*   **Phù hợp với:** Đội vận hành nhiều ứng dụng hoặc nhiều model provider.
    
*   **Link:** [AI Gateway Budgets](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts)
    

### Vercel Passport

*   **Dùng để làm gì:** Bảo vệ deployment bằng identity provider của doanh nghiệp.
    
*   **Điểm nổi bật:** Hỗ trợ OIDC, group claim, signed identity và xác minh trong downstream service.
    
*   **Phù hợp với:** Enterprise có preview, staging hoặc internal app nhạy cảm.
    
*   **Link:** [Vercel Passport](https://vercel.com/changelog/vercel-passport-generally-available)
    

### GitHub Copilot Enterprise Teams

*   **Dùng để làm gì:** Cấp model Copilot theo nhóm người dùng và vai trò.
    
*   **Điểm nổi bật:** Cho phép giữ baseline toàn enterprise và mở thêm model cho team thử nghiệm.
    
*   **Phù hợp với:** Doanh nghiệp cần rollout model có kiểm soát.
    
*   **Link:** [GitHub Enterprise Teams](https://github.blog/changelog/2026-07-31-enterprise-teams-model-policy-targeting-in-public-preview/)
    

### Vercel Workflow Observability

*   **Dùng để làm gì:** Tìm và điều tra workflow run bằng structured filter.
    
*   **Điểm nổi bật:** Lọc theo region, environment, deployment và custom attribute; truy vấn có thể chia sẻ.
    
*   **Phù hợp với:** Đội vận hành workflow bất đồng bộ hoặc nhiều tenant.
    
*   **Link:** [Workflow search](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability)
    

* * *

## 📚 Bài viết nên đọc

### Enterprise teams model policy targeting

Bài viết giải thích cách `Enabled`, `Disabled` và `Optional` hoạt động, cùng ảnh hưởng khi người dùng thuộc nhiều enterprise team. Enterprise owner nên đọc trước khi opt in để tránh quyền model được cộng dồn ngoài dự kiến.

**Đọc bài:** [GitHub](https://github.blog/changelog/2026-07-31-enterprise-teams-model-policy-targeting-in-public-preview/)

### Restricting npm bypass-2FA granular access tokens

Changelog mô tả chính xác thao tác nào giờ yêu cầu 2FA tương tác và lộ trình loại bỏ direct publish vào tháng 01/2027. Đây là tài liệu cần thiết cho mọi maintainer đang dùng token dài hạn trong CI.

**Đọc bài:** [GitHub](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/)

### AI Gateway spend budgets and alerts

Bài viết trình bày cách nhiều budget cùng áp dụng lên một request, default budget và hành vi khi vượt giới hạn. Developer sẽ hiểu rõ cách tránh một API key hoặc project tiêu hết ngân sách của toàn team.

**Đọc bài:** [Vercel](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts)

### Vercel Passport is generally available

Bài viết có ví dụ đọc identity, kiểm tra group claim và xác minh token ở downstream service. Đây là hướng dẫn thực tế để thay thế password bảo vệ deployment bằng identity doanh nghiệp.

**Đọc bài:** [Vercel](https://vercel.com/changelog/vercel-passport-generally-available)

### AI Threat Defense is the new boardroom baseline

Google Cloud phân tích vì sao tốc độ tấn công có hỗ trợ AI yêu cầu khả năng phòng thủ liên tục và quản trị thống nhất. Bài viết phù hợp với đội kỹ thuật cần kết nối agent governance với chương trình security hiện có.

**Đọc bài:** [Google Cloud](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-why-ai-threat-defense-is-the-new-boardroom-baseline)

* * *

## 🚀 GitHub Repository nổi bật

#### modelcontextprotocol/typescript-sdk

*   **Language:** TypeScript
    
*   **Use case:** Xây MCP client và server
    
*   **Điểm nổi bật:** Reference SDK cho protocol, transport và tool integration
    
*   **GitHub:** [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)
    

#### ossf/malicious-packages

*   **Language:** Structured advisory data và automation
    
*   **Use case:** Theo dõi package được xác định có hành vi độc hại
    
*   **Điểm nổi bật:** Nguồn dữ liệu cộng đồng phục vụ supply-chain security
    
*   **GitHub:** [ossf/malicious-packages](https://github.com/ossf/malicious-packages)
    

#### github/advisory-database

*   **Language:** GitHub Security Advisory data
    
*   **Use case:** Cung cấp vulnerability và malware advisory ở định dạng máy đọc được
    
*   **Điểm nổi bật:** Có thể tích hợp vào scanner và automation nội bộ
    
*   **GitHub:** [github/advisory-database](https://github.com/github/advisory-database)
    

* * *

## 💬 Góc nhìn của mình

Bản tin hôm nay cho thấy cuộc đua AI coding đang dần chuyển từ “model nào tốt hơn” sang “ai được dùng model nào, dùng bao nhiêu và được kiểm soát ra sao”. Đây là dấu hiệu tích cực vì model chỉ là một phần của hệ thống production.

Policy theo enterprise team của GitHub phù hợp hơn với thực tế tổ chức. Nhóm AI platform cần quyền khác nhóm tài chính hoặc contractor. Nhưng việc dùng least-restrictive strategy khiến membership trở thành một phần của security boundary, không còn chỉ là cách tổ chức danh sách nhân viên.

Việc Gemini 2.5 Pro và Gemini 3 Flash bị loại khỏi Copilot cũng là lời nhắc rằng model không nên được hardcode sâu trong business logic. Một lớp routing và benchmark nội bộ có thể trông như công việc thừa lúc ban đầu, nhưng sẽ trả lại giá trị ngay khi model bị deprecated hoặc thay đổi giá.

Budget của AI Gateway là tính năng rất thực dụng. Nhiều đội chỉ phát hiện agent tốn kém sau khi hóa đơn đã hình thành. Budget theo project giúp gắn chi phí với sản phẩm, nhưng hard cap cần được thiết kế cẩn thận để không biến kiểm soát chi phí thành outage.

Mình đánh giá cao hướng đi của npm hơn nữa. Token dùng để automation không nên đồng thời có khả năng thay đổi ownership hoặc tạo thêm credential. Tách machine identity khỏi account administration là một nguyên tắc căn bản nhưng lâu nay chưa được áp dụng đủ nghiêm.

Trusted publishing qua OIDC có thể làm thiết lập ban đầu phức tạp hơn một token tĩnh, nhưng giảm đáng kể gánh nặng rotation và nguy cơ token tồn tại nhiều năm trong secret store. Với repository thường xuyên publish package, migration này nên được coi như nâng cấp hạ tầng, không phải việc tùy chọn.

Passport cũng cho thấy authentication ở tầng deployment đang trưởng thành. Một password chia sẻ không cung cấp danh tính, group hoặc audit tốt. Khi preview chứa dữ liệu hoặc tính năng nhạy cảm, identity provider doanh nghiệp là lựa chọn hợp lý hơn.

Điểm chung của các tin hôm nay là **quyền phải được gắn với scope, thời gian và khả năng quan sát**. Model access cần scope theo team, chi phí cần scope theo project, token cần scope theo hành động và deployment cần identity có thể xác minh. Đây mới là nền tảng để AI và automation mở rộng mà không làm hệ thống mất kiểm soát.

* * *

## 📝 Kết luận

Daily Tech Brief ngày 01/08 tập trung vào governance hơn là benchmark. GitHub, npm và Vercel đều đang bổ sung các lớp kiểm soát cụ thể cho model, token, chi phí, workflow và deployment identity.

Ba việc nên làm ngay là kiểm tra model Copilot đã deprecated, lập kế hoạch chuyển npm publishing sang OIDC và đặt budget cho từng AI project. Những thay đổi này không làm agent thông minh hơn, nhưng giúp hệ thống an toàn, dự đoán được và dễ vận hành hơn.