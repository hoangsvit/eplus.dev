---
title: "Explore SAP Data Foundation using Looker Dashboards - GSP1046"
seoTitle: "Explore SAP Data Foundation using Looker Dashboards - GSP1046"
seoDescription: "Use Looker Dashboards with SAP data via Google Cloud Cortex for informed business decisions"
datePublished: Sun Aug 24 2025 08:59:00 GMT+0000 (Coordinated Universal Time)
cuid: cmepgi7jk000002k09xy50l2o
slug: explore-sap-data-foundation-using-looker-dashboards-gsp1046
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756025685403/9f7eeabe-c21d-4250-b064-74e8e7711a21.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756025847965/e5834c66-e340-449b-87a4-a8cf32f0d8a5.png
tags: explore-sap-data-foundation-using-looker-dashboards-gsp1046, explore-sap-data-foundation-using-looker-dashboards, gsp1046

---

## Overview

In this lab, you will visualize the Google Cloud Cortex Data Foundation for SAP by viewing reports pre-installed into a Looker instance available with this lab.

If you are unfamiliar with the [Google Cloud Cortex Data Foundation for SAP](https://cloud.google.com/solutions/cortex) you can find out more information about it at the link provided.

This scenario intends to convey how a business analyst would consume reports to have a better idea of how to run the business and make informed decisions with SAP ERP data, all within Looker’s snappy, intuitive interface.

The Google Cloud Cortex Data Foundation for SAP provides Looker Blocks to monitor sales performance and order fulfillment, hone in on customers, orders and products to dig into anomalies or answer new questions. You can find the git repository to install the [SAP Cortex Looker Block](https://github.com/looker-open-source/block-cortex-sap) in your own Looker environment at the link provided.

A connection to the BigQuery instance has been pre-created to support this lab environment.

## Task 1 - Enable Developer Mode

In this section, you will review the properties of the Looker Block which require configuration in order to pull data from BigQuery. If you are unfamiliar with Looker Blocks you can read more about them at the documentation site [here](https://docs.looker.com/data-modeling/looker-blocks).

1. Select the **Open Looker** button on the student console of the lab and enter the credentials provided to login to the Looker instance available.
    
2. Once logged in, enable **Development Mode** by selecting the toggle button in the bottom left corner of the landing page.
    

![dev_mode](https://cdn.qwiklabs.com/fU1%2BGW0Tf91G2DB9VvkSXuSmpMeM1eYNLOh7vqZqcXE%3D align="left")

## Task 2 - Explore Project in Looker

1. In the left navigation menu select **Develop** &gt; **cortex\_data\_foundation**.
    
2. In the resulting page you will see an editor view of the Looker Block pre-installed into the Looker instance. This will look very similar to the [SAP Cortex Looker Block](https://github.com/looker-open-source/block-cortex-sap) available on GitHub with minor configuration changes.
    
3. Notice that a **README.md** provides instructions on what configurations can be made on this block and how to make them. Open the file **manifest.lkml**.
    
4. Observe the constants CONNECTION\_NAME and DATASET defined in the file. These configurations instruct the Looker instance what connection to utilize to pull data warehousing data from (in this case a BigQuery instance) and what dataset that the block should use in the data warehouse instance connection once established.
    

## Task 3 - View Sample Report Data

Navigate back to the Home page of the Looker instance:

1. From the **Navigation Menu &gt; Folders**
    

![close_develop](https://cdn.qwiklabs.com/UUKUZufFY5a3g77GbviGFxMvICO%2BkiMMSwbW4E3emtE%3D align="left")

2. Select **LookML Dashboards** from the Folders landing page.
    

If the LookML Dashboards folder is not present, refresh the page

3. In the resulting page, select the **Sales Analytics** report.
    
4. Update the **Document Date** to **is in the year 2022** by clicking in the filter box to select the option and fill in the year, and then click **Update**.
    

Note that this report may take a few minutes to populate. DO NOT refresh the page multiple times while the report is loading!

The resulting report contains Sales Analytics data which an analyst can use to compare year over year product sales and order fulfillment.

![sales_analytics](https://cdn.qwiklabs.com/8Dl3TlHWMSn%2F53C35V1C%2BG2y4w4bEbCktputhSVOu3A%3D align="left")

5. In the **Customers By Location** chart, select the United States of America map to drill into the chart data. This will surface a Query result in a popup window.
    

![customer_by_location](https://cdn.qwiklabs.com/snv8BDcyF9lBORK1kZRQNA%2FNqf95uxE4jnaZgxzU5CY%3D align="left")

6. Find the customer **TESTING** and click on the three dots (...) next to the name in the **Customer Name** column.
    

![customer_name](https://cdn.qwiklabs.com/RHSSylvi%2FCSJZiZhnsd9arS4L1eZbcJ7HQTMGpQOwjQ%3D align="left")

7. From the available dashboards in the input selection, select **Customer Snapshot**. This will open a drill down into customer specific data related to the customer name `TESTING`.
    

![customer_snapshot](https://cdn.qwiklabs.com/GjcpWposQosJXUZbKLnd22PMBdyGzOywHnmTSqhB7K4%3D align="left")

As a business analyst, you can leverage the out of the box reports provided by the SAP Cortex Looker Block to understand more about the state of the business and specific customers and products. Learn more about how to deploy the underlying data at the [Cortex Data Foundation GitHub Repository](https://github.com/GoogleCloudPlatform/cortex-data-foundation).

**Note:** If the progress check below is not successful, please wait a few minutes for Looker to populate the query data, and try again.

Click Check my progress to verify the objective.

View sample report data

---

## Solution of Lab

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756025816120/ff1daf61-36f1-40ea-b637-376ef6f59504.png align="center")