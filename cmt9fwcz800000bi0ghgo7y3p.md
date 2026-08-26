---
title: "Daily Tech Brief — 26/08/2026"
seoTitle: "Daily Tech Brief — 26/08/2026"
seoDescription: "OpenAI công bố chip Jalapeño, Google Cloud scale Ray sandboxes tới 100K, Gemini Enterprise ra bản Legal/Finance, Vercel Connect GA và AI Gateway hỗ trợ async video."
datePublished: 2026-08-26T01:53:17.548Z
cuid: cmt9fwcz800000bi0ghgo7y3p
slug: daily-tech-brief-26-08-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e2f3b0ce-9906-4d13-9f75-64d1b281d606.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/d3bd62c1-75c8-4b53-9a72-28ffdec3b9b8.png
tags: openai, ai-agents, ai-infrastructure, daily-tech-brief, daily-tech-brief-26-08-2026, jalape-o

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source, Security và những thay đổi đáng chú ý trong hệ sinh thái phát triển phần mềm.

* * *

## 📌 Executive Summary

*   **OpenAI công bố kết quả đầu tiên của Jalapeño, chip inference tùy biến đầu tiên của hãng.** Trên benchmark InferenceX với GPT‑OSS 120B, OpenAI cho biết Jalapeño đạt throughput trên mỗi watt cao hơn và token latency thấp hơn các hệ thống thương mại được so sánh; chip cũng được thử với DeepSeek R1 và Kimi K2.
    
*   OpenAI đang nhìn AI infrastructure như một hệ thống end-to-end gồm **model + serving software + chip + memory + network + datacenter**. Mục tiêu không chỉ là benchmark cao mà là tối ưu “useful intelligence per dollar”.
    
*   **Google Cloud đưa gVisor sandbox vào Ray on GKE**, hướng tới các workload reinforcement learning và agent thực thi code không tin cậy. Google cho biết hệ thống có thể scale tới **100.000 sandbox trong 17,3 giây** trên hàng nghìn node.
    
*   **Gemini Enterprise for Financial Services bắt đầu Preview**, đưa agent vào capital markets và corporate banking với hơn 50 foundational skills, MCP connectors, A2A APIs, confidence scores, source citations và governed control plane.
    
*   **Gemini Enterprise for Legal cũng được công bố**, tập trung contract review, redlining, regulatory research, legal research và DSAR; permission từ document/case systems được giữ xuyên MCP connectors thay vì agent bypass quyền hiện có.
    
*   **GitHub Copilot app có Customize tab ở GA**, gom MCP servers, plugins, skills và canvases vào một nơi để developer discovery và cài capability cho agent dễ hơn.
    
*   **GitHub Rule Insights dashboard chính thức GA ở cả repository và organization level**, cho phép nhìn successes, failures, bypasses và repository có bypass nhiều nhất mà không cần tự ghép audit data.
    
*   **GitHub push rulesets có path exceptions ở Public Preview**, giải quyết tình huống phải block một loại file trên toàn repository nhưng vẫn cần ngoại lệ ở một path hẹp.
    
*   **Vercel Connect chính thức GA trên tất cả plans**, chuyển third-party integrations khỏi long-lived provider secrets sang short-lived scoped tokens được cấp tại runtime bằng Vercel OIDC identity.
    
*   **AI Gateway của Vercel hỗ trợ asynchronous video generation**, với webhook, polling hoặc `startVideo` + `getVideoStatus`; long-running generation không còn phải giữ một HTTP request mở trong nhiều phút.
    
*   **Alibaba Wan 3.0 xuất hiện trên Vercel AI Gateway**, hợp nhất text-to-video, image-to-video, reference-based generation và first/last-frame conditioning trong một model, tạo clip tối đa 30 giây ở 30 fps và hỗ trợ tới 1080p.
    
*   **Chat SDK đang biến agent thành multi-channel worker:** Notion comments, Slack Enterprise Grid và XChat đều có adapter mới, trong đó XChat adapter xử lý encryption, key management và signature verification.
    
*   **Cloudflare kêu gọi triển khai ML-DSA ngay thay vì chờ thế hệ post-quantum signature “tốt hơn”.** Lập luận chính: ML-KEM và ML-DSA đã được NIST chuẩn hóa và crypto migration cần nhiều năm, nên trì hoãn sẽ làm cửa sổ chuyển đổi ngắn hơn.
    
*   **Visual Studio August Update đưa reasoning effort thành runtime control**, đồng thời hỗ trợ chia sẻ custom agents trong organization, xem Copilot usage ngay trong IDE và cải thiện Git worktrees/submodules.
    
*   **Microsoft Foundry Hosted Agents giảm khoảng cách từ local agent sang production deployment**, cung cấp managed infrastructure, per-session compute, scale-to-zero và built-in persistent session state.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Có ba xu hướng nổi bật hôm nay.

Thứ nhất, **AI infrastructure đang chuyển từ “mua GPU” sang full-stack co-design**.

OpenAI Jalapeño là ví dụ rõ nhất. Model, serving software, memory, network và chip được xem như một optimization problem duy nhất. Đây là cách tiếp cận quen thuộc trong database hoặc hyperscale networking: khi workload đủ lớn, optimization ở từng component độc lập không còn đủ.

Điều thú vị là OpenAI không định vị Jalapeño như cách thay thế toàn bộ accelerator của đối tác. Họ vẫn nói tới một portfolio gồm NVIDIA, Microsoft, AWS, AMD, Cerebras, CoreWeave và nhiều provider khác.

Kiến trúc đang tiến tới:

```plaintext
workload
  ↓
performance / cost requirements
  ↓
scheduler / routing
  ↓
accelerator phù hợp
```

thay vì:

```plaintext
tất cả workload
  -> cùng một GPU
```

Thứ hai, **agent sandbox trở thành infrastructure primitive**.

Google đưa gVisor vào Ray on GKE vì RL và agent workload thường phải chạy code mà model vừa sinh ra. Đây là một security boundary hoàn toàn khác inference thông thường.

```plaintext
model output
   ↓
generated code
   ↓
execution
```

Nếu bước execution dùng cùng privilege với host, một mistake hoặc malicious trajectory có thể đi xa hơn rất nhiều so với một hallucinated answer.

Thứ ba, **agent platform đang trưởng thành từ model + tools thành identity + governance + runtime**.

Vercel Connect cấp scoped credential tại runtime.

Gemini Enterprise giữ enterprise permissions xuyên connector.

GitHub hiển thị policy bypass thay vì chỉ configuration.

Visual Studio cho organization chia sẻ custom agents.

Tất cả đều phản ánh một thay đổi:

> Production AI không được quyết định chỉ bởi model intelligence. Nó được quyết định bởi khả năng giữ identity, permission, execution và observability nhất quán xuyên toàn workflow.

* * *

# 📰 Tin nổi bật

## 🧠 AI Infrastructure

### OpenAI công bố kết quả đầu tiên của chip inference Jalapeño

OpenAI ngày 25/08 chia sẻ kết quả đo đầu tiên của **Jalapeño**, custom inference chip đầu tiên của công ty.

Theo OpenAI, trên public benchmark InferenceX với GPT‑OSS 120B, Jalapeño đạt:

*   peak throughput trên mỗi kilowatt cao hơn các commercial systems trong comparison;
    
*   token latency thấp hơn;
    
*   kết quả tốt khi chạy thêm DeepSeek R1 và Kimi K2.
    

Điểm quan trọng là Jalapeño không được xây như một chip độc lập.

OpenAI mô tả stack:

```plaintext
model
  +
serving software
  +
chip
  +
memory
  +
network
```

được co-design cùng nhau.

Mục tiêu là đồng thời tối ưu:

*   throughput;
    
*   latency;
    
*   energy efficiency;
    
*   cost.
    

OpenAI cũng nói future generations của Jalapeño đã được phát triển tiếp.

### Tác động với developer

Ở tầng application, developer có thể không bao giờ gọi trực tiếp “Jalapeño API”.

Nhưng custom inference silicon có thể tác động trực tiếp đến:

*   token price;
    
*   latency;
    
*   rate limits;
    
*   context economics;
    
*   agent concurrency.
    

Khi inference rẻ hơn và nhanh hơn, những workflow trước đây không kinh tế có thể trở nên khả thi.

Ví dụ:

```plaintext
review 1% documents
    -> review 100%

one AI call / ticket
    -> multi-step agent / ticket

batch analysis overnight
    -> interactive analysis
```

### Developer nên làm gì?

Đừng thiết kế application với giả định economics của inference đứng yên.

Nên giữ:

*   model abstraction;
    
*   service-tier abstraction;
    
*   async workflows;
    
*   cost telemetry;
    
*   latency telemetry.
    

Như vậy application có thể tận dụng generation infrastructure mới mà không phải rewrite business logic.

**Nguồn:** [OpenAI — The full stack behind abundant intelligence](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)

* * *

## 🧱 Sandboxed AI Execution

### Ray on GKE dùng gVisor để sandbox code do agent thực thi

Google Cloud đưa **gVisor sandboxes** vào Ray clusters trên GKE.

Use case quan trọng là reinforcement learning và agentic workloads nơi model cần:

*   chạy code;
    
*   test code;
    
*   execute shell-like tasks;
    
*   tương tác môi trường tạm.
    

Google cho biết kiến trúc có thể scale tới khoảng:

```plaintext
100.000 sandboxes
trong 17,3 giây
```

phân bố trên hàng nghìn nodes.

gVisor tạo isolation boundary mạnh hơn container Linux thông thường bằng cách interpose một user-space kernel giữa workload và host kernel.

### Tác động với developer

Agent execution có risk profile khác inference.

```plaintext
inference:
  untrusted prompt
    -> text output

coding / RL agent:
  untrusted prompt
    -> code
    -> execution
```

Ở bước thứ hai, model output có thể tác động filesystem, network hoặc credentials.

Sandbox vì vậy nên trở thành default thay vì optional security hardening.

### Developer nên làm gì?

Nếu coding agent hoặc test agent đang thực thi generated code:

*   dùng ephemeral sandbox;
    
*   giới hạn network;
    
*   không mount toàn bộ `$HOME`;
    
*   inject credential riêng theo task;
    
*   đặt CPU/RAM/time quota;
    
*   destroy environment sau task;
    
*   giữ artifact cần thiết trước khi teardown.
    

**Nguồn:** [Google Cloud — gVisor sandboxes for Ray clusters on GKE](https://cloud.google.com/blog/products/containers-kubernetes/gvisor-sandboxes-for-ray-clusters-on-gke)

* * *

## 🏦 Enterprise AI

### Gemini Enterprise for Financial Services bước vào Preview

Google Cloud công bố **Gemini Enterprise for Financial Services** cho capital markets và corporate banking.

Platform gồm bốn thành phần chính.

### Purpose-built financial skills

Reusable instructions/context dành cho:

*   research;
    
*   reporting;
    
*   risk;
    
*   portfolio analysis;
    
*   KYC.
    

Financial Research agent được Google cho biết có hơn **50 foundational skills**.

### Secure MCP connectors

Kết nối tới:

*   FactSet;
    
*   Moody’s;
    
*   S&P Global;
    
*   MSCI;
    
*   PitchBook;
    
*   SEC Edgar;
    
*   Google Workspace;
    
*   Microsoft 365;
    
*   và các nguồn khác.
    

Điểm quan trọng: access tiếp tục tuân theo entitlement hiện có.

### Agents that act

Financial Research agent có:

*   explicit methodology;
    
*   confidence score;
    
*   data snapshots;
    
*   citations.
    

Agent cũng expose A2A APIs để tham gia workflow agent khác.

### Governed control plane

IT/risk team có:

*   VPC;
    
*   CMEK;
    
*   private data isolation;
    
*   traceable citations;
    
*   centralized policy.
    

Gemini Enterprise for Financial Services hiện ở **Preview**.

### Tác động với developer

Domain-specific agent đang chuyển từ:

```plaintext
general LLM
  + huge system prompt
```

sang:

```plaintext
model
  + domain skills
  + governed data
  + existing entitlements
  + specialized tools
```

Đây là pattern có thể áp cho nhiều enterprise use case ngoài finance.

### Developer nên làm gì?

Nếu xây domain agent nội bộ:

*   encode expertise thành reusable skills;
    
*   giữ data permission ở source system;
    
*   require citations;
    
*   lưu snapshot/input cho audit;
    
*   không copy toàn bộ enterprise data vào một vector store chỉ để “AI dùng được”.
    

**Nguồn:** [Google Cloud — Gemini Enterprise for Financial Services](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services)

* * *

### Gemini Enterprise for Legal đưa ethical walls và matter permissions vào agent platform

Cùng ngày, Google công bố **Gemini Enterprise for Legal**.

Platform cung cấp skills cho:

*   contract review;
    
*   redlining;
    
*   playbook creation;
    
*   regulatory horizon scanning;
    
*   legal research;
    
*   DSAR fulfillment.
    

Secure MCP connectors nối agent tới document-management systems, case repositories và research services.

Google nhấn mạnh permission hiện có được kế thừa thay vì bị flatten.

Điều này đặc biệt quan trọng với legal environment, nơi hai lawyer trong cùng firm chưa chắc được phép truy cập cùng matter.

### Tác động với developer

Enterprise permissions không thể bị thay bằng một binary:

```plaintext
authenticated = true
```

Agent phải giữ authorization context xuyên:

```plaintext
user
  -> agent
  -> connector
  -> source system
```

Nếu quyền bị mất ở giữa chuỗi, agent có thể trở thành một privilege-escalation layer.

### Developer nên làm gì?

Khi xây enterprise agent:

*   propagate user identity;
    
*   preserve row/document-level permissions;
    
*   không dùng service account global nếu không thật sự cần;
    
*   audit source citations;
    
*   tách agent memory giữa tenants/matters.
    

**Nguồn:** [Google Cloud — Gemini Enterprise for Legal](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-legal)

* * *

# 🤖 GitHub & Coding Agents

## Copilot App có Customize tab ở GA

GitHub đưa **Customize tab** trong Copilot app lên Generally Available.

Tab này gom:

*   MCP servers;
    
*   plugins;
    
*   skills;
    
*   canvases;
    

vào một discovery surface.

Developer có thể:

*   browse featured customizations;
    
*   tìm MCP server theo category;
    
*   xem trending integrations;
    
*   khám phá reusable skills.
    

GitHub cũng đưa các canvas workflow như delegation từ Azure DevOps backlog vào cùng customization layer.

### Tác động với developer

Agent capability đang bắt đầu giống package ecosystem.

Thay vì:

```plaintext
copy prompt
configure MCP JSON
install extension
update docs
```

developer có thể discovery reusable capability từ một catalog.

Nhưng convenience cũng tạo supply-chain concern.

Một plugin hoặc MCP server có thể mang quyền lớn hơn một IDE theme rất nhiều.

### Developer nên làm gì?

Trước khi cài customization:

*   review source;
    
*   review required permissions;
    
*   pin version nếu có thể;
    
*   tách personal tool khỏi enterprise-approved tool;
    
*   kiểm tra MCP server có write access hay không.
    

**Nguồn:** [GitHub — Copilot app Customize tab is generally available](https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available/)

* * *

## GitHub Rule Insights dashboard chính thức GA

Rule Insights dashboard hiện GA ở:

*   repository level;
    
*   organization level.
    

Organization có thể xem:

*   aggregated rule evaluations;
    
*   repository có nhiều bypass nhất;
    
*   status;
    
*   branch;
    
*   ruleset;
    
*   date range.
    

Repository view hiển thị:

*   successful evaluations;
    
*   failed evaluations;
    
*   bypasses;
    
*   frequent bypass actors.
    

Dữ liệu có thể export CSV.

### Tác động với developer

Policy configuration và policy enforcement là hai thứ khác nhau.

Một ruleset có thể yêu cầu:

```plaintext
2 reviews
status checks
no force pushes
```

nhưng nếu bypass xảy ra thường xuyên thì effective governance lại rất khác.

Dashboard đưa **behavior** vào governance.

### Developer nên làm gì?

Theo dõi:

```plaintext
bypass rate
bypass actor
repository concentration
rule failures
```

Không nên coi bypass luôn là incident, nhưng bypass bất thường nên được review.

**Nguồn:** [GitHub — Rule Insights dashboard generally available](https://github.blog/changelog/2026-08-25-rule-insights-dashboard-generally-available/)

* * *

## Push rulesets có path exceptions

GitHub đưa **path exceptions** cho push rules vào Public Preview.

Ví dụ organization muốn block tất cả `.jar`:

```plaintext
**/*.jar
```

nhưng Gradle wrapper cần:

```plaintext
**/gradle/wrapper/*.jar
```

Ruleset giờ có thể:

```plaintext
block *.jar
except gradle/wrapper/*.jar
```

Hai loại rule hiện hỗ trợ exceptions:

*   restrict file paths;
    
*   restrict file size.
    

### Tác động với developer

Security policy quá rigid thường dẫn tới hai kết quả xấu:

*   team disable rule;
    
*   team tìm workaround ngoài GitHub.
    

Narrow exception tốt hơn việc hạ policy cho toàn repository.

### Developer nên làm gì?

Exception nên:

*   có path nhỏ nhất có thể;
    
*   có owner;
    
*   có reason;
    
*   được review định kỳ.
    

**Nguồn:** [GitHub — Push rules in rulesets now support path exceptions](https://github.blog/changelog/2026-08-25-push-rules-in-rulesets-now-support-path-exceptions/)

* * *

# 🔐 Identity & Integrations

## Vercel Connect chính thức GA

Vercel Connect hiện **Generally Available trên tất cả plans** và trong v0.

Thay vì lưu:

```plaintext
SLACK_TOKEN=...
SALESFORCE_TOKEN=...
GITHUB_TOKEN=...
```

application có thể request token tại runtime:

```plaintext
application identity
  -> Vercel OIDC
  -> Connect
  -> scoped short-lived token
  -> provider
```

Connect hỗ trợ hơn 100 preset connectors cùng generic:

*   OAuth;
    
*   API key;
    
*   MCP.
    

Ở GA, Vercel bổ sung:

*   fine-grained RBAC;
    
*   audit logs;
    
*   token observability;
    
*   trigger observability;
    
*   one-command revocation;
    
*   environment-specific connector attachment.
    

Token có thể đại diện:

*   application;
    
*   hoặc một named user.
    

### Tác động với developer

Đây là một architecture tốt hơn static secrets cho agent.

Credential không cần:

*   tồn tại lâu;
    
*   nằm trong environment variables;
    
*   được chia sẻ cho mọi session.
    

Agent chỉ cần capability tại thời điểm task thực hiện.

### Developer nên làm gì?

Nếu application đang giữ SaaS secrets lâu dài:

1.  Inventory secrets.
    
2.  Xem provider nào có OAuth/workload identity.
    
3.  Chuyển dần sang runtime token.
    
4.  Scope token theo user/task.
    
5.  Log token issuance.
    
6.  Revoke integration không còn dùng.
    

**Nguồn:** [Vercel — Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)

* * *

# 🎬 Multimodal AI

## AI Gateway hỗ trợ asynchronous video generation

Video generation thường mất vài chục giây hoặc vài phút.

Giữ một request mở:

```plaintext
client
  -> HTTP request
  -> video generation
  -> wait...
  -> wait...
  -> response
```

rất dễ gặp:

*   function timeout;
    
*   proxy timeout;
    
*   connection loss.
    

Vercel AI Gateway giờ hỗ trợ các flow:

### Webhook

```plaintext
generate
  -> callback khi hoàn tất
```

### Polling

SDK định kỳ kiểm tra status.

### Start + status

```plaintext
startVideo()
  -> job ID
```

sau đó:

```plaintext
getVideoStatus()
```

### Durable Workflow

Workflow suspend trong lúc video render nên không giữ compute active.

Operation object có thể serialize vào database hoặc queue.

### Tác động với developer

Long-running AI generation nên được xử lý như **job**, không phải synchronous RPC.

Pattern này không chỉ áp dụng video.

Nó phù hợp với:

*   long code generation;
    
*   report generation;
    
*   document conversion;
    
*   batch research;
    
*   large agent workflow.
    

### Developer nên làm gì?

Thiết kế:

```plaintext
POST /jobs
  -> job_id

worker / provider

webhook / polling

GET /jobs/{id}
```

Thêm:

*   idempotency;
    
*   retry;
    
*   timeout;
    
*   cancellation;
    
*   durable state.
    

**Nguồn:** [Vercel — AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)

* * *

## Wan 3.0 hợp nhất nhiều video-generation modes

Alibaba **Wan 3.0** có mặt trên AI Gateway với model ID:

```plaintext
alibaba/wan-v3.0-video
```

Một model hỗ trợ:

*   text-to-video;
    
*   image-to-video;
    
*   reference-based generation;
    
*   first-frame conditioning;
    
*   last-frame conditioning.
    

Input reference có thể gồm:

*   image;
    
*   video;
    
*   audio.
    

Output tối đa:

*   30 giây;
    
*   30 fps;
    
*   480p / 720p / 1080p;
    
*   audio mặc định.
    

Wan 2.7 trước đây phải dùng nhiều model ID riêng và giới hạn 15 giây/24 fps.

### Tác động với developer

Multimodal API đang hội tụ.

Application không cần tự route:

```plaintext
text -> model A
image -> model B
reference -> model C
```

cùng mức độ như trước.

Nhưng abstraction API đơn giản hơn không đồng nghĩa workload đơn giản hơn: file size, generation duration và async state vẫn cần orchestration tốt.

### Developer nên làm gì?

Video application nên có:

*   async job queue;
    
*   durable generation metadata;
    
*   content moderation;
    
*   file lifecycle;
    
*   storage cleanup;
    
*   cost limit;
    
*   retry policy.
    

**Nguồn:** [Vercel — Wan 3.0 now available on AI Gateway](https://vercel.com/changelog/wan-3-0-now-available-on-ai-gateway)

* * *

# 💬 Multi-Channel Agents

## Chat SDK đưa cùng một agent vào Notion, Slack Enterprise Grid và XChat

Vercel có ba update Chat SDK đáng chú ý ngày 25/08.

### Notion adapter

Agent có thể tham gia comment discussion trực tiếp trên Notion pages.

Cùng bot logic đã chạy trên:

*   Slack;
    
*   Discord;
    
*   GitHub;
    
*   Teams;
    
*   WhatsApp;
    

có thể thêm Notion mà không cần một codebase riêng.

### Slack Enterprise Grid

Bot có thể install ở organization level và chạy xuyên nhiều workspaces.

Adapter xử lý:

*   enterprise installation IDs;
    
*   workspace-specific token resolution;
    
*   tenant-scoped caches;
    
*   Slack Connect shared channels;
    
*   retry deduplication trong 24 giờ.
    

### XChat

Chat SDK có adapter cho encrypted 1:1 và group conversations.

Adapter xử lý:

*   encryption;
    
*   key management;
    
*   signature verification.
    

### Tác động với developer

Agent business logic đang tách khỏi communication channel.

Architecture tốt hơn:

```plaintext
Slack
Notion
Teams
XChat
   ↓
adapters
   ↓
normalized conversation events
   ↓
core agent
   ↓
normalized response
   ↓
adapters
```

### Developer nên làm gì?

Giữ channel-specific policy trong adapter:

*   message size;
    
*   markdown;
    
*   permissions;
    
*   encryption;
    
*   retry semantics.
    

Không đưa những rule này vào core reasoning prompt.

**Nguồn:** [Vercel — Notion Chat SDK adapter](https://vercel.com/changelog/notion-chat-sdk), [Slack Enterprise Grid adapter](https://vercel.com/changelog/chat-sdk-slack-enterprise-grid), [XChat adapter](https://vercel.com/changelog/chat-sdk-now-supports-xchat)

* * *

# 🔒 Post-Quantum Security

## Cloudflare: đừng chờ post-quantum signature “tốt hơn” — triển khai ML-DSA

Cloudflare công bố một bài phân tích dài về lựa chọn post-quantum signatures.

NIST đang đánh giá thêm nhiều signature algorithms trong tương lai.

Nhưng Cloudflare cho rằng organization không nên trì hoãn migration chỉ để chờ một algorithm có thể:

*   nhỏ hơn;
    
*   nhanh hơn;
    
*   đẹp hơn về trade-off.
    

Hai primitives đã được NIST chuẩn hóa năm 2024:

*   **ML-KEM** cho key establishment;
    
*   **ML-DSA** cho digital signatures.
    

Cloudflare cho rằng đây là lựa chọn đủ tốt để bắt đầu migration ngay.

### Tác động với developer

Crypto migration thường mất lâu hơn update application dependency.

Nó ảnh hưởng:

*   TLS;
    
*   PKI;
    
*   certificate;
    
*   firmware;
    
*   software signing;
    
*   HSM;
    
*   KMS;
    
*   partner protocols.
    

Nếu tổ chức đợi tới lúc quantum threat trở nên cấp bách mới bắt đầu inventory, thời gian còn lại có thể không đủ.

### Developer nên làm gì?

Bắt đầu bằng crypto agility:

```plaintext
inventory
  -> identify RSA/ECC
  -> identify long-lived signatures
  -> identify vendor dependency
  -> plan hybrid/PQC support
  -> test
  -> staged migration
```

Không cần tự implement ML-DSA.

Dùng crypto library/platform được maintain.

**Nguồn:** [Cloudflare — ML-DSA will have to do](https://blog.cloudflare.com/ml-dsa-will-have-to-do/)

* * *

# 🪟 Microsoft Developer Tooling

## Visual Studio August Update đưa reasoning effort thành control trực tiếp

Visual Studio August Update cho phép developer điều chỉnh **thinking effort** cho supported models.

Không phải task nào cũng cần cùng mức reasoning.

Ví dụ:

```plaintext
rename variable
  -> low

analyze race condition
  -> high
```

Update cũng có:

*   share custom agents trong organization;
    
*   xem Copilot usage trong IDE;
    
*   Git worktrees;
    
*   first-class Git submodules support.
    

### Tác động với developer

Model selection UX đang tiếp tục chuyển từ:

```plaintext
chọn model
```

sang:

```plaintext
chọn intent / effort
```

Đây là abstraction tốt hơn vì model lineup thay đổi liên tục.

### Developer nên làm gì?

Nếu xây AI UX riêng, cân nhắc expose:

*   Fast;
    
*   Balanced;
    
*   Deep;
    

thay vì bắt user hiểu tên từng model/provider.

Backend router có thể map intent sang model/tier phù hợp.

**Nguồn:** [Microsoft — Visual Studio August Update](https://devblogs.microsoft.com/visualstudio/visual-studio-august-update-work-smarter-across-models-and-branches/)

* * *

## Microsoft Foundry Hosted Agents giảm khoảng cách từ local prototype tới production

Microsoft mô tả workflow từ một C# agent chạy bằng:

```plaintext
dotnet run
```

sang **Foundry Hosted Agents**.

Managed hosting cung cấp:

*   infrastructure được provision tự động;
    
*   không phải tự tạo web server/container;
    
*   compute theo session;
    
*   scale-to-zero khi idle;
    
*   built-in session state;
    
*   persistent `$HOME`;
    
*   uploaded files tồn tại xuyên nhiều turns/idle periods.
    

### Tác động với developer

Agent deployment khác REST API thông thường.

Agent có thể cần:

*   session;
    
*   files;
    
*   tool state;
    
*   long-running context;
    
*   per-session compute.
    

Nếu application tự xây toàn bộ layer này, infrastructure code nhanh chóng lớn hơn agent logic.

### Developer nên làm gì?

Trước khi tự viết orchestration layer, kiểm tra platform hiện tại đã có:

*   session persistence;
    
*   sandbox;
    
*   autoscaling;
    
*   identity;
    
*   tool hosting;
    
*   trace;
    
*   file state;
    

hay chưa.

Custom infrastructure chỉ nên xuất hiện khi managed abstraction không đáp ứng constraint thật sự.

**Nguồn:** [Microsoft .NET Blog — From dotnet run to Foundry Hosted Agent](https://devblogs.microsoft.com/dotnet/from-dotnet-run-to-foundry-hosted-agent-in-3-lines-of-csharp/)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | OpenAI Jalapeño | Inference economics bắt đầu được tối ưu xuyên chip, serving software, memory và networking thay vì chỉ model hoặc GPU riêng lẻ. |
| 2 | gVisor + Ray on GKE | Agent execution ở quy mô lớn đang có sandbox isolation như một phần mặc định của AI infrastructure. |
| 3 | Vercel Connect GA | Agent/tool credentials chuyển khỏi static secrets sang scoped, short-lived runtime identity. |
| 4 | Gemini Enterprise Legal/Finance | Domain agents được xây quanh skills + governed data + MCP + inherited permissions thay vì general LLM + prompt. |
| 5 | GitHub Rules governance | Platform team giờ có thể đo bypass behavior thực tế thay vì chỉ biết policy đã được cấu hình. |

* * *

# 🛠 Công cụ đáng thử

## Vercel Connect

Đáng thử nhất nếu project đang có nhiều:

```plaintext
API_KEY
ACCESS_TOKEN
CLIENT_SECRET
```

dành cho third-party services.

[Vercel Connect](https://vercel.com/connect)

* * *

## Ray Sandboxes on GKE

Phù hợp nếu đang chạy:

*   RL environments;
    
*   coding agents;
    
*   generated-code execution;
    
*   untrusted evaluation workloads.
    

[Google Cloud Ray Sandboxes](https://cloud.google.com/blog/products/containers-kubernetes/gvisor-sandboxes-for-ray-clusters-on-gke)

* * *

## GitHub Rule Insights

Đáng bật nếu organization đã dùng rulesets nhưng chưa có cách nhìn tập trung vào bypass/failure behavior.

[GitHub Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)

* * *

## Vercel Speed Insights

Speed Insights vừa có free tier cho mọi plan với **10.000 events/team mỗi 30 ngày**, phù hợp để lấy Real User Monitoring baseline trước khi đầu tư thêm observability.

[Vercel Speed Insights](https://vercel.com/changelog/speed-insights-free-tier)

* * *

# 📚 Bài viết nên đọc

## The full stack behind abundant intelligence

Bài đáng đọc nhất hôm nay nếu quan tâm economics của AI infrastructure.

Điểm quan trọng không phải chỉ Jalapeño, mà là tư duy:

```plaintext
useful intelligence / dollar
```

thay vì:

```plaintext
benchmark / chip.
```

[Đọc trên OpenAI](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)

* * *

## gVisor sandboxes for Ray clusters on GKE

Đáng đọc nếu coding/RL agent đang thực thi code tự sinh và team cần hiểu isolation layer ở quy mô lớn.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/containers-kubernetes/gvisor-sandboxes-for-ray-clusters-on-gke)

* * *

## Gemini Enterprise for Financial Services

Một reference architecture tốt cho enterprise agents cần domain expertise, licensed data, source citations và auditable outputs.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services)

* * *

## ML-DSA will have to do

Bài technical deep dive đáng đọc nếu đang lập roadmap PQC.

Điểm quan trọng là hiểu vì sao “đợi thuật toán tốt hơn” cũng là một quyết định có risk.

[Đọc trên Cloudflare](https://blog.cloudflare.com/ml-dsa-will-have-to-do/)

* * *

## Vercel Connect is now GA

Một implementation thực tế của workload identity và runtime-scoped third-party credentials cho app/agent.

[Đọc trên Vercel](https://vercel.com/changelog/vercel-connect-ga)

* * *

# 🚀 GitHub Repository nổi bật

## google/gvisor

gVisor là thành phần đáng chú ý nhất hôm nay dưới góc nhìn open-source infrastructure.

Repository giúp hiểu cách user-space kernel được dùng để tăng isolation cho untrusted workloads.

[github.com/google/gvisor](https://github.com/google/gvisor)

* * *

## ray-project/ray

Ray tiếp tục là runtime quan trọng cho distributed AI, RL và parallel agent workloads.

[github.com/ray-project/ray](https://github.com/ray-project/ray)

* * *

## modelcontextprotocol

MCP xuất hiện xuyên cả Gemini Enterprise, GitHub Copilot customization và Vercel Connect.

Nó tiếp tục trở thành một interoperability layer trọng yếu giữa agent và external capability.

[github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)

* * *

## vercel/ai

AI SDK ecosystem đáng theo dõi khi Vercel mở rộng từ text generation sang video jobs, agent integrations và runtime credentials.

[github.com/vercel/ai](https://github.com/vercel/ai)

* * *

# 💬 Góc nhìn của mình

Điều đáng chú ý nhất hôm nay là **AI infrastructure bắt đầu phân lớp giống cloud infrastructure trưởng thành**.

Ở thời kỳ đầu, một AI app thường có sơ đồ:

```plaintext
application
  -> OpenAI / Anthropic / Gemini
```

Bây giờ stack đã giống:

```plaintext
identity
  ↓
agent
  ↓
skills
  ↓
model router
  ↓
tool protocol
  ↓
sandbox
  ↓
credentials broker
  ↓
external systems
  ↓
observability
  ↓
governance
```

Điều này làm system phức tạp hơn.

Nhưng đó không phải dấu hiệu AI thất bại.

Nó là dấu hiệu AI đang trở thành **real infrastructure**.

Một nguyên tắc mình thấy lặp lại ở nhiều tin hôm nay là:

> capability không nên đồng nghĩa authority.

Copilot có thể cài MCP server.

Điều đó không có nghĩa mọi MCP server nên được phép truy cập production.

Gemini agent có thể connect finance data.

Điều đó không có nghĩa service account của agent nên đọc toàn bộ financial institution.

Vercel Connect có thể tạo token.

Token đó vẫn nên gắn với user/task cụ thể.

Sandbox có thể chạy code.

Sandbox vẫn phải có network và resource limits.

Đây là sự khác biệt giữa:

```plaintext
"AI có thể làm"
```

và:

```plaintext
"AI được phép làm"
```

Điểm thứ hai là **hardware abstraction quay trở lại**.

Cloud đã làm developer quên hardware trong một thời gian.

Serverless còn đẩy abstraction xa hơn.

AI bây giờ lại khiến hardware quan trọng vì:

*   accelerator type;
    
*   memory bandwidth;
    
*   interconnect;
    
*   tokens/watt;
    
*   inference latency;
    

tác động trực tiếp economics.

Nhưng mình không nghĩ application developer cuối cùng sẽ phải chọn chip.

Ngược lại, infrastructure sẽ ngày càng có router:

```plaintext
workload
  -> quality requirement
  -> latency requirement
  -> cost target
  -> hardware/model route
```

Jalapeño là thêm một backend cho scheduler đó.

Điểm thứ ba là **long-running AI workload đang khiến asynchronous architecture trở lại trung tâm**.

Video generation là ví dụ rõ.

Không nên:

```plaintext
POST /generate
  -> đợi 3 phút
```

Mà nên:

```plaintext
POST /jobs
  -> ID

process

webhook / poll

result
```

Agent workflow cũng tương tự.

Nhiều task AI sẽ tiến từ synchronous request-response sang durable jobs.

Và cuối cùng là domain agents.

Gemini Enterprise Legal/Financial Services cho thấy model intelligence chỉ là foundation.

Production domain agent cần:

```plaintext
domain skills
  +
data access
  +
existing permission
  +
traceability
  +
governance
```

Điều này khá giống software engineering truyền thống.

Business logic vẫn là thứ tạo khác biệt.

Model chỉ giúp thực thi logic đó linh hoạt hơn.

* * *

# 📝 Kết luận

Daily Tech Brief 26/08 có lượng announcement mới rất tốt. Phần lớn các nội dung chính được công bố ngày **25/08/2026**, và một số update Google Cloud/Vercel tiếp tục xuất hiện sáng 26/08, nên **không cần mở rộng sang cửa sổ 24–72 giờ để đủ số lượng**.

Nếu chọn ba việc để hành động hôm nay:

1.  Nếu agent đang giữ nhiều third-party secrets, chuyển dần sang **short-lived runtime credentials + workload identity**.
    
2.  Nếu coding/RL agent thực thi generated code, coi **sandbox là requirement mặc định**, không phải optional feature.
    
3.  Nếu AI workflow mất hàng chục giây/phút, chuyển từ synchronous HTTP sang **durable asynchronous job architecture**.
    

Xu hướng lớn của hôm nay có thể gói trong một câu:

**AI stack đang tiến từ model-centric sang systems-centric.**

Model tốt hơn vẫn quan trọng.

Nhưng production advantage ngày càng nằm ở:

**hardware efficiency, sandbox isolation, scoped identity, domain skills, durable workflows và measurable governance.**

* * *

# 🔗 Nguồn tham khảo

1.  [OpenAI — The full stack behind abundant intelligence](https://openai.com/index/the-full-stack-behind-abundant-intelligence/)
    
2.  [Google Cloud — gVisor sandboxes for Ray clusters on GKE](https://cloud.google.com/blog/products/containers-kubernetes/gvisor-sandboxes-for-ray-clusters-on-gke)
    
3.  [Google Cloud — Gemini Enterprise for Financial Services](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services)
    
4.  [Google Cloud — Gemini Enterprise for Legal](https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-legal)
    
5.  [GitHub — Copilot Customize tab GA](https://github.blog/changelog/2026-08-25-github-copilot-app-customize-tab-is-generally-available/)
    
6.  [GitHub — Rule Insights dashboard GA](https://github.blog/changelog/2026-08-25-rule-insights-dashboard-generally-available/)
    
7.  [GitHub — Push rules path exceptions](https://github.blog/changelog/2026-08-25-push-rules-in-rulesets-now-support-path-exceptions/)
    
8.  [Vercel — Connect GA](https://vercel.com/changelog/vercel-connect-ga)
    
9.  [Vercel — Asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)
    
10.  [Vercel — Wan 3.0](https://vercel.com/changelog/wan-3-0-now-available-on-ai-gateway)
     
11.  [Vercel — Notion Chat SDK](https://vercel.com/changelog/notion-chat-sdk)
     
12.  [Vercel — Slack Enterprise Grid](https://vercel.com/changelog/chat-sdk-slack-enterprise-grid)
     
13.  [Vercel — XChat](https://vercel.com/changelog/chat-sdk-now-supports-xchat)
     
14.  [Cloudflare — ML-DSA will have to do](https://blog.cloudflare.com/ml-dsa-will-have-to-do/)
     
15.  [Microsoft — Visual Studio August Update](https://devblogs.microsoft.com/visualstudio/visual-studio-august-update-work-smarter-across-models-and-branches/)
     
16.  [Microsoft — Foundry Hosted Agents](https://devblogs.microsoft.com/dotnet/from-dotnet-run-to-foundry-hosted-agent-in-3-lines-of-csharp/)