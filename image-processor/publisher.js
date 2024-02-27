const topicNameOrId = 'cloud-name-queue';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessageWithCustomAttributes(data) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  // Add two custom attributes, origin and username, to the message
  const customAttributes = {
    origin: 'user-bucket'
  };

  const messageId = await pubSubClient
    .topic(topicNameOrId)
    .publishMessage({data: dataBuffer, attributes: customAttributes});
  console.log(`Message ${messageId} published.`);
}

module.exports = publishMessageWithCustomAttributes;