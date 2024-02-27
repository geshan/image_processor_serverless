// [START functions_cloudevent_storage]
const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
functions.cloudEvent('imageQueuer', async cloudEvent => {
  const file = cloudEvent.data;
  const message = {
    bucket: file.bucket,
    name: file.name,
    metageneration: file.metageneration,
    timeCreated: file.timeCreated,
    updated: file.updated,
  }
  console.log("message: ", message);
  await publishMessage("image-queue", JSON.stringify(message));
});

async function publishMessage(topicNameOrId, data) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
  
    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
}