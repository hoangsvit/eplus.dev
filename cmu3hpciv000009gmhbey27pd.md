---
title: "Daily Tech Brief — 16/09/2026"
seoTitle: "Daily Tech Brief — 16/09/2026"
seoDescription: "Google ra mắt Gemini 3.8 Live với background reasoning và tool execution, Cloudflare cho phép giữ Search nhưng từ chối AI Training, GitHub chính thức loại SHA‑1 khỏi HTTPS và enterprise agents tiến tới shared data foundation."
datePublished: 2026-09-16T02:36:54.869Z
cuid: cmu3hpciv000009gmhbey27pd
slug: daily-tech-brief-16-09-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6d8c0db7-3d39-4414-9112-2e65ed6254f6.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/0eedb309-ffca-49c9-8404-49cdc53c765a.png
tags: cloudflare, ai-agents, google-ai, voice-ai, gemini-api, daily-tech-brief, daily-tech-brief-16-09-2026, gemini-3-8-live

---

> Bản tin hằng ngày dành cho developer: Gemini 3.8 Live đưa reasoning song song vào hội thoại thời gian thực, Cloudflare tách Search khỏi AI Training, GitHub chính thức loại SHA‑1 khỏi HTTPS, Salesforce và Google Cloud nối agent xuyên hai nền tảng, và web bắt đầu hình thành một lớp policy mới dành riêng cho AI crawlers.

* * *

## 📌 Executive Summary

*   **Google ra mắt Gemini 3.8 Live và Gemini 3.8 Live Extended Thinking ngày 15/09.** Đây là hai model hội thoại trực tiếp mới, trong đó bản Live ưu tiên scale/cost còn Extended Thinking hướng tới các workflow phức tạp cần multi-step reasoning.
    
*   Điểm đáng chú ý nhất không đơn thuần là speech-to-speech quality. **Gemini 3.8 Live có thể tiếp tục hội thoại trong khi tool/API call chạy nền**, còn Extended Thinking có thể reasoning và nói đồng thời, đưa voice agent gần hơn tới mô hình asynchronous agent thay vì chatbot theo lượt.
    
*   Gemini 3.8 Live tự động phát hiện và chuyển giữa **97 ngôn ngữ**, đồng thời nhận visual input gần real time. Google công bố Extended Thinking đạt 82,6 trên Artificial Analysis Speech-to-Speech Quality Index, 68,6% trên τ‑Voice và 97,7% trên Big Bench Audio.
    
*   Developer có thể sử dụng Gemini 3.8 Live qua **Gemini API và Google AI Studio** ngay từ ngày công bố; Gemini Enterprise đang ở private preview. Google cũng xác nhận Live API đã được tích hợp với các platform như LiveKit, LangChain, Pipecat, Vercel và Agora.
    
*   Google đồng thời mở rộng developer audio stack với **Gemini 3.5 Transcribe**, cho thấy voice AI đang dần được tách thành một platform primitive thay vì chỉ là feature của consumer assistant.
    
*   **Cloudflare giới thiệu** `Disallow AI Training`, giải quyết một bài toán rất thực tế: website có thể tiếp tục cho crawler index nội dung cho Search nhưng từ chối sử dụng nội dung đó để training AI.
    
*   Cloudflare hiện phân crawler thành ba hành vi độc lập: **Search, Training và Agent**. Đây là distinction quan trọng vì một crawler có thể thực hiện nhiều mục đích, trong khi `robots.txt` truyền thống chủ yếu xác định crawler identity chứ không thực thi intent.
    
*   Apple, Google và Microsoft được Cloudflare xếp vào nhóm **Accountable** cho mixed-use crawlers dựa trên khả năng hoặc cam kết cho publisher opt-out AI training mà không làm ảnh hưởng traditional search.
    
*   Với các crawler training riêng của Amazon, Anthropic, Meta và OpenAI, Cloudflare có thể block training traffic mà không ảnh hưởng search. Các controls mới khả dụng cho **tất cả Cloudflare plans**.
    
*   Cloudflare cũng thay đổi semantics của các setting cũ từ ngày 15/09: `Block AI Bots` bắt đầu được thay thế bằng Search/Training/Agent controls, còn Managed Robots.txt được chuyển dần sang Bot Preference Sync.
    
*   **GitHub đã chính thức tắt SHA‑1 trong HTTPS** cho github.com và các partner CDN theo đúng roadmap công bố trước đó. Thay đổi áp dụng cho GitHub Enterprise Cloud và Enterprise Cloud with Data Residency; GitHub Enterprise Server không bị ảnh hưởng.
    
*   Đây không phải cryptographic research mới nhưng là một migration milestone đáng chú ý: software hoặc Git client cũ còn phụ thuộc SHA‑1 trong TLS certificate chain có thể không kết nối được GitHub qua HTTPS.
    
*   **Salesforce và Google Cloud mở rộng partnership để agent trên hai platform có thể reasoning và action trên cùng data foundation mà không cần custom integration cho từng đường kết nối.** Salesforce cũng đưa workloads lên Google Cloud thông qua Hyperforce.
    
*   Google có thêm một announcement về multilingual AI: các công nghệ và sản phẩm của họ hiện hỗ trợ interaction trong hơn **300 ngôn ngữ**, phục vụ các ngôn ngữ được hơn 7 tỷ người sử dụng. Direction mới không chỉ là dịch text mà là giữ tone, context và cách diễn đạt thực tế.
    
*   Bản hôm nay chủ động dừng ở **7 chủ đề/tín hiệu chất lượng**, thay vì kéo những release 13–14/09 đã xuất hiện trong Daily Tech Brief trước. Chủ đề xuyên suốt là: **AI infrastructure đang học cách xử lý concurrency và intent** — agent vừa nói vừa làm, crawler vừa có identity vừa có purpose, và enterprise agents cần một shared execution/data boundary.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Một trong những hạn chế dễ nhận ra nhất của voice assistant truyền thống là:

```plaintext
user nói
  -> assistant nghe
  -> assistant nghĩ
  -> assistant gọi tool
  -> user chờ
  -> assistant nói
```

Đó thực chất vẫn là request-response API được phủ thêm voice.

Gemini 3.8 Live đang đẩy architecture sang:

```plaintext
conversation
     |
     +---- voice stream
     |
     +---- reasoning
     |
     +---- tool execution
     |
     +---- visual context
```

Các luồng này có thể tồn tại đồng thời.

Điều này quan trọng hơn một benchmark speech quality đơn lẻ.

Nếu agent cần đặt lịch:

```plaintext
"Được, để tôi kiểm tra..."
```

nó có thể tiếp tục tương tác trong lúc calendar API chạy.

User không còn phải nhìn hoặc nghe một khoảng im lặng chỉ vì backend đang chờ network response.

Đây là **concurrency đi vào UX của AI**.

Ở một lớp khác, Cloudflare đang giải bài toán tương tự cho web crawler.

Internet trước đây thường nghĩ:

```plaintext
crawler identity -> allow / deny
```

Nhưng AI tạo ra nhiều intent khác nhau:

```plaintext
Search
Training
Agent
```

Một request đến từ cùng organization chưa chắc có cùng mục đích.

Vì vậy access policy bắt đầu cần:

```plaintext
identity
  +
intent
```

Đây có thể trở thành một primitive quan trọng của agentic web.

* * *

# 📰 Tin nổi bật

## 🎙️ Real-time AI

### Google ra mắt Gemini 3.8 Live và Gemini 3.8 Live Extended Thinking

> **Tin trong 24 giờ — công bố 15/09/2026**

Google giới thiệu hai Gemini Audio models mới:

```plaintext
Gemini 3.8 Live
Gemini 3.8 Live Extended Thinking
```

Google định vị chúng cho hai workload khác nhau.

### Gemini 3.8 Live

Ưu tiên:

```plaintext
scale
cost efficiency
fluid conversation
visual grounding
```

### Gemini 3.8 Live Extended Thinking

Ưu tiên:

```plaintext
complex tasks
multi-step reasoning
agentic execution
```

Điểm architecture đáng chú ý nhất là model có thể thực hiện:

```plaintext
tool/API call
```

trong background mà không bắt hội thoại phải dừng.

Ví dụ:

```plaintext
User: kiểm tra booking của tôi
```

Agent có thể acknowledge request và tiếp tục conversation trong lúc function call đang chạy.

Extended Thinking đi thêm một bước:

```plaintext
reasoning
  ||
speaking
```

thay vì:

```plaintext
reasoning
  ->
speaking
```

Google gọi đây là cách giữ conversational flow trong những workflow dài.

### Benchmark Google công bố

Gemini 3.8 Live Extended Thinking đạt:

```plaintext
Speech-to-Speech Quality Index: 82.6

τ-Voice:
68.6%

Sierra τ-Voice-banking:
35.1%

Big Bench Audio:
97.7%
```

Google cũng cho biết model nằm trên Pareto frontier của ServiceNow EVA-Bench về sự cân bằng giữa task completion và conversational experience.

### 97 ngôn ngữ

Gemini 3.8 Live có thể tự động nhận diện và chuyển giữa:

```plaintext
97 languages
```

ngay trong conversation.

Nó cũng xử lý visual input gần real time.

### Availability

Developer:

```plaintext
Gemini API
Google AI Studio
```

Enterprise:

```plaintext
Gemini Enterprise
private preview
```

### Tác động với developer

Voice application không còn nhất thiết phải được thiết kế như:

```plaintext
microphone
  -> STT
  -> LLM
  -> tool
  -> TTS
```

Một live multimodal model có thể absorb nhiều phần của pipeline.

Nhưng asynchronous tool execution tạo thêm state-management problem:

```plaintext
user changes request
while
old tool call still running
```

### Developer nên làm gì?

Voice agent nên có cancellation semantics rõ ràng.

Ví dụ:

```plaintext
tool_call_id
conversation_turn_id
cancellable = true
```

Khi user đổi ý:

```plaintext
cancel stale action
```

thay vì để background job hoàn thành rồi mutate state ngoài ý muốn.

Đo:

```plaintext
interruption recovery
tool completion rate
stale-action rate
latency to acknowledgement
end-to-end task success
```

thay vì chỉ speech quality.

**Nguồn:** [Google — Introducing Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/)

* * *

# 🔊 Developer Audio Stack

## Google mở rộng Gemini API cho real-time voice applications

> **Tin trong 24 giờ — công bố 15/09/2026**

Google đăng riêng một developer announcement cho audio stack mới.

Bên cạnh:

```plaintext
Gemini 3.8 Live
Gemini 3.8 Live Extended Thinking
```

Google giới thiệu:

```plaintext
Gemini 3.5 Transcribe
```

cho speech transcription workloads.

Điều đáng chú ý là Google không đóng Live models trong Gemini consumer application.

Chúng được expose trực tiếp qua:

```plaintext
Gemini API
Google AI Studio
```

và ecosystem real-time media.

Google liệt kê integration ecosystem gồm:

*   Agora;
    
*   Fishjam;
    
*   LangChain;
    
*   LiveKit;
    
*   Pipecat;
    
*   Vercel;
    
*   Vision Agents.
    

### Tác động với developer

Voice infrastructure đang hình thành stack tương tự web:

```plaintext
model
  +
transport
  +
media framework
  +
tool runtime
```

Developer không nhất thiết phải tự quản WebRTC/media streaming từ đầu.

### Developer nên làm gì?

Nếu đang xây voice agent, tách benchmark thành ba layer:

```plaintext
transport latency
model latency
tool latency
```

Một voice agent cảm giác chậm chưa chắc do model.

Có thể bottleneck nằm ở:

```plaintext
media relay
VAD
function call
database
```

**Nguồn:** [Google — Build real-time voice applications with Gemini 3.8 Live and 3.5 Transcribe](https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/)

* * *

# 🌐 AI Crawlers

## Cloudflare cho website giữ Search nhưng từ chối AI Training

> **Tin trong 24 giờ — công bố 15/09/2026**

Cloudflare giới thiệu setting:

```plaintext
Disallow AI Training
```

Mục tiêu là giải quyết vấn đề của:

```plaintext
mixed-use crawlers
```

Một crawler có thể vừa:

```plaintext
index Search
```

vừa:

```plaintext
collect content for AI training
```

Nếu website block crawler hoàn toàn:

```plaintext
AI training stops
```

nhưng:

```plaintext
Search visibility cũng mất
```

Cloudflare giờ tách hai intent.

### Ba loại crawler behavior

Cloudflare sử dụng:

```plaintext
Search
Training
Agent
```

**Search**

Index nội dung để tạo traditional search index.

**Training**

Thu thập nội dung để train hoặc fine-tune model.

**Agent**

Agent truy cập website thay user, chẳng hạn browser-use agent.

### Disallow AI Training hoạt động thế nào?

Cloudflare:

1.  publish preference phù hợp vào `robots.txt`;
    
2.  nhận diện crawler;
    
3.  phân loại mục đích;
    
4.  cho Accountable search crawler tiếp tục;
    
5.  block training crawler không tuân thủ preference.
    

### Accountable crawlers

Cloudflare hiện xếp:

*   Apple;
    
*   Google;
    
*   Microsoft;
    

vào nhóm Accountable mixed-use crawler operators.

Các organization này đã có hoặc cam kết cung cấp cơ chế để publisher từ chối training mà không làm ảnh hưởng traditional search.

### Tác động với developer

`robots.txt` đang dần trở thành:

```plaintext
machine-use policy
```

chứ không chỉ:

```plaintext
crawler path rules
```

Nhưng policy declaration và enforcement là hai việc khác nhau.

Cloudflare có lợi thế vì network layer có thể:

```plaintext
identify
classify
block
```

request thực tế.

### Developer nên làm gì?

Website có SEO quan trọng không nên dùng một rule kiểu:

```plaintext
block all AI bots
```

mà không hiểu consequence.

Nên xác định riêng:

```plaintext
Search = allow?
Training = allow?
Agent = allow?
```

Đặc biệt kiểm tra lại Cloudflare settings sau migration ngày 15/09.

**Nguồn:** [Cloudflare — Stay discoverable in search while disallowing AI training](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)

* * *

# 🤖 Agentic Web

## Cloudflare chính thức tách Search, Training và Agent thành ba policy domain

> **Tin trong 24 giờ — có hiệu lực 15/09/2026**

Announcement của Cloudflare còn chứa một thay đổi đáng chú ý với developer vận hành website.

Từ ngày 15/09:

```plaintext
Block AI Bots
```

được deprecate dần để nhường chỗ cho granular controls.

Cloudflare cũng chuyển:

```plaintext
Managed Robots.txt
  ->
Bot Preference Sync
```

Các setting mới có thể là:

```plaintext
Allow

Disallow AI Training

Block on pages with ads

Block
```

### Vì sao Agent được tách riêng?

Agent crawler khác Training crawler.

Một agent có thể truy cập website vì:

```plaintext
user asked agent to buy product
user asked agent to research
user asked browser agent to fill form
```

Block Agent có thể làm website kém tương thích với agentic web tương lai.

Nhưng Allow Agent đồng nghĩa application phải chuẩn bị cho non-human clients thực hiện workflows.

### Tác động với developer

Web access control có thể tiến từ:

```plaintext
human vs bot
```

sang:

```plaintext
human
search
training
agent
```

Đây là taxonomy hữu ích hơn nhiều.

### Developer nên làm gì?

Với public application:

*   đừng assume mọi agent request là malicious bot;
    
*   rate-limit theo capability;
    
*   protect mutation endpoints bằng authentication;
    
*   giữ CSRF/authorization độc lập với bot classification;
    
*   thiết kế structured content nếu muốn agent sử dụng website tốt.
    

**Nguồn:** [Cloudflare — AI crawler controls](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)

* * *

# 🔐 Developer Infrastructure

## GitHub chính thức tắt SHA‑1 trong HTTPS

> **Tin trong 24 giờ — có hiệu lực 15/09/2026**

GitHub đã hoàn tất kế hoạch loại SHA‑1 khỏi HTTPS.

Thay đổi áp dụng cho:

```plaintext
github.com
```

và partner CDNs, bao gồm:

```plaintext
GitHub Enterprise Cloud
GitHub Enterprise Cloud with Data Residency
```

Không áp dụng cho:

```plaintext
GitHub Enterprise Server
```

### Tại sao developer cần quan tâm?

Ứng dụng hiện đại gần như không bị ảnh hưởng.

Nhưng legacy environment có thể sử dụng:

```plaintext
old Git
old OpenSSL
old Java runtime
old OS certificate stack
```

vẫn phụ thuộc certificate/signature compatibility cũ.

Các automation như:

```plaintext
git clone
git fetch
GitHub API calls
```

qua HTTPS có thể fail nếu TLS stack quá cũ.

### Tác động với developer

Cryptographic deprecation thường không gây vấn đề ở production application mới.

Nó gây vấn đề ở:

```plaintext
forgotten build machine
legacy CI runner
embedded device
ancient container image
```

### Developer nên làm gì?

Nếu CI bất ngờ lỗi kết nối GitHub sau 15/09:

kiểm tra trước:

```plaintext
git --version
openssl version
curl --version
```

và base image.

Đừng disable TLS verification để “fix nhanh”.

**Nguồn:** [GitHub — SHA‑1 in HTTPS on GitHub sunset](https://github.blog/changelog/2026-09-15-sha-1-in-https-on-github-sunset/)

* * *

# 🧩 Enterprise Agents

## Salesforce và Google Cloud nối agent trên cùng data foundation

> **Tin trong 24 giờ — công bố 15/09/2026**

Salesforce và Google Cloud mở rộng strategic partnership tại Dreamforce 2026.

Mục tiêu là giảm tình trạng:

```plaintext
data silo
agent silo
application silo
```

Salesforce cho biết Salesforce workloads có thể chạy trên Google Cloud thông qua:

```plaintext
Hyperforce
```

Đồng thời Salesforce headless architecture được kết nối với:

```plaintext
Gemini Enterprise
```

để agents trên hai platform có thể:

```plaintext
reason
act
```

trên cùng data foundation mà không phải tạo custom integration cho từng workflow.

### Tác động với developer

Enterprise agent integration đang dịch từ:

```plaintext
agent A calls API B
```

sang:

```plaintext
shared data + identity + execution foundation
```

Điều này giảm integration code nhưng làm governance layer quan trọng hơn.

Nếu hai agent systems cùng nhìn thấy data:

```plaintext
ai được phép đọc gì?
ai được phép mutate gì?
action thuộc identity nào?
```

trở thành câu hỏi bắt buộc.

### Developer nên làm gì?

Trong cross-platform agent architecture, luôn phân biệt:

```plaintext
human identity
agent identity
service identity
```

Audit log phải trả lời được:

```plaintext
ai yêu cầu
agent nào quyết định
service nào thực thi
```

**Nguồn:** [Salesforce — Salesforce and Google Cloud Unify Infrastructure and Agents](https://www.salesforce.com/news/stories/salesforce-google-cloud-unify-infrastructure-and-agents/)

* * *

# 🌍 Multilingual AI

## Google mở rộng AI tới hơn 300 ngôn ngữ

> **Tin trong 24 giờ — công bố 15/09/2026**

Google cho biết các technology và product của họ hiện hỗ trợ everyday interactions bằng hơn:

```plaintext
300 languages
```

được hơn:

```plaintext
7 billion people
```

sử dụng, tương đương khoảng 86% dân số thế giới theo số liệu Google công bố.

Điểm đáng chú ý là direction mới không chỉ là:

```plaintext
text A
  -> translate
  -> text B
```

Google muốn model hiểu:

```plaintext
tone
dialect
slang
cultural expression
```

trong ngôn ngữ gốc.

### Tác động với developer

Multilingual AI evaluation không nên chỉ dùng:

```plaintext
translation accuracy
```

Một assistant có thể dịch đúng nghĩa nhưng sai:

```plaintext
register
tone
local vocabulary
```

và vẫn tạo UX kém.

### Developer nên làm gì?

Nếu product phục vụ nhiều quốc gia:

evaluation set nên do native speakers xây và bao gồm:

```plaintext
formal language
casual language
slang
code switching
domain terminology
```

Không dùng English benchmark được dịch máy làm evaluation duy nhất.

**Nguồn:** [Google — AI for everyone in every language](https://blog.google/innovation-and-ai/technology/ai/ai-for-every-language/)

* * *

# 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Vì sao đáng chú ý |
| --- | --- | --- |
| 1 | Gemini 3.8 Live Extended Thinking | Voice agent có thể reasoning, gọi tool và tiếp tục conversation song song thay vì khóa UX trong từng turn. |
| 2 | Cloudflare Disallow AI Training | Website lần đầu có control rõ hơn để giữ Search discoverability nhưng từ chối AI training. |
| 3 | Search / Training / Agent taxonomy | AI crawler policy bắt đầu chuyển từ identity-based sang intent-aware access control. |
| 4 | GitHub loại SHA‑1 khỏi HTTPS | Một cryptographic migration milestone có thể làm lộ những CI runner và TLS stack legacy bị bỏ quên. |
| 5 | Salesforce + Google Cloud agents | Enterprise agent interoperability chuyển dần về shared data, identity và infrastructure foundation. |

* * *

# 🛠 Công cụ đáng thử

## Gemini Live API

Công cụ đáng thử nhất hôm nay.

Một prototype hữu ích:

```plaintext
microphone
  -> Gemini 3.8 Live
  -> weather/calendar/test API
  -> spoken response
```

Sau đó thử interrupt model trong lúc tool đang chạy.

Đây là cách nhanh nhất để kiểm tra:

```plaintext
cancellation
concurrency
conversation continuity
```

trong voice-agent architecture.

[Gemini 3.8 Live](https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/)

* * *

## Cloudflare Disallow AI Training

Nếu website đang dùng Cloudflare, đây là setting đáng kiểm tra ngay.

Đặc biệt với site cần:

```plaintext
Google/Bing discoverability
```

nhưng không muốn:

```plaintext
training reuse
```

Đừng nhầm:

```plaintext
Block
```

với:

```plaintext
Disallow AI Training
```

vì `Block` mixed-use crawler có thể ảnh hưởng Search.

[Cloudflare AI crawler controls](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)

* * *

# 📚 Bài viết nên đọc

## Introducing Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking

Bài đáng đọc nhất hôm nay nếu đang xây agent.

Điểm quan trọng không phải voice.

Nó là architecture:

```plaintext
reasoning
conversation
tools
```

có thể chạy song song.

[Đọc trên Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/)

* * *

## Have it both ways: stay discoverable in search while disallowing AI training

Bài đáng đọc với:

```plaintext
web developer
SEO engineer
publisher
platform engineer
```

Cloudflare giải thích khá chi tiết sự khác nhau giữa:

```plaintext
Search
Training
Agent
```

và cách mixed-use crawlers được xử lý.

[Đọc trên Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)

* * *

## SHA‑1 in HTTPS on GitHub sunset

Bài rất ngắn nhưng đáng đưa vào checklist infrastructure.

Nếu một runner cũ đột nhiên không clone được repository:

đây là một trong những thứ nên kiểm tra đầu tiên.

[Đọc trên GitHub](https://github.blog/changelog/2026-09-15-sha-1-in-https-on-github-sunset/)

* * *

# 🚀 GitHub Repository nổi bật

## google-gemini/live-api-web-console

Một reference hữu ích để nghiên cứu cách browser application giao tiếp với Gemini Live API.

Thay vì chỉ xem voice demo, developer có thể tập trung vào:

```plaintext
session lifecycle
streaming
multimodal input
tool interactions
```

[github.com/google-gemini/live-api-web-console](https://github.com/google-gemini/live-api-web-console)

* * *

## livekit/agents

LiveKit là một trong các developer platforms được Google nêu trực tiếp trong ecosystem hỗ trợ Gemini Live API.

Repository này đáng xem nếu muốn xây production voice agent mà không tự triển khai toàn bộ real-time media layer.

[github.com/livekit/agents](https://github.com/livekit/agents)

* * *

# 💬 Góc nhìn của mình

Điểm mình thấy đáng chú ý nhất hôm nay là một thay đổi rất nhỏ trong cách chúng ta nghĩ về agent:

**agent không nhất thiết phải “nghĩ xong rồi mới nói”.**

Con người không hoạt động như vậy.

Trong một cuộc gọi, chúng ta có thể nói:

> Tôi đang kiểm tra.

rồi tiếp tục trao đổi trong lúc tìm thông tin.

Voice agents trước đây thường giả lập behavior đó bằng UX tricks.

Bây giờ reasoning và tool execution bắt đầu thực sự có thể chạy song song với conversation.

Điều này làm architecture tốt hơn.

Nhưng cũng tạo race conditions.

Ví dụ:

```plaintext
user: đặt chuyến 8 giờ

agent starts booking()

user: khoan, đổi sang 9 giờ
```

Nếu tool call đầu tiên vẫn hoàn thành:

```plaintext
booking 8h
booking 9h
```

Ta vừa biến conversational AI thành distributed-systems problem.

Vì vậy voice agents cần những thứ rất quen thuộc:

```plaintext
cancellation token
idempotency key
transaction state
compensating action
```

Không có gì “AI-specific” ở đây.

Điểm thứ hai là Cloudflare.

Mình nghĩ distinction:

```plaintext
Search
Training
Agent
```

có khả năng sống lâu.

Trước đây Internet có một abstraction khá đơn giản:

```plaintext
browser
crawler
```

Agentic web phá abstraction đó.

Một machine client có thể:

```plaintext
index page
train model
summarize page
buy product
fill form
```

và mỗi behavior cần policy khác nhau.

Điều này giống OAuth scopes.

Ta không chỉ hỏi:

> Đây là app nào?

Ta hỏi:

> App này muốn làm gì?

AI crawler policy có thể cũng sẽ đi về:

```plaintext
identity
  +
declared intent
  +
enforceable capability
```

Điểm thứ ba là SHA‑1.

Những migration kiểu này luôn là reminder rằng technical debt hiếm khi nằm ở main application.

Nó nằm trong:

```plaintext
old Jenkins runner
forgotten Docker image
internal appliance
script chạy từ năm 2018
```

Một security deprecation có giá trị không chỉ vì bỏ algorithm yếu.

Nó ép infrastructure tìm ra những phần đã quá cũ.

Cuối cùng, Salesforce + Google Cloud cho thấy enterprise agents sẽ không thắng chỉ nhờ model.

Khi nhiều agents cùng hoạt động:

```plaintext
shared data
identity
permissions
audit
```

trở thành infrastructure quan trọng hơn prompt.

Nói cách khác:

**Agent càng autonomous, hệ thống xung quanh nó càng phải deterministic.**

* * *

# 📝 Kết luận

16/09 có ít headline hơn những ngày model-launch dày đặc, nhưng có một số thay đổi architecture rất đáng chú ý.

Bản hôm nay chọn **7 chủ đề/tín hiệu mới từ ngày 15/09**, không kéo lại các headline 13–14/09 chỉ để đạt quota.

Ba việc developer có thể làm ngay:

1.  Nếu đang xây voice agent, test **background tool execution + interruption + cancellation**, không chỉ latency của speech.
    
2.  Nếu quản lý website qua Cloudflare, kiểm tra lại **Search / Training / Agent policies** sau thay đổi ngày 15/09.
    
3.  Nếu CI hoặc Git client legacy lỗi HTTPS với GitHub, **upgrade TLS stack** thay vì tắt certificate verification.
    

Thông điệp lớn hôm nay:

**AI systems đang trở nên concurrent và intent-aware.**

Agent vừa có thể:

```plaintext
nói
nghĩ
gọi tool
```

cùng lúc.

Crawler vừa có:

```plaintext
identity
purpose
```

riêng biệt.

Enterprise agent vừa có:

```plaintext
model
data
permissions
execution context
```

Và khi những hệ thống này phức tạp hơn, developer sẽ cần mang những nguyên tắc cũ của distributed systems, security và access control vào AI engineering nhiều hơn bao giờ hết.

* * *

# 🔗 Nguồn tham khảo

1.  [Google — Introducing Gemini 3.8 Live and Gemini 3.8 Live Extended Thinking](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/)
    
2.  [Google — Build real-time voice applications with Gemini 3.8 Live and 3.5 Transcribe](https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/)
    
3.  [Cloudflare — Stay discoverable in search while disallowing AI training](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)
    
4.  [GitHub — SHA‑1 in HTTPS on GitHub sunset](https://github.blog/changelog/2026-09-15-sha-1-in-https-on-github-sunset/)
    
5.  [Salesforce — Salesforce and Google Cloud Unify Infrastructure and Agents](https://www.salesforce.com/news/stories/salesforce-google-cloud-unify-infrastructure-and-agents/)
    
6.  [Google — AI for everyone in every language](https://blog.google/innovation-and-ai/technology/ai/ai-for-every-language/)