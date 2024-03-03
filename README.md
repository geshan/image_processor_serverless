# Meme-o-demo!!
![Memo-o-demo](https://github.com/Lovee93/image_processor_serverless/assets/6823402/20fd055d-90d1-44ab-ba64-0ddd05f345ac)

## Introduction

As part of the talk Serverlessing like a pro, I am presenting a demo in GCP that does the following:

1. Upload a meme on Cloud Storage
2. This triggers the cloud function in the repo called `image-queuer-function`
3. The image queuer gets the details of the image such as the bucket-name, filename, updated at, created at and metadata and publishes them on an `image-queue` topic created on console.
4. Next, another cloud run application in the repo called `image-processor` subscribes to this topic gets the details of the image from the topic and then uses Cloud Vision API to detect text in the image.
5. If the image has words like "aws", "amazon", "google", "gcp", "microsoft" and "azure", then it takes that word and publishes to another topic called `cloud-name-queue` created on console.
6. This topic is subscribed by the a cloud workflow, which is triggered as soon as a message is published on this topic. And from there it checks if the word is "aws" or "amazon" - it updates the count of the appropriate column of the sheet that looks like the following:

<img width="384" alt="image" src="https://github.com/Lovee93/image_processor_serverless/assets/6823402/c2abbca3-09f1-4430-a650-583deed96244">

The code for the workflow is within the final repo called `cloud-workflow`.
