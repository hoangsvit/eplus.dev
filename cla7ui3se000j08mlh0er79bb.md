---
title: "Free for developers"
seoDescription: "Developers and Open Source authors now have a massive amount of services offering free tiers, but it can be hard to find them all to make informed decisions"
datePublished: Tue Nov 08 2022 06:42:45 GMT+0000 (Coordinated Universal Time)
cuid: cla7ui3se000j08mlh0er79bb
slug: free-for-developers
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1667889678693/xXP1AH-yg.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1667889703019/wzdx-FOWF.png
tags: paas, saas, devops, iaas

---

Developers and Open Source authors now have a massive amount of services offering free tiers, but it can be hard to find them all to make informed decisions.

This is a list of software (SaaS, PaaS, IaaS, etc.) and other offerings that have free tiers for developers.

The scope of this particular list is limited to things that infrastructure developers (System Administrator, DevOps Practitioners, etc.) are likely to find useful. We love all the free services out there, but it would be good to keep it on topic. It's a bit of a grey line at times so this is a bit opinionated; do not be offended if I do not accept your contribution.

This list is the result of Pull Requests, reviews, ideas and work done by 1100+ people. You too can help by sending [Pull Requests](https://github.com/ripienaar/free-for-dev) to add more services or by remove ones whose offerings have changed or been retired.

[![Track Awesome List](https://camo.githubusercontent.com/a3a46cf6e9b86345756f800e47a3d24ba217ba4004dd2164a6d4c5168e0c00c9/68747470733a2f2f7777772e747261636b617765736f6d656c6973742e636f6d2f62616467652e737667 align="left")](https://www.trackawesomelist.com/ripienaar/free-for-dev)

**NOTE**: This list is only for as-a-Service offerings, not for self-hosted software. For a service to be eligible it has to offer a free tier and not just a free trial. If the free tier is time-bucketed it has to be for at least a year. We also consider the free tier from a security perspective, so SSO is fine but I will not accept services that restrict TLS to paid-only tiers.

## Major Cloud Providers

* [Google Cloud Platform](https://cloud.google.com/)
    
    * App Engine - 28 frontend instance hours per day, 9 backend instance hours per day
        
    * Cloud Firestore - 1GB storage, 50,000 reads, 20,000 writes, 20,000 deletes per day
        
    * Compute Engine - 1 non-preemptible e2-micro, 30GB HDD, 5GB snapshot storage (restricted to certain regions), 1 GB network egress from North America to all region destinations (excluding China and Australia) per month
        
    * Cloud Storage - 5GB, 1GB network egress
        
    * Cloud Shell - Web-based Linux shell/basic IDE with 5GB of persistent storage. 60 hours limit per week
        
    * Cloud Pub/Sub - 10GB of messages per month
        
    * Cloud Functions - 2 million invocations per month (includes both background and HTTP invocations)
        
    * Cloud Run - 2 million requests per month, 360,000 GB-seconds memory, 180,000 vCPU-seconds of compute time, 1 GB network egress from North America per month
        
    * Google Kubernetes Engine - No cluster management fee for one zonal cluster. Each user node is charged at standard Compute Engine pricing
        
    * BigQuery - 1 TB of querying per month, 10 GB of storage each month
        
    * Cloud Build - 120 build-minutes per day
        
    * Cloud Source Repositories - Up to 5 Users, 50 GB Storage, 50 GB Egress
        
    * [Google Colab](https://colab.research.google.com/) - Free Jupyter Notebooks development environment.
        
    * Full, detailed list - [https://cloud.google.com/free](https://cloud.google.com/free)
        
* [Amazon Web Services](https://aws.amazon.com/)
    
    * [CloudFront](https://aws.amazon.com/cloudfront/) - 1TB egress per month
        
    * [Cloudwatch](https://aws.amazon.com/cloudwatch/) - 10 custom metrics and 10 alarms
        
    * [CodeBuild](https://aws.amazon.com/codebuild/) - 100min of build time per month
        
    * [CodeCommit](https://aws.amazon.com/codecommit/) - 5 active users,50GB storage and 10000 request per month
        
    * [CodePipeline](https://aws.amazon.com/codepipeline/) - 1 active pipeline per month
        
    * [DynamoDB](https://aws.amazon.com/dynamodb/) - 25GB NoSQL DB
        
    * [EC2](https://aws.amazon.com/ec2/) - 750 hours per month of t2.micro or t3.micro(12mo). 100GB egress per month
        
    * [EBS](https://aws.amazon.com/ebs/) - 30GB per month of General Purpose (SSD) or Magnetic(12mo)
        
    * [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/) - 750 hours per month(12mo)
        
    * [RDS](https://aws.amazon.com/rds/) - 750 hours per month of db.t2.micro, db.t3.micro, or db.t4g.micro, 20GB of General Purpose (SSD) storage, 20GB of storage backups
        
    * [Glacier](https://aws.amazon.com/glacier) - 10GB long-term object storage
        
    * [Lambda](https://aws.amazon.com/lambda/) - 1 million requests per month
        
    * [SNS](https://aws.amazon.com/sns/) - 1 million publishes per month
        
    * [SES](https://aws.amazon.com/ses/) - 62.000 messages per month
        
    * [SQS](https://aws.amazon.com/sqs/) - 1 million messaging queue requests
        
    * Full, detailed list - [https://aws.amazon.com/free/](https://aws.amazon.com/free/)
        
* [Microsoft Azure](https://azure.microsoft.com/)
    
    * [Virtual Machines](https://azure.microsoft.com/services/virtual-machines/) - 1 B1S Linux VM, 1 B1S Windows VM (12mo)
        
    * [App Service](https://azure.microsoft.com/services/app-service/) - 10 web, mobile or API apps (60 CPU minutes / day)
        
    * [Functions](https://azure.microsoft.com/services/functions/) - 1 million requests per month
        
    * [DevTest Labs](https://azure.microsoft.com/services/devtest-lab/) - Enable fast, easy, and lean dev-test environments
        
    * [Active Directory](https://azure.microsoft.com/services/active-directory/) - 500,000 objects
        
    * [Active Directory B2C](https://azure.microsoft.com/services/active-directory/external-identities/b2c/) - 50,000 monthly stored users
        
    * [Azure DevOps](https://azure.microsoft.com/services/devops/) - 5 active users, unlimited private Git repos
        
    * [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/) — 10 free parallel jobs with unlimited minutes for open source for Linux, macOS, and Windows
        
    * [Microsoft IoT Hub](https://azure.microsoft.com/services/iot-hub/) - 8,000 messages per day
        
    * [Load Balancer](https://azure.microsoft.com/services/load-balancer/) - 1 free public load balanced IP (VIP)
        
    * [Notification Hubs](https://azure.microsoft.com/services/notification-hubs/) - 1 million push notifications
        
    * [Bandwidth](https://azure.microsoft.com/pricing/details/bandwidth/) - 15GB Inbound(12mo) & 5GB egress per month
        
    * [Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) - 5GB storage and 400 RUs of provisioned throughput
        
    * [Static Web Apps](https://azure.microsoft.com/pricing/details/app-service/static/) — Build, deploy and host static apps and serverless functions, with free SSL, Authentication/Authorization and custom domains
        
    * [Storage](https://azure.microsoft.com/services/storage/) - 5GB LRS File or Blob storage (12mo)
        
    * [Cognitive Services](https://azure.microsoft.com/services/cognitive-services/) - AI/ML APIs (Computer Vision, Translator, Face detection, Bots...) with free tier including limited transactions
        
    * [Cognitive Search](https://azure.microsoft.com/services/search/#features) - AI-based search and indexation service, free for 10,000 documents
        
    * [Azure Kubernetes Service](https://azure.microsoft.com/services/kubernetes-service/) - Managed Kubernetes service, free cluster management
        
    * [Event Grid](https://azure.microsoft.com/services/event-grid/) - 100K ops/month
        
    * Full, detailed list - [https://azure.microsoft.com/free/](https://azure.microsoft.com/free/)
        
* [Oracle Cloud](https://www.oracle.com/cloud/)
    
    * Compute
        
        * 2 AMD based Compute VMs with 1/8 OCPU and 1 GB memory eachs
            
        * 4 Arm-based Ampere A1 cores and 24 GB of memory usable as one VM or up to 4 VMs
            
        * Instances will be reclaimed when [deemed idle](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm#compute__idleinstances)
            
    * Block Volume - 2 volumes, 200 GB total (used for compute)
        
    * Object Storage - 10 GB
        
    * Load balancer - 1 instance with 10 Mbps
        
    * Databases - 2 DBs, 20 GB each
        
    * Monitoring - 500 million ingestion datapoints, 1 billion retrieval datapoints
        
    * Bandwidth - 10 TB egress per month, speed limited to 50 Mbps on x64 based VM, 500 Mbps \* core count on ARM based VM
        
    * Public IP - 2 IPv4 for VMs, 1 IPv4 for load balancer
        
    * Notifications - 1 million delivery options per month, 1000 emails sent per month
        
    * Full, detailed list - [https://www.oracle.com/cloud/free/](https://www.oracle.com/cloud/free/)
        
* [IBM Cloud](https://www.ibm.com/cloud/free/)
    
    * Cloud Functions - 5 million executions per month
        
    * Object Storage - 25GB per month
        
    * Cloudant database - 1 GB of data storage
        
    * Db2 database - 100MB of data storage
        
    * API Connect - 50,000 API calls per month
        
    * Availability Monitoring - 3 million data points per month
        
    * Log Analysis - 500MB of daily log
        
    * Full, detailed list - [https://www.ibm.com/cloud/free/](https://www.ibm.com/cloud/free/)
        

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Cloud management solutions

* [Brainboard](https://www.brainboard.co/) - Collaborative solution to visually build and manage cloud infrastructures from end-to-end.
    
* [Pulumi](https://www.pulumi.com/) — Modern infrastructure as code platform that allows you to use familiar programming languages and tools to build, deploy, and manage cloud infrastructure.
    
* [Selefra](https://www.selefra.io/) - Selefra free tier offers individual users to scan one single-source connection to discover security and compliance issues on the configurations level of cloud/infra/SaaS.
    
* [terraform.io](http://terraform.io) — Terraform Cloud. Free remote state management and team collaboration for teams up to 5 users.
    
* [scalr.com](http://scalr.com) - Scalr is a Terraform Automation and COllaboration (TACO) product, used to better collaboration and automation on infrastructure and configurations managed by Terraform. Full support of Terraform CLI, integration with OPA and a hierarchical configuration model. No SSO tax. All features are included. Use up to 50 runs / month for free.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Source Code Repos

* [Bitbucket](https://bitbucket.org/) — Unlimited public and private Git repos for up to 5 users with Pipelines for CI/CD
    
* [chiselapp.com](http://chiselapp.com) — Unlimited public and private Fossil repositories
    
* [codebasehq.com](http://codebasehq.com) — One free project with 100 MB space and 2 users
    
* [Codeberg.org](http://Codeberg.org) - Unlimited public and private Git repos for free and open-source projects. Static website hosting with [Codeberg Pages](https://codeberg.page/).
    
* [GitGud](https://gitgud.io/) — Unlimited private and public repositories. Free forever. Powered by GitLab & Sapphire. CI/CD not provided.
    
* [GitHub](https://github.com/) — Unlimited public repositories and unlimited private repositories (with unlimited collaborators). Apart from this some other free services(there are much more but we list the main ones here) provided are :
    
    * [CI/CD](https://github.com/features/actions)(Free for Public Repos, 2000 min/month for private repos free)
        
    * [Codespaces](https://github.com/codespaces) - Development environments that are hosted in the cloud. 120-core hours and 15 GB codespaces storage available for free every month.
        
    * [Static Website Hosting](https://pages.github.com/) (Free for Public Repos)
        
    * [Package Hosting & Container Registry](https://github.com/features/packages) (Free for public repos,500 MB storage & 1GB bandwidth outside CI/CD free for private repos)
        
    * Project Management & Issue Tracking.
        
    * [GitHub Copilot](https://github.com/features/copilot) — AI pair programmer and completion tool powered by OpenAI Codex. Provides code review, autocompletion, documentation, and refactoring. Free for students via the GitHub Student Developer Pack.
        
* [gitlab.com](http://gitlab.com) — Unlimited public and private Git repos with up to 5 collaborators. Also offers the following features :
    
    * [CI/CD](https://about.gitlab.com/product/continuous-integration) (Free for Public Repos, 400 mins/month for private repos)
        
    * Static Sites with [GitLab Pages](https://about.gitlab.com/product/pages).
        
    * Container Registry with 10 GB limit per repo.
        
    * Project Management & Issue Tracking.
        
* [heptapod.net](http://heptapod.net) — Heptapod is a friendly fork of GitLab Community Edition providing support for Mercurial
    
* [ionicframework.com](http://ionicframework.com) - Repo and tools to develop applications with Ionic, also you have an ionic repo
    
* [NotABug](https://notabug.org/) — [NotABug.org](http://NotABug.org) is a free-software code collaboration platform for freely licensed projects, Git-based
    
* [OSDN](https://osdn.net/) - [OSDN.net](http://OSDN.net) is a free-of-charge service for open source software developers, offering SVN/Git/Mercurial/Bazaar/CVS repositories and more.
    
* [Pagure.io](http://Pagure.io) — [Pagure.io](http://Pagure.io) is a free and open source software code collaboration platform for FOSS-licensed projects, Git-based
    
* [perforce.com](http://perforce.com) — Free 1GB Cloud and Git, Mercurial, or SVN repositories.
    
* [pijul.com](http://pijul.com) - Unlimited free and open source distributed version control system. Its distinctive feature is to be based on a sound theory of patches, which makes it easy to learn and use, and really distributed. Solves many problems of git/hg/svn/darcs.
    
* [plasticscm.com](http://plasticscm.com) — Free for individuals, OSS and nonprofit organizations
    
* [projectlocker.com](http://projectlocker.com) — One free private project (Git and Subversion) with 50 MB space
    
* [RocketGit](https://rocketgit.com/) — Repository Hosting based on Git. Unlimited Public & Private repositories.
    
* [savannah.gnu.org](http://savannah.gnu.org) - Serves as a collaborative software development management system for free Software projects (for GNU Projects)
    
* [savannah.nongnu.org](http://savannah.nongnu.org) - Serves as a collaborative software development management system for free Software projects (for non-GNU projects)
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## APIs, Data and ML

* [IP.City](http://IP.City) — 100 free IP geolocation requests per day
    
* [A11yWatch](https://a11ywatch.com/) - Powerful web accessibility tool at scale. Free site-wide web acessibility testing and beyond that resets daily.
    
* [Abstract API](https://www.abstractapi.com/) — API suite for a variety of use cases including IP geolocation, gender detection or even email validation.
    
* [algorithmia.com](http://algorithmia.com) — Host algorithms for free. Includes free monthly allowance for running algorithms. Now with CLI support.
    
* [Apify](https://www.apify.com/) — Web scraping and automation platform to create an API for any website and extract data. Ready-made scrapers, integrated proxies, and custom solutions. Free plan with $5 platform credits included every month.
    
* [API Mocha](https://apimocha.com/) - Completely free online API mocking for testing and prototyping. Make up to 500 requests per day, fully customizable API responses, download mock rules as a Postman collection.
    
* [APITemplate.io](http://APITemplate.io) - Auto-generate images and PDF documents with a simple API or automation tools like Zapier & Airtable. No CSS/HTML required. Free plan comes with 50 images/month and 3 templates.
    
* [APIToolkit.io](http://APIToolkit.io) - All the tools you need to fully understand what's going on in your APIs and Backends. With automatic API contract validation and monitoring. Free plan covers servers with up to 20,000 requests per month.
    
* [Arize AI](https://arize.com/) - Machine learning observability for model monitoring and root-causing issues such as data quality and performance drift. Free up to two models.
    
* [Atlas toolkit](https://atlastk.org/) - Lightweight library to develop single-page web applications that are instantly accessible. Available for Java, Node.js, Perl, Python and Ruby.
    
* [Beeceptor](https://beeceptor.com/) - Mock a rest API in seconds, fake API response and much more. Free 50 requests per day, public dashboard, open endpoints (anyone having link to the dashboard can view requests and responses).
    
* [bigml.com](http://bigml.com) — Hosted machine learning algorithms. Unlimited free tasks for development, limit of 16 MB data/task.
    
* [Bruzu](https://bruzu.com/) — Automate Image production. Generate tons of Image variants with API, Integrations or nocode sheet. API is FREE with watermark.
    
* [Calendarific](https://calendarific.com/) - Enterprise-grade Public holiday API service for over 200 countries. Free plan includes 1000 calls per month.
    
* [Clarifai](https://www.clarifai.com/) — Image API for custom face recognition and detection. Able to train AI models. Free plan has 5000 calls per month.
    
* [Cloudmersive](https://cloudmersive.com/) — Utility API platform with full access to expansive API Library including Document Conversion, Virus Scanning, and more with 800 calls/month.
    
* [Colaboratory](https://colab.research.google.com/) — Free web-based Python notebook environment with Nvidia Tesla K80 GPU.
    
* [Collect2](https://collect2.com/) — Create an API endpoint to test, automate, and connect webhooks. Free plan allows for two datasets, 2000 records, 1 forwarder, and 1 alert.
    
* [Conversion Tools](https://conversiontools.io/) - Online File Converter for documents, images, video, audio, eBooks. REST API is available. Libraries for Node.js, PHP, Python. Support files up to 50 GB (for paid plans). Free tier is limited by file size and number of conversions per day.
    
* [Coupler](https://www.coupler.io/) - Data integration tool that syncs between apps. It can create live dashboards and reports, transform and manipulate values, collect and back up insights. The free plan has unlimited users, 100 runs with 1000 rows a month and unlimited integrations.
    
* [CraftMyPDF](https://craftmypdf.com/) - Auto-Generate PDF documents from reusable templates with a drop-and-drop editor and a simple API. Free plan comes with 100 PDFs/month and 3 templates.
    
* [CurlHub](https://curlhub.io/) — Proxy service for inspecting and debugging API calls. Free plan includes 10,000 requests per month.
    
* [CurrencyScoop](https://currencyscoop.com/) - Realtime currency data API for fintech apps. Free plan includes 5000 calls per month.
    
* [Cube](https://cube.dev/) - Cube helps data engineers and application developers access data from modern data stores, organize it into consistent definitions, and deliver it to every application. The fastest way to use Cube is with Cube Cloud, which has a free-tier with 1GB of data pass through each month.
    
* [Data Fetcher](https://datafetcher.com/) - Connect Airtable to any application or API with no-code. Postman-like interface for running API requests in Airtable. Pre-built integrations with dozens of apps. The free plan includes 100 runs per month.
    
* [Dataimporter.io](http://Dataimporter.io) - Tool for connecting, cleaning, and importing data into Salesforce. Free Plan includes up to 20,000 records per month.
    
* [Datalore](https://datalore.jetbrains.com/) - Python notebooks by Jetbrains. Includes 10 GB of storage and 120 hours of runtime each month.
    
* [Data Miner](https://dataminer.io/) - A browser extension (Google Chrome, MS Edge) for data extraction from web pages CSV or Excel. The free plan gives you 500 pages/month.
    
* [Datapane](https://datapane.com/) - API for building interactive reports in Python and deploying Python scripts and Jupyter Notebooks as self-service tools.
    
* [DB-IP](https://db-ip.com/api/free) - Free IP geolocation API with 1k request per IP per day.lite database under CC-BY 4.0 License is free too.
    
* [DB Designer](https://www.dbdesigner.net/) — Cloud based Database schema design and modeling tool with a free starter plan of 2 Database models and 10 tables per model.
    
* [DeepAR](https://developer.deepar.ai/) — Augmented reality face filters for any platform with one SDK. Free plan provides up to 10 monthly active users (MAU) and tracking up to 4 faces
    
* [Deepnote](https://deepnote.com/) - A new kind of data science notebook. Jupyter-compatible with real-time collaboration and running in the cloud. Free tier includes unlimited personal projects, up to 750 hours of standard hardware and teams with up to 3 editors.
    
* [Diggernaut](https://www.diggernaut.com/) — Cloud based web scraping and data extraction platform for turning any website to the dataset or to work with it as with an API. Free plan includes 5K page requests monthly.
    
* [Disease.sh](http://Disease.sh) — A free API providing accurate data for building the Covid-19 related useful Apps.
    
* [dreamfactory.com](http://dreamfactory.com) — Open source REST API backend for mobile, web, and IoT applications. Hook up any SQL/NoSQL database, file storage system, or external service and it instantly creates a comprehensive REST API platform with live documentation, user management,...
    
* [DynamicDocs](https://advicement.io/) - Generate PDF documents with JSON to PDF API based on LaTeX templates. Free plan allows 50 API calls per month and access to a library of templates.
    
* [DynaPictures](https://dynapictures.com/) - Design automation tool which lets you dynamically generate images over REST API. Change colors, texts, logos and images on the fly. Free plan includes 30 generated images per month and 3 image templates.
    
* [Efemarai](https://efemarai.com/) - Testing and debugging platform for ML models and data. Visualize any computational graph. Free 30 debugging sessions per month for developers.
    
* [Einblick](https://www.einblick.ai/) - a modern data science platform that brings Python notebooks to a collaborative canvas and includes tools that automate common tasks such as building predictive models (AutoML) or comparing populations. Free tier includes 5 canvases and unlimited collaborators.
    
* [Exspanse](https://exspanse.com/) - MLOPS Platform to build, train and deploy ML models and AI solutions. Free plan gives ability to create unlimited projects, 5Gb of cloud storage, 5 docker container images.
    
* [ExtendsClass](https://extendsclass.com/rest-client-online.html) - Free web-based HTTP client to send HTTP requests.
    
* [Export SDK](https://exportsdk.com/) - PDF generator API with drag and drop template editor that also provides an SDK and no-code integrations. Free plan comes with 250 pages per month, unlimited users and three templates.
    
* [file.coffee](http://file.coffee) - A platform where you can store up to 15MB/file (30/MB file with an account).
    
* [Flatirons Fuse](https://flatironsdevelopment.com/products/fuse/) - An embeddable CSV and spreadsheet import tool that makes importing data to your website fast, easy, and painless.
    
* [FraudLabs Pro](https://www.fraudlabspro.com/) — Screen an order transaction for credit card payment fraud. This REST API will detect all possible fraud traits based on the input parameters of an order. Free Micro plan has 500 transactions per month.
    
* [FreeGeoIP.app](http://FreeGeoIP.app) - Completely free Geo IP information (JSON, CSV, XML). No registration required, 15000 queries per hour rate limit.
    
* [Geekflare API](https://geekflare.com/api) - Geekflare API let you take screenshots, audit websites, TLS scan, DNS lookup, test TTFB, and a lot more. The free plan offers 3000 API requests.
    
* [GeoCod](https://geocod.xyz/) — Free geocoding API: Convert postal addresses into geographic coordinates or convert geographic coordinates into postal addresses (reverse geocoding).
    
* [GeoDataSource](https://www.geodatasource.com/) — Location search service lookup for city name by using latitude and longitude coordinate. Free API queries up to 500 times per month.
    
* [Glitterly](https://glitterly.app/) - Programatically generate dynamic images from base templates. Restful API and nocode integrations. Free tier comes with 50 images/month and 5 templates.
    
* [GoodData](https://www.gooddata.com/) - Data as a Service - Create interactive and insightful dashboards. Free tier comes with 5 workspaces and 100 MB/workspace.
    
* [Hex](https://hex.tech/) - a collaborative data platform for notebooks, data apps and knowledge libraries. Free community version with up to 3 authors and 5 projects. One compute profile per author with 4GB RAM.
    
* [Hookbin](https://hookbin.com/) - Create unique (public or private) endpoints to collect, parse, and inspect HTTP requests. Inspect headers, body, query strings, cookies, uploaded files, etc. Useful for testing/inspecting webhook. Similar to RequestBin, and [Webhook.site](http://Webhook.site).
    
* [Hoppscotch](https://hoppscotch.io/) - A free, fast, and beautiful API request builder.
    
* [Hybiscus](https://hybiscus.dev/) - Build pdf reports using a simple declarative API. Free tier includes upto 100 single page reports per month with the ability to customise color pallet and fonts.
    
* [Invantive Cloud](https://cloud.invantive.com/) — Access over 70 (cloud)platforms such as Exact Online, Twinfield, ActiveCampaign or Visma using Invantive SQL or OData4 (typically Power BI or Power Query). Includes data replication and exchange. Free plan for developers and implementation consultants. Free for specific platforms with limitations in data volumes.
    
* [ipaddress.sh](http://ipaddress.sh) — Simple service to get public IP address in different [formats](https://about.ipaddress.sh/).
    
* [Iploka](https://iploka.com/) — IP to Geolocation API - Forever free plan for developers with 10k requests per month limit.
    
* [IP Geolocation](https://ipgeolocation.io/) — IP Geolocation API - Forever free plan for developers with 30k requests per month (1k/day) limit.
    
* [IP Geolocation API](https://www.abstractapi.com/ip-geolocation-api) — IP Geolocation API from Abstract - Extensive free plan allowing 20,000 requests per month.
    
* [IP2Location](https://www.ip2location.com/) — Freemium IP geolocation service. LITE database is available for free download. Import the database in server and perform local query to determine city, coordinates and ISP information.
    
* [IP2Location.io](http://IP2Location.io) — Freemium, fast and reliable IP geolocation API to determine geolocation data like city, coordinates, ISP and so on. Free plan is available with 30k credits per month. Subscribe paid plans for more advanced features or contact us for a personalized plan.
    
* [ipapi](https://ipapi.co/) - IP Address Location API by Kloudend, Inc - A reliable geolocation API, built on AWS, trusted by Fortune 500. Free tier offers 30k lookups/month (1k/day) without signup. Contact us for a higher limit trial plan.
    
* [IPinfo](https://ipinfo.io/) — Fast, accurate, and free (up to 50k/month) IP address data API. Offers APIs with details on geolocation, companies, carriers, IP ranges, domains, abuse contacts, and more. All paid APIs can be trialed for free.
    
* [IPList](https://www.iplist.cc/) — Lookup details about any IP address, such as Geo IP information, tor addresses, hostnames and ASN details. Free for personal and business users.
    
* [BigDataCloud](https://www.bigdatacloud.com/) - Provides fast, accurate and free (Unlimited or up to 10K-50K/month) APIs for modern web like IP Geolocation, Reverse Geocoding, Networking Insights, Email and Phone Validation, Client Info and more.
    
* [IPTrace](https://iptrace.io/) — An embarrassingly simple API that provides reliable and useful IP geolocation data for your business.
    
* [JSON2Video](https://json2video.com/) - A video editing API to automate video marketing and social media videos, programmatically or with no-code.
    
* [JSON IP](https://getjsonip.com/) — Returns the Public IP address of the client it is requested from. No registration required for free tier. Using CORS data can be requested using client side JS directly from browser. Useful for services monitoring change in client and server IPs. Unlimited Requests.
    
* [konghq.com](http://konghq.com) — API Marketplace and powerful tools for private and public APIs. With the free tier, some features are limited such as monitoring, alerting and support.
    
* [Kreya](https://kreya.app/) — Free gRPC GUI client to call and test gRPC APIs. Can import gRPC APIs via server reflection.
    
* [Lightly](https://www.lightly.ai/) — Improve your machine learning models by using the right data. Use datasets of up to 1'000 samples for free.
    
* [MailboxValidator](https://www.mailboxvalidator.com/) — Email verification service using real mail server connection to confirm valid email. Free API plan has 300 verifications per month.
    
* [Meteosource Weather API](https://www.meteosource.com/) — global weather API for current and forecasted weather data. Forecasts are based on a machine learning combination of more weather models to achieve better accuracy. Free plan comes with 400 calls per day.
    
* [microlink.io](http://microlink.io) – It turns any website into data such as metatags normalization, beauty link previews, scraping capabilities or screenshots as a service. 100 reqs/day every day free.
    
* [monkeylearn.com](http://monkeylearn.com) — Text analysis with machine learning, free 300 queries/month.
    
* [MockAPI](https://www.mockapi.io/) — MockAPI is a simple tool that lets you easily mock up APIs, generate custom data, and preform operations on it using RESTful interface. MockAPI is meant to be used as a prototyping/testing/learning tool. 1 project/4 resources per project for free.
    
* [Mocki](https://mocki.io/) - A tool that lets you create mock GraphQL and REST APIs synced to a GitHub repository. Simple REST APIs are free to create and use without signup.
    
* [Mocko.dev](http://Mocko.dev) — Proxy your API, choose which endpoints to mock in the cloud and inspect traffic, for free. Speed up your development and integrations tests.
    
* [Mocky](https://designer.mocky.io/) - A simple web app to generate custom HTTP responses for mocking HTTP request. Also available as [open source](https://github.com/julien-lafont/Mocky).
    
* [reqres.in](http://reqres.in) - A Free hosted REST-API ready to respond to your AJAX requests.
    
* [microenv.com](http://microenv.com) — Create fake REST API for developers with possibility to generate code and app in docker container.
    
* [neptune.ai](http://neptune.ai) - Log, store, display, organize, compare and query all your MLOps metadata. Free for individuals: 1 member, 100 GB of metadata storage, 200h of monitoring/month
    
* [News API](https://newsapi.org/) — Search news on the web with code, get JSON results. Developers get 3,000 queries free each month.
    
* [Nordigen](https://nordigen.com/) — Free open banking data API. PSD2. Connect 2300+ banks with your app/software in EU+UK.
    
* [Observable](https://observablehq.com/) — a place to create, collaborate, and learn with data. Free: Unlimited notebooks, Unlimited publishing, Five editors per notebook.
    
* [OCR.Space](http://OCR.Space) — An OCR API which parses image and pdf files returning the text results in JSON format. 25,000 requests per month free.
    
* [Duply.co](http://Duply.co) — Create dynamic images from API & URL, design template once and reuse it. Free tier offers 70 images/month creation from API & URL and Up to 100 through Form.
    
* [Frontend Zero to One](https://www.fezto.xyz/) — Launch an app immediately from your OpenAPI or Swagger spec, see how partners experience your API. Free. Paid tier for customizations and code.
    
* [OpenAPI3 Designer](https://openapidesigner.com/) — Visually create Open API 3 definitions for free.
    
* [Orchest](https://orchest.io/) — Visual pipeline editor and workflow orchestrator for data science, 1 instance for free, open source version available.
    
* [parsehub.com](http://parsehub.com) — Extract data from dynamic sites, turn dynamic websites into APIs, 5 projects free.
    
* [pdfEndpoint.com](http://pdfEndpoint.com) - Effortlessly convert html or urls to pdf wit a simple API. 100 conversions per month for free.
    
* [Pixela](https://pixe.la/) - Free daystream database service. All operations are performed by API. Visualization with heat maps and line graphs is also possible.
    
* [Postbacks](https://postbacks.io/) - Request HTTP callbacks for a later time. 8,000 free requests on signup.
    
* [Postman](https://postman.com/) — Simplify workflows and create better APIs – faster – with Postman, a collaboration platform for API development. Use the Postman App for free forever. Postman cloud features are also free forever with certain limits.
    
* [PrefectCloud](https://www.prefect.io/cloud/) — A complete platform for dataflow automation. All plans include 20,000 free runs every month. That's enough to power ETL for most small businesses.
    
* [Preset Cloud](https://preset.io/) - A hosted Apache Superset service. Forever free for teams up to 5 users, featuring unlimited dashboards and charts, no-code chart builder and a collaborative SQL editor.
    
* [PromptLeo](https://promptleo.com/) - Prompt engineering platform for creators and developers. It offers prompt engineering library, prompt forms and prompt engineering API. Free plan provides 1 prompt form, 1 prompt API endpoint and 30 generations per month.
    
* [PromptLoop](https://www.promptloop.com/) - Use AI and large language models like GPT-3 with a single simple spreadsheet formula to tranform, comprehend, and analyze text in Google Sheets. First 2,000 credits free each month.
    
* [ProxyCrawl](https://proxycrawl.com/) — Crawl and scrape websites without the need of proxies, infrastructure or browsers. We solve captchas for you and prevent you being blocked. The first 1000 calls are free of charge.
    
* [Public-Apis Github Repo](https://github.com/public-apis/public-apis) — A list of free public APIs.
    
* [Supportivekoala](https://supportivekoala.com/) — Allows you to autogenerate images by your input via templates. Free plan allows you to create up to 100 images per week.
    
* [QuickMocker](https://quickmocker.com/) — Manage online fake API endpoints under your own subdomain, forward requests to [localhost](http://localhost) URL for webhooks development and testing, use RegExp and multiple HTTP methods for URL path, prioritize endpoints, more than 100 shortcodes (dynamic or fake response values) for response templating, import from OpenAPI (Swagger) Specifications in JSON format, proxy requests, restrict endpoint by IP address and authorization header. Free account provides 1 random subdomain, 10 endpoints, 5 RegExp URL paths, 50 shortcodes per endpoint, 100 requests per day, 50 history records in requests log.
    
* [Rapidapi](https://rapidapi.com/) - World’s Largest API Hub Millions of developers find and connect to thousands of APIs, API Development using fun challenges (with solutions!) and interactive examples.
    
* [RequestBin.com](http://RequestBin.com) — Create a free endpoint to which you can send HTTP requests. Any HTTP requests sent to that endpoint will be recorded with the associated payload and headers so you can observe requests from webhooks and other services.
    
* [restlet.com](http://restlet.com) — APISpark enables any API, application or data owner to become an API provider in minutes via an intuitive browser interface.
    
* [Roboflow](https://roboflow.com/) - create and deploy a custom computer vision model with no prior machine learning experience required. Free tier includes up to 1,000 free source images.
    
* [ROBOHASH](https://robohash.org/) - Web service to generate unique (cool :) images from any text.
    
* [SaturnCloud](https://saturncloud.io/) - Data science cloud environment, that allows to run Jupyter notebooks and Dask clusters. 30 hours free computation and 3 hours of Dask per month.
    
* [Scraper's Proxy](https://scrapersproxy.com/) — Simple HTTP proxy API made for scraping. Scrape anonymously without having to worry about restrictions, blocks or captchas. First 100 successfully scrape's per month free including javascript rendering (more available if you contact support).
    
* [ScrapingAnt](https://scrapingant.com/) — Headless Chrome scraping API and free checked proxies service. Javascript rendering, premium rotating proxies, CAPTCHAs avoiding. Free plans available.
    
* [ScraperBox](https://scraperbox.com/) — Undetectable web scraping API using real Chrome browsers and proxy rotation. Use a simple API call to scrape any web page. Free plan has 1000 requests per month.
    
* [ScrapingDog](https://scrapingdog.com/) — Scrapingdog handles millions of proxies, browsers and CAPTCHAs to provide you with HTML of any web page in a single API call. It also provides Web Scraper for Chrome & Firefox and a software for instant scraping demand. Free plans available.
    
* [scrapinghub.com](http://scrapinghub.com) — Data scraping with visual interface and plugins. Free plan includes unlimited scraping on a shared server.
    
* [Select Star](https://www.selectstar.com/) - is an intelligent data discovery platform that automatically analyzes and documents your data. Free light tier with 1 Data Source, up to 100 Tables and up to 10 Users.
    
* [Sheetson](https://sheetson.com/) - Instantly turn any Google Sheets into RESTful API. Free plan available.
    
* [Shipyard](https://www.shipyardapp.com/) — Low-code data orchestration platform for the cloud. Build with a mix of low-code templates and your code (Python, Node.js, Bash, SQL). Our free developer plan offers 10 hours of runtime every month for one user - more than enough to automate multiple workflows.
    
* [shrtcode API](https://shrtco.de/docs) - Free URL Shortening API without authorization and no request limits.
    
* [SerpApi](https://serpapi.com/) - Real-time search engine scraping API. Returns structured JSON results for Google, Youtube, Bing, Baidu, Walmart and many other engines. Free plan includes 100 successful API calls per month.
    
* [Similar Words API](https://word-simi.herokuapp.com/) — An API to find similar words, has vocabulary of about 4Million words.
    
* [Sofodata](https://www.sofodata.com/) - Create secure RESTful APIs from CSV files. Upload a CSV file and instantly access the data via its API allowing faster application development. Free plan includes 2 APIs and 2,500 API calls per month. No credit card required.
    
* [Stoplight](https://stoplight.io/) - Saas for collaborativly designing and documenting for APIs. The free plan offers free design, mocking and documentation tools to get started.
    
* [Svix](https://www.svix.com/) - Webhooks as a Service. Send up to 50,000 messages/month for free.
    
* [TemplateTo](https://templateto.com/) - Auto-Generate PDF/TXT documents from reusable templates with our drop-and-drop editor and simple API. Free plan comes with 450 PDFs/month and 3 templates.
    
* [TinyMCE](https://www.tiny.cloud/) - rich text editing API. Core features free for unlimited usage.
    
* [Unixtime](https://unixtime.co.za/) - Free API to convert Unixtime to DateTime and vice versa.
    
* [Webhook Store](https://www.openwebhook.io/) - Tool for storing third party webhooks and debug them on [localhost](http://localhost) (ngrok style). Open source and self-hostable. Free personal domain [*username*.github.webhook.store](http://username.github.webhook.store), free public domains [*anything*.webhook.store](http://anything.webhook.store).
    
* [Weights & Biases](https://wandb.ai/) — The developer-first MLOps platform. Build better models faster with experiment tracking, dataset versioning, and model management. Free tier for personal projects only, with 100 GB of storage included.
    
* [wit.ai](http://wit.ai) — NLP for developers.
    
* [wolfram.com](http://wolfram.com) — Built-in knowledge-based algorithms in the cloud.
    
* [wrapapi.com](http://wrapapi.com) — Turn any website into a parameterized API. 30k API calls per month.
    
* [ZenRows](https://www.zenrows.com/) — Web Scraping API & proxy server that bypasses any anti-bot solution while offering javascript rendering, rotating proxies, and geotargeting. Free tier of 1000 API calls.
    
* [Zenscrape](https://zenscrape.com/web-scraping-api) — Web scraping API with headless browsers, residentials IPs and simple pricing. 1000 free API calls/month, extra free credits for students and non-profits.
    
* [ip-api](https://ip-api.com/) — IP Geolocation API, Free for non-commercial use, no API key required, limited to 45 req/minute from the same IP address for the free plan.
    
* [WebScraping.AI](http://WebScraping.AI) - Simple Web Scraping API with built-in parsing, Chrome rendering and proxies. 2000 free API calls per month.
    
* [Zipcodebase](https://zipcodebase.com/) - Free Zip Code API, access to Worldwide Postal Code Data. 10000 free requests/month.
    
* [happi.dev](http://happi.dev) - Freemium api services collection (Music, Exchange Rate, Key value store, Language Detection, Password Generator, QRCode Generator, Lyrics). 4000 free API calls per month.
    
* [huggingface.co](http://huggingface.co) - Build, train and deploy NLP models for Pytorch, TensorFlow, and JAX. Free up to 30k input characters/mo.
    
* [vatcheckapi.com](http://vatcheckapi.com) - Simple and free VAT number validation API. 500 free requests per month.
    
* [numlookupapi.com](http://numlookupapi.com) - Free phone number validation API - 100k free requests / month.
    
* [Volca](https://volca.io/#api) - Free API providing lists of technologies such as programming languages and database systems. Unlimited free requests.
    
* [Query.me](http://Query.me) - Collaborative data notebooks that execute in a script-like fashion and allow to fetch and send data via SQL, API, and a growing number custom blocks, like Slack and Email. Free for small Teams.
    
* [ERD Lab](https://www.erdlab.io/) — Free cloud based entity relationship diagram (ERD) tool made for developers.
    
* [What The Diff](https://whatthediff.ai/) - AI-powered code review assistant. The free plan has a limit of 25,000 tokens per month (~10 PRs).
    
* [Zipcodestack](https://zipcodestack.com/) - Free Zip Code API and Postal Code Validation. 10000 free requests/month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Artifact Repos

* [Artifactory](https://jfrog.com/start-free/) - An artifact repository that supports numerous package formats like Maven, Docker, Cargo, Helm, PyPI, CocoaPods, and GitLFS. Incudes package scanning tool XRay and CI/CD tool Pipelines (formerly Shippable) with a free tier of 2,000 CI/CD minutes per month.
    
* [central.sonatype.org](http://central.sonatype.org) — The default artifact repository for Apache Maven, SBT and other build systems.
    
* [cloudrepo.io](http://cloudrepo.io) - Cloud based, private and public, Maven and PyPi repositories. Free for open source projects.
    
* [cloudsmith.io](http://cloudsmith.io) — Simple, secure and centralised repository service for Java/Maven, RedHat, Debian, Python, Ruby, Vagrant +more. Free tier + free for open source.
    
* [jitpack.io](http://jitpack.io) — Maven repository for JVM and Android projects on GitHub, free for public projects.
    
* [packagecloud.io](http://packagecloud.io) — Easy to use repository hosting for: Maven, RPM, DEB, PyPi, NPM, and RubyGem packages (has free tier).
    
* [repsy.io](http://repsy.io) — 1 GB Free private/public Maven Repository.
    
* [Gemfury](https://gemfury.com/) — Private and public artifact repos for Maven, PyPi, NPM, Go Module, Nuget, APT, RPM repositories. Free for public projects.
    
* [paperspace](https://www.paperspace.com/) — Build & scale AI models, Develop, train, and deploy AI applications, free plan: public projects, 5Gb storage, basic instances.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Tools for Teams and Collaboration

* [3Cols](https://3cols.com/) - A free cloud based code snippet manager for personal and collaborative code.
    
* [Bitwarden](https://bitwarden.com/) — The easiest and safest way for individuals, teams, and business organizations to store, share, and sync sensitive data.
    
* [Braid](https://www.braidchat.com/) — Chat app designed for teams. Free for public access group, unlimited users, history, and integrations. also it provide self-hostable open-source version.
    
* [cally.com](http://cally.com) — Find the perfect time and date for a meeting. Simple to use, works great for small and large groups.
    
* [Calendly](https://calendly.com/) — Calendly is the tool for connecting and scheduling meetings. Free plan provides 1 Calendar connection per user and Unlimited meetings. Desktop and Mobile apps also provided.
    
* [Discord](https://discord.com/) — Chat with public/private rooms. Markdown text, voice, video, and screen sharing capabilities. Free for unlimited users.
    
* [Telegram](https://telegram.org/) — Telegram is for everyone who wants fast and reliable messaging and calls. Business users and small teams may like the large groups, usernames, desktop apps and powerful file sharing options.
    
* [Duckly](https://duckly.com/) — Talk and collaborate in real-time with your team. Pair programming with any IDE, terminal sharing, voice, video and screen sharing. Free for small teams.
    
* [Dyte](https://dyte.io/) - The most developer-friendly live video & audio SDK, featuring collaborative plugins to enhance productivity and engagement. The free tier includes 10,000 minutes of live video/audio usage every month.
    
* [evernote.com](http://evernote.com) — Tool for organizing information. Share your notes and work together with others
    
* [Fibery](https://fibery.io/) — Connected workspace platform. Free for single user, up to 2 GB disk space.
    
* [Filestash](https://www.filestash.app/) — A Dropbox-like file manager that connects to a range of protocols and platforms: S3, FTP, SFTP, Minio, Git, WebDAV, Backblaze, LDAP and more.
    
* [flock.com](http://flock.com) — A faster way for your team to communicate. Free Unlimited Messages, Channels, Users, Apps & Integrations
    
* [Gather](https://www.gather.town/) - A better way to meet online. Centered around fully customizable spaces, Gather makes spending time with your communities just as easy as real life. Free for up to 25 concurrent users.
    
* [gokanban.io](http://gokanban.io) - Syntax based, no registration Kanban Board for fast use. Free with no limitations.
    
* [flat.social](http://flat.social) - Interactive customizable spaces for team meetings & happy hours socials. Unlimited meetings, free up to 8 concurrent users.
    
* [GitDailies](https://gitdailies.com/) - Daily reports of your team's Commit and Pull Request activity on GitHub. Includes Push visualizer, peer recognition system, custom alert builder. Free tier has unlimited users, 3 repos, 3 alert configs.
    
* [gitter.im](http://gitter.im) — Chat, for GitHub. Unlimited public and private rooms, free for teams up to 25
    
* [Hackmd.io](http://Hackmd.io) - Real time collaboration & writing tool for markdown format docs/files. Like GoogleDocs but for markdown files. Free unlimited number of "notes", but number of collaborators (invitee) for private notes & template [will be limited](https://hackmd.io/pricing).
    
* [hangouts.google.com](http://hangouts.google.com) — One place for all your conversations, for free, need a Google account
    
* [HeySpace](https://hey.space/) - Task management tool with chat, calendar, timeline and video calls. Free for up to 5 users.
    
* [helplightning.com](http://helplightning.com) — Help over video with augmented reality. Free without analytics, encryption, support
    
* [ideascale.com](http://ideascale.com) — Allow clients to submit ideas and vote, free for 25 members in 1 community
    
* [Igloo](https://www.igloosoftware.com/) — Internal portal for sharing documents, blogs and calendars etc. Free for up to 10 users.
    
* [Keybase](https://keybase.io/) — Keybase is a cool FOSS alternative to Slack, it keeps everyone's chats and files safe, from families to communities to companies.
    
* [Google Meet](https://meet.google.com/) — Use Google Meet for your business's online video meeting needs. Meet provides secure, easy-to-join online meetings.
    
* [/meet for Slack](https://meetslack.com/) - Start Google Meetings directly from Slack by using /meet in any channel, group or DM. Free without any limitations.
    
* [Livecycle](https://www.livecycle.io/) — Livecycle is an inclusive collaboration platform that makes workflows frictionless for cross-functional product teams and open source projects.
    
* [MarkUp](https://www.markup.io/) — MarkUp lets you collect feedback directly on top of your websites, PDFs and images.
    
* [Visual Debug](https://visualdebug.com/) - A Visual feedback tool for better client-dev communication
    
* [meet.jit.si](http://meet.jit.si) — One click video conversations, screen sharing, for free
    
* [Microsoft Teams](https://products.office.com/microsoft-teams/free) — Microsoft Teams is a chat-based digital hub that brings conversations, content, and apps together in one place all from a single experience. Free for up to 500k users.
    
* [Miro](https://miro.com/) - Scalable, secure, cross-device and enterprise-ready team collaboration whiteboard for distributed teams. With freemium plan.
    
* [nootiz](https://www.nootiz.com/) - The go-to tool for gathering and managing visual feedback on any website
    
* [Notion](https://www.notion.so/) - Notion is a note-taking and collaboration application with markdown support that also integrates tasks, wikis, and databases. The company describes the app as an all-in-one workspace for note-taking, project management and task management. In addition to cross-platform apps, it can be accessed via most web browsers.
    
* [Nuclino](https://www.nuclino.com/) - A lightweight and collaborative wiki for all your team's knowledge, docs, and notes. Free plan with all essential features, up to 50 items, 5GB total storage.
    
* [Quidlo Timesheets](https://www.quidlo.com/timesheets) - A simple timesheet and time tracking app for teams. Free plan has time tracking and generating reports features, it is available for up to 10 users.
    
* [PageShare.dev](http://PageShare.dev) - Adds visual reviews capabilities into GitHub Pull Requests with no need to deploy websites. Free for up to 10 pages each month and 100MB of storage in total.
    
* [Pendulums](https://pendulums.io/) - Pendulums is a free time tracking tool which helps you to manage your time in a better manner with an easy to use interface and useful statistics.
    
* [Pumble](https://pumble.com/) - Free team chat app. Unlimited users and message history, free forever.
    
* [Raindrop.io](http://Raindrop.io) - Private and secure bookmarking app for macOS, Windows, Android, iOS and Web. Free Unlimited Bookmarks and Collaboration.
    
* [element.io](http://element.io) — A decentralized and open source communication tool built on Matrix. Group chats, direct messaging, encrypted file transfers, voice and video chats, and easy integration with other services.
    
* [Rocket.Chat](http://Rocket.Chat) - Open-source communication platform with Omnichannel features, Matrix Federation, Bridge with others apps, Unlimited messaging and Full messaging history.
    
* [seafile.com](http://seafile.com) — Private or cloud storage, file sharing, sync, discussions. Private version is full. Cloud version has just 1 GB
    
* [Sema](https://www.semasoftware.com/) - Free developer portfolio tool able to consolidate and snapshot contributions across multiple repositories into a single report.
    
* [Slab](https://slab.com/) — A modern knowledge management service for teams. Free for up to 10 users.
    
* [slack.com](http://slack.com) — Free for unlimited users with some feature limitations
    
* [Spectrum](https://spectrum.chat/) - Create public or private communities for free.
    
* [StatusPile](https://www.statuspile.com/) - A status page of status pages. Track the status pages of your upstream providers.
    
* [Stickies](https://stickies.app/) - Visual collaboration app used for brainstorming, content curation, and notes. Free for up to 3 Walls, unlimited users, 1 GB storage.
    
* [talky.io](http://talky.io) — Free group video chat. Anonymous. Peer‑to‑peer. No plugins, signup, or payment required
    
* [Teamhood](https://teamhood.com/) - Free Project, Task and Issue tracking software. Supports Kanban with Swimlanes and full Scrum implementation. Has integrated time tracking. Free for 5 users and 3 project portfolios.
    
* [Teamplify](https://teamplify.com/) - improve team development processes with Team Analytics and Smart Daily Standup. Includes full-featured Time Off management for remote-first teams. Free for small teams up to 5 users.
    
* [Tefter](https://tefter.io/) - Bookmarking app with a powerful Slack integration. Free for open-source teams.
    
* [TeleType](https://teletype.oorja.io/) — share terminals, voice, code, whiteboard and more. no sign-in required, end-to-end encrypted collaboration for developers.
    
* [TimeCamp](https://www.timecamp.com/) - Free time tracking software for unlimited users. Easily integrates with PM tools like Jira, Trello, Asana, etc.
    
* [twist.com](http://twist.com) — An asynchronous-friendly team communication app where conversations stay organized and on-topic. Free and Unlimited plans available. Discounts provided for eligible teams.
    
* [tldraw.com](http://tldraw.com) — Free open source white-boarding and diagramming tool with features such as smart arrows, snapping, sticky notes, and SVG export. Multiplayer mode for collaborative editing. Free official VS Code extension available as well.
    
* [BookmarkOS.com](http://BookmarkOS.com) - Free all-on-one bookmark manager, tab manager, and task manager in a customizable online desktop with folder collaboration.
    
* [typetalk.com](http://typetalk.com) — Share and discuss ideas with your team through instant messaging on the web or on your mobile
    
* [Tugboat](https://tugboat.qa/) - Preview every pull request, automated and on-demand. Free for all, complimentary Nano tier for non-profits.
    
* [whereby.com](http://whereby.com) — One click video conversations, for free (formerly known as [appear.in](http://appear.in))
    
* [windmill.dev](http://windmill.dev) - Windmill is an open-source developer platform to quickly build production-grade multi-steps automations and internal apps from minimal Python and Typescript scripts. Free user you can create and be member of at most 3 non-premium workspaces.
    
* [vadoo.tv](http://vadoo.tv) — Video hosting and marketing made simple. Upload videos with a single click. Record, manage, share & more. Free tier provides upto 10 videos, 1 GB storage, 10 GB bandwidth/month
    
* [vspace](https://vvv.space/) — Free links manager with private/public spaces, includes slack and google docs integration and chrome plugin.
    
* [userforge.com](http://userforge.com) - Interconnected online personas, user stories and context mapping. Helps keep design and dev in sync, free for up to 3 personas and 2 collaborators.
    
* [wistia.com](http://wistia.com) — Video hosting with viewer analytics, HD video delivery and marketing tools to help understand your visitors, 25 videos and Wistia branded player
    
* [wormhol.org](http://wormhol.org) — Straightforward file sharing service. Share unlimited files up to 5GB to as many peers as you want.
    
* [zoom.us](http://zoom.us) — Secure Video and Web conferencing, add-ons available. Free limited to 40 minutes
    
* [shtab.app](http://shtab.app) - Project management service that makes collaboration in the office and remotely transparent with tracker based on AI.
    
* [Zulip](https://zulip.com/) — Real-time chat with unique email-like threading model. Free plan includes 10,000 messages of search history and File storage up to 5 GB. also it provides self-hostable open-source version.
    
* [robocorp.com](http://robocorp.com) - Open-source stack for powering Automation Ops. Try out Cloud features and implement simple automations for free. Robot work 240 min/month, 10 Assistant runs, Storage of 100 MB.
    
* [Fleep.io](http://Fleep.io) — Fleep an alternative to Slack. It has a free plan for small teams with full message history, unlimited 1:1 conversations, 1 group conversation and 1 GB file storage.
    
* [Chanty.com](http://Chanty.com) — Chanty is another alternative to Slack. It has a free forever plan for small teams (up to 10) with unlimited public and private conversations, searchable history, unlimited 1:1 audio calls, unlimited voice messages, 10 integrations and 20 GB storage per team.
    
* [ruttl.com](http://ruttl.com) — The best all-in-one feedback tool to collect digital feedback and review websites, PDF's and images.
    
* [Mattermost](https://mattermost.com/) — Secure collaboration for technical teams. Free plan with unlimited channels, playbooks, boards, users, 10GB storage and more.
    
* [Webvizio](https://webvizio.com/) — Website feedback tool, website review software, and bug reporting tool for streamlining web development collaboration on tasks directly on live websites and web apps, images, PDFs, and design files.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## CMS

* [acquia.com](http://acquia.com) — Hosting for Drupal sites. Free tier for developers. Free development tools (such as Acquia Dev Desktop) also available
    
* [Contentful](https://www.contentful.com/) — Headless CMS. Content management and delivery APIs in the cloud. Comes with one free Community space that includes 5 users, 25K records, 48 Content Types, 2 locales.
    
* [Cosmic](https://www.cosmicjs.com/) — Headless CMS and API toolkit. Free personal plans for developers.
    
* [Crystallize](https://crystallize.com/) — Headless PIM with ecommerce support. Built-in GraphQL API. Free version includes unlimited users, 1000 catalogue items, 5 GB/month bandwidth and 25k/month API calls.
    
* [DatoCMS](https://www.datocms.com/) - Offers free tier for small projects. DatoCMS is a GraphQL based CMS. On the lower tier you have 100k/month calls.
    
* [Directus](https://directus.io/) — Headless CMS. A completely free and open-source platform for managing assets and database content on-prem or in the Cloud. No limitations or paywalls.
    
* [Forestry.io](http://Forestry.io) — Headless CMS. Give your editors the power of Git. Create and edit Markdown-based content with ease. Comes with three free sites that includes 3 editors, Instant Previews. Integrates with blogs hosted on Netlify/GitHubpages/ elsewhere
    
* [FrontAid](https://frontaid.io/) — Headless CMS that stores JSON content directly in your own Git repository. No restrictions.
    
* [kontent.ai](http://kontent.ai) - A Content-as-a-Service platform that gives you all the headless CMS benefits while empowering marketers at the same time. Developer plan provides 2 users with unlimited projects with 2 environments for each, 500 content items, 2 languages with Delivery and Management API, and Custom elements support. Larger plans available to meet your needs.
    
* [Prismic](https://www.prismic.io/) — Headless CMS. Content management interface with fully hosted and scalable API. The Community Plan provides 1 user with unlimited API calls, documents, custom types, assets, and locales. Everything that you need for your next project. Bigger free plans available for Open Content/Open Source projects.
    
* [Sanity.io](http://Sanity.io) - Platform for structured content that comes with an open-source editing environment and a real-time hosted data store. Unlimited projects. Unlimited admin users, 3 non-admin users, 2 datasets, 500K API CDN requests, 10GB bandwidth, 5GB assets included for free per project.
    
* [sensenet](https://sensenet.com/) - API-first headless CMS providing enterprise-grade solutions for businesses of all size. The Developer plan provides 3 users, 500 content items, 3 built-in roles, 25+5 content types, fully accessible REST API, document preview generation and Office Online editing.
    
* [GatsbyjsCMS](https://www.gatsbyjs.com/) - Gatsby is the fast and flexible framework that makes building websites with any CMS, API, or database fun again. Build and deploy headless websites that drive more traffic, convert better, and earn more revenue!
    
* [Hygraph](https://hygraph.com/) - Offers free tier for small projects. GraphQL first API. Move away from legacy solutions to the GraphQL native Headless CMS - and deliver omnichannel content API first.
    
* [Squidex](https://squidex.io/) - Offers free tier for small projects. API / GraphQL first. Open source, and based on event sourcing (versing every changes automatically).
    
* [InstaWP](https://instawp.com/) - Launch a WordPress site in a few seconds. A free tier with: 5 Active Sites, 500 MB Space, 48 hrs Site Expiry.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Code Generation

* [DhiWise](https://www.dhiwise.com/) — Seamlessly turn Figma designs into dynamic Flutter & React applications with DhiWise's innovative code generation technology, optimizing your workflow and helping you craft exceptional mobile and web experiences faster than ever before.
    
* [Codeium](https://www.codeium.com/) — Codeium is a free AI-powered code completion tool. It supports over 20+ programming languages (Python, JavaScript, Java, TypeScript, PHP, C/C++, Go, etc) and integrates with all major standalone and web IDEs.
    
* [tabnine.com](http://tabnine.com) — Tabnine helps developers create better software, faster by providing insights learned from all the code in the world. Plugin available.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Code Quality

* [beanstalkapp.com](http://beanstalkapp.com) — A complete workflow to write, review and deploy code), free account for 1 user and 1 repository with 100 MB of storage
    
* [browserling.com](http://browserling.com) — Live interactive cross-browser testing, free only 3 minutes sessions with MS IE 9 under Vista at 1024 x 768 resolution
    
* [codacy.com](http://codacy.com) — Automated code reviews for PHP, Python, Ruby, Java, JavaScript, Scala, CSS and CoffeeScript, free for unlimited public and private repositories
    
* [Codeac.io](http://Codeac.io) - Automated Infrastructure as Code review tool for DevOps integrates with GitHub, Bitbucket and GitLab (even self-hosted). In addition to standard languages, it analyzes also Ansible, Terraform, CloudFormation, Kubernetes, and more. (open-source free)
    
* [CodeBeat](https://codebeat.co/) — Automated Code Review Platform available for many languages. Free forever for public repositories with Slack & E-mail integration.
    
* [codeclimate.com](http://codeclimate.com) — Automated code review, free for Open Source and unlimited organisation-owned private repos (up to 4 collaborators). Also free for students and institutions.
    
* [codecov.io](http://codecov.io) — Code coverage tool (SaaS), free for Open Source and 1 free private repo
    
* [CodeFactor](https://www.codefactor.io/) — Automated Code Review for Git. Free version includes unlimited users, unlimited public repositories and 1 private repo.
    
* [codescene.io](http://codescene.io) - CodeScene prioritizes technical debt based on how the developers work with the code and visualizes organizational factors like team coupling and system mastery. Free for Open Source.
    
* [coveralls.io](http://coveralls.io) — Display test coverage reports, free for Open Source
    
* [dareboost](https://dareboost.com/) - 5 free analysis report for web performance, accessibility, security each month
    
* [deepcode.ai](http://deepcode.ai) — DeepCode finds bugs, security vulnerabilities, performance and API issues based on AI. DeepCode's speed of analysis allow us to analyse your code in real time and deliver results when you hit the save button in your IDE. Supported languages are Java, C/C++, JavaScript, Python, and TypeScript. Integrations with GitHub, BitBucket and GitLab. Free for open source and private repos, free up to 30 developers.
    
* [deepscan.io](http://deepscan.io) — Advanced static analysis for automatically finding runtime errors in JavaScript code, free for Open Source
    
* [DeepSource](https://deepsource.io/) - DeepSource continuously analyzes source code changes, finds and fixes issues categorized under security, performance, anti-patterns, bug-risks, documentation and style. Native integration with GitHub, GitLab and Bitbucket.
    
* [eversql.com](http://eversql.com) — EverSQL - The #1 platform for database optimization. Gain critical insights into your database and SQL queries, auto-magically.
    
* [gerrithub.io](http://gerrithub.io) — Gerrit code review for GitHub repositories for free
    
* [gocover.io](http://gocover.io) — Code coverage for any [Go](https://golang.org/) package
    
* [goreportcard.com](http://goreportcard.com) — Code Quality for Go projects, free for Open Source
    
* [gtmetrix.com](http://gtmetrix.com) — Reports and thorough recommendations to optimize websites
    
* [holistic.dev](http://holistic.dev) - The #1 static code analyzer for Postgresql optimization. Performance, security, and architect database issues automatic detection service
    
* [houndci.com](http://houndci.com) — Comments on GitHub commits about code quality, free for Open Source
    
* [lgtm.com](http://lgtm.com) — Continuous security analysis for Java, Python, JavaScript, TypeScript, C#, C and C++, free for Open Source
    
* [Moderne.io](http://Moderne.io) — Automatic source code refactoring. Moderne offers framework migrations, code analysis with remediation, and unrivaled code transformation at scale, so developers can spend their time building new things instead of maintaining the old. Free for Open Source.
    
* [reviewable.io](http://reviewable.io) — Code review for GitHub repositories, free for public or personal repos
    
* [parsers.dev](http://parsers.dev) - Abstract syntax tree parsers and intermediate representation compilers as a service
    
* [scan.coverity.com](http://scan.coverity.com) — Static code analysis for Java, C/C++, C# and JavaScript, free for Open Source
    
* [scrutinizer-ci.com](http://scrutinizer-ci.com) — Continuous inspection platform, free for Open Source
    
* [shields.io](http://shields.io) — Quality metadata badges for open source projects
    
* [Sider](https://sider.review/) — Code review platform for many languages. Supports integration with GitHub. Free for public repositories with unlimited users.
    
* [sonarcloud.io](http://sonarcloud.io) — Automated source code analysis for Java, JavaScript, C/C++, C#, [VB.NET](http://VB.NET), PHP, Objective-C, Swift, Python, Groovy and even more languages, free for Open Source
    
* [SourceLevel](https://sourcelevel.io/) — Automated Code Review and Team Analytics. Free for Open Source and organizations up to 5 collaborators.
    
* [Viezly](https://viezly.com/) - Enhanced code review tool for easier code reading and navigation. Free for Open Source and free for personal usage.
    
* [webceo.com](http://webceo.com) — SEO tools but with also code verifications and different type of advices
    
* [zoompf.com](http://zoompf.com) — Fix the performance of your web sites, detailed analysis
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Code Search and Browsing

* [libraries.io](http://libraries.io) — Search and dependency update notifications for 32 different package managers, free for open source
    
* [Namae](https://namae.dev/) - Search across various websites like github,gitlab,heroku,netlify and many more for availabilty of your project name.
    
* [searchcode.com](http://searchcode.com) — Comprehensive text-based code search, free for Open Source
    
* [sourcegraph.com](http://sourcegraph.com) — Java, Go, Python, Node.js, etc., code search/cross-references, free for Open Source
    
* [tickgit.com](http://tickgit.com) — Surfaces `TODO` comments (and other markers) to identify areas of code worth returning to for improvement.
    
* [CodeKeep](https://codekeep.io/) - Google Keep for Code Snippets. Organize,Discover and share code snippets, featuring a powerful code screenshot tool with preset templates and linking feature.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## CI and CD

* [AccessLint](https://github.com/marketplace/accesslint) — AccessLint brings automated web accessibility testing into your development workflow. It's free for open source and education purposes.
    
* [appcircle.io](http://appcircle.io) — Automated mobile CI/CD/CT for iOS and Android with online device emulators. 20 minutes build timeout (60 mins for Open Source) with single concurrency for free.
    
* [appveyor.com](http://appveyor.com) — CD service for Windows, free for Open Source
    
* [Argonaut](https://argonaut.dev/) - Deploy apps and infrastructure on your cloud in minutes. Support for custom and third-party app deployments on Kubernetes and Lambda environments. Free tier allows unlimited apps and deployments for 5 environments and 2 users.
    
* [bitrise.io](http://bitrise.io) — A CI/CD for mobile apps, native or hybrid. With 200 free builds/month 10 min build time and two team members. OSS projects get 45 min build time, +1 concurrency and unlimited team size.
    
* [buddy.works](http://buddy.works) — A CI/CD with 5 free projects and 1 concurrent runs (120 executions/month)
    
* [buddybuild.com](http://buddybuild.com) — Build, deploy and gather feedback for your iOS and Android apps in one seamless, iterative system
    
* [Buildkite](https://buildkite.com/)
    
    * Pipelines: Free developer tier includes unlimited concurrency, up to 3 users, 5k job minutes/month, and 30 day build retention, with more free inclusions for open source projects
        
    * [Test Analytics](https://buildkite.com/test-analytics) — Get more out of your test suites, works with any CI platform. Free developer tier includes 100k test executions/month, with more free inclusions for open source projects.
        
* [circleci.com](http://circleci.com) — Free for one concurrent build
    
* [cirrus-ci.org](http://cirrus-ci.org) - Free for public GitHub repositories
    
* [codefresh.io](http://codefresh.io) — Free-for-Life plan: 1 build, 1 environment, shared servers, unlimited public repos
    
* [codemagic.io](http://codemagic.io) - Free 500 build minutes/month
    
* [codeship.com](http://codeship.com) — 100 private builds/month, 5 private projects, unlimited for Open Source
    
* [deploybot.com](http://deploybot.com) — 1 repository with 10 deployments, free for Open Source
    
* [deployhq.com](http://deployhq.com) — 1 project with 10 daily deployments (30 build minutes/month)
    
* [drone](https://cloud.drone.io/) - Drone Cloud enables developers to run Continuous Delivery pipelines across multiple architectures - including x86 and Arm (both 32 bit and 64 bit) - all in one place
    
* [LayerCI](https://layerci.com/) — CI for full stack projects. 1 full stack preview environment with 5GB memory & 3 CPUs .
    
* [semaphoreci.com](http://semaphoreci.com) — Free for Open Source, 100 private builds per month
    
* [Squash Labs](https://www.squash.io/) — creates a VM for each branch and makes your app available from a unique URL, Unlimited public & private repos, Up to 2 GB VM Sizes.
    
* [styleci.io](http://styleci.io) — Public GitHub repositories only
    
* [Mergify](https://mergify.io/) — workflow automation and merge queue for GitHub — Free for public GitHub repositories
    
* [Make](https://www.make.com/en) — Workflow automation tool which lets you connect apps and automate workflows using UI, it supports many apps and most popular APIs. Free for public GitHub repositories, and free tier with 100 Mb, 1000 Operations and 15 minutes of minimum interval.
    
* [Spacelift](https://spacelift.io/) - Management platform for Infrastructure as Code. Free plan features: IaC collaboration, Terraform module registry, ChatOps integration, Continuous resource compliance with Open Policy Agent, SSO with SAML 2.0 and access to public worker pools: up to 200 minutes/month
    
* [microtica.com](http://microtica.com) - Spin up environments with ready-made infrastructure components, deploy apps on AWS for free and support your production workloads. The free tier includes 1 Environment (on your AWS account), 2 Kubernetes Services, 100 build minutes per month, and 20 deployments per month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Testing

* [Applitools.com](http://Applitools.com) — Smart visual validation for web, native mobile and desktop apps. Integrates with almost all automation solutions (like Selenium and Karma) and remote runners (Sauce Labs, Browser Stack). free for open source. A free tier for a single user with limited checkpoints per week.
    
* [Appetize](https://appetize.io/) — Test your Android & iOS apps on this Cloud Based Android Phone/Tablets emulators and iPhone/iPad simulators directly in your browser. Free tier includes 1 concurrent session with 100 minutes usage per month. No limit on app size.
    
* [Bencher](https://bencher.dev/) - A suite of continuous benchmarking tools designed to catch performance regressions in CI. Free for all public projects.
    
* [Bird Eats Bug](https://www.birdeatsbug.com/) — Report bugs faster (and better). Record your screen with Bird browser extension, it will auto-capture technical data that engineers need to debug. Free tier suitable for small teams.
    
* [BugBug](https://bugbug.io/) - Lightweight test automation tool for web applications. Easy to learn and doesn't require coding. You can run unlimited tests on your own computer for free. For an additional monthly fee, you also get cloud monitoring and CI/CD integration.
    
* [lambdatest.com](http://lambdatest.com) — Manual, visual, screenshot and automated browser testing on selenium and cypress, [free for Open Source](https://www.lambdatest.com/open-source-cross-browser-testing-tool)
    
* [browserstack.com](http://browserstack.com) — Manual and automated browser testing, [free for Open Source](https://www.browserstack.com/open-source?ref=pricing)
    
* [checkbot.io](http://checkbot.io) — Browser extension that tests if your website follows 50+ SEO, speed and security best practices. Free tier for smaller websites.
    
* [checklyhq.com](http://checklyhq.com) - Checkly is the API & E2E monitoring platform for the modern stack: programmable, flexible and loving JavaScript. Generous free tier for devs.
    
* [crossbrowsertesting.com](http://crossbrowsertesting.com) - Manual, Visual, and Selenium Browser Testing in the cloud - [free for Open Source](https://crossbrowsertesting.com/open-source)
    
* [cypress.io](http://cypress.io) - Fast, easy and reliable testing for anything that runs in a browser. Cypress Test Runner is always free and open source with no restrictions and limitations. Cypress Dashboard is free for open source projects for up to 5 users.
    
* [Cypress Recorder by Preflight](https://cypress.preflight.com/) - Create AI-powered Cypress Tests/POM models on your browser. It's open-source except for the AI part. It's free for 5 test creations each month with Self-healing scripts, Email, and Visual testing.
    
* [everystep-automation.com](http://everystep-automation.com) — Records and replays all steps made in a web browser and creates scripts,... free with fewer options
    
* [Gremlin](https://www.gremlin.com/gremlin-free-software) — Gremlin's Chaos Engineering tools allow you to safely, securely, and simply inject failure into your systems to find weaknesses before they cause customer-facing issues. Gremlin Free provides access to Shutdown and CPU attacks on up to 5 hosts or containers.
    
* [gridlastic.com](http://gridlastic.com) — Selenium Grid testing with free plan up to 4 simultaneous selenium nodes/10 grid starts/4,000 test minutes/month
    
* [katalon.com](http://katalon.com) - Provides a testing platform that can help teams of all sizes at different levels of testing maturity, including Katalon Studio, TestOps (+ Visual Testing free),TestCloud and Katalon Recorder.
    
* [Keploy](https://keploy.io/) - Keploy is a functional testing toolkit for developers. It generates E2E tests for APIs (KTests) along with mocks or stubs(KMocks) by recording real API calls. It is free for Open Source.
    
* [loadmill.com](http://loadmill.com) - Automatically create API and load tests by analyzing network traffic. Simulate up to 50 concurrent users for up to 60 minutes for free every month.
    
* [preflight.com](http://preflight.com) - No-code automated web testing. Record tests on your browser that are resilient to UI changes and run them on Windows machines. Integrate with your CI/CD. The free plan includes 50 test runs per month with video, HTML sessions and more.
    
* [percy.io](http://percy.io) - Add visual testing to any web app, static site, style guide, or component library. Unlimited team members, Demo app and unlimited projects, 5,000 snapshots / month.
    
* [saucelabs.com](http://saucelabs.com) — Cross browser testing, Selenium testing and mobile testing, [free for Open Source](https://saucelabs.com/open-source)
    
* [snippets.uilicious.com](http://snippets.uilicious.com) - It's like CodePen, but for cross browser testing. UI-licious lets write tests like user stories, and offers a free platform - UI-licious Snippets - that allows you to run unlimited number of tests on Chrome for free with no sign up requred, for up to 3 minutes per test run. Found a bug? You can simply copy the unique url to your test to show your devs exactly how to reproduce the bug.
    
* [testingbot.com](http://testingbot.com) — Selenium Browser and Device Testing, [free for Open Source](https://testingbot.com/open-source)
    
* [Testspace.com](http://Testspace.com) - A Dashboard for publishing automated test results and a Framework for implementing manual tests as code using GitHub. The service is [free for Open Source](https://github.com/marketplace/testspace-com) accounts for 450 results per month.
    
* [tesults.com](http://tesults.com) — Test results reporting and test case management. Integrates with popular test frameworks. Open Source software developers, individuals, educators, and small teams getting started can request discounted and free offerings beyond basic free project.
    
* [websitepulse.com](http://websitepulse.com) — Various free network and server tools.
    
* [qase.io](http://qase.io) - Test management system for Dev and QA teams. Manage test cases, compose test runs, perform test runs, track defects and measure impact. The free tier includes all core features, with 500Mb available for attachments and up to 3 users.
    
* [knapsackpro.com](http://knapsackpro.com) - Speed up your tests with optimal test suite parallelisation on any CI provider. Split Ruby, JavaScript tests on parallel CI nodes to save time. Free plan for up to 10 minutes test files and free unlimited plan for Open Source projects.
    
* [webhook.site](http://webhook.site) - Verify webhooks, outbound HTTP requests, or emails with a custom URL. Temporary URL and email address is always free.
    
* [Vaadin](https://vaadin.com/) — Build scalable UIs in Java or TypeScript, and use the integrated tooling, components and design system to iterate faster, design better and simplify the development process. Unlimited Projects with 5 years free maintenance.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Security and PKI

* [alienvault.com](http://alienvault.com) — Uncovers compromised systems in your network
    
* [atomist.com](http://atomist.com) — A quicker and more convenient way to automate a variety of development tasks. Now in beta.
    
* [Bridgecrew](https://bridgecrew.io/) — Infrastructure as code (IaC) security powered by the open source tool - [Checkov](https://github.com/bridgecrewio/checkov). The core Bridgecrew platform is free for up to 50 IaC resources.
    
* [cloudsploit.com](http://cloudsploit.com) — Amazon Web Services (AWS) security and compliance auditing and monitoring
    
* [Cmd](https://cmd.com/) — Security platform providing real-time access control and dynamic policy enforcement on every Linux instance in your cloud or datacenter
    
* [CodeNotary.io](http://CodeNotary.io) — Open Source platform with indelible proof to notarize code, files, directories or container
    
* [crypteron.com](http://crypteron.com) — Cloud-first, developer-friendly security platform prevents data breaches in .NET and Java applications
    
* [CyberChef](https://gchq.github.io/CyberChef/) — A simple, intuitive web app for analysing and decoding/encoding data without having to deal with complex tools or programming languages. Like a swiss army knife of cryptography & encryption. All features are free to use, no limit. Open source, if you wish to self-host.
    
* [DAS](https://signup.styra.com/) — Styra DAS Free, Full lifecycle policy management to create, deploy and manage Open Policy Agent(OPA) authorization
    
* [Datree](https://www.datree.io/) — Open Source CLI tool to prevent Kubernetes misconfigurations by ensuring that manifests and Helm charts follow best practices as well as your organization’s policies
    
* [Dependabot](https://dependabot.com/) Automated dependency updates for Ruby, JavaScript, Python, PHP, Elixir, Rust, Java (Maven and Gradle), .NET, Go, Elm, Docker, Terraform, Git Submodules and GitHub Actions.
    
* [DJ Checkup](https://djcheckup.com/) — Scan your Django site for security flaws with this free, automated, checkup tool. Forked from the Pony Checkup site.
    
* [Doppler](https://doppler.com/) — Universal Secrets Manager for application secrets and config, with support for syncing to various cloud providers. Free for 5 users with basic access controls.
    
* [Dotenv](https://dotenv.org/) — Sync your .env files, quickly & securely. Stop sharing your .env files over insecure channels like Slack and email, and never lose an important .env file again. Free for up to 3 teammates.
    
* [GitGuardian](https://www.gitguardian.com/) — Keep secrets out of your source code with automated secrets detection and remediation. Scan your git repos for 350+ types of secrets and sensitive files – Free for individuals and teams of 25 developers or less.
    
* [Have I been pwned?](https://haveibeenpwned.com/) — REST API for fetching the information on the breaches.
    
* [hostedscan.com](http://hostedscan.com) — Online vulnerability scanner for web applications, servers, and networks. 10 free scans per month.
    
* [Infisical](https://infisical.com/) — Open source platform that lets you manage developer secrets across your team and infrastructure: everywhere from local development to staging/production 3rd-party services. Free for up to 5 developers.
    
* [Internet.nl](http://Internet.nl) — Test for modern Internet Standards like IPv6, DNSSEC, HTTPS, DMARC, STARTTLS and DANE
    
* [keychest.net](http://keychest.net) - SSL expiry management and cert purchase with an integrated CT database
    
* [letsencrypt.org](http://letsencrypt.org) — Free SSL Certificate Authority with certs trusted by all major browsers
    
* [meterian.io](http://meterian.io) - Monitor Java, Javascript, .NET, Scala, Ruby and NodeJS projects for security vulnerabilities in dependencies. Free for one private project, unlimited projects for open source.
    
* [Mozilla Observatory](https://observatory.mozilla.org/) — Find and fix security vulnerabilities in your site.
    
* [opswat.com](http://opswat.com) — Security Monitoring of computers, devices, applications, configurations,... Free 25 users and 30 days history users.
    
* [openapi.security](http://openapi.security) - Free tool to quickly check the security of any OpenAPI / Swagger based API. No signup required.
    
* [pyup.io](http://pyup.io) — Monitor Python dependencies for security vulnerabilities and update them automatically. Free for one private project, unlimited projects for open source.
    
* [qualys.com](http://qualys.com) — Find web app vulnerabilities, audit for OWASP Risks
    
* [reCAPTCHAMe](https://recaptchame.com/) — free reCAPTCHA and hCAPTCHA backend service. No Server-Side coding needed. Works for static websites.
    
* [report-uri.io](http://report-uri.io) — CSP and HPKP violation reporting
    
* [ringcaptcha.com](http://ringcaptcha.com) — Tools to use phone number as id, available for free
    
* [seclookup.com](http://seclookup.com) - Seclookup APIs can enrich domain threat indicators in SIEM, provide comprehensive information on domain names, improve threat detection & response. Get 50K lookups free [here](https://account.seclookup.com/).
    
* [snyk.io](http://snyk.io) — Can find and fix known security vulnerabilities in your open source dependencies. Unlimited tests and remediation for open source projects. Limited to 200 tests/month for your private projects.
    
* [ssllabs.com](http://ssllabs.com) — Very deep analysis of the configuration of any SSL web server
    
* [experte.com](http://experte.com) — Ensure robust website security with [experte.com](http://experte.com) SSL checker: assess SSL certificate validity, protocols, vulnerabilities, and HTTP security headers.
    
* [SOOS](https://soos.io/) - Free, unlimited SCA scans for open source projects. Detect and fix security threats before release. Protect your projects with a simple and effective solution.
    
* [StackHawk](https://www.stackhawk.com/) Automate application scanning throughout your pipeline to find and fix security bugs before they hit production. Unlimited scans and environments for a single app.
    
* [Sucuri SiteCheck](https://sitecheck.sucuri.net/) - Free website security check and malware scanner
    
* [Protectumus](https://protectumus.com/) - Free website security check, site antivirus and server firewall (WAF) for PHP. Email notifications for registered users in free tier.
    
* [TestTLS.com](http://TestTLS.com) - Test a SSL/TLS service for secure server configuration, certificates, chains etc. Not limited to HTTPS.
    
* [threatconnect.com](http://threatconnect.com) — Threat intelligence: It is designed for individual researchers, analysts and organizations who are starting to learn about cyber threat intelligence. Free up to 3 Users
    
* [tinfoilsecurity.com](http://tinfoilsecurity.com) — Automated vulnerability scanning. Free plan allows weekly XSS scans
    
* [Ubiq Security](https://ubiqsecurity.com/) — Encrypt and decrypt data with 3 lines of code and automatic key management. Free for 1 application and up to 1,000,000 encryptions per month.
    
* [Virgil Security](https://virgilsecurity.com/) — Tools and services for implementing end-to-end encryption, database protection, IoT security and more in your digital solution. Free for applications with up to 250 users.
    
* [Virushee](https://virushee.com/) — Privacy-oriented file/data scanning powered by hybrid heuristic and AI-assisted engine. Possible to use internal dynamic sandbox analysis. Limited to 50MB per file upload
    
* [Escape GraphQL Quickscan](https://escape.tech/) - One-click security scan of your GraphQL endpoints. Free, no login required.
    
* [FingerprintJS Browser Fingerprinting](https://www.fingerprint.com/) - FingerprintJS is a browser fingerprinting library that queries browser attributes and computes a hashed visitor identifier from them. Unlike cookies and local storage, a fingerprint stays the same in incognito/private mode and even when browser data is purged. Free tier version of Pro has 20,000 Requests per month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Authentication, Authorization and User Management

* [asgardeo.io](http://asgardeo.io) - Seamless Integration of SSO, MFA, passwordless auth and more. Includes SDKs for frontend and backend apps. Free up to 1000 MAUs and 5 identity providers.
    
* [Auth0](https://auth0.com/) — Hosted SSO. Up to 7000 active users and 2 social identity providers.
    
* [Authgear](https://www.authgear.com/) - Bring Passwordless, OTPs, 2FA, SSO to your apps in minutes. All Front-end included. Free up to 5000 MAUs.
    
* [Authress](https://authress.io/) — Authentication login and access control, unlimited identity providers for any project. Facebook, Google, Twitter and more. First 1000 API calls are free.
    
* [Authy](https://authy.com/) - Two-factor authentication (2FA) on multiple devices, with backups. Drop-in replacement for Google Authenticator. Free for up to 100 successful authentications.
    
* [Clerk](https://clerk.com/) — User management, auth, 2FA/MFA with prebuilt UI components. Free up to 5,000 monthly active users.
    
* [Descope](https://www.descope.com/) — Highly customizable AuthN flows, has both a no-code and API/SDK approach, Free 7,500 active users/month, 50 tenants (up to 5 SAML/SSO tenants).
    
* [duo.com](http://duo.com) — Two-factor authentication (2FA) for website or app. Free for 10 users, all authentication methods, unlimited, integrations, hardware tokens.
    
* [Jumpcloud](https://jumpcloud.com/) — Provides directory as a service similar to Azure AD, user management, single sign-on, and RADIUS authentication. Free for up to 10 users.
    
* [logintc.com](http://logintc.com) — Two-factor authentication (2FA) by push notifications, free for 10 users, VPN, Websites and SSH
    
* [MojoAuth](https://mojoauth.com/) - MojoAuth makes it easy to implement Passwordless authentication on your web, mobile or any application in minutes.
    
* [Okta](https://developer.okta.com/signup/) — User management, authentication and authorization. Free for up to 100 monthly active users.
    
* [onelogin.com](http://onelogin.com) — Identity as a Service (IDaaS), Single Sign-On Identity Provider, Cloud SSO IdP, 3 company apps and 5 personal apps, unlimited users
    
* [Ory](https://ory.sh/) - AuthN/AuthZ/OAuth2.0/Zero Trust managed security platform. Forever free developer accounts with all security features, unlimited team members, 200 daily active users, and 25k/mo permission checks.
    
* [SuperTokens](https://supertokens.com/) - Open source user authentication that natively integrates into your app - enabling you to get started quickly while controlling the user and developer experience. Free for up to 5000 MAUs.
    
* [Warrant](https://warrant.dev/) — Hosted enterprise-grade authorization and access control service for your apps. Free tier includes 1 million API requests per month and 1,000 authz rules.
    
* [ZITADEL Cloud](https://zitadel.com/) — A turnkey user and access management that works for you and supports multi tenant (B2B) use cases. Free for up to 25'000 authenticated requests, with all security features (no paywall for OTP, Passwordless, Policies and so on).
    
* [PropelAuth](https://propelauth.com/) — A Sell to companies of any size immediately with a few lines of code, free up to 200 users and 10k Transactional Emails (with a watermark branding: "Powered by PropelAuth").
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Management System

* [bitnami.com](http://bitnami.com) — Deploy prepared apps on IaaS. Management of 1 AWS micro instance free
    
* [Esper](https://esper.io/) — MDM and MAM for Android Devices with DevOps. 100 devices free with 1 user license and 25 MB Application Storage.
    
* [jamf.com](http://jamf.com) — Device management for iPads, iPhones and Macs, 3 devices free
    
* [Miradore](https://miradore.com/) — Device Management service. Stay up-to-date with your device fleet and secure an unlimited number of devices for free. Free plan offers basic features.
    
* [moss.sh](http://moss.sh) - Help developers deploy and manage their web apps and servers. Free up to 25 git deployments per month
    
* [runcloud.io](http://runcloud.io) - Server management focusing mainly on PHP projects. Free for up to 1 server.
    
* [ploi.io](http://ploi.io) - Server management tool to easily manage and deploy your servers & sites. Free for 1 server.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Messaging and Streaming

* [Ably](https://www.ably.com/) - Realtime messaging service with presence, persistence and guaranteed delivery. Free plan includes 3m messages per month, 100 peak connections and 100 peak channels.
    
* [cloudamqp.com](http://cloudamqp.com) — RabbitMQ as a Service. Little Lemur plan: max 1 million messages/month, max 20 concurrent connections, max 100 queues, max 10,000 queued messages, multiple nodes in different AZ's
    
* [connectycube.com](http://connectycube.com) - Unlimited chat messages, p2p voice & video calls, files attachments and push notifications. Free for apps up to 20K MAU.
    
* [courier.com](http://courier.com) — Single API for push, in-app, email, chat, SMS, and other messaging channels with template management and other features. Free plan includes 10,000 messages/mo.
    
* [HiveMQ](https://www.hivemq.com/mqtt-cloud-broker/) - Connect your MQTT devices to the Cloud Native IoT Messaging Broker. Free to connect up to 100 devices (no credit card required) forever.
    
* [knock.app](http://knock.app) – Notifications infrastructure for developers. Send to multiple channels like in-app, email, SMS, Slack, and push with a single API call. Free plan includes 10,000 messages/mo.
    
* [pusher.com](http://pusher.com) — Realtime messaging service. Free for up to 100 simultaneous connections and 200,000 messages/day
    
* [scaledrone.com](http://scaledrone.com) — Realtime messaging service. Free for up to 20 simultaneous connections and 100,000 events/day
    
* [synadia.com](http://synadia.com) — [NATS.io](http://NATS.io) as a service. Global, AWS, GCP, and Azure. Free forever with 4k msg size, 50 active connections and 5GB of data per month.
    
* [cloudkarafka.com](http://cloudkarafka.com) - Free Shared Kafka cluster, up to 5 topics, 10MB data per topic and 28 days of data retention.
    
* [pubnub.com](http://pubnub.com) - Swift, Kotlin and React messaging at 1 million transactions each month. Transactions may contain multiple messages.
    
* [eyeson API](https://developers.eyeson.team/) - A video communication API service based on WebRTC (SFU, MCU) to build video platforms. Allows RealTime Data Injection, Video Layouts, Recordings, a fully featured hosted web UI (quickstart) or packages for custom UIs. Has a [free tier for developers](https://apiservice.eyeson.com/api-pricing) with 1000 meeting minutes a month.
    
* [Upstash Kafka](https://upstash.com/kafka) - Serverless Kafka Cloud offering with per-request-pricing. It has a free tier with max 10000 messages per day.
    
* [webpushr](https://www.webpushr.com/) - Web Push Notifications - Free for upto 10k subscribers, unlimited push notifications, in-browser messaging
    
* [Scramjet Cloud Platform Beta](https://www.scramjet.org/#join-beta) - An end-to-end stream processing platform in free beta and offering 15 petabyte-seconds of free compute after the beta ends.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Log Management

* [bugfender.com](http://bugfender.com) — Free up to 100k log lines/day with 24 hours retention
    
* [humio.com](http://humio.com) — Free up to 16 GB/day with 7 days retention
    
* [logentries.com](http://logentries.com) — Free up to 5 GB/month with 7 days retention
    
* [loggly.com](http://loggly.com) — Free for a single user, 200MB/day with 7 days retention
    
* [logz.io](http://logz.io) — Free up to 1 GB/day, 1 days retention
    
* [ManageEngine Log360 Cloud](https://www.manageengine.com/cloud-log-management) — Log Management service powered by Manage Engine. Free Plan offers 50 GB storage with 1 Month retention.
    
* [papertrailapp.com](http://papertrailapp.com) — 48 hours search, 7 days archive, 50 MB/month
    
* [sematext.com](http://sematext.com) — Free up to 500 MB/day, 7 days retention
    
* [sumologic.com](http://sumologic.com) — Free up to 500 MB/day, 7 days retention
    
* [logflare.app](http://logflare.app) — Free for upto 12,960,000 entries per app per month, 3 days retention
    
* [logtail.com](http://logtail.com) — ClickHouse-based SQL-compatible log management. Free up to 1 GB per month, 3 days retention.
    
* [logzab.com](http://logzab.com) — Audit trail management system. Free 1.000 user activity log per month, 1 month retention, for up-to 5 projects.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Translation Management

* [crowdin.com](http://crowdin.com) — Unlimited projects, unlimited strings and collaborators for Open Source
    
* [gitlocalize.com](http://gitlocalize.com) - Free and unlimited for both private and public repositories
    
* [Lecto](https://lecto.ai/) - Machine Translation API with Free tier (30 free requests, 1000 translated characters per request). Integrated with Loco Translate Wordpress plugin.
    
* [lingohub.com](http://lingohub.com) — Free up to 3 users, always free for Open Source
    
* [localazy.com](http://localazy.com) - Free for 1000 source language strings, unlimited languages, unlimited contributors, startup and open source deals
    
* [Localeum](https://localeum.com/) - Free up to 1000 strings, 1 user, unlimited languages, unlimited projects
    
* [localizely.com](http://localizely.com) — Free for Open Source
    
* [Loco](https://localise.biz/) — Free up to 2000 translations, Unlimited translators, 10 languages/project, 1000 translatable assets/project
    
* [oneskyapp.com](http://oneskyapp.com) — Limited free edition for up to 5 users, free for Open Source
    
* [POEditor](https://poeditor.com/) — Free up to 1000 strings
    
* [SimpleLocalize](https://simplelocalize.io/) - Free up to 100 translation keys, unlimited strings, unlimited languages, startup deals
    
* [Texterify](https://texterify.com/) - Free for a single user
    
* [Tolgee](https://tolgee.io/) - Free SaaS offering with limited translations, forever-free self hosted version
    
* [transifex.com](http://transifex.com) — Free for Open Source
    
* [Translation.io](http://Translation.io) - Free for Open Source
    
* [Translized](https://translized.com/) - Free up to 1000 strings, 1 user, unlimited languages, unlimited projects
    
* [webtranslateit.com](http://webtranslateit.com) — Free up to 500 strings
    
* [weblate.org](http://weblate.org) — It's free for libre projects up to 10,000 string source for the free tier, and Unlimited Self-hosted on-premises.
    
* [Free PO editor](https://pofile.net/free-po-editor) — Free for everybody
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Monitoring

* [Airbrake.io](http://Airbrake.io) - Get started with Free Forever Error and Performance Monitoring - no credit card required! After the Free Trial period ends, you can choose to upgrade to a paid Airbrake plan, or automatically convert to a FREE FOR LIFE Airbrake Dev Account that includes (1) User, (1) Team, (2) Projects, 7,500 Errors per month, 50,000 Performance Events, and 7 days data retention.
    
* [Pingmeter.com](http://Pingmeter.com) - 5 uptime monitors with 10 minutes interval. Monitor SSH, HTTP, HTTPS, and any custom TCP ports.
    
* [appdynamics.com](http://appdynamics.com) — Free for 24 hours metrics, application performance management agents limited to one Java, one .NET, one PHP and one Node.js
    
* [appneta.com](http://appneta.com) — Free with 1-hour data retention
    
* [appspector.com](http://appspector.com) - Mission control, for remote iOS/Android/Flutter debugging. Free for small traffic usage (64MB of logs).
    
* [assertible.com](http://assertible.com) — Automated API testing and monitoring. Free plans for teams and individuals.
    
* [blackfire.io](http://blackfire.io) — Blackfire is the SaaS-delivered Application Performance Solution. Free Hacker plan (PHP only)
    
* [checklyhq.com](http://checklyhq.com) - Open source E2E / Synthetic monitoring and deep API monitoring for developers. Free plan with 5 users and 50k+ check runs.
    
* [circonus.com](http://circonus.com) — Free for 20 metrics
    
* [cloudsploit.com](http://cloudsploit.com) — AWS security and configuration monitoring. Free: unlimited on-demand scans, unlimited users, unlimited stored accounts. Subscription: automated scanning, API access, etc.
    
* [cronitor.io](http://cronitor.io) - Performance insights and uptime monitoring for cron jobs, websites, APIs and more. Free tier with 5 monitors.
    
* [datadoghq.com](http://datadoghq.com) — Free for up to 5 nodes
    
* [deadmanssnitch.com](http://deadmanssnitch.com) — Monitoring for cron jobs. 1 free snitch (monitor), more if you refer others to sign up
    
* [downtimemonkey.com](http://downtimemonkey.com) — 60 uptime monitors, 5 minute interval. Email, Slack alerts.
    
* [economize.cloud](http://economize.cloud) — Economize helps demystify cloud infrastructure costs by organizing cloud resources, optimize and report the same. Free for up to $5000 spends on Google Cloud Platform every month.
    
* [elastic.co](http://elastic.co) — Instant performance insights for JS developers. Free with 24 hours data retention
    
* [freeboard.io](http://freeboard.io) — Free for public projects. Dashboards for your Internet of Things (IoT) projects
    
* [freshworks.com](http://freshworks.com) — Monitor 50 URLs at 1-minute interval with 10 Global locations and 5 Public status pages for Free
    
* [gitential.com](http://gitential.com) — Software Development Analytics platform. Free: unlimited public repositories, unlimited users, free trial for private repos. On-prem version available for enterprise.
    
* [Grafana Cloud](https://grafana.com/products/cloud/) - Grafana Cloud is a composable observability platform, integrating metrics and logs with Grafana. Free: 3 users, 10 dashboards, 100 alerts, metrics storage in Prometheus and Graphite (10,000 series, 14 days retention), logs storage in Loki (50 GB of logs, 14 days retention)
    
* [healthchecks.io](http://healthchecks.io) — Monitor your cron jobs and background tasks. Free for up to 20 checks.
    
* [inspector.dev](http://inspector.dev) - A complete Real-Time monitoring dashboard in less than one minute with free forever tier.
    
* [instrumentalapp.com](http://instrumentalapp.com) - Beautiful and easy-to-use application and server monitoring with up to 500 metrics and 3 hours of data visibility for free
    
* [keychest.net/speedtest](http://keychest.net/speedtest) - Independent speed test and TLS handshake latency test against Digital Ocean
    
* [letsmonitor.org](http://letsmonitor.org) - SSL monitoring, free for up to 5 monitors
    
* [loader.io](http://loader.io) — Free load testing tools with limitations
    
* [meercode.io](http://meercode.io) — Meercode is the ultimate monitoring dashboard for your CI/CD builds. Free for open-source and 1 private repository.
    
* [netdata.cloud](http://netdata.cloud) — Netdata is an open source tool designed to collect real-time metrics.Great fast growing product. It can also be found in github!
    
* [newrelic.com](http://newrelic.com) — New Relic observability platform built to help engineers create more perfect software. From monoliths to serverless, you can instrument everything, then analyze, troubleshoot, and optimize your entire software stack. Free tier offers 100GB/month of free data ingest, 1 free full access user, and unlimited free basic users.
    
* [Middleware.io](http://Middleware.io) - Middleware observability platform provides complete visibility into your apps & stack, so you can monitor & diagnose issues at scale. They have a free forever plan for Dev community use that allows Log monitoring for upto 1M log events, Infrastructure monitoring & APM for upto 2 hosts.
    
* [nixstats.com](http://nixstats.com) - Free for one server. E-Mail Notifications, public status page, 60 second interval and more.
    
* [OnlineOrNot.com](http://OnlineOrNot.com) - OnlineOrNot is a reliable uptime monitor for both JS-based web apps and websites. 5 uptime checks (for static websites and APIs) with a 5 minute interval, 1 browser check with a 15 minute interval. Also provides automated public status pages (with support coming for 3rd party uptime monitoring). Free for up to 3 users, alerts via Slack, Discord, and Email.
    
* [opsgenie.com](http://opsgenie.com) — Powerful alerting and on-call management for operating always-on services. Free up to 5 users.
    
* [paessler.com](http://paessler.com) — Powerful infrastructure and network monitoring solution including alerting, strong visualization capabilities and basic reporting. Free up to 100 sensors.
    
* [syagent.com](http://syagent.com) — Non commercial free server monitoring service, alerts and metrics.
    
* [pagerly.io](http://pagerly.io) - Manage oncalls on Slack (integrates with Pagerduty, OpsGenie) .Free upto 1 team (one team refers to one oncall)
    
* [pagertree.com](http://pagertree.com) - Simple interface for alerting and on-call management. Free up to 5 users.
    
* [pingbreak.com](http://pingbreak.com) — Modern uptime monitoring service. Check unlimited URLs and get downtime notifications via Discord, Slack or email.
    
* [pingpong.one](http://pingpong.one) — Advanced status page platform with monitoring. Free tier includes one public customizable status page with SSL subdomain. Pro plan is offered to open-source projects and non-profits free of charge.
    
* [sematext.com](http://sematext.com) — Free for 24 hours metrics, unlimited number of servers, 10 custom metrics, 500,000 custom metrics data points, unlimited dashboards, users, etc.
    
* [sitemonki.com](http://sitemonki.com) — Website, domain, Cron & SSL monitoring, 5 monitors in each category for free
    
* [skylight.io](http://skylight.io) — Free for first 100,000 requests (Rails only)
    
* [speedchecker.xyz](http://speedchecker.xyz) — Performance Monitoring API, checks Ping, DNS, etc.
    
* [stathat.com](http://stathat.com) — Get started with 10 stats for free, no expiration
    
* [statuscake.com](http://statuscake.com) — Website monitoring, unlimited tests free with limitations
    
* [statusgator.com](http://statusgator.com) — Status page monitoring, 3 monitors free
    
* [thousandeyes.com](http://thousandeyes.com) — Network and user experience monitoring. 3 locations and 20 data feeds of major web services free
    
* [thundra.io/apm](http://thundra.io/apm) — Application monitoring and debugging. Has a free tier up to 250k monthly invocations.
    
* [uptimerobot.com](http://uptimerobot.com) — Website monitoring, 50 monitors free
    
* [uptimetoolbox.com](http://uptimetoolbox.com) — Free monitoring for 5 websites, 60 second intervals, public statuspage.
    
* [zenduty.com](http://zenduty.com) — End-to-end incident management, alerting, on-call management and response orchestration platform for network operations, site reliability engineering and DevOps teams. Free for upto 5 users.
    
* [instatus.com](http://instatus.com) - Get a beautiful status page in 10 seconds. Free forever with unlimited subs and unlimited teams.
    
* [Squadcast.com](http://Squadcast.com) - Squadcast is an end-to-end incident management software that's designed to help you promote SRE best practices. Free forever plan available for upto 10 users.
    
* [RoboMiri.com](http://RoboMiri.com) - RoboMiri is a stable uptime monitor that offer a wide range of monitors: cronjob, keyword, website, port, ping. 25 uptime checks with a 3 minutes interval checks for free. Alerts via Phone Call, SMS, Email and Web Hook.
    
* [Better Stack](https://betterstack.com/better-uptime) - Uptime monitoring, incident management, on-call scheduling/alerting and status pages in a single product. 10 monitors with 3 min check frequency and status pages are included on the free plan.
    
* [Pulsetic](https://pulsetic.com/) - 10 monitors, 6 Months Historical Uptime/Logs, unlimited status pages and custom domains included! For unlimited time and unlimited email alerts for free. No credit card required.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Crash and Exception Handling

* [CatchJS.com](http://CatchJS.com) - JavaScript error tracking with screenshots and click trails. Free for open source projects.
    
* [bugsnag.com](http://bugsnag.com) — Free for up to 2,000 errors/month after the initial trial
    
* [elmah.io](http://elmah.io) — Error logging and uptime monitoring for web developers. Free Small Business subscription for open source projects.
    
* [exceptionless](https://exceptionless.com/) — Real-time error, feature, log reporting and more. Free for 3k events per month/1 user. Open source and easy to self-host for unlimited use.
    
* [GlitchTip](https://glitchtip.com/) — Simple, open source error tracking. Compatible with open-source Sentry SDKs. 1000 events per month for free, or can self-host with no limits
    
* [honeybadger.io](http://honeybadger.io) - Exception, uptime, and cron monitoring. Free for small teams and open-source projects (12,000 errors/month).
    
* [memfault.com](http://memfault.com) — Cloud platform for device observability and debugging. 100 devices free for [Nordic](https://app.memfault.com/register-nordic), [NXP](https://app.memfault.com/register-nxp), and [Laird](https://app.memfault.com/register-laird) devices.
    
* [rollbar.com](http://rollbar.com) — Exception and error monitoring, free plan with 5,000 errors/month, unlimited users, 30 days retention
    
* [sentry.io](http://sentry.io) — Sentry tracks app exceptions in real-time, has a small free plan. Free for 5k errors per month/ 1 user, unrestricted use if self-hosted
    
* [Axiom](https://axiom.co/) — Store up to 0.5 TB of logs with 30 day retention. Includes integrations with platforms like Vercel and advanced data querying with email/Discord notifiers.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Search

* [algolia.com](http://algolia.com) — Hosted search-as-you-type (instant). Free hacker plan up to 10,000 documents and 100,000 operations. Bigger free plans available for community/Open Source projects
    
* [bonsai.io](http://bonsai.io) — Free 1 GB memory and 1 GB storage
    
* [CommandBar](https://www.commandbar.com/) - Unified Search Bar as-a-service, web based UI widget/plugin that allows your users to search contents, navigations, features, etc. within your product, which helps discoverability. Free for up-to 1000 Monthly Active Users, unlimited commands.
    
* [Magny](https://magny.io/) - SaaS service that helps implement command palettes (e.g in-app search), which significantly decreases the time users find anything in an app, leveraging the user experience and efficiency.
    
* [searchly.com](http://searchly.com) — Free 2 indices and 20 MB storage
    
* [pagedart.com](http://pagedart.com) - AI search as a service the free tier includes 1000 Documents, 50000 searches. Larger free tiers are possible for worthwhile projects.
    
* [Meilisearch](https://www.meilisearch.com/) - An open-source, lightning-fast, and hyper-relevant search engine that fits effortlessly into your apps, websites, and workflow. Free plan includes 100K documents and 10K searches/month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Email

* [10minutemail](https://10minutemail.com/) - Free, temporary email for testing.
    
* [AnonAddy](https://anonaddy.com/) - Open-source anonymous email forwarding, create unlimited email aliases for free
    
* [Antideo](https://www.antideo.com/) — 10 API requests per hour for email verification, IP and phone number validation in free tier. No Credit Cards required.
    
* [Bump](https://bump.email/) - Free 10 Bump email addresses, 1 custom domain
    
* [Burnermail](https://burnermail.io/) – Free 5 Burner Email Addresses, 1 Mailbox, 7 day Mailbox History
    
* [Buttondown](https://buttondown.email/) — Newsletter service. Up to 100 subscribers free
    
* [CloudMailin](https://www.cloudmailin.com/) - Incoming email via HTTP POST and transactional outbound - 10,000 free emails/month
    
* [cloudmersive.com](http://cloudmersive.com) — Email validation and verification API for developers, 800 free API requests/month
    
* [Contact.do](http://Contact.do) — Contact form in a link (bitly for contact forms) - totally free!
    
* [debugmail.io](http://debugmail.io) — Easy to use testing mail server for developers
    
* [DNSExit](https://dnsexit.com/) - Up to 2 Email addresses under your domain for free with 100MB of storage space. IMAP, POP3, SMTP, SPF/DKIM support.
    
* [emaildrop.io](http://emaildrop.io) — Free disposable email provider. Email addresses can be created via GraphQL API.
    
* [EmailLabs.io](http://EmailLabs.io) — Send up to 9,000 Emails for free every month, up to 300 emails per day.
    
* [EmailOctopus](https://emailoctopus.com/) - Up to 2,500 subscribers and 10,000 emails per month free
    
* [EmailJS](https://www.emailjs.com/) – This is not a full email server, this is just email client which you can use to send emails right from client send without exposing your credentials, the free tier has: 200 monthly requests, 2 email templates, Requests up to 50Kb, Limited contacts history.
    
* [Emailvalidation.io](http://Emailvalidation.io) - 100 free email verifications per month
    
* [fakermail.com](http://fakermail.com) — Free, temporary email for testing with last 100 email accounts stored.
    
* [forwardemail.net](http://forwardemail.net) — Free email forwarding for custom domains. Create and forward an unlimited amount of email addresses with your domain name (**note**: You must pay if you use .casa, .cf, .click, .email, .fit, .ga, .gdn, .gq, .loan, .london, .men, .ml, .pl, .rest, .ru, .tk, .top, .work TLDs due to spam)
    
* [HotTempMail](https://hottempmail.com/) - Unlimited free temp email or disposable temporary email addresses. Autoexpires in one day.
    
* [Imitate Email](https://imitate.email/) - Sandbox Email Server for testing email functionality across build/qa and ci/cd. Free accounts get 15 emails a day forever.
    
* [ImprovMX](https://improvmx.com/) – Free email forwarding
    
* [EForw](https://www.eforw.com/) – Free email forwarding for 1 domain. Receive and send emails from your domain.
    
* [inboxkitten.com](http://inboxkitten.com) - Free temporary/disposable email inbox, with up-to 3 day email auto-deletes. Open sourced, and can be self-hosted.
    
* [mail-tester.com](http://mail-tester.com) — Test if email's dns/spf/dkim/dmarc settings are correct, 20 free/month
    
* [dkimvalidator.com](http://dkimvalidator.com) - Test if email's dns/spf/dkim/dmarc settings are correct, free service by [roundsphere.com](http://roundsphere.com)
    
* [mailcatcher.me](http://mailcatcher.me) — Catches mail and serves it through a web interface
    
* [Mailcheck.ai](http://Mailcheck.ai) - Prevent users to sign up with temporary email addresses, 120 requests/hour (~86,400 per month)
    
* [Mailchimp](https://mailchimp.com/) — 500 subscribers and 1,000 emails/month free
    
* [MailerLite.com](http://MailerLite.com) — 1,000 subscribers/month, 12,000 emails/month free
    
* [MailerSend.com](http://MailerSend.com) — Email API, SMTP, 12,000 emails/month free for transactional emails
    
* [mailinator.com](http://mailinator.com) — Free, public, email system where you can use any inbox you want
    
* [Mailjet](https://www.mailjet.com/) — 6,000 emails/month free (200 emails daily sending limit)
    
* [Mailnesia](https://mailnesia.com/) - Free temporary/disposable email, which auto visit registration link.
    
* [mailsac.com](http://mailsac.com) - Free API for temporary email testing, free public email hosting, outbound capture, email-to-slack/websocket/webhook (1,500 monthly API limit)
    
* [Mailtie.com](http://Mailtie.com) - Free Email Forwarding for Your Domain. No registration required. Free Forever.
    
* [Mailtrap.io](http://Mailtrap.io) — Fake SMTP server for development, free plan with 1 inbox, 100 messages, no team member, 2 emails/second, no forward rules
    
* [Mailvalidator.io](http://Mailvalidator.io) - Verify 300 emails/month for free, real-time API with bulk processing available
    
* [Mail7.io](http://Mail7.io) — Free Temp Email Addresses for QA Developers. Create email addresses instantly using Web Interface or API
    
* [Mutant Mail](https://www.mutantmail.com/) – Free 10 Email IDs, 1 Domain, 1 Mailbox. Single Mailbox for All Email IDs.
    
* [Outlook.com](http://Outlook.com) - Free personal email and calendar
    
* [Parsio.io](http://Parsio.io) — Free email parser (Forward email, extract the data, send it to your server)
    
* [pepipost.com](http://pepipost.com) — 30k emails free for first month, then first 100 emails/day free
    
* [Postmark](https://postmarkapp.com/) - 100 emails/month free, unlimited DMARC weekly digests
    
* [Proton Mail](https://proton.me/mail) - Free secure email account service provider with built-in end-to-end encryption. Free 1GB storage.
    
* [QuickEmailVerification](https://quickemailverification.com/) — Verify 100 emails daily for free on a free tier along with other free APIs like DEA Detector, DNS Lookup, SPF Detector and more.
    
* [Sender](https://www.sender.net/) Up to 15 000 emails/month, up to 2,500 subscribers
    
* [SendGrid](https://sendgrid.com/) — 100 emails/day and 2,000 contacts free
    
* [Sendinblue](https://www.sendinblue.com/) — 9,000 emails/month, 300 emails/day free
    
* [Sendpulse](https://sendpulse.com/) — 500 subscribers/month, 12,000 emails/month free
    
* [SimpleLogin](https://simplelogin.io/) – Open source, self-hostable email alias/forwarding solution. Free 5 Aliases, unlimited bandwith, unlimited reply/send. Free for educational staffs (student, researcher, etc).
    
* [Substack](https://substack.com/) — Unlimited free newsletter service. Start paying when you charge for it.
    
* [Tempmailo](https://tempmailo.com/) - Unlimited free temp email addresses. Autoexpire in two days.
    
* [Takeout](https://takeout.bysourfruit.com/) - A constantly updated email service that makes sending emails extremely easy. 500 transactional emails/month free.
    
* [temp-mail.io](http://temp-mail.io) — Free disposable temporary email service with multiple emails at once and forwarding
    
* [tinyletter.com](http://tinyletter.com) — 5,000 subscribers/month free
    
* [trashmail.com](http://trashmail.com) - Free disposable email addresses with forwarding and automatic address expiration
    
* [Tutanota](https://tutanota.com/) - Free secure email account service provider with built-in end-to-end encryption, no ads, no tracking. Free 1GB storage. Which also partially [open source](https://github.com/tutao/tutanota), so you can opt to self-host.
    
* [Validator.Pizza](http://Validator.Pizza) — Free API to detect disposable emails
    
* [Verifalia](https://verifalia.com/email-verification-api) — Real-time email verification API with mailbox confirmation and disposable email address detector; 25 free email verifications/day.
    
* [verimail.io](http://verimail.io) — Bulk and API email verification service. 100 free verifications/month
    
* [Zoho](https://www.zoho.com/) — Started as an e-mail provider but now provides a suite of services out of which some of them have free plans. List of services having free plans :
    
    * [Email](https://zoho.com/mail) Free for 5 users. 5GB/user & 25 MB attachment limit, 1 domain.
        
    * [Sprints](https://zoho.com/sprints) Free for 5 users,5 Projects & 500MB storage.
        
    * [Docs](https://zoho.com/docs) — Free for 5 users with 1 GB upload limit & 5GB storage. Zoho Office Suite (Writer,Sheets & Show) comes bundled with it.
        
    * [Projects](https://zoho.com/projects) — Free for 3 users, 2 projects & 10 MB attachment limit. Same plan applies to [Bugtracker](https://zoho.com/bugtracker).
        
    * [Connect](https://zoho.com/connect) — Team Collaboration free for 25 users with 3 groups, 3 custom apps, 3 Boards, 3 Manuals, 10 Integrations along with channels,events & forums.
        
    * [Meeting](https://zoho.com/meeting) — Meetings with upto 3 meeting participants & 10 Webinar attendees.
        
    * [Vault](https://zoho.com/vault) — Password Management free for Individuals.
        
    * [Showtime](https://zoho.com/showtime) — Yet another Meeting software for training for a remote session upto 5 attendees.
        
    * [Notebook](https://zoho.com/notebook) — A free alternative to Evernote.
        
    * [Wiki](https://zoho.com/wiki) — Free for 3 users with 50 MB storage, unlimited pages, zip backups, RSS & Atom feed, access controls & customisable CSS.
        
    * [Subscriptions](https://zoho.com/subscriptions) — Recurring Billing management free for 20 customers/subscriptions & 1 user with all the payment hosting done by Zoho themselves. Last 40 subscription metrics are stored
        
    * [Checkout](https://zoho.com/checkout) — Product Billing management with 3 pages & up to 50 payments.
        
    * [Desk](https://zoho.com/desk) — Customer Support management with 3 agents and private knowledge base, email tickets. Integrates with [Assist](https://zoho.com/assist) for 1 remote technician & 5 unattended computers.
        
    * [Cliq](https://zoho.com/cliq) — Team chat software with 100 GB storage, unlimited users, 100 users per channel & SSO.
        
    * [Campaigns](https://zoho.com/campaigns)
        
    * [Forms](https://zoho.com/forms)
        
    * [Sign](https://zoho.com/sign)
        
    * [Surveys](https://zoho.com/surveys)
        
    * [Bookings](https://zoho.com/bookings)
        
    * [Analytics](https://zoho.com/analytics)
        

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Font

* [dafont](https://www.dafont.com/) - The fonts presented on this website are their authors' property, and are either freeware, shareware, demo versions or public domain.
    
* [Everything Fonts](https://everythingfonts.com/) - Offers multiple tools; @font-face, Units Converter, Font Hinter and Font Submitter.
    
* [Font Squirrel](https://www.fontsquirrel.com/) - Freeware fonts that is licensed for commercial work. Hand-selected these typefaces and presenting them in an easy-to-use format.
    
* [Google Fonts](https://fonts.google.com/) - Lots of free fonts that are easy and quick to install in a website via a download or a link to Google's CDN.
    
* [FontGet](https://www.fontget.com/) - Has a variety of fonts available to download and sorted neatly with tags.
    
* [Fontshare](https://www.fontshare.com/) - is a free fonts service. It’s a growing collection of professional grade fonts that are 100% free for personal and commercial use.
    
* [Befonts](https://befonts.com/) - Provides several unqiue fonts for personal or commercial use.
    
* [Font of web](https://fontofweb.com/) - Identify all the fonts used on a website and how they are used.
    
* [Bunny](https://bunny.net/)
    
    * [Bunny Fonts](https://fonts.bunny.net/) - All the Google Fonts with Google Fonts drop-in compatible API. Privacy oriented!.
        
    * [Bunny DNS](https://bunny.net/dns/) - DNS hosting, 20 million free queries
        
* [FontsKey](https://www.fontskey.com/) - Provides free fonts for personal use and commercial paid fonts, and can enter text for quick filtering.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Forms

* [Feathery](https://feathery.io/) - Powerful, developer-friendly form builder. Build signup & login, user onboarding, payment flows, complex financial applications, and more. Free plan allows up to 250 submissions / month and 5 active forms.
    
* [Form-Data](https://form-data.com/) - No-code forms backend. Spam filter, email notification and auto-respond, webhooks, zapier, redirects, AJAX or POST and more. Free plan offers unlimited forms, 20 submissions/month and additional 2000 submissions with Form-Data badge.
    
* [FabForm](https://fabform.io/) - Form backend platform for smart developers. Free plan allows 250 form submissions per month. Friendly modern GUI. Integrates with Google Sheets, Airtable, Slack, Email and others.
    
* [Form.taxi](http://Form.taxi) — Endpoint for HTML forms submissions. With notifications, spam blocker and GDPR-compliant data processing. Free plan for basic usage.
    
* [Formcake.com](http://Formcake.com) - Form backend for devs, free plan allows unlimited forms, 100 submissions, Zapier integration. No libraries or dependencies required.
    
* [Formcarry.com](http://Formcarry.com) - HTTP POST Form endpoint, Free plan allows 100 submissions per month.
    
* [formingo.co](http://formingo.co)\- Easy HTML forms for static websites, get started for free without registering an account. Free plan allows 500 submissions per month, customizable reply-to email address.
    
* [FormKeep.com](http://FormKeep.com) - Unlimited forms with 50 submissions per month, spam protection, email notification and a drag and drop designer that can export HTML. Additional features include custom field rules, teams and integrations to Google Sheets, Slack, ActiveCampaign and Zapier.
    
* [formlets.com](http://formlets.com) — Online forms, unlimited single page forms/month, 100 submissions/month, email notifications.
    
* [formspark.io](http://formspark.io) - Form to Email service, free plan allows unlimited forms, 250 submissions per month, support by Customer assistance team.
    
* [Formspree.io](http://Formspree.io) — Send email using an HTTP POST request. Free tier limits to 50 submissions per form per month.
    
* [Formsubmit.co](http://Formsubmit.co) — Easy form endpoints for your HTML forms. Free Forever. No registration required.
    
* [getform.io](http://getform.io) - Form backend platform for designers and developers, 1 form, 50 submissions, Single file upload, 100MB file storage.
    
* [HeroTofu.com](http://HeroTofu.com) - Forms backend with bot detection and encrypted archive. Forward submissions via UI to email, Slack, or Zapier. Use your own frontend, no server code required. Free plan gives unlimited forms and 100 submissions per month.
    
* [HeyForm.net](http://HeyForm.net) - Drag and drop online form builder. Free tier lets you create unlimited forms and collect unlimited submissions. Comes with pre-built templates, anti-spam, and 100MB file storage.
    
* [Tally.so](http://Tally.so) - 99% of all the features are totally free. Free tier lets you have these: unlimited forms, unlimited submissions, email notifications, form logic, collect payments, file upload, custom thank you page, and many more.
    
* [Hyperforms.app](http://Hyperforms.app) — Create form to email and more in seconds and without backend code. The Personal account gives you up to 50 form submissions per month for free.
    
* [Kwes.io](http://Kwes.io) - Feature rich form endpoint. Works great with static sites. Free plan includes up 1 website with up to 50 submissions per month.
    
* [Pageclip](https://pageclip.co/) - Free plan allows one site, one form, 1,000 submissions per month.
    
* [Qualtrics Survey](https://qualtrics.com/free-account) — Create professional forms & survey using this first class tool. 50+ expert-designed survey templates. Free Account has limit of 1 active survey, 100 responses/survey & 8 response types.
    
* [smartforms.dev](http://smartforms.dev) - Powerful and easy form backend for your website, forever free plan allows 50 submissions per month, 250MB file storage, Zapier integration, CSV/JSON export, custom redirect, custom response page, Telegram & Slack bot, single email notifications.
    
* [staticforms.xyz](http://staticforms.xyz) - Integrate HTML forms easily without any server side code for free. After user submits the form an email will be sent to your registered address with form content.
    
* [stepFORM.io](http://stepFORM.io) - Quiz and Form Builder. Free plan has 5 forms, up to 3 steps per form, 50 responses per month.
    
* [Typeform.com](http://Typeform.com) — Include beautifully designed forms on websites. Free plan allows only 10 fields per form and 100 responses per month.
    
* [WaiverStevie.com](http://WaiverStevie.com) - Electronic Signature platform with a REST API. Receive notifications with webhooks. Free plan watermarks signed documents, but allows unlimited envelopes + signatures.
    
* [Web3Forms](https://web3forms.com/) - Contact forms for Static & JAMStack Websites without writing backend code. Free plan allows Unlimited Forms, Unlimited Domains & 250 Submissions per month.
    
* [WebAsk](https://webask.io/) - Survey and Form Builder. Free plan has 3 surveys per account, 100 responses per month, 10 elements per survey.
    
* [Wufoo](https://www.wufoo.com/) - Quick forms to use on websites. Free plan has a limit of 100 submissions each month.
    
* [formpost.app](http://formpost.app) - Free, unlimited Form to Email service. Setup custom redirect, auto response, webhooks etc for free.
    
* [Formester.com](http://Formester.com) - Share and embed unique-looking forms on your website—no limits on the number of forms created or features restricted by the plan. Get up to 100 submissions every month for free.
    
* [SimplePDF.eu](http://SimplePDF.eu) - Embed a PDF editor on your website and turn any PDF into a fillable form. Free plan allows unlimited PDFs with 3 submissions per PDF.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## CDN and Protection

* [bootstrapcdn.com](http://bootstrapcdn.com) — CDN for bootstrap, bootswatch and [fontawesome.io](http://fontawesome.io)
    
* [cdnjs.com](http://cdnjs.com) — Simple. Fast. Reliable. Content delivery at its finest. cdnjs is a free and open-source CDN service trusted by over 11% of all websites, powered by Cloudflare.
    
* [Cloudflare](https://www.cloudflare.com/)
    
    * CDN along with free SSL
        
    * Free DNS for unlimited number of domains
        
    * Firewall rules and pagerules
        
    * Analytics
        
    * Email forwarding
        
    * Free Unmetered Rate Limiting - 1 rule per domain
        
    * [Cloudflare Pages](https://pages.cloudflare.com/) — Free web hosting (JAMstack platform) for frontend developers to collaborate and deploy websites. 1 build at a time, 500 builds/month, unlimited sites, unlimited requests, unlimited bandwidth.
        
    * [Cloudflare Workers](https://workers.cloudflare.com/) — Deploy serverless code for free on Cloudflare's global network. 100,000 free requests per day with a [workers.dev](http://workers.dev) subdomain.
        
    * [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) - You can expose locally running HTTP port over a tunnel to a random subdomain on [trycloudflare.com](http://trycloudflare.com) use [Quick Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/run-tunnel/trycloudflare), No account required. More feature (TCP tunnel, Load balancing , VPN) in [Zero Trust](https://www.cloudflare.com/products/zero-trust/) Free Plan.
        
* [developers.google.com](http://developers.google.com) — The Google Hosted Libraries is a content distribution network for the most popular, Open Source JavaScript libraries
    
* [Stellate](https://stellate.co/) - Stellate is blazing fast, reliable CDN for your GraphQL API and Free for 2 services.
    
* [jsdelivr.com](http://jsdelivr.com) — A free, fast, and reliable CDN for open source. Supports npm, GitHub, WordPress, Deno, and more.
    
* [Microsoft Ajax](https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview) — The Microsoft Ajax CDN hosts popular third-party JavaScript libraries such as jQuery and enables you to easily add them to your Web application
    
* [ovh.ie](http://ovh.ie) — Free DDoS protection and SSL certificate
    
* [PageCDN.com](http://PageCDN.com) - Offers free Public CDN for everyone, and free Private CDN for opensource / nonprofits.
    
* [Skypack](https://www.skypack.dev/) — The 100% Native ES Module JavaScript CDN. Free for 1 million requests per domain, per month.
    
* [raw.githack.com](http://raw.githack.com) — A modern replacement of [**rawgit.com**](http://rawgit.com) which simply hosts file using Cloudflare
    
* [section.io](http://section.io) — A simple way to spin up and manage a complete Varnish Cache solution. Supposedly free forever for one site
    
* [statically.io](http://statically.io) — CDN for Git repos (GitHub, GitLab, Bitbucket), WordPress-related assets and images
    
* [toranproxy.com](http://toranproxy.com) — Proxy for Packagist and GitHub. Never fail CD. Free for personal use, 1 developer, no support
    
* [UNPKG](https://unpkg.com/) — CDN for everything on npm
    
* [weserv](https://images.weserv.nl/) — An image cache & resize service. Manipulate images on-the-fly with a worldwide cache.
    
* [Namecheap Supersonic](https://www.namecheap.com/supersonic-cdn/#free-plan) — Free DDoS protection
    
* [Gcore](https://gcorelabs.com/)
    
    * [CDN](https://gcorelabs.com/cdn/) — Global content delivery network, 1 TB and 1 million requests per month free.
        
    * [DNS Hosting](https://gcorelabs.com/dns/) — Free DNS hosting.
        

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## PaaS

* [anvil.works](http://anvil.works) - Web app development with nothing but Python. Free tier with unlimited apps, 30 second timeouts.
    
* [configure.it](http://configure.it) — Mobile app development platform, free for 2 projects, limited features but no resource limits
    
* [codenameone.com](http://codenameone.com) — Open source, cross platform, mobile app development toolchain for Java/Kotlin developers. Free for commercial use with unlimited number of projects
    
* [Cyclic](https://www.cyclic.sh/) - Fullstack app hosting - Push to Github for build and deploy of Javascript/Node.js apps. Includes: Authentication, Cron jobs, Custom Domains, Database, Storage and Streaming logs. Paid plans include: branch based environments, multi-regional deployments and increased limits.
    
* [Deno Deploy](https://deno.com/deploy) - Distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide. Free tier includes 100,000 requests per day and 100 GiB data transfer per month.
    
* [domcloud.co](http://domcloud.co) – Linux hosting service that also provides CI/CD with GitHub, SSH and MariaDB/Postgres database. Free version has 1 GB storage and 1 GB network/month limit and limited to a free domain.
    
* [encore.dev](http://encore.dev) — Backend framework using static analysis to provide automatic infrastructure, boilerplate free code, and more. Includes free cloud hosting for hobby projects.
    
* [gigalixir.com](http://gigalixir.com) - Gigalixir provide 1 free instance that never sleeps, and free-tier PostgreSQL database limited to 2 connections, 10, 000 rows and no backups, for Elixir/Phoenix apps.
    
* [Glitch](https://glitch.com/) — Free public hosting with features such as code sharing and real-time collaboration. Free plan has 1000 hours/month limit.
    
* [Krucible](https://usekrucible.com/) — Krucible is a platform for creating Kubernetes clusters for testing and development. Free tier accounts come with 25 cluster-hours per month.
    
* [Mendix](https://www.mendix.com/) — Rapid Application Development for Enterprises, unlimited number of free sandbox environments supporting unlimited users, 0.5 GB storage and 1 GB RAM per app. Also Studio and Studio Pro IDEs are allowed in free tier.
    
* [m3o.com](http://m3o.com) - A cloud platform for API services development. M3O is a fully managed Micro as a Service offering focusing on Go microservices development in the Cloud. Free tier provides enough to run 5 services and collaborate with others.
    
* [Okteto Cloud](https://okteto.com/) - Managed Kubernetes service designed for remote development. Free developer accounts come with 5 Kubernetes namespaces, 3Gi/pod with a maximum of 8Gi/namespace, 1CPU/pod with a maximum of 4CPUs/namespace and 5GB Disk space. The apps sleep after 24 hours of inactivity.
    
* [opeNode](https://openode.io/) — Free Node.js hosting for Open Source projects. 100 GB Bandwidth/month with 100 MB memory & 1000 MB storage. Deploy using CLI or existing Git repository.
    
* [pipedream.com](http://pipedream.com) - An integration platform built for developers. Develop any workflow, based on any trigger. Workflows are code, which you can run [for free](https://docs.pipedream.com/pricing/). No server or cloud resources to manage.
    
* [pythonanywhere.com](http://pythonanywhere.com) — Cloud Python app hosting. Beginner account is free, 1 Python web application at [your-username.pythonanywhere.com](http://your-username.pythonanywhere.com) domain, 512 MB private file storage, one MySQL database
    
* [Serverless Cloud](https://www.serverless.com/cloud) - Serverless Cloud lets you build Serverless APIs, DBs and Storage by using infrastrucure *from* code approach(no yaml, no infrastructure configuration). The product is provided by Serverless Inc. and currently under public preview.
    
* [fly.io](http://fly.io) - Fly is a platform for applications that need to run globally. It runs your code close to users and scales compute in cities where your app is busiest. Write your code, package it into a Docker image, deploy it to Fly's platform and let that do all the work to keep your app snappy. Free allowances include up to 3 shared-cpu-1x 256mb VMs, 3GB persistent volume storage (total) and 160GB outbound data transfer.
    
* [Divio](https://www.divio.com/) - A platform to manage cloud application deploying only using Docker. Available free subscription for development projects. Requires card and no custom domain support.
    
* [Koyeb](https://www.koyeb.com/) - Koyeb is a developer-friendly serverless platform to deploy apps globally. Seamlessly run Docker containers, web apps, and APIs with git-based deployment, native autoscaling, a global edge network, and built-in service mesh and discovery. Koyeb provides two nano services to run your apps with its forever-free tier and also sponsors open-source projects with free resources. The free plan requires card information.
    
* [Railway](https://railway.app/) - Railway is an infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud. 1GB Disk, 512 MB RAM, limited to $5 or 500 hours of usage monthly available for free.
    
* [Napkin](https://www.napkin.io/) - FaaS with 500Mb of memory, a default timeout of 15 seconds and 5,000 free API calls/month, rate-limited to 5 calls/second.
    
* [Meteor Cloud](https://www.meteor.com/cloud) — Galaxy hosting. Meteor's own platform-as-a-service for Meteor apps which includes a free MongoDB Shared Hosting and automatic SSL.
    
* [Northflank](https://northflank.com/) — Build and deploy microservices, jobs and managed databases with a powerful UI, API & CLI. Seamlessly scale containers from version control and external Docker registries. Free tier includes 2 services, 2 cron jobs and 1 database.
    
* [YepCode](https://yepcode.io/) - All-in-one platform to connect APIs and services in a serverless environment. It brings all the agility and benefits of NoCode tools, but with all the power of use programming languages. Free tier includes [1.000 yeps](https://yepcode.io/pricing/).
    
* [WayScript](https://www.wayscript.com/)\- WayScript is an [internal developer platform (IDP)](https://blog.wayscript.com/what-is-an-internal-developer-platform-idp/) that allows software engineers to self-serve secure, cloud based (Docker + k8s) developer environments at any time. Remove the need to get resources provisioned on a one off basis. Quickly build tools, apps, APIs, dashboards, schedule cron tasks and more. 100 hours of [free runtime per month](https://www.wayscript.com/pricing).
    
* [WunderGraph](https://cloud.wundergraph.com/) - An open source platform that allows you to quickly build, ship and manage modern APIs. Builtin CI/CD, GitHub integration, automatic HTTPS. Up to 3 projects, 1GB egress, 300 minutes of build time per month on the [free plan](https://wundergraph.com/pricing)
    
* [Doprax Cloud](https://www.doprax.com/) — Cloud hosting for your Apps, Websites and APIs. Free for one app, with 4 \* 256MB ram and 2 GB of disk.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## BaaS

* [Activepieces](https://www.activepieces.com/) - Build automation flows to connect several apps together in the backend of your app. For example, when an event fires in your app, send a Slack message or add a Google Sheet row. Free up to 5,000 tasks per month.
    
* [back4app.com](http://back4app.com) - Back4App is an easy-to-use, flexible and scalable backend based on Parse Platform.
    
* [backendless.com](http://backendless.com) — Mobile and Web Baas, with 1 GB file storage free, push notifications 50000/month, and 1000 data objects in table.
    
* [BMC Developer Program](https://developers.bmc.com/site/global/bmc_helix_platform/program/overview/index.gsp) — The BMC Developer Program provides documentation and resources to build and deploy digital innovations for your enterprise. Access to a comprehensive, personal sandbox which includes the platform, SDK, and a library of components that can be used to build and tailor apps.
    
* [convex.dev](http://convex.dev) - Reactive backend as a service, hosting your data (documents with relationships & serializable ACID transactions), serverless functions, and websockets to stream updates to various clients. Free for small projects - up to 1M records, 5M function calls per month.
    
* [darklang.com](http://darklang.com) - Hosted language combined with editor and infrastructure. Free during the beta, generous free tier planned after beta.
    
* [Firebase](https://firebase.com/) — Firebase helps you build and run successful apps. Free Spark Plan offers Authentication, Hosting, Firebase ML , Realtime Database,Cloud Storage,Testlab. A/B Testing, Analytics, App Distribution, App Indexing, Cloud Messaging (FCM), Crashlytics, Dynamic Links, In-App Messaging, Performance Monitoring, Predictions, and Remote Config are always-free.
    
* [Flutter Flow](https://flutterflow.io/) — Build your Flutter App UI without writing a single line of code. Also has a Firebase integration. Free plan includes full access to UI Builder and Free templates.
    
* [getstream.io](http://getstream.io) — Build scalable newsfeeds, activity streams, chat and messaging in a few hours instead of weeks
    
* [hasura.io](http://hasura.io) — Hasura extends your existing databases wherever it is hosted and provides an instant GraphQL API that can be securely accessed for web, mobile, and data integration workloads. Free for 1GB/month of data pass-through.
    
* [iron.io](http://iron.io) — Async task processing (like AWS Lambda) with free tier and 1-month free trial
    
* [nhost.io](http://nhost.io) - Serverless backend for web and mobile apps. Free plan includes: PostgreSQL, GraphQL (Hasura), Authentication, Storage, and Serverless Functions.
    
* [nudge-hook.net](http://nudge-hook.net) — Job Scheduling API (with swagger/openapi client). Allows you to schedule as many adhoc/cron/periodic webhook deliveries as you like. Free for everyone (no signup required), but infinite schedules are limited to 500 'nudges' max. Accepts donations.
    
* [onesignal.com](http://onesignal.com) — Unlimited free push notifications
    
* [paraio.com](http://paraio.com) — Backend service API with flexible authentication, full-text search and caching. Free for 1 app, 1GB app data.
    
* [progress.com](http://progress.com) — Mobile backend, starter plan has unlimited requests/second, with 1 GB of data storage. Enterprise application support
    
* [pubnub.com](http://pubnub.com) — Free push notifications for up to 1 million messages/month and 100 active daily devices
    
* [pushbots.com](http://pushbots.com) — Push notification service. Free for up to 1.5 million pushes/month
    
* [pushcrew.com](http://pushcrew.com) — Push notification service. Unlimited notifications up to 2000 Subscribers
    
* [pusher.com](http://pusher.com) — Free, unlimited push notifications for 2000 monthly active users. A single API for iOS and Android devices.
    
* [engagespot.co](http://engagespot.co) — Notification infrastructure for developers. Free for upto 100 monthly active users.
    
* [pushtechnology.com](http://pushtechnology.com) — Real-time Messaging for browsers, smartphones and everyone. 100 concurrent connections. Free 10 GB data/month
    
* [quickblox.com](http://quickblox.com) — A communication backend for instant messaging, video and voice calling and push notifications
    
* [restspace.io](http://restspace.io) - Configure a server with services for auth, data, files, email API, templates etc, then compose into pipelines and transform data.
    
* [Salesforce Developer Program](https://developer.salesforce.com/signup) — Build apps Lightning fast with drag and drop tools. Customize your data model with clicks. Go further with Apex code. Integrate with anything using powerful APIs. Stay protected with enterprise-grade security. Customize UI with clicks or any leading-edge web framework. Free Developer Program gives access to the full Lightining Platform.
    
* [ServiceNow Developer Program](https://developer.servicenow.com/) — Rapidly build, test, and deploy applications that make work better for your organization. Free Instance & access early previews.
    
* [simperium.com](http://simperium.com) — Move data everywhere instantly and automatically, multi-platform, unlimited sending and storage of structured data, max. 2,500 users/month
    
* [stackstorm.com](http://stackstorm.com) — Event-driven automation for apps, services and workflows, free without flow, access control, LDAP,...
    
* [streamdata.io](http://streamdata.io) — Turns any REST API into an event-driven streaming API. Free plan up to 1 million messages and 10 concurrent connections.
    
* [Supabase](https://supabase.com/) — The Open Source Firebase Alternative to build backends. Free Plan offers Authentication, Realtime Database & Object Storage.
    
* [tyk.io](http://tyk.io) — API management with authentication, quotas, monitoring and analytics. Free cloud offering
    
* [zapier.com](http://zapier.com) — Connect the apps you use, to automate tasks. 5 zaps, every 15 minutes and 100 tasks/month
    
* [LeanCloud](https://leancloud.app/) — Mobile backend. 1GB of data storage, 256MB instance, 3K API requests/day, 10K pushes/day are free. (API is very similar to Parse Platform)
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Low-code Platform

* [BudiBase](https://budibase.com/) — Budibase is an open-source low-code platform for creating internal apps in minutes. Supports PostgreSQL, MySQL, MSSQL, MongoDB, Rest API, Docker, K8s
    
* [appsmith](https://www.appsmith.com/) — Low code project to build admin panels, internal tools, and dashboards. Integrates with 15+ databases and any API.
    
* [ToolJet](https://www.tooljet.com/) — Extensible low-code framework for building business applications. Connect to databases, cloud storages, GraphQL, API endpoints, Airtable, etc and build apps using drag and drop application builder.
    
* [ReTool](https://retool.com/) — Low-code platform for building internal applications. Retool is highly hackable. If you can write it with JavaScript and an API, you can build it in Retool. The free tier allows up to five users per month, unlimited apps and API connections.
    
* [DronaHQ](https://www.dronahq.com/) — DronaHQ - a low code platform helps engineering teams and product managers to build internal tools, custom user journeys, digital experiences, automations, custom admin panels, operational apps 10X faster.
    
* [ILLA Cloud](https://www.illacloud.com/) — ILLA Cloud - A robust open source low-code platform for developers to build internal tools. By using ILLA's library of Components and Actions, developers can save massive amounts of time on building tools. Free for 5 team members.
    
* [outsystems.com](http://outsystems.com) — Enterprise web development PaaS for on-premise or cloud, free "personal environment" offering allows for unlimited code and up to 1 GB database
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Web Hosting

* [Alwaysdata](https://www.alwaysdata.com/) — 100 MB free web hosting with support for MySQL, PostgreSQL, CouchDB, MongoDB, PHP, Python, Ruby, Node.js, Elixir, Java, Deno, custom web servers, access via FTP, WebDAV and SSH; mailbox, mailing list and app installer included.
    
* [Awardspace.com](http://Awardspace.com) — Free web hosting + a free short domain, PHP, MySQL, App Installer, Email Sending & No Ads.
    
* [Bubble](https://bubble.io/) — Visual programming to build web and mobile apps without code, free with Bubble branding.
    
* [Deploy Now](https://deploynow.space/) — Deploy smarter. Deploy faster. Deploy Now. - Deploy up to 3 web projects from your GitHub repository for free.
    
* [DigitalOcean](https://www.digitalocean.com/pricing) - Build and deploy 3 static sites for free on the App Platform Starter tier.
    
* [Drive To Web](https://drv.tw/) — Host directly to the web from Google Drive & OneDrive. Static sites only. Free forever. One site per Google/Microsoft account.
    
* [DuckDocs](https://duckdocs.com/) - Markdown-powered documentation hosting, sort of like a hosted Docusaurus. Free for 10 pages per site.
    
* [Fenix Web Server](https://preview.fenixwebserver.com/) - A developer desktop app for hosting sites locally and sharing them publically (in realtime). Work however you like, using its beautiful user interface, API, and/or CLI.
    
* [Free Hosting](https://freehostingnoads.net/) — Free Hosting With PHP 5, Perl, CGI, MySQL, FTP, File Manager, POP E-Mail, free sub-domains, free domain hosting, DNS Zone Editor, Web Site Statistics, FREE Online Support and many more features not offered by other free hosts.
    
* [Freehostia](https://www.freehostia.com/) — FreeHostia offers free hosting services incl. an industry-best Control Panel & a 1-click installation of 50+ free apps. Instant setup. No forced ads.
    
* [Neocities](https://neocities.org/) — Static, 1 GB free storage with 200 GB Bandwidth.
    
* [Netlify](https://www.netlify.com/) — Builds, deploy and hosts static site/app free for, 100 GB data and 100 GB/month bandwidth.
    
* [pantheon.io](http://pantheon.io) — Drupal and WordPress hosting, automated DevOps and scalable infrastructure. Free for developers and agencies. No custom domain.
    
* [readthedocs.org](http://readthedocs.org) — Free documentation hosting with versioning, PDF generation and more
    
* [render.com](http://render.com) — Unified cloud to build and run apps and sites with free SSL, a global CDN, private networks, auto-deploys from Git, and completely free plans for web services, databases, and static web pages.
    
* [SourceForge](https://sourceforge.net/) — Find, Create and Publish Open Source software for free
    
* [Stormkit](https://stormkit.io/) — Integrate building, deploying and hosting seamlessly with your git flow of your JAMStack or Node.JS app. 50 GB bandwith and 10m requests for free per month including free SSL.
    
* [surge.sh](http://surge.sh) — Static web publishing for Front-End developers. Unlimited sites with custom domain support
    
* [tilda.cc](http://tilda.cc) — One site, 50 pages, 50 MB storage, only the main pre-defined blocks among 170+ available, no fonts, no favicon and no custom domain
    
* [txti.es](http://txti.es) — Quickly create web pages with markdown.
    
* [Vercel](https://vercel.com/) — Build, deploy, and host web apps with free SSL, global CDN, and unique Preview URLs each time you `git push`. Perfect for Next.js and other Static Site Generators.
    
* [Versoly](https://versoly.com/) — SaaS focussed website builder - unlimited websites, 70+ blocks, 5 templates, custom CSS, favicon, SEO and forms. No custom domain.
    
* [Qoddi](https://qoddi.com/) - PaaS service similar to Heroku with a developer-centric approach and all inclusive features. Free tier for static assets, staging and developer apps.
    
* [FreeFlarum](https://freeflarum.com/) - Community powered free Flarum hosting for up to 250 users (donate to remove watermark from footer).
    
* [fleek.co](http://fleek.co) - Build modern sites and apps on the Open Web and its protocols seamlessly free for, unlimited websites and 50 GB/month bandwidth.
    
* [MDB GO](https://mdbgo.com/) - Free hosting for 1 project with 2 weeks Container TTL, 500mb RAM per project, SFTP - 1G disk space.
    
* [Patr Cloud](https://patr.cloud/) — An easy-to-use cloud platform, among its paid services it offers hosting 3 static sites for free.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## DNS

* [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/) - Free public DNS Resolver which is fast and secure (encrypt your DNS query), provided by CloudFlare. Useful to bypass your internet provider's DNS blocking, prevent DNS query spying, and [to block adult & malware content](https://developers.cloudflare.com/1.1.1.1/1.1.1.1-for-families). Can also be used [via API](https://developers.cloudflare.com/1.1.1.1/encrypted-dns/dns-over-https/make-api-requests). Note: Just a DNS resolver, not a DNS hoster.
    
* [1984.is](http://1984.is) — Free DNS service with API, and lots of other free DNS features included.
    
* [cloudns.net](http://cloudns.net) — Free DNS hosting up to 1 domain with 50 records
    
* [dns.he.net](http://dns.he.net) — Free DNS hosting service with Dynamic DNS Support
    
* [dnspod.com](http://dnspod.com) — Free DNS hosting.
    
* [duckdns.org](http://duckdns.org) — Free DDNS with up to 5 domains on the free tier. With configuration guides for various setups.
    
* [freedns.afraid.org](http://freedns.afraid.org) — Free DNS hosting. Also provide free subdomain based on numerous public user [contributed domains](https://freedns.afraid.org/domain/registry/). Get free subdomains from "Subdomains" menu after signing up.
    
* [luadns.com](http://luadns.com) — Free DNS hosting, 3 domains, all features with reasonable limits
    
* [namecheap.com](http://namecheap.com) — Free DNS. No limit on number of domains
    
* [nextdns.io](http://nextdns.io) - DNS based firewall, 300K free queries monthly
    
* [noip](https://www.noip.com/) — a dynamic dns service that allows up to 3 hostnames free with confirmation every 30 days
    
* [ns1.com](http://ns1.com) — Data Driven DNS, automatic traffic management, 500k free queries
    
* [nsupdate.info](http://nsupdate.info) — Free and open-source Dynamic DNS service
    
* [sslip.io](http://sslip.io) — Free DNS service that when queried with a hostname with an embedded IP address returns that IP address.
    
* [zilore.com](http://zilore.com) — Free DNS hosting, free for 5 domains.
    
* [zoneedit.com](http://zoneedit.com) — Free DNS hosting with Dynamic DNS Support.
    
* [zonewatcher.com](http://zonewatcher.com) — Automatic backups and DNS change monitoring. 1 domain free
    
* [huaweicloud.com](http://huaweicloud.com) – Free DNS hosting by Huawei
    
* [Hetzner](https://www.hetzner.com/dns-console) – Free DNS hosting from Hetzner with API support.
    
* [Glauca](https://docs.glauca.digital/hexdns/) – Free DNS hosting for up to 3 domains and DNSSEC support
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Domain

* [Freenom](https://freenom.com/) — Free .tk,.ml,.ga,.cf and .gq domain.
    
* [eu.org](http://eu.org) — Free [eu.org](http://eu.org) domain. Request is usually approved in 14 days.
    
* [pp.ua](http://pp.ua) — Free [pp.ua](http://pp.ua) subdomains.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## IaaS

* [backblaze.com](http://backblaze.com) — Backblaze B2 cloud storage. Free 10 GB (Amazon S3-like) object storage for unlimited time
    
* [filebase.com](http://filebase.com) - S3 Compatible Object Storage Powered by Blockchain. 5 GB free storage for unlimited duration.
    
* [scaleway](https://www.scaleway.com/en/object-storage/) — S3-Compatible Object Storage. Free 75 GB storage and external outgoing traffic.
    
* [Storj](https://storj.io/) — Decentralised Private Cloud Storage for Apps and Developers. Free plan provides 1 Project, 150 GB storage, 150 GB bandwidth per month.
    
* [Tebi](https://tebi.io/) - S3 compatibility object [storage.Free](http://storage.Free) 25 GB storage and 250GB outbound transfer.
    
* [Idrive e2](https://www.idrive.com/e2/) - S3 compatibility object storage. 10 GB free storage and 10 GB download bandwidth per month.
    
* [C2 Object Storage](https://c2.synology.com/en-us/pricing/object-storage) - S3 compatibility object storage. 15 GB free storage and 15 GB download per month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## DBaaS

* [airtable.com](http://airtable.com) — Looks like a spreadsheet, but it's a relational database, unlimited bases, 1,200 rows/base and 1,000 API requests/month
    
* [Astra](https://www.datastax.com/products/datastax-astra/) — Cloud Native Cassandra as a Service with [80GB free tier](https://www.datastax.com/products/datastax-astra/pricing)
    
* [bit.io](http://bit.io) — Managed PostgreSQL database service. 3 database, 3GB storage per database, 1 CPU and 1GB Memory (burst), 1B rows queried per month
    
* [codehooks.io](http://codehooks.io) — JavaScript serverless API/backend and database service with functions, Mongdb-ish queries, key/value lookups, a job system and a message queue. 1 instance free per project, 5000 records and 5000 calls/month free, 3 developers included. No credit-card required.
    
* [CrateDB](https://crate.io/) - Distributed Open Source SQL database for real-time analytics. [Free Tier CRFREE](https://crate.io/lp-crfree): One-node with 2 CPUs, 2 GiB of memory, 8 GiB of storage. 1 cluster per organization, no payment method needed.
    
* [elephantsql.com](http://elephantsql.com) — PostgreSQL as a service, 20 MB free
    
* [FaunaDB](https://fauna.com/) — Serverless cloud database, with native GraphQL, multi-model access and daily free tiers up to 100 MB
    
* [HarperDb](https://harperdb.io/) — Serverless cloud database, with dynamic schema based on JSON, 3000 IOPS with 1GB storage
    
* [Upstash](https://upstash.com/) — Serverless Redis with free tier up to 10,000 requests per day, 256MB max database size, and 20 concurrent connections
    
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — free tier gives 512 MB
    
* [redsmin.com](http://redsmin.com) — Online real-time monitoring and administration service for Redis, Monitoring for 1 Redis instance free
    
* [redislabs](https://redislabs.com/try-free/) - Free 30MB redis instance
    
* [MemCachier](https://www.memcachier.com/) — Managed Memcache service. Free for up to 25MB, 1 Proxy Server and basic analytics
    
* [scalingo.com](http://scalingo.com) — Primarily a PaaS but offers a 128MB to 192MB free tier of MySQL, PostgreSQL or MongoDB
    
* [SeaTable](https://seatable.io/) — Flexible, Spreadsheet-like Database built by Seafile team. unlimited tables, 2,000 lines, 1-month versioning, up to 25 team members.
    
* [skyvia.com](http://skyvia.com) — Cloud Data Platform, offers free tier and all plans are completely free while in beta
    
* [StackBy](https://stackby.com/) — One tool that brings together flexibility of spreadsheets, power of databases and built-in integrations with your favorite business apps. Free plan includes unlimited users, 10 stacks, 2GB attachment per stack.
    
* [TiDB Cloud](https://en.pingcap.com/tidb-cloud/) — TiDB is an open source MySQL compatible distributed HTAP RDBMS. TiDB Cloud provides one-year free Developer Tier, 500 MiB of OLTP storage, and 500 MiB of OLAP Storage.
    
* [Turso by ChiselStrike](https://chiselstrike.com/) - Turso is SQLite Developer Experience in an Edge Database. Turso provides Free Forever starter plan, 8 GB of total storage, Up to 3 databases, Up to 3 locations, 1 billion row reads per month, and Local development support with SQLite.
    
* [InfluxDB](https://www.influxdata.com/) — Timeseries database, free up to 3MB/5 minutes writes, 30MB/5 minutes reads and 10,000 cardinalities series
    
* [restdb.io](http://restdb.io) - a fast and simple NoSQL cloud database service. With [restdb.io](http://restdb.io) you get schema, relations, automatic REST API (with MongoDB-like queries) and an efficient multi-user admin UI for working with data. Free plan allows 3 users, 2500 records and 1 API requests per second.
    
* [cockroachlabs.com](http://cockroachlabs.com) — Free CockroachDB up to 5GB and 1vCPU (limited [request units](https://www.cockroachlabs.com/docs/cockroachcloud/serverless-faqs.html#what-are-the-usage-limits-of-cockroachdb-serverless-beta))
    
* [Neo4j Aura](https://neo4j.com/cloud/aura/) — Managed native Graph DBMS / analytics platform with a Cypher query language and a REST API. Limits on graph size (50k nodes, 175k relationships).
    
* [Neon](https://neon.tech/) — Managed PostgreSQL, 10 branches, 3 GB of storage per branch, no limit on Active time for the primary branch compute, 100 hours of Active time per month (total) for non-primary branch computes.
    
* [Dgraph Cloud](https://cloud.dgraph.io/pricing?type=free) — Managed native Graph DBMS with a GraphQL API. Limited to 1 MB data transfer per day.
    
* [Tinybird](https://tinybird.co/) - A serverless managed ClickHouse with connection-less data ingest over HTTP and let's you publish SQL queries as managed HTTP APIs. No time limit on free-tier, 10GB storage + 1000 API requests per day.
    
* [TigerGraph Cloud](https://www.tigergraph.com/cloud/) — Managed native Graph DBMS / analytics platform with a SQL-like graph query language and a REST API. One free instance with 2 vCPU, 8GB Memory, and 50GB storage that sleeps after 1 hour of inactivity.
    
* [TerminusCMS](https://terminusdb.com/pricing) — Managed free service for TerminusDB, a document and graph database written in Prolog and Rust. Free for dev, paid service for enterprise deployments and support.
    
* [Macrometa](https://www.macrometa.com/) - a noSQL database, Pub/Sub, event processing, and serverless edge computing platform for building geo-distributed and real-time applications. Free dev account gives access to 10,000 Operations/Day & 200MB Storage.
    
* [Planetscale](https://planetscale.com/) - PlanetScale is a MySQL compatible, serverless database platform powered by Vitess, 1 databases for free with 1 Production branch and 1 Development branch, 5GB storage, 1 Billion rows read/mo per database, and 10 Million rows written/mo per database.
    
* [YugabyteDB](https://cloud.yugabyte.com/) - YugabyteDB is a distributed SQL database compatible with PostgreSQL. The cloud free tier is a 2 vCPU, 4GB RAM, 10GB Disk.
    
* [filess.io](http://filess.io) - [filess.io](http://filess.io) is a platform where you can create 1 database of the following DBMS for free: MySQL, MariaDB, MongoDB, PostgreSQL.
    
* [xata.io](http://xata.io) - Xata is a serverless database with built-in powerful search and analytics. One API, multiple type-safe client libraries, and optimized for your development workflow. Free-forever tier is sufficient for hobby developers which comes with 3 units of Xata, please refer to website for unit definition.
    
* [8base.com](http://8base.com) - 8base is a full-stack low-code development platform built for JavaScript developers built on top of MySQL and GraphQL and serverless backend-as-a-service, it allows you to start building web applications quicky using a UI app builder and scale easily, Free tier includes: rows: 2,500, Storage: 500Mb, Serverless computing: 1Gb/h, client app users: 5.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Tunneling, WebRTC, Web Socket Servers and Other Routers

* [conveyor.cloud](http://conveyor.cloud) — Visual Studio extension to expose IIS Express to the local network or over a tunnel to a public URL.
    
* [Hamachi](https://www.vpn.net/) — LogMeIn Hamachi is a hosted VPN service that lets you securely extend LAN-like networks to distributed teams with free plan allows unlimited networks with up to 5 peoples
    
* [localhost.run](http://localhost.run) — Expose locally running servers over a tunnel to a public URL.
    
* [localtunnel](https://theboroer.github.io/localtunnel-www/) — Expose locally running servers over a tunnel to a public URL. Free hosted version, and [open source](https://github.com/localtunnel/localtunnel).
    
* [ngrok.com](http://ngrok.com) — Expose locally running servers over a tunnel to a public URL.
    
* [Radmin VPN](https://www.radmin-vpn.com/) — Connect multiple computers together via a VPN enabling LAN-like networks. Unlimited peers. (Hamachi alternative)
    
* [segment.com](http://segment.com) — Hub to translate and route events to other third-party services. 100,000 events/month free
    
* [STUN](https://en.wikipedia.org/wiki/STUN) — Session Traversal of User Datagram Protocol \[UDP\] Through Network Address Translators \[NATs\])
    
    * Google STUN — stun:[stun.l.google.com:19302](http://stun.l.google.com:19302)
        
    * Twilio STUN — stun:[global.stun.twilio.com:3478](http://global.stun.twilio.com:3478)?transport=udp
        
* [Tailscale](https://tailscale.com/) — Zero config VPN, using the open source WireGuard protocol. Installs on MacOS, iOS, Windows, Linux, and Android devices. Free plan for personal use with 100 devices and 3 user.
    
* [webhookrelay.com](http://webhookrelay.com) — Manage, debug, fan-out and proxy all your webhooks to public or internal (ie: [localhost](http://localhost)) destinations. Also, expose servers running in a private network over a tunnel by getting a public HTTP endpoint ([`https://yoursubdomain.webrelay.io`](https://yoursubdomain.webrelay.io) `<---->` [`http://localhost:8080`](http://localhost:8080)).
    
* [Hookdeck](https://hookdeck.com/pricing) — Develop, test and monitor your webhooks from a single place. 100K requests and 100K attempts per month with 3 days retention.
    
* [Xirsys](https://www.xirsys.com/pricing/) — Unlimited STUN usage + 500 MB monthly TURN bandwidth, capped bandwidth, single geographic region.
    
* [ZeroTier](https://www.zerotier.com/) — FOSS managed virtual Ethernet as a service. Unlimited end-to-end encrypted networks of 25 clients on free plan. Clients for desktop/mobile/NA; web interface for configuration of custom routing rules and approval of new client nodes on private networks
    
* [LocalXpose](https://localxpose.io/) — Reverse proxy that enables you to expose your [localhost](http://localhost) servers to the internet. Free plan has 15 minutes tunnel life time.
    
* [Traefik-Hub](https://traefik.io/traefik-hub/) - Publish locally running services over a tunnel to a public custom URL and secure them with access control. Free for 5 services in one cluster.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Issue Tracking and Project Management

* [acunote.com](http://acunote.com) — Free project management and SCRUM software for up to 5 team members
    
* [asana.com](http://asana.com) — Free for private project with collaborators
    
* [Backlog](https://backlog.com/) — Everything your team needs to release great projects in one platform. Free plan offers 1 Project with 10 users & 100MB storage.
    
* [Basecamp](https://basecamp.com/personal) - To-do lists, milestone management, forum-like messaging, file sharing, and time tracking. Up to 3 projects, 20 users, and 1GB of storage space.
    
* [bitrix24.com](http://bitrix24.com) — Intranet and project management tool. Free plan has 5GB for unlimited users.
    
* [cacoo.com](http://cacoo.com) — Online diagrams in real-time: flowchart, UML, network. Free max. 15 users/diagram, 25 sheets
    
* [Chpokify](https://chpokify.com/) — Teams based Planning Poker that saves time of sprint estimation. Free up to 5 users, free Jira integrations, unlimited video calls, unlimited teams, unlimited sessions.
    
* [clickup.com](http://clickup.com) — Project management. Free, premium version with cloud storage. Mobile applications and Git integrations available
    
* [Clockify](https://clockify.me/) - Time tracker and timesheet app that lets you track work hours across projects. Unlimited users, free forever.
    
* [Cloudcraft](https://cloudcraft.co/) — Design a professional architecture diagram in minutes with the Cloudcraft visual designer, optimized for AWS with smart components that show live data too. Free plan has unlimited private diagrams for single user.
    
* [Codegiant](https://codegiant.io/) — Project Management with Repository hosting & CI/CD. Free Plan Offers Unlimited Repositories,Projects & Documents with 5 Team Members. 500 CI/CD minutes per month. 30000 Serverless Code Run minutes per month.1GB repository storage.
    
* [Confluence](https://www.atlassian.com/software/confluence) - Atlassian's content collaboration tool used to help teams collaborate and share knowledge efficiently. Free plan up to 10 users.
    
* [contriber.com](http://contriber.com) — Customizable project management platform, free starter plan, 5 workspaces
    
* [diagrams.net](http://diagrams.net) — Online diagrams stored locally, in Google Drive, OneDrive or Dropbox. Free for all features and storage levels
    
* [freedcamp.com](http://freedcamp.com) - tasks, discussions, milestones, time tracking, calendar, files and password manager. Free plan with unlimited projects, users and files storage.
    
* [easyretro.io](http://easyretro.io) — Simple and intuitive sprint retrospective tool. Free plan has 3 public boards and 1 survey per board per month.
    
* [GForge](https://gforge.com/) — Project Management & Issue Tracking toolset for complex projects with self-premises and SaaS options. SaaS free plan offers first 5 users free & free for Open Source Projects.
    
* [gleek.io](http://gleek.io) — Free description-to-diagrams tool for developers. Create informal, UML class, object, or entity-relationship diagrams using your keyword.
    
* [GraphQL Inspector](https://github.com/marketplace/graphql-inspector) - GraphQL Inspector ouputs a list of changes between two GraphQL schemas. Every change is precisely explained and marked as breaking, non-breaking or dangerous.
    
* [huboard.com](http://huboard.com) — Instant project management for your GitHub issues, free for Open Source
    
* [Hygger](https://hygger.io/) — Project management platform. Free plan offers unlimited users,projects & boards with 100 MB Storage.
    
* [Instabug](https://instabug.com/) — A comprehensive bug reporting and in-app feedback SDK for mobile apps. Free plan up to 1 app and 1 member.
    
* [Ilograph](https://www.ilograph.com/) — interactive diagrams that allow users to see their infrastructure from multiple perspectives and levels of detail. Diagrams can be expressed in code. Free tier has unlimited private diagrams with up to 3 viewers.
    
* [Issue Embed](https://issueembed.dev/) - A bug reporting tool for websites to go directly into your Github Issues. Free plan for personal repositories with up to 500 issues/month and 10,000 page views/month.
    
* [Jira](https://www.atlassian.com/software/jira) — Advanced software development project management tool used in many corporate environments. Free plan up to 10 users.
    
* [kanbanflow.com](http://kanbanflow.com) — Board-based project management. Free, premium version with more options
    
* [kanbantool.com](http://kanbantool.com) — Kanban board-based project management. Free plan has 2 boards, 2 users, without atachments or files.
    
* [Kitemaker.co](http://Kitemaker.co) - Collaborate through all phases of the product development process and keep track of work across Slack, Discord, Figma, and Github. Unlimited users, unlimited spaces. Free plan up to 250 work items.
    
* [Kiter.app](http://Kiter.app) - Let's anyone organize their job search and keep track of interviews, opportunities, and connections. Powerful web app and chrome extension. Completely free.
    
* [Kumu.io](http://Kumu.io) — Relationship maps with animation, decorations, filters, clustering, spreadsheet imports and more. Free tier allows unlimited public projects. Graph size unlimited. Free private projects for students. Sandbox mode is available if you prefer to not leave your file publicly online (upload, edit, download, discard).
    
* [Linear](https://linear.app/) — Issue tracker with streamlined interface. Free for unlimited members, up to 10MB file upload size, 250 issues (excluding Archive)
    
* [Lucidchart](https://www.lucidchart.com/) - A online diagram tools with collaboration features. Free plan with 3 editable documents, 100 professional templates and basic collaboration features.
    
* [MeisterTask](https://www.meistertask.com/) — Online task management for teams. Free up to 3 projects, unlimited project members.
    
* [MeuScrum](https://www.meuscrum.com/en) - Free online scrum tool with kanban board
    
* [nTask](https://www.ntaskmanager.com/) — Project management software that enables your teams tn collaborate, plan, analyze and manage everyday tasks. Basic Plan free forever with 100 MB storage, 5 users/team. Unlimited workspaces, meetings,tasks, timesheets and issue tracking.
    
* [Ora](https://ora.pm/) - Agile task management & team collaboration. Free for up to 3 users and files are limited to 10 MB.
    
* [pivotaltracker.com](http://pivotaltracker.com) — Free for unlimited public projects and two private projects with 3 total active users (read-write) and unlimited passive users (read-only).
    
* [Plaky](https://plaky.com/) - Free task management (kanban) software without any limits. Unlimited users, unlimited projects, free forever.
    
* [plan.io](http://plan.io) — Project Management with Repository Hosting and more options. Free for 2 users with 10 customers and 500MB Storage
    
* [Plane](https://plane.so/) - Plane is a simple, extensible, open source project and product management tool. Free for unlimited members, up to 5MB file upload size, 1000 issues.
    
* [planitpoker.com](http://planitpoker.com) — Free online planning poker (estimation tool)
    
* [point.poker](http://point.poker) - Online Planning Poker (consensus-based estimation tool). Free for unlimited users, teams, sessions, rounds and votes. No registration required.
    
* [ScrumFast](https://www.scrumfast.com/) - Scrum board with a very intuitive interface, free up to 5 users.
    
* [Shake](https://www.shakebugs.com/) - In-app bug reporting and feedback tool for mobile apps. Free plan, 10 bug reports per app/per month.
    
* [Shortcut](https://shortcut.com/) - Project management platform. Free for up to 10 users forever.
    
* [SpeedBoard](https://speedboard.app/) - Board for Agile and Scrum retrospectives - Free.
    
* [SuperPM](https://superpm.app/) - Versatile project management platform. Free for up to 3 projects, unlimited users, 1 GB storage.
    
* [Tadum](https://tadum.app/) - Meeting agenda and minutes app designed for recurring meetings, free for teams up to 10
    
* [taiga.io](http://taiga.io) — Project management platform for startups and agile developers, free for Open Source
    
* [Tara AI](https://tara.ai/) — Simple sprint management service. Free plan has unlimited tasks, sprints and workspaces, with no user limits.
    
* [targetprocess.com](http://targetprocess.com) — Visual project management, from Kanban and Scrum to almost any operational process. Free for unlimited users, up to 1,000 data entities {[more details](https://www.targetprocess.com/pricing/)}
    
* [taskade.com](http://taskade.com) — Real-time collaborative task lists and outlines for teams. Free plan has: 1 workspace with unlimited tasks and projects; 1GB file storage; 1 week project history; 5 attendees per video meeting.
    
* [taskulu.com](http://taskulu.com) — Role based project management. Free up to 5 users. Integration with GitHub/Trello/Dropbox/Google Drive
    
* [teamwork.com](http://teamwork.com) — Project management & Team Chat. Free for 5 users and 2 projects. Premium plans available.
    
* [teleretro.com](http://teleretro.com) — Simple and fun retrospective tool with icebreakers, gifs and emojis. Free plan includes 3 retros and unlimited members.
    
* [testlio.com](http://testlio.com) — Issue tracking, test management and beta testing platform. Free for private use
    
* [terrastruct.com](http://terrastruct.com) — Online diagram maker specifically for software architecture. Free tier up to 4 layers per diagram.
    
* [todoist.com](http://todoist.com) — Collaborative and individual task management. Free plan has: 5 active projects, 5 users in project, file uploading up to 5MB, 3 filters, 1 week activity history.
    
* [trello.com](http://trello.com) — Board-based project management. Unlimited Personal Boards, 10 Team Boards.
    
* [Tweek](https://tweek.so/) — Simple Weekly To-Do Calendar & Task Management.
    
* [ubertesters.com](http://ubertesters.com) — Test platform, integration and crowdtesters, 2 projects, 5 members
    
* [vabotu](https://vabotu.com/) - A collaborative tool for project management. Free and other plans are available. The Freelance plan is for 10 users, include messaging, task-boards, 5GB online storage, workspaces, export data.
    
* [Wikifactory](https://wikifactory.com/) — Product designing Service with Projects, VCS & Issues. Free plan offers unlimited projects & collaborators and 3GB storage.
    
* [Yodiz](https://www.yodiz.com/) — Agile development and issue tracking. Free up to 3 users, unlimited projects.
    
* [YouTrack](https://www.jetbrains.com/youtrack/buy/#edition=incloud) — Free hosted YouTrack (InCloud) for FOSS projects, private projects (free for 3 users). Includes time tracking and agile boards
    
* [zenhub.com](http://zenhub.com) — The only project management solution inside GitHub. Free for public repos, OSS and nonprofit organizations
    
* [zenkit.com](http://zenkit.com) — Project management and collaboration tool. Free for up to 5 members, 5 GB attachments.
    
* [Zube](https://zube.io/) — Project management with free plan for 4 Projects & 4 users. GitHub integration available.
    
* [Toggl](https://toggl.com/) — Provides 2 free productivity tools. [Toggl Track](https://toggl.com/track/) for time management and tracking app with a free plan provides seamless time tracking and reporting designed for freelancers in mind. It has unlimited tracking records, projects, clients, tags, reporting and more. And [Toggl Plan](https://toggl.com/plan/) for task planning that comes with a free plan for solo developers with unlimited tasks, milestones and timelines.
    
* [Sflow](https://sflow.io/) — [sflow.io](http://sflow.io) is a project management tool that is built for software agile development, marketing, sales, and customer support, especially for outsourcing project and cross-organization collaboration project. Free plan up to 3 projects and 5 members.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Storage and Media Processing

* [AndroidFileHost](https://androidfilehost.com/) - Free file sharing platform with unlimited speed, bandwidth, file count, download count, etc. Mainly aimed for Android dev related files like APK build, custom ROM & modifications, etc. But seems to accept any other files as well.
    
* [borgbase.com](http://borgbase.com) — Simple and secure offsite backup hosting for Borg Backup. 10 GB free backup space and 2 repositories.
    
* [icedrive.net](http://icedrive.net) - Simple cloud storage service. 10 GB free storage
    
* [sync.com](http://sync.com) - End-to-End cloud storage service. 5 GB free storage
    
* [pcloud.com](http://pcloud.com) - Cloud storage service. Up to 10 GB free storage
    
* [sirv.com](http://sirv.com) — Smart Image CDN with on-the-fly image optimization and resizing. Free tier includes 500 MB of storage and 2 GB bandwidth.
    
* [cloudimage.com](http://cloudimage.com) — Full image optimization and CDN service with 1500+ Points of Presence around the world. A variety of image resizing, compression, watermarking functions. Open source plugins for responsive images, 360 image making and image editing. Free monthly plan with 25GB of CDN traffic and 25GB of cache storage and unlimited transformations.
    
* [cloudinary.com](http://cloudinary.com) — Image upload, powerful manipulations, storage and delivery for sites and apps, with libraries for Ruby, Python, Java, PHP, Objective-C and more. Free tier includes 25 monthly credits. 1 credit is equal to 1,000 image transformations, 1 GB of storage, or 1 GB of CDN usage.
    
* [easyDB.io](http://easyDB.io) — one-click, hosted database provider. They provide a database for the programming language of your choice for development purposes. The DB is ephemeral and will be deleted after 24 or 72 hours on the free tier.
    
* [embed.ly](http://embed.ly) — Provides APIs for embedding media in a webpage, responsive image scaling, extracting elements from a webpage. Free for up to 5,000 URLs/month at 15 requests/second
    
* [filestack.com](http://filestack.com) — File picker, transform and deliver, free for 250 files, 500 transformations and 3 GB bandwidth
    
* [file.io](http://file.io) - 2 GB storage of files. A file is auto-deleted after 1 download. REST API to interact with the storage. Rate limit 1 request/minute.
    
* [freetools.site](http://freetools.site) — Free online tools. Convert or edit documents, images, audio, video and more.
    
* [GoFile.io](http://GoFile.io) - Free file sharing and storage platform, can be used via web based UI & also API. unlimited file size, bandwidth, download count, etc. But when a file becomes inactive (no download for more than 10 days), it will be deleted.
    
* [gumlet.com](http://gumlet.com) — Image resize-as-a-service. It also optimizes images and performs delivery via CDN. Free tier includes 1 GB bandwidth and unlimited number of image processing every month for 1 year.
    
* [image-charts.com](http://image-charts.com) — Unlimited image chart generation with a watermark
    
* [Imgbot](https://github.com/marketplace/imgbot) — Imgbot is a friendly robot that optimizes your images and saves you time. Optimized images mean smaller file sizes without sacrificing quality. It's free for open source.
    
* [imgen](https://www.jitbit.com/imgen/) - Free unlimited social cover image generation API, no watermark
    
* [kraken.io](http://kraken.io) — Image optimization for website performance as a service, free plan up to 1 MB file size
    
* [kvstore.io](http://kvstore.io) — Key-value storage service. Free tier allows 100 keys, 1KB/key, 100 calls/hour
    
* [npoint.io](http://npoint.io) — JSON store with collaborative schema editing
    
* [nitropack.io](http://nitropack.io) - Accelerate your site's speed on autopilot with complete front-end optimization (caching, images and code optimization, CDN). Free for up to 5,000 pageviews/month
    
* [otixo.com](http://otixo.com) — Encrypt, share, copy and move all your cloud storage files from one place. Basic plan provides unlimited files transfer with 250 MB max. file size and allows 5 encrypted files
    
* [packagecloud.io](http://packagecloud.io) — Hosted Package Repositories for YUM, APT, RubyGem and PyPI. Limited free plans, open source plans available via request
    
* [getpantry.cloud](http://getpantry.cloud) — A simple JSON data storage API that's perfect for personal projects, hackathons and mobile apps!
    
* [piio.co](http://piio.co) — Responsive image optimization and delivery for every website. Free plan for developers and personal websites. Includes free CDN, WebP and Lazy Loading out of the box.
    
* [Pinata IPFS](https://pinata.cloud/) — Pinata is the simplest way to upload and manage files on IPFS. Our friendly user interface combined with our IPFS API makes Pinata the easiest IPFS pinning service for platforms, creators, and collectors. 1 GB storage free along with access to API.
    
* [placekitten.com](http://placekitten.com) — A quick and simple service for getting pictures of kittens for use as placeholders
    
* [plot.ly](http://plot.ly) — Graph and share your data. Free tier includes unlimited public files and 10 private files
    
* [podio.com](http://podio.com) — You can use Podio with a team of up to five people and try out the features of the Basic Plan, except user management
    
* [QuickChart](https://quickchart.io/) — Generate embeddable image charts, graphs, and QR codes
    
* [redbooth.com](http://redbooth.com) — P2P file syncing, free for up to 2 users
    
* [resmush.it](http://resmush.it) — [reSmush.it](http://reSmush.it) is a FREE API that provides image optimization. [reSmush.it](http://reSmush.it) has been implemented on the most common CMS such as Wordpress, Drupal or Magento. [reSmush.it](http://reSmush.it) is the most used image optimization API with more than 7 billions images already treated, and is still Free of charge.
    
* [Shotstack](https://shotstack.io/) - API to generate and edit video at scale. Free up to 20 minutes of rendered video per month
    
* [tinypng.com](http://tinypng.com) — API to compress and resize PNG and JPEG images, offers 500 compressions for free each month
    
* [transloadit.com](http://transloadit.com) — Handles file uploads and encoding of video, audio, images, documents. Free for Open source, charities, and students via the GitHub Student Developer Pack. Commercial applications get 2 GB free for test driving
    
* [twicpics.com](http://twicpics.com) - Responsive images as a service. It provides an image CDN, a media processing API and frontend library to automate image optimization. The service is free up to 3GB trafic/month.
    
* [uploadcare.com](http://uploadcare.com) — Uploadcare provides media pipeline with ultimate toolkit based on cutting-edge algorithms. All features are available for developers absolutely for free: File Uploading API and UI, Image CDN and Origin Services, Adaptive Delivery and Smart Compression. Limit free tier has 3000 uploads, 3 GB traffic and 3 GB storage.
    
* [imagekit.io](http://imagekit.io) – Image CDN with automatic optimization, real-time transformation, and storage that you can integrate with existing setup in minutes. Free plan includes up to 20GB bandwidth per month.
    
* [internxt.com](http://internxt.com) – Internxt Drive is a zero-knowledge file storage service that's based on absolute privacy and uncompromising security. Sign up and get 10 GB for free, forever!
    
* [degoo.com](http://degoo.com) – AI based cloud storage with free up to 20 Gb, 3 devices, 5 Gb referral bonus (90 days account inactivity).
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Design and UI

* [AllTheFreeStock](https://allthefreestock.com/) - a curated list of free stock images, audio and videos.
    
* [Ant Design Landing Page](https://landing.ant.design/) - Ant Design Landing Page provides a template built by Ant Motion's motion components. It has a rich homepage template, downloads the template code package, and can be used quickly. You can also use the editor to quickly build your own dedicated page.
    
* [Backlight](https://backlight.dev/) — With collaboration between developers and designers at heart, Backlight is a very complete coding platform where teams build, document, publish, scale and maintain Design [Systems.Free](http://Systems.Free) plan allows up to 3 editors working on 1 design system with unlimited viewers.
    
* [BoxySVG](https://boxy-svg.com/app) — A free installable Web app for drawing SVGs and exporting in svg,png,jpeg an other formats.
    
* [Circum Icons](https://circumicons.com/) - Consistent open source icons as SVG for React, Vue and Svelte.
    
* [clevebrush.com](http://clevebrush.com) — Free Graphics Design / Photo Collage App, also they offer paid integration of it as component.
    
* [cloudconvert.com](http://cloudconvert.com) — Convert anything to anything. 208 supported formats including videos to gif.
    
* [CodeMyUI](https://codemyui.com/) - Handpicked collection of Web Design & UI Inspiration with Code Snippets.
    
* [ColorKit](https://colorkit.co/) - Create color palettes online or get inspiration from top palettes.
    
* [coolors](https://coolors.co/) - Color palette generator. Free.
    
* [Branition](https://branition.com/colors) - Hand curated color pallets best fitted for brands.
    
* [css-gradient.com](http://css-gradient.com) - Free tool to easily generate custom cross browser css gradients. In RGB and HEX format.
    
* [designer.io](http://designer.io) — Design tool for UI, illustrations and more. Has a native app. Free.
    
* [easyvectors.com](http://easyvectors.com) — [EasyVectors.com](http://EasyVectors.com) is a stock of quality free SVG vector art. Download best vector graphics absolutely for free.
    
* [figma.com](http://figma.com) — Online, collaborative design tool for teams; free tier includes unlimited files and viewers with a max of 2 editors and 3 projects.
    
* [framer.com](http://framer.com) - Framer helps you iterate and animate interface ideas for your next app, website, or product—starting with powerful layouts. For anyone validating Framer as a professional prototyping tool: unlimited viewers, up to 2 editors, up to 3 projects.
    
* [freeforcommercialuse.net](http://freeforcommercialuse.net) — FFCU Worry-free model/property release stock photos
    
* [Gradientos](https://www.gradientos.app/) - Makes choosing a gradient fast and easy.
    
* [Icon Horse](https://icon.horse/) – Get the highest resolution favicon for any website from our simple API.
    
* [Icons8](https://icons8.com/) — Icons, illustrations, photos, music, and design tools. Free Plan offers Limited formats in lower resolution. Link to Icons8 when you use our assets.
    
* [Invision App](https://www.invisionapp.com/) - UI design and prototyping tool. Desktop and webapp available. Free to use with 1 active prototype.
    
* [landen.co](http://landen.co) — Generate, edit and publish beautiful websites and landing pages for your startup. All without code. Free tier allows you to have one website, fully customizable and published on the web.
    
* [lensdump.com](http://lensdump.com) - Free cloud image hosting.
    
* [Lorem Picsum](https://picsum.photos/) - A Free tool, easy to use stylish placeholders. Just add your desired image size (width & height) after our URL, and you'll get a random image.
    
* [LottieFiles](https://lottiefiles.com/) - The world’s largest online platform for the world’s smallest animation format for designers, developers, and more. Access Lottie animation tools and plugins for Android, iOS, and Web.
    
* [MagicPattern](https://www.magicpattern.design/tools) — A collection of CSS & SVG background generators & tools for gradients, patterns, and blobs.
    
* [marvelapp.com](http://marvelapp.com) — Design, prototyping and collaboration, free plan limited to one user and one project.
    
* [Mindmup.com](http://Mindmup.com) — Unlimited mind maps for free, and store them in the cloud. Your mind maps are available everywhere, instantly, from any device.
    
* [Mockplus iDoc](https://www.mockplus.com/idoc) - Mockplus iDoc is a powerful design collaboration & handoff tool. Free Plan includes 3 users and 5 projects with all features available.
    
* [mockupmark.com](http://mockupmark.com) — Create realistic t-shirt and clothing mockups for social media and E-commerce, 40 free mockups.
    
* [Octopus.do](http://Octopus.do) — Visual sitemap builder. Build your website structure in real-time and rapidly share it to collaborate with your team or clients.
    
* [Pencil](https://github.com/evolus/pencil) - Open source design tool using Electron.
    
* [Penpot](https://penpot.app/) - Web based, open source design and prototyping tool. Supports SVG. Completely free.
    
* [pexels.com](http://pexels.com) - Free stock photos for commercial use. Has free API that allows you to search photos by keywords.
    
* [photopea.com](http://photopea.com) — A Free, Advanced online design editor with Adobe Photoshop UI supporting PSD, XCF & Sketch formats (Adobe Photoshop, Gimp and Sketch App).
    
* [pixlr.com](http://pixlr.com) — Free online browser editor on the level of commercial ones.
    
* [Plasmic](https://www.plasmic.app/) - A fast, easy to use, powerful web design tool and page builder that integrates into your codebase. Build responsive pages or complex components; optionally extend with code; and publish to production sites and apps.
    
* [Pravatar](https://pravatar.cc/) - Generate random/placeholder fake avatar, which url can be directly hotlinked in your web/app.
    
* [Proto.io](http://Proto.io) - Create fully interactive UI prototypes without coding. Free tier available when free trial ends. Free tier includes: 1 user, 1 project, 5 prototypes, 100MB online storage and preview in [proto.io](http://proto.io) app.
    
* [resizeappicon.com](http://resizeappicon.com) — A simple service to resize and manage your app icons.
    
* [Rive](https://rive.app/) — Create and ship beautiful animations to any platform. Free forever for Individuals. The service is a editor which hosts all the graphics on their servers as well. They also provide runtimes for many platforms to run graphics made using Rive.
    
* [storyset.com](http://storyset.com) — Create awesome free customised illustrations for your project using this tool.
    
* [smartmockups.com](http://smartmockups.com) — Create product mockups, 200 free mockups.
    
* [tabler-icons.io](http://tabler-icons.io) — Over 1500 free copy and paste SVG editable icons.
    
* [UI Avatars](https://ui-avatars.com/) - Generate avatars with initials from names. Which the urls can be directly hotlinked in your web/app. Support config parameters via the url.
    
* [unDraw](https://undraw.co/) - A constantly updated collection of beautiful svg images that you can use completely free and without attribution.
    
* [unsplash.com](http://unsplash.com) - Free stock photos for commercial and noncommercial purposes (do-whatever-you-want license).
    
* [vectr.com](http://vectr.com) — Free Design App for Web + Desktop.
    
* [walkme.com](http://walkme.com) — Enterprise Class Guidance and Engagement Platform, free plan 3 walk-thrus up to 5 steps/walk.
    
* [Webflow](https://webflow.com/) - WYSIWYG web site builder with animations and website hosting. Free for 2 projects.
    
* [Updrafts.app](http://Updrafts.app) - WYSIWYG web site builder for tailwindcss based designs. Free for non-commercial usage.
    
* [whimsical.com](http://whimsical.com) - Collaborative flowcharts, wireframes, sticky notes and mind maps. Create up to 4 free boards.
    
* [Zeplin](https://zeplin.io/) — Designer and developer collaboration platform. Show designs, assets and styleguides. Free for 1 project.
    
* [Pixelixe](https://pixelixe.com/) — Create and edit engaging and unique graphics and images online.
    
* [Responsively App](https://responsively.app/) - A free dev-tool for faster and precise responsive web application development.
    
* [SceneLab](https://scenelab.io/) - Online mockup graphics editor with an ever-expanding collection of free design templates
    
* [xLayers](https://xlayers.dev/) - Preview and convert Sketch design files into Angular, React, Vue, LitElement, Stencil, Xamarin and more (free and open source at [https://github.com/xlayers/xlayers](https://github.com/xlayers/xlayers))
    
* [Grapedrop](https://grapedrop.com/) — Responsive, powerful, SEO optimized web page builder based on GrapesJS Framework. Free for first 5 pages, unlimited custom domains, all features and simple usage.
    
* [Mastershot](https://mastershot.app/) - Completely free browser-based video editor. No watermark, up to 1080p export options.
    
* [Unicorn Platform](https://unicornplatform.com/) - Effortless landing page builder with hosting. 1 website for free.
    
* [react-favicon.com](http://react-favicon.com) - Generate Favicons for your web site using React and JSX using any font and icon library.
    
* [svgrepo.com](http://svgrepo.com) - Explore, search and find the best fitting icons or vectors for your projects using wide variety vector library. Download free SVG Vectors for commercial use.
    
* [haikei.app](http://haikei.app) - Haikei is a web app to generate unique SVG shapes, backgrounds, and patterns – ready to use with your design tools and workflow.
    
* [Canva](https://canva.com/) - Free online design tool to create visual content.
    
* [Superdesigner](https://superdesigner.co/) - A collection of free design tools to create unique backgrounds, patterns, shapes, images, and more with just a few clicks.
    
* [TeleportHQ](https://teleporthq.io/) - Low-code Front-end Design & Development Platform. TeleportHQ is the collaborative front-end platform to create and publish your headless static websites instantly. 3 free projects, unlimited collaborators, free code export.
    
* [vector.express](http://vector.express) — Convert your AI, CDR, DWG, DXF, EPS, HPGL, PDF, PLT, PS and SVG vector fast and easily.
    
* [Vertopal](https://www.vertopal.com/) - Vertopal is a free online platform for converting files to a variety of file formats. Including developer converters like JPG to SVG, GIF to APNG, PNG to WEBP, JSON to XML and etc.
    
* [okso.app](http://okso.app) - Minimalistic online drawing app. Allows creating fast sketches and visual notes. Exports sketches to PNG, JPG, SVG, and WEBP. Also installable as PWA. Free to use for everyone (no registration is needed).
    
* [Wdrfree SVG](https://wdrfree.com/free-svg) - Black and White Free SVG Cut files.
    
* [Lucide](https://lucide.dev/) - Free customizable and consistent SVG icon toolkit.
    
* [MDBootstrap](https://mdbootstrap.com/) - Free for personal & commercial use Bootstrap, Angular, React, and Vue UI Kits with over 700 components, stunning templates, 1-min installation, extensive tutorials & huge community.
    
* [Tailwind Elements](https://tailwind-elements.com/) - Free Bootstrap components recreated with Tailwind CSS, but with better design and more functionalities.
    
* [DaisyUI](https://daisyui.com/) -- Free. "Use Tailwind CSS but write fewer class names" offers components like buttons.
    
* [Scrollbar.app](http://Scrollbar.app) -- Simple free web app for designing custom scrollbars for the web.
    
* [css.glass](http://css.glass) -- Free web app for creating glassmorphic designs using CSS.
    
* [hypercolor.dev](http://hypercolor.dev) -- A curated collection of of Tailwind CSS color gradients, also provides a variety of generators to create your own.
    
* [iconify.design](http://iconify.design) -- A collection of more than 100 icon packs with a unified interface. Allows you to search for icons across packs and export individual icons as SVGs or for popular web frameworks.
    
* [NextUI](https://nextui.org/) -- Free. Beautiful, fast and modern React & Nxt.js UI library.
    
* [Glyphs](https://glyphs.fyi/) -- Free, The Mightiest Icons on the Web, Fully editable & truly open source design system.
    
* [ShadcnUI](https://ui.shadcn.com/) -- Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
    
* [HyperUI](https://www.hyperui.dev/) -- Free Open Source Tailwind CSS Components.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Design Inspiration

* [awwwards.](https://www.awwwards.com/) - \[Top websites\] A showcases of all the best designed websites (voted on by designers).
    
* [Behance](https://www.behance.net/) - \[Design showcase\] A place where designers showcase their work. Filterable with categories for UI/UX projects.
    
* [dribbble](https://dribbble.com/) - \[Design showcase\] Unique design inspiration, generally not from real applications.
    
* [Landings](https://landings.dev/) - \[Web Screenshots\] Find the best landing pages for your design inspiration based on your preference.
    
* [LovelyLanding.net](http://LovelyLanding.net) - \[Landing Page Designs\] Frequently updated landing page screenshots. Includes Desktop, Tablet and Mobile screeshots.
    
* [Mobbin](https://mobbin.design/) - \[Mobile screenshots\] Save hours of UI & UX research with our library of 50,000+ fully searchable mobile app screenshots.
    
* [Mobile Patterns](https://www.mobile-patterns.com/) - \[Mobile screenshots\] A design inspirational library featuring finest UI UX Patterns (iOS and Android) for designers, developers, and product makers to reference.
    
* [Screenlane](https://screenlane.com/) - \[Mobile screenshots\] Get inspired and keep up with the latest web & mobile app UI design trends. Filterable by pattern and app.
    
* [scrnshts](https://scrnshts.club/) - \[Mobile screenshots\] A hand-picked collection of the finest app store design screenshots.
    
* [UI Garage](https://uigarage.net/) - \[Mobile and web screenshots\] Daily UI inspiration & patterns for designers, developers to find inspiration, tools and the best resources for your project.
    
* [Refero](https://refero.design/) - \[Web screenshots\] Tagged and searchable collection of design references from great web applications.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Data Visualization on Maps

* [IP Geolocation](https://ipgeolocation.io/) — Free DEVELOPER plan available with 30K requests/month.
    
* [carto.com](http://carto.com) — Create maps and geospatial APIs from your data and public data.
    
* [Clockwork Micro](https://clockworkmicro.com/) — Map tools that work like clockwork. 50,000 free queries per month (map tiles, db2vector, elevation).
    
* [developers.arcgis.com](http://developers.arcgis.com) — APIs and SDKs for maps, geospatial data storage, analysis, geocoding, routing, and more across web, desktop, and mobile. 2,000,000 free basemap tiles, 20,000 non-stored geocodes, 20,000 simple routes, 5,000 drive time calculations, 5GB free tile+data storage per month.
    
* [Foursquare](https://developer.foursquare.com/) - Location discovery, venue search, and context-aware content from Places API and Pilgrim SDK.
    
* [geoapify.com](http://geoapify.com) - Vector and raster map tiles, geocoding, places, routing, isolines APIs. 3000 free requests / day.
    
* [geocod.io](http://geocod.io) — Geocoding via API or CSV Upload. 2,500 free queries/day.
    
* [geocodify.com](http://geocodify.com) — Geocoding and Geoparsing via API or CSV Upload. 10k free queries/month.
    
* [geojs.io](http://geojs.io) - Highly available REST/JSON/JSONP IP Geolocation lookup API.
    
* [giscloud.com](http://giscloud.com) — Visualize, analyze and share geo data online.
    
* [graphhopper.com](http://graphhopper.com) A free package for developers is offered for Routing, Route Optimization, Distance Matrix, Geocoding, Map Matching.
    
* [here](https://developer.here.com/) — APIs and SDKs for maps and location-aware apps. 250k transactions/month for free.
    
* [locationiq.com](http://locationiq.com) — Geocoding, Maps, and Routing APIs. 5000 requests/day for free.
    
* [mapbox.com](http://mapbox.com) — Maps, geospatial services and SDKs for displaying map data.
    
* [maptiler.com](http://maptiler.com) — Vector maps, map services and SDKs for map visualisation. Free vector tiles with weekly update and four map styles.
    
* [nextbillion.ai](http://nextbillion.ai) - Maps related services: Geocoding, Navigation (Direction, Routing, Route Optimization, Distance Matrix), Maps SDK (Vector, Static, Mobile SDK). [Free with specified quota](https://nextbillion.ai/pricing) for each services.
    
* [opencagedata.com](http://opencagedata.com) — Geocoding API that aggregates OpenStreetMap and other open geo sources. 2,500 free queries/day.
    
* [osmnames](https://osmnames.org/) — Geocoding, search results ranked by the popularity of related Wikipedia page.
    
* [positionstack](https://positionstack.com/) - Free geocoding for global places and coordinates. 25.000 Requests per month for personal use.
    
* [stadiamaps.com](http://stadiamaps.com) — Map tiles, routing, navigation, and other geospatial APIs. 2,500 free map views and API requests / day for non-commercial usage and testing.
    
* [maps.stamen.com](http://maps.stamen.com) - Free map tiles and tile hosting.
    
* [GeocodeAPI](https://geocodeapi.io/) - Geocode API: Address to Coordinate Conversion & Geoparsing based on Pelias. Batch geocoding via CSV. 350000 free requests/month.
    
* [Geokeo api](https://geokeo.com/) - Geocoding api with language correction and more. Worldwide coverage. 2,500 free daily queries
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Package Build System

* [build.opensuse.org](http://build.opensuse.org) — Package build service for multiple distros (SUSE, EL, Fedora, Debian etc).
    
* [copr.fedorainfracloud.org](http://copr.fedorainfracloud.org) — Mock-based RPM build service for Fedora and EL.
    
* [help.launchpad.net](http://help.launchpad.net) — Ubuntu and Debian build service.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## IDE and Code Editing

* [3v4l](https://3v4l.org/) - Free online PHP shell and snippet sharing site, runs your code in 300+ PHP versions
    
* [Android Studio](https://d.android.com/studio) — Android Studio provides the fastest tools for building apps on every type of Android device. Open Source IDE, free for everyone and the best to develop Android apps. Available for Windows,Mac,Linux and even ChromeOS!
    
* [Apache Netbeans](https://netbeans.apache.org/) — Development Environment, Tooling Platform and Application Framework.
    
* [apiary.io](http://apiary.io) — Collaborative design API with instant API mock and generated documentation (Free for unlimited API blueprints and unlimited user with one admin account and hosted documentation).
    
* [Binder](https://mybinder.org/) - Turn a Git repo into a collection of interactive notebooks. It is a free, public service.
    
* [BlueJ](https://bluej.org/) — A free Java Development Environment designed for beginners, used by millions worldwide. Powered by Oracle & simple GUI to help beginners.
    
* [Bootify.io](http://Bootify.io) - Spring Boot app generator with custom database and REST API.
    
* [cacher.io](http://cacher.io) — Code snippet organizer with labels and support for 100+ programming languages.
    
* [Code::Blocks](https://codeblocks.org/) — Free Fortran & C/C++ IDE. Open Source and runs on Windows,macOS & Linux.
    
* [codiga.io](http://codiga.io) — Coding Assistant that lets you search, define and reuse code snippets directly in your IDE. Free for individual and small organizations.
    
* [codesnip.com.br](http://codesnip.com.br) — Simple code snippets manager with categories, search and tags. free and unlimited.
    
* [cocalc.com](http://cocalc.com) — (formerly SageMathCloud at [cloud.sagemath.com](http://cloud.sagemath.com)) — Collaborative calculation in the cloud. Browser access to full Ubuntu with built-in collaboration and lots of free software for mathematics, science, data science, preinstalled: Python, LaTeX, Jupyter Notebooks, SageMath, scikitlearn, etc.
    
* [code.cs50.io](http://code.cs50.io) - Visual Studio Code for CS50 is a web app at [code.cs50.io](http://code.cs50.io) that adapts GitHub Codespaces for students and teachers.
    
* [codepen.io](http://codepen.io) — CodePen is a playground for the front end side of the web.
    
* [codesandbox.io](http://codesandbox.io) — Online Playground for React, Vue, Angular, Preact and more.
    
* [Components.studio](http://Components.studio) - Code components in isolation, visualize them in stories, test them and publish them on npm.
    
* [Eclipse Che](https://www.eclipse.org/che/) - Web based and Kubernetes-Native IDE for Developer Teams with multi-language support. Open Source and community driven. A online instance hosted by Red Hat is available at [workspaces.openshift.com](http://workspaces.openshift.com).
    
* [fakejson.com](http://fakejson.com) — FakeJSON helps you quickly generate fake data using its API. Make an API request describing what you want and how you want it. The API returns it all in JSON. Speed up the go to market process for ideas and fake it till you make it.
    
* [GitPod](https://www.gitpod.io/) — Instant, ready-to-code dev environments for GitHub projects. Free tier includes 50 hours/month.
    
* [ide.goorm.io](http://ide.goorm.io) goormIDE is full IDE on cloud. multi-language support, linux-based container via the fully-featured web-based terminal, port forwarding, custom url, real-time collaboration and chat, share link, Git/Subversion support. There are many more features (free tier includes 1GB RAM and 10GB Storage per container, 5 Container slot).
    
* [JDoodle](https://www.jdoodle.com/) — Online compiler and editor for more than 60 programming languages with a free plan for REST API code compiling up to 200 credits per day.
    
* [jetbrains.com](http://jetbrains.com) — Productivity tools, IDEs and deploy tools (aka [IntelliJ IDEA](https://www.jetbrains.com/idea/), [PyCharm](https://www.jetbrains.com/pycharm/), etc). Free license for students, teachers, Open Source and user groups.
    
* [jsbin.com](http://jsbin.com) — JS Bin is another playground and code sharing site of front end web (HTML, CSS and JavaScript. Also supports Markdown, Jade and Sass).
    
* [jsfiddle.net](http://jsfiddle.net) — JS Fiddle is a playground and code sharing site of front end web, support collaboration as well.
    
* [JSONPlaceholder](https://jsonplaceholder.typicode.com/) Some REST API endpoints that return some fake data in JSON format. The source code is also available if you would like to run the server locally.
    
* [Lazarus](https://www.lazarus-ide.org/) — Lazarus is a Delphi compatible cross-platform IDE for Rapid Application Development.
    
* [micro-jaymock](https://micro-jaymock.now.sh/) - Tiny API mocking microservice for generating fake JSON data.
    
* [mockable.io](http://mockable.io) — Mockable is a simple configurable service to mock out RESTful API or SOAP web-services. This online service allows you to quickly define REST API or SOAP endpoints and have them return JSON or XML data.
    
* [mockaroo](https://mockaroo.com/) — Mockaroo lets you generate realistic test data in CSV, JSON, SQL, and Excel formats. You can also create mocks for back-end API.
    
* [Mocklets](https://mocklets.com/) - a HTTP-based mock API simulator, which helps simulate APIs for faster parallel development and more comprehensive testing, with lifetime free tier.
    
* [Paiza](https://paiza.cloud/en/) — Develop Web apps in Browser without having the need to setup anything. Free Plan offers 1 server with 24 hours lifetime and 4 hours running time per day with 2 CPU cores, 2 GB RAM and 1 GB storage.
    
* [Prepros](https://prepros.io/) - Prepros can compile Sass, Less, Stylus, Pug/Jade, Haml, Slim, CoffeeScript and TypeScript out of the box, reloads your browsers and makes it really easy to develop & test your websites so you can focus on making them perfect. You can also add your own tools with just a few clicks.
    
* [Replit](https://replit.com/) — A cloud coding environment for various program languages.
    
* [SoloLearn](https://code.sololearn.com/) — A cloud programming playground well-suited for running code snippets. Supports various programming languages. No registration required for running code but required when you need to save code on their platform. Also offers free courses for begginers and intermediate level coders.
    
* [stackblitz.com](http://stackblitz.com) — Online/Cloud Code IDE to create, edit, & deploy fullstack apps. Support any popular NodeJs based frontend & backend frameworks. Shortlink to create new project: [https://node.new](https://node.new).
    
* [Visual Studio Code](https://code.visualstudio.com/) - Code editor redefined and optimized for building and debugging modern web and cloud applications. Developed by Microsoft.
    
    * [Desktop](https://code.visualstudio.com/) - (Windows, macOS and Linux).
        
    * [Online](https://vscode.dev/) - (Browser)
        
* [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) — Fully-featured IDE with thousands of extensions, cross-platform app development (Microsoft extensions available for download for iOS and Android), desktop, web and cloud development, multi-language support (C#, C++, JavaScript, Python, PHP and more).
    
* [VSCodium](https://vscodium.com/) - Community-driven, without telemetry/tracking, and freely-licensed binary distribution of Microsoft’s editor VSCode
    
* [wakatime.com](http://wakatime.com) — Quantified self-metrics about your coding activity, using text editor plugins, limited plan for free.
    
* [WebComponents.dev](http://WebComponents.dev) — In-browser IDE to code web components in isolation with 58 templates available, supporting stories and tests.
    
* [PHPSandbox](https://phpsandbox.io/) — Online developement environment for PHP.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Analytics, Events and Statistics

* [Hightouch](https://hightouch.com/) - Hightouch is a Reverse ETL platform that helps you sync your customer data from your data warehouse to your CRM, marketing, and support tools. Free tier that offers you one destination to sync data to.
    
* [Avo](https://avo.app/) — Simplified analytics release workflow. Single-source-of-truth tracking plan, type safe analytics tracking library, in-app debuggers, data observability to catch all data issues before you release. Free for 2 workspace members and 1 hour data observability lookback.
    
* [Branch](https://branch.io/) — Mobile Analytics Platform. Free Tier offers upto 10K Mobile App Users with deep-linking & other services.
    
* [Cauldron](https://cauldron.io/) — Analytics open source solution that allows users to aggregate information from multiple collaboration platforms as different types of data sources (Git, Github, Gitlab...). Free tier includes unlimited number of reports.
    
* [Census](https://www.getcensus.com/) — Reverse ETL & Operational Analytics Platform. Sync 10 fields from your data warehouse to 60+ SaaS like Salesforce, Zendesk, or Amplitude.
    
* [Clicky](https://clicky.com/) — Website Analytics Platform. Free Plan for 1 website with 3000 views analytics.
    
* [Databox](https://databox.com/) — Business Insights & Analytics by combining other analytics & BI platforms. Free Plan offers 3 users, dashboards & data sources. 11M historical data records.
    
* [indicative.com](http://indicative.com) — Customer analytics platform to optimize customer engagement, increase conversion, and improve retention. Free up to 25M events/month, 6 months data retention.
    
* [Panelbear.com](http://Panelbear.com) — Blazingly fast and private, free tier includes 5,000 pageviews per month for unlimited websites
    
* [Hitsteps.com](http://Hitsteps.com) — 2,000 pageviews per month for 1 website
    
* [amplitude.com](http://amplitude.com) — 1 million monthly events, up to 2 apps
    
* [Flagsmith](https://flagsmith.com/) - Release features with confidence; manage feature flags across web, mobile, and server side applications. Use our hosted API, deploy to your own private cloud, or run on-premise
    
* [GoatCounter](https://www.goatcounter.com/) — GoatCounter is an open source web analytics platform available as a hosted service (free for non-commercial use) or self-hosted app. It aims to offer easy to use and meaningful privacy-friendly web analytics as an alternative to Google Analytics or Matomo. Free tier is for non-commerical use and includes unlimited number of sites, 6 months of data retention, and 100k pageviews/month.
    
* [Google Analytics](https://analytics.google.com/) — Google Analytics
    
* [Expensify](https://www.expensify.com/) — Expense reporting, free personal reporting approval workflow
    
* [getinsights.io](http://getinsights.io) - Privacy-focused, cookie free analytics, free for up to 5k events/month.
    
* [heap.io](http://heap.io) — Automatically captures every user action in iOS or web apps. Free for up to 5,000 visits/month
    
* [Hotjar](https://hotjar.com/) — Website Analytics and Reports . Free Plan allows 2000 pageviews/day. 100 snapshots/day (max capacity: 300). 3 snapshot heatmaps which can be stored for 365 days. Unlimited Team Members.
    
* [Keen](https://keen.io/) — Custom Analytics for data collection, analysis and visualization. 1,000 events/month free
    
* [Yandex.Metrica](https://metrica.yandex.com/) — Unlimited free analytics
    
* [Mixpanel](https://mixpanel.com/) — 100,000 monthly tracked users, unlimited data history and seats, US or EU data residency
    
* [Moesif](https://www.moesif.com/) — API analytics for REST and GraphQL. (Free up to 500,000 API calls/mo)
    
* [Molasses](https://www.molasses.app/) - Powerful feature flags and A/B testing. Free up to 3 environments with 5 feature flags each.
    
* [optimizely.com](http://optimizely.com) — A/B Testing solution, free starter plan, 1 website, 1 iOS and 1 Android app
    
* [Microsoft PowerBI](https://powerbi.com/) — Business Insights & Analytics by Microsoft. Free Plan offers limited use with 1 Million User licenses.
    
* [quantcast.com](http://quantcast.com) — Unlimited free analytics
    
* [sematext.com](http://sematext.com) — Free for up to 50 K actions/month, 1-day data retention, unlimited dashboards, users, etc.
    
* [Similar Web](https://similarweb.com/) — Analytics for Web & Mobile Apps. Free Plan offers 5 results per metric, 1 month of mobile app data & 3 months of website data.
    
* [StatCounter](https://statcounter.com/) — Website Viewer Analytics. Free plan for analytics of 500 most recent visitors.
    
* [Tableau Developer Program](https://www.tableau.com/developer) — Innovate, create, and make Tableau work perfectly for your organization. Free developer program gives a personal development sandbox license for Tableau Online. The version is the latest pre-release version so Data Devs can test each & every feature of this superb platform.
    
* [usabilityhub.com](http://usabilityhub.com) — Test designs and mockups on real people, track visitors. Free for one user, unlimited tests
    
* [woopra.com](http://woopra.com) — Free user analytics platform for 500K actions, 90 day data retention, 30+ one click integration.
    
* [counter.dev](http://counter.dev) — Web analytics made simple and therefore privacy friendly. Free or pay what you want by donation.
    
* [PostHog](https://posthog.com/) - Full Product Analytics suite free for up to 1m tracked events per month
    
* [Uptrace](https://uptrace.dev/) - Distributed Tracing Tool that helps developers pinpoint failures and find performance bottlenecks. Has a free plan, offers a free Personal subscription for open source projects, and has an open source version.
    
* [Microsoft Clarity](https://clarity.microsoft.com/) - Clarity is a free, easy-to-use tool that captures how real people actually use your site.
    
* [Beampipe.io](http://Beampipe.io) - Beampipe is simple, privacy-focussed web analytics. free for up to 5 domains & 10k monthly page views.
    
* [GrowthBook](https://growthbook.io/) - Open source feature flag and A/B testing provider with built-in Bayesian statistical analysis engine. Free for up to 3 users, unlimited feature flags and experiments.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Visitor Session Recording

* [Visualime.com](http://Visualime.com) — Free and unlimited session recordings, no traffic limits
    
* [Reactflow.com](http://Reactflow.com) — Per site: 1,000 pages views/day, 3 heatmaps, 3 widgets, free bug tracking
    
* [LogRocket.com](http://LogRocket.com) - 1,000 sessions/month with 30 day retention, error tracking, live mode
    
* [FullStory.com](http://FullStory.com) — 1,000 sessions/month with 1 month data retention and 3 user seats. More information [here](https://help.fullstory.com/hc/en-us/articles/360020623354-FullStory-Free-Edition).
    
* [hotjar.com](http://hotjar.com) — Per site: 1,050 pages views/month, unlimited heatmaps, data stored for 3 months,...
    
* [inspectlet.com](http://inspectlet.com) — 2,500 sessions/month free for 1 website
    
* [Microsoft Clarity](https://clarity.microsoft.com/) - Session recording completely free with "no traffic limits", no project limits, and no sampling
    
* [mouseflow.com](http://mouseflow.com) — 500 sessions/month free for 1 website
    
* [mousestats.com](http://mousestats.com) — 100 sessions/month free for 1 website
    
* [smartlook.com](http://smartlook.com) — free packages for web and mobile apps (1500 sessions/month), 3 heatmaps, 1 funnel, 1-month data history
    
* [usersurge.com](http://usersurge.com) — 250K sessions per month for individuals.
    
* [howuku.com](http://howuku.com) — Track user interaction, engagement, and event. Free for up to 5,000 visits/month
    
* [UXtweak.com](http://UXtweak.com) — Record and watch how visitors use your web site or app. Free unlimited time for small projects
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## International Mobile Number Verification API and SDK

* [Cognalys](https://cognalys.com/) — Freemium mobile number verification through an innovative and reliable method than using SMS gateway. Free 10 tries and 15 verifications/day
    
* [numverify](https://numverify.com/) — Global phone number validation and lookup JSON API. 250 API requests/month
    
* [veriphone](https://veriphone.io/) — Global phone number verification in a free, fast, reliable JSON API. 1000 requests/month
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Payment and Billing Integration

* [Adapty.io](http://Adapty.io) – One-stop solution with open-source SDK for mobile in-app subscriptions integration to iOS, Android, React Native, Flutter, Unity, or web app. Free up to $10k monthly revenue.
    
* [CoinMarketCap](https://coinmarketcap.com/api/) — Provides cryptocurrency market data including latest crypto and fiat currency exchange rates. Free tier offers 10K call credits/month.
    
* [CurrencyFreaks](https://currencyfreaks.com/) — Provides current and historical currency exchange rates. Free DEVELOPER plan available with 1000 requests/month.
    
* [CoinGecko](https://www.coingecko.com/en/api) — Provides cryptocurrency market data including latest crypto exchange rates and historical data. Free tier requires attribution.
    
* [CurrencyApi](https://currencyapi.net/) — Live Currency Rates for Physical and Crypto currencies, delivered in JSON and XML. Free tier offers 1,250 API requests/month.
    
* [currencylayer](https://currencylayer.com/) — Reliable Exchange Rates and Currency Conversion for your Business, 1,000 API requests/month free
    
* [Coin360](https://api.coin360.com/) — Provides cryptocurrency market data including latest crypto exchange rates and historical data
    
* [currencystack.io](http://currencystack.io) — Production-ready real-time exchange rates for 154 currencies.
    
* [exchangerate-api.com](http://exchangerate-api.com) - An easy to use currency conversion JSON API. Free tier with no request limit.
    
* [FraudLabsPRO](https://www.fraudlabspro.com/) — Help merchants to prevent payment fraud and chargebacks. Free Micro Plan available with 500 queries/month.
    
* [MailPopin](https://mailpop.in/) - Get the most of your Stripe notifications with contextualized information.
    
* [Nami ML](https://www.namiml.com/) - Complete platform for in-app purchases and subscriptions on iOS and Android, including no-code paywalls, CRM, and analytics. Free for all base features to run an IAP business.
    
* [RevenueCat](https://www.revenuecat.com/) — Hosted backend for in-app purchases and subscriptions (iOS and Android). Free up to $10k/mo in tracked revenue.
    
* [vatlayer](https://vatlayer.com/) — Instant VAT number validation and EU VAT rates API, free 100 API requests/month
    
* [Freecurrencyapi.net](http://Freecurrencyapi.net) — Free currency conversion and exchange rate data API. 10 requests/hour without an API key, 50 000 requests per month when you register for free.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Docker Related

* [canister.io](http://canister.io) — 20 free private repositories for developers, 30 free private repositories for teams to build and store Docker images
    
* [Container Registry Service](https://container-registry.com/) - Harbor based Container Management Solution. Free tier offers 1 GB storage for private repositories.
    
* [Docker Hub](https://hub.docker.com/) — One free private repository and unlimited public repositories to build and store Docker images
    
* [Play with Docker](https://labs.play-with-docker.com/) — A simple, interactive and fun playground to learn Docker.
    
* [quay.io](http://quay.io) — Build and store container images with unlimited free public repositories
    
* [Platform9](https://platform9.com/) - Managed Kubernetes plane. Free plan offers management capabilities up to 3 clusters & 20 nodes. Note: you must provide cluster infrastructure by yourself.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Vagrant Related

* [Vagrant Cloud](https://app.vagrantup.com/) - HashiCorp Vagrant Cloud. Vagrant box hosting.
    
* [Vagrantbox.es](http://Vagrantbox.es) — An alternative public box index
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Dev Blogging Sites

* [BearBlog](https://bearblog.dev/) - Minimalist, and Markdown powered blog and website builder.
    
* [Dev.to](http://Dev.to) - Where programmers share ideas and help each other grow.
    
* [Hashnode](https://hashnode.com/) — Hassle-free Blogging Software for Developers!.
    
* [Medium](https://medium.com/) — Get smarter about what matters to you.
    
* [AyeDot](https://ayedot.com/) — Share your ideas, knowledge and stories with the world for Free, in form of Modern multimedia short-format Miniblogs.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Commenting Platforms

* [Staticman](https://staticman.net/) - Staticman is a Node.js application that receives user-generated content and uploads it as data files to a GitHub and/or GitLab repository, using Pull Requests.
    
* [GraphComment](https://graphcomment.com/) - GraphComment is a comments platform that helps you build an active community from website’s audience.
    
* [Utterances](https://utteranc.es/) - A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!
    
* [Disqus](https://disqus.com/) - Disqus is a networked community platform used by hundreds of thousands of sites all over the web.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Screenshot APIs

* [ApiFlash](https://apiflash.com/) — A screenshot API based on Aws Lambda and Chrome. Handles full page, capture timing, viewport dimensions, ...
    
* [microlink.io](http://microlink.io) – It turns any website into data such as metatags normalization, beauty link previews, scraping capabilities or screenshots as a service. 250 reqs/day every day free.
    
* [ScreenshotAPI.net](http://ScreenshotAPI.net) - Screenshot API use one simple API call to generate screenshots of any website. Build to scale and hosted on Google Cloud. Offers 100 free screenshots per month.
    
* [screenshotlayer.com](http://screenshotlayer.com) — Capture highly customizable snapshots of any website. Free 100 snapshots/month
    
* [screenshotmachine.com](http://screenshotmachine.com) — Capture 100 snapshots/month, png, gif and jpg, including full-length captures, not only home page
    
* [PhantomJsCloud](https://phantomjscloud.com/) — Browser automation and page rendering. Free Tier offers up to 500 pages/day. Free Tier since 2017.
    
* [Webshrinker.com](http://Webshrinker.com) — Web Shrinker provides web site screenshot and domain intelligence API services. Free 100 requests/month.
    
* [Httpic.com](http://Httpic.com) — Turn any website into jpg, png or pdf. Capture full page screenshots, adjust viewport, inject custom code. Free tier at 150 images / month.
    
* [Screenshots](https://screenshotson.click/) — Your API for Screenshots. With highly customizable options for capture. Free 100 screenshots/month.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Flutter Related and Building IOS Apps without Mac

* [FlutLab](https://flutlab.io/) - FlutLab is a modern Flutter online IDE and the best place to create, debug, and build cross-platform projects. Build iOS (Without Mac) and Android apps with Flutter.
    
* [CodeMagic](https://codemagic.io/) - Codemagic is a fully hosted and managed CI/CD for mobile apps. You can build, test, deploy with a GUI based CI/CD tool. Free tier offers 500 free minutes/month, and Mac Mini instance with 2.3Ghz and 8gb of RAM.
    
* [FlutterFlow](https://flutterflow.io/) - FlutterFlow is a browser-based drag-and-drop interface to build mobile app using flutter.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Browser based hardware emulation written in Javascript

* [JsLinux](https://bellard.org/jslinux) — a really fast x86 virtual machine capable of running Linux and Windows 2k.
    
* [Jor1k](https://s-macke.github.io/jor1k/demos/main.html) — a OpenRISC virtual machine capable of running Linux with network support.
    
* [v86](https://copy.sh/v86) — a x86 virtual machine capable of running Linux and other OS directly into the browser.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Privacy Management

* [Bearer](https://www.bearer.sh/) - Helps implement privacy by design via audits and continuous workflows so that organizations comply with GDPR and other regulations. Free tier is limited to smaller teams and SaaS version only.
    
* [Osano](https://www.osano.com/) - Consent management and compliance platform with everything from GDPR representation to cookie banners. Free tier offers basic features.
    
* [Iubenda](https://www.iubenda.com/) - Privacy and cookie policies along with consent management. Free tier offers limited privacy and cookie policy as well as cookie banners.
    
* [Cookiefirst](https://cookiefirst.com/) - Cookie banners, auditing, and multi-language consent management solution. Free tier offers a one-time scan and a single banner.
    
* [Ketch](https://www.ketch.com/) - Consent management and privacy framework tool. Free tier offers most features with a limited visitor count.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Miscellaneous

* [BinShare.net](http://BinShare.net) - Create & share code or binaries. Avaliable to share as an beautiful image e.g. for Twitter / Facebook post or as a link e.g for chats or forums.
    
* [Blynk](https://blynk.io/) — A SaaS with API to control, build & evaluate IoT devices. Free Developer Plan with 5 devices,Free Cloud & data storage. Mobile Apps also available.
    
* [Bricks Note Calculator](https://free.getbricks.app/) - a note-taking app (PWA) with a powerful built-in multiline calculator.
    
* [Carbon.now.sh](http://Carbon.now.sh) - create and share code snippet in an aesthetic screenshot-like image format. Usually used to aesthetically share/show-off code snippet on Twitter or blog posts.
    
* [Code Time](https://www.software.com/code-time) - an extension for time-tracking and coding metrics in VS Code, Atom, IntelliJ, Sublime Text, and more.
    
* [Codepng](https://www.codepng.app/) - Create awesome snapshots from your source code that you can share on social media.
    
* [CodeToImage](https://codetoimage.com/) - Create screenshots of code or text to share on social media.
    
* [ConfigCat](https://configcat.com/) - ConfigCat is a developer-centric feature flag service with unlimited team size, awesome support, and a reasonable price tag. Free plan up to 10 flags, 2 environments, 1 product and 5 Million requests per month.
    
* [Cronhooks](https://cronhooks.io/) - Schedule on time or recurring webhooks. Free plan allows 5 ad-hoc schedules.
    
* [Cronit](https://cronit.app/) - Online cronjobs service. Free plan includes 100 job execution per month
    
* [datelist.io](http://datelist.io) - Online booking / appointment scheduling system. Free up to 5 bookings per month, includes 1 calendar
    
* [docsapp.io](http://docsapp.io) — Easiest way to publish documentation, free for Open Source
    
* [Domain Forward](https://domain-forward.com/) - One simple tool to forward any URL or Domain. Free up to 5 domains and 200k requests per month.
    
* [Elementor](https://elementor.com/) — WordPress website builder. Free plan available with 40+ Basic Widgets.
    
* [Form2Channel](https://form2channel.com/) — Place a static html form on your website and receive submissions directly to Google Sheets, Email, Slack, Telegram or Http. No coding necessary.
    
* [Format Express](https://www.format-express.dev/) - Instant online formatter for JSON / XML / SQL.
    
* [FOSSA](https://fossa.com/) - Scalable, end-to-end management for third-party code, license compliance and vulnerabilities.
    
* [fullcontact.com](http://fullcontact.com) — Help your users know more about their contacts by adding social profile into your app. 500 free Person API matches/month
    
* [Hook Relay](https://www.hookrelay.dev/) - Add webhook support to your app without the hassles: done-for-you queueing, retries with backoff, and logging. The free plan has 100 deliveries per day, 14-day retention, and 3 hook endpoints.
    
* [http2.pro](http://http2.pro) — HTTP/2 protocol readiness test and client HTTP/2 support detection API.
    
* [JWT Decoder](https://jwt.ssotools.com/) — Online free tool for decoding JWT(JSON web token) and verifying it's signature.
    
* [kandi](https://kandi.openweaver.com/) — Jumpstart Application Development: build custom functions, use cases and complete application faster through code snippet and open source library reuse.
    
* [Base64 decoder/encoder](https://devpal.co/base64-decode/) — Online free tool for decoding & encoding data.
    
* [newreleases.io](http://newreleases.io) - Receive notifications on email, Slack, Telegram, Discord and custom webhooks for new releases from GitHub, GitLab, Bitbucket, Python PyPI, Java Maven, Node.js NPM, Node.js Yarn, Ruby Gems, PHP Packagist, .NET NuGet, Rust Cargo and Docker Hub.
    
* [OnlineExifViewer](https://onlineexifviewer.com/) — View EXIF data online instantly for a photo including GPS location and metadata.
    
* [PDFMonkey](https://www.pdfmonkey.io/) — Manage PDF templates in a dashboard, call the API with dynamic data, download your PDF. Offers 300 free documents per month.
    
* [Pika Code Screenshots](https://pika.style/templates/code-image) — Create beautiful, customizable screenshots from code snippets and VSCode using extension.
    
* [QuickType.io](http://QuickType.io) - Quickly auto generate models/class/type/interface and serializers from JSON, schema, and GraphQL for working with data quickly & safely in any programming language. Convert JSON into gorgeous, typesafe code in any language.
    
* [RandomKeygen](https://randomkeygen.com/) - A free mobile-friendly tool offers a variety of randomly generated keys and passwords you can use to secure any application, service or device.
    
* [ray.so](http://ray.so) - Create beautiful images of your code snippets.
    
* [readme.com](http://readme.com) — Beautiful documentation made easy, free for Open Source.
    
* [redirection.io](http://redirection.io) — SaaS tool for managing HTTP redirections for businesses, marketing and SEO.
    
* [redirect.pizza](http://redirect.pizza) - Easily manage redirects with HTTPS support. Free plan includes 10 sources and 100.000 hits per month.
    
* [ReqBin](https://www.reqbin.com/) — Post HTTP Requests Online. Popular Request Methods include GET, POST, PUT, DELETE, and HEAD. Supports Headers and Token Authentication. Includes a basic login system for saving your requests.
    
* [Smartcar API](https://smartcar.com/) - An API for cars to locate, get fuel tank, battery levels, odometer, unlock/lock doors, etc.
    
* [snappify](https://snappify.com/) - Enables developers to create stunning visuals. From beautiful code snippets to fully fletched technical presentations. The free plan includes up to 3 snaps at once with unlimited downloads and 5 AI-powered code explanations per month.
    
* [Sunrise and Sunset](https://sunrisesunset.io/api/) - Get sunrise and sunset times for a given longitude and latitude.
    
* [superfeedr.com](http://superfeedr.com) — Real-time PubSubHubbub compliant feeds, export, analytics. Free with less customization
    
* [SurveyMonkey.com](http://SurveyMonkey.com) — Create online surveys. Analyze the results online. Free plan allows only 10 questions and 100 responses per survey.
    
* [Tiledesk](https://tiledesk.com/) - Create chatbots and conversational apps. Bring them omnichannel: from your website (live chat widget) to WhatsApp. Free plan with unlimited chatbots.
    
* [Versionfeeds](https://versionfeeds.com/) — Custom RSS feeds for releases of your favorite software. Have the latest versions of your programming languages, libraries or loved tools in one feed. (First 3 feeds are free)
    
* [videoinu](https://videoinu.com/) — Create and edit screen recordings and other videos online.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Remote Desktop Tools

* [Getscreen.me](http://Getscreen.me) — Free for 2 devices, no limits on the number and duration of sessions
    
* [Apache Guacamole™](https://guacamole.apache.org/) — Open source clientless remote desktop gateway
    
* [RemSupp](https://remsupp.com/) — On-demand support and permanent access to devices (2 sessions/day for free)
    
* [RustDesk](https://rustdesk.com/) - Open source virtual / remote desktop infrastructure for everyone!
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Game Development

* [itch.io](http://itch.io) — Free/Paid assets like sprites, tile sets, character packs, ...
    
* [Gamefresco.com](http://Gamefresco.com) — Discover, collect and share free game assets from game artists everywhere.
    
* [GameDevMarket](https://gamedevmarket.net/) — Free/Paid assets like 2D, 3D, Audio, GUI.
    
* [OpenGameArt](https://opengameart.org/) — OpenSource Game Assets like music, sounds, sprites, gifs, ...
    
* [CraftPix](https://craftpix.net/) — Free/Paid assets like 2D, 3D, Audio, GUI, backgrounds, icons, tile sets, game kits.
    
* [Game Icons](https://game-icons.net/) - Free styleable SVG/PNG icons provided under CC-BY license.
    
* [LoSpec](https://lospec.com/) — Online tools for creating pixel art and other restrictive digital art, lots of tutorials/pallet list available to choose for your games
    
* [ArtStation](https://www.artstation.com/) - MarketPlace for Free/Paid 2D, 3D assets & audios, icons, tile sets, game kits,..., Also, It can be used for showcasing your art portfolio.
    
* [Rive](https://rive.app/community/) - Community assets as well as create your own game assets using its free plan.
    
* [Poly Pizza](https://poly.pizza/) - Free low poly 3D assets
    
* [3Dassets.one](http://3Dassets.one) - Over 8,000 free/paid 3D models, and PBR materials for making textures.
    
* [3DModelsCC0](https://www.3dmodelscc0.com/) - Library of public domain 3D models made for game development.
    
* [Kenney](https://www.kenney.nl/assets/) - Free (CC0 1.0 Universal licensed) 2D, 3D, Audio, and UI game assets.
    
* [Poliigon](https://www.poliigon.com/) - Free and paid textures (with variable resolution), models, HDRIs, and brushes. Offers free plugins to export to software like Blender.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)

## Other Free Resources

* [get.localhost.direct](http://get.localhost.direct) — A better `*.`[`localhost.direct`](http://localhost.direct) Wildcard public CA signed SSL cert for [localhost](http://localhost) development with sub-domain support
    
* [Framacloud](https://degooglisons-internet.org/en/list/) — A list of Free/Libre Open Source Software and SaaS by the French non-profit [Framasoft](https://framasoft.org/en/).
    
* [github.com](http://github.com) [— FOSS for Dev](https://github.com/tvvocold/FOSS-for-Dev) — A hub of free and Open Source software for developers.
    
* [GitHub Education](https://education.github.com/pack) — Collection of free services for students. Registration required.
    
* [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) — Get a free sandbox, tools, and other resources you need to build solutions for the Microsoft 365 platform. The subscription is a 90-day [Microsoft 365 E5 Subscription](https://www.microsoft.com/microsoft-365/enterprise/e5) (Windows excluded) which is renewable. It is renewed if you're active in development(measured using telemetry data & algorithms).
    
* [RedHat for Developers](https://developers.redhat.com/) — Free access to Red Hat products including RHEL,OpenShift,CodeReady etc exclusively for developers. Individual plan only. Free e-Books also offered for reference.
    
* [smsreceivefree.com](http://smsreceivefree.com) — Provides free temporary and disposable phone numbers.
    
* [simplebackups.io](http://simplebackups.io) — Backup automation service for servers and databases (MySQL, PostgreSQL, MongoDB) stored directly into cloud storage providers (AWS, DigitalOcean, Backblaze...). Provides free plan for 1 backup.
    
* [SnapShooter](https://snapshooter.com/) — Backup solution for DigitalOcean, AWS, LightSail, Hetzner and Exoscale, with support for direct database, file system and application backups to s3 based storage. Provides a free plan with daily backups for one resource.
    
* [Themeselection](https://themeselection.com/) — Selected high quality, modern design, professional and easy-to-use Free Admin Dashboard Template, HTML Themes and UI Kits to create your applications faster!
    
* [Web.Dev](http://Web.Dev) — This is a free tool that allows you to see the performance of your website and improve the SEO to get higher rank list in search engines.
    
* [SETools.xyz](http://SETools.xyz) — This website provide free tools for developers and everyone. We are having tools like base64 encoder, URL Encoder, character counter, SHA256, MD5 Hash.
    
* [SmallDev.tools](http://SmallDev.tools) — A free tool for developers that allows you to Encode/Decode various formats, Minify HTML/CSS/Javascript, Beautify, Generate Fake/Testing real like dataset in JSON/CSV & multiple other formats and many more features. With a delightful interface.
    
* [UseCSV by Layercode](https://layercode.com/usecsv) — Add CSV and Excel import to your web app in minutes. Give your users an enjoyable and robust data import experience. Get Started for Free without any credit card details, and start integrating UseCSV today. You can create unlimited Importers and upload files up to 100Mb.
    
* [Buttons Generator](https://markodenic.com/tools/buttons-generator/) — 100+ buttons you can use in your project.
    
* [WrapPixel](https://www.wrappixel.com/) — Download High Quality Free and Premium Admin dashboard template created with Angular, React, VueJs, NextJs and NuxtJs!
    
* [Utils.fun](http://Utils.fun) — All offline daily and development tools based on the browser's computing power, including watermark generation, screen recording, encoding and decoding, encryption and decryption and code formatting, are completely free and do not upload any data to the cloud for processing.
    
* [QR Code Robot](https://qr-code-robot.com/) — Free QR Code Generator. Offers possibilty to generate a QR Code for a webpage, sms, email, wifi auth or free text. Plans to offer also a generator for file sharing (pdf, mp3, video) and also a scan tracking of QR code.
    
* [Free Code Tools](https://freecodetools.org/) — Effective code tools which are 100% free. Markdown editor, Code minifier/beautifier, QR code generator, Open Graph Generator, Twitter card Generator and more.
    
* [regex101](https://regex101.com/) — Free this website allows you to test and debug regular expressions (regex). It provides a regex editor and tester, as well as helpful documentation and resources for learning regex.
    
* [Kody Tools](https://www.kodytools.com/dev-tools) — 100+ dev tools including formatter, minifier, and converter.
    
* [AdminMart](https://adminmart.com/) — High Quality Free and Premium Admin Dashboard and Website Templates created with Angular, Bootstrap, React, VueJs, NextJs and NuxtJs!
    
* [Glob tester](https://globster.xyz/) — A website that allows you to design and test glob patterns. It also provides resources to learn glob patterns.
    

[**⬆️ Back to Top**](https://eplus.dev/free-for-developers#table-of-contents)