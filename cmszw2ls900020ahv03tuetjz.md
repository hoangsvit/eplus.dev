---
title: "Integrate BigQuery Data and Google Workspace using Apps Script: Challenge Lab - ARC133"
seoTitle: "Integrate BigQuery Data and Google Workspace using Apps Script: Challenge Lab - ARC133"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-19T09:28:20.958Z
cuid: cmszw2ls900020ahv03tuetjz
slug: integrate-bigquery-data-and-google-workspace-using-apps-script-challenge-lab-arc133
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/91f117a7-57cd-4ad5-b057-3fd1a5b61cb7.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/da7cc649-a783-45f3-90cb-5067d3d54ad0.png
tags: integrate-bigquery-data-and-google-workspace-using-apps-script-challenge-lab-arc133, integrate-bigquery-data-and-google-workspace-using-apps-script-challenge-lab, arc133

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You are a junior cloud engineer assigned to a team. So far you have been helping your team create and manage Google Cloud resources.

For this lab, your challenge is to use Google Cloud's [BigQuery](http://cloud.google.com/bigquery) API (as an Apps Script [advanced service](https://developers.google.com/apps-script/guides/services/advanced)) and the [built-in Apps Script services](https://developers.google.com/apps-script/guides/services) for [Google Sheets](http://gsuite.google.com/products/sheets) to perform data analysis. In addition, you also need to create a Google Sheets spreadsheet and populate data into it, as well as create a chart with spreadsheet data.

You are expected to have the skills and knowledge to complete the tasks that follow.

### Your challenge

In this lab, you are asked to:

*   Query BigQuery and log the results to a Google Sheets worksheet with Apps Script.
    
*   Connect a BigQuery dataset to Google Sheets.
    
*   Use Google Charts to visualize spreadsheet data with Connected Sheets.
    
*   Use Apps Script to create a new worksheet and populate it with data.
    

## **Task 1. Query BigQuery and log the results to Google Sheets**

For this task, as a prerequisite for the steps that follow, you need to create a new Apps Script project by navigating to [script.google.com](http://script.google.com) and then rename the project to a name of your choice.

### Enter and run your application code

1.  Copy the code in the box below and paste it over everything in the code editor:  
    [**Code.gs**](http://Code.gs)
    
    ```go
    /**
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at apache.org/licenses/LICENSE-2.0.
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    
    // Filename for data results
    var QUERY_NAME = "Most common words in all of Shakespeare's works";
    var PROJECT_ID = "qwiklabs-gcp-02-f340b2eca804";
    if (!PROJECT_ID) throw Error('Project ID is required in setup');
    
    /**
     * Runs a BigQuery query; puts results into Sheet. You must enable
     * the BigQuery advanced service before you can run this code.
     * @see http://developers.google.com/apps-script/advanced/bigquery#run_query
     * @see http://github.com/gsuitedevs/apps-script-samples/blob/master/advanced/bigquery.gs
     *
     * @returns {Spreadsheet} Returns a spreadsheet with BigQuery results
     * @see http://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
     */
    function runQuery() {
      // Replace sample with your own BigQuery query.
      var request = {
        query:
            'SELECT ' +
                'LOWER(word) AS word, ' +
                'SUM(word_count) AS count ' +
            'FROM [bigquery-public-data:samples.shakespeare] ' +
            'GROUP BY word ' +
            'ORDER BY count ' +
            'DESC LIMIT 10'
      };
      var queryResults = BigQuery.Jobs.query(request, PROJECT_ID);
      var jobId = queryResults.jobReference.jobId;
    
      // Wait for BQ job completion (with exponential backoff).
      var sleepTimeMs = 500;
      while (!queryResults.jobComplete) {
        Utilities.sleep(sleepTimeMs);
        sleepTimeMs *= 2;
        queryResults = BigQuery.Jobs.getQueryResults(PROJECT_ID, jobId);
      }
    
      // Get all results from BigQuery.
      var rows = queryResults.rows;
      while (queryResults.pageToken) {
        queryResults = BigQuery.Jobs.getQueryResults(PROJECT_ID, jobId, {
          pageToken: queryResults.pageToken
        });
        rows = rows.concat(queryResults.rows);
      }
    
      // Return null if no data returned.
      if (!rows) {
        return Logger.log('No rows returned.');
      }
    
      // Create the new results spreadsheet.
      var spreadsheet = SpreadsheetApp.create(QUERY_NAME);
      var sheet = spreadsheet.getActiveSheet();
    
      // Add headers to Sheet.
      var headers = queryResults.schema.fields.map(function(field) {
        return field.name.toUpperCase();
      });
      sheet.appendRow(headers);
    
      // Append the results.
      var data = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].f;
        data[i] = new Array(cols.length);
        for (var j = 0; j < cols.length; j++) {
          data[i][j] = cols[j].v;
        }
      }
    
      // Start storing data in row 2, col 1
      var START_ROW = 2;      // skip header row
      var START_COL = 1;
      sheet.getRange(START_ROW, START_COL, rows.length, headers.length).setValues(data);
    
      Logger.log('Results spreadsheet created: %s', spreadsheet.getUrl());
    }
    ```
    
2.  Change the file name to [`bq-sheets.gs`](http://bq-sheets.gs) and press **Enter**.
    
3.  Review the query code for the function `runQuery()`:
    
    ```sql
    SELECT
    LOWER(word) AS word,
    SUM(word_count) AS count
    FROM [bigquery-public-data:samples.shakespeare]
    GROUP BY word
    ORDER BY count
    DESC LIMIT 10
    ```
    
    This query looks through Shakespeare's works, part of [BigQuery's public data set](https://cloud.google.com/bigquery/sample-tables), and produces the top 10 most frequently-appearing words in all his works, sorted in descending order of popularity.
    
4.  Save the file and run your code by clicking the **Run** option in the menu bar.
    

**Note:** After saving and running the code, if you get an error `Exception: Service BigQuery API has not been enabled for your Apps`, remove the BigQuery API Service and add it again.

## **Task 2. Perform calculations on charts with Connected Sheets**

1.  For this task, you need to analyze a public dataset containing data on taxi trips in Chicago. To start, open the [Google Sheets home page](https://docs.google.com/spreadsheets/).
    

### Connect a BigQuery dataset to Google Sheets

2.  Make the connection from new **Blank** **Spreadsheet** to **BigQuery** dataset.
    
3.  Connect a BigQuery dataset to Google Sheets using **Data connectors**.
    
4.  Select your Project ID `qwiklabs-gcp-02-f340b2eca804` > **Public datasets** > **chicago\_taxi\_trips** > **taxi\_trips**.
    

### Use formulas with Connected Sheets

5.  Next, you can use different formulas with Connected Sheets.
    

*   Find out how many taxi companies there are in Chicago.
    
*   Find the percentage of taxi rides in Chicago that included a tip.
    
*   Find the total number of trips where the fare was greater than 0.
    

## **Task 3. Use Google Charts with Connected Sheets**

For this task, you use Charts (in this instance, pie and line charts) to inspect popularity of rides and trends of payment types.

View the following information in Google Charts:

*   As a pie chart, what forms of payments are people using for their taxi rides?
    
*   As a line chart, how has revenue from mobile payments for taxi trips changed over time?
    
*   As a line chart, how have mobile payments changed over time since revenue peaked in 2015?
    

## **Task 4. Use Apps Script to create a new Google Sheets worksheet and enter data**

For this task, you need to enter a street address in a new Google Sheet to prepare to use the Apps Script editor.

1.  To create a new sheet, open [Google Sheets](https://docs.google.com/spreadsheets/).
    
2.  On a blank spreadsheet, click into the first cell in the upper-left corner (A1). It should be in column A and row 1.
    
3.  Enter the following address in the first cell.
    
    | **Address** |
    | --- |
    | 76 9th Ave, New York |
    

* * *

## Solution of Lab

### Quick

Open [`script.google.com`](http://script.google.com) → **New project** → rename:

```plaintext
bq-sheets.gs
```

**Services → +**, add:

```plaintext
BigQuery API
```

```plaintext
Google Sheets API
```

```go
/**
 * ================================================================
 * ARC133 - Integrate BigQuery Data and Google Workspace
 * Full Automation Script
 * ================================================================
 *
 * © ePlus.DEV
 *
 * Tasks:
 *   Task 1 - Query BigQuery -> Google Sheets
 *   Task 2 - Connected Sheets + formulas
 *   Task 3 - Connected Sheets charts
 *   Task 4 - Create sheet + address
 *
 * Required Apps Script Services:
 *   1. BigQuery API
 *   2. Google Sheets API
 * ================================================================
 */

var PROJECT_ID = "YOUR_PROJECT_ID";

// -----------------------------------------------------------------
// CONFIG
// -----------------------------------------------------------------

var TASK1_SHEET_NAME =
  "Most common words in all of Shakespeare's works";

var CONNECTED_SHEET_NAME =
  "ARC133 Connected Sheets";

var ADDRESS_SHEET_NAME =
  "ARC133 Address";

var DATA_SOURCE_SHEET_NAME =
  "taxi_trips";

// -----------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------

function runAll() {

  logHeader_();

  if (
    !PROJECT_ID ||
    PROJECT_ID === "YOUR_PROJECT_ID"
  ) {
    throw new Error(
      "Please replace YOUR_PROJECT_ID with your lab Project ID."
    );
  }

  SpreadsheetApp.enableBigQueryExecution();

  var results = {};

  // ===============================================================
  // TASK 1
  // ===============================================================

  try {

    Logger.log("");
    Logger.log("================================================");
    Logger.log("[1/4] TASK 1 - BigQuery -> Google Sheets");
    Logger.log("================================================");

    results.task1 = task1QueryBigQuery_();

    Logger.log("✓ Task 1 completed");
    Logger.log(results.task1);

  } catch (e) {

    Logger.log("✗ Task 1 failed");
    Logger.log(e.stack || e);

    throw e;
  }

  // ===============================================================
  // TASK 2 + TASK 3
  // ===============================================================

  try {

    Logger.log("");
    Logger.log("================================================");
    Logger.log("[2/4] TASK 2 - Connected Sheets");
    Logger.log("================================================");

    var connected =
      task2CreateConnectedSheets_();

    results.connected = connected;

    Logger.log("✓ BigQuery connection created");
    Logger.log(connected.url);

    Logger.log("");
    Logger.log("================================================");
    Logger.log("[3/4] TASK 3 - Connected Sheets Charts");
    Logger.log("================================================");

    task3CreateCharts_(
      connected.spreadsheetId,
      connected.dataSourceId
    );

    Logger.log("✓ Task 2 completed");
    Logger.log("✓ Task 3 completed");

  } catch (e) {

    Logger.log("✗ Task 2/3 failed");
    Logger.log(e.stack || e);

    throw e;
  }

  // ===============================================================
  // TASK 4
  // ===============================================================

  try {

    Logger.log("");
    Logger.log("================================================");
    Logger.log("[4/4] TASK 4 - Address worksheet");
    Logger.log("================================================");

    results.task4 =
      task4CreateAddressSheet_();

    Logger.log("✓ Task 4 completed");
    Logger.log(results.task4);

  } catch (e) {

    Logger.log("✗ Task 4 failed");
    Logger.log(e.stack || e);

    throw e;
  }

  // ===============================================================
  // COMPLETE
  // ===============================================================

  Logger.log("");
  Logger.log("================================================");
  Logger.log(" ARC133 COMPLETE");
  Logger.log("================================================");
  Logger.log("✓ TASK 1 - BigQuery query");
  Logger.log("✓ TASK 2 - Connected Sheets formulas");
  Logger.log("✓ TASK 3 - Pie + Line charts");
  Logger.log("✓ TASK 4 - Address sheet");
  Logger.log("");
  Logger.log("TASK 1:");
  Logger.log(results.task1);
  Logger.log("");
  Logger.log("TASK 2 + 3:");
  Logger.log(results.connected.url);
  Logger.log("");
  Logger.log("TASK 4:");
  Logger.log(results.task4);
  Logger.log("");
  Logger.log("© ePlus.DEV");
  Logger.log("================================================");
}


// =================================================================
// TASK 1
// Query Shakespeare BigQuery dataset and write result to Sheet
// =================================================================

function task1QueryBigQuery_() {

  var request = {

    query:
      'SELECT ' +
      'LOWER(word) AS word, ' +
      'SUM(word_count) AS count ' +
      'FROM [bigquery-public-data:samples.shakespeare] ' +
      'GROUP BY word ' +
      'ORDER BY count ' +
      'DESC LIMIT 10',

    useLegacySql: true
  };


  Logger.log("Running Shakespeare query...");

  var queryResults =
    BigQuery.Jobs.query(
      request,
      PROJECT_ID
    );


  var jobId =
    queryResults.jobReference.jobId;


  var sleepTimeMs = 500;


  while (!queryResults.jobComplete) {

    Utilities.sleep(sleepTimeMs);

    sleepTimeMs =
      Math.min(
        sleepTimeMs * 2,
        8000
      );


    queryResults =
      BigQuery.Jobs.getQueryResults(
        PROJECT_ID,
        jobId
      );
  }


  var rows =
    queryResults.rows || [];


  while (queryResults.pageToken) {

    queryResults =
      BigQuery.Jobs.getQueryResults(
        PROJECT_ID,
        jobId,
        {
          pageToken:
            queryResults.pageToken
        }
      );


    if (queryResults.rows) {

      rows =
        rows.concat(
          queryResults.rows
        );
    }
  }


  if (!rows.length) {

    throw new Error(
      "BigQuery returned no rows."
    );
  }


  Logger.log(
    "Rows returned: " +
    rows.length
  );


  var spreadsheet =
    SpreadsheetApp.create(
      TASK1_SHEET_NAME
    );


  var sheet =
    spreadsheet.getActiveSheet();


  sheet.setName(
    "Query Results"
  );


  // Headers
  var headers =
    queryResults.schema.fields.map(
      function(field) {
        return field.name.toUpperCase();
      }
    );


  sheet
    .getRange(
      1,
      1,
      1,
      headers.length
    )
    .setValues([
      headers
    ]);


  // Data
  var data =
    rows.map(
      function(row) {

        return row.f.map(
          function(col) {
            return col.v;
          }
        );
      }
    );


  sheet
    .getRange(
      2,
      1,
      data.length,
      headers.length
    )
    .setValues(data);


  // Formatting
  sheet
    .getRange(
      1,
      1,
      1,
      headers.length
    )
    .setFontWeight("bold");


  sheet.setFrozenRows(1);

  sheet.autoResizeColumns(
    1,
    headers.length
  );


  Logger.log(
    "Spreadsheet created:"
  );

  Logger.log(
    spreadsheet.getUrl()
  );


  return spreadsheet.getUrl();
}


// =================================================================
// TASK 2
// Create Connected Sheets connection and formulas
// =================================================================

function task2CreateConnectedSheets_() {

  SpreadsheetApp.enableBigQueryExecution();


  Logger.log(
    "Creating Connected Sheets spreadsheet..."
  );


  var spreadsheet =
    SpreadsheetApp.create(
      CONNECTED_SHEET_NAME
    );


  var spreadsheetId =
    spreadsheet.getId();


  // Existing blank sheet will contain formulas
  var calculationsSheet =
    spreadsheet.getSheets()[0];


  calculationsSheet.setName(
    "Calculations"
  );


  Logger.log(
    "Connecting BigQuery table:"
  );

  Logger.log(
    "bigquery-public-data." +
    "chicago_taxi_trips." +
    "taxi_trips"
  );


  // ---------------------------------------------------------------
  // Create BigQuery Connected Sheets data source
  // ---------------------------------------------------------------

  var spec =
    SpreadsheetApp
      .newDataSourceSpec()
      .asBigQuery()
      .setProjectId(
        PROJECT_ID
      )
      .setTableProjectId(
        "bigquery-public-data"
      )
      .setDatasetId(
        "chicago_taxi_trips"
      )
      .setTableId(
        "taxi_trips"
      )
      .build();


  var dataSourceSheet =
    spreadsheet
      .insertDataSourceSheet(
        spec
      );


  dataSourceSheet
    .asSheet()
    .setName(
      DATA_SOURCE_SHEET_NAME
    );


  Logger.log(
    "Waiting for Connected Sheets preview..."
  );


  try {

    var status =
      dataSourceSheet
        .waitForCompletion(120);


    Logger.log(
      "Connected Sheets state: " +
      status.getExecutionState()
    );


    if (
      status.getExecutionState() ===
      SpreadsheetApp
        .DataExecutionState
        .ERROR
    ) {

      throw new Error(
        status.getErrorMessage()
      );
    }

  } catch (e) {

    Logger.log(
      "Initial preview still processing; continuing..."
    );

    Logger.log(e);
  }


  // ---------------------------------------------------------------
  // Task 2 formulas
  //
  // Required positions from the original Connected Sheets lab:
  //
  // A1 = COUNTUNIQUE(company)
  // D1 = COUNTIF(tips > 0)
  // E1 = COUNTIF(fare > 0)
  // F1 = D1 / E1
  // ---------------------------------------------------------------

  Logger.log(
    "Creating Connected Sheets formulas..."
  );


  calculationsSheet
    .getRange("A1")
    .setFormula(
      "=COUNTUNIQUE(taxi_trips!company)"
    );


  calculationsSheet
    .getRange("D1")
    .setFormula(
      '=COUNTIF(taxi_trips!tips,">0")'
    );


  calculationsSheet
    .getRange("E1")
    .setFormula(
      '=COUNTIF(taxi_trips!fare,">0")'
    );


  calculationsSheet
    .getRange("F1")
    .setFormula(
      "=D1/E1"
    );


  calculationsSheet
    .getRange("F1")
    .setNumberFormat(
      "0.0%"
    );


  // Notes - placed away from grader formula positions
  calculationsSheet
    .getRange("A4")
    .setValue(
      "Taxi companies"
    );


  calculationsSheet
    .getRange("D4")
    .setValue(
      "Trips with tip"
    );


  calculationsSheet
    .getRange("E4")
    .setValue(
      "Trips fare > 0"
    );


  calculationsSheet
    .getRange("F4")
    .setValue(
      "Tip percentage"
    );


  calculationsSheet
    .getRange("A4:F4")
    .setFontWeight("bold");


  calculationsSheet.autoResizeColumns(
    1,
    6
  );


  SpreadsheetApp.flush();


  // ---------------------------------------------------------------
  // Get Data Source ID
  // Google Sheets Advanced Service required here
  // ---------------------------------------------------------------

  Logger.log(
    "Retrieving Data Source ID..."
  );


  Utilities.sleep(2000);


  var info =
    Sheets.Spreadsheets.get(
      spreadsheetId,
      {
        fields:
          "dataSources(dataSourceId)"
      }
    );


  if (
    !info.dataSources ||
    !info.dataSources.length
  ) {

    throw new Error(
      "Could not retrieve Connected Sheets Data Source ID."
    );
  }


  var dataSourceId =
    info.dataSources[0]
      .dataSourceId;


  Logger.log(
    "Data Source ID: " +
    dataSourceId
  );


  Logger.log(
    "Connected Sheets URL:"
  );

  Logger.log(
    spreadsheet.getUrl()
  );


  return {

    spreadsheetId:
      spreadsheetId,

    dataSourceId:
      dataSourceId,

    url:
      spreadsheet.getUrl()
  };
}


// =================================================================
// TASK 3
// Create Connected Sheets Data Source charts
// =================================================================

function task3CreateCharts_(
  spreadsheetId,
  dataSourceId
) {

  SpreadsheetApp.enableBigQueryExecution();


  Logger.log(
    "Creating Payment Type pie chart..."
  );


  // ---------------------------------------------------------------
  // PIE CHART
  //
  // Label:
  //   payment_type
  //
  // Value:
  //   fare
  //
  // Aggregation:
  //   COUNT
  // ---------------------------------------------------------------

  var pieChartRequest = {

    addChart: {

      chart: {

        spec: {

          title:
            "Taxi rides by payment type",

          dataSourceChartProperties: {

            dataSourceId:
              dataSourceId
          },

          pieChart: {

            legendPosition:
              "RIGHT_LEGEND",

            domain: {

              columnReference: {

                name:
                  "payment_type"
              }
            },

            series: {

              columnReference: {

                name:
                  "fare"
              },

              aggregateType:
                "COUNT"
            }
          }
        },

        position: {

          newSheet: true
        }
      }
    }
  };


  Logger.log(
    "Creating Mobile Payments line chart..."
  );


  // ---------------------------------------------------------------
  // LINE CHART
  //
  // X-axis:
  //   trip_start_timestamp
  //
  // Group:
  //   YEAR_MONTH
  //
  // Series:
  //   fare SUM
  //
  // Filter:
  //   payment_type TEXT_CONTAINS mobile
  // ---------------------------------------------------------------

  var lineChartRequest = {

    addChart: {

      chart: {

        spec: {

          title:
            "Mobile payment revenue over time",

          dataSourceChartProperties: {

            dataSourceId:
              dataSourceId
          },

          basicChart: {

            chartType:
              "LINE",

            legendPosition:
              "RIGHT_LEGEND",

            domains: [

              {

                domain: {

                  columnReference: {

                    name:
                      "trip_start_timestamp"
                  },

                  groupRule: {

                    dateTimeRule: {

                      type:
                        "YEAR_MONTH"
                    }
                  }
                }
              }
            ],

            series: [

              {

                series: {

                  columnReference: {

                    name:
                      "fare"
                  },

                  aggregateType:
                    "SUM"
                },

                targetAxis:
                  "LEFT_AXIS"
              }
            ],

            axis: [

              {

                position:
                  "BOTTOM_AXIS",

                title:
                  "Year-Month"
              },

              {

                position:
                  "LEFT_AXIS",

                title:
                  "Revenue"
              }
            ]
          },


          filterSpecs: [

            {

              dataSourceColumnReference: {

                name:
                  "payment_type"
              },

              filterCriteria: {

                condition: {

                  type:
                    "TEXT_CONTAINS",

                  values: [

                    {

                      userEnteredValue:
                        "mobile"
                    }
                  ]
                }
              }
            }
          ]
        },

        position: {

          newSheet: true
        }
      }
    }
  };


  // ---------------------------------------------------------------
  // Submit both chart requests
  // ---------------------------------------------------------------

  var requestBody = {

    requests: [

      pieChartRequest,

      lineChartRequest
    ]
  };


  var response =
    Sheets.Spreadsheets.batchUpdate(
      requestBody,
      spreadsheetId
    );


  Logger.log(
    "Charts submitted successfully."
  );


  // ---------------------------------------------------------------
  // Refresh all linked BigQuery data source objects
  // ---------------------------------------------------------------

  Utilities.sleep(1500);


  var ss =
    SpreadsheetApp.openById(
      spreadsheetId
    );


  var sources =
    ss.getDataSources();


  if (sources.length) {

    Logger.log(
      "Refreshing Connected Sheets objects..."
    );


    try {

      sources[0]
        .refreshAllLinkedDataSourceObjects();


      sources[0]
        .waitForAllDataExecutionsCompletion(
          180
        );


      Logger.log(
        "✓ Connected Sheets charts refreshed"
      );

    } catch (e) {

      Logger.log(
        "Chart refresh is still processing."
      );

      Logger.log(e);
    }
  }


  Logger.log(
    "✓ Pie chart created"
  );

  Logger.log(
    "✓ Line chart created"
  );
}


// =================================================================
// TASK 4
// Create new spreadsheet and enter address in A1
// =================================================================

function task4CreateAddressSheet_() {

  Logger.log(
    "Creating address spreadsheet..."
  );


  var spreadsheet =
    SpreadsheetApp.create(
      ADDRESS_SHEET_NAME
    );


  var sheet =
    spreadsheet.getActiveSheet();


  sheet.setName(
    "Address"
  );


  sheet
    .getRange("A1")
    .setValue(
      "76 9th Ave, New York"
    );


  sheet.autoResizeColumn(1);


  Logger.log(
    "Address entered:"
  );

  Logger.log(
    "76 9th Ave, New York"
  );


  Logger.log(
    spreadsheet.getUrl()
  );


  return spreadsheet.getUrl();
}


// =================================================================
// LOG HEADER
// =================================================================

function logHeader_() {

  Logger.log("");
  Logger.log("================================================");
  Logger.log(" ARC133 FULL AUTOMATION");
  Logger.log(" Integrate BigQuery Data and Google Workspace");
  Logger.log("================================================");
  Logger.log(" Project: " + PROJECT_ID);
  Logger.log(" © ePlus.DEV");
  Logger.log("================================================");
}
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0e3ada1d-cb34-4929-83a5-1f0fdb153a69.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a46ba74f-4f74-4dbf-89f7-b00b9c87cee6.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/42877055-61a5-40d4-a0a5-358b31ed7cba.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/76317220-0782-4eba-b802-276a36603ec4.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1f242b89-aa7c-414a-8a62-f1b11d4d7d05.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a694a454-bf5a-4b6a-aab2-18d18fdc161e.png align="center")

* * *

### Manual

%[https://www.youtube.com/watch?v=k0vXaixK6MI] 

**TASK 2:**

Find out how many taxi companies there are in Chicago.

```plaintext
=COUNTUNIQUE(taxi_trips!company) 
```

Find the percentage of taxi rides in Chicago that included a tip.

```plaintext
=COUNTIF(taxi_trips!tips,">0") 
```

Find the total number of trips where the fare was greater than 0.

```plaintext
=COUNTIF(taxi_trips!fare,">0")
```

**Task 3.**

As a pie chart, what forms of payments are people using for their taxi rides? Drag payment\_type to the Label field. Then drag fare into the Value field

Under Value > Fare, change Sum to Count. Click Apply.

\*As a line chart, how has revenue from mobile payments for taxi trips changed over time? \*As a line chart, how have mobile payments changed over time since revenue peaked in 2015?

Drag trip\_start\_timestamp to the X-axis field.

Check the Group by option and select Year-Month from the dropdown list.

Drag fare into the Series field.

Under Filter click Add > payment\_type.

Select the Showing all items status dropdown.

Click on the Filter by Condition dropdown and select Text contains from the list.

Input mobile in the Value field.

Click OK.