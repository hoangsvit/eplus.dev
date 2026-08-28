---
title: "Daily Tech Brief — 28/08/2026"
seoTitle: "Daily Tech Brief — 28/08/2026"
seoDescription: "Google Cloud ra Cloud Run instances cho long-lived agents, GitHub mở rộng Copilot Code Review, Cloudflare tiết kiệm 100 TB RAM và coding-agent runtimes tiếp tục chuẩn hóa qua MCP/ACP."
datePublished: 2026-08-28T03:05:27.480Z
cuid: cmtcdcvam000009ki25se5xhc
slug: daily-tech-brief-28-08-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e5711385-1ce8-4668-8a27-6ffa0affcd0d.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/da8b471d-2cd4-4b29-b3f5-d2aa092162aa.png
tags: google-cloud, cloud-run, ai-agents, daily-tech-brief, daily-tech-brief-28-08-2026

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source, Security và những thay đổi đáng chú ý trong hệ sinh thái phát triển phần mềm.

* * *

## 📌 Executive Summary

*   **Google Cloud ra mắt Cloud Run instances ở Preview**, một kiểu compute singleton dành cho workload chạy lâu như personal AI agents. Khác Cloud Run service vốn tối ưu request-driven autoscaling, Cloud Run instances giữ đúng một runtime chạy liên tục mà không buộc developer quay lại quản VM.
    
*   **GitHub Copilot Code Review bỏ giới hạn 300 file/20.000 dòng**, có thể thực hiện full agentic review trên pull request do Copilot cloud agent tạo và bắt đầu thu feedback có cấu trúc qua ba resolution reasons: `Addressed`, `Won't fix`, `Incorrect`.
    
*   **GitHub thay đổi retention của Actions từ 01/10/2026:** checks, workflow runs và statuses sẽ dùng cùng retention setting với artifact/log, mặc định 90 ngày, thay vì giữ hơn 400 ngày như trước. Team dựa vào lịch sử CI dài hạn cần chuẩn bị export dữ liệu.
    
*   **Cloudflare tối ưu DNS cache của 1.1.1.1 bằng năm thay đổi ở cấp memory layout trong Rust**, giảm footprint mỗi cache entry 56%, giải phóng khoảng 100 TB RAM trên toàn fleet; insert throughput tăng 43% và lookup latency giảm 19%.
    
*   **Cursor được thêm vào AI SDK HarnessAgent của Vercel**, thông qua Agent Client Protocol. Cùng orchestration code giờ có thể chạy Cursor, Claude Code, Cline, Codex, Deep Agents, Grok Build, OpenCode và Pi.
    
*   **Ling 3.0 Flash Fin lên Vercel AI Gateway**, tập trung financial research, context 256K, output tối đa 32K, reasoning + function calling và miễn phí tới 25/09. Vercel cung cấp riêng model ID `-free` để request tự fail sau promotion thay vì bất ngờ phát sinh phí.
    
*   **Azure DevOps có plugin trong GitHub Copilot app**, cho phép xem/chỉnh work items, pull requests và complete PR mà không rời Copilot app. Đây là bước tiếp theo của xu hướng coding agent trở thành workspace thay vì chỉ là editor assistant.
    
*   **Azure Developer CLI extension framework đã GA.** `azd` cũng mở rộng deployment Azure Functions từ Dockerfile, prebuilt image và ACR remote build, giúp infrastructure/deployment workflow dễ đóng gói thành extension dùng lại.
    
*   **SharePoint Framework 1.24 Beta 3 đưa React 18 support tới SPFx**, đồng thời tiếp tục Public Preview của Copilot Components và đặt mục tiêu GA trong tháng 10/2026.
    
*   **Uno Platform trình bày một architecture MCP rất đáng chú ý cho .NET agents:** một stateless docs server dùng để grounding kiến thức hiện hành và một stateful local app server cho screenshot, visual tree, input automation và self-verification.
    
*   **Microsoft Agent Framework đưa một agent từ “works on my machine” tới production bằng Agent Harness**, tập trung bốn lớp: OpenTelemetry observability, Purview governance, Foundry deployment và production operations.
    
*   **CLion roadmap tới cuối 2026 ưu tiên agentic workflows, embedded development và debugger**, cho thấy IDE đang tiếp tục chuyển semantic debugger/runtime intelligence thành tool trực tiếp cho coding agents.
    
*   Xu hướng chung hôm nay: **developer tooling đang chuyển từ “agent có thể viết code” sang “agent có một runtime, semantic tools, observability và lifecycle đủ tốt để tự kiểm tra công việc của mình”.**
    

* * *

## 📈 Hôm nay có gì nổi bật?

Nếu bản 27/08 tập trung nhiều vào isolation và governance, bản hôm nay cho thấy bước tiếp theo: **agent runtime bắt đầu được chuyên biệt hóa theo loại workload**.

Cloud Run instances giải một bài toán rất cụ thể. Cloud Run service rất tốt khi workload có request tới rồi scale, nhưng một personal agent cần giữ memory/process sống liên tục lại không khớp mô hình đó. VM giải được bài toán nhưng kéo developer quay lại OS patching, firewall và capacity management. Google đang lấp khoảng giữa bằng singleton managed compute.

Ở phía coding, Vercel, GitHub và Uno đều cùng tiến về một direction: **model không nên tự tái tạo những capability developer tooling đã biết**.

Cursor trở thành một harness có thể swap.

Copilot Code Review có feedback reason có cấu trúc.

Uno cho agent visual tree thay vì bắt nó chỉ “nhìn screenshot rồi đoán”.

Đây là một thay đổi kiến trúc quan trọng:

```plaintext
model
  -> semantic tool
  -> deterministic evidence
  -> action
  -> verification
```

tốt hơn:

```plaintext
model
  -> suy luận mọi thứ
  -> edit
  -> hy vọng đúng
```

Cuối cùng, bài Cloudflare về 1.1.1.1 nhắc lại một lesson rất cổ điển nhưng vẫn cực kỳ giá trị trong thời đại AI: **ở quy mô đủ lớn, data layout quan trọng hơn abstraction đẹp**. Một vài byte tiết kiệm trên mỗi object có thể biến thành hàng trăm terabyte khi object count lên tới hàng trăm tỷ.

* * *

# 📰 Tin nổi bật

## ☁️ Serverless & Agent Runtime

### Google Cloud giới thiệu Cloud Run instances cho long-lived AI agents

Google Cloud ngày 27/08 giới thiệu **Cloud Run instances**, hiện ở trạng thái Preview.

Cloud Run services truyền thống tối ưu cho:

```plaintext
request
  -> scale up
  -> xử lý
  -> scale down / zero
```

Điều đó không lý tưởng với workload cần:

```plaintext
exactly one instance
  + long-lived process
  + persistent runtime behavior
```

Ví dụ:

*   personal AI assistant;
    
*   agent nghe Telegram/WhatsApp;
    
*   bot cần duy trì process liên tục;
    
*   singleton worker.
    

Cloud Run instances cung cấp dedicated singleton runtime nhưng vẫn giữ nhiều lợi ích managed của Cloud Run.

Google dùng OpenClaw như một ví dụ: developer có thể triển khai một instance chạy lâu, sau đó tương tác qua Telegram, WhatsApp hoặc các channel khác.

Google cũng cho biết SSH access cho Cloud Run instances và Cloud Run services đang được chuẩn bị.

### Tác động với developer

Đây là một compute category khá tự nhiên cho agents.

Agent workload không phải lúc nào cũng:

*   request/response;
    
*   batch job;
    
*   Kubernetes deployment;
    
*   VM.
    

Một số agent thực sự gần:

```plaintext
one continuously running worker
```

nhưng developer vẫn muốn:

*   managed runtime;
    
*   HTTPS;
    
*   IAM;
    
*   logs;
    
*   ít OS maintenance.
    

### Developer nên làm gì?

Nếu đang dùng VM chỉ vì agent phải chạy liên tục, Cloud Run instances đáng benchmark.

Đo:

*   total monthly cost;
    
*   startup/restart behavior;
    
*   external connection lifecycle;
    
*   storage/state;
    
*   network;
    
*   failure recovery.
    

State quan trọng vẫn nên đưa ra ngoài runtime — database, object store hoặc durable state — thay vì giả định instance sẽ sống vĩnh viễn.

**Nguồn:** [Google Cloud — Introducing Cloud Run instances](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-instances)

* * *

# 🤖 GitHub Copilot

## Copilot Code Review hỗ trợ PR rất lớn và bot-authored PR

GitHub ngày 27/08 mở rộng Copilot Code Review.

Ba thay đổi đáng chú ý.

### 1\. Bot-authored pull requests

Automatic Copilot review giờ có thể review PR do bot tạo khi organization bật policy phù hợp.

### 2\. Copilot cloud-agent PR

Pull request do Copilot cloud agent tạo giờ nhận **full agentic review**, thay vì limited experience như trước.

Điều này tạo loop:

```plaintext
Copilot agent
  -> tạo PR
  -> Copilot Code Review
  -> findings
  -> sửa
  -> human review
```

### 3\. Large pull requests

Giới hạn cũ:

```plaintext
300 files
hoặc
20.000 lines
```

được gỡ bỏ.

Copilot có thể review PR lớn hơn mức này.

### Resolution reasons

Developer khi resolve Copilot comment có thể chọn:

*   `Addressed`;
    
*   `Won't fix`;
    
*   `Incorrect`.
    

### Tác động với developer

Resolution reason biến human feedback thành labeled data có cấu trúc.

Thay vì chỉ:

```plaintext
comment resolved = yes
```

system biết:

```plaintext
model đúng và đã sửa
model đúng nhưng không sửa
model sai
```

Đây là dữ liệu rất hữu ích để đánh giá AI review quality.

### Developer nên làm gì?

Platform team nên theo dõi:

```plaintext
findings / PR
incorrect rate
addressed rate
review latency
false-positive concentration
```

Đừng dùng số lượng comment làm metric quality.

Một reviewer tạo ít comment nhưng precision cao có thể giá trị hơn reviewer spam hàng chục nhận xét.

**Nguồn:** [GitHub — Copilot code review: Resolution reasons and expanded capabilities](https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities/)

* * *

## GitHub Actions retention sẽ thay đổi từ 01/10

GitHub thông báo từ **01/10/2026**, ba loại dữ liệu:

*   checks;
    
*   workflow runs;
    
*   statuses;
    

sẽ tuân theo cùng Actions retention setting đang áp dụng cho:

*   artifacts;
    
*   logs.
    

Default hiện là:

```plaintext
90 days
```

Trước đây checks, workflow runs và statuses có thể được giữ hơn **400 ngày** bất kể artifact/log retention.

Sau thay đổi, dữ liệu quá retention period sẽ tự động bị dọn.

### Tác động với developer

Nhiều team đang vô tình dùng GitHub Actions như một historical database.

Ví dụ:

*   release evidence;
    
*   deployment history;
    
*   compliance;
    
*   flaky-test trends;
    
*   build-duration analysis.
    

Nếu retention là 90 ngày, những use case này cần data store riêng.

### Developer nên làm gì?

Trước 01/10:

1.  Xác định workflow nào cần lịch sử >90 ngày.
    
2.  Kiểm tra organization retention setting.
    
3.  Export compliance/deployment metadata cần giữ.
    
4.  Đẩy long-term telemetry sang data warehouse/observability.
    
5.  Không phụ thuộc Actions UI như permanent audit store.
    

**Nguồn:** [GitHub — Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)

* * *

## GitHub có thể đóng toàn bộ nội dung mở của blocked user

GitHub bổ sung tùy chọn:

```plaintext
Close content authored by this user
```

khi block một account.

Hệ thống có thể tự động đóng toàn bộ open:

*   issues;
    
*   discussions;
    
*   pull requests;
    

do user đó tạo.

### Tác động với developer

Open-source moderation thường bị phân mảnh:

```plaintext
block user
rồi tìm issue
rồi tìm PR
rồi tìm discussion
```

Với spam/abuse ở quy mô lớn, đây là workload không cần thiết cho maintainer.

### Developer nên làm gì?

Chỉ dùng mass-close khi block reason thực sự liên quan abuse/spam.

Technical disagreement không nên trở thành moderation action.

**Nguồn:** [GitHub — Close all open contributions authored by a blocked user](https://github.blog/changelog/2026-08-27-close-all-open-contributions-authored-by-a-blocked-user/)

* * *

# ⚙️ Systems Engineering

## Cloudflare tiết kiệm khoảng 100 TB RAM bằng cách thay layout DNS cache

Cloudflare ngày 27/08 công bố một engineering deep dive về **Big Pineapple**, platform cache phía sau:

*   1.1.1.1;
    
*   Gateway DNS;
    
*   DNS Firewall;
    
*   AS112;
    
*   nhiều DNS services khác.
    

Fleet giữ hơn **250 tỷ DNS cache entries** tại một thời điểm.

Ở scale đó:

```plaintext
1 byte / entry
  -> hơn 250 GB RAM
```

Cloudflare thực hiện năm memory-layout optimizations trong Rust.

Kết quả công bố:

*   footprint mỗi entry giảm **56%**;
    
*   giải phóng khoảng **100 TB RAM**;
    
*   insert throughput tăng **43%**;
    
*   lookup latency giảm **19%**.
    

Điểm thú vị là optimization không đánh đổi speed để lấy memory.

Memory locality tốt hơn và ít allocation hơn làm cả hai cùng cải thiện.

### Tác động với developer

Developer thường tối ưu theo request:

```plaintext
query này nhanh hơn 5 ms
```

Nhưng ở hyperscale, cost cũng đến từ:

```plaintext
bytes/object
  × object count
```

Một struct chứa field thừa 8 byte có vẻ vô nghĩa ở 1.000 object.

Ở hàng tỷ object, nó có thể trở thành infrastructure project.

### Developer nên làm gì?

Với memory-heavy systems:

*   đo size thực tế của object;
    
*   inspect padding/alignment;
    
*   giảm allocation;
    
*   ưu tiên contiguous data nếu access pattern phù hợp;
    
*   benchmark cache locality;
    
*   đo RSS thật thay vì chỉ high-level heap metric.
    

Đừng micro-optimize business apps vô lý; nhưng với hot data structure được nhân hàng triệu/tỷ lần, layout đáng được xem như performance feature.

**Nguồn:** [Cloudflare — How we saved 100 terabytes of memory by optimizing 1.1.1.1’s DNS cache](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)

* * *

# 🧩 Coding-Agent Runtime

## Cursor được thêm vào AI SDK HarnessAgent

Vercel ngày 27/08 phát hành:

```plaintext
@ai-sdk/harness-cursor
```

Cursor giờ chạy qua cùng:

```plaintext
HarnessAgent
```

interface như các coding agents khác.

Adapter sử dụng:

```plaintext
@ai-sdk/harness-acp
```

để kết nối Cursor thông qua **Agent Client Protocol**.

Danh sách harness được hỗ trợ hiện gồm:

*   Cursor;
    
*   Claude Code;
    
*   Cline;
    
*   Codex;
    
*   Deep Agents;
    
*   Grok Build;
    
*   OpenCode;
    
*   Pi.
    

### Tác động với developer

Đây là bước tiếp theo của runtime portability.

Application có thể giữ:

```plaintext
UI
session
orchestration
sandbox
workflow
```

và thay:

```plaintext
Cursor
  ↔ Codex
  ↔ Claude Code
  ↔ Cline
```

mà business logic phía trên không đổi nhiều.

### Developer nên làm gì?

Nếu đang xây internal coding-agent platform, tránh hard-code orchestration quanh một CLI duy nhất.

Tuy nhiên, vẫn cần benchmark feature-specific behavior vì interface chung không đảm bảo mọi harness có capability giống nhau.

**Nguồn:** [Vercel — Cursor is now available in the AI SDK harness layer](https://vercel.com/changelog/cursor-ai-sdk-harness-adapter)

* * *

# 💹 AI Models & FinOps

## Ling 3.0 Flash Fin miễn phí trên AI Gateway tới 25/09

Vercel đưa **Ling 3.0 Flash Fin** của Inclusion AI lên AI Gateway.

Đây là finance-focused variant của Ling 3.0 Flash.

Thông số Vercel công bố:

*   context: **256K tokens**;
    
*   output: tối đa **32K tokens**;
    
*   reasoning;
    
*   function calling;
    
*   multi-tool financial research workflows.
    

Model miễn phí tới **25/09/2026**.

Điểm implementation khá hay là Vercel cung cấp hai ID.

### Muốn tiếp tục sau promotion

```plaintext
inclusionai/ling-3.0-flash-fin
```

Sau 25/09 request bắt đầu tính giá bình thường.

### Muốn tuyệt đối không phát sinh phí

```plaintext
inclusionai/ling-3.0-flash-fin-free
```

Sau promotion, model ID này trả error thay vì tự động billing.

### Tác động với developer

`-free` là một guardrail tốt.

Promotion thường tạo risk:

```plaintext
free today
  -> production vẫn chạy
  -> promotion hết
  -> unexpected spend
```

Explicit model ID biến cost intent thành configuration.

### Developer nên làm gì?

Dùng `-free` cho:

*   experiment;
    
*   demo;
    
*   evaluation;
    
*   CI benchmark.
    

Dùng standard ID chỉ khi team thực sự chấp nhận continuing charges.

**Nguồn:** [Vercel — Ling 3.0 Flash Fin now available on AI Gateway for free](https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free)

* * *

# 🧰 Azure Developer Tooling

## Azure Developer CLI extension framework đã GA

Microsoft công bố August update của `azd`.

Điểm lớn nhất:

**Azure Developer CLI extension framework đã Generally Available.**

Extension có thể mở rộng `azd` bằng:

*   custom commands;
    
*   workflow;
    
*   service integrations.
    

Microsoft cũng mở rộng Azure Functions deployment.

Function có thể deploy từ:

*   Dockerfile;
    
*   prebuilt image;
    
*   Azure Container Registry remote build.
    

Option:

```plaintext
docker.imagePassthrough
```

cho phép deploy image đã publish bằng reference mà không cần local hay remote image operation.

Extension bundles cũng có thể được cài trực tiếp từ HTTPS URL mà không cần register source trước.

### Tác động với developer

Internal developer platforms thường tự xây nhiều script:

```plaintext
./deploy-x.sh
./bootstrap-y.sh
./setup-z.sh
```

Extension framework tạo một contract rõ hơn:

```plaintext
azd company-command
```

và giúp workflow có thể version, distribute, document.

Agent cũng thao tác CLI extension ổn định hơn một collection shell scripts rời rạc.

### Developer nên làm gì?

Nếu organization có nhiều `azd` wrapper scripts:

*   tìm những workflow lặp lại;
    
*   đóng gói thành extension;
    
*   version extension;
    
*   giữ non-interactive mode;
    
*   trả output có cấu trúc khi automation cần dùng.
    

**Nguồn:** [Microsoft — Azure Developer CLI (azd) – August 2026](https://devblogs.microsoft.com/azure-sdk/azure-developer-cli-azd-august-2026/)

* * *

# 🔗 Azure DevOps + Copilot

## Azure DevOps plugin xuất hiện trong GitHub Copilot app

Microsoft ngày 27/08 đưa Azure DevOps plugin vào GitHub Copilot app.

Initial release hỗ trợ:

*   xem work items;
    
*   xem pull requests;
    
*   mở work item/PR;
    
*   chỉnh work item;
    
*   chỉnh và complete pull request.
    

Plugin được cài từ:

```plaintext
Copilot app
  -> Customize
  -> Editor's picks
  -> Azure DevOps
```

### Tác động với developer

Copilot app đang tiến từ coding assistant sang **work-management surface**.

Agent có thể thấy cả:

```plaintext
requirement
work item
pull request
```

trong cùng workspace.

Điều đó giảm context copying nhưng cũng làm permission mapping quan trọng hơn.

### Developer nên làm gì?

Organization nên kiểm tra:

*   user identity mapping;
    
*   organization/project scope;
    
*   PR completion permissions;
    
*   audit trail.
    

Không nên mở broad Azure DevOps access chỉ vì plugin tiện.

**Nguồn:** [Microsoft — Azure DevOps in the GitHub Copilot App](https://devblogs.microsoft.com/devops/azure-devops-in-the-github-copilot-app/)

* * *

# 🌐 SharePoint Development

## SPFx 1.24 Beta 3 có React 18 và Copilot Components preview

Microsoft công bố roadmap update cho SharePoint Framework.

**SPFx 1.24 Beta 3** hiện có:

*   React 18 support;
    
*   Copilot Components Public Preview updates;
    
*   fixes từ beta trước;
    
*   npm audit vulnerability fixes.
    

Microsoft đặt mục tiêu:

### SPFx 1.24 GA — October 2026

*   Copilot Components GA;
    
*   React 18 support.
    

### SPFx 1.25 — December 2026 / January 2027

Roadmap tiếp tục mở rộng các capabilities sau 1.24.

### Tác động với developer

React 18 là một modernization step lớn với SPFx ecosystem.

Team giữ internal SharePoint web parts lâu năm giờ cần chuẩn bị dependency compatibility thay vì chỉ upgrade package version.

### Developer nên làm gì?

Trước GA:

*   tạo branch thử Beta 3;
    
*   chạy existing web parts;
    
*   kiểm tra React dependency;
    
*   kiểm tra Fluent UI/custom component;
    
*   chạy npm audit;
    
*   không upgrade production chỉ vì beta compile được.
    

**Nguồn:** [Microsoft — SharePoint Framework roadmap update – August 2026](https://devblogs.microsoft.com/microsoft365dev/sharepoint-framework-spfx-roadmap-update-august-2026/)

* * *

# 🧠 Contextual AI for .NET

## Uno Platform tách MCP thành docs server và live-app server

Microsoft .NET Blog đăng một case study kỹ thuật của Uno Platform ngày 27/08.

Uno tránh một anti-pattern rất phổ biến:

```plaintext
đổ toàn bộ docs vào prompt
```

Thay vào đó họ xây **hai MCP servers có lifetime khác nhau**.

### Docs server — grounding

Hosted qua HTTP.

Stateless.

OAuth.

Nhiệm vụ:

*   search official docs;
    
*   fetch docs;
    
*   load agent rules;
    
*   load API usage rules.
    

Knowledge thay đổi khi framework release.

### App server — eyes and hands

Chạy local qua stdio.

Stateful.

Một server thuộc đúng một developer session.

Agent có thể:

*   launch app;
    
*   lấy screenshot;
    
*   đọc visual tree XML;
    
*   click;
    
*   type;
    
*   gửi key;
    
*   gọi automation peer;
    
*   kiểm tra health.
    

Một insight rất hay:

> Screenshot cho biết “có gì đó trông sai”. Visual tree cho biết “element nào sai và state của nó là gì”.

### Tool-definition token cost

Uno cũng công bố context cost tương đối.

Docs server khoảng:

```plaintext
6.4K tokens
```

App server khoảng:

```plaintext
1.5K tokens
```

Điều này nhấn mạnh rằng tool schema cũng là context budget.

### Tác động với developer

MCP server không nên được chia theo:

```plaintext
feature A
feature B
```

một cách tùy ý.

Một strategy tốt hơn có thể là chia theo **lifetime và topology**.

```plaintext
stable/current knowledge
  -> hosted stateless

runtime state
  -> local stateful
```

### Developer nên làm gì?

Khi thiết kế MCP:

*   tính token cost của tool catalog;
    
*   viết description ngắn nhưng đủ steering;
    
*   chỉ expose tool agent thật sự cần;
    
*   tách knowledge khỏi runtime state;
    
*   cho agent verifier thay vì chỉ generator.
    

**Nguồn:** [Microsoft .NET Blog — How Uno Platform uses .NET, MCP, and AI to build high quality apps](https://devblogs.microsoft.com/dotnet/how-uno-platform-uses-dotnet-mcp-ai-to-build-high-quality-apps/)

* * *

# 🏭 Production Agents

## Microsoft Agent Harness thêm observability, governance và deployment

Microsoft Agent Framework tiếp tục series xây agent harness với bài ngày 27/08 về đưa agent từ local prototype tới production.

Bốn trục chính:

### Observability

OpenTelemetry traces cho:

*   model calls;
    
*   token usage;
    
*   tool calls;
    
*   workflow.
    

### Governance

Microsoft Purview dùng để kiểm soát/discover/audit data access trong regulated workflow.

### Deployment

Agent được deploy thành:

```plaintext
Foundry Hosted Agent
```

thay vì developer tự duy trì hosting stack.

### Production operations

Agent cần lifecycle và operations rõ hơn local CLI process.

### Tác động với developer

Một agent chạy được trên laptop chỉ chứng minh:

```plaintext
logic có thể hoạt động
```

Production cần thêm:

```plaintext
telemetry
policy
identity
deployment
audit
operations
```

Đây là sự khác biệt giữa agent demo và agent service.

### Developer nên làm gì?

Trước khi deploy agent cho nhiều user, hãy có checklist tối thiểu:

*   distributed tracing;
    
*   token/cost metrics;
    
*   tool-call logs;
    
*   sensitive-data policy;
    
*   explicit identity;
    
*   deployment rollback;
    
*   timeout;
    
*   session lifecycle.
    

**Nguồn:** [Microsoft Agent Framework — Agent Harness: Making your claw production-ready](https://devblogs.microsoft.com/agent-framework/agent-harness-making-your-claw-production-ready/)

* * *

# 🧑‍💻 IDE Roadmap

## CLion ưu tiên agentic workflows, embedded và debugger tới cuối 2026

JetBrains công bố CLion roadmap cho các bản:

*   2026.2.x;
    
*   2026.3.
    

Ba focus areas chính:

1.  Agentic workflows.
    
2.  Embedded development.
    
3.  Debugger.
    

CLion 2026.2 trước đó đã có debugger skill cho AI agents, cho phép agent dùng:

*   breakpoints;
    
*   stack traces;
    
*   variable values;
    

thay vì chỉ suy luận từ source.

Roadmap mới cho thấy JetBrains tiếp tục đầu tư vào hướng IDE trở thành semantic tool provider cho agents.

### Tác động với developer

IDE có rất nhiều knowledge model không có:

```plaintext
AST
symbols
debugger
build profiles
compiler diagnostics
embedded targets
```

Nếu agent sử dụng trực tiếp các capability này, task success có thể tăng mà không cần model lớn hơn.

### Developer nên làm gì?

Với coding agents trong C/C++:

*   cho agent debugger access nếu risk phù hợp;
    
*   dùng compile database;
    
*   expose deterministic build/debug profiles;
    
*   giữ hardware flashing/deployment phía sau explicit approval.
    

**Nguồn:** [JetBrains — The CLion Roadmap: What’s Coming Between Now and Late 2026](https://blog.jetbrains.com/clion/2026/08/roadmap/)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Cloud Run instances | Long-lived personal/AI agents có một compute primitive riêng giữa request-driven serverless và full VM. |
| 2 | Uno MCP architecture | Grounding và live verification được tách theo lifetime, cho agent cả knowledge lẫn khả năng tự nhìn/kiểm tra app đang chạy. |
| 3 | Cloudflare DNS memory optimization | Cho thấy data-layout engineering ở hyperscale có thể tiết kiệm 100 TB RAM đồng thời tăng throughput và giảm latency. |
| 4 | Copilot Code Review expansion | Bot-generated và very-large PRs bước vào full agentic review loop, kèm human feedback labels có cấu trúc. |
| 5 | Cursor + HarnessAgent | Coding-agent runtime tiếp tục trở thành interchangeable backend thông qua ACP và một orchestration interface chung. |

* * *

# 🛠 Công cụ đáng thử

## Cloud Run instances

Đáng thử nếu một long-lived agent hiện đang chạy trên VM chỉ để giữ đúng một process luôn sống.

[Cloud Run instances](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-instances)

* * *

## Cursor Harness Adapter

Hữu ích với platform đang muốn benchmark nhiều coding agents qua cùng orchestration layer.

[Vercel Cursor Harness](https://vercel.com/changelog/cursor-ai-sdk-harness-adapter)

* * *

## Uno MCP Servers

Đáng nghiên cứu nếu đang xây .NET/native UI agent cần **verify UI thật** thay vì chỉ generate source.

[Uno Platform MCP architecture](https://devblogs.microsoft.com/dotnet/how-uno-platform-uses-dotnet-mcp-ai-to-build-high-quality-apps/)

* * *

## Azure Developer CLI extensions

Phù hợp để biến internal deployment/bootstrap conventions thành commands có version thay cho các shell scripts riêng lẻ.

[Azure Developer CLI](https://devblogs.microsoft.com/azure-sdk/azure-developer-cli-azd-august-2026/)

* * *

# 📚 Bài viết nên đọc

## How we saved 100 terabytes of memory by optimizing 1.1.1.1’s DNS cache

Bài engineering hay nhất hôm nay nếu quan tâm systems performance.

Nó cho thấy cách:

*   allocation;
    
*   pointer;
    
*   data representation;
    
*   memory locality;
    

có thể biến thành fleet-level economics.

[Đọc trên Cloudflare](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)

* * *

## How Uno Platform uses .NET, MCP, and AI to build high quality apps

Bài đáng đọc nhất nếu đang thiết kế MCP server.

Hai lesson nổi bật:

1.  Chia server theo **lifetime/topology**, không chỉ theo feature.
    
2.  Tool descriptions chính là prompt và luôn tiêu context budget.
    

[Đọc trên Microsoft .NET Blog](https://devblogs.microsoft.com/dotnet/how-uno-platform-uses-dotnet-mcp-ai-to-build-high-quality-apps/)

* * *

## Introducing Cloud Run instances

Đáng đọc với developer đang tìm hosting model cho personal agents, singleton workers hoặc persistent automation.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-instances)

* * *

## Agent Harness: Making your claw production-ready

Đáng đọc nếu agent prototype đã chạy được nhưng team chưa có answer cho observability, governance và deployment.

[Đọc trên Microsoft Agent Framework](https://devblogs.microsoft.com/agent-framework/agent-harness-making-your-claw-production-ready/)

* * *

# 🚀 GitHub Repository nổi bật

## modelcontextprotocol/csharp-sdk

Uno Platform sử dụng official MCP C# SDK trong production architecture của cả hosted docs server và local application server.

Đây là repository đáng xem nếu xây MCP tooling trên .NET.

[github.com/modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk)

* * *

## vercel/ai

Cursor adapter tiếp tục mở rộng HarnessAgent ecosystem, biến AI SDK từ model abstraction sang cả coding-agent runtime abstraction.

[github.com/vercel/ai](https://github.com/vercel/ai)

* * *

## cloudflare/pingora

Không phải repository của DNS cache implementation nói trên, nhưng là một trong những codebase Rust infrastructure nổi bật của Cloudflare và hữu ích để nghiên cứu cách họ tiếp cận high-performance network systems.

[github.com/cloudflare/pingora](https://github.com/cloudflare/pingora)

* * *

## microsoft/agent-framework

Đáng theo dõi nếu muốn xây agent với observability, governance, channels và hosted deployment trong cùng ecosystem .NET/Python.

[github.com/microsoft/agent-framework](https://github.com/microsoft/agent-framework)

* * *

# 💬 Góc nhìn của mình

Điểm đáng chú ý nhất hôm nay là **verification đang bắt đầu đuổi kịp generation**.

Một vài năm qua, AI coding tập trung quá nhiều vào câu hỏi:

> Model viết code nhanh tới đâu?

Nhưng bottleneck thực tế đang chuyển thành:

> Model biết code nó vừa viết có thật sự đúng hay không bằng cách nào?

Uno Platform đưa ra một answer khá đẹp.

Không chỉ:

```plaintext
agent
  -> source code
```

mà:

```plaintext
agent
  -> source
  -> app chạy thật
  -> screenshot
  -> visual tree
  -> interaction
  -> verification
```

Đây gần giống Playwright cho native/cross-platform app.

Và điều mình thấy quan trọng nhất là họ không yêu cầu model “thông minh hơn” để giải quyết validation.

Họ đưa model **tool tốt hơn**.

Đây là pattern lặp lại rất nhiều:

```plaintext
code correctness
  -> compiler

runtime state
  -> debugger

browser behavior
  -> Playwright

native UI
  -> visual tree / automation

security
  -> static analyzer / policy checker

model
  -> reasoning trên evidence
```

AI nên đứng trên deterministic tooling, không thay thế nó.

Điểm thứ hai là Cloud Run instances.

Agent infrastructure đang phân hóa giống compute infrastructure truyền thống.

Chúng ta đã có:

```plaintext
serverless request
batch
VM
container
Kubernetes
```

Bây giờ xuất hiện thêm use case:

```plaintext
persistent singleton agent
```

Đây là dấu hiệu agent đã đủ phổ biến để cloud provider bắt đầu thiết kế compute primitive riêng cho behavior của nó.

Mình nghĩ xu hướng này sẽ tiếp tục.

Có thể tương lai sẽ có primitives rất cụ thể:

```plaintext
scheduled agent
event agent
interactive agent
persistent agent
large migration agent
```

mỗi loại có:

*   lifecycle;
    
*   memory;
    
*   cost;
    
*   isolation;
    
*   persistence;
    

khác nhau.

Điểm thứ ba là bài DNS cache của Cloudflare.

Nó là một reminder rất tốt trong tuần đầy AI announcement rằng software engineering vẫn là software engineering.

Một hệ thống có:

```plaintext
250 billion objects
```

không cần một model mới để tiết kiệm 100 TB.

Nó cần engineer nhìn vào memory layout.

AI có thể giúp viết patch.

Nhưng insight “một byte ở scale này đáng giá bao nhiêu?” vẫn là systems thinking.

Điểm thứ tư là feedback labels của Copilot Code Review.

Mình nghĩ đây là một primitive nhỏ nhưng quan trọng.

Nếu developer chỉ click:

```plaintext
resolve
```

không ai biết model đúng hay sai.

Nếu chọn:

```plaintext
Addressed
Won't fix
Incorrect
```

team bắt đầu có một evaluation dataset tự nhiên.

Tương lai, internal AI tooling nên thu thập loại feedback này nhiều hơn:

```plaintext
accepted
rejected
wrong
not useful
fixed
```

Đó là cách agent quality được cải thiện dựa trên outcome thật thay vì benchmark giả.

Cuối cùng là agent harness portability.

Cursor vào HarnessAgent một ngày sau khi ecosystem tiếp tục mở rộng Codex/Cline/Grok Build và các runtime khác.

Mình nghĩ application cuối cùng sẽ không thiết kế quanh:

```plaintext
"chúng tôi dùng coding agent X"
```

mà quanh:

```plaintext
coding task
  -> harness abstraction
  -> evaluator
  -> chọn runtime phù hợp
```

Model và coding runtime sẽ ngày càng giống compute backend.

Business workflow ở bên trên mới là asset lâu dài.

* * *

# 📝 Kết luận

Daily Tech Brief 28/08 chọn **13 chủ đề**, toàn bộ đều được công bố hoặc cập nhật ngày **27/08/2026**, nên không cần kéo nội dung cũ từ cửa sổ 24–72 giờ.

Nếu chỉ chọn ba việc để hành động hôm nay:

1.  Nếu agent hiện chỉ **generate rồi trả kết quả**, thêm một deterministic verification loop bằng compiler, debugger, browser hoặc runtime semantic tools.
    
2.  Nếu long-lived agent vẫn chạy trên VM chỉ vì cần một process luôn sống, benchmark **Cloud Run instances** hoặc primitive tương đương.
    
3.  Với AI code review, bắt đầu lưu **lý do accept/reject finding** để biến human review thành evaluation data có cấu trúc.
    

Xu hướng hôm nay có thể gói trong một câu:

**Coding agent đang dần thôi là một “model biết code” và trở thành một software worker có runtime, tools, feedback và verification loop riêng.**

* * *

# 🔗 Nguồn tham khảo

1.  [Google Cloud — Introducing Cloud Run instances](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-instances)
    
2.  [GitHub — Copilot Code Review expanded capabilities](https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities/)
    
3.  [GitHub — Actions retention changes](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
    
4.  [GitHub — Close blocked-user contributions](https://github.blog/changelog/2026-08-27-close-all-open-contributions-authored-by-a-blocked-user/)
    
5.  [Cloudflare — DNS cache memory optimization](https://blog.cloudflare.com/dns-cache-memory-optimization-1111/)
    
6.  [Vercel — Cursor Harness Adapter](https://vercel.com/changelog/cursor-ai-sdk-harness-adapter)
    
7.  [Vercel — Ling 3.0 Flash Fin](https://vercel.com/changelog/ling-3-0-flash-fin-now-available-on-ai-gateway-for-free)
    
8.  [Microsoft — Azure DevOps in the GitHub Copilot App](https://devblogs.microsoft.com/devops/azure-devops-in-the-github-copilot-app/)
    
9.  [Microsoft — Azure Developer CLI August 2026](https://devblogs.microsoft.com/azure-sdk/azure-developer-cli-azd-august-2026/)
    
10.  [Microsoft — SharePoint Framework roadmap August 2026](https://devblogs.microsoft.com/microsoft365dev/sharepoint-framework-spfx-roadmap-update-august-2026/)
     
11.  [Microsoft .NET — Uno Platform, MCP and AI](https://devblogs.microsoft.com/dotnet/how-uno-platform-uses-dotnet-mcp-ai-to-build-high-quality-apps/)
     
12.  [Microsoft Agent Framework — Agent Harness](https://devblogs.microsoft.com/agent-framework/agent-harness-making-your-claw-production-ready/)
     
13.  [JetBrains — CLion roadmap through late 2026](https://blog.jetbrains.com/clion/2026/08/roadmap/)