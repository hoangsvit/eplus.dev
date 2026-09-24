---
title: "Daily Tech Brief — 24/09/2026"
seoTitle: "Daily Tech Brief — 24/09/2026"
seoDescription: "Google đưa Gemma 4 chạy local vào Antigravity SDK, GitHub Copilot có sandbox và OpenTelemetry, Claude dùng khoảng 950 agents để phát hiện một hệ enzyme mới, còn GitHub Actions chính thức bỏ Node 20."
datePublished: 2026-09-24T03:45:35.807Z
cuid: cmuezohlj00000agm5tsu424p
slug: daily-tech-brief-24-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c128d5de-ea94-4f43-aa25-885b618341b0.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/6ba5b366-0f8f-48e2-947d-baeeae8704ad.png
tags: github-copilot, ai-agents, local-ai, google-antigravity, gemma-4, daily-tech-brief, litert, daily-tech-brief-24-09-2026

---

> AI agent đang đi theo hai hướng tưởng như đối lập nhưng thực ra bổ sung cho nhau: **chạy cục bộ để giữ dữ liệu trong máy** và **bị sandbox/quan sát chặt hơn khi được trao quyền thực thi**. Google đưa local models vào Antigravity SDK với Gemma 4 + LiteRT; GitHub thêm local sandboxing cho Copilot app và OpenTelemetry cho agent observability; Anthropic cho Claude chạy gần 1.000 agents để tìm một hệ enzyme mới trong dữ liệu DNA. Song song đó, GitHub Actions chính thức bỏ Node 20, Copilot code review có policy rõ hơn, còn nghiên cứu mới của GitHub/Yale đặt “wasted compute” thành một bài toán engineering có thể đo lường.

* * *

## Executive Summary

Ngày 24/09 nổi bật không phải vì có thêm một frontier model mới, mà vì **hạ tầng xung quanh agent đang trưởng thành rất nhanh**.

Google công bố Antigravity SDK hỗ trợ local AI workflows với initial support cho **Gemma 4 26B A4B chạy qua LiteRT**. Agent có thể hoạt động hoàn toàn offline trên GPU/RAM của máy developer. Google còn demo một hybrid architecture khá thực dụng: cloud model đóng vai trò planner, trong khi local agents đọc source code, audit lỗ hổng, viết patch và chạy regression tests mà code không rời khỏi máy.

Trong demo đó, Gemini 3.8 Flash chỉ dùng 95 cloud tokens cho planning dựa trên tên file và mô tả task; Google cho biết **97,2% tổng số token của recorded run được xử lý local/offline**. Đây không phải benchmark phổ quát, nhưng là một ví dụ rõ ràng cho một kiến trúc mới:

```plaintext
cloud intelligence
  +
local private execution.
```

GitHub đi theo hướng bổ sung: nếu coding agent được chạy trên máy developer thì cần một security boundary rõ ràng. **Local sandboxing trong GitHub Copilot app** hiện ở public preview, cho phép giới hạn filesystem, network và credentials theo project. Nếu hệ điều hành không thể enforce policy được yêu cầu, sandboxed shell sẽ fail thay vì âm thầm chạy unrestricted.

Một release GitHub khác ngay sát cửa sổ 24 giờ đưa **OpenTelemetry vào Copilot app**. Enterprise có thể export traces về agent sessions, model requests và tool usage sang hệ thống observability hiện có; prompt/response content mặc định không được capture.

Kết hợp hai thay đổi:

```plaintext
agent execution
  ->
sandbox boundary
  ->
telemetry
  ->
investigation
```

đang trở thành một production pattern thực sự.

Ở một hướng hoàn toàn khác, Anthropic công bố kết quả từ life-sciences lab mới: Claude được giao tìm các reverse transcriptase đáng chú ý trong database DNA rất lớn. Khoảng **950 agents chạy 21 giờ, tiêu thụ 210 triệu tokens**, và một agent phát hiện pattern dẫn tới hệ enzyme chưa được mô tả trước đó mà nhóm gọi là **array-associated reverse transcriptases (ART)**.

Anthropic nhấn mạnh function của ART vẫn chưa được xác định. Phần wet-lab vẫn do human scientists thực hiện và kết quả mới đang ở dạng preprint. Đây là distinction quan trọng: headline không nên được diễn giải thành “Claude phát minh CRISPR mới”. Điều được chứng minh là agent swarm có thể hỗ trợ search và hypothesis generation ở quy mô mà con người khó duyệt thủ công.

GitHub đồng thời chính thức **loại Node 20 khỏi GitHub Actions runners**. JavaScript actions giờ chạy Node 24 và temporary opt-out `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` không còn khả dụng. Maintainer action cũ cần chuyển `runs.using` sang `node24`.

Copilot code review cũng có thêm control: personal automatic review, review cho new pushes/draft PRs, Lite/Balanced effort và enterprise-wide default review effort.

Một bài engineering đáng đọc của GitHub mô tả cách Copilot app render pull request lên tới **một triệu dòng** cùng hàng trăm inline comments. Đây là reminder rằng AI coding workflow không chỉ tạo nhiều code hơn; UI và review infrastructure cũng phải chịu được artifact lớn hơn.

Nghiên cứu mới từ GitHub và Yale khảo sát 1.039 GitHub users ở Mỹ cho thấy 80% người trả lời quan tâm tới tooling giúp viết software tiết kiệm năng lượng hơn, 74% muốn đo environmental impact của software/development process. GitHub đề xuất biến efficiency thành loop quen thuộc:

```plaintext
find waste
  ->
benchmark
  ->
patch
  ->
test
  ->
human review.
```

OpenAI cũng có hai case đáng chú ý trong ngày. Airbnb mở rộng quyền truy cập GPT‑6 Astra và các frontier models cho engineering/product teams; CTO Airbnb cho biết development teams đang ship khoảng 80% nhiều feature hơn một năm trước, dù con số này là organizational outcome chứ không thể quy toàn bộ cho AI.

Ở Đông Nam Á, OpenAI và Grab công bố chương trình **GO Forward with AI**, dự kiến đào tạo 30.000 driver-, delivery- và merchant-partners trong hai năm. Việt Nam nằm trong nhóm thị trường dự kiến mở rộng vào năm 2027.

Bản hôm nay chọn **10 chủ đề/tài nguyên**, ưu tiên các công bố ngày 23/09 và chỉ dùng một cập nhật 22/09 có ý nghĩa trực tiếp cho theme agent observability.

* * *

## Hôm nay có gì nổi bật?

Nếu vài ngày trước câu chuyện là:

```plaintext
model intelligence
```

thì hôm nay câu chuyện là:

```plaintext
where does the agent run?
what can it access?
what can we observe?
what evidence proves it worked?
```

Google trả lời câu đầu tiên bằng:

```plaintext
local inference.
```

GitHub trả lời câu thứ hai bằng:

```plaintext
sandboxing.
```

OpenTelemetry trả lời câu thứ ba bằng:

```plaintext
traces.
```

Anthropic cho thấy câu thứ tư trong science:

```plaintext
computational discovery
  ->
human lab validation.
```

Đây là một shift rất quan trọng.

Agent càng mạnh thì architecture càng không thể chỉ là:

```plaintext
prompt -> model -> output.
```

Production agent cần:

```plaintext
planner
execution environment
permissions
tools
telemetry
evaluator
human escalation.
```

Và đôi khi execution environment tốt nhất không nằm trên cloud.

Nó nằm ngay trên máy developer.

* * *

# Tin nổi bật

## Local AI

### 1\. Google Antigravity SDK đưa AI agents chạy hoàn toàn local

Google bổ sung local model support cho:

```plaintext
Antigravity SDK.
```

Initial stack:

```plaintext
Antigravity SDK
  +
LiteRT
  +
Gemma 4 26B A4B.
```

Agent có thể chạy:

```plaintext
offline
```

trên local:

```plaintext
GPU
RAM.
```

Điều này đặc biệt phù hợp với workload chứa:

```plaintext
proprietary source code
local files
sensitive data.
```

### Hybrid orchestration

Google demo một architecture thú vị:

```plaintext
Gemini 3.8 Flash
    -> planner / architect

Gemma 4 local agents
    -> execution workers.
```

Cloud planner chỉ nhận:

```plaintext
filenames
task descriptions
```

chứ không nhận source code.

Trong recorded security-patching demo, Google báo cáo:

```plaintext
95 cloud tokens
```

và:

```plaintext
97.2% total tokens
processed locally/offline.
```

Local agents:

```plaintext
reproduce vulnerabilities
write candidate patches
critique patches
run regression tests.
```

### Tác động với developer

Privacy architecture của agent không nhất thiết phải là:

```plaintext
everything local
```

hoặc:

```plaintext
everything cloud.
```

Một lựa chọn thực tế hơn là:

```plaintext
cloud planning
  +
local sensitive execution.
```

### Developer nên làm gì?

Nếu repository không được phép gửi source ra ngoài:

benchmark hybrid agent:

```plaintext
cloud planner sees metadata
local model sees code.
```

Đo:

```plaintext
task success
local latency
VRAM/RAM
cloud tokens
privacy boundary.
```

Đừng lấy con số 97,2% của demo làm expectation cho workload của bạn.

**Nguồn:** [Google Developers Blog — Local AI Models in the Antigravity SDK](https://developers.googleblog.com/introducing-support-for-local-ai-models-in-the-antigravity-sdk/)

* * *

# Agent Security

## 2\. GitHub Copilot app có local sandboxing

GitHub đưa:

```plaintext
Local Sandboxing
```

vào Copilot app ở:

```plaintext
public preview.
```

Policy được cấu hình:

```plaintext
per project.
```

Ba boundary chính:

```plaintext
filesystem
network
credentials.
```

Filesystem có thể khai báo:

```plaintext
additional read/write
additional read-only
denied folders.
```

Network kiểm soát:

```plaintext
outbound internet
local network.
```

Credential policy quản lý:

```plaintext
Git credentials
GitHub CLI credentials.
```

### Fail closed

Chi tiết đáng chú ý nhất:

nếu operating system không thể enforce policy mà session yêu cầu:

```plaintext
sandboxed shell fails.
```

Nó không fallback thành:

```plaintext
unrestricted shell.
```

Đây là behavior đúng cho security-sensitive agent execution.

### Tác động với developer

Coding agent có shell access không còn là:

```plaintext
smarter autocomplete.
```

Nó là một process có thể:

```plaintext
read files
modify files
call network
use credentials.
```

Vì vậy principle nên là:

```plaintext
least privilege per project.
```

### Developer nên làm gì?

Với repository nhạy cảm:

bắt đầu từ policy tối thiểu:

```plaintext
repo read/write
deny unrelated folders
disable local network
restrict outbound network
no credentials unless required.
```

Sau đó mở quyền theo task.

**Nguồn:** [GitHub — Local sandboxing in the GitHub Copilot app](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/)

* * *

# Agent Observability

## 3\. GitHub Copilot app export OpenTelemetry traces

> Tin mở rộng sát cửa sổ 24 giờ — công bố 22/09/2026.

GitHub Copilot app hỗ trợ:

```plaintext
OpenTelemetry.
```

Enterprise admins có thể cấu hình telemetry tập trung qua:

```plaintext
managed-settings.json.
```

Trace có thể cho thấy:

```plaintext
agent session
model requests
tool interactions
execution flow.
```

Dữ liệu có thể gửi vào:

```plaintext
OTel-compatible observability platform.
```

GitHub lưu ý:

```plaintext
prompt
response content
```

được exclude mặc định.

### Tác động với developer

Agent debugging đang hội tụ với distributed-system debugging.

Một agent failure có thể là:

```plaintext
model failure
tool failure
network failure
permission failure
bad context
retry loop.
```

Conversation transcript không đủ để giải thích toàn bộ.

### Developer nên làm gì?

Nếu chạy agents trong enterprise:

chuẩn hóa spans cho:

```plaintext
model.call
tool.call
shell.command
approval
retry
evaluation.
```

Sau đó correlate:

```plaintext
latency
token cost
tool errors
task outcome.
```

**Nguồn:** [GitHub — OpenTelemetry in the GitHub Copilot app](https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/)

* * *

# AI for Science

## 4\. Claude dùng khoảng 950 agents để tìm một hệ enzyme chưa được mô tả trước đó

Anthropic công bố life-sciences research group và laboratory mới.

Một trong những chương trình đầu tiên yêu cầu Claude tìm:

```plaintext
interesting reverse transcriptases
```

trong một database DNA lớn.

Anthropic cho biết:

```plaintext
~950 agents
21 hours
210 million tokens.
```

Một agent phát hiện repeating DNA pattern nằm cạnh gene của một reverse transcriptase khác thường.

Sau computational analysis và human lab testing, team xác định đây là một previously uncharacterized system và đặt tên:

```plaintext
array-associated reverse transcriptases
ART.
```

### Cần đọc headline cẩn thận

Anthropic chưa biết:

```plaintext
primary function
```

của ART.

Research hiện ở:

```plaintext
preprint.
```

Claude cũng không tự vận hành wet lab.

Human scientists thực hiện toàn bộ laboratory work.

Điểm mới là Claude agents thực hiện large-scale:

```plaintext
search
literature reasoning
candidate prioritization.
```

### Tác động với developer

Agent parallelism có thể hữu ích nhất khi search space:

```plaintext
rất lớn
decomposable
có evaluator downstream.
```

950 agents không tự động có nghĩa tốt hơn 10 agents.

Chi phí:

```plaintext
210 million tokens
```

cũng cho thấy parallel search không hề miễn phí.

### Developer nên làm gì?

Nếu áp swarm architecture:

đo:

```plaintext
useful findings / 1M tokens
duplicate work
agent overlap
evaluator cost
wall-clock speedup.
```

Parallelism chỉ có giá trị khi marginal agent tạo thêm information.

**Nguồn:** [Anthropic — Claude discovers a novel enzyme system with CRISPR-like repeats](https://www.anthropic.com/news/claude-discovers-novel-enzyme-system)

* * *

# CI/CD

## 5\. Node 20 chính thức biến mất khỏi GitHub Actions runners

GitHub phát final notification:

```plaintext
Node 20
is no longer available
in GitHub Actions.
```

JavaScript actions trên runners giờ dùng:

```plaintext
Node 24.
```

Temporary escape hatch:

```plaintext
ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION
```

cũng đã bị remove.

Nếu maintain JavaScript action:

```plaintext
runs:
  using: node20
```

cần chuyển thành:

```plaintext
runs:
  using: node24.
```

### Tác động với developer

Workflow của bạn có thể không chứa Node code trực tiếp nhưng vẫn phụ thuộc JavaScript actions.

Do đó migration surface không chỉ là:

```plaintext
package.json.
```

Nó còn là:

```plaintext
action.yml
third-party actions
pinned action versions.
```

### Developer nên làm gì?

Search repositories:

```plaintext
runs:
  using: node20
```

và kiểm tra warnings từ Actions.

Nếu dùng third-party action chưa hỗ trợ Node 24:

```plaintext
upgrade action
fork temporarily
replace action.
```

Không còn opt-out để trì hoãn.

**Nguồn:** [GitHub — Node 20 is no longer available in GitHub Actions](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/)

* * *

# AI Code Review

## 6\. Copilot code review có automatic review và enterprise effort policy

GitHub mở rộng configuration cho:

```plaintext
Copilot code review.
```

Personal settings giờ có trên mọi Copilot plan được hỗ trợ và có thể bật automatic review khi:

```plaintext
create PR
coauthor PR
leave draft state
push new commits
work with draft PR.
```

Developer cũng có default review effort:

```plaintext
Lite
Balanced.
```

Enterprise administrator có thể đặt default:

```plaintext
Lite
Balanced
GitHub default
```

cho organization-owned repositories qua inheritance.

Repository và organization vẫn có thể override.

### Tác động với developer

AI review đang chuyển từ:

```plaintext
manually summon bot
```

thành:

```plaintext
policy-controlled CI-like stage.
```

Khi review tự động hơn, cost và noise trở nên quan trọng.

### Developer nên làm gì?

Không bật maximum review cho mọi PR.

Có thể dùng policy:

```plaintext
docs / trivial
    -> Lite

normal feature
    -> Balanced

security-critical
    -> human + specialized checks.
```

AI review nên bổ sung chứ không thay thế:

```plaintext
tests
static analysis
security scanning
human ownership.
```

**Nguồn:** [GitHub — More ways to request and configure Copilot code reviews](https://github.blog/changelog/2026-09-23-copilot-code-review-more-ways-to-request-and-configure-reviews/)

* * *

# Developer Experience

## 7\. GitHub Copilot app có thể render pull request một triệu dòng

GitHub Engineering công bố bài viết về việc rebuild diff surface của Copilot app để xử lý:

```plaintext
million-line pull request
```

cùng:

```plaintext
hundreds of inline review comments.
```

Đây không phải lời khuyên tạo PR một triệu dòng.

Nó phản ánh một vấn đề mới:

AI agents có thể tạo lượng code và artifact lớn hơn tốc độ review truyền thống.

UI layer vì vậy phải giải quyết:

```plaintext
virtualization
incremental rendering
memory pressure
comment anchoring
navigation.
```

### Tác động với developer

AI tăng throughput ở upstream có thể chuyển bottleneck sang:

```plaintext
review.
```

Nếu agent tạo code nhanh gấp 10 lần nhưng human review không tăng tương ứng:

```plaintext
queue grows.
```

### Developer nên làm gì?

Đo:

```plaintext
generated LOC
```

ít hơn và:

```plaintext
reviewable change size
time-to-review
defects after merge
```

nhiều hơn.

Agent nên được khuyến khích tạo:

```plaintext
small coherent PRs
```

thay vì tối đa hóa lượng code trong một task.

**Nguồn:** [GitHub Engineering — Rendering huge pull requests in the GitHub Copilot app](https://github.blog/engineering/user-experience/rendering-huge-pull-requests-in-the-github-copilot-app/)

* * *

# Efficient Software

## 8\. 80% developer được khảo sát muốn tooling giúp viết software tiết kiệm năng lượng hơn

GitHub và Yale Program on Climate Change Communication khảo sát:

```plaintext
1,039 GitHub users
```

ở Mỹ.

Trong sample:

```plaintext
80%
```

quan tâm tới tools giúp viết energy-efficient code.

```plaintext
78%
```

muốn best practices giảm environmental footprint.

```plaintext
74%
```

muốn đo impact của software hoặc development process.

GitHub nhấn mạnh sample là non-probability sample của users đã opt-in marketing communications, vì vậy không nên diễn giải là:

```plaintext
80% of all developers.
```

### Engineering angle

Điểm đáng chú ý là GitHub đưa sustainability về các metric quen thuộc:

```plaintext
execution time
CPU
memory
network transfer.
```

Waste thường xuất hiện dưới dạng:

```plaintext
repeated computation
over-fetching
unnecessary CI
duplicate network requests
unnecessary frontend rendering.
```

### Tác động với developer

Performance optimization, cloud cost và energy efficiency thường có intersection.

Một workload dùng ít compute hơn để tạo cùng output thường:

```plaintext
cheaper
faster
lower resource demand.
```

Nhưng GitHub cũng cảnh báo:

```plaintext
faster != automatically lower emissions.
```

Hardware, location, electricity source và workload đều ảnh hưởng.

### Developer nên làm gì?

Bắt đầu với thứ đo được:

```plaintext
baseline
CPU time
memory
bytes transferred
CI minutes.
```

Sau đó mới claim improvement.

**Nguồn:** [GitHub — Developers want more efficient software](https://github.blog/news-insights/research/developers-want-more-efficient-software-heres-what-over-1000-github-users-told-us-they-need/)

* * *

# Enterprise AI

## 9\. Airbnb mở rộng GPT‑6 Astra cho engineering và product teams

OpenAI và Airbnb mở rộng thỏa thuận để teams có access rộng hơn tới:

```plaintext
GPT‑6 Astra
OpenAI frontier models.
```

Airbnb đã dùng:

```plaintext
Codex
GPT‑5.6 Sol
GPT‑5.6 Terra
GPT‑5.6 Luna
```

trong internal AI tooling và remote agents.

Airbnb CTO Ahmad Al-Dahle cho biết development teams hiện ship khoảng:

```plaintext
80% more features
```

so với một năm trước.

### Cần diễn giải đúng

Đây là:

```plaintext
Airbnb organizational metric.
```

Nó không chứng minh:

```plaintext
GPT‑6 caused +80%.
```

Team, process, tooling và nhiều thay đổi khác đều có thể đóng góp.

Một anecdote khác cho biết Astra đạt kết quả mong muốn sau:

```plaintext
3–4 passes
```

trong một non-coding task so với hơn 20 rounds với models khác.

Đây cũng là internal observation, không phải controlled benchmark.

### Tác động với developer

Enterprise adoption đang dịch từ:

```plaintext
chatbot seats
```

sang:

```plaintext
internal assistants
remote agents
engineering workflows.
```

### Developer nên làm gì?

Nếu triển khai AI cho engineering, đo:

```plaintext
cycle time
PR throughput
defect rate
review time
developer satisfaction.
```

Không dùng:

```plaintext
tokens generated
```

làm productivity metric chính.

**Nguồn:** [OpenAI — Airbnb widens access to GPT‑6 Astra](https://openai.com/index/airbnb-gpt-6-astra/)

* * *

# AI Adoption in Southeast Asia

## 10\. OpenAI và Grab sẽ đào tạo 30.000 partners, Việt Nam dự kiến vào 2027

OpenAI và Grab công bố:

```plaintext
GO Forward with AI.
```

Trong hai năm, chương trình dự kiến hỗ trợ:

```plaintext
30,000
```

driver-, delivery- và merchant-partners ở Đông Nam Á học practical AI skills.

Chương trình bắt đầu tại:

```plaintext
Singapore
```

sau đó trong 2026 mở rộng sang:

```plaintext
Thailand
Indonesia
Philippines.
```

Tiếp theo trong:

```plaintext
2027
```

là:

```plaintext
Malaysia
Vietnam.
```

Workshops dựa trên OpenAI Academy curriculum và có use cases như:

```plaintext
sales analysis
promotion planning
business ideation
simple websites
expansion plans.
```

OpenAI cũng cho biết Driver AI Assistant mà hai công ty hợp tác từ 2024 đã tiếp cận gần:

```plaintext
500,000 drivers.
```

### Tác động với developer

Đây là reminder rằng AI adoption ở Đông Nam Á không chỉ diễn ra trong software engineering.

Use case có thể rất operational:

```plaintext
sales
inventory
logistics
small-business planning.
```

### Developer nên làm gì?

Nếu xây AI product cho khu vực:

ưu tiên:

```plaintext
local language
mobile-first UX
low training overhead
practical workflows
```

hơn những demo agent quá phức tạp.

**Nguồn:** [OpenAI — Grab and OpenAI bring practical AI skills to Southeast Asia](https://openai.com/index/grab-openai-ai-skills-southeast-asia/)

* * *

# Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Antigravity SDK + local Gemma 4 | Hybrid cloud/local agents tạo một architecture hấp dẫn cho private code và sensitive workloads. |
| 2 | Copilot local sandboxing | Coding agent có filesystem/network/credential access cuối cùng được đặt sau một explicit least-privilege boundary. |
| 3 | Claude + ~950 science agents | Cho thấy agent swarms có thể search scientific spaces cực lớn, nhưng cũng phơi bày economics của parallel inference. |
| 4 | OpenTelemetry cho Copilot agents | Agent observability đang hội tụ với distributed tracing thay vì chỉ dựa vào conversation logs. |
| 5 | GitHub Actions bỏ Node 20 | Migration đã kết thúc: JavaScript actions giờ phải sống trong Node 24 runtime. |

* * *

# Công cụ đáng thử

## Google Antigravity SDK + LiteRT

Đây là experiment đáng thử nhất hôm nay nếu bạn có máy đủ mạnh.

Architecture:

```plaintext
cloud planner
  ->
local worker agents
  ->
local repository
  ->
tests.
```

Use case tốt:

```plaintext
proprietary repository
offline environment
privacy-sensitive analysis.
```

[Google Antigravity SDK local models](https://developers.googleblog.com/introducing-support-for-local-ai-models-in-the-antigravity-sdk/)

* * *

## Copilot Local Sandbox

Nếu dùng GitHub Copilot app cho repository local:

bật sandbox trên một test project và bắt đầu với:

```plaintext
no extra filesystem
restricted network
no credentials.
```

Sau đó quan sát quyền nào agent thực sự cần.

Security policy tốt thường được xây bằng:

```plaintext
deny by default
  ->
add minimum required capability.
```

[GitHub Copilot local sandboxing](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/)

* * *

# Bài viết nên đọc

## Claude discovers a novel enzyme system with CRISPR-like repeats

Đây là bài đáng đọc nhất hôm nay vì nó mô tả khá rõ ranh giới giữa:

```plaintext
autonomous computational search
```

và:

```plaintext
human experimental science.
```

Con số:

```plaintext
950 agents
210M tokens
21 hours
```

cũng cho developer một cảm giác thực tế về scale của agent swarm.

Điểm quan trọng nhất là caveat:

```plaintext
ART function remains unknown.
```

Science cần validation, không chỉ interesting model output.

[Đọc trên Anthropic](https://www.anthropic.com/news/claude-discovers-novel-enzyme-system)

* * *

## Developers want more efficient software

Bài GitHub/Yale đáng đọc vì đưa “green software” ra khỏi slogan.

Thay vì bắt đầu bằng carbon estimate khó kiểm chứng, bài đề xuất bắt đầu từ:

```plaintext
compute waste
measurable baseline
benchmark
tests.
```

Đây là language developer quen thuộc hơn.

[Đọc trên GitHub](https://github.blog/news-insights/research/developers-want-more-efficient-software-heres-what-over-1000-github-users-told-us-they-need/)

* * *

# GitHub Repository nổi bật

## google/antigravity-sdk

Repository đáng theo dõi nhất hôm nay là Antigravity SDK vì local-model support biến agent runtime thành một kiến trúc có thể trải từ:

```plaintext
cloud
hybrid
fully local.
```

Nếu đang nghiên cứu private coding agents, đây là direction đáng benchmark thay vì mặc định gửi toàn bộ repository lên remote model.

[Antigravity SDK](https://github.com/google/antigravity-sdk)

* * *

## githubnext/agentics

GitHub dùng Daily Efficiency Improver như ví dụ về agentic workflow tìm wasted compute, tạo recommendation và đưa improvement vào review loop.

Repository/project ecosystem kiểu này đáng chú ý vì nó cho thấy agent không nhất thiết phải:

```plaintext
build feature.
```

Agent có thể liên tục tìm:

```plaintext
inefficiency
maintenance work
optimization opportunities.
```

[GitHub Next Agentics](https://github.com/githubnext/agentics)

* * *

# Góc nhìn của mình

Tin mình thấy quan trọng nhất hôm nay là local model support trong Antigravity SDK.

Không phải vì:

```plaintext
local beats cloud.
```

Điều thú vị là chúng ta không còn buộc phải chọn một trong hai.

Architecture có thể là:

```plaintext
cloud model
    -> thinks globally

local model
    -> sees private data

sandbox
    -> limits actions

telemetry
    -> records behavior.
```

Đây là một architecture cân bằng hơn rất nhiều.

Một coding agent không cần gửi toàn bộ repository lên cloud chỉ để cloud model quyết định:

```plaintext
file nào cần sửa.
```

Cloud planner có thể biết:

```plaintext
repository structure
task
test failure metadata.
```

Local workers mới cần đọc:

```plaintext
proprietary source.
```

Điểm thứ hai là sandboxing.

Agent security thường bị thảo luận ở mức:

```plaintext
model alignment.
```

Nhưng với developer agent, một lớp bảo vệ rất thực dụng là:

```plaintext
process permissions.
```

Nếu agent không đọc được:

```plaintext
~/.ssh
```

thì rất nhiều failure modes biến mất.

Nếu agent không gọi arbitrary network:

```plaintext
data exfiltration surface
```

giảm mạnh.

Đây là security engineering truyền thống, và chính vì thế nó hiệu quả.

Điểm thứ ba là OpenTelemetry.

Agent execution ngày càng giống distributed system.

Một task có thể gọi:

```plaintext
model A
tool B
shell C
browser D
model A again.
```

Khi task fail, câu hỏi:

```plaintext
"AI trả lời gì?"
```

không đủ.

Ta cần:

```plaintext
trace.
```

Điểm thứ tư là Anthropic science experiment.

950 agents nghe rất impressive.

Nhưng mình thấy con số:

```plaintext
210 million tokens
```

cũng quan trọng không kém.

Agent swarm biến compute thành search breadth.

Đó là trade-off.

Nếu 900/950 agents khám phá cùng một vùng solution space, parallelism bị lãng phí.

Agent orchestration tương lai sẽ cần những khái niệm rất giống distributed search:

```plaintext
diversity
deduplication
work stealing
stopping criteria
marginal information gain.
```

Cuối cùng là Node 20 removal.

Nó nhỏ hơn các headline AI, nhưng đây là loại thay đổi có thể làm CI fail sáng nay.

Đó cũng là lý do Daily Tech Brief không nên chỉ chạy theo frontier model releases.

Developer cần biết cả:

```plaintext
"AI vừa tìm ra gì?"
```

và:

```plaintext
"workflow của tôi có chạy hôm nay không?"
```

* * *

# Kết luận

24/09 cho thấy production AI đang tiến hóa theo một direction khá lành mạnh.

Không chỉ:

```plaintext
more intelligence.
```

Mà:

```plaintext
intelligence with boundaries.
```

Google:

```plaintext
local execution.
```

GitHub:

```plaintext
sandbox permissions.
```

OpenTelemetry:

```plaintext
visibility.
```

Anthropic:

```plaintext
computational agents + human experimental validation.
```

GitHub/Yale:

```plaintext
measurable efficiency.
```

Đó là những primitive rất quen thuộc trong software engineering:

```plaintext
isolation
observability
benchmarking
validation.
```

AI agent cuối cùng cũng đang phải tuân theo những nguyên tắc mà distributed systems và security engineering đã học trong nhiều thập kỷ.

Ba việc developer có thể làm ngay:

1.  Nếu source code nhạy cảm, thử **hybrid cloud-planner + local-worker architecture** thay vì mặc định gửi toàn bộ code lên cloud.
    
2.  Với coding agent có shell access, áp dụng **least-privilege sandbox cho filesystem, network và credentials**.
    
3.  Instrument agent bằng **OpenTelemetry-style traces**, rồi đo model calls, tool calls, retries, latency và task outcome trong cùng một execution graph.
    

Thông điệp lớn hôm nay:

**Agent càng tự chủ, execution environment càng quan trọng không kém model.**

Model quyết định agent có thể nghĩ được gì.

Sandbox quyết định nó được phép làm gì.

Telemetry cho biết nó thực sự đã làm gì.

Và evaluator/human verification quyết định kết quả đó có đáng tin hay không.

* * *

# Nguồn tham khảo

1.  [Google Developers Blog — Introducing Support for Local AI Models in the Antigravity SDK](https://developers.googleblog.com/introducing-support-for-local-ai-models-in-the-antigravity-sdk/)
    
2.  [GitHub — Local sandboxing in the GitHub Copilot app](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/)
    
3.  [GitHub — OpenTelemetry in the GitHub Copilot app](https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/)
    
4.  [Anthropic — Claude discovers a novel enzyme system with CRISPR-like repeats](https://www.anthropic.com/news/claude-discovers-novel-enzyme-system)
    
5.  [GitHub — Node 20 is no longer available in GitHub Actions](https://github.blog/changelog/2026-09-23-node-20-is-no-longer-available-in-github-actions/)
    
6.  [GitHub — More ways to request and configure Copilot code reviews](https://github.blog/changelog/2026-09-23-copilot-code-review-more-ways-to-request-and-configure-reviews/)
    
7.  [GitHub Engineering — Rendering huge pull requests in the GitHub Copilot app](https://github.blog/engineering/user-experience/rendering-huge-pull-requests-in-the-github-copilot-app/)
    
8.  [GitHub — Developers want more efficient software](https://github.blog/news-insights/research/developers-want-more-efficient-software-heres-what-over-1000-github-users-told-us-they-need/)
    
9.  [OpenAI — Airbnb widens access to GPT‑6 Astra](https://openai.com/index/airbnb-gpt-6-astra/)
    
10.  [OpenAI — Grab and OpenAI bring practical AI skills to Southeast Asia](https://openai.com/index/grab-openai-ai-skills-southeast-asia/)