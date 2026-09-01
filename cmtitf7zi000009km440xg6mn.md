---
title: "Daily Tech Brief — 01/09/2026"
seoTitle: "Daily Tech Brief — 01/09/2026"
seoDescription: "GitHub nâng cấp agent sessions trong VS Code, Cloudflare ra Adaptive Intelligence, Google Cloud đưa Data Agent Kit vào data engineering và OpenAI chuyển Codex sang GPT‑5.6 Terra/Luna"
datePublished: 2026-09-01T15:21:48.120Z
cuid: cmtitf7zi000009km440xg6mn
slug: daily-tech-brief-01-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/66fd3afa-eb14-4983-b9a2-c1807f2ba173.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/e8334479-55e6-47be-8941-ddf5a2a122c7.png
tags: daily-tech-brief, daily-tech-brief-01-09-2026

---

> Bản tin hằng ngày dành cho developer: AI agents, cloud infrastructure, developer tooling, security và những thay đổi có tác động thực tế tới cách chúng ta xây, kiểm chứng và vận hành phần mềm.

* * *

## 📌 Executive Summary

*   **GitHub Copilot trong VS Code có một loạt nâng cấp lớn về agent sessions**: side-conversation `/btw`, nhiều cửa sổ cùng nối vào một agent session, tiếp tục session được tạo ở ứng dụng khác, portable agent plugins theo Agent Plugins 1.0 và experimental `/rubber-duck` để gọi model thứ hai kiểm tra edge cases.
    
*   **Cloudflare ra mắt Adaptive Intelligence**, một bot-detection engine được thiết kế để liên tục học từ live traffic thay vì chờ từng đợt cập nhật rule/model. Thành phần đầu tiên đã bắt đầu retrain machine-learning system liên tục và tự rollout model weights trên network.
    
*   **Google Cloud Data Agent Kit đẩy data engineering sâu hơn vào coding-agent workflow.** Developer có thể dùng VS Code, Claude Code hoặc Codex để author, deploy và troubleshoot Airflow pipelines thông qua agent skills + declarative YAML thay vì viết toàn bộ orchestration boilerplate thủ công.
    
*   Data Agent Kit không chỉ generate pipeline: nó còn có **day-two troubleshooting**, đọc failure context và phân biệt lỗi quota/infrastructure với code-level bugs trước khi đề xuất fix.
    
*   **Google Cloud tiếp tục điều chỉnh storage cho agentic workloads:** Filestore có backend mới trên Colossus, cho phép provision IOPS độc lập với capacity và được định vị cho những workload nhiều agent cùng đọc/ghi chung dataset.
    
*   **OpenAI đã chính thức loại GPT‑5.4 và GPT‑5.4 mini khỏi Codex khi đăng nhập bằng ChatGPT từ 31/08.** OpenAI hướng người dùng chuyển sang GPT‑5.6 Terra và GPT‑5.6 Luna; thay đổi này không áp dụng OpenAI API hoặc Codex sử dụng API key riêng.
    
*   **JetBrains bắt đầu chuyển DataSpell sang PyCharm Pro từ 01/09/2026.** DataSpell 2026.1 là release cuối; các data-science workflow tiếp tục được phát triển trong PyCharm.
    
*   **Azure SQL tiếp tục làm rõ database portability:** Microsoft nhấn mạnh bacpac chủ yếu là schema + data dành cho Azure SQL portability, còn dacpac là deployment artifact linh hoạt hơn và có thể tùy chọn đóng gói data.
    
*   **Google Cloud nhắc lại một điểm security rất cơ bản nhưng dễ bị quên trong thời đại AI:** với hạ tầng OT như water utilities, AI không thay thế asset inventory, segmentation, least privilege, patching và incident response.
    
*   Hôm nay có lượng tin mới tốt hơn cuối tuần. Bản tin giữ **8 chủ đề đáng chú ý**, ưu tiên nội dung 31/08 và các thay đổi có hiệu lực ngay 01/09; không lặp lại những headline đã dùng trong các số 28–31/08.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Điểm nổi bật nhất hôm nay là **agent session đang trở thành một first-class development object**.

Trước đây developer thường nghĩ:

```plaintext
chat
  -> prompt
  -> answer
```

VS Code giờ đang tiến tới:

```plaintext
agent session
  -> multiple windows
  -> side conversations
  -> external session continuation
  -> plugins
  -> model switching
  -> second-opinion model
```

Đây là một thay đổi lớn về mental model.

Agent session không còn là text history.

Nó là một workspace stateful gồm:

*   context;
    
*   prompts;
    
*   edits;
    
*   model;
    
*   tools;
    
*   sub-conversations;
    
*   file changes.
    

Xu hướng thứ hai là **agent skills đang thay boilerplate**.

Data Agent Kit không chỉ cho model “biết Airflow”. Nó đưa syntax, secret management, troubleshooting logic và deployment conventions vào một skill có cấu trúc.

Đó là hướng tốt hơn:

```plaintext
generic model
  + domain skill
  + deterministic platform primitives
```

thay vì:

```plaintext
generic model
  + prompt rất dài
  + hy vọng model nhớ đúng framework
```

Xu hướng thứ ba là infrastructure đang phải học cách phục vụ **nhiều agent cùng lúc**.

Storage, cache, telemetry hay network vốn được tối ưu cho application/service truyền thống. Agentic workload có thể tạo:

*   bursty concurrent reads;
    
*   shared context;
    
*   nhiều temporary workers;
    
*   tool calls không đều;
    
*   session state dài.
    

Filestore trên Colossus hay các agent-session features trong VS Code đều là dấu hiệu cùng một chuyển dịch: **AI agents đang trở thành workload thực sự, không còn là lớp UI đặt trên model API.**

* * *

# 📰 Tin nổi bật

## 🤖 GitHub Copilot & Agent Sessions

### GitHub Copilot trong VS Code mở rộng mạnh agent-session workflow

GitHub ngày 31/08 tổng hợp các thay đổi của VS Code v1.132 tới v1.135.

Một số capability mới đáng chú ý:

*   sắp nhiều chat cạnh nhau;
    
*   `/btw` mở side-conversation nhưng vẫn chia sẻ context và prompt cache với chat chính;
    
*   timeline để nhảy trực tiếp tới prompt và file changes tương ứng;
    
*   hỗ trợ portable plugins theo **Agent Plugins 1.0**;
    
*   mở Agents window không cần GitHub sign-in nếu Claude được cấu hình bằng API key;
    
*   switch model provider ngay trong Claude sessions;
    
*   tiếp tục session Copilot hoặc Claude được tạo từ ứng dụng khác;
    
*   nhiều VS Code windows có thể kết nối cùng một Agent Host session;
    
*   experimental `/rubber-duck` gọi model bổ sung để tìm missed details và edge cases.
    

### Tác động với developer

Agent session đang tiến gần một **distributed developer workspace**.

Một task có thể tồn tại xuyên:

```plaintext
VS Code window A
  ↓
VS Code window B
  ↓
external agent client
  ↓
resumed session
```

Điều này thuận tiện, nhưng cũng tạo các câu hỏi về:

*   state ownership;
    
*   concurrent edits;
    
*   permission inheritance;
    
*   model/provider switching;
    
*   auditability.
    

### Developer nên làm gì?

Với task lớn:

*   giữ Git làm source of truth cho file state;
    
*   dùng side conversation cho research thay vì trộn mọi thứ vào primary plan;
    
*   kiểm tra diff trước khi chuyển session giữa tools;
    
*   xem second-opinion model như reviewer, không phải proof;
    
*   tránh cho nhiều windows cùng sửa overlapping files nếu workflow chưa kiểm soát concurrency.
    

**Nguồn:** [GitHub — Copilot in VS Code, August 2026 releases](https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases/)

* * *

# 🛡️ Adaptive Security

## Cloudflare Adaptive Intelligence học liên tục từ bot traffic

Cloudflare ngày 31/08 ra mắt **Adaptive Intelligence**.

Bot-defense truyền thống thường hoạt động theo vòng:

```plaintext
attack
  -> detection
  -> rule/model update
  -> deploy
  -> attacker adapt
```

Cloudflare muốn rút ngắn vòng này.

Adaptive Intelligence sử dụng một loop:

```plaintext
observe
  -> train
  -> deploy
  -> validate
```

Các signal được Cloudflare nêu gồm:

*   JA4 TLS fingerprints;
    
*   request structure;
    
*   challenge outcomes;
    
*   session behavior;
    
*   network reputation;
    
*   Turnstile telemetry;
    
*   Precursor behavioral telemetry.
    

Điểm mới được launch ngay là **continuous retraining** của machine-learning layer phía sau bot score.

Model weights có thể được rollout tự động trên network mà customer không phải chọn version hay lên lịch upgrade.

Cloudflare cũng nói các bước tiếp theo sẽ bổ sung disposable rule generation và kết hợp thêm nhiều signal giữa network, challenge và browser.

### Tác động với developer

Security system bắt đầu đi từ:

```plaintext
static policy
```

sang:

```plaintext
continuously adapting policy
```

Điều này làm monitoring quan trọng hơn.

Nếu detection model thay đổi liên tục, application/team cần biết:

*   false positives;
    
*   challenge rate;
    
*   affected endpoints;
    
*   traffic shifts.
    

### Developer nên làm gì?

Nếu dùng Bot Management:

*   bật Auto Update Machine Learning nếu phù hợp;
    
*   theo dõi bot-score distribution;
    
*   xem login/checkout/API paths riêng;
    
*   không hard-code business logic vào một bot-score threshold duy nhất mà không có observability;
    
*   giữ fallback cho verified bots và legitimate automation.
    

**Nguồn:** [Cloudflare — Introducing Adaptive Intelligence](https://blog.cloudflare.com/introducing-adaptive-intelligence/)

* * *

# 📊 Agentic Data Engineering

## Google Cloud Data Agent Kit đưa Airflow pipeline vào IDE và coding agents

Google Cloud ngày 31/08 công bố một workflow mới quanh **Data Agent Kit** và Orchestration Pipelines.

Data Agent Kit là một bộ tooling open source tích hợp vào:

*   VS Code;
    
*   VS Code-compatible IDEs;
    
*   Claude Code;
    
*   Codex;
    
*   Antigravity CLI.
    

Agent skill:

```plaintext
gcp-pipelines-orchestration
```

cung cấp kiến thức về:

*   pipeline syntax;
    
*   variable substitution;
    
*   secrets;
    
*   Airflow;
    
*   troubleshooting.
    

Thay vì viết rất nhiều Python Operator boilerplate, developer mô tả workflow rồi agent generate:

*   PySpark scripts;
    
*   dbt configuration;
    
*   declarative YAML pipelines;
    
*   CI workflows.
    

### Tác động với developer

Đây là một ví dụ tốt cho pattern:

```plaintext
orchestration intent
  -> declarative DSL
  -> generated execution artifacts
```

thay vì:

```plaintext
intent
  -> agent tự sinh Python orchestration tùy ý
```

Declarative layer giảm freedom nhưng tăng khả năng verify.

### Developer nên làm gì?

Nếu thử Data Agent Kit:

*   version-control generated YAML;
    
*   review secret references;
    
*   giữ CI validation;
    
*   tách infrastructure config khỏi pipeline business logic;
    
*   bắt đầu với một DAG đơn giản trước khi giao toàn bộ MLOps workflow cho agent.
    

**Nguồn:** [Google Cloud — From weeks to minutes: The new agentic era of data pipelines](https://cloud.google.com/blog/products/data-analytics/build-data-pipelines-in-less-time-with-data-agent-kit)

* * *

## Data Agent Kit có agentic troubleshooting cho day-two operations

Điểm đáng chú ý hơn phần generation là troubleshooting.

Khi pipeline fail, Data Engineering Agent có thể dùng execution context để phân biệt:

```plaintext
infrastructure / quota
  vs
code-level issue
```

Ví dụ:

*   Spark out-of-memory;
    
*   BigQuery quota exhausted;
    
*   pipeline code bug.
    

Agent sau đó tạo root-cause summary và đề xuất inline fix.

### Tác động với developer

AI có giá trị lớn hơn khi nó đứng cạnh telemetry thật.

Workflow:

```plaintext
failed run
  -> logs
  -> execution metadata
  -> agent analysis
```

thường tốt hơn:

```plaintext
developer copy 300 dòng log
  -> generic chat
  -> đoán
```

### Developer nên làm gì?

Day-two agent nên có read access trước write access.

Cho agent:

*   inspect run;
    
*   summarize root cause;
    
*   đề xuất remediation;
    

rồi mới cân nhắc tự động thay đổi compute template hoặc production pipeline.

**Nguồn:** [Google Cloud — Data Agent Kit](https://cloud.google.com/blog/products/data-analytics/build-data-pipelines-in-less-time-with-data-agent-kit)

* * *

# 🗄️ AI Storage Infrastructure

## Filestore có backend mới trên Colossus cho agentic workloads

Trong roundup AI infrastructure ngày 31/08, Google Cloud nhấn mạnh Filestore có backend storage mới được xây trực tiếp trên **Colossus**, distributed storage system nền tảng của Google.

Backend mới cho phép:

*   provision IOPS độc lập với storage capacity;
    
*   integration sâu với GKE.
    

Google đặc biệt định vị update này cho **agentic swarms** — nhiều agents cùng đọc và ghi shared dataset.

### Tác động với developer

Shared storage của agent swarm có profile khá khác single-service workload.

Có thể xuất hiện:

```plaintext
200 agents
  -> cùng đọc dependency cache
  -> ghi artifacts
  -> đọc shared context
  -> tạo temporary files
```

Nếu IOPS bị gắn chặt vào storage size, developer có thể phải mua capacity không cần thiết chỉ để lấy performance.

### Developer nên làm gì?

Với agent swarm:

*   đo read/write concurrency;
    
*   tách ephemeral scratch space và durable shared data;
    
*   không dùng shared filesystem làm implicit communication channel nếu isolation là yêu cầu;
    
*   monitor IOPS và lock contention;
    
*   benchmark object storage vs NFS theo workload thật.
    

**Nguồn:** [Google Cloud — What’s new in AI infrastructure and orchestration in August](https://cloud.google.com/blog/topics/ai-infrastructure/whats-new-in-ai-infrastructure-this-month)

* * *

# 🧠 OpenAI Codex

## GPT‑5.4 và GPT‑5.4 mini chính thức rời Codex khi dùng ChatGPT login

OpenAI xác nhận từ **31/08/2026**:

*   GPT‑5.4 không còn được dùng trong Codex khi đăng nhập bằng ChatGPT;
    
*   GPT‑5.4 mini cũng bị loại khỏi cùng flow.
    

OpenAI hướng chuyển:

```plaintext
GPT-5.4
  -> GPT-5.6 Terra

GPT-5.4 mini
  -> GPT-5.6 Luna
```

OpenAI lưu ý thay đổi này **không ảnh hưởng OpenAI API** hoặc Codex khi developer dùng API key riêng.

### Tác động với developer

Model aliases/defaults trong coding tools là dependency có lifecycle.

Một automation có thể break không phải vì API endpoint biến mất mà vì:

*   workspace default;
    
*   managed setting;
    
*   saved model preference;
    
*   CLI automation;
    

đang pin model cũ.

### Developer nên làm gì?

Audit:

*   Codex workspace defaults;
    
*   saved model settings;
    
*   managed configuration;
    
*   automation scripts.
    

Tốt hơn nữa, giữ workflow độc lập với model name:

```plaintext
task
  -> capability class
  -> current supported model
```

**Nguồn:** [OpenAI — Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540)

* * *

# 🧪 Data Science Tooling

## DataSpell bắt đầu chuyển sang PyCharm Pro từ 01/09

JetBrains đã lên kế hoạch sunset DataSpell từ tháng 5 và **01/09/2026 là ngày migration chính thức bắt đầu**.

DataSpell 2026.1 là final standalone release.

Các workflow về:

*   Jupyter;
    
*   Python data analysis;
    
*   data visualization;
    

được tiếp tục phát triển trong PyCharm Pro.

Eligible subscriptions được chuyển sang PyCharm Pro, và JetBrains cũng cung cấp fallback access cho DataSpell trong giai đoạn chuyển tiếp.

### Tác động với developer

IDE consolidation có ý nghĩa đặc biệt trong thời đại coding agents.

Một tool có:

*   Python environment;
    
*   Jupyter runtime;
    
*   debugger;
    
*   database tooling;
    
*   AI agent context;
    

trong cùng workspace giúp giảm context fragmentation.

### Developer nên làm gì?

Nếu còn DataSpell project:

*   mở thử bằng PyCharm Pro;
    
*   kiểm tra interpreter/Jupyter kernels;
    
*   migrate IDE settings;
    
*   review plugins;
    
*   không chờ tới khi DataSpell mất security support mới chuyển.
    

**Nguồn:** [JetBrains — The Upcoming Sunset of DataSpell](https://blog.jetbrains.com/dataspell/2026/05/the-upcoming-sunset-of-dataspell/)

* * *

# 🗃️ Azure SQL

## Microsoft làm rõ bacpac và dacpac: portability khác deployment

Microsoft ngày 31/08 đăng hướng dẫn phân biệt hai artifact dễ nhầm trong SQL ecosystem.

### Bacpac

Chủ yếu dùng cho:

*   schema + table data;
    
*   export/import;
    
*   Azure SQL Database portability.
    

Bacpac chỉ có thể chứa objects tương thích Azure SQL Database.

### Dacpac

Chủ yếu là:

*   database model/schema;
    
*   deployment artifact;
    
*   compare/publish;
    
*   broader SQL target platforms.
    

Dacpac cũng có thể tùy chọn include table data.

Microsoft nhấn mạnh câu:

> “bacpac có data, dacpac không” là một mô tả không đầy đủ.

### Tác động với developer

Chọn sai artifact ảnh hưởng:

*   migration;
    
*   CI/CD;
    
*   speed;
    
*   compatibility.
    

Bacpac logical export/import chậm hơn native backup/restore nhưng portable hơn.

Dacpac phù hợp schema-as-code và deployment planning hơn.

### Developer nên làm gì?

Dùng:

```plaintext
bacpac
  -> portability / logical copy

dacpac
  -> schema deployment / versioning / comparison
```

Với production migration lớn, đừng mặc định bacpac là công cụ nhanh nhất chỉ vì nó dễ export.

**Nguồn:** [Microsoft — Bacpac and Dacpac, the similarities and differences](https://devblogs.microsoft.com/azure-sql/bacpac-and-dacpac-the-similarities-and-differences/)

* * *

# 🔐 OT Security

## Google Cloud: AI không thay các security fundamentals của OT

Google Cloud CISO Perspectives ngày 31/08 tập trung vào water-sector infrastructure, nhưng lesson có giá trị rộng hơn với developer/platform team vận hành OT hoặc hybrid environments.

Google nhấn mạnh các control nền tảng:

*   asset visibility;
    
*   segmentation;
    
*   least privilege;
    
*   patch management;
    
*   secure remote access;
    
*   incident response.
    

AI có thể làm attack/defense nhanh hơn, nhưng không thay được những lớp này.

### Tác động với developer

Một AI security tool đứng trên environment không có inventory tốt sẽ chỉ tự động hóa confusion nhanh hơn.

```plaintext
unknown assets
  + AI
  !=
secure system
```

### Developer nên làm gì?

Trước khi deploy AI-assisted security:

1.  Biết asset nào tồn tại.
    
2.  Biết identity nào truy cập asset.
    
3.  Tách network zones.
    
4.  Chuẩn hóa telemetry.
    
5.  Sau đó mới dùng AI để triage/correlation/remediation.
    

**Nguồn:** [Google Cloud — Cloud CISO Perspectives: Tips on securing the water sector in the AI era](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-tips-on-securing-water-sector-ai-era)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | GitHub Copilot agent sessions | Coding-agent state đang trở thành portable, multi-window và multi-model workspace thay vì một chat thread đơn lẻ. |
| 2 | Cloudflare Adaptive Intelligence | Bot defense chuyển từ periodic update sang continuous learning từ live traffic. |
| 3 | Google Data Agent Kit | Data engineering đang được encode thành agent skills + declarative pipelines thay vì Airflow boilerplate thủ công. |
| 4 | Filestore cho agent swarms | Shared storage bắt đầu được tối ưu trực tiếp cho nhiều agents cùng đọc/ghi dataset. |
| 5 | Codex model retirement | Coding workflows cần model lifecycle management thay vì pin model name vĩnh viễn. |

* * *

# 🛠 Công cụ đáng thử

## Google Cloud Data Agent Kit

Công cụ đáng thử nhất hôm nay nếu đang làm:

*   Airflow;
    
*   BigQuery;
    
*   dbt;
    
*   Spark;
    
*   MLOps.
    

Điểm mạnh không chỉ nằm ở generation mà ở **skills + troubleshooting context**.

[GoogleCloudPlatform/data-agent-kit](https://github.com/GoogleCloudPlatform/data-agent-kit)

* * *

## GitHub Copilot `/rubber-duck`

Nếu đang dùng VS Code Agent Host, experimental command này đáng thử như một **second-opinion reviewer** cho:

*   architecture decisions;
    
*   security-sensitive changes;
    
*   edge cases.
    

Đừng coi model thứ hai là verifier cuối cùng; compiler/tests vẫn quan trọng hơn.

[GitHub Copilot VS Code August releases](https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases/)

* * *

## SqlPackage

Nếu đang nhầm giữa bacpac/dacpac hoặc cần database schema-as-code, SqlPackage là CLI đáng đưa vào CI thay vì thao tác export/publish thủ công từ UI.

[Microsoft SqlPackage](https://learn.microsoft.com/sql/tools/sqlpackage/sqlpackage)

* * *

# 📚 Bài viết nên đọc

## Introducing Adaptive Intelligence

Bài kỹ thuật đáng đọc nhất hôm nay về security.

Điểm hay không phải “ML bắt bot”, mà là thiết kế một detection system với assumption:

> attacker sẽ bypass được một lần.

Sau đó defense tập trung làm mỗi bypass trở nên ngắn hạn và đắt đỏ.

[Đọc trên Cloudflare](https://blog.cloudflare.com/introducing-adaptive-intelligence/)

* * *

## From weeks to minutes: The new agentic era of data pipelines

Đáng đọc nếu team đang nghĩ agent chỉ phù hợp code generation.

Bài này cho thấy agent có thể đi xuyên:

```plaintext
author
deploy
monitor
troubleshoot
```

trong cùng data-engineering lifecycle.

[Đọc trên Google Cloud](https://cloud.google.com/blog/products/data-analytics/build-data-pipelines-in-less-time-with-data-agent-kit)

* * *

## GitHub Copilot in VS Code — August releases

Nên đọc nếu bạn dùng Agent Mode hằng ngày, đặc biệt các phần về session continuation, multi-window Agent Host và `/btw`.

[Đọc trên GitHub](https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases/)

* * *

## Bacpac and Dacpac, the similarities and differences

Một bài thực dụng cho .NET/SQL developer đang làm migration hoặc database CI/CD.

[Đọc trên Microsoft](https://devblogs.microsoft.com/azure-sql/bacpac-and-dacpac-the-similarities-and-differences/)

* * *

# 🚀 GitHub Repository nổi bật

## GoogleCloudPlatform/data-agent-kit

Repository nổi bật nhất hôm nay.

Nó tập hợp:

*   plugins;
    
*   skills;
    
*   MCP servers;
    
*   agent analytics;
    
*   agent evaluations;
    

để đưa Google Data Cloud capabilities vào coding agents như Claude Code, Gemini CLI và Codex.

[github.com/GoogleCloudPlatform/data-agent-kit](https://github.com/GoogleCloudPlatform/data-agent-kit)

* * *

## GoogleCloudPlatform/orchestration-pipelines

Repository chứa sample cho pipeline workflow được Google sử dụng trong bài Data Agent Kit.

Đáng tham khảo nếu muốn xem generated artifacts thực tế thay vì chỉ đọc architecture diagram.

[github.com/GoogleCloudPlatform/orchestration-pipelines](https://github.com/GoogleCloudPlatform/orchestration-pipelines)

* * *

# 💬 Góc nhìn của mình

Điểm đáng chú ý nhất hôm nay là **agent state đang trở thành một thứ cần architecture riêng**.

Khi chat chỉ có một tab:

```plaintext
context = chat history
```

Nhưng với VS Code Agent Host:

```plaintext
context
prompt cache
file changes
side conversations
multiple windows
external sessions
model provider
```

đều có thể tồn tại cùng lúc.

Agent session đang giống một distributed workspace.

Điều đó tạo ra cùng các vấn đề quen thuộc của distributed systems:

```plaintext
state ownership
concurrency
consistency
recovery
```

Mình nghĩ developer tooling sẽ sớm cần những khái niệm như:

```plaintext
session checkpoint
session fork
merge
read-only observer
write lease
```

giống source control hoặc collaborative documents.

Điểm thứ hai là **skills đang trở thành đơn vị knowledge deployment**.

Data Agent Kit không cố làm model “nhớ Airflow tốt hơn”.

Nó gắn domain knowledge trực tiếp vào agent:

```plaintext
syntax
conventions
secrets
troubleshooting
deployment
```

Đây là cách enterprise nên scale AI knowledge.

Không phải huấn luyện lại model cho mọi internal convention.

Mà là:

```plaintext
generic model
  +
organization skills
  +
authoritative tools
  +
evals
```

Điểm thứ ba là adaptive security.

Cloudflare đang chuyển bot detection sang continuous retraining.

Điều này phản ánh một reality:

```plaintext
attacker adaptation cycle
  < defender release cycle
```

thì defender luôn thua về economics.

AI security có thể giúp thu ngắn cycle đó.

Nhưng continuous automation chỉ an toàn khi có:

```plaintext
telemetry
validation
rollback
false-positive monitoring
```

Automation nhanh mà thiếu measurement chỉ giúp hệ thống sai nhanh hơn.

Điểm thứ tư là storage.

Agent swarm nghe rất AI-native, nhưng cuối cùng lại gặp một bottleneck cực truyền thống:

> nhiều process cùng đọc/ghi file.

AI infrastructure sẽ tiếp tục gặp lại các vấn đề cũ:

```plaintext
filesystem
locking
IOPS
network
cache consistency
database contention
```

Model mới không làm những thứ này biến mất.

Cuối cùng là Codex model retirement.

Một tháng có thể có rất nhiều model mới.

Nếu automation pin:

```plaintext
model = x
```

ở 30 nơi khác nhau, mỗi deprecation trở thành maintenance task.

Tốt hơn nên thiết kế:

```plaintext
task class
  -> router
  -> current supported model
```

Model nên là deploy-time/runtime configuration.

Không nên là business logic.

* * *

# 📝 Kết luận

01/09 mở đầu tháng mới với lượng developer news khá tốt, chủ yếu từ các announcement ngày **31/08/2026**.

Ba việc đáng cân nhắc hôm nay:

1.  Nếu coding-agent workflow đã dài, bắt đầu coi **agent session là stateful workspace cần lifecycle và concurrency rules**.
    
2.  Nếu agent đang phải “nhớ” domain framework từ training data, chuyển knowledge đó thành **skills + declarative contracts + authoritative tools**.
    
3.  Audit model names đang pin trong automation trước khi deprecation biến thành production breakage.
    

Xu hướng lớn hôm nay:

**AI tooling đang chuyển từ model-centric sang session-, skill- và infrastructure-centric.**

Model vẫn là compute engine.

Nhưng phần tạo ra độ tin cậy lâu dài nằm ở:

**state management, authoritative context, deterministic verification, storage, security và model portability.**

* * *

# 🔗 Nguồn tham khảo

1.  [GitHub — Copilot in VS Code, August 2026 releases](https://github.blog/changelog/2026-08-31-github-copilot-in-vs-code-august-2026-releases/)
    
2.  [Cloudflare — Introducing Adaptive Intelligence](https://blog.cloudflare.com/introducing-adaptive-intelligence/)
    
3.  [Google Cloud — Data Agent Kit and Orchestration Pipelines](https://cloud.google.com/blog/products/data-analytics/build-data-pipelines-in-less-time-with-data-agent-kit)
    
4.  [Google Cloud — AI infrastructure and orchestration in August](https://cloud.google.com/blog/topics/ai-infrastructure/whats-new-in-ai-infrastructure-this-month)
    
5.  [OpenAI — Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540)
    
6.  [JetBrains — The Upcoming Sunset of DataSpell](https://blog.jetbrains.com/dataspell/2026/05/the-upcoming-sunset-of-dataspell/)
    
7.  [Microsoft — Bacpac and Dacpac](https://devblogs.microsoft.com/azure-sql/bacpac-and-dacpac-the-similarities-and-differences/)
    
8.  [Google Cloud — Cloud CISO Perspectives](https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-tips-on-securing-water-sector-ai-era)