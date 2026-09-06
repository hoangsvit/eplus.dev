---
title: "Daily Tech Brief — 06/09/2026"
seoTitle: "Daily Tech Brief — 06/09/2026"
seoDescription: "GPT‑6 Astra lên GitHub Copilot và Vercel AI Gateway, Agent Merge giúp xử lý PR, Kubernetes 1.37 đưa rootless node components lên Beta và GitHub ra privacy-safe star history API"
datePublished: 2026-09-06T06:48:44.987Z
cuid: cmtpgaowd00000agm5xup1zz8
slug: daily-tech-brief-06-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/454483ef-389a-4f02-87bd-e59ac78abd13.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/696f8e25-e799-487f-8353-a7c80d8a8628.png
tags: daily-tech-brief, daily-tech-brief-06-09-2026

---

> Bản tin hằng ngày dành cho developer: AI agents, coding workflows, Kubernetes security, developer APIs và model infrastructure — ưu tiên thay đổi có tác động thực tế thay vì cố ép đủ số lượng headline trong một ngày cuối tuần ít công bố mới.

* * *

## 📌 Executive Summary

*   **GPT‑6 Astra bắt đầu xuất hiện đồng thời ở GitHub Copilot và Vercel AI Gateway.** GitHub đưa model lên GA trong Copilot cho các gói Pro+, Max, Business và Enterprise; Vercel cung cấp Astra qua AI Gateway cho coding, computer use, research và các workflow agent kéo dài.
    
*   GitHub nhấn mạnh Astra không chỉ tạo output tốt hơn mà còn **plan, validate và tự xác nhận kết quả trong quá trình làm việc**. Đây là một thay đổi đáng chú ý khi coding agents chuyển từ “generate code” sang long-horizon execution.
    
*   **VS Code 1.136 / GitHub Copilot có Agent Merge ở Public Preview**, cho phép agent xử lý review feedback, failed checks và merge conflicts để đưa pull request tới trạng thái gần merge-ready hơn.
    
*   Copilot cũng thử nghiệm **multi-root agent workspaces**, giúp agent sessions làm việc xuyên nhiều folder trong cùng workspace thay vì giả định một repository/folder duy nhất.
    
*   **GitHub ra REST API mới cho lịch sử stars nhưng không expose danh tính stargazers.** Đây là một thiết kế API đáng chú ý: vẫn giữ analytics use case nhưng giảm privacy leakage.
    
*   **Kubernetes 1.37 đưa KubeletInUserNamespace lên Beta.** Kubelet, CRI/OCI runtimes, CNI plugins và kube-proxy có thể chạy trong Linux user namespace với host-level non-root privileges.
    
*   Kubernetes đặc biệt nêu **AI sandbox** như một use case của rootless node components: coding agent có thể thử cluster trong môi trường hạn chế quyền để giảm blast radius nếu agent bị prompt injection hoặc chạy lệnh nguy hiểm.
    
*   **Ling 3.0 Flash Sante** xuất hiện trên Vercel AI Gateway, tập trung vào medical reasoning và evidence-based retrieval, có 124B total parameters nhưng khoảng 5.1B active parameters/token, context 256K và function calling.
    
*   Vercel cung cấp hai model ID cho Ling Sante trong promotion: model chuẩn sẽ bắt đầu billing sau thời gian miễn phí, còn `-free` model ID sẽ **ngừng phục vụ** thay vì tự chuyển sang trả phí. Đây là một pattern FinOps rất đáng học.
    
*   Do không có đủ công bố chính thức chất lượng cao trong đúng 24 giờ gần nhất, bản hôm nay **mở rộng sang cửa sổ 24–72 giờ** và chỉ chọn các công bố ngày 04/09/2026 chưa được dùng làm headline chính trong các bản trước.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Điểm nổi bật nhất hôm nay không phải một model benchmark cụ thể.

Đó là việc **agent infrastructure đang bắt đầu phản ánh đúng bản chất của long-running software work**.

Coding task thật hiếm khi chỉ là:

```plaintext
đọc prompt
  -> viết code
  -> xong
```

Nó thường là:

```plaintext
inspect repository
  -> formulate plan
  -> modify code
  -> run tests
  -> encounter failure
  -> revise
  -> handle review feedback
  -> resolve conflicts
  -> verify result
```

GPT‑6 Astra được GitHub mô tả theo hướng này.

Agent Merge cũng giải đúng phần sau của workflow:

```plaintext
code đã viết
  nhưng
PR chưa merge được
```

Trong khi đó, multi-root workspace giải một assumption khác:

> Một task chỉ nằm trong một folder.

Thực tế modern applications thường có:

```plaintext
frontend/
backend/
infra/
shared/
docs/
```

Một agent muốn giải task end-to-end phải hiểu boundaries xuyên nhiều component.

Ở phía infrastructure, Kubernetes đang giải bài toán ngược lại:

> Agent có thể làm nhiều hơn, vậy làm sao giảm authority của execution environment?

Rootless node components cho thấy security không nhất thiết phải bắt đầu từ model.

Nó có thể bắt đầu từ:

```plaintext
OS privilege
namespace
runtime
network
filesystem
```

Đây là pattern xuyên suốt bản hôm nay:

**agent intelligence tăng, nhưng platform cũng phải giảm implicit trust.**

* * *

# 📰 Tin nổi bật

## 🤖 Long-Horizon Coding Agents

### GPT‑6 Astra đã GA trong GitHub Copilot

GitHub ngày 04/09 đưa **GPT‑6 Astra** lên Generally Available trong GitHub Copilot.

Model có thể được chọn trong:

*   Visual Studio Code;
    
*   Visual Studio;
    
*   Copilot CLI;
    
*   Copilot coding agent;
    
*   Copilot app;
    
*   github.com;
    
*   GitHub Mobile;
    
*   JetBrains IDEs;
    
*   Xcode;
    
*   Eclipse.
    

Các plan hỗ trợ gồm:

*   Copilot Pro+;
    
*   Max;
    
*   Business;
    
*   Enterprise.
    

GitHub cho biết trong internal testing, Astra thể hiện tốt ở long-horizon coding vì model:

*   lập kế hoạch trong quá trình làm;
    
*   kết hợp diagnosis với verification;
    
*   tự xác nhận kết quả trước khi tuyên bố task hoàn tất;
    
*   hoàn thành task với ít steps hơn một số model OpenAI trước đó.
    

Enterprise admins vẫn có thể quản model qua model policy.

### Tác động với developer

Coding model đang thay đổi từ:

```plaintext
autocomplete engine
```

sang:

```plaintext
execution worker
```

Điều đó làm metrics cũng phải thay đổi.

Không nên chỉ đo:

```plaintext
quality của một response
```

Mà nên đo:

```plaintext
task completion
retries
tests passed
human corrections
wall-clock time
tool calls
```

### Developer nên làm gì?

Nếu có Copilot access:

*   benchmark Astra bằng task repository thật;
    
*   dùng issue có acceptance criteria rõ;
    
*   yêu cầu agent chạy tests trước khi kết thúc;
    
*   so với model hiện tại bằng solved-task rate;
    
*   không mở rộng permissions chỉ vì model mạnh hơn.
    

**Nguồn:** [GitHub — GPT‑6 Astra is generally available in GitHub Copilot](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/)

* * *

## 🌐 Model Gateway

### GPT‑6 Astra đồng thời xuất hiện trên Vercel AI Gateway

Cùng ngày 04/09, Vercel đưa GPT‑6 Astra lên AI Gateway với model ID:

```plaintext
openai/gpt-6-astra
```

Vercel định vị Astra cho:

*   software engineering;
    
*   computer/browser use;
    
*   scientific research;
    
*   long-running professional workflows;
    
*   multi-step agent execution.
    

Model có thể được gọi bằng Vercel AI SDK hoặc kết nối vào coding agents thông qua AI Gateway.

### Tác động với developer

Một model xuất hiện đồng thời trong Copilot và generic gateway tạo cơ hội benchmark rất thú vị:

```plaintext
same model
  +
different harness
  =
đo được giá trị của orchestration/tooling
```

Nếu Astra chạy tốt hơn trong một environment, nguyên nhân chưa chắc là model.

Có thể là:

*   tool contracts;
    
*   context construction;
    
*   retries;
    
*   filesystem access;
    
*   test integration.
    

### Developer nên làm gì?

Nếu đang xây internal coding-agent platform:

*   benchmark cùng task qua Copilot và API/gateway;
    
*   giữ prompt/eval cố định;
    
*   ghi lại tool-call sequence;
    
*   so cost per solved task;
    
*   tách model quality khỏi harness quality.
    

**Nguồn:** [Vercel — GPT 6 Astra now available on AI Gateway](https://vercel.com/changelog/gpt-6-astra-now-available-on-vercel-ai-gateway)

* * *

# 🔀 Pull Request Automation

## Agent Merge đưa PR từ “code generated” tới “merge-ready”

Trong weekly Copilot release ngày 04/09, GitHub đưa **Agent Merge** vào Public Preview trong VS Code.

Agent có thể hỗ trợ xử lý:

*   review feedback;
    
*   failed checks;
    
*   merge conflicts;
    

với mục tiêu đưa PR tới trạng thái sẵn sàng merge hơn.

### Tác động với developer

Đây là phần coding agents thường làm chưa tốt.

Generate implementation chỉ là nửa đầu task.

Nửa sau thường mất rất nhiều thời gian:

```plaintext
reviewer comment
  -> sửa

CI failed
  -> debug

base branch changed
  -> resolve conflict

test failed
  -> retry
```

Agent Merge đưa automation vào đúng đoạn workflow này.

### Developer nên làm gì?

Không nên xem “merge-ready” là “auto-merge”.

Một policy phù hợp hơn:

```plaintext
agent sửa
  -> CI pass
  -> security checks
  -> human approval
  -> merge
```

Theo dõi:

*   số feedback item agent giải đúng;
    
*   regression sau merge;
    
*   số lần human phải revert agent changes.
    

**Nguồn:** [GitHub — Copilot weekly releases — August 31](https://github.blog/changelog/2026-09-04-github-copilot-weekly-releases-august-31/)

* * *

# 🗂️ Multi-Repository Agent Context

## VS Code thử nghiệm multi-root agent workspaces

Cùng đợt cập nhật, VS Code thử nghiệm multi-root workspaces cho Copilot và Claude agent sessions.

Một agent session có thể làm việc trên nhiều folder thuộc cùng workspace.

Điều này đặc biệt phù hợp với monorepo hoặc distributed application layout:

```plaintext
frontend/
services/
infra/
packages/
```

### Tác động với developer

Context boundary theo “folder đang mở” ngày càng thiếu thực tế.

Một change đơn giản ở API có thể yêu cầu:

```plaintext
backend schema
  +
frontend types
  +
tests
  +
deployment config
```

Agent muốn làm task end-to-end phải nhìn được relationship giữa chúng.

### Developer nên làm gì?

Multi-root không có nghĩa agent nên được đọc mọi repository.

Tạo workspace theo task và chỉ include:

*   repositories liên quan;
    
*   packages cần thiết;
    
*   config an toàn.
    

Context scope vẫn là permission scope.

**Nguồn:** [GitHub — Copilot weekly releases — August 31](https://github.blog/changelog/2026-09-04-github-copilot-weekly-releases-august-31/)

* * *

# 🔐 Kubernetes Security

## Kubernetes 1.37 đưa rootless node components lên Beta

Kubernetes 1.37 promote feature gate:

```plaintext
KubeletInUserNamespace
```

lên **Beta**.

Khi chạy trong Linux user namespace, các node components như:

*   kubelet;
    
*   CRI runtime;
    
*   OCI runtime;
    
*   CNI plugins;
    
*   kube-proxy;
    

có thể chạy bằng **non-root user trên host**, dù vẫn thấy mình như root bên trong namespace.

Feature gate hiện enabled by default, nhưng điều đó **không tự động biến cluster hiện tại thành rootless**.

Cluster vẫn phải được khởi chạy trong user namespace phù hợp.

### Vì sao quan trọng?

Kubernetes nhắc lại nhiều lịch sử container-breakout vulnerabilities từng có khả năng dẫn tới root compromise trên host.

Rootless mode giảm blast radius:

```plaintext
compromised component
  -> namespace-level privilege
```

thay vì mặc định:

```plaintext
compromised component
  -> host root
```

Kubernetes cũng nhấn mạnh user namespaces **không bảo vệ khỏi kernel vulnerability** và vẫn nên kết hợp với seccomp/hardening khác.

### Tác động với developer

Điểm đáng chú ý nhất là Kubernetes trực tiếp nêu **AI sandbox** như một use case.

Một coding agent có thể:

```plaintext
nhận nội dung từ Internet
  -> bị prompt injection
  -> chạy command nguy hiểm
```

Nếu test cluster chạy rootless, damage potential trên host giảm đáng kể.

### Developer nên làm gì?

Nếu đang chạy local/CI Kubernetes cho coding agents:

*   thử kind với rootless Docker/Podman;
    
*   kiểm tra CNI/CSI compatibility;
    
*   không dùng `privileged: true` mặc định;
    
*   thêm seccomp;
    
*   tách agent user khỏi developer login chính.
    

Có thể kiểm tra node state qua:

```plaintext
kubectl get nodes -o yaml
```

và xem `runningInUserNamespace`.

**Nguồn:** [Kubernetes — KubeletInUserNamespace graduates to Beta](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)

* * *

# ⭐ Developer APIs + Privacy

## GitHub có API lịch sử stars mà không expose stargazer identities

GitHub ngày 04/09 giới thiệu REST API mới cho **repository star history**.

API cung cấp:

*   historical star counts;
    
*   timestamps;
    

nhưng không trả individual stargazer identities.

Trước đó GitHub đã giới hạn một số stargazer-listing endpoints cho admins/collaborators nhằm bảo vệ privacy.

Endpoint mới nhằm giữ lại analytics use case mà không cần expose từng user.

### Tác động với developer

Đây là một API-design pattern đáng học:

```plaintext
product analytics need
  ≠
raw personal data access
```

Nhiều integration thực ra chỉ muốn:

> Repository tăng bao nhiêu stars theo thời gian?

chứ không cần:

> Chính xác user nào đã star?

### Developer nên làm gì?

Khi thiết kế analytics API:

*   trả aggregate data nếu đủ;
    
*   không expose identity mặc định;
    
*   tách privileged endpoints khỏi public analytics;
    
*   review những API đang trả dữ liệu chi tiết hơn use case yêu cầu.
    

**Nguồn:** [GitHub — Privacy-safe star history API](https://github.blog/changelog/2026-09-04-new-api-endpoint-provides-privacy-safe-star-history-data/)

* * *

# 🧬 Specialized AI Models

## Ling 3.0 Flash Sante lên Vercel AI Gateway

Vercel đưa **Ling 3.0 Flash Sante** của inclusionAI lên AI Gateway ngày 04/09.

Đây là model tập trung vào health/medicine với:

*   Mixture-of-Experts architecture;
    
*   124B total parameters;
    
*   khoảng 5.1B active parameters mỗi token;
    
*   256K context;
    
*   function calling.
    

Model được thiết kế cho:

*   medical reasoning;
    
*   evidence-based retrieval;
    
*   professional healthcare tasks;
    
*   research;
    
*   multi-step workflows.
    

### Promotion có một chi tiết đáng chú ý

Model ID chuẩn:

```plaintext
inclusionai/ling-3.0-flash-sante
```

miễn phí tới 04/10 nhưng **sau đó bắt đầu billing**.

Model ID:

```plaintext
inclusionai/ling-3.0-flash-sante-free
```

sẽ **ngừng phục vụ** khi promotion hết hạn thay vì bắt đầu tính phí.

### Tác động với developer

Đây là một guardrail billing rất hợp lý cho experimental workloads.

Nó cho phép developer express intent:

> Tôi muốn dùng model này chỉ khi free.

thay vì:

> Hãy nhớ quay lại sửa config sau một tháng.

### Developer nên làm gì?

Đối với promotion/evaluation:

*   dùng fail-closed model ID nếu có;
    
*   đặt budget riêng;
    
*   alert theo expiration date;
    
*   không để temporary experiments silently trở thành production spend.
    

Với medical AI, cần nhớ model availability không đồng nghĩa suitability cho clinical decision-making.

### Nguồn

[Vercel — Ling 3.0 Flash Sante](https://vercel.com/changelog/ling-3-0-flash-sante-is-now-available-on-ai-gateway-for-free)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | GPT‑6 Astra trong Copilot | Long-horizon coding agents ngày càng được đánh giá theo planning + verification thay vì một-shot code generation. |
| 2 | Kubernetes Rootless Beta | Execution security được đưa xuống OS/user-namespace layer, đặc biệt phù hợp AI sandboxes. |
| 3 | Agent Merge | Agent bắt đầu đảm nhiệm phần khó sau khi code được tạo: CI failures, review feedback và merge conflicts. |
| 4 | Multi-root agent workspaces | Agent context bắt đầu phản ánh architecture thật của modern applications thay vì chỉ một folder. |
| 5 | Privacy-safe Star History API | GitHub giữ analytics capability nhưng giảm exposure của user identity — một API privacy pattern đáng học. |

* * *

# 🛠 Công cụ đáng thử

## kind + Rootless Docker

Đây là lựa chọn đáng thử nhất hôm nay với team đang chạy coding agents có quyền shell.

Pattern:

```plaintext
dedicated user
  -> rootless Docker
  -> kind
  -> disposable test cluster
```

giúp giới hạn blast radius tốt hơn việc agent chạy cluster bằng host root.

[Kubernetes Rootless Mode](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)

* * *

## GPT‑6 Astra qua Copilot

Đáng benchmark với task dài có nhiều bước:

```plaintext
investigate
  -> implement
  -> test
  -> verify
```

thay vì hỏi các coding question ngắn.

[GPT‑6 Astra trong GitHub Copilot](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/)

* * *

## Vercel AI Gateway

Đáng dùng nếu muốn thử cùng một model qua standardized API và so sánh với coding-agent harness khác.

[GPT‑6 Astra trên Vercel](https://vercel.com/changelog/gpt-6-astra-now-available-on-vercel-ai-gateway)

* * *

# 📚 Bài viết nên đọc

## Kubernetes v1.37: KubeletInUserNamespace

Bài kỹ thuật đáng đọc nhất hôm nay.

Điểm giá trị không chỉ là Kubernetes rootless.

Nó cho thấy một nguyên tắc security quan trọng với AI agent:

> Không cần tin agent sẽ không làm điều nguy hiểm nếu OS có thể giới hạn hậu quả của điều đó.

[Đọc trên Kubernetes](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)

* * *

## GPT‑6 Astra is generally available in GitHub Copilot

Đáng đọc để hiểu GitHub đang đánh giá coding model theo long-horizon behavior như thế nào.

[Đọc trên GitHub](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/)

* * *

## GitHub Copilot weekly releases — August 31

Nếu đang dùng VS Code agents, Agent Merge và multi-root workspace là hai feature đáng test.

[Đọc trên GitHub](https://github.blog/changelog/2026-09-04-github-copilot-weekly-releases-august-31/)

* * *

# 🚀 GitHub Repository nổi bật

## kubernetes-sigs/kind

kind là một trong những cách đơn giản nhất để thử Kubernetes rootless trên developer machine hoặc isolated CI worker.

[github.com/kubernetes-sigs/kind](https://github.com/kubernetes-sigs/kind)

* * *

## kubernetes/kubernetes

Nếu muốn theo dõi KEP-2033 và implementation `KubeletInUserNamespace`, repository chính của Kubernetes vẫn là nguồn reference quan trọng nhất.

[github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

* * *

## microsoft/vscode

Agent Merge, agent sessions và multi-root agent workflows đều đang biến VS Code thành một agent execution surface ngày càng quan trọng.

[github.com/microsoft/vscode](https://github.com/microsoft/vscode)

* * *

# 💬 Góc nhìn của mình

Điểm mình thấy đáng chú ý nhất hôm nay là **AI coding agents đang bắt đầu đi qua đúng vòng đời của software engineering**.

Thế hệ đầu:

```plaintext
prompt
  -> answer
```

Thế hệ tiếp theo:

```plaintext
prompt
  -> code
```

Bây giờ:

```plaintext
task
  -> plan
  -> code
  -> test
  -> review
  -> repair
  -> merge preparation
```

Agent Merge là ví dụ rất rõ.

Nó giải phần mà demos thường bỏ qua.

Một PR không có giá trị chỉ vì code compile trên branch đầu tiên.

Nó phải sống sót qua:

```plaintext
tests
reviewer feedback
concurrent changes
merge conflicts
```

Điểm thứ hai là **harness quan trọng ngang model**.

GPT‑6 Astra xuất hiện cùng lúc trong GitHub Copilot và Vercel AI Gateway.

Đây là cơ hội rất tốt để thấy một điều:

> Model giống nhau không có nghĩa agent behavior giống nhau.

Agent quality còn đến từ:

```plaintext
tools
context
memory
retries
sandbox
validation loop
```

Vì vậy benchmark model bằng chat playground rồi suy ra performance của production agent là chưa đủ.

Điểm thứ ba là rootless Kubernetes.

Mình nghĩ đây là tin security quan trọng nhất.

Kubernetes thậm chí nêu AI coding agents trong use case.

Điều này phản ánh một shift lớn:

**agent security không chỉ là AI safety.**

Nó là classic systems security:

```plaintext
Unix users
namespaces
capabilities
seccomp
ephemeral compute
```

Nếu coding agent bị prompt injection, câu hỏi không nên chỉ là:

> “Tại sao model nghe theo prompt?”

Mà còn:

> “Tại sao process đó có quyền phá host?”

Điểm thứ tư là multi-root workspaces.

Khi agents tốt hơn, context architecture trở thành bottleneck.

Một codebase hiện đại hiếm khi là một folder độc lập.

Nhưng đưa quá nhiều repository vào context cũng làm tăng:

*   noise;
    
*   cost;
    
*   leakage risk.
    

Tương lai có lẽ không phải:

```plaintext
huge context window
  -> dump everything
```

Mà là:

```plaintext
task
  -> resolve dependencies
  -> grant only relevant context
```

Cuối cùng, privacy-safe star API là một update nhỏ nhưng mình rất thích.

Đây là privacy-by-design đúng nghĩa:

> giữ capability cần cho product, bỏ dữ liệu cá nhân không cần thiết.

Agent platforms cũng nên làm tương tự.

Không phải vì agent có thể đọc một field mà field đó cần xuất hiện trong context.

* * *

# 📝 Kết luận

06/09 rơi vào cuối tuần và **không có đủ announcement chính thức chất lượng cao trong cửa sổ 24 giờ gần nhất**.

Vì vậy bản hôm nay chủ động mở rộng sang **24–72 giờ**, giữ **6 nhóm tin chính** từ ngày 04/09/2026 và tránh lặp lại các headline đã dùng trong Daily Tech Brief 01–05/09.

Ba việc đáng thử:

1.  Nếu đang dùng coding agents, benchmark bằng **long-running repository task**, không chỉ coding prompt ngắn.
    
2.  Với agent có shell/container access, thử **rootless execution** và giảm host privileges.
    
3.  Khi mở rộng agent context xuyên nhiều repositories, coi **context scope là permission**, không phải chỉ là convenience.
    

Thông điệp hôm nay:

**Agent càng tiến gần tới full software lifecycle, execution environment càng phải được thiết kế như một security boundary thực sự.**

Model có thể:

```plaintext
plan
reason
repair
```

Nhưng infrastructure vẫn phải quyết định:

```plaintext
nó nhìn thấy gì
nó có quyền gì
và failure của nó có thể gây thiệt hại tới đâu.
```

* * *

# 🔗 Nguồn tham khảo

1.  [GitHub — GPT‑6 Astra in Copilot](https://github.blog/changelog/2026-09-04-gpt-6-astra-is-generally-available-in-github-copilot/)
    
2.  [Vercel — GPT‑6 Astra on AI Gateway](https://vercel.com/changelog/gpt-6-astra-now-available-on-vercel-ai-gateway)
    
3.  [GitHub — Copilot weekly releases — August 31](https://github.blog/changelog/2026-09-04-github-copilot-weekly-releases-august-31/)
    
4.  [GitHub — Privacy-safe star history API](https://github.blog/changelog/2026-09-04-new-api-endpoint-provides-privacy-safe-star-history-data/)
    
5.  [Kubernetes — KubeletInUserNamespace Beta](https://kubernetes.io/blog/2026/09/04/kubernetes-v1-37-rootless-beta/)
    
6.  [Vercel — Ling 3.0 Flash Sante](https://vercel.com/changelog/ling-3-0-flash-sante-is-now-available-on-ai-gateway-for-free)