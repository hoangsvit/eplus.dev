---
title: "Daily Tech Brief — 02/11/2026"
seoTitle: "Daily Tech Brief — 02/11/2026"
seoDescription: "GitHub Actions đến hạn ngừng macOS 14 runners, Heroku-22 bắt đầu build failures, Supabase cảnh báo lỗi timezone và AWS Lambda Python 3.10 deprecated."
datePublished: 2026-11-02T01:22:15.350Z
cuid: cmvykqdib000102oah1uxdebs
slug: daily-tech-brief-02-11-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/73b24f42-77d3-4123-a86d-c92e8349d104.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/9bd33b9b-349a-4b5a-ac7d-d72ca2bfc7ba.png
tags: daily-tech-brief, daily-tech-brief-02-11-2026

---

> GitHub Actions đến hạn ngừng hỗ trợ macOS 14 runners. Heroku-22 bắt đầu tạo lỗi có chủ đích ở lần build đầu tiên trong mỗi chu kỳ 30 ngày. Supabase cảnh báo lỗi chuyển đổi múi giờ PostgreSQL, trong khi AWS Lambda và Google Cloud Run functions tiếp tục siết vòng đời các runtime cũ.

**Ngày xuất bản:** 02/11/2026\
**Múi giờ:** Asia/Ho_Chi_Minh\
**Chủ đề:** GitHub Actions, CI/CD, Heroku, PostgreSQL, Supabase, AWS Lambda, Google Cloud, Node.js, Python, Runtime Lifecycle, DevOps.

---

## Executive Summary

Daily Tech Brief ngày 02/11/2026 mở đầu tuần mới bằng những thay đổi có ảnh hưởng trực tiếp đến quá trình triển khai và bảo trì ứng dụng.

Khác với các bản tin gần đây tập trung vào AI models, cloud features và developer tools, những thông tin đáng chú ý hôm nay chủ yếu liên quan đến vòng đời hạ tầng.

GitHub Actions là ưu tiên đầu tiên.

Theo lịch trình chính thức, ngày 02/11/2026 là hạn ngừng hỗ trợ macOS 14 hosted runner images trên GitHub Actions và Azure DevOps.

Các workflows sử dụng `macos-14`, `macos-14-large` hoặc `macos-14-xlarge` cần chuyển sang image được hỗ trợ.

Đây là thay đổi đặc biệt quan trọng với những repository có quy trình build hoặc kiểm thử ứng dụng macOS, iOS và những dự án sử dụng Xcode.

GitHub đã tổ chức nhiều brownout windows trong tháng 10 nhằm giúp developers phát hiện những workflows chưa được migration.

Đợt brownout cuối theo lịch diễn ra từ 14:00 UTC ngày 01/11 đến 00:00 UTC ngày 02/11, tương đương 21:00 ngày 01/11 đến 07:00 ngày 02/11 tại Việt Nam.

Thông báo chính thức xác nhận lịch retirement, nhưng không cung cấp bằng chứng rằng mọi runner đã bị loại bỏ hoàn toàn tại thời điểm xuất bản bản tin.

Ở Heroku, một thay đổi có hiệu lực từ ngày 01/11 có thể gây bất ngờ cho những nhóm chưa nâng cấp stack.

Với ứng dụng còn sử dụng Heroku-22, lần build đầu tiên trong mỗi chu kỳ 30 ngày sẽ thất bại có chủ đích với deprecation error.

Những lần build tiếp theo trong cùng chu kỳ vẫn được phép tiếp tục.

Đây chưa phải thời điểm Heroku-22 ngừng hoạt động hoàn toàn.

Heroku-22 dự kiến hết vòng đời hỗ trợ ngày 30/04/2027 và ngừng cho phép tạo builds mới từ ngày 01/05/2027.

Tuy nhiên, cơ chế cảnh báo bằng build failure có thể ảnh hưởng trực tiếp đến CI/CD pipelines nếu developer không biết trước.

Một cập nhật khác đến từ Supabase.

Ngày 30/10, Supabase cảnh báo một số phiên bản PostgreSQL cũ sử dụng dữ liệu múi giờ `tzdata` không còn chính xác.

Vấn đề liên quan đến America/Vancouver, America/Edmonton và Africa/Casablanca.

Đặc biệt, thay đổi quy tắc thời gian tại Alberta, Canada, có hiệu lực ngày 01/11/2026, khiến cảnh báo này trở nên đáng chú ý trong thời điểm hiện tại.

Dữ liệu timestamp được lưu không bị thay đổi, nhưng kết quả chuyển đổi sang giờ địa phương có thể sai.

Điều này có thể ảnh hưởng đến lịch hẹn, báo cáo, thanh toán, tác vụ định kỳ và các hệ thống xử lý thời gian theo từng khu vực.

Trong lĩnh vực serverless, AWS Lambda Python 3.10 đã đến ngày deprecation 31/10/2026.

Điều quan trọng là deprecation không đồng nghĩa các Lambda functions hiện có ngừng chạy ngay lập tức.

Theo lịch AWS, thời hạn chặn tạo functions mới và chặn cập nhật functions sử dụng runtime này nằm trong năm 2027.

Google Cloud cũng ghi nhận ngày decommission 30/10/2026 đối với runtime `nodejs20` của Cloud Run functions.

Khác với giai đoạn deprecated, runtime decommissioned không còn được sử dụng để tạo hoặc triển khai lại workloads.

Những ứng dụng cũ cần được kiểm tra và migration sang runtime còn được hỗ trợ.

Cuối cùng, Heroku công bố thay đổi về đăng nhập cho SendGrid add-on, phản ánh một điều thường bị bỏ qua: những dịch vụ bên thứ ba tích hợp trong cloud platform vẫn có thể thay đổi cơ chế quản lý tài khoản độc lập với ứng dụng chính.

Tổng thể, thông điệp của bản tin hôm nay rất rõ:

**Những thay đổi quan trọng nhất đối với developer không phải lúc nào cũng là tính năng mới. Đôi khi, đó là một runtime hết hạn, một runner image bị loại bỏ hoặc một quy tắc múi giờ thay đổi âm thầm.**

---

## Hôm nay có gì nổi bật?

### 1\. CI/CD cần được quản lý như một dependency thực sự

Nhiều repository kiểm soát chặt chẽ phiên bản Node.js, Python hoặc những packages được sử dụng trong ứng dụng.

Tuy nhiên, phiên bản hệ điều hành của CI runner đôi khi lại bị bỏ quên.

Một workflow có thể hoạt động ổn định trong nhiều tháng nhưng đột ngột thất bại khi GitHub loại bỏ runner image cũ.

Vì vậy, CI/CD cần được đưa vào dependency lifecycle management.

Developer nên kiểm tra cả:

- Runner operating system.
- Runtime version.
- Compiler và SDK version.
- GitHub Actions versions.
- Container base images.
- Những dependencies được cài đặt sẵn trên runner.

Sử dụng `macos-latest` có thể giảm công việc migration thủ công, nhưng cũng có nghĩa môi trường build có thể thay đổi theo thời gian.

Với những dự án yêu cầu reproducible builds, pin vào một phiên bản runner còn được hỗ trợ thường dễ kiểm soát hơn.

### 2\. Deprecation có thể gây lỗi trước ngày end-of-life

Heroku-22 là ví dụ rõ ràng.

Stack chưa hết hạn hoàn toàn, nhưng Heroku đã bắt đầu tạo build failures có chủ đích để cảnh báo.

Điều này cho thấy developer cần phân biệt:

- Deprecated: Công nghệ không còn được khuyến nghị.
- Brownout: Gián đoạn có chủ đích để cảnh báo migration.
- Decommissioned: Không còn được sử dụng cho những hoạt động được chỉ định.
- End-of-life: Kết thúc vòng đời hỗ trợ.

Nếu chỉ theo dõi ngày end-of-life cuối cùng, một nhóm kỹ thuật có thể bỏ qua những mốc ảnh hưởng sớm hơn.

### 3\. Timezone data cũng là một dependency

Lỗi múi giờ không nhất thiết xuất phát từ application code.

Một ứng dụng có thể sử dụng PostgreSQL đúng cách nhưng vẫn trả về thời gian địa phương sai nếu dữ liệu `tzdata` đã lỗi thời.

Ví dụ:

```plaintext
SELECT
    TIMESTAMPTZ '2026-11-02 12:00:00+00'
    AT TIME ZONE 'America/Edmonton';
```

Kết quả cần được đối chiếu với quy tắc múi giờ có hiệu lực và phiên bản dữ liệu múi giờ đang sử dụng.

Không nên tự sửa bằng cách cộng hoặc trừ một offset cố định.

Những quy tắc về giờ mùa hè hoặc thay đổi chính sách địa phương có thể khiến offset thay đổi theo ngày.

### 4\. Serverless không có nghĩa developer không cần quản lý runtime

AWS Lambda và Google Cloud Run functions đều cung cấp managed execution environments.

Nhưng developer vẫn chịu trách nhiệm lựa chọn runtime được hỗ trợ và bảo đảm ứng dụng tương thích.

Khi runtime hết vòng đời, nhà cung cấp có thể ngừng cung cấp security updates, chặn deployment hoặc thay đổi chính sách hỗ trợ.

Điều này đặc biệt quan trọng với những functions ít được chỉnh sửa, vì chúng dễ bị bỏ quên trong quá trình nâng cấp.

---

# Tin nổi bật

## I. GitHub & CI/CD Infrastructure

### 1\. GitHub Actions macOS 14 Runners đến hạn Retirement

**Mốc áp dụng:** 02/11/2026\
**Thông báo gốc:** 11/01/2026\
**Trạng thái:** Scheduled retirement; không phải bản phát hành mới.

GitHub xác nhận macOS 14 Sonoma runner images sẽ không còn được hỗ trợ từ ngày 02/11/2026.

Các labels bị ảnh hưởng:

- `macos-14`
- `macos-14-large`
- `macos-14-xlarge`

GitHub khuyến nghị chuyển sang các runner images còn được hỗ trợ như macOS 15, macOS 26 hoặc các labels `macos-latest` phù hợp.

Đối với large và xlarge runners, cần lựa chọn đúng loại image thay thế.

GitHub đã tổ chức nhiều brownout windows trong tháng 10 và một đợt cuối kéo dài đến 00:00 UTC ngày 02/11.

**Tác động với developer:** Những workflows chưa migration có nguy cơ thất bại khi image cũ bị loại bỏ. Điều này ảnh hưởng đến automated tests, package builds và release pipelines.

**Developer nên làm gì?**

Kiểm tra các workflow files:

```plaintext
git grep -n -E 'macos-14(-large|-xlarge)?' -- .github/workflows
```

Thay runner labels phù hợp, sau đó chạy lại workflow trên môi trường mới.

Đặc biệt cần kiểm tra Xcode, signing certificates, build tools và các dependencies có liên quan đến hệ điều hành.

**Nguồn:** [GitHub Actions Runner Images — macOS 14 Retirement](https://github.com/actions/runner-images/issues/13518)

---

## II. Platform Deployment & Lifecycle

### 2\. Heroku-22 bắt đầu cơ chế Build Failure theo chu kỳ 30 ngày

**Ngày áp dụng:** 01/11/2026\
**Trạng thái:** Deprecation warning enforcement.

Heroku-22, stack dựa trên Ubuntu 22.04 LTS, bước sang một giai đoạn mới trong lộ trình ngừng hỗ trợ.

Từ ngày 01/11, lần build đầu tiên của mỗi ứng dụng Heroku-22 trong một chu kỳ 30 ngày sẽ thất bại với deprecation error.

Những lần build tiếp theo trong cùng chu kỳ được phép tiếp tục.

Heroku áp dụng cơ chế này nhằm cảnh báo developers trước khi stack hết vòng đời.

Lộ trình chính thức:

| Ngày | Thay đổi |
| --- | --- |
| 01/11/2026 | Lần build đầu tiên mỗi 30 ngày thất bại |
| 01/02/2027 | Lần build đầu tiên mỗi 7 ngày thất bại |
| 01/04/2027 | Lần build đầu tiên mỗi 24 giờ thất bại |
| 30/04/2027 | Heroku-22 hết vòng đời hỗ trợ |
| 01/05/2027 | Không còn cho phép builds mới trên Heroku-22 |

Các ứng dụng đang chạy không tự động bị tắt tại những mốc cảnh báo build.

**Tác động với developer:** CI/CD có thể xuất hiện build failures dù application code không thay đổi.

**Developer nên làm gì?**

Kiểm tra stack hiện tại:

```plaintext
heroku stack -a YOUR_APP_NAME
```

Nếu còn sử dụng Heroku-22, lên kế hoạch migration sang stack được hỗ trợ như Heroku-24 hoặc Heroku-26.

Kiểm tra compatibility của runtime, buildpacks, system libraries và application dependencies trước khi triển khai production.

**Nguồn:** [Heroku — Heroku-22 End-of-Life FAQ](https://help.heroku.com/NQNCQTEJ/heroku-22-end-of-life-faq)

---

### 3\. Google Cloud Run Functions Node.js 20 đến mốc Decommission

**Ngày decommission theo lịch:** 30/10/2026\
**Trạng thái:** Runtime lifecycle transition; thông tin mở rộng theo ngày.

Google Cloud công bố ngày decommission của runtime `nodejs20` trên Cloud Run functions là 30/10/2026.

Theo tài liệu runtime lifecycle, khi một runtime bước vào giai đoạn decommissioned, developer không còn có thể tạo hoặc cập nhật workloads sử dụng runtime đó.

Các workloads đang tồn tại có thể bị vô hiệu hóa.

Điều này không có nghĩa tất cả functions cũ đều bị dừng ngay tại cùng một thời điểm.

Những runtime thay thế được hỗ trợ bao gồm:

- `nodejs22`
- `nodejs24`

Google cũng liệt kê `nodejs26` ở trạng thái Preview.

**Tác động với developer:** Có thể ảnh hưởng đến deployment và bảo trì các functions chưa được nâng cấp.

**Developer nên làm gì?**

Kiểm tra runtime được khai báo trong source configuration, Terraform và deployment scripts.

Ưu tiên runtime GA còn được hỗ trợ, chạy regression tests và xác minh compatibility trước khi deploy.

Không sử dụng Preview runtime cho production chỉ vì đó là phiên bản mới nhất.

**Nguồn:** [Google Cloud — Cloud Run Functions Runtime Support](https://docs.cloud.google.com/functions/docs/runtime-support)

---

## III. PostgreSQL & Data Correctness

### 4\. Supabase cảnh báo lỗi Timezone Conversion trong PostgreSQL

**Ngày công bố:** 30/10/2026\
**Mốc liên quan:** 01/11/2026\
**Trạng thái:** Bug fix available.

Supabase cảnh báo một số phiên bản PostgreSQL cũ chứa dữ liệu `tzdata` không còn chính xác.

Vấn đề ảnh hưởng đến những ứng dụng sử dụng ba múi giờ:

- `America/Vancouver`
- `America/Edmonton`
- `Africa/Casablanca`

Các khu vực này có thay đổi quy tắc thời gian trong năm 2026.

Riêng Alberta, Canada, có thay đổi có hiệu lực từ ngày 01/11.

Theo Supabase, các phiên bản trước những bản sau có thể bị ảnh hưởng:

- PostgreSQL 15: `15.19.0.003`
- PostgreSQL 17: `17.11.0.003`

Hai phiên bản nêu trên đã chứa bản cập nhật `tzdata`.

Vấn đề không làm thay đổi dữ liệu timestamp được lưu.

Tuy nhiên, các phép chuyển đổi từ UTC sang local time có thể trả về kết quả không chính xác.

Supabase cho biết self-hosted installations không bị ảnh hưởng bởi vấn đề cụ thể này.

**Tác động với developer:** Có thể gây sai lệch lịch hẹn, báo cáo, scheduled jobs và những quy trình tính toán theo múi giờ địa phương.

**Developer nên làm gì?**

Kiểm tra database service version trong Supabase Dashboard.

Nếu đang sử dụng những múi giờ bị ảnh hưởng, nâng cấp PostgreSQL theo hướng dẫn chính thức.

Lưu ý quá trình upgrade có downtime và một số indexes có thể cần rebuild.

Sau nâng cấp, kiểm tra lại các truy vấn `AT TIME ZONE` và những nghiệp vụ phụ thuộc vào thời gian.

**Nguồn:** [Supabase — Upgrade Postgres to Fix Local Time](https://supabase.com/changelog/tzdata-local-time-vancouver-edmonton-casablanca)

---

## IV. Serverless Security & Runtime Support

### 5\. AWS Lambda Python 3.10 bước vào giai đoạn Deprecated

**Ngày deprecation:** 31/10/2026\
**Trạng thái:** Deprecated runtime.

AWS Lambda liệt kê Python 3.10 là runtime có ngày deprecation 31/10/2026.

Điều quan trọng là AWS có các mốc riêng cho deprecation và việc chặn thao tác.

Theo lịch hiện tại:

| Mốc | Ngày |
| --- | --- |
| Runtime deprecated | 31/10/2026 |
| Chặn tạo functions mới | 29/07/2027 |
| Chặn cập nhật functions | 31/08/2027 |

Vì vậy, không nên hiểu rằng mọi Python 3.10 Lambda function đã ngừng chạy từ ngày 31/10.

AWS khuyến nghị sử dụng những runtime mới hơn dựa trên Amazon Linux 2023.

**Tác động với developer:** Các functions sử dụng runtime cũ cần được đưa vào kế hoạch migration và security maintenance.

**Developer nên làm gì?**

Kiểm tra runtime inventory, Lambda layers, dependencies và deployment templates.

Ưu tiên thử nghiệm Python 3.12, 3.13 hoặc 3.14 theo yêu cầu tương thích của ứng dụng.

Đánh giá những packages có native extensions trước khi thay đổi runtime.

**Nguồn:** [AWS — Lambda Runtime Support](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

---

## V. Cloud Integrations

### 6\. Heroku thông báo thay đổi đăng nhập SendGrid Add-on

**Ngày changelog:** 30/10/2026\
**Bắt đầu rollout:** 16/10/2026\
**Trạng thái:** Account access change.

Heroku công bố thay đổi liên quan đến SendGrid add-on.

Theo thông báo, SendGrid bắt đầu triển khai cơ chế yêu cầu khách hàng sử dụng SendGrid được provision qua Heroku tạo tài khoản SendGrid để truy cập dịch vụ.

Đây là thay đổi về quản lý tài khoản và quyền truy cập, không phải một phiên bản SendGrid API mới.

**Tác động với developer:** Có thể ảnh hưởng đến quy trình quản trị SendGrid add-on, đặc biệt với những nhóm phụ thuộc vào việc truy cập qua Heroku.

**Developer nên làm gì?**

Kiểm tra quyền truy cập SendGrid, tài khoản quản trị và tài liệu migration.

Không tự động thay đổi API credentials đang hoạt động nếu chưa xác minh yêu cầu cụ thể của nhà cung cấp.

**Nguồn:** [Heroku — Unified Login for SendGrid Add-on](https://devcenter.heroku.com/changelog-items/3896)

---

# Top 5 đáng chú ý nhất

| Hạng | Cập nhật | Mốc liên quan | Mức ưu tiên |
| --: | --- | --- | --- |
| 1 | GitHub Actions macOS 14 retirement | 02/11 | Rất cao — kiểm tra CI/CD ngay |
| 2 | Heroku-22 build failure warnings | 01/11 | Cao — có thể làm hỏng deployment |
| 3 | Supabase PostgreSQL timezone fix | 01/11 | Cao với ứng dụng dùng múi giờ bị ảnh hưởng |
| 4 | AWS Lambda Python 3.10 deprecated | 31/10 | Cao — lên kế hoạch nâng cấp |
| 5 | Cloud Run Functions Node.js 20 decommission | 30/10 | Cao — kiểm tra runtime deployment |

---

# Công cụ đáng thử

## 1\. GitHub Actions Runner Images

**Repository:** [actions/runner-images](https://github.com/actions/runner-images)

Repository chính thức của GitHub về hosted runner images.

Đáng nghiên cứu để theo dõi những thay đổi hệ điều hành, phần mềm cài đặt sẵn và lịch retirement.

## 2\. Heroku CLI

**Tài liệu:** [Heroku Stacks](https://devcenter.heroku.com/articles/stack)

Sử dụng để kiểm tra stack và chuẩn bị migration.

Nên kết hợp với buildpack compatibility tests trước khi chuyển môi trường.

## 3\. Supabase PostgreSQL Timezone Checks

**Tài liệu:** [Supabase Timezone Advisory](https://supabase.com/changelog/tzdata-local-time-vancouver-edmonton-casablanca)

Thử xây dựng một bộ SQL regression tests cho các timezone quan trọng trong ứng dụng.

Đặc biệt hữu ích với những hệ thống có khách hàng ở nhiều quốc gia.

## 4\. AWS Lambda Runtime Inventory

**Tài liệu:** [AWS Lambda Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

Sử dụng để đối chiếu runtime versions, deprecation dates và các mốc chặn thao tác.

## 5\. Google Cloud Functions Runtime Support

**Tài liệu:** [Cloud Run Functions Runtime Support](https://docs.cloud.google.com/functions/docs/runtime-support)

Đáng kiểm tra nếu đang sử dụng nhiều Google Cloud projects hoặc những functions được triển khai từ lâu.

---

# Bài viết nên đọc

### 1\. GitHub Actions macOS 14 Retirement

Thông báo chính thức về lịch ngừng hỗ trợ, brownout windows và những runner labels cần migration.

[Đọc trên GitHub](https://github.com/actions/runner-images/issues/13518)

### 2\. Heroku-22 End-of-Life FAQ

Giải thích rõ các giai đoạn cảnh báo, build failures và thời hạn ngừng builds.

[Đọc trên Heroku](https://help.heroku.com/NQNCQTEJ/heroku-22-end-of-life-faq)

### 3\. Supabase PostgreSQL Timezone Fix

Một ví dụ thực tế về cách dữ liệu múi giờ lỗi thời có thể làm sai kết quả xử lý thời gian.

[Đọc trên Supabase](https://supabase.com/changelog/tzdata-local-time-vancouver-edmonton-casablanca)

### 4\. AWS Lambda Runtime Lifecycle

Tài liệu quan trọng để hiểu sự khác biệt giữa deprecation và các mốc chặn tạo, cập nhật functions.

[Đọc trên AWS](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

### 5\. Cloud Run Functions Runtime Support

Giải thích vòng đời runtime, chính sách cập nhật và những hạn chế sau decommission.

[Đọc trên Google Cloud](https://docs.cloud.google.com/functions/docs/runtime-support)

---

# GitHub Repository nổi bật

## actions/runner-images

**Repository:** [github.com/actions/runner-images](https://github.com/actions/runner-images)\
**Lĩnh vực:** CI/CD, GitHub Actions, Hosted Runners, Infrastructure Automation.

`actions/runner-images` là repository chính thức chứa những tài nguyên liên quan đến việc xây dựng và duy trì hosted runner images cho GitHub Actions.

Đây không phải repository mới được phát hành ngày 02/11.

Dự án được chọn vì có liên quan trực tiếp đến mốc retirement của macOS 14.

### Vì sao đáng nghiên cứu?

Các hosted runners cung cấp một môi trường build được quản lý sẵn.

Tuy nhiên, môi trường đó có thể thay đổi theo thời gian.

Một repository cần kiểm soát cả source dependencies và build environment dependencies.

`actions/runner-images` giúp developers theo dõi:

- Những hệ điều hành được hỗ trợ.
- Software inventory.
- Image updates.
- Breaking changes.
- Deprecation announcements.
- Migration guidance.

### Thử nghiệm gợi ý

Rà soát tất cả GitHub Actions workflows trong repository.

Tìm các runner labels đã cũ, xác định môi trường thay thế và chạy regression tests.

Đối với những projects cần kết quả build ổn định, nên ghi rõ compiler, SDK và runtime versions thay vì phụ thuộc hoàn toàn vào môi trường mặc định.

Không đưa số GitHub stars vì chỉ số này không cần thiết để đánh giá nội dung kỹ thuật của repository.

---

# Góc nhìn của mình

## 1\. Infrastructure lifecycle cần được đưa vào CI policy

Theo mình, một repository có dependency updates tự động nhưng không theo dõi runner image lifecycle vẫn còn thiếu một lớp bảo trì quan trọng.

GitHub Actions, container base images và cloud runtimes đều là dependencies.

Chúng cần được kiểm tra định kỳ giống như npm packages hoặc Composer dependencies.

Một hướng triển khai thực tế là tạo quy trình audit để phát hiện những runtime và runner labels đã deprecated trước khi chúng gây lỗi.

## 2\. Những cảnh báo có chủ đích không nên bị xem là lỗi ngẫu nhiên

Heroku-22 cho thấy nhà cung cấp có thể chủ động tạo ra failures để cảnh báo.

Nếu nhóm kỹ thuật chỉ retry build cho đến khi thành công, nguyên nhân thực sự có thể bị bỏ qua.

Vì vậy, khi CI/CD gặp lỗi, cần phân biệt application failure với platform lifecycle enforcement.

Một retry thành công không có nghĩa vấn đề đã được giải quyết.

## 3\. Correctness đôi khi quan trọng hơn performance

Supabase timezone advisory là ví dụ đáng chú ý.

Một database có thể hoạt động nhanh, ổn định và không xuất hiện lỗi kết nối, nhưng vẫn trả về dữ liệu thời gian không chính xác.

Những lỗi như vậy có thể khó phát hiện hơn sự cố downtime.

Theo mình, các ứng dụng xử lý lịch hẹn, thanh toán và báo cáo cần có regression tests cho những timezone thực sự được sử dụng.

## 4\. Runtime upgrades nên được thực hiện trước deadline

Khi runtime đã bước vào giai đoạn decommission, developer có thể không còn khả năng triển khai lại phiên bản cũ.

Điều này khiến rollback trở nên phức tạp hơn.

Vì vậy, migration nên được thực hiện khi runtime mới đã ổn định và runtime cũ vẫn còn được hỗ trợ.

Chờ đến ngày cuối cùng thường làm tăng rủi ro.

## 5\. Một bản tin kỹ thuật không nhất thiết phải có model AI mới

Không có lý do để lặp lại những công bố AI từ ngày trước nếu chưa có thay đổi mới thực chất.

Các thay đổi về CI/CD, runtime lifecycle và dữ liệu thời gian có thể mang lại giá trị thực tế lớn hơn với developer trong ngày hôm nay.

Điều quan trọng là xác định được việc gì cần kiểm tra và mức độ khẩn cấp của nó.

---

# Kết luận

Daily Tech Brief ngày 02/11/2026 tập trung vào một chủ đề chung: **operational readiness**.

GitHub Actions macOS 14 đến hạn retirement.

Heroku-22 bắt đầu tạo build failures theo chu kỳ.

Supabase cảnh báo lỗi chuyển đổi múi giờ PostgreSQL.

AWS Lambda Python 3.10 và Cloud Run functions Node.js 20 đều đã chạm những mốc quan trọng trong vòng đời runtime.

Ba việc nên ưu tiên trong tuần này:

1. Rà soát các GitHub Actions workflows còn sử dụng `macos-14`.
2. Kiểm tra các Heroku apps đang chạy trên Heroku-22 và lập kế hoạch migration.
3. Audit database timezone dependencies cùng những serverless runtimes đã deprecated hoặc decommissioned.

Thông điệp chính:

**Một hệ thống được bảo trì tốt không chỉ cập nhật tính năng mới, mà còn phải biết trước khi nào những thành phần đang sử dụng sẽ không còn được hỗ trợ.**

---

# Nguồn tham khảo

1. [GitHub — macOS 14 Runner Retirement](https://github.com/actions/runner-images/issues/13518)
2. [Heroku — Heroku-22 End-of-Life FAQ](https://help.heroku.com/NQNCQTEJ/heroku-22-end-of-life-faq)
3. [Supabase — PostgreSQL Timezone Fix](https://supabase.com/changelog/tzdata-local-time-vancouver-edmonton-casablanca)
4. [AWS — Lambda Runtime Support](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
5. [Google Cloud — Functions Runtime Support](https://docs.cloud.google.com/functions/docs/runtime-support)
6. [Heroku — SendGrid Unified Login](https://devcenter.heroku.com/changelog-items/3896)
7. [GitHub — Runner Images Repository](https://github.com/actions/runner-images)
8. [Heroku — Stack Documentation](https://devcenter.heroku.com/articles/stack)

---

# Thống kê độ mới

**Ngày bản tin:** 02/11/2026.

**Tổng số cập nhật và mốc vận hành được chọn:** 6.

**Cửa sổ ưu tiên:** 01/11/2026 07:30 đến 02/11/2026 07:30, Asia/Ho_Chi_Minh.

**Số thông báo sản phẩm mới có timestamp xác minh nằm trong 24 giờ:** 0.

**Số mốc vận hành có ngày hiệu lực 01–02/11:** 2.

- GitHub Actions macOS 14 runner retirement — 02/11.
- Heroku-22 first-build deprecation failures — 01/11.

**Các cập nhật mở rộng theo ngày công bố hoặc mốc áp dụng 30–31/10:** 4.

- Supabase PostgreSQL timezone advisory — 30/10, liên quan trực tiếp đến thay đổi tại Alberta ngày 01/11.
- AWS Lambda Python 3.10 deprecation — 31/10.
- Google Cloud Run functions Node.js 20 decommission — 30/10.
- Heroku SendGrid unified login changelog — 30/10, rollout bắt đầu 16/10.

Các nguồn không cung cấp đầy đủ giờ công bố kèm múi giờ, vì vậy không thể khẳng định chính xác từng cập nhật ngày 30/10 nằm trong giới hạn 72 giờ tính đến 07:30 ngày 02/11.

Các mốc retirement và deprecation đã được công bố trước đó, không được trình bày như những thông báo sản phẩm mới.

**Kiểm tra trùng lặp:** Đã đối chiếu với Daily Tech Brief 30/10 và 31/10, 01/11 cùng các handoff lịch sử truy cập được. Không lặp lại GPT-6 Rosalind, Vercel Runtime Cache, Supabase Explorer & Notebooks, Cloudflare Private Origins hoặc Chrome 156 Security Update.

Không bịa số GitHub stars, model versions hoặc benchmark.

Không tạo ảnh cover hoặc tệp Markdown trong bước này.