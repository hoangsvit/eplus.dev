---
title: "Daily Tech Brief — 10/08/2026"
seoTitle: "Daily Tech Brief — 10/08/2026"
seoDescription: "Vercel đưa Grok Imagine 2.0 lên AI Gateway, Hermes Agent chạy trong Sandbox, Anthropic cải thiện safeguard và BigQuery mở rộng unstructured search."
datePublished: 2026-08-10T01:30:39.897Z
cuid: cmsmk1mr3000009kneful9b1u
slug: daily-tech-brief-10-08-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1b0a99cc-ff37-4eaf-8c17-28f50b5d3d3e.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/ed4dad95-66c0-4025-bc82-655fa894fe77.png
tags: google-cloud, ai-agents, anthropic, grok-imagine, daily-tech-brief, vercel-sandbox

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source và những công nghệ đáng chú ý trong ngày.

* * *

## 📌 Executive Summary

*   **Vercel AI Gateway thêm Grok Imagine Image 2.0 Preview**, đưa image generation và image editing vào cùng abstraction của AI SDK; model hỗ trợ output 1K/2K và chú trọng typography, layout.
    
*   **Hermes Agent tích hợp trực tiếp Vercel AI Gateway và Vercel Sandbox**, cho phép dùng hơn 200 model qua một inference layer và tách execution của agent vào microVM thay vì chạy command trực tiếp trên máy developer.
    
*   Vercel cũng mở rộng **Audit Log Drains** sang Datadog, Splunk và Panther, cho thấy observability và security telemetry đang trở thành phần mặc định của platform engineering.
    
*   **Anthropic giảm khoảng 85% biology-related fallback của Claude Fable 5** trong thử nghiệm nội bộ bằng cách tinh chỉnh safeguard, trong khi vẫn giữ fallback đối với các nhóm dual-use nhạy cảm.
    
*   Google Cloud công bố cách họ **detect, contain và protect trước emerging threats**, nhấn mạnh defense-in-depth và cách cloud provider phản ứng với những kỹ thuật tấn công mới thay vì chỉ dựa vào một lớp phòng vệ.
    
*   **BigQuery Search tiếp tục xóa ranh giới giữa structured và unstructured data**, hướng tới việc search trên PDF, audio, image và text trực tiếp trong data platform thay vì dựng nhiều pipeline tách biệt.
    
*   Case study TelevisaUnivision cho World Cup 2026 cho thấy bài toán streaming quy mô lớn vẫn là một trong những phép thử thực tế nhất cho network architecture, resilience và latency.
    
*   Không có đủ 10–15 announcement mới đạt tiêu chuẩn trong 24 giờ gần nhất. Bản tin hôm nay vì vậy chỉ giữ **7 chủ đề có giá trị**, phần lớn nằm trong cửa sổ mở rộng 24–72 giờ thay vì lấp đầy bằng tin cũ hoặc tin chất lượng thấp.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Nếu bản tin hôm qua xoay quanh AI control plane và permission của agent, hôm nay bức tranh dịch thêm một bước: **inference đang mở rộng thành execution platform hoàn chỉnh**.

Hermes Agent không chỉ đổi model qua một gateway. Agent giờ có thể đưa command sang một sandbox microVM tách biệt khỏi máy local. Đây là khác biệt quan trọng. Một LLM trả text sai thường chỉ gây ra câu trả lời sai; một coding agent có terminal access sai có thể sửa file, chạy binary, truy cập credential hoặc phá môi trường làm việc. Isolation vì vậy không còn là tính năng dành riêng cho CI — nó đang trở thành primitive của agent runtime.

Ở phía data và security cũng xuất hiện cùng một xu hướng: thay vì dựng thêm hệ thống đứng ngoài platform, cloud provider đang đưa search, security telemetry và unstructured data processing vào chính control plane hiện có. Developer nhận được ít glue code hơn, nhưng đổi lại phải hiểu permission boundary và dữ liệu nào đang được gửi sang từng lớp dịch vụ.

* * *

## 📰 Tin nổi bật

### AI & Multimodal

#### Grok Imagine Image 2.0 Preview lên Vercel AI Gateway

> **Mở rộng 24–72 giờ — công bố 08/08/2026**

Vercel đã bổ sung `xai/grok-imagine-image-2.0-preview` vào AI Gateway.

Model tập trung vào image generation và editing, đặc biệt nhấn mạnh khả năng phối hợp typography với layout thay vì xử lý chúng như hai bước độc lập.

Với AI SDK, developer có thể gọi model qua `generateImage()`:

```plaintext
import { generateImage } from 'ai';

const { images } = await generateImage({
  model: 'xai/grok-imagine-image-2.0-preview',
  prompt: 'A clean editorial technology cover',
});
```

Vercel cho biết developer có thể chọn resolution 1K hoặc 2K qua `providerOptions.xai`, đồng thời dùng `n` để tạo nhiều ảnh trong một request.

Image editing cũng được hỗ trợ bằng cách truyền image vào `prompt.images` cùng instruction.

##### Tác động với developer

Điểm đáng chú ý không chỉ nằm ở model mới.

AI Gateway đang biến image generation thành cùng một loại workload với text inference:

```plaintext
app
  -> AI SDK
  -> AI Gateway
      -> text model
      -> image model
      -> provider khác
```

Điều này giúp application giảm provider-specific code và dễ thay model hơn.

##### Developer nên làm gì?

Nếu đang xây:

*   social image generator;
    
*   product artwork;
    
*   blog cover;
    
*   thumbnail pipeline;
    
*   creative editor;
    

có thể thử đưa image generation qua gateway thay vì gọi provider SDK trực tiếp.

Tuy nhiên, cần benchmark riêng:

*   chất lượng text trên ảnh;
    
*   latency;
    
*   consistency khi edit;
    
*   cost mỗi output;
    
*   behavior với aspect ratio;
    
*   retry behavior.
    

**Nguồn:** [Vercel — Grok Imagine Image 2.0 now available on Vercel AI Gateway](https://vercel.com/changelog/grok-imagine-image-2-0-preview-now-available-on-vercel-ai-gateway)

* * *

### AI Agents & Runtime Isolation

#### Hermes Agent có thể dùng Vercel AI Gateway và chạy command trong Vercel Sandbox

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Hermes Agent giờ có thể sử dụng Vercel AI Gateway làm inference layer và Vercel Sandbox làm terminal backend.

Theo Vercel, AI Gateway hiện cho Hermes truy cập hơn 200 model, trong khi các request vẫn xuất hiện trong dashboard usage và spend của AI Gateway.

Phần đáng chú ý hơn nằm ở Sandbox.

Mặc định command của Hermes vẫn chạy local. Khi chuyển:

```plaintext
terminal.backend = vercel_sandbox
```

command của agent chạy trong một cloud microVM với workspace `/vercel/sandbox`.

Các runtime được Vercel liệt kê gồm:

*   `node24`;
    
*   `node22`;
    
*   `python3.13`.
    

##### Tác động với developer

Coding agent có terminal access tạo ra một security boundary hoàn toàn khác chatbot.

Không isolation:

```plaintext
agent
  -> shell
  -> máy developer
  -> source code
  -> SSH key
  -> cloud credentials
  -> local network
```

Có sandbox:

```plaintext
agent
  -> isolated microVM
  -> scoped workspace
  -> controlled credentials
```

Sandbox không tự động biến agent thành an toàn, nhưng nó giảm blast radius đáng kể.

##### Developer nên làm gì?

Nếu đang cho AI agent thực thi shell command:

1.  Ưu tiên ephemeral environment.
    
2.  Không mount toàn bộ `$HOME`.
    
3.  Chỉ inject credential cần thiết cho task.
    
4.  Tách production credential khỏi coding agent.
    
5.  Review diff trước khi apply.
    
6.  Log command và artifact sinh ra.
    

Đây nên trở thành default architecture thay vì optional hardening.

**Nguồn:** [Vercel — AI Gateway and Sandbox now available on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent)

* * *

### AI Safety

#### Anthropic giảm mạnh false-positive biology fallback của Claude Fable 5

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Anthropic cập nhật biology safeguards của Claude Fable 5 với mục tiêu giảm các trường hợp request hợp lệ bị chuyển sang model kém khả năng hơn.

Theo kết quả thử nghiệm do Anthropic công bố, thay đổi mới làm giảm khoảng **85% biology-related fallback** trên các product surface.

Các tình huống bình thường như:

*   học biology;
    
*   giải thích triệu chứng;
    
*   hiểu laboratory result;
    
*   một số clinical workflow;
    

sẽ ít bị fallback hơn trước.

Anthropic vẫn giữ giới hạn đối với các nhóm dual-use như virology, toxicology và molecular design; các request thuộc phạm vi này tiếp tục được chuyển sang Opus 5 trong cơ chế safeguard hiện tại.

##### Tác động với developer

Đây là ví dụ rõ về trade-off thường gặp khi xây AI safety layer:

```plaintext
threshold quá thấp
    -> misuse

threshold quá cao
    -> false positive
    -> UX kém
    -> model hữu ích bị vô hiệu hóa
```

Safety classifier không chỉ cần precision ở phía abuse detection mà còn phải đo tác động lên legitimate workload.

##### Developer nên làm gì?

Nếu application có moderation hoặc AI safety classifier:

*   đo false-positive rate;
    
*   phân loại fallback reason;
    
*   đừng chỉ đo số request bị block;
    
*   lưu evaluation set của request hợp lệ;
    
*   version policy như version model;
    
*   chạy regression test mỗi khi thay classifier.
    

**Nguồn:** [Anthropic — Improving Fable 5's biology safeguards](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards)

* * *

### Security & Observability

#### Vercel Audit Log Drains hỗ trợ Datadog, Splunk và Panther

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Vercel Audit Log Drains giờ có thể stream audit event trực tiếp tới:

*   Datadog;
    
*   Splunk;
    
*   Panther.
    

Các destination mới tham gia cùng custom HTTPS endpoint và Amazon S3.

Audit Log Drain chuyển event từ Activity Log cùng audit metadata sang destination được cấu hình.

Tính năng dành cho Enterprise plan và thay thế cơ chế Custom SIEM Log Streaming trước đó.

##### Tác động với developer

Một hệ thống production không chỉ cần application log.

Platform audit log trả lời những câu hỏi khác:

*   ai đổi environment variable?
    
*   ai thêm domain?
    
*   ai thay project setting?
    
*   ai tạo deployment?
    
*   ai thay access policy?
    

Đưa các event này về cùng SIEM với infrastructure log giúp incident investigation nhanh hơn đáng kể.

##### Developer nên làm gì?

Nếu tổ chức đang dùng Vercel Enterprise:

*   đưa audit log vào SIEM trung tâm;
    
*   tạo alert cho permission change;
    
*   theo dõi credential/configuration change;
    
*   giữ retention dài hơn application log;
    
*   correlation audit event với deployment và Git commit.
    

**Nguồn:** [Vercel — Audit Log Drains now support Datadog, Splunk, and Panther](https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther)

* * *

#### Google Cloud mô tả quy trình detect và contain emerging threats

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Google Cloud công bố một bài phân tích mới về cách hạ tầng của họ phát hiện, khoanh vùng và bảo vệ customer workload trước các kỹ thuật tấn công mới.

Điểm quan trọng ở đây là tư duy defense-in-depth.

Cloud security không thể giả định một detection rule hay một security product duy nhất sẽ bắt được tất cả threat.

Một architecture tốt thường cần:

```plaintext
identity
  + telemetry
  + anomaly detection
  + containment
  + infrastructure controls
  + incident response
```

##### Tác động với developer

Developer thường tập trung vào application vulnerability, nhưng attack path trong cloud có thể đi qua:

*   compromised credential;
    
*   IAM misconfiguration;
    
*   workload identity;
    
*   exposed service;
    
*   malicious dependency;
    
*   lateral movement.
    

Điều đó khiến cloud security trở thành trách nhiệm kiến trúc, không chỉ là phần việc của security team sau khi deploy.

##### Developer nên làm gì?

Ở minimum:

*   tránh long-lived service account key;
    
*   ưu tiên workload identity;
    
*   bật audit log phù hợp;
    
*   giới hạn IAM theo resource;
    
*   theo dõi permission escalation;
    
*   có playbook để revoke credential nhanh;
    
*   kiểm tra network egress thay vì chỉ ingress.
    

**Nguồn:** [Google Cloud — How Google Cloud detects, contains, and protects against emerging threats](https://cloud.google.com/blog/products/identity-security/how-google-cloud-detects-contains-and-protects-against-emerging-threats/)

* * *

### Data & Search

#### BigQuery tiếp tục hợp nhất structured và unstructured search

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Google Cloud công bố các cải tiến BigQuery Search nhằm giảm fragmentation giữa structured data và unstructured content.

Bài toán truyền thống thường có dạng:

```plaintext
BigQuery tables
  -> SQL

PDFs / images / audio
  -> object storage
  -> embedding pipeline
  -> vector database
  -> search service
  -> LLM pipeline
```

Khi mỗi loại dữ liệu cần một stack riêng, data governance và permission cũng bị phân mảnh.

Hướng BigQuery đang đi là giữ nhiều bước search và analysis gần warehouse hơn, bao gồm dữ liệu như document, image, audio và text.

##### Tác động với developer

Developer có thể xây retrieval system với ít moving part hơn.

Nhưng đổi lại, việc đưa unstructured data vào analytical platform yêu cầu chú ý hơn tới:

*   data residency;
    
*   object permissions;
    
*   embedding lifecycle;
    
*   search index cost;
    
*   PII;
    
*   access control.
    

##### Developer nên làm gì?

Nếu đang có một RAG stack lớn, thử inventory toàn bộ pipeline:

```plaintext
source
-> ingest
-> parse
-> chunk
-> embed
-> index
-> retrieve
-> rerank
-> generate
```

Sau đó kiểm tra bước nào data platform hiện tại đã cung cấp native.

Mỗi service có thể bỏ bớt là một failure mode và một permission boundary được loại khỏi hệ thống.

**Nguồn:** [Google Cloud — Unifying Structured and Unstructured Data Insights with BigQuery Search Innovations](https://cloud.google.com/blog/products/data-analytics/bigquery-search-innovations-unify-structured-unstructured-data)

* * *

### Cloud Infrastructure

#### TelevisaUnivision chia sẻ kiến trúc streaming World Cup trên Google Cloud

> **Mở rộng 24–72 giờ — công bố 07/08/2026**

Google Cloud và TelevisaUnivision công bố case study về hạ tầng streaming phục vụ FIFA World Cup 2026.

Live sports là workload đặc biệt khó vì nhiều đặc điểm xuất hiện cùng lúc:

*   concurrency tăng đột biến;
    
*   latency nhạy cảm;
    
*   traffic pattern khó dự đoán;
    
*   người dùng tập trung theo thời điểm;
    
*   failure xảy ra trước hàng triệu người cùng lúc.
    

Khác với một website thông thường, hệ thống không có nhiều thời gian để autoscale sau khi traffic đã tăng.

##### Tác động với developer

Case study nhắc lại một nguyên tắc quan trọng:

**capacity planning không biến mất chỉ vì cloud có autoscaling.**

Một streaming event lớn cần chuẩn bị trước:

```plaintext
expected viewers
  -> peak concurrency
  -> bitrate
  -> origin capacity
  -> CDN capacity
  -> regional failover
  -> observability
```

##### Developer nên làm gì?

Ngay cả khi không làm video streaming, pattern này áp dụng tốt cho:

*   flash sale;
    
*   ticketing;
    
*   product launch;
    
*   game event;
    
*   livestream commerce.
    

Load test nên mô phỏng **arrival pattern thực tế**, không chỉ duy trì một lượng user cố định.

**Nguồn:** [Google Cloud — Streaming the FIFA World Cup with TelevisaUnivision](https://cloud.google.com/blog/products/networking/streaming-the-fifa-world-cup-with-televisaunivision)

* * *

## 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Hermes + Vercel Sandbox | Coding agent bắt đầu có execution boundary riêng; sandbox đang trở thành primitive của agent runtime. |
| 2 | Grok Imagine Image 2.0 trên AI Gateway | Multimodal generation đang đi vào cùng abstraction và observability layer với text model. |
| 3 | Anthropic giảm biology fallback | Safety engineering chuyển từ “block càng nhiều càng tốt” sang tối ưu precision mà vẫn giữ capability. |
| 4 | BigQuery structured + unstructured search | Data platform tiếp tục hấp thụ các thành phần trước đây phải triển khai thành RAG/search stack riêng. |
| 5 | Vercel Audit Log Drains | Platform audit telemetry đang trở thành input chuẩn cho SIEM và incident investigation. |

* * *

## 🛠 Công cụ đáng thử hôm nay

### Vercel Sandbox

Đáng thử nếu đang cho coding agent chạy command hoặc build code không tin cậy.

Thay vì cấp agent terminal trực tiếp trên laptop, Sandbox tạo execution boundary rõ hơn.

[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox)

### Vercel AI Gateway

Nếu application đã có cả text và image generation, việc đưa cả hai qua một gateway giúp giảm provider-specific integration.

[Vercel AI Gateway](https://vercel.com/ai-gateway)

### BigQuery Search

Phù hợp để đánh giá lại những kiến trúc đang phải vận hành warehouse, vector search và unstructured content pipeline riêng biệt.

[BigQuery Search](https://cloud.google.com/bigquery/docs/search-intro)

### Panther

Nếu team cần security analytics/SIEM cho cloud platform audit event, Panther là một trong ba destination mới được Vercel hỗ trợ trực tiếp.

[Panther](https://panther.com/)

* * *

## 📚 Bài viết nên đọc

### Grok Imagine Image 2.0 now available on Vercel AI Gateway

Ngắn nhưng đáng đọc nếu đang dùng Vercel AI SDK cho multimodal workflow.

[Đọc trên Vercel](https://vercel.com/changelog/grok-imagine-image-2-0-preview-now-available-on-vercel-ai-gateway)

### Improving Fable 5's biology safeguards

Một ví dụ thực tế về việc giảm false positive trong safety classifier mà không loại bỏ safeguard cho nhóm dual-use.

[Đọc trên Anthropic](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards)

### Unifying Structured and Unstructured Data Insights with BigQuery Search Innovations

Đáng đọc với developer xây RAG, enterprise search hoặc data platform.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/data-analytics/bigquery-search-innovations-unify-structured-unstructured-data)

### How Google Cloud detects, contains, and protects against emerging threats

Có giá trị cho platform engineer và cloud security engineer muốn nhìn security ở cấp infrastructure lifecycle thay vì chỉ application scanner.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/identity-security/how-google-cloud-detects-contains-and-protects-against-emerging-threats/)

* * *

## 🚀 GitHub Repository nổi bật

### vercel/ai

AI SDK đứng sau abstraction mà Vercel sử dụng để gọi nhiều provider và nhiều loại model.

Đáng xem nếu muốn hiểu cách một TypeScript AI SDK thiết kế provider abstraction cho text và multimodal workload.

[github.com/vercel/ai](https://github.com/vercel/ai)

### NousResearch/hermes-agent

Repository liên quan Hermes Agent, phù hợp để nghiên cứu agent có terminal/tool execution và cách tích hợp inference provider.

[github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

### googleapis

Không phải một repo đơn lẻ cho BigQuery Search, nhưng GitHub organization của Google APIs là nơi hữu ích để lần theo SDK và API client chính thức khi xây automation quanh Google Cloud.

[github.com/googleapis](https://github.com/googleapis)

* * *

## 💬 Góc nhìn của mình

Điểm mình thấy đáng chú ý nhất hôm nay là **sandbox đang trở thành một phần tự nhiên của AI agent stack**.

Trong thế hệ chatbot trước, developer chủ yếu lo prompt injection làm model trả lời sai.

Coding agent thay đổi mức độ rủi ro.

Nếu agent có:

```plaintext
shell
git
browser
filesystem
cloud CLI
```

thì prompt injection có thể biến thành một vấn đề execution.

Một trang web mà agent đọc được có thể chứa instruction độc hại. Một package README có thể cố dẫn agent chạy command. Một repository không tin cậy có thể chứa file được thiết kế để tác động đến agent.

Khi đó câu hỏi không còn là:

> “Model có nghe lời attacker không?”

mà là:

> “Nếu model nghe lời attacker thì nó làm được những gì?”

Đây chính là lý do isolation quan trọng.

Một agent compromise nhưng chỉ có ephemeral workspace và credential scope hẹp khác hoàn toàn một agent chạy trực tiếp trên laptop đang đăng nhập AWS, GCP, GitHub và production database.

Xu hướng thứ hai là **gateway abstraction lan từ text sang multimodal**.

Khi text, image, video và audio model đều được gọi qua cùng SDK, application code sẽ ngày càng ít quan tâm provider nào đang đứng sau.

Điều này rất tốt cho portability, nhưng cũng tạo ra một rủi ro khác: developer dễ nghĩ rằng các model interchangeable hơn thực tế.

Hai image model có thể cùng implement:

```plaintext
generateImage(prompt)
```

nhưng hoàn toàn khác nhau về:

*   aspect ratio;
    
*   typography;
    
*   image safety;
    
*   consistency;
    
*   seed behavior;
    
*   editing semantics;
    
*   latency;
    
*   pricing.
    

API abstraction không thay thế model evaluation.

Cuối cùng, BigQuery Search cho thấy xu hướng consolidation vẫn tiếp tục.

Trong vài năm qua, mỗi tính năng AI thường sinh ra một service:

```plaintext
vector DB
embedding service
reranker
parser
object store
LLM gateway
```

Bây giờ cloud platform đang dần hấp thụ lại những thành phần đó.

Điều này có thể làm architecture ít thú vị hơn trên sơ đồ — nhưng production system thường tốt hơn khi có ít moving part hơn.

* * *

## 📝 Kết luận

Ngày 10/08 rơi vào khoảng thời gian ít announcement mới từ các vendor lớn, vì vậy bản tin hôm nay không cố đạt 10–15 mục. Sau khi loại các chủ đề đã xuất hiện trong các số trước và giữ giới hạn tối đa 72 giờ, còn **7 nội dung đủ mới và đủ hữu ích**.

Nếu chọn ba việc để hành động từ số hôm nay:

1.  Nếu coding agent đang chạy trực tiếp trên máy developer, ưu tiên sandbox hóa execution.
    
2.  Nếu application dùng nhiều loại AI model, đánh giá gateway abstraction nhưng vẫn benchmark từng model riêng.
    
3.  Nếu đang vận hành RAG stack phức tạp, kiểm tra lại xem data platform đã có native search nào có thể loại bớt service trung gian hay chưa.
    

AI engineering đang bước sang giai đoạn mà **isolation, telemetry và data architecture** quan trọng ngang với model capability.

* * *

## 🔗 Nguồn tham khảo

1.  [Vercel — Grok Imagine Image 2.0 on AI Gateway](https://vercel.com/changelog/grok-imagine-image-2-0-preview-now-available-on-vercel-ai-gateway)
    
2.  [Vercel — AI Gateway and Sandbox on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent)
    
3.  [Vercel — Audit Log Drains](https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther)
    
4.  [Anthropic — Improving Fable 5's biology safeguards](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards)
    
5.  [Google Cloud — Emerging threat protection](https://cloud.google.com/blog/products/identity-security/how-google-cloud-detects-contains-and-protects-against-emerging-threats/)
    
6.  [Google Cloud — BigQuery Search innovations](https://cloud.google.com/blog/products/data-analytics/bigquery-search-innovations-unify-structured-unstructured-data)
    
7.  [Google Cloud — TelevisaUnivision World Cup streaming](https://cloud.google.com/blog/products/networking/streaming-the-fifa-world-cup-with-televisaunivision)