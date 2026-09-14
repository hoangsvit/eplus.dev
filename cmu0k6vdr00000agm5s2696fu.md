---
title: "Daily Tech Brief — 14/09/2026"
seoTitle: "Daily Tech Brief — 14/09/2026"
seoDescription: "Cloudflare đưa ML‑DSA‑44 vào DNSSEC trên 1.1.1.1, GitHub Copilot code review dùng ensemble agents và shell tools, Cloudflare CASB tự động remediation và AWS đưa interactive MCP Apps lên Bedrock AgentCore."
datePublished: 2026-09-14T01:23:13.165Z
cuid: cmu0k6vdr00000agm5s2696fu
slug: daily-tech-brief-14-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3ca1f359-f9dd-4fa3-a3c5-e276e4fe90fd.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/2c488789-d1b6-43a8-93e9-fc774f647074.png
tags: cloudflare, code-review, github-copilot, post-quantum-cryptography, daily-tech-brief, daily-tech-brief-14-09-2026

---

> Bản tin hằng ngày dành cho developer: post-quantum DNSSEC, agentic code review, automated SaaS remediation, MCP Apps, AI model economics, content-aware file routing và hạ tầng dữ liệu mở phía sau làn sóng AI.

* * *

## 📌 Executive Summary

*   **24 giờ vừa qua tương đối yên ắng ở các nguồn developer chính thức**, đặc biệt vì rơi vào cuối tuần. Thay vì lặp các headline 12–13/09 về GPT‑6 Astra, Agents API, GPT‑Live‑1 hoặc frontier AI safety, bản hôm nay chủ động mở rộng sang các công bố ngày 11/09, vẫn nằm trong cửa sổ tối đa 72 giờ.
    
*   **Cloudflare 1.1.1.1 đã bắt đầu validate DNSSEC bằng ML‑DSA‑44**, thuật toán chữ ký post-quantum được NIST chuẩn hóa và vừa được IANA cấp DNSSEC algorithm number 18. Đây là bước thử nghiệm quan trọng trước khi post-quantum DNSSEC có thể triển khai end-to-end.
    
*   Một chữ ký ML‑DSA‑44 dài **2.420 byte**, gần 38 lần chữ ký ECDSA P‑256 64 byte. Điều này làm nhiều DNS response vượt giới hạn UDP thông thường và buộc hệ thống phải xử lý nhiều fallback sang TCP hơn.
    
*   Cloudflare đồng thời phải giải một bài toán khó khác: **downgrade protection**. Nếu một zone publish cả ECDSA và ML‑DSA‑44, resolver không được phép âm thầm chấp nhận đường xác thực cổ điển khi parent đã xác nhận có post-quantum path.
    
*   **GitHub Copilot code review tiếp tục tiến về agentic review thực sự.** Copilot giờ tự resolve review comments đã được fix, sinh commit message thông minh cho autofix, dùng nhiều shell tools hơn để validate code và Lite review sử dụng ensemble agents thay vì một reviewer agent duy nhất.
    
*   GitHub cho biết trong thử nghiệm, ensemble approach làm số high-severity comments được developer xử lý tăng **47%**, medium tăng 31%, low tăng 11%, trong khi chi phí review giảm khoảng 8%.
    
*   **Cloudflare CASB có automatic remediation policies.** Thay vì security finding chỉ tạo alert, hệ thống có thể tự revoke public file sharing hoặc gửi webhook tới SOC/SOAR ngay sau khi phát hiện.
    
*   Pipeline automation của Cloudflare sử dụng Queues, Workers và Workflows. Mục tiêu từ lúc detection tới completed remediation là **5 phút hoặc ít hơn**, trong khi Workflows chịu trách nhiệm retry và xử lý vendor API rate limits.
    
*   **AWS hướng dẫn xây MCP Apps trên Bedrock AgentCore**, cho phép cùng một MCP server trả interactive HTML widgets trong những AI host hỗ trợ MCP Apps thay vì chỉ plain text.
    
*   MCP App architecture tách protocol adapter khỏi business logic: AgentCore Runtime chạy MCP server, Gateway expose endpoint, còn Lambda/DynamoDB hoặc service backend hiện có tiếp tục xử lý business operations.
    
*   **AWS cũng đưa ra một lesson quan trọng về AI economics:** model rẻ nhất trên pricing page chưa chắc rẻ nhất trên mỗi task thành công. Với agent workflows, nhiều turns làm context được gửi lại liên tục và tổng billed input có thể tăng gần bậc hai theo số turns.
    
*   Trong sample DeepSearchQA của AWS, GPT‑5.6 Luna có cost khoảng **$0,05 cho mỗi passing answer**, so với $0,40 của một baseline mini model, dù nominal token pricing không kể hết câu chuyện.
    
*   **AWS Transfer Family + Bedrock được dùng để phân loại file dựa trên content**, thay cho regex và filename conventions. Pipeline dùng SFTP → EventBridge → SQS → Lambda/Textract → Bedrock → routing, với human-review path cho confidence thấp.
    
*   **Common Crawl hiện đã tăng từ khoảng 5 tỷ trang khi lên AWS năm 2012 lên khoảng 300 tỷ trang ở quy mô petabyte.** Đây là reminder rằng nhiều bước tiến AI hiện nay được xây trên open datasets và boring-but-essential storage infrastructure đã tồn tại hơn một thập kỷ.
    
*   Theme lớn hôm nay là **“automation phải đi từ detection đến verified action”**: resolver không chỉ biết algorithm mà phải chống downgrade, code reviewer không chỉ comment mà phải validate, CASB không chỉ cảnh báo mà phải remediate, agent UI không chỉ trả text mà phải trở thành portable application surface.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Bản hôm nay không có frontier-model launch mới.

Nhưng lại có một pattern rất rõ trong hạ tầng:

```plaintext
detect
  -> reason
  -> act
  -> verify
```

Trước đây nhiều tool dừng ở:

```plaintext
detect
  -> notify human
```

GitHub code review đang thêm khả năng:

```plaintext
detect issue
  -> inspect code
  -> run tools
  -> verify fix
  -> resolve comment
```

Cloudflare CASB:

```plaintext
detect overshared file
  -> match policy
  -> revoke access
  -> record execution
```

Đây là một bước dịch lớn từ **observability** sang **closed-loop automation**.

Nhưng automation càng mạnh thì failure semantics càng quan trọng.

Ví dụ DNSSEC.

Thêm ML‑DSA‑44 không có nghĩa hệ thống tự nhiên trở thành post-quantum secure.

Nếu resolver vẫn chấp nhận:

```plaintext
old valid signature
```

trong lúc attacker có thể forge old algorithm, migration trở thành:

```plaintext
new crypto
  +
old downgrade path
```

Tương tự với AI agents.

Thêm agent vào code review không có ý nghĩa nếu agent:

```plaintext
comment
  -> không test
  -> không verify
  -> developer vẫn phải đoán
```

Vì vậy điểm chung của các release hôm nay không phải AI.

Nó là **verified automation**.

* * *

# 📰 Tin nổi bật

## 🔐 Post-Quantum Internet

### Cloudflare 1.1.1.1 bắt đầu validate ML‑DSA‑44 trong DNSSEC

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

Cloudflare đã bật validation cho DNSSEC signatures dùng:

```plaintext
ML-DSA-44
```

trên resolver 1.1.1.1.

ML‑DSA‑44 là thuật toán post-quantum được NIST chuẩn hóa và đã được IANA gán:

```plaintext
DNSSEC algorithm 18
```

### Vấn đề lớn: kích thước

ECDSA P‑256 signature:

```plaintext
64 bytes
```

ML‑DSA‑44:

```plaintext
2,420 bytes
```

Public key của ML‑DSA‑44:

```plaintext
1,312 bytes
```

Một DNSKEY response vì vậy có thể vượt giới hạn UDP rất nhanh.

Khi response bị truncate:

```plaintext
UDP
  -> TC flag
  -> retry TCP
```

Điều này biến post-quantum migration thành networking problem chứ không chỉ cryptography problem.

### Downgrade protection

Trong nhiều năm, zones sẽ phải publish song song:

```plaintext
ECDSA
+
ML-DSA-44
```

để hỗ trợ resolver cũ.

Nhưng nếu resolver post-quantum vẫn chấp nhận ECDSA-only response khi parent đã publish ML‑DSA DS record, attacker có thể downgrade validation.

1.1.1.1 vì vậy áp dụng local policy chặt hơn:

> Khi authenticated delegation cho biết ML‑DSA‑44 được hỗ trợ, phải có ít nhất một valid post-quantum validation path.

### Tác động với developer

Crypto migration thường thất bại ở protocol và compatibility layer chứ không phải algorithm.

Post-quantum readiness phải test:

```plaintext
packet size
fragmentation
TCP fallback
middleboxes
DNS software
delegation chain
```

### Developer nên làm gì?

Nếu vận hành DNS infrastructure:

*   test EDNS buffer assumptions;
    
*   theo dõi TCP fallback;
    
*   kiểm tra DNS firewall/middlebox handling;
    
*   đừng assume PQ support ở resolver đồng nghĩa full PQ chain;
    
*   theo dõi registrar/registry support cho ML‑DSA DS records.
    

**Nguồn:** [Cloudflare — 1.1.1.1 now supports post-quantum DNSSEC](https://blog.cloudflare.com/post-quantum-dnssec-1111/)

* * *

# 🤖 Agentic Code Review

## Copilot code review có shell tools và ensemble agents

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

GitHub nâng cấp Copilot code review theo hai hướng:

### Review lifecycle thông minh hơn

Nếu developer push commit sửa issue mà Copilot từng comment:

```plaintext
Copilot rereview
  -> detects fix
  -> resolves comment
```

Developer không cần manually close thread đã hết relevance.

Copilot cũng sinh smart commit messages khi áp dụng autofix suggestion.

### Analysis sâu hơn

Reviewer agent giờ có thể dùng nhiều shell tools từ Copilot SDK để:

*   chạy build;
    
*   chạy tests;
    
*   chạy targeted scripts;
    
*   truy vấn tools/APIs khả dụng.
    

Các tool chạy sau Copilot agent firewall.

### Ensemble review

Lite effort level giờ không còn chỉ một reviewer agent.

Thay vào đó:

```plaintext
agent A
agent B
agent C
  -> merge findings
  -> one review
```

GitHub cho biết experiment ghi nhận số comments được developer xử lý tăng:

*   high severity: +47%;
    
*   medium: +31%;
    
*   low: +11%;
    

trong khi review cost giảm khoảng 8%.

### Tác động với developer

Code review AI đang dịch từ:

> “LLM đọc diff và comment.”

sang:

> “Agent kiểm tra hypothesis bằng execution.”

Đây là khác biệt lớn.

Một reviewer thấy:

```plaintext
maybe tests fail
```

có giá trị thấp hơn reviewer:

```plaintext
ran test X
failed at Y
```

### Developer nên làm gì?

Nếu bật AI review:

*   cho agent access test/build tools an toàn;
    
*   sandbox execution;
    
*   phân biệt finding có evidence và heuristic suggestion;
    
*   đo tỷ lệ comment được developer thực sự xử lý;
    
*   đừng optimize số lượng comments.
    

Metric tốt hơn là:

```plaintext
useful findings / review
```

**Nguồn:** [GitHub — Auto-resolution and analysis updates in Copilot code review](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/)

* * *

# 🛡️ SaaS Security Automation

## Cloudflare CASB chuyển từ alerting sang automatic remediation

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

Cloudflare CASB bổ sung **automatic remediation policies**.

Trước đây:

```plaintext
CASB finds problem
  -> alert
  -> admin opens SaaS portal
  -> admin fixes
```

Flow mới:

```plaintext
finding
  -> policy match
  -> remediation / webhook
  -> audit log
```

Ví dụ:

```plaintext
Google Drive file becomes public
  -> policy fires
  -> public sharing revoked
```

không cần đợi admin xử lý queue.

### Backend architecture

Cloudflare mô tả pipeline:

```plaintext
Findings Engine
  -> Cloudflare Queue
  -> Worker
  -> policy match
  -> Workflow
  -> remediation API
```

Cloudflare Workflows xử lý:

*   durable execution;
    
*   retries;
    
*   vendor API rate limits;
    
*   process restarts.
    

Target:

```plaintext
detection -> completed remediation <= 5 minutes
```

### Auditability

Mỗi policy có hai loại logs:

*   configuration/admin changes;
    
*   runtime execution results.
    

Runtime log cho biết:

```plaintext
finding
action
timestamp
success/failure
vendor error
```

### Tác động với developer

Security automation tốt phải có:

```plaintext
policy
durable execution
retries
audit trail
```

Không chỉ:

```plaintext
webhook + Lambda
```

được viết nhanh rồi quên.

### Developer nên làm gì?

Nếu đang xây remediation automation:

*   idempotent actions;
    
*   explicit retry strategy;
    
*   rate-limit handling;
    
*   dry-run mode;
    
*   immutable audit log;
    
*   human approval cho destructive/high-impact action.
    

**Nguồn:** [Cloudflare — Introducing automatic remediation policies with Cloudflare CASB](https://blog.cloudflare.com/casb-policies/)

* * *

# 🧩 MCP Apps

## Bedrock AgentCore chạy interactive MCP Apps thay vì chỉ text tools

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

AWS công bố một architecture mẫu để host **MCP Apps** trên Amazon Bedrock AgentCore.

MCP Apps mở rộng Model Context Protocol bằng:

```plaintext
interactive HTML widgets
```

được render trực tiếp trong AI host hỗ trợ extension.

Thay vì tool trả:

```plaintext
"3 products found"
```

nó có thể trả:

```plaintext
interactive cards
buttons
status
structured UI
```

### Architecture

AWS sample dùng:

```plaintext
AI host
  -> AgentCore Gateway
  -> AgentCore Runtime
  -> MCP server
  -> Lambda
  -> DynamoDB
```

MCP server giữ vai trò thin protocol adapter.

Business logic không cần biết MCP.

### Widget delivery

Tool response chứa:

```plaintext
structuredContent
```

và metadata:

```plaintext
ui://widget/...
```

AI host gọi `resources/read`, lấy self-contained HTML rồi render trong sandboxed iframe.

### Host-agnostic

Ý tưởng quan trọng:

```plaintext
same MCP App
  -> ChatGPT
  -> Claude
  -> other compatible host
```

Không phải viết UI integration riêng cho từng assistant.

### Tác động với developer

MCP đang tiến từ:

```plaintext
tool protocol
```

sang:

```plaintext
application distribution layer
```

Nếu trend này tiếp tục, AI chat surface có thể trở thành một runtime tương tự browser mini-app ecosystem.

### Developer nên làm gì?

Khi thiết kế MCP server:

*   giữ business logic ngoài MCP adapter;
    
*   dùng structured output;
    
*   xem widgets là untrusted rendering surface;
    
*   enforce authorization ở backend;
    
*   không tin state từ client widget.
    

**Nguồn:** [AWS — Build interactive MCP Apps using Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/build-interactive-mcp-apps-using-amazon-bedrock-agentcore/)

* * *

# 💸 AI Economics

## Giá/token không còn là metric đủ để chọn model

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

AWS đăng một analysis đáng đọc về cách chọn OpenAI models trên Amazon Bedrock.

Điểm chính:

```plaintext
cheapest token
  !=
cheapest successful task
```

Đặc biệt với agent.

### Vì sao agent đắt theo cách khác?

Trong client-managed conversation history:

mỗi turn có thể gửi lại:

```plaintext
system prompt
previous tools
retrieved pages
conversation
```

Nếu context tăng theo từng turn:

```plaintext
total billed input
```

có thể tăng gần:

```plaintext
O(n²)
```

theo số turns.

Một model hoàn thành trong 5 turns có thể rẻ hơn rất nhiều model cần 8 turns dù token unit price cao hơn.

### Sample của AWS

Trên DeepSearchQA sample 50 questions:

*   một baseline mini model trung bình cần nhiều turns hơn;
    
*   input-token volume đạt khoảng 114k/question;
    
*   GPT‑5.6 Terra khoảng 50k/question;
    
*   GPT‑5.6 Luna ghi nhận cost khoảng $0,05/passing answer;
    
*   baseline mini khoảng $0,40/passing answer.
    

AWS nhấn mạnh đây là point-in-time/sample-specific benchmark, không phải universal ranking.

### Tác động với developer

Cost model cho agent phải tính:

```plaintext
token price
  ×
turn count
  ×
repeated context
  +
tool cost
  +
failed attempts
```

Không chỉ:

```plaintext
$ / million tokens
```

### Developer nên làm gì?

Benchmark:

```plaintext
cost / successful task
turns / successful task
retry rate
context growth
latency / solved task
```

Nếu model đắt hơn 2× nhưng cần ít hơn 4 turns, model đó có thể thực tế rẻ hơn.

**Nguồn:** [AWS — Beyond the price per token](https://aws.amazon.com/blogs/machine-learning/beyond-the-price-per-token-choosing-the-right-openai-model-on-amazon-bedrock-for-your-workload/)

* * *

# 📁 Content-Aware File Automation

## AWS dùng Bedrock để route file theo nội dung thay vì filename

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

Một pattern enterprise rất quen:

```plaintext
partner uploads file via SFTP
```

Sau đó routing dựa vào:

```plaintext
invoice_*.pdf
contract_*.pdf
```

Regex này dễ vỡ khi external partner đổi naming conventions.

AWS đề xuất:

```plaintext
file arrives
  -> inspect actual content
  -> classify
  -> route
```

### Pipeline

AWS Transfer Family nhận file.

EventBridge phát event.

SQS buffer request.

Lambda xử lý:

*   text trực tiếp;
    
*   PDF qua Textract;
    
*   image bằng multimodal input.
    

Amazon Nova Lite trên Bedrock phân loại file.

Kết quả đi tới:

*   destination prefix;
    
*   hoặc human review nếu confidence thấp.
    

### Tác động với developer

AI rất phù hợp ở nơi:

```plaintext
format biến đổi
semantics ổn định
```

Filename có thể thay đổi.

Nội dung:

```plaintext
invoice
contract
report
```

vẫn giữ semantic category.

### Developer nên làm gì?

Không để classifier tự quyết 100% với low-confidence result.

Nên có:

```plaintext
confidence threshold
  -> route automatically

below threshold
  -> human review
```

Và giữ DLQ cho lỗi pipeline.

**Nguồn:** [AWS — Build AI-powered file classification with AWS Transfer Family](https://aws.amazon.com/blogs/storage/build-ai-powered-file-classification-with-aws-transfer-family/)

* * *

# 🌐 Open Data Infrastructure

## Common Crawl: từ 5 tỷ lên khoảng 300 tỷ web pages trên AWS

> **Tin mở rộng 24–72 giờ — công bố 11/09/2026**

AWS nhìn lại mối quan hệ với Common Crawl.

Năm 2012, khi Common Crawl tham gia AWS Public Data Sets program, corpus khoảng:

```plaintext
5 billion pages
```

Hiện tại corpus đã lên khoảng:

```plaintext
300 billion pages
```

ở petabyte scale.

Common Crawl được sử dụng rộng trong:

*   search research;
    
*   NLP;
    
*   large-scale analytics;
    
*   AI training datasets.
    

AWS Open Data Sponsorship Program host repository mà không tính phí cho Common Crawl.

### Tác động với developer

AI ecosystem không chỉ được xây bởi:

```plaintext
GPUs
models
```

mà còn bởi public infrastructure lâu đời:

```plaintext
web crawlers
object storage
open datasets
reproducible corpora
```

Nhiều breakthrough hiện tại dựa trên systems được xây từ trước khi “generative AI” trở thành mainstream.

### Developer nên làm gì?

Nếu dùng large public datasets:

*   lưu crawl/version ID;
    
*   không coi “Common Crawl” là một static dataset;
    
*   lọc duplicates;
    
*   document preprocessing;
    
*   giữ provenance của training/evaluation samples.
    

**Nguồn:** [AWS — How Common Crawl and AWS Open Data built the foundation for the AI revolution](https://aws.amazon.com/blogs/publicsector/how-common-crawl-and-aws-open-data-built-the-foundation-for-the-ai-revolution/)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Post-quantum DNSSEC trên 1.1.1.1 | Đưa ML‑DSA‑44 vào Internet-scale validation và phơi bày vấn đề packet size + downgrade protection thực tế. |
| 2 | Copilot agentic code review | AI reviewer bắt đầu dùng shell/tests để kiểm chứng findings thay vì chỉ đọc diff bằng LLM. |
| 3 | Cloudflare CASB automatic remediation | Security posture management tiến từ alert queue sang event-driven closed-loop remediation. |
| 4 | MCP Apps trên AgentCore | MCP đang tiến từ tool protocol thành portable interactive application layer cho nhiều AI hosts. |
| 5 | Cost per successful AI task | Agent economics phụ thuộc turn count và context growth nhiều hơn nominal token price. |

* * *

# 🛠 Công cụ đáng thử

## sample-agentcore-mcp-apps

Repository thực hành đáng thử nhất hôm nay nếu muốn hiểu MCP Apps.

AWS sample cho thấy đầy đủ:

```plaintext
MCP tools
MCP resources
interactive widgets
AgentCore Runtime
Gateway
Lambda
DynamoDB
```

[github.com/aws-samples/sample-agentcore-mcp-apps](https://github.com/aws-samples/sample-agentcore-mcp-apps)

* * *

## Cloudflare 1.1.1.1 ML‑DSA‑44 test

Nếu đang nghiên cứu post-quantum DNS, Cloudflare có test zone để quan sát kích thước response và TCP fallback:

```plaintext
dig @1.1.1.1 valid.mldsa44.dnstest.dev +dnssec
```

Không phải tool production mới, nhưng là một test case rất hữu ích cho networking engineers.

[Cloudflare — Post-quantum DNSSEC](https://blog.cloudflare.com/post-quantum-dnssec-1111/)

* * *

## Copilot code review

Nếu repository đã dùng Copilot review, nên test lại Lite effort level với PR có:

*   build failure;
    
*   regression test;
    
*   logic issue;
    
*   security-sensitive code.
    

Mục tiêu là xem reviewer mới **verify được bao nhiêu**, không phải comment được bao nhiêu.

[GitHub Copilot code review update](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/)

* * *

# 📚 Bài viết nên đọc

## 1.1.1.1 now supports post-quantum DNSSEC

Bài networking/security hay nhất hôm nay.

Nó cho thấy một lesson rất quan trọng:

> Standardize algorithm là phần dễ. Deploy algorithm vào protocol thực tế mới khó.

[Đọc trên Cloudflare](https://blog.cloudflare.com/post-quantum-dnssec-1111/)

* * *

## Beyond the price per token

Đây là bài đáng đọc nhất nếu team đang benchmark nhiều model.

Key insight:

```plaintext
cost per token
```

chỉ có ý nghĩa nếu:

```plaintext
task success rate
turn count
retries
```

gần giống nhau.

[Đọc trên AWS](https://aws.amazon.com/blogs/machine-learning/beyond-the-price-per-token-choosing-the-right-openai-model-on-amazon-bedrock-for-your-workload/)

* * *

## Build interactive MCP Apps using Amazon Bedrock AgentCore

Một bài practical tốt để hiểu MCP Apps không chỉ là “tool trả HTML”, mà là:

```plaintext
tool discovery
resources
structured payload
sandboxed widget
backend authorization
```

[Đọc trên AWS](https://aws.amazon.com/blogs/machine-learning/build-interactive-mcp-apps-using-amazon-bedrock-agentcore/)

* * *

## Introducing automatic remediation policies with Cloudflare CASB

Đáng đọc với platform/security engineer vì bài viết mô tả luôn implementation:

```plaintext
Queue
  -> Worker
  -> Workflow
  -> vendor API
```

thay vì chỉ nói feature ở product level.

[Đọc trên Cloudflare](https://blog.cloudflare.com/casb-policies/)

* * *

# 🚀 GitHub Repository nổi bật

## aws-samples/sample-agentcore-mcp-apps

Repository nổi bật nhất hôm nay.

Đây là implementation tham khảo khá rõ cho việc giữ:

```plaintext
MCP protocol
```

mỏng và để business logic tiếp tục nằm trong service layer.

[github.com/aws-samples/sample-agentcore-mcp-apps](https://github.com/aws-samples/sample-agentcore-mcp-apps)

* * *

## modelcontextprotocol/ext-apps

Nếu quan tâm MCP Apps ở level specification/SDK thay vì AWS deployment, extension package này đáng theo dõi.

Nó cung cấp primitives để register interactive app resources và widgets theo chuẩn MCP Apps.

[github.com/modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps)

* * *

# 💬 Góc nhìn của mình

Điểm thú vị nhất hôm nay là sự dịch chuyển từ:

```plaintext
AI gives advice
```

sang:

```plaintext
system takes action
```

Copilot không chỉ nói:

> Có lẽ test này fail.

Nó có thể chạy test.

CASB không chỉ nói:

> File này public.

Nó revoke access.

MCP tool không chỉ nói:

> Có ba booking.

Nó render interactive UI để user thao tác.

Đây là progress tốt.

Nhưng mỗi bước từ:

```plaintext
observe
```

sang:

```plaintext
act
```

đều tăng yêu cầu về guardrail.

Automation tốt cần ít nhất bốn thứ:

```plaintext
trigger
authority
idempotency
audit
```

Thiếu một trong số đó, “agentic” rất dễ trở thành “unpredictable”.

Post-quantum DNSSEC là một ví dụ khác của cùng principle.

Không đủ để hỗ trợ ML‑DSA‑44.

System còn phải biết:

> Khi nào bắt buộc dùng nó?

Nếu không, attacker chỉ cần chọn đường yếu hơn.

Điều đó cũng đúng với application security.

Nếu hệ thống có:

```plaintext
strict policy
+
weaker fallback
```

thì effective security thường bằng fallback.

Một điểm mình rất đồng ý trong bài AWS về model economics là **cost per outcome**.

Token pricing rất dễ so vì nó là một số rõ ràng.

Nhưng agent production thực tế trả tiền cho:

```plaintext
completed task
```

Một agent 8 turns không chỉ chậm hơn agent 4 turns.

Nó còn resend nhiều context hơn, gọi nhiều tools hơn, có nhiều cơ hội fail hơn.

Vì vậy optimization target nên chuyển từ:

```plaintext
cheapest model
```

sang:

```plaintext
cheapest reliable trajectory
```

Cuối cùng là MCP Apps.

Nếu MCP Apps tiếp tục được nhiều host hỗ trợ, chúng có thể trở thành một layer rất quan trọng:

```plaintext
service
  -> MCP App
  -> many AI hosts
```

Nó giống một phiên bản mới của:

```plaintext
website
  -> many browsers
```

Nhưng web đã mất hàng chục năm để học sandboxing, origin security và permission models.

MCP ecosystem sẽ phải học những bài tương tự nhanh hơn rất nhiều.

* * *

# 📝 Kết luận

14/09 là một ngày cuối tuần khá yên ắng ở các nguồn developer chính thức, vì vậy bản hôm nay **không cố nhồi headline mới chỉ để đủ số lượng**.

Không có product announcement kỹ thuật đủ mạnh trong đúng cửa sổ 24 giờ mà vừa được xác minh vừa không lặp bản 13/09.

Bản hôm nay vì vậy mở rộng có chọn lọc sang **7 nội dung ngày 11/09/2026**, vẫn nằm trong cửa sổ tối đa 72 giờ:

*   Cloudflare post-quantum DNSSEC;
    
*   GitHub Copilot code review;
    
*   Cloudflare CASB automation;
    
*   MCP Apps trên AgentCore;
    
*   AI model cost-per-outcome;
    
*   AI-powered file routing;
    
*   Common Crawl open-data infrastructure.
    

Ba việc đáng thử sau bản tin:

1.  Nếu benchmark agents, chuyển metric từ **cost/token sang cost/successful task**.
    
2.  Nếu automation có quyền sửa trạng thái production, yêu cầu **durable execution + idempotency + audit logs**.
    
3.  Nếu đang xây MCP integration, tách **protocol/UI layer khỏi business logic và authorization layer**.
    

Thông điệp lớn hôm nay:

**Automation chỉ thực sự tốt khi nó vừa hành động được, vừa chứng minh được vì sao hành động đó đúng.**

* * *

# 🔗 Nguồn tham khảo

1.  [Cloudflare — 1.1.1.1 now supports post-quantum DNSSEC](https://blog.cloudflare.com/post-quantum-dnssec-1111/)
    
2.  [GitHub — Auto-resolution and analysis updates in Copilot code review](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/)
    
3.  [Cloudflare — Introducing automatic remediation policies with Cloudflare CASB](https://blog.cloudflare.com/casb-policies/)
    
4.  [AWS — Build interactive MCP Apps using Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/build-interactive-mcp-apps-using-amazon-bedrock-agentcore/)
    
5.  [AWS — Beyond the price per token](https://aws.amazon.com/blogs/machine-learning/beyond-the-price-per-token-choosing-the-right-openai-model-on-amazon-bedrock-for-your-workload/)
    
6.  [AWS — Build AI-powered file classification with AWS Transfer Family](https://aws.amazon.com/blogs/storage/build-ai-powered-file-classification-with-aws-transfer-family/)
    
7.  [AWS — How Common Crawl and AWS Open Data built the foundation for the AI revolution](https://aws.amazon.com/blogs/publicsector/how-common-crawl-and-aws-open-data-built-the-foundation-for-the-ai-revolution/)