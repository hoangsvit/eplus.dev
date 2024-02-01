---
title: "GitHub Actions: Trigger Workflow with actions/github-script"
seoTitle: "GitHub Actions: Trigger Workflow with actions/github-script"
seoDescription: "Customers will now be able to use the GITHUB_TOKEN with workflow_dispatch and repository_dispatch events to trigger workflows. Prior to this change, events"
datePublished: Thu Feb 01 2024 06:35:28 GMT+0000 (Coordinated Universal Time)
cuid: cls2ue2g5000708l0gyekasol
slug: github-actions-trigger-workflow-with-actionsgithub-script
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1706769193578/e54c5333-d09c-4fb9-ae56-84913ed96471.gif
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1706769307097/5c7bbba6-f44c-4e06-a548-645e041e37c7.gif
tags: github-actions

---

Customers will now be able to use the `GITHUB_TOKEN` with `workflow_dispatch` and `repository_dispatch` events to trigger workflows. Prior to this change, events triggered by `GITHUB_TOKEN` would not create a new workflow run. This was done to prevent the accidental trigger of endless workflows. This update makes an exception for `workflow_dispatch` and `repository_dispatch` events since they are explicit calls made by the customer and not likely to end up in a loop.

```yaml
name: Create Workflow Dispatch

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Workflow
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.actions.createWorkflowDispatch({
              owner: context.repo.owner,
              repo: context.repo.repo,
              workflow_id: 'test.yml',
              ref: 'main',
            })
```

%[https://www.youtube.com/watch?v=ruXA4haAPoQ]