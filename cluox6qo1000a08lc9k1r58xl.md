---
title: "Cloud Natural Language API: Qwik Start - GSP097"
seoTitle: "Cloud Natural Language API: Qwik Start - GSP097"
seoDescription: "Natural language is the language that humans use to communicate with each other. Natural language processing (NLP) is a field of computer science that is co"
datePublished: Sun Apr 07 2024 02:44:06 GMT+0000 (Coordinated Universal Time)
cuid: cluox6qo1000a08lc9k1r58xl
slug: cloud-natural-language-api-qwik-start-gsp097
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1712457787670/099309f0-018f-4efa-bc9d-79ed618d20c0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1712457801338/43556b8c-8ec2-41ca-93d9-ab1a1ca18e95.png
tags: rest-api, nlp, natural-language, sentiment-analysis, cloud-natural-language-api

---

## **Overview**

*Natural language* is the language that humans use to communicate with each other. Natural language processing (NLP) is a field of computer science that is concerned with the interaction between computers and human language. NLP research has the goal of enabling computers to understand and process human language in a way that is similar humans.

The Cloud Natural Language API is a cloud-based service that provides natural language processing capabilities. It can be used to analyze text, identify entities, extract information, and answer questions.

### Cloud Natural Language API features

**Entity Recognition:** Identify entities in text, such as people, places, and things.

**Sentiment Analysis:** Analyze the sentiment of text, such as whether it is positive, negative, or neutral.

**Information Extraction:** Extract information from text, such as dates, times, and price.

**Question Answering:** Answer questions about text.

**Integrated REST API:** Access via REST API. Text can be uploaded in the request or integrated with [Cloud Storage.](https://cloud.google.com/storage/)

---

Link: [https://www.cloudskillsboost.google/course\_templates/667/labs/461608](https://www.cloudskillsboost.google/course_templates/667/labs/461608)

---

### **Task 1. Create an API key**

* In the GCP Console open the Cloud Shell and enter the following commands:
    

```apache
gcloud auth list
gcloud config list project
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value core/project)
gcloud iam service-accounts create my-natlang-sa \
--display-name "my natural language service account"
gcloud iam service-accounts keys create ~/key.json \
--iam-account my-natlang-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com
gcloud compute ssh linux-instance
```

**Note:**

* Press Y then Enter
    
* Press two times Enter keys back-to-back times
    
* Press N then Enter
    

### **Task 2. Make an entity analysis request**

Click on the **SSH** button. You will be brought to an interactive shell. **Remain in this SSH session for the rest of the lab.**

![Click on the SSH button. You will be brought to an interactive shell. Remain in this SSH session for the rest of the lab.](https://cdn.hashnode.com/res/hashnode/image/upload/v1712457730988/83d3112b-6cc7-455a-8707-054d1a53fe9d.png align="center")

```apache
gcloud ml language analyze-entities --content="Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'." > result.json
```

Congratulations, you're all done with the lab 😄