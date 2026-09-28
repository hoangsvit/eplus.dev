---
title: "Daily Tech Brief — 28/09/2026"
seoTitle: "Daily Tech Brief — 28/09/2026"
seoDescription: "Cloudflare cho biết automated traffic đã vượt human traffic từ tháng 05/2026; AWS đưa messaging và SES workflows vào MCP agent skills, trong khi GitHub tiếp tục phát triển agent memory, PR telemetry và AI governance.
"
datePublished: 2026-09-28T01:42:26.304Z
cuid: cmukl1ii100000agm0up72o08
slug: daily-tech-brief-28-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/effed229-8624-4de0-b8b5-ca1975014dcc.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/0a62dbed-e119-4e0f-bf28-d83161cef89b.png
tags: cloudflare, aws, github-copilot, ai-agents, model-context-protocol, mcp, agentic-web, daily-tech-brief, daily-tech-brief-28-09-2026

---

> Internet đang bước vào một giai đoạn mà “người dùng” ngày càng không còn đồng nghĩa với “con người”. Cloudflare cho biết automated traffic đã vượt human traffic từ tháng 05/2026; cùng lúc, hạ tầng developer đang thích nghi với agent bằng MCP skills, persistent memory, policy validation và telemetry chi tiết hơn. Bản hôm nay ưu tiên độ mới: chỉ có một nguồn chính thức đủ mạnh trong 24 giờ, vì vậy phần còn lại được mở rộng có kiểm soát tới 72 giờ và đánh dấu rõ.

* * *

## Executive Summary

Ngày 28/09/2026 rơi vào đầu tuần, và lượng công bố kỹ thuật chính thức trong 24 giờ vừa qua khá ít. Tin đáng chú ý nhất đến từ Cloudflare nhân dịp công ty tròn 16 năm.

Trong Annual Founders’ Letter ngày 27/09, Cloudflare đưa ra một con số rất đáng để developer chú ý: automated traffic đã vượt human traffic từ **tháng 05/2026**, sớm hơn dự báo ban đầu của Cloudflare là nửa cuối năm 2027.

Nếu xu hướng hiện tại tiếp tục, Cloudflare dự đoán automated traffic có thể lớn gấp **1.000 lần human traffic trong vòng năm năm**.

Đây không chỉ là một thống kê Internet thú vị.

Nó đặt ra một bài toán kiến trúc mới:

```plaintext
website
  ->
human visitors
  +
search crawlers
  +
AI crawlers
  +
autonomous agents.
```

Một agent có thể đọc hàng trăm hoặc hàng nghìn trang để trả lời một câu hỏi duy nhất. Cloudflare lấy ví dụ agent khảo sát khoảng 1.000 menu nhà hàng nhưng cuối cùng chỉ giới thiệu một nơi. Một website có thể phải phục vụ request cho agent mà không nhận được traffic, conversion hay revenue tương ứng.

Cloudflare cho biết hơn một nửa nội dung mà các “good bots” fetch không thay đổi kể từ lần truy cập trước. Điều đó mở ra một hướng tối ưu rất rõ: thay vì crawler tải lại toàn bộ tài nguyên, Internet cần cơ chế giúp agent chỉ lấy phần thực sự thay đổi.

Đây có thể trở thành một lớp infrastructure mới:

```plaintext
agent discovery
  ->
change detection
  ->
efficient retrieval
  ->
attribution
  ->
compensation.
```

Ở phía developer tooling, loạt công bố ngày 25/09 vẫn nằm trong cửa sổ mở rộng 72 giờ và tạo thành một theme khá nhất quán.

AWS End User Messaging và Amazon SES đã xuất bản **AI agent skills cho AWS MCP Server**. Developer có thể yêu cầu coding agent thực hiện những workflow như verify sending identity, thiết lập RCS agent hoặc gửi production email bằng natural language. AWS cho biết các skills này hoạt động với Claude Code, Codex, Cursor và Kiro.

Đây là một bước tiến quan trọng của MCP ecosystem.

Thay vì MCP server chỉ cung cấp một danh sách tool primitive, provider có thể đóng gói:

```plaintext
tool
  +
validated instructions
  +
workflow knowledge.
```

Agent vì vậy không chỉ biết “API nào tồn tại” mà còn biết trình tự hợp lệ để hoàn thành một tác vụ.

GitHub cũng tiếp tục đẩy coding agent theo hướng stateful hơn. Agentic autofix hiện có thể đọc và ghi **Copilot Memory**, cho phép security remediation tái sử dụng secure-development pattern đặc thù của repository. Cả agentic autofix và Copilot Memory hiện vẫn ở public preview.

Song song đó, GitHub bổ sung `pull_request_review_times` vào Copilot usage metrics API, tách PR review thành ba giai đoạn:

```plaintext
ready -> first review
first review -> final review
final review -> merge.
```

Đây là kiểu telemetry cần thiết nếu doanh nghiệp muốn trả lời câu hỏi:

> AI có thực sự làm software delivery nhanh hơn hay chỉ làm code xuất hiện nhanh hơn?

Ở lớp governance, GitHub thêm validator cho enterprise-managed Copilot settings. Malformed JSON, unsupported configuration và invalid team mapping giờ có thể được phát hiện trước khi developer tưởng rằng policy đã được enforce.

AWS cũng có một nhóm cập nhật infrastructure đáng chú ý: customer-managed KMS keys cho Amazon Transcribe custom resources, billing-context API dành cho cả application lẫn AI agent, DataSync monitoring dashboard và disaster recovery cho Graviton/arm64 workloads.

Tổng thể, theme của bản hôm nay là:

**Internet và developer infrastructure đang được thiết kế lại cho một thế giới nơi agent vừa là người dùng, vừa là developer, vừa là operator.**

* * *

## Hôm nay có gì nổi bật?

### 1\. Web traffic đang chuyển từ human-first sang agent-aware

Trong nhiều năm, web optimization xoay quanh:

```plaintext
user
browser
search crawler.
```

Agent thêm một actor mới có hành vi hoàn toàn khác.

Human thường:

```plaintext
search
  ->
open vài pages
  ->
choose.
```

Agent có thể:

```plaintext
fetch hundreds of pages
  ->
compare
  ->
return one answer.
```

Điều đó thay đổi economics của request.

Request volume không còn tỷ lệ trực tiếp với:

```plaintext
attention
ad impressions
conversion.
```

Developer cần bắt đầu xem:

```plaintext
bot traffic
agent traffic
human traffic
```

như ba workload khác nhau.

### 2\. MCP đang tiến từ tool transport thành workflow layer

Một raw API tool có thể nói:

```plaintext
send_email()
```

nhưng production workflow thường cần:

```plaintext
verify identity
configure domain
validate permissions
create content
send
inspect result.
```

AWS agent skills cho MCP Server cho thấy provider có thể đóng gói procedural knowledge ngay cạnh tool interface.

Đây là khác biệt giữa:

```plaintext
agent can call API
```

và:

```plaintext
agent knows how to complete a supported workflow.
```

### 3\. Agent productionization đang hội tụ với software engineering truyền thống

Memory cần lifecycle.

Policy cần validation.

Workflow cần telemetry.

Cloud operations cần encryption và audit trail.

Agent engineering càng trưởng thành càng ít giống “prompt engineering” đơn thuần và càng giống:

```plaintext
distributed systems
security engineering
platform engineering.
```

* * *

# Tin nổi bật

## Agentic Web

### 1\. Automated traffic đã vượt human traffic

**Ngày công bố: 27/09/2026 — trong 24 giờ.**

Trong Annual Founders’ Letter 2026, Cloudflare cho biết công ty từng dự báo automated traffic sẽ vượt human traffic vào nửa cuối năm 2027.

Thực tế, theo dữ liệu Cloudflare:

```plaintext
crossover happened in May 2026.
```

Cloudflare cho rằng sự gia tăng của:

```plaintext
AI agents
AI crawlers
```

đã kéo mốc này lên sớm đáng kể.

Nếu xu hướng hiện tại tiếp tục, Cloudflare dự báo automated traffic có thể đạt:

```plaintext
1,000 × human traffic
```

trong năm năm tới.

### Tác động với developer

Capacity planning dựa chủ yếu trên human usage có thể ngày càng sai.

Developer sẽ cần phân biệt:

```plaintext
human sessions
search bots
AI crawlers
autonomous agents
abusive automation.
```

Rate limiting đơn giản theo IP cũng có thể không còn đủ.

### Developer nên làm gì?

Bắt đầu instrument traffic theo actor class.

Theo dõi:

```plaintext
request volume
cache hit rate
origin load
useful conversion
crawler identity.
```

Đừng mặc định mọi bot request đều có cùng giá trị hoặc cùng cost profile.

**Nguồn:** [Cloudflare — 2026 Annual Founders’ Letter](https://blog.cloudflare.com/cloudflares-2026-annual-founders-letter/)

* * *

## Web Infrastructure

### 2\. Agent crawling đang tạo bài toán “tragedy of the commons”

**Ngày công bố: 27/09/2026 — trong 24 giờ.**

Cloudflare mô tả một vấn đề economics khá trực quan.

Một người hỏi AI agent:

```plaintext
nên ăn trưa ở đâu?
```

Agent có thể đọc:

```plaintext
~1,000 restaurant menus
```

để cuối cùng đề xuất:

```plaintext
1 restaurant.
```

Restaurant được chọn có thể nhận customer.

999 website còn lại vẫn phải chịu:

```plaintext
compute
bandwidth
origin load
```

nhưng không nhận conversion tương ứng.

Cloudflare cũng cho biết dữ liệu của họ cho thấy:

```plaintext
hơn một nửa
```

những gì good bots fetch không thay đổi kể từ lần fetch trước.

### Tác động với developer

Caching chỉ giải quyết một phần.

Long-term solution có thể cần:

```plaintext
content-change signaling
delta retrieval
agent-aware APIs
economic attribution.
```

### Developer nên làm gì?

Với site có crawler volume cao:

đo tỷ lệ:

```plaintext
unchanged responses / bot requests.
```

Nếu tỷ lệ cao, ưu tiên:

```plaintext
strong ETag
Last-Modified
conditional requests
CDN caching.
```

Agent-friendly không đồng nghĩa với phục vụ lại cùng một payload vô hạn.

**Nguồn:** [Cloudflare — 2026 Annual Founders’ Letter](https://blog.cloudflare.com/cloudflares-2026-annual-founders-letter/)

* * *

## Developer Platforms

### 3\. Cloudflare nói hơn 7 triệu developer đang xây dựng trên developer platform

**Ngày công bố: 27/09/2026 — trong 24 giờ.**

Cloudflare cho biết hiện có:

```plaintext
>7 million developers
```

đang xây dựng trên developer platform của họ.

Founders’ Letter cũng liên hệ sự tăng trưởng website từ giữa năm 2025 với khả năng AI giúp những người trước đây không biết code có thể tạo application.

Cloudflare gọi đây là một cohort creator mới được thúc đẩy bởi:

```plaintext
vibe coding tools.
```

### Tác động với developer

Barrier để tạo application đang giảm.

Điều này có thể làm số application tăng nhanh hơn số experienced developer.

Kết quả là nhu cầu cho:

```plaintext
secure defaults
managed deployment
automated testing
guardrails
```

sẽ tăng.

### Developer nên làm gì?

Nếu xây platform hoặc framework:

đừng giả định user luôn hiểu:

```plaintext
IAM
secrets
networking
caching
observability.
```

Safe-by-default configuration ngày càng quan trọng.

**Nguồn:** [Cloudflare — 2026 Annual Founders’ Letter](https://blog.cloudflare.com/cloudflares-2026-annual-founders-letter/)

* * *

# MCP + AI Agents

## 4\. AWS đưa messaging và SES workflows thành AI agent skills

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

AWS End User Messaging và Amazon SES đã xuất bản:

```plaintext
AI agent skills
```

cho:

```plaintext
AWS MCP Server.
```

Developer có thể yêu cầu coding agent bằng natural language thực hiện workflow như:

```plaintext
verify sending identity
send production email
configure RCS agent
send rich message.
```

AWS xác nhận các skills có thể tích hợp với:

```plaintext
Claude Code
Codex
Cursor
Kiro.
```

Với Claude Code, Codex và Cursor, `aws-core` plugin bundle MCP server cùng curated skills.

### Tác động với developer

MCP ecosystem đang tiến thêm một lớp abstraction:

```plaintext
API
  ->
MCP tool
  ->
agent skill
  ->
workflow.
```

Skill có thể chứa provider-maintained procedural knowledge thay vì buộc model tự suy luận mọi bước từ documentation.

### Developer nên làm gì?

Khi xây MCP integration nội bộ:

đừng chỉ expose 50 low-level tools.

Xác định top workflows rồi đóng gói:

```plaintext
validated sequence
constraints
expected outcome.
```

Agent cần ít choice hơn nhưng context tốt hơn thường đáng tin cậy hơn.

**Nguồn:** [AWS — Messaging and SES agent skills for AWS MCP Server](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-messaging-ses-ai-skills-mcp-server/)

* * *

# AI + Security

## 5\. Agentic autofix dùng Copilot Memory

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

GitHub agentic autofix giờ có thể sử dụng Copilot Memory nếu customer bật tính năng này.

Trước khi xử lý security alert, agent đọc relevant memories.

Sau khi tạo fix, fix pattern có thể được lưu lại để sử dụng trong:

```plaintext
future autofix
Copilot code review
Copilot cloud agent.
```

Cả hai tính năng vẫn ở:

```plaintext
public preview.
```

### Tác động với developer

Security agent bắt đầu có:

```plaintext
repository-specific learning.
```

Nhưng persistent memory cũng có nguy cơ:

```plaintext
stale knowledge
obsolete architecture
incorrect learned pattern.
```

### Developer nên làm gì?

Đánh giá memory như một data store.

Cần nghĩ tới:

```plaintext
provenance
validity
invalidation
scope.
```

Một memory từng đúng không có nghĩa luôn đúng.

**Nguồn:** [GitHub — Agentic autofix now uses Copilot Memory](https://github.blog/changelog/2026-09-25-agentic-autofix-now-uses-copilot-memory/)

* * *

# Engineering Analytics

## 6\. GitHub đo riêng ba giai đoạn PR review

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

Copilot usage metrics API thêm:

```plaintext
pull_request_review_times.
```

Metric gồm median và p90 cho:

```plaintext
ready -> first review
first -> final review
final -> merge.
```

### Tác động với developer

Một PR chậm không còn là một metric mơ hồ.

Team có thể phân biệt:

```plaintext
reviewer queue
review churn
merge delay.
```

Đây là nền tảng tốt hơn để đo tác động thật của AI coding tools.

### Developer nên làm gì?

Theo dõi:

```plaintext
median + p90
```

và correlate với:

```plaintext
PR size
repository
AI-assisted changes
test failures.
```

Không dùng metric để xếp hạng cá nhân reviewer.

**Nguồn:** [GitHub — Usage metrics API adds pull request review stages](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/)

* * *

# AI Governance

## 7\. GitHub thêm validator cho enterprise Copilot policies

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

GitHub Enterprise AI controls có validator cho:

```plaintext
copilot/managed-settings.json
copilot/team-mappings.json
referenced team settings.
```

Validator phát hiện:

```plaintext
malformed JSON
unsupported configuration
invalid team mappings
enforcement-blocking errors.
```

### Tác động với developer

AI policy file đang trở thành một security artifact.

Policy sai syntax có thể đồng nghĩa:

```plaintext
intended restriction
!= effective restriction.
```

### Developer nên làm gì?

Treat AI policy như infrastructure-as-code:

```plaintext
review
validate
commit
verify effective state.
```

**Nguồn:** [GitHub — Enterprise managed settings validator](https://github.blog/changelog/2026-09-25-enterprise-managed-settings-in-product-validator/)

* * *

# CI/CD

## 8\. GitHub Actions đổi semantics của workflow-run count lớn

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

Nếu query workflow runs có hơn:

```plaintext
2,500 records
```

GitHub Actions API/UI giờ trả:

```plaintext
2,500+
```

thay vì cố tính exact count.

Paginated results vẫn tối đa:

```plaintext
1,000 items.
```

### Tác động với developer

Automation đang dùng `total_count` như exact analytics metric có thể sai assumption.

### Developer nên làm gì?

Với dataset lớn:

partition query theo:

```plaintext
date
branch
status
workflow.
```

Sau đó aggregate.

**Nguồn:** [GitHub — Changes to query results in Actions API and UI](https://github.blog/changelog/2026-09-25-changes-to-query-results-in-the-github-actions-api-and-ui/)

* * *

# Cloud Security

## 9\. Amazon Transcribe hỗ trợ customer-managed KMS keys

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

Amazon Transcribe cho phép encrypt:

```plaintext
custom vocabularies
vocabulary filters
custom language models
```

bằng customer-managed AWS KMS key.

Nếu không cung cấp key riêng, AWS-owned encryption vẫn được dùng.

KMS usage được ghi vào:

```plaintext
AWS CloudTrail.
```

### Tác động với developer

Enterprise có thêm control cho:

```plaintext
key ownership
permissions
revocation
auditing.
```

Điều này đặc biệt hữu ích khi custom vocabulary chứa terminology nhạy cảm của tổ chức.

### Developer nên làm gì?

Nếu opt-in customer-managed key:

thiết kế đồng thời:

```plaintext
key policy
rotation
monitoring
recovery.
```

Encryption control mà không có key-management process có thể tự tạo outage.

**Nguồn:** [AWS — Amazon Transcribe customer-managed KMS keys](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-transcribe/)

* * *

# FinOps + Agents

## 10\. AWS Billing Context API giúp agent hiểu lịch sử billing relationship

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

AWS Billing and Cost Management thêm:

```plaintext
ListBillingViewSegments.
```

API trả billing context của account trong khoảng thời gian yêu cầu.

Nếu account thay đổi:

```plaintext
payer
organization
billing group
```

giữa kỳ, API chia thời gian thành các segment tương ứng.

AWS nói API có thể được gọi:

```plaintext
directly
through an AI agent.
```

API không trả cost/usage data.

### Tác động với developer

Một FinOps agent không thể mặc định:

```plaintext
current billing relationship
=
historical billing relationship.
```

### Developer nên làm gì?

Pipeline phân tích cost nên:

```plaintext
resolve billing context
  ->
resolve effective interval
  ->
query cost data.
```

**Nguồn:** [AWS — Billing Context API](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-billing-and-cost-management-billing-context-api/)

* * *

# Cloud Operations

## 11\. AWS DataSync có dashboard theo dõi toàn account

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

DataSync console giờ có monitoring dashboard cho toàn bộ task executions.

Dashboard hiển thị:

```plaintext
status
transfer rate
duration
transferred data
transferred files
failures.
```

Trước đây operator phải xem từng execution hoặc tự dựng CloudWatch dashboard.

### Tác động với developer

Operational visibility trở thành built-in primitive thay vì custom project.

Điều này đặc biệt hữu ích với:

```plaintext
large migrations
recurring transfers
concurrent tasks.
```

### Developer nên làm gì?

Nếu đang duy trì dashboard riêng chỉ để quan sát DataSync:

đánh giá xem native dashboard đã cover đủ use case chưa.

Giữ custom telemetry cho:

```plaintext
cross-service correlation
SLO
business-specific alerts.
```

**Nguồn:** [AWS — DataSync monitoring dashboard](https://aws.amazon.com/about-aws/whats-new/2026/09/datasync-monitoring-dashboard/)

* * *

# Resilience

## 12\. AWS Elastic Disaster Recovery hỗ trợ Graviton source servers

**Ngày công bố: 25/09/2026 — mở rộng 24–72 giờ.**

AWS Elastic Disaster Recovery giờ hỗ trợ:

```plaintext
arm64 / Graviton source servers.
```

DRS tự detect architecture và recover workload sang:

```plaintext
Graviton instances.
```

Architecture được giữ:

```plaintext
arm64 -> arm64.
```

AWS cho biết không cần cấu hình bổ sung.

### Tác động với developer

Arm migration không nên chỉ bao gồm:

```plaintext
build
runtime
performance.
```

Disaster recovery cũng phải có architecture parity.

### Developer nên làm gì?

Nếu production đã chuyển sang Graviton:

test recovery thực tế.

“Supported” không thay thế:

```plaintext
recovery drill
RTO measurement
application validation.
```

**Nguồn:** [AWS — Elastic Disaster Recovery supports Graviton](https://aws.amazon.com/about-aws/whats-new/2026/09/elastic-disaster-recovery-graviton/)

* * *

# Top 5 đáng chú ý

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Automated traffic vượt human traffic | Agent không còn là edge case của web traffic; nó đang trở thành workload chính. |
| 2 | Agent-era web economics | AI crawler có thể tạo origin cost mà không tạo traffic/revenue tương ứng, buộc web phải có retrieval model hiệu quả hơn. |
| 3 | AWS MCP agent skills | MCP bắt đầu chuyển từ danh sách tools sang provider-maintained workflow knowledge. |
| 4 | Copilot Memory + autofix | Security agent bắt đầu tái sử dụng knowledge riêng của repository. |
| 5 | PR review telemetry | AI productivity được nối với software-delivery bottleneck thay vì chỉ đếm generated code. |

* * *

# Công cụ đáng thử

## AWS MCP Server + Messaging/SES agent skills

Đây là công cụ đáng thử nhất trong cửa sổ mở rộng hôm nay.

Điểm thú vị không phải chỉ là:

```plaintext
agent can send email.
```

Điểm quan trọng là provider đóng gói workflow guidance để agent biết:

```plaintext
prerequisites
order of operations
validation.
```

Nếu đang xây internal MCP server, hãy thử áp dụng cùng pattern:

```plaintext
primitive tools
  +
curated task skills.
```

[Đọc công bố của AWS](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-messaging-ses-ai-skills-mcp-server/)

* * *

# Bài viết nên đọc

## Cloudflare’s 2026 Annual Founders’ Letter

Đây là bài nên đọc nhất hôm nay.

Không phải vì nó là một changelog kỹ thuật.

Nó đưa ra một câu hỏi lớn hơn:

> Internet sẽ hoạt động thế nào khi phần lớn request được tạo bởi machines thay vì humans?

Những vấn đề Cloudflare nêu ra — crawler efficiency, economics của content, discovery cho new entrants và agent-driven commerce — đều có khả năng trở thành bài toán developer trong vài năm tới.

[Đọc trên Cloudflare](https://blog.cloudflare.com/cloudflares-2026-annual-founders-letter/)

* * *

# GitHub Repository nổi bật

## github/codeql

Không có repository mới đủ mạnh trong 24 giờ để thay bằng một lựa chọn kém chất lượng.

Repository đáng theo dõi trong cửa sổ 72 giờ vẫn là CodeQL, liên quan trực tiếp tới làn sóng cập nhật security-analysis ngày 25/09.

Điểm đáng học từ CodeQL là static analysis hiện đại không chỉ là pattern matching.

Nó cần:

```plaintext
language model
framework model
data flow
source/sink semantics
precision tuning.
```

Đây cũng là kiến trúc đáng tham khảo khi xây security tooling cho agent-generated code.

[github.com/github/codeql](https://github.com/github/codeql)

* * *

# Góc nhìn của mình

Con số đáng suy nghĩ nhất hôm nay là:

```plaintext
automated traffic > human traffic.
```

Web architecture phần lớn được thiết kế trong một thế giới nơi machine traffic là phần phụ.

Robots.txt tồn tại.

Search crawler tồn tại.

Monitoring bots tồn tại.

Nhưng economic center vẫn là:

```plaintext
human attention.
```

Agent đảo ngược assumption đó.

Một human có thể đọc 5 trang trước khi mua hàng.

Một agent có thể đọc:

```plaintext
500
1,000
10,000
```

resources trước khi đưa ra một answer.

Nếu origin trả cùng một tài liệu không đổi hàng nghìn lần thì infrastructure đang lãng phí tài nguyên.

HTTP thực ra đã có nhiều primitive cần thiết:

```plaintext
ETag
If-None-Match
Last-Modified
cache-control.
```

Vấn đề là agent ecosystem cần sử dụng chúng tốt hơn.

Mình nghĩ bước tiếp theo sẽ không chỉ là:

```plaintext
make site readable by AI.
```

Mà là:

```plaintext
make site efficiently queryable by AI.
```

Đó là hai mục tiêu khác nhau.

Điểm thứ hai là AWS MCP skills.

MCP giải quyết một vấn đề quan trọng:

```plaintext
model <-> tool interface.
```

Nhưng tool discovery không giải quyết:

```plaintext
workflow knowledge.
```

Nếu agent thấy 100 API methods, model vẫn phải tự suy luận:

```plaintext
method nào trước
permission nào cần
state nào hợp lệ.
```

Skill layer có thể trở thành equivalent của:

```plaintext
runbook for agents.
```

Provider hiểu API nhất.

Vì vậy provider-maintained skill thường có khả năng đáng tin hơn prompt được copy từ một blog ngẫu nhiên.

Điểm thứ ba là persistent agent memory.

Memory có thể tăng chất lượng agent.

Nhưng nó cũng biến agent thành stateful system.

Khi đã có state, developer phải giải quyết:

```plaintext
freshness
invalidation
ownership
provenance.
```

Một secure coding pattern năm ngoái có thể trở thành anti-pattern hôm nay.

Cuối cùng, telemetry vẫn là nền tảng.

Nếu agent giúp code nhanh hơn nhưng:

```plaintext
review queue grows
CI failures rise
merge latency increases
```

thì productivity của toàn hệ thống chưa chắc tăng.

AI engineering đang rời khỏi giai đoạn:

```plaintext
“model làm được gì?”
```

và bước sang:

```plaintext
“system vận hành tốt tới đâu?”
```

Đó là dấu hiệu tích cực.

* * *

# Kết luận

Daily Tech Brief 28/09/2026 có ít release mới trong 24 giờ, nhưng một tín hiệu rất lớn:

**machine-generated traffic đã trở thành phần trung tâm của Internet.**

Điều đó sẽ ảnh hưởng tới:

```plaintext
web architecture
caching
crawler policy
API design
content economics
observability.
```

Trong developer tooling, MCP skills, agent memory, policy validation và review telemetry cùng chỉ về một hướng:

```plaintext
agents are becoming infrastructure participants.
```

Ba việc đáng làm:

1.  Phân tách **human, crawler và agent traffic** trong observability thay vì gom tất cả vào request count.
    
2.  Khi xây MCP server, thử bổ sung **workflow-level skills** thay vì chỉ expose raw tools.
    
3.  Với stateful agents, thiết kế **memory lifecycle và telemetry** ngay từ đầu.
    

Thông điệp lớn hôm nay:

**Web không còn chỉ được xây cho con người đọc. Nó đang phải học cách phục vụ machines hiệu quả mà không tự phá vỡ economics và infrastructure của chính mình.**

* * *

# Nguồn tham khảo

1.  [Cloudflare — 2026 Annual Founders’ Letter](https://blog.cloudflare.com/cloudflares-2026-annual-founders-letter/)
    
2.  [AWS — Messaging and SES agent skills for AWS MCP Server](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-messaging-ses-ai-skills-mcp-server/)
    
3.  [GitHub — Agentic autofix now uses Copilot Memory](https://github.blog/changelog/2026-09-25-agentic-autofix-now-uses-copilot-memory/)
    
4.  [GitHub — Usage metrics API adds pull request review stages](https://github.blog/changelog/2026-09-25-usage-metrics-api-adds-pull-request-review-stages/)
    
5.  [GitHub — Enterprise managed settings validator](https://github.blog/changelog/2026-09-25-enterprise-managed-settings-in-product-validator/)
    
6.  [GitHub — Changes to query results in Actions API and UI](https://github.blog/changelog/2026-09-25-changes-to-query-results-in-the-github-actions-api-and-ui/)
    
7.  [AWS — Amazon Transcribe customer-managed KMS keys](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-transcribe/)
    
8.  [AWS — Billing Context API](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-billing-and-cost-management-billing-context-api/)
    
9.  [AWS — DataSync monitoring dashboard](https://aws.amazon.com/about-aws/whats-new/2026/09/datasync-monitoring-dashboard/)
    
10.  [AWS — Elastic Disaster Recovery supports Graviton](https://aws.amazon.com/about-aws/whats-new/2026/09/elastic-disaster-recovery-graviton/)
     
11.  [GitHub — CodeQL repository](https://github.com/github/codeql)