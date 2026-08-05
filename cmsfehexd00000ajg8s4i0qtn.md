---
title: "Daily Tech Brief — 05/08/2026"
seoTitle: "Daily Tech Brief — 05/08/2026"
seoDescription: "Google ra mắt agent vận hành database, GitHub mở rộng CodeQL và coverage automation, cùng các thay đổi quan trọng từ Supabase, Vercel và Chrome."
datePublished: 2026-08-05T01:20:35.319Z
cuid: cmsfehexd00000ajg8s4i0qtn
slug: daily-tech-brief-05-08-2026
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6b4417cd-6650-43fe-bb93-50834011f381.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/291db9d3-097a-4f3d-b73f-047e808fc744.png
tags: database, google-cloud, devsecops, ai-agents, daily-tech-brief, daily-tech-brief-05-08-2026

---

> Một bản tin giúp Developer cập nhật nhanh AI, Cloud, Open Source và những công nghệ đáng chú ý trong ngày.

* * *

## 📌 Executive Summary

*   Google Cloud giới thiệu hai Database Operations Agents hỗ trợ onboarding, quan sát và xử lý sự cố cơ sở dữ liệu.
    
*   Chrome Enterprise đặt browser policy, identity và data protection làm nền tảng kiểm soát agent tự động thao tác trên web.
    
*   GitHub cho phép quản lý cấu hình CodeQL tập trung bằng repository property, giảm nhu cầu duy trì workflow riêng trên từng repository.
    
*   GitHub Code Quality có thể dùng agent tạo pull request thiết lập code coverage với quyền tối thiểu.
    
*   GitHub bắt đầu dừng Spark trên github.com và hướng người dùng sang Copilot trong IDE, CLI cùng ứng dụng GitHub.
    
*   Dependabot hỗ trợ tùy chỉnh tên branch, hữu ích cho tổ chức có quy tắc CI hoặc naming convention chặt chẽ.
    
*   Vercel công bố skill packs trên skills.sh và tăng tốc deployment cho ứng dụng có nhiều trang ISR.
    
*   Supabase thay đổi cách chọn phiên bản PostgreSQL extension: từ hôm nay, version được ghi trong câu lệnh có thể bị bỏ qua để dùng bản mặc định.
    
*   Google Cloud trình bày cách tự động chuyển stored procedure nhiều result set từ SQL Server sang PostgreSQL.
    
*   Target cho biết việc hợp nhất transactional, graph, vector và full-text search trên Spanner giúp giảm đáng kể gánh nặng vận hành dữ liệu khám phá sản phẩm.
    
*   Deutsche Bank xem API management như lớp nền để nối hệ thống lõi, dịch vụ số và các agent tương lai.
    

* * *

## 📈 Hôm nay có gì nổi bật?

Các cập nhật hôm nay cho thấy AI agent đang rời khỏi phạm vi viết code để tiến vào những lớp vận hành nhạy cảm hơn: quản trị database, thao tác browser, tạo workflow CI và truy cập API doanh nghiệp. Điều đó làm thay đổi vai trò của platform engineering. Nền tảng không chỉ cần giúp agent hoàn thành tác vụ, mà còn phải áp dụng policy, identity, quyền tối thiểu và audit trail ngay từ đầu.

Xu hướng thứ hai là **cấu hình tập trung thay cho workflow phân tán**. GitHub đang đưa CodeQL, code coverage và repository policy về các điểm quản trị cấp tổ chức. Cách làm này giảm drift giữa hàng trăm repository, nhưng cũng đòi hỏi đội bảo mật xây cấu hình đủ linh hoạt để không cản trở từng nhóm sản phẩm.

Cuối cùng, database modernization tiếp tục chuyển từ “đổi engine” sang “đổi mô hình vận hành”. Google Cloud đang dùng agent để hỗ trợ vòng đời database, tự động dịch khác biệt SQL Server–PostgreSQL và hợp nhất nhiều loại truy vấn trên cùng một nền tảng dữ liệu.

* * *

## 📰 Tin nổi bật

### AI, Database và Agent Operations

#### Google Cloud giới thiệu Database Operations Agents

Google Cloud công bố chi tiết hai agent dành cho vận hành cơ sở dữ liệu:

*   **Database Onboarding Agent** cho các tác vụ Day 0 như lựa chọn cấu hình, khởi tạo và triển khai ban đầu.
    
*   **Database Observability Agent** cho Day 1 và Day 2 như giám sát, phân tích sự cố và bảo trì.
    

Các agent được tích hợp vào Cloud Console, CLI, chat, MCP server, IDE và một số công cụ bên thứ ba. Mục tiêu là đưa trợ lý vận hành đến đúng nơi kỹ sư đang làm việc thay vì buộc họ chuyển qua nhiều dashboard.

Điểm đáng chú ý là database agent không chỉ sinh SQL. Nó cần hiểu cấu hình hạ tầng, chỉ số vận hành, topology, lịch sử thay đổi và giới hạn của từng dịch vụ.

**Tác động với developer**

Database troubleshooting thường đòi hỏi ghép nhiều tín hiệu: query plan, index, lock, connection pool, CPU, memory và thay đổi deployment gần nhất. Agent có thể rút ngắn thời gian thu thập dữ liệu, nhưng quyết định thay đổi schema hoặc cấu hình production vẫn cần approval rõ ràng.

**Developer nên làm gì?**

*   Giới hạn agent ở chế độ quan sát trước khi cho phép thay đổi.
    
*   Tách quyền đọc telemetry và quyền sửa database.
    
*   Bắt buộc lưu lại recommendation, command và kết quả thực thi.
    
*   Kiểm thử agent trên staging bằng các failure scenario có chủ đích.
    

**Nguồn:** [Google Cloud — Introducing Database Operations Agents](https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents)

* * *

#### Chrome Enterprise xây lớp bảo vệ cho agentic browsing

Google cho rằng browser sẽ trở thành môi trường làm việc chính của nhiều agent vì đây là nơi đã có sẵn:

*   Danh tính người dùng.
    
*   Tab và tài liệu đang mở.
    
*   SaaS application.
    
*   Policy doanh nghiệp.
    
*   Data protection rule.
    
*   Lịch sử và ngữ cảnh phiên làm việc.
    

Chrome Enterprise đang định hướng các control hiện có cho cả con người lẫn agent. Khi agent thực hiện thao tác thay mặt nhân viên, trình duyệt cần phân biệt dữ liệu nào được đọc, domain nào được truy cập và hành động nào cần xác nhận.

Đây là bước tiến khác với browser automation truyền thống. Selenium hoặc Playwright thường chạy trong môi trường test. Agentic browsing có thể hoạt động trong phiên thật, với dữ liệu thật và quyền thật.

**Tác động với developer**

Ứng dụng SaaS nên chuẩn bị cho việc request đến từ agent hợp lệ, không chỉ từ người trực tiếp click. Audit log cần ghi nhận actor, delegated identity và nguồn automation thay vì chỉ lưu user ID.

**Developer nên làm gì?**

*   Tách rõ hành động đọc và hành động ghi.
    
*   Yêu cầu re-authentication cho thao tác nhạy cảm.
    
*   Hỗ trợ idempotency key cho workflow tự động.
    
*   Ghi audit metadata cho delegated hoặc automated action.
    
*   Không dựa duy nhất vào CAPTCHA để phân biệt người và agent.
    

**Nguồn:** [Google Cloud — The foundation for securing agentic browsing](https://cloud.google.com/blog/products/chrome-enterprise/future-mode-part-2-the-foundation-for-securing-agentic-browsing)

* * *

### GitHub và Software Quality

#### GitHub cho phép quản lý cấu hình CodeQL tập trung ở quy mô tổ chức

GitHub bổ sung repository property `github-codeql-config-file` cho Code Scanning default setup.

Tổ chức có thể đặt đường dẫn đến một file cấu hình CodeQL dùng chung để:

*   Thêm query.
    
*   Loại trừ path.
    
*   Chọn threat model.
    
*   Áp dụng model pack.
    
*   Dùng cấu hình từ repository trung tâm.
    
*   Cho phép hoặc cấm repository ghi đè.
    

Default setup sẽ merge cấu hình tổ chức với thiết lập tích hợp sẵn. Nhờ vậy, security team có được khả năng kiểm soát gần với advanced setup nhưng không phải duy trì một GitHub Actions workflow riêng trong từng repository.

Tính năng đã GA trên github.com và dự kiến có trong GitHub Enterprise Server 3.23.

**Tác động với developer**

Cấu hình tập trung giúp giảm tình trạng repository mới quên bật security scan hoặc dùng query không đồng nhất. Rủi ro ngược lại là một thay đổi sai trong file trung tâm có thể ảnh hưởng hàng loạt project.

**Developer nên làm gì?**

*   Rollout trước trên một nhóm repository thử nghiệm.
    
*   Version cấu hình trung tâm bằng tag hoặc branch ổn định.
    
*   Đo scan time và false positive trước khi áp dụng toàn tổ chức.
    
*   Xác định rõ trường hợp repository được phép override.
    

**Nguồn:** [GitHub — Customize code scanning default setup at scale](https://github.blog/changelog/2026-08-04-customize-code-scanning-default-setup-at-scale)

* * *

#### GitHub Code Quality dùng agent để thiết lập code coverage

Trong phần Code Quality settings, GitHub bổ sung tùy chọn gọi agent tạo pull request cấu hình coverage workflow.

Pull request được tạo có thể bao gồm:

*   Build project.
    
*   Chạy test.
    
*   Sinh coverage report.
    
*   Upload kết quả lên GitHub.
    
*   Quyền workflow theo nguyên tắc least privilege.
    

Tính năng đang ở public preview cho người dùng GitHub Code Quality trên GitHub Enterprise Cloud và Team.

Giá trị lớn nhất không nằm ở việc sinh YAML. Agent có context repository nên có thể lựa chọn command và cấu hình phù hợp hơn một template cố định.

**Tác động với developer**

Coverage setup đơn giản hơn có thể giúp nhiều project bắt đầu đo test coverage. Tuy nhiên, coverage cao không đồng nghĩa test tốt; việc đặt threshold cứng mà không phân biệt code mới và code cũ có thể tạo động lực viết test hình thức.

**Developer nên làm gì?**

*   Review kỹ quyền trong workflow được tạo.
    
*   Kiểm tra cache và artifact retention để tránh tăng chi phí CI.
    
*   Ưu tiên coverage cho code mới thay vì buộc legacy code đạt chuẩn ngay.
    
*   Không dùng coverage làm tiêu chí chất lượng duy nhất.
    

**Nguồn:** [GitHub — Code coverage automatic enablement](https://github.blog/changelog/2026-08-04-code-coverage-automatic-enablement-in-code-quality-settings)

* * *

#### CodeQL 2.26.2 hỗ trợ Swift 6.3.3 và Kotlin 2.4.10

GitHub phát hành CodeQL 2.26.2 với hỗ trợ cho:

*   Swift 6.3.3.
    
*   Kotlin 2.4.10.
    

Bản cập nhật cũng cải thiện độ chính xác của các truy vấn liên quan đến:

*   Path injection.
    
*   URL redirection.
    
*   GitHub Actions.
    

Đây là cập nhật nhỏ về giao diện nhưng quan trọng với đội mobile hoặc backend JVM đang nâng compiler.

**Tác động với developer**

Nếu CodeQL không hiểu đúng phiên bản ngôn ngữ mới, scan có thể bỏ sót flow hoặc tạo lỗi phân tích. Do đó, việc nâng compiler và nâng static analyzer nên nằm trong cùng kế hoạch migration.

**Nguồn:** [GitHub — CodeQL 2.26.2](https://github.blog/changelog/2026-08-04-codeql-2-26-2-adds-swift-6-3-3-and-kotlin-2-4-10-support)

* * *

#### Dependabot cho phép tùy chỉnh tên branch của pull request

GitHub bổ sung các tùy chọn `pull-request-branch-name` trong `.github/dependabot.yml`.

Developer có thể tùy chỉnh:

*   Prefix.
    
*   Độ dài tối đa.
    
*   Dấu phân cách.
    
*   Chữ hoa hoặc chữ thường.
    
*   Template với placeholder.
    

Ví dụ, branch mặc định:

```plaintext
dependabot/npm_and_yarn/lodash-4.17.21
```

có thể đổi thành:

```plaintext
deps-npm-lodash-4-17-21
```

Tính năng này hữu ích với hệ thống CI sử dụng branch pattern để chọn pipeline, môi trường preview hoặc policy merge.

**Developer nên làm gì?**

Không nên thay đổi chỉ vì thẩm mỹ. Hãy dùng khi naming convention hiện tại làm hỏng tooling, vượt giới hạn hệ thống hoặc khó ánh xạ với ticket.

**Nguồn:** [GitHub — Customize Dependabot pull request branch names](https://github.blog/changelog/2026-08-04-customize-dependabot-pull-request-branch-names)

* * *

#### GitHub bắt đầu ngừng Spark trên github.com

Từ ngày 04/08/2026, GitHub Spark:

*   Không nhận người dùng mới.
    
*   Không cho tạo ứng dụng mới.
    
*   Cho người dùng hiện tại truy cập đến ngày 31/08/2026 để export ứng dụng.
    
*   Không dừng các ứng dụng đã deploy.
    

GitHub cho biết người dùng đang chuyển sang các workflow tích hợp hơn thông qua Copilot trong VS Code, Copilot CLI và ứng dụng GitHub.

Đây là một tín hiệu sản phẩm đáng chú ý: công cụ tạo ứng dụng độc lập đang nhường chỗ cho agent nằm trực tiếp trong môi trường phát triển hiện có.

**Developer nên làm gì?**

Người đang dùng Spark cần export source, asset, environment variable và tài liệu deployment trước hạn. Không nên chỉ dựa vào việc ứng dụng đã deploy vẫn tiếp tục chạy.

**Nguồn:** [GitHub — Upcoming deprecation of GitHub Spark](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com)

* * *

### Database Modernization và Data Platform

#### Google DMS tự động dịch stored procedure nhiều result set sang PostgreSQL

SQL Server có thể trả nhiều result set trong một lần thực thi stored procedure. PostgreSQL xử lý trường hợp tương tự theo cơ chế khác, thường cần cursor hoặc function trả về `SETOF refcursor`.

Google Cloud mô tả cách Database Migration Service lựa chọn chiến lược chuyển đổi:

*   Một result set hoặc chỉ có scalar return: dùng stored procedure với `INOUT refcursor`.
    
*   Nhiều result set hoặc kết hợp result set và scalar return: chuyển thành function trả về `SETOF refcursor`.
    
*   Scalar return có thể được biểu diễn thành một cursor riêng.
    

DMS giữ lại phần lớn conditional logic, nhưng application layer phải thay đổi cách lấy kết quả.

**Tác động với developer**

Database migration không kết thúc khi SQL compile. Connection pool, ORM, transaction boundary và code đọc result set đều có thể phải thay đổi.

**Developer nên làm gì?**

*   Tạo contract test cho từng stored procedure.
    
*   So sánh số result set, schema, thứ tự và nullability.
    
*   Kiểm tra transaction vẫn mở khi đọc cursor.
    
*   Benchmark với connection pool thật của ứng dụng.
    

**Nguồn:** [Google Cloud — Automating Postgres translations with Database Migration Service](https://cloud.google.com/blog/products/databases/automating-postgres-translations-with-database-migration-service)

* * *

#### Target hợp nhất graph, vector, full-text và transaction trên Spanner

Target mô tả việc thay kiến trúc phân mảnh gồm Elasticsearch và nhiều NoSQL datastore bằng Spanner cho nền tảng khám phá sản phẩm.

Yêu cầu của hệ thống gồm:

*   Transactional workload.
    
*   Graph relationship.
    
*   Vector similarity.
    
*   Full-text search.
    
*   Khả năng mở rộng toàn cầu.
    
*   Dữ liệu phục vụ trợ lý mua sắm bằng AI.
    

Theo case study, việc hợp nhất giúp giảm 50% công sức bảo trì database.

Điểm quan trọng không phải mọi hệ thống đều nên dùng một database. Bài học nằm ở chi phí phối hợp giữa nhiều datastore: đồng bộ dữ liệu, consistency, reindex, schema duplication và incident ownership.

**Tác động với developer**

Kiến trúc polyglot persistence chỉ có lợi khi giá trị chuyên biệt của mỗi engine lớn hơn chi phí vận hành và đồng bộ. Nếu workload cần kết hợp nhiều loại truy vấn trong cùng transaction hoặc cùng dữ liệu, hợp nhất có thể hợp lý hơn.

**Nguồn:** [Google Cloud — How Target rebuilt retail discovery with Spanner Graph](https://cloud.google.com/blog/topics/retail/how-target-rebuilt-retail-discovery-with-spanner-graph)

* * *

#### Deutsche Bank xây API management làm nền cho hệ thống agent

Deutsche Bank chia sẻ quá trình chuyển từ hệ thống monolithic sang các API module được quản trị tập trung bằng Apigee.

Nền tảng API được dùng để chuẩn hóa:

*   Documentation.
    
*   Security policy.
    
*   Lifecycle management.
    
*   Khả năng tái sử dụng.
    
*   Quyền truy cập.
    
*   Integration giữa hệ thống lõi và dịch vụ mới.
    

Ngân hàng cũng xem API là lớp kết nối cho MCP và A2A trong tương lai. MCP tập trung vào tool và resource, trong khi A2A phục vụ giao tiếp giữa các agent.

**Tác động với developer**

Doanh nghiệp không thể đưa agent vào hệ thống legacy nếu capability vẫn bị khóa trong UI hoặc kết nối point-to-point. API inventory, schema ổn định và policy nhất quán sẽ trở thành điều kiện trước khi triển khai agent.

**Developer nên làm gì?**

*   Lập catalog API và owner rõ ràng.
    
*   Tách API nội bộ, partner và agent-facing.
    
*   Thiết kế scope nhỏ thay vì cấp token quyền rộng.
    
*   Đưa rate limit, audit và data classification vào gateway.
    

**Nguồn:** [Google Cloud — Deutsche Bank API-ready ecosystem](https://cloud.google.com/blog/topics/financial-services/unlocking-agility-in-banking-with-an-api-ready-ecosystem-at-deutsche-bank)

* * *

### Web Platform và Developer Experience

#### Vercel ra mắt skill packs và tăng tốc deployment nhiều trang ISR

Vercel công bố hai cập nhật riêng trong ngày 04/08.

Thứ nhất, developer có thể tạo **skill pack** từ thư mục skills.sh để tải và cập nhật nhiều agent skill bằng một command thay vì quản lý riêng từng skill.

Thứ hai, deployment cho ứng dụng có nhiều trang Incremental Static Regeneration được cải thiện tốc độ tối đa 33%, với lợi ích lớn nhất ở project có nhiều trang prerender.

Hai cập nhật phản ánh hai nhu cầu khác nhau:

*   Chuẩn hóa capability cho agent.
    
*   Giảm thời gian feedback của web project quy mô lớn.
    

**Tác động với developer**

Skill pack giúp đội ngũ chia sẻ một bộ quy tắc và capability thống nhất, nhưng cũng tạo dependency mới cần version và review. Với ISR, build nhanh hơn chỉ có giá trị nếu không đổi lấy cache invalidation thiếu kiểm soát.

**Developer nên làm gì?**

*   Pin version skill pack thay vì luôn lấy latest.
    
*   Review instruction và script trong skill trước khi phân phối nội bộ.
    
*   Đo build time theo số trang ISR thực tế.
    
*   Theo dõi deployment size và cache behavior sau cập nhật.
    

**Nguồn:** [Vercel Changelog](https://vercel.com/changelog)

* * *

### Supabase và PostgreSQL

#### Supabase bắt đầu bỏ qua version được ghi khi cài extension

Từ ngày 05/08/2026, Supabase deprecate việc chỉ định version cụ thể trong:

```plaintext
CREATE EXTENSION ... VERSION 'x.y';
```

hoặc:

```plaintext
ALTER EXTENSION ... UPDATE TO 'x.y';
```

Version được ghi có thể bị bỏ qua và Supabase sẽ cài bản mặc định, đồng thời trả warning.

Mục tiêu là giảm phân mảnh và tránh việc project giữ các bản extension cũ không còn được hỗ trợ. Tuy nhiên, thay đổi này ảnh hưởng đến quy trình migration yêu cầu môi trường staging và production dùng đúng cùng version.

**Tác động với developer**

Migration script vẫn chạy nhưng kết quả có thể khác mong đợi. Đây là loại breaking change nguy hiểm vì pipeline không nhất thiết fail.

**Developer nên làm gì?**

*   Không dựa vào `VERSION` để bảo đảm reproducibility.
    
*   Sau migration, query `pg_extension` để xác minh version thực tế.
    
*   Test compatibility với default version mới.
    
*   Lưu extension version vào deployment report hoặc migration audit.
    

**Nguồn:** [Supabase — Extension version pinning deprecation](https://supabase.com/changelog?tags=security)

* * *

#### Supabase sắp xếp lại điều hướng Project Settings

Supabase Studio chuyển phần cấu hình từng dịch vụ sang khu vực riêng:

*   Database.
    
*   Data API.
    
*   Auth.
    
*   Storage.
    
*   Edge Functions.
    
*   Log Drains.
    

URL cũ tiếp tục redirect và trang Project Settings vẫn giữ shortcut trong giai đoạn chuyển tiếp.

Đây là thay đổi giao diện nhỏ, nhưng cần chú ý nếu tài liệu nội bộ, screenshot hướng dẫn hoặc browser automation phụ thuộc vào đường dẫn và selector cũ.

**Developer nên làm gì?**

*   Dùng URL ổn định thay vì selector theo vị trí menu.
    
*   Cập nhật runbook và tài liệu onboarding.
    
*   Kiểm tra lại automation thao tác trên dashboard.
    
*   Ưu tiên CLI hoặc Management API cho quy trình lặp lại.
    

**Nguồn:** [Supabase Changelog — Dashboard Navigation Updates](https://supabase.com/changelog?tags=studio)

* * *

## 🔥 Top 5 đáng chú ý nhất hôm nay

| Hạng | Chủ đề | Giá trị thực tế |
| --- | --- | --- |
| 1 | Database Operations Agents | Đưa agent vào một trong những khu vực production nhạy cảm nhất: cấu hình và xử lý sự cố database. |
| 2 | CodeQL cấu hình tập trung | Giúp security team quản trị hàng trăm repository mà không duy trì hàng trăm workflow riêng. |
| 3 | Agentic browsing security | Browser trở thành trust boundary mới giữa identity, dữ liệu doanh nghiệp và agent. |
| 4 | Supabase bỏ qua extension version | Migration có thể không fail nhưng tạo ra version khác mong đợi, cần kiểm tra ngay. |
| 5 | GitHub Spark bị ngừng | Cho thấy agent tích hợp trong IDE và workflow đang thay thế app builder độc lập. |

* * *

## 🛠 Công cụ đáng thử hôm nay

### CodeQL CLI

Phù hợp với đội muốn kiểm tra query hoặc database CodeQL cục bộ trước khi đưa cấu hình lên toàn tổ chức.

*   Website: [CodeQL CLI](https://docs.github.com/code-security/codeql-cli)
    
*   Dùng để: tạo database phân tích, chạy query pack và kiểm tra custom query.
    
*   Phù hợp với: Application Security và platform team.
    

### pgTAP

Framework kiểm thử PostgreSQL bằng SQL, hữu ích khi migration stored procedure hoặc extension.

*   Repository: [theory/pgtap](https://github.com/theory/pgtap)
    
*   Dùng để: kiểm tra function, schema, permission và behavior sau migration.
    
*   Phù hợp với: backend team và database engineer.
    

### Schemathesis

Công cụ property-based testing cho API dựa trên OpenAPI hoặc GraphQL schema.

*   Repository: [schemathesis/schemathesis](https://github.com/schemathesis/schemathesis)
    
*   Dùng để: tìm edge case, lỗi validation và sai khác contract.
    
*   Phù hợp với: đội đang chuẩn hóa API cho integration và agent.
    

### Renovate

Renovate cung cấp khả năng tùy chỉnh branch, grouping và policy dependency sâu hơn cho tổ chức có workflow phức tạp.

*   Repository: [renovatebot/renovate](https://github.com/renovatebot/renovate)
    
*   Dùng để: quản lý dependency update theo policy.
    
*   Phù hợp với: monorepo và tổ chức có nhiều ecosystem.
    

* * *

## 📚 Bài viết nên đọc

### Introducing Database Operations Agents

Bài viết cung cấp góc nhìn rõ về cách agent được đưa vào toàn bộ vòng đời database, từ khởi tạo đến troubleshooting.

Đọc tại: [Google Cloud Blog](https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents)

### Future Mode Part 2: Securing agentic browsing

Một tài liệu hữu ích để suy nghĩ về browser như một control plane cho identity, dữ liệu và hành động của agent.

Đọc tại: [Google Cloud Blog](https://cloud.google.com/blog/products/chrome-enterprise/future-mode-part-2-the-foundation-for-securing-agentic-browsing)

### Multiple result sets: SQL Server to PostgreSQL

Bài kỹ thuật cụ thể, có decision matrix và ví dụ chuyển stored procedure nhiều result set sang PostgreSQL.

Đọc tại: [Google Cloud Blog](https://cloud.google.com/blog/products/databases/automating-postgres-translations-with-database-migration-service)

### How Target rebuilt retail discovery with Spanner Graph

Đáng đọc cho developer đang cân nhắc giữa nhiều datastore chuyên biệt và một nền tảng dữ liệu hợp nhất.

Đọc tại: [Google Cloud Blog](https://cloud.google.com/blog/topics/retail/how-target-rebuilt-retail-discovery-with-spanner-graph)

* * *

## 🚀 GitHub Repository nổi bật

### theory/pgtap

Framework test PostgreSQL lâu đời, phù hợp để xác minh database migration bằng test có thể chạy trong CI.

*   Repository: [github.com/theory/pgtap](https://github.com/theory/pgtap)
    
*   Liên hệ với tin hôm nay: kiểm tra function, cursor và extension sau migration.
    

### schemathesis/schemathesis

Công cụ tự động sinh test từ API schema.

*   Repository: [github.com/schemathesis/schemathesis](https://github.com/schemathesis/schemathesis)
    
*   Liên hệ với tin hôm nay: kiểm tra API contract trước khi mở capability cho agent.
    

### github/codeql

Repository chứa query và library mã nguồn mở của CodeQL.

*   Repository: [github.com/github/codeql](https://github.com/github/codeql)
    
*   Liên hệ với tin hôm nay: xây query pack và cấu hình security scan tập trung.
    

* * *

## 💬 Góc nhìn của mình

Agent đang biến những công cụ vốn được thiết kế cho con người thành API thực thi tự động. Database console, browser, CI settings và API gateway đều bắt đầu được agent sử dụng trực tiếp hoặc gián tiếp.

Điều này làm xuất hiện một lớp yêu cầu mới: **delegated execution**. Hệ thống không chỉ cần biết “user nào thực hiện hành động”, mà còn cần biết user đã giao quyền cho agent nào, agent dùng context nào và policy nào cho phép hành động đó.

GitHub đang giải quyết một phần bài toán bằng pull request. Agent có thể tạo coverage workflow, nhưng con người vẫn review trước khi merge. Đây là pattern tốt hơn việc cho agent thay đổi cấu hình trực tiếp: tự động hóa phần chuẩn bị, giữ approval ở điểm có blast radius cao.

Database agent cũng nên đi theo mô hình tương tự. Agent có thể thu thập metric, đề xuất index hoặc tạo migration, nhưng production change cần một boundary riêng. Những hệ thống cho agent vừa chẩn đoán, vừa sửa, vừa xác nhận thành công trong cùng một quyền sẽ rất khó kiểm toán khi xảy ra sự cố.

Sự thay đổi của Supabase là một ví dụ nhỏ nhưng đáng nhớ. Một command có thể chạy thành công trong khi kết quả khác với ý định ban đầu. Với agent, “không có lỗi” không đồng nghĩa “đúng”. Workflow cần thêm bước post-condition verification thay vì chỉ kiểm tra exit code.

Trong giai đoạn tới, nền tảng tốt sẽ không được đánh giá chỉ bằng số tool agent có thể gọi. Điều quan trọng hơn là khả năng giới hạn quyền, xác minh trạng thái sau hành động và giải thích đầy đủ chuỗi quyết định.

* * *

## 📝 Kết luận

Việc thực tế nhất hôm nay là kiểm tra các migration Supabase có pin extension version và bổ sung bước xác minh version sau triển khai. Đây là thay đổi có thể âm thầm tạo khác biệt giữa môi trường mà không làm pipeline thất bại.

Với tổ chức dùng GitHub Code Scanning, hãy cân nhắc đưa cấu hình CodeQL về một repository trung tâm, nhưng rollout theo từng nhóm nhỏ. Cấu hình tập trung giúp giảm drift, đồng thời cũng làm tăng phạm vi ảnh hưởng của một thay đổi sai.

Cuối cùng, khi đưa agent vào browser, database hoặc API doanh nghiệp, hãy thiết kế approval và audit trước khi thiết kế prompt. Prompt tốt giúp agent làm đúng nhiều hơn; trust boundary tốt giúp hệ thống vẫn an toàn khi agent làm sai.

* * *

## 🔗 Nguồn tham khảo

1.  [Google Cloud — Database Operations Agents](https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents)
    
2.  [Google Cloud — Securing agentic browsing](https://cloud.google.com/blog/products/chrome-enterprise/future-mode-part-2-the-foundation-for-securing-agentic-browsing)
    
3.  [GitHub — Customize code scanning default setup at scale](https://github.blog/changelog/2026-08-04-customize-code-scanning-default-setup-at-scale)
    
4.  [GitHub — Code coverage automatic enablement](https://github.blog/changelog/2026-08-04-code-coverage-automatic-enablement-in-code-quality-settings)
    
5.  [GitHub — CodeQL 2.26.2](https://github.blog/changelog/2026-08-04-codeql-2-26-2-adds-swift-6-3-3-and-kotlin-2-4-10-support)
    
6.  [GitHub — Customize Dependabot branch names](https://github.blog/changelog/2026-08-04-customize-dependabot-pull-request-branch-names)
    
7.  [GitHub — GitHub Spark deprecation](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com)
    
8.  [Google Cloud — SQL Server to PostgreSQL translation](https://cloud.google.com/blog/products/databases/automating-postgres-translations-with-database-migration-service)
    
9.  [Google Cloud — Target and Spanner Graph](https://cloud.google.com/blog/topics/retail/how-target-rebuilt-retail-discovery-with-spanner-graph)
    
10.  [Google Cloud — Deutsche Bank API ecosystem](https://cloud.google.com/blog/topics/financial-services/unlocking-agility-in-banking-with-an-api-ready-ecosystem-at-deutsche-bank)
     
11.  [Vercel Changelog](https://vercel.com/changelog)
     
12.  [Supabase Security Changelog](https://supabase.com/changelog?tags=security)
     
13.  [Supabase Studio Changelog](https://supabase.com/changelog?tags=studio)