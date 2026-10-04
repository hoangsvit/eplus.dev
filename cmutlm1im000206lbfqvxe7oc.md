---
title: "Daily Tech Brief — 04/10/2026"
seoTitle: "Daily Tech Brief — 04/10/2026"
seoDescription: "Anthropic đầu tư $100M đào tạo 10.000 Frontier Deployed Engineers; Supabase đưa backend về code với local stack không Docker, MCP server, Compute, Multigres và OrioleDB"
datePublished: 2026-10-04T09:08:19.656Z
cuid: cmutlm1im000206lbfqvxe7oc
slug: daily-tech-brief-04-10-2026
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/6c8a6050-96e5-4d7d-aa77-deb6616111f2.png
tags: claude, ai-engineering, anthropic, daily-tech-brief, daily-tech-brief-04-10-2026, claude-frontier-academy, frontier-deployed-engineer

---

> Sau nhiều ngày liên tiếp tập trung vào agent runtime, computer use, observability và production control, bản hôm nay chuyển trọng tâm sang một câu hỏi khác: **làm sao biến AI agent thành một phần bình thường của software engineering và enterprise operations?** Anthropic đầu tư $100 triệu để đào tạo 10.000 Frontier Deployed Engineers; Supabase thiết kế lại backend workflow để coding agent có thể thao tác trực tiếp từ repository, chạy local không cần Docker, triển khai long-running compute và cung cấp MCP server cho chính application; ở tầng Postgres, Multigres và OrioleDB nhắm vào hai nút thắt lâu đời là high availability và VACUUM/bloat.

* * *

## Executive Summary

Ngày 04/10/2026 có ít launch hoàn toàn mới trong đúng 24 giờ cuối tuần hơn những ngày trước. Thay vì kéo thêm các headline yếu để đủ số lượng, bản hôm nay giữ **một công bố mới trong 24 giờ** và mở rộng có chủ đích sang nhóm công bố chính thức ngày 02/10 — vẫn nằm trong cửa sổ 24–72 giờ — nhưng chưa được đưa vào các bản Daily Tech Brief trước.

Headline mới nhất đến từ Anthropic.

**Claude Frontier Academy** là khoản cam kết **$100 triệu** nhằm đào tạo **10.000 Frontier Deployed Engineers (FDEs) trước cuối năm 2027**.

Anthropic không mô tả chương trình như một khóa certification thông thường. Frontier Deployed Engineer Residency được thiết kế gần với mô hình residency trong y khoa: học từ practitioner, thực hành trên case thực tế và phải được đánh giá trước khi nhận credential.

Các cohort đầu tiên có kỹ sư từ những tổ chức như Accenture, Bain, Capgemini, Commonwealth Bank of Australia, Deloitte, McKinsey, Morgan Stanley và Novo Nordisk.

Điểm đáng chú ý không phải con số 10.000.

Nó là cách Anthropic định nghĩa skill gap của enterprise AI.

Doanh nghiệp không chỉ thiếu người biết:

```plaintext
prompt
model API
RAG.
```

Họ thiếu kỹ sư có thể đi hết chuỗi:

```plaintext
business requirement
  ->
security review
  ->
system integration
  ->
production deployment
  ->
adoption
  ->
measurable business outcome.
```

Anthropic cho biết Claude Partner Network hiện có professionals tại khoảng **46.000 firms**, hơn **175.000 Claude certifications** và gần **4.000 người đã hoàn thành Basecamp**. Frontier Academy được đặt ở tầng sâu hơn: đào tạo những người trực tiếp đưa agentic systems vào core business processes.

Đây là tín hiệu đáng chú ý cho developer career path.

Một vai trò mới đang dần rõ hình dạng:

**AI engineer không chỉ xây model application; họ triển khai AI vào một hệ thống tổ chức đang tồn tại.**

Phần lớn các cập nhật kỹ thuật còn lại hôm nay đến từ **Supabase Select 2026**, công bố ngày 02/10 và được đưa vào nhóm mở rộng 24–72 giờ.

Những thay đổi này đáng chú ý vì Supabase đang thiết kế lại backend workflow theo hướng **agent-ready**.

Local Supabase có thể chạy dưới dạng native processes mà không cần Docker daemon. Điều này đặc biệt hữu ích trong sandbox của Claude Code, Codex, CI runner hoặc các coding-agent environment nơi Docker không tồn tại hoặc không được cấp quyền.

Mỗi directory cũng có thể chạy một Supabase instance riêng.

Điều đó phù hợp trực tiếp với:

```plaintext
git worktree A
  ->
local backend A

git worktree B
  ->
local backend B.
```

Hai agent hoặc hai task có thể thử thay đổi song song mà không tranh một local backend duy nhất.

Supabase đồng thời giới thiệu **Declarative Schemas 2.0**.

Thay vì yêu cầu coding agent tự viết migration chính xác, schema SQL trong repository trở thành source of truth và `pg-delta` tạo migration từ diff.

Đây là một thiết kế khá hợp với AI coding.

Agent thường làm tốt việc sửa declarative state:

```plaintext
users table should contain X
```

hơn việc tự suy luận chính xác toàn bộ migration history.

Project configuration cũng có thể nằm trong `config.toml`, và thay đổi từ dashboard có thể được kéo ngược về repository.

Điều này giải quyết một vấn đề lớn của coding agents:

**agent chỉ nhìn thấy những gì tồn tại trong code.**

Nếu backend configuration chỉ tồn tại trong dashboard, agent luôn có một blind spot.

Một công bố khác là **Supabase Compute**, hiện ở private alpha.

Compute chạy long-running services và agents cạnh database, không có giới hạn duration như request-oriented functions. Service có full Linux environment, configurable CPU/RAM và có thể public hoặc private.

Private Compute đặc biệt phù hợp với:

```plaintext
background jobs
queues
embeddings
persistent agents
agent sandboxes.
```

Supabase cũng đưa ra một capability có thể ảnh hưởng trực tiếp tới application architecture: **MCP server cho chính application của bạn**.

Thay vì chỉ dùng Supabase MCP để coding agent quản trị backend, developer có thể deploy một MCP server bên trong application.

User đăng nhập bằng Auth hiện có.

Agent gọi tool với identity của user.

RLS tiếp tục quyết định row nào user — và vì vậy agent của user — được phép truy cập.

Pattern trở thành:

```plaintext
user
  ->
external agent
  ->
app MCP server
  ->
authenticated user context
  ->
RLS
  ->
data.
```

Đây là cách tiếp cận đáng chú ý vì authorization không được chuyển vào prompt.

Agent chỉ trở thành một interface mới của application; security model cũ vẫn tồn tại phía dưới.

Ở tầng vận hành, Supabase cũng công bố agent prompts cho:

```plaintext
health
security
performance
resources.
```

Agent kết nối MCP ở chế độ read-only, điều tra project rồi báo cáo findings. Developer quyết định thay đổi nào được merge.

Một lần nữa, architecture giữ separation:

```plaintext
agent investigates
human controls merge.
```

Ở tầng Postgres, Supabase công bố **Multigres** ở private alpha.

Multigres được mô tả là một open-source operating system cho Postgres, do team đứng sau Vitess xây dựng. Nó thêm scalable connection pooling và automated multi-node failover.

Multigres chạy ba Postgres nodes qua nhiều availability zones trong cùng region và sử dụng consensus trên synchronous replication để đảm bảo cluster thống nhất chính xác write nào đã commit trước khi promote replica.

Mục tiêu là:

```plaintext
failover
  without
losing committed writes.
```

Supabase cho biết application không cần thay code để chuyển sang Multigres.

Một thay đổi database sâu hơn là **OrioleDB**.

OrioleDB thay heap storage truyền thống của PostgreSQL bằng storage engine sử dụng undo log.

Trong PostgreSQL heap, update tạo row version mới và để lại dead tuple.

Qua thời gian:

```plaintext
updates/deletes
  ->
dead tuples
  ->
bloat
  ->
VACUUM pressure.
```

OrioleDB xử lý update/delete bằng page-level undo records rồi reclaim tự động.

Kết quả:

```plaintext
no table bloat
no VACUUM requirement.
```

OrioleDB cũng dùng 64-bit transaction IDs mặc định, tránh transaction-ID wraparound của 32-bit XID.

Theo benchmark TPC-C-derived do Supabase công bố công khai, OrioleDB đạt **tới 1,8× throughput** so với PostgreSQL heap trong workload họ đo. Con số này nên được xem là vendor benchmark, không phải universal performance guarantee.

Để giải quyết chính vấn đề benchmark thiếu minh bạch, Supabase cũng ra mắt **dbarena**.

dbarena công bố:

```plaintext
benchmark code
methodology
raw data
cost
transactions/minute
transactions/dollar
p95
machine specs.
```

Tại launch, platform so sánh Supabase, Amazon RDS và Google Cloud SQL.

Cuối cùng, Supabase thông báo **acquire Turso**.

Turso phát triển database infrastructure dựa trên SQLite/libSQL với khả năng provision lượng database rất lớn. Đây là hướng phù hợp với agent workload, nơi một hệ thống có thể cần hàng nghìn hoặc hàng triệu isolated databases thay vì một database khổng lồ được mọi task chia sẻ.

Nhìn tổng thể, bản hôm nay có hai câu chuyện tưởng như khác nhau nhưng thực tế nối rất sát.

Anthropic đang đào tạo con người để đưa agent vào enterprise.

Supabase đang thay đổi developer infrastructure để agent có thể thao tác backend như một engineering participant thực sự.

Một bên giải quyết:

```plaintext
people layer.
```

Bên còn lại giải quyết:

```plaintext
infrastructure layer.
```

Cả hai cùng chỉ về một kết luận:

**AI adoption đang rời khỏi giai đoạn “biết sử dụng model” và bước vào giai đoạn operational integration.**

* * *

## Hôm nay có gì nổi bật?

### 1\. “AI engineer” đang dần trở thành deployment engineer

Enterprise AI không thất bại chủ yếu vì thiếu prompt.

Nó thường vướng ở:

```plaintext
legacy systems
identity
permissions
data
compliance
adoption
organizational process.
```

Frontier Deployed Engineer là một cách gọi mới cho skill set kết nối những phần đó.

### 2\. Backend đang được thiết kế để machine có thể thao tác trực tiếp

Dashboard-centric workflow là vấn đề đối với coding agent.

Agent mạnh nhất khi state nằm trong:

```plaintext
code
config
CLI
API.
```

Supabase đang dịch nhiều backend state về repository.

### 3\. Agent authorization nên kế thừa security model của application

MCP server của application không nên tạo một “AI bypass”.

Pattern tốt hơn là:

```plaintext
agent acts as user
  ->
existing auth
  ->
existing RLS.
```

AI trở thành một client mới, không trở thành một trust zone mới.

* * *

# Tin nổi bật

## Enterprise AI Engineering

### 1\. Anthropic đầu tư $100 triệu cho Claude Frontier Academy

**Ngày công bố: 03/10/2026 — trong 24 giờ.**

Anthropic ra mắt **Claude Frontier Academy** với khoản cam kết:

```plaintext
$100 million.
```

Mục tiêu là đào tạo:

```plaintext
10,000 Frontier Deployed Engineers
```

trước cuối năm 2027.

Chương trình đầu tiên là Frontier Deployed Engineer Residency.

Các engineer học từ practitioners, giải realistic cases và được đánh giá trước khi nhận credential.

### Tác động với developer

Enterprise AI engineering đang trở thành một discipline rộng hơn model integration.

FDE cần hiểu:

```plaintext
software engineering
AI systems
security
deployment
business process
adoption.
```

### Developer nên làm gì?

Nếu đang phát triển theo hướng AI engineer, đừng chỉ học thêm model API.

Ưu tiên những skill khó tự động hóa hơn:

```plaintext
system design
evaluation
IAM
data boundaries
production debugging
business-domain understanding.
```

**Nguồn:** [Anthropic — Claude Frontier Academy](https://www.anthropic.com/news/claude-frontier-academy)

* * *

## Agent-Ready Backend

### 2\. Supabase local development chạy không cần Docker

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Supabase local stack có thể chạy bằng native processes.

Capability đang:

```plaintext
alpha
off by default.
```

Điều này cho phép local Supabase hoạt động trong những environment không có Docker daemon, gồm coding-agent sandboxes và CI runners.

Mỗi directory cũng có thể có một stack riêng.

### Tác động với developer

Coding agent thường làm việc trong:

```plaintext
ephemeral sandbox
git worktree
isolated checkout.
```

Một backend local phụ thuộc vào global Docker environment tạo friction cho parallel agent work.

### Developer nên làm gì?

Nếu thử alpha, benchmark workflow:

```plaintext
worktree A + local stack A
worktree B + local stack B.
```

Kiểm tra port isolation, startup time và cleanup trước khi đưa vào automated agent workflow.

**Nguồn:** [Supabase — Build anything](https://supabase.com/blog/select-2026-build-anything)

* * *

### 3\. Declarative Schemas 2.0 đưa database schema về repository

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Schema được định nghĩa trong:

```plaintext
supabase/schemas/*.sql.
```

`pg-delta` tính diff và tạo migration.

Project configuration cũng có thể nằm trong:

```plaintext
config.toml.
```

Dashboard changes có thể được pull trở lại repository.

### Tác động với developer

Coding agent có thể reasoning trên desired database state thay vì phải tự reconstruct state từ dashboard và migration history.

### Developer nên làm gì?

Giữ schema/config trong version control.

Để migration generator làm phần mechanical diff, nhưng vẫn review:

```plaintext
destructive changes
locks
data migration
backwards compatibility.
```

**Nguồn:** [Supabase — Build anything](https://supabase.com/blog/select-2026-build-anything)

* * *

## Agent Runtime

### 4\. Supabase Compute chạy long-running agents cạnh Postgres

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

**Supabase Compute** đang ở:

```plaintext
private alpha.
```

Compute chạy service bằng bất kỳ language nào với:

```plaintext
full Linux environment
configurable CPU
configurable memory
no fixed execution-duration limit.
```

Service có thể public hoặc private.

### Tác động với developer

Backend platform bắt đầu cung cấp execution primitive dành cho workload không phù hợp request-oriented Edge Functions.

Ví dụ:

```plaintext
persistent agent
background worker
embeddings pipeline
queue consumer
sandbox.
```

### Developer nên làm gì?

Không mặc định đặt mọi AI workload vào request lifecycle.

Tách:

```plaintext
synchronous interaction
    và
long-running work.
```

Agent task dài nên có state, retry và checkpoint rõ ràng.

**Nguồn:** [Supabase — Build anything](https://supabase.com/blog/select-2026-build-anything)

* * *

## MCP

### 5\. Supabase cho phép application có MCP server riêng

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Developer có thể thêm authenticated MCP server vào application.

MCP server chạy dưới dạng Edge Function.

User đăng nhập bằng Supabase Auth hiện có và tool calls chạy trong user context.

Row Level Security tiếp tục quyết định dữ liệu agent có thể truy cập.

### Tác động với developer

Application có thể trở thành một first-class tool cho:

```plaintext
Claude
ChatGPT
Cursor
other MCP clients.
```

Quan trọng hơn, AI access không cần một authorization system hoàn toàn mới.

### Developer nên làm gì?

Đừng cấp MCP server service-role access theo mặc định.

Giữ:

```plaintext
user identity
  ->
RLS
  ->
tool permission.
```

Tool nên nhỏ, rõ action và dễ audit.

**Nguồn:** [Supabase — Build anything](https://supabase.com/blog/select-2026-build-anything)

* * *

## Agent Operations

### 6\. Supabase đưa health/security/performance checks cho coding agents

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Supabase cung cấp agent prompts và suggested schedules cho:

```plaintext
health
security
performance
resource checks.
```

Agent kết nối project thông qua Supabase MCP server ở chế độ read-only và báo findings.

Health Check Advisors cũng mở rộng sang elevated error rates ở:

```plaintext
Data API
Auth
Storage
Edge Functions.
```

### Tác động với developer

Operations agent có thể bắt đầu từ:

```plaintext
inspect
explain
recommend
```

trước khi tiến tới:

```plaintext
modify.
```

Đây là autonomy ladder an toàn hơn.

### Developer nên làm gì?

Bắt đầu agent operations bằng read-only workflow.

Chỉ cấp write capability sau khi đã đo:

```plaintext
false positives
missed incidents
quality of remediation.
```

**Nguồn:** [Supabase — Operate with confidence](https://supabase.com/blog/select-2026-operate-with-confidence)

* * *

## PostgreSQL High Availability

### 7\. Multigres đưa consensus-based failover vào Postgres

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Multigres hiện ở:

```plaintext
private alpha.
```

Nó là open-source Postgres operating layer từ team đứng sau Vitess.

Multigres cung cấp:

```plaintext
scalable connection pooling
multi-node failover
read scaling.
```

Default topology gồm ba Postgres nodes trên nhiều availability zones.

Consensus trên synchronous replication giúp cluster xác định chính xác committed writes trước khi promote replica.

### Tác động với developer

Postgres scaling thường buộc application team phải ghép:

```plaintext
pooler
replicas
failover tooling
routing.
```

Multigres thử đưa các concern này vào một operating layer thống nhất.

### Developer nên làm gì?

Private alpha chưa phù hợp production.

Nếu thử nghiệm, tập trung vào failure testing:

```plaintext
kill primary
lose zone
connection storm
replica lag.
```

HA chỉ đáng tin sau khi được phá thử.

**Nguồn:** [Supabase — Multigres, OrioleDB and dbarena](https://supabase.com/blog/select-2026-scale-without-limits)

* * *

## PostgreSQL Storage

### 8\. OrioleDB loại bỏ VACUUM bằng undo-log storage

**Ngày công bố/cập nhật: 02/10/2026 — mở rộng 24–72 giờ.**

OrioleDB là alternative storage engine cho PostgreSQL.

Thay vì heap MVCC tạo dead tuples, OrioleDB sử dụng page-level undo records.

Theo Supabase:

```plaintext
table bloat -> eliminated
VACUUM -> not required.
```

OrioleDB sử dụng 64-bit XIDs và hỗ trợ lock-free page reads.

Supabase công bố throughput lên tới:

```plaintext
1.8× PostgreSQL heap
```

trong benchmark TPC-C-derived của họ.

OrioleDB đang:

```plaintext
public beta.
```

### Tác động với developer

VACUUM, bloat và transaction-ID wraparound là những operational concern lâu đời của PostgreSQL.

Một storage engine khác có thể thay đổi đáng kể cách team capacity-plan write-heavy workloads.

### Developer nên làm gì?

Không suy rộng vendor benchmark sang workload của mình.

Benchmark bằng:

```plaintext
schema thật
write ratio thật
index thật
concurrency thật.
```

**Nguồn:** [Supabase — Multigres, OrioleDB and dbarena](https://supabase.com/blog/select-2026-scale-without-limits)

* * *

## Database Benchmarking

### 9\. dbarena công khai benchmark managed PostgreSQL

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Supabase ra mắt **dbarena**, một site benchmark database mở.

Launch coverage gồm:

```plaintext
Supabase
Amazon RDS
Google Cloud SQL.
```

Mỗi run công bố:

```plaintext
benchmark code
methodology
raw data
transactions per dollar
monthly cost
transactions per minute
p95
machine specs.
```

### Tác động với developer

Database benchmark thường khó tin vì provider tự chọn:

```plaintext
hardware
tuning
workload.
```

Reproducible raw data giúp comparison có thể được kiểm tra lại.

### Developer nên làm gì?

Dùng public benchmark để shortlist, không dùng nó để thay production benchmark.

Database tốt nhất vẫn phụ thuộc:

```plaintext
workload shape
region
storage
concurrency
operational requirements.
```

**Nguồn:** [Supabase — Multigres, OrioleDB and dbarena](https://supabase.com/blog/select-2026-scale-without-limits)

* * *

## Database Infrastructure

### 10\. Supabase mua Turso để mở rộng agentic database infrastructure

**Ngày công bố: 02/10/2026 — mở rộng 24–72 giờ.**

Supabase thông báo acquisition Turso.

Turso tập trung vào SQLite/libSQL-based infrastructure và khả năng vận hành lượng lớn lightweight databases.

Financial terms không được công bố.

### Tác động với developer

Agent workload có thể thay đổi database topology.

Thay vì:

```plaintext
one large shared database,
```

một số use case phù hợp hơn với:

```plaintext
one isolated database per agent
per customer
per task
per sandbox.
```

Lightweight database provisioning vì vậy trở thành một agent-infrastructure primitive.

### Developer nên làm gì?

Không chọn database-per-agent chỉ vì isolation nghe hấp dẫn.

Đánh giá:

```plaintext
lifecycle
backup
migration
discovery
connection management
cost.
```

Isolation càng nhỏ thì control plane càng phải tốt.

**Nguồn:** [Supabase Blog — Supabase Select 2026](https://supabase.com/blog)

* * *

## Secure Agent Retrieval

### 11\. AWS đưa Web Search vào Claude Desktop qua Bedrock AgentCore Gateway

**Ngày đăng: 03/10/2026 — trong 24 giờ.**

AWS hướng dẫn kết nối Claude Desktop với **Web Search** thông qua Amazon Bedrock AgentCore Gateway.

Web Search là capability tương thích MCP, được AWS mô tả là sử dụng web index gồm hàng chục tỷ documents.

AgentCore Gateway đứng giữa Claude Desktop và search capability thay vì yêu cầu desktop client tự giữ một search-provider integration riêng.

### Tác động với developer

Live-web retrieval đang dần trở thành managed agent infrastructure.

Pattern:

```plaintext
agent
  ->
authenticated gateway
  ->
search tool
```

dễ quản trị hơn việc phân phối credential của nhiều provider tới từng client.

### Developer nên làm gì?

Với enterprise agent, đặt retrieval sau một governance boundary có:

```plaintext
authentication
authorization
logging
tool policy.
```

Đừng xem web search là một capability vô hại chỉ vì nó read-only.

**Nguồn:** [AWS — Secure Web Search with Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/add-secure-web-search-to-claude-desktop-with-amazon-bedrock-agentcore/)

* * *

# Top 5 đáng chú ý

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Claude Frontier Academy | Anthropic đặt $100M vào skill layer để đào tạo 10.000 kỹ sư có khả năng đưa agent từ prototype tới enterprise production. |
| 2 | Supabase agent-ready backend | Schema, config và local environment dịch về code để coding agent có thể thao tác backend end-to-end. |
| 3 | Application MCP server | Agent của user có thể thao tác application bằng identity và RLS hiện có thay vì một AI-specific bypass. |
| 4 | Multigres + OrioleDB | Hai hướng giải quyết những pain point rất lâu đời của Postgres: HA/failover và VACUUM/bloat. |
| 5 | Bedrock AgentCore Web Search | Live-web retrieval tiếp tục dịch sang governed MCP-compatible infrastructure. |

* * *

# Công cụ đáng thử

## Supabase Declarative Schemas 2.0

Đây là capability thực dụng nhất hôm nay cho developer đang dùng coding agents.

Thay vì yêu cầu agent tự viết migration:

```plaintext
desired schema
  ->
pg-delta
  ->
generated migration
  ->
review.
```

Điều này đưa agent về đúng loại task nó làm tốt hơn: chỉnh desired state.

[Supabase — Build anything](https://supabase.com/blog/select-2026-build-anything)

* * *

## OrioleDB

Nếu có PostgreSQL workload bị ảnh hưởng mạnh bởi:

```plaintext
update-heavy tables
bloat
aggressive VACUUM
txid concerns,
```

OrioleDB đáng được đưa vào benchmark lab.

Nhưng public beta chưa phải lý do để migrate production ngay.

[Supabase — Scale without limits](https://supabase.com/blog/select-2026-scale-without-limits)

* * *

# Bài viết nên đọc

## Claude Frontier Academy

Bài Anthropic đáng đọc không phải để tìm API mới.

Nó đáng đọc để hiểu AI vendor đang định nghĩa **production AI talent** như thế nào.

Điểm đáng chú ý là trọng tâm chuyển khỏi certification volume sang khả năng:

```plaintext
hiểu business
thiết kế system
vượt security review
deploy
tạo adoption
đo outcome.
```

[Đọc trên Anthropic](https://www.anthropic.com/news/claude-frontier-academy)

* * *

## Build anything: Supabase from code, and an MCP server for your app

Đây là bài kỹ thuật đáng đọc nhất hôm nay.

Nó nối nhiều xu hướng agent engineering thành một architecture khá mạch lạc:

```plaintext
repository as source of truth
  +
isolated local environment
  +
long-running compute
  +
authenticated MCP
  +
existing RLS.
```

[Đọc trên Supabase](https://supabase.com/blog/select-2026-build-anything)

* * *

# GitHub Repository nổi bật

## supabase/pg-delta

`pg-delta` đại diện cho một pattern đáng chú ý của AI-native development:

**agent sửa desired state; deterministic tool tạo migration.**

Đây là separation tốt hơn việc yêu cầu model tự chịu trách nhiệm toàn bộ database migration.

Repository đáng theo dõi nếu bạn quan tâm:

```plaintext
declarative schemas
PostgreSQL schema diff
migration generation
agent-friendly database workflows.
```

Không dùng star count làm tiêu chí lựa chọn.

[GitHub — Supabase repositories](https://github.com/supabase)

* * *

# Góc nhìn của mình

Điều mình thấy đáng chú ý nhất hôm nay không phải một feature cụ thể.

Nó là sự xuất hiện của hai loại infrastructure song song:

```plaintext
infrastructure for agents
    và
people infrastructure for agents.
```

Claude Frontier Academy thuộc nhóm thứ hai.

Một enterprise có thể mua model tốt nhất, nhưng nếu không có người hiểu:

```plaintext
hệ thống nội bộ
data
IAM
compliance
deployment
business process,
```

model vẫn chỉ là một API rất đắt.

Đây là lý do Frontier Deployed Engineer có thể trở thành một role đáng chú ý.

Nó gần:

```plaintext
solutions architect
platform engineer
applied AI engineer
product engineer
```

hơn là “prompt engineer”.

Ở phía infrastructure, Supabase đang làm một việc mình nghĩ nhiều developer platform sẽ phải làm:

**đưa dashboard state về code.**

Coding agent không thể click qua hàng chục dashboard một cách đáng tin cậy như nó có thể:

```plaintext
edit config
run CLI
inspect diff
execute tests.
```

Agent-ready platform vì vậy không nhất thiết cần một “AI mode”.

Nó cần:

```plaintext
deterministic CLI
configuration as code
local reproducibility
machine-readable errors
scoped permissions.
```

MCP server của application cũng là một pattern rất đáng học.

Cách nguy hiểm là:

```plaintext
AI tool
  ->
admin credential
  ->
database.
```

Cách tốt hơn là:

```plaintext
user
  ->
agent
  ->
MCP
  ->
user's identity
  ->
RLS.
```

Agent không được quyền nhiều hơn người nó đại diện.

Đó là một nguyên tắc đơn giản nhưng cực kỳ quan trọng.

Multigres và OrioleDB lại nhắc rằng agent era không làm các vấn đề database truyền thống biến mất.

Agent có thể generate application nhanh hơn.

Điều đó thậm chí có thể làm:

```plaintext
connection pressure
write volume
database count
operational complexity
```

tăng nhanh hơn.

Postgres vì vậy vẫn phải giải quyết:

```plaintext
HA
pooling
storage
VACUUM
failover
benchmarking.
```

Turso acquisition còn gợi ra một architecture khác.

Nếu agent có sandbox riêng, filesystem riêng và execution riêng, có thể một số workload cũng muốn:

```plaintext
database riêng.
```

Nhưng database-per-agent chỉ khả thi nếu provisioning và lifecycle management trở nên cực rẻ.

Đây có thể là lý do lightweight database infrastructure ngày càng gắn với agent platforms.

Cuối cùng, điểm chung giữa Anthropic và Supabase hôm nay là:

**AI production là integration problem.**

Model intelligence chỉ là một phần.

Phần còn lại là:

```plaintext
people
workflow
identity
data
runtime
observability
database
governance.
```

Những phần đó ít hào nhoáng hơn model launch.

Nhưng đó chính là nơi phần lớn production engineering diễn ra.

* * *

# Kết luận

Daily Tech Brief 04/10/2026 là một bản cuối tuần với ít headline mới trong 24 giờ, vì vậy không cố kéo những tin yếu chỉ để đủ số.

Công bố mới nổi bật nhất là **Claude Frontier Academy**: Anthropic cam kết $100 triệu để đào tạo 10.000 Frontier Deployed Engineers trước cuối 2027.

Nhóm tin mở rộng từ Supabase Select lại cho thấy developer infrastructure đang thay đổi để agent trở thành một participant thực sự:

```plaintext
backend state nằm trong code
local stack chạy được trong sandbox
worktree có environment riêng
agent có long-running compute
application expose MCP
authorization kế thừa Auth + RLS
operations bắt đầu read-only trước khi write.
```

Ở tầng database, Multigres và OrioleDB cho thấy Postgres vẫn đang được tái kiến trúc quanh những vấn đề rất truyền thống: HA, failover, bloat và VACUUM.

Ba việc đáng làm hôm nay:

1.  Nếu đang xây AI skill set, đầu tư vào **production integration**, không chỉ prompt/model APIs.
    
2.  Nếu coding agent đang thao tác backend, đưa **schema và configuration về version control** càng nhiều càng tốt.
    
3.  Nếu expose application qua MCP, để agent **kế thừa identity và authorization của user**, không cấp một admin shortcut.
    

Thông điệp lớn hôm nay:

**AI-native engineering không có nghĩa thay mọi thứ bằng AI.**

Nó có nghĩa thiết kế software, infrastructure và organization sao cho AI có thể tham gia mà vẫn giữ được:

```plaintext
deterministic state
security boundaries
reproducibility
human accountability.
```

* * *

# Nguồn tham khảo

1.  [Anthropic — Claude Frontier Academy](https://www.anthropic.com/news/claude-frontier-academy)
    
2.  [Supabase — Supabase Select 2026 Recap](https://supabase.com/blog/supabase-select-2026-recap)
    
3.  [Supabase — Build anything: Supabase from code, and an MCP server for your app](https://supabase.com/blog/select-2026-build-anything)
    
4.  [Supabase — Operate with confidence](https://supabase.com/blog/select-2026-operate-with-confidence)
    
5.  [Supabase — Scale without limits: Multigres, OrioleDB, and dbarena](https://supabase.com/blog/select-2026-scale-without-limits)
    
6.  [Supabase Blog](https://supabase.com/blog)
    
7.  [AWS — Add secure Web Search to Claude Desktop with Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/add-secure-web-search-to-claude-desktop-with-amazon-bedrock-agentcore/)