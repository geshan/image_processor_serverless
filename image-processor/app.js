const express = require('express');
const vision = require('@google-cloud/vision');
const app = express();
const publishMessageWithCustomAttributes = require('./publisher')

app.use(express.json());

app.post('/', async(req, res) => {
    if (!req.body) {
      const msg = 'no Pub/Sub message received';
      console.error(`error: ${msg}`);
      res.status(400).send(`Bad Request: ${msg}`);
      return;
    }
    if (!req.body.message) {
      const msg = 'invalid Pub/Sub message format';
      console.error(`error: ${msg}`);
      res.status(400).send(`Bad Request: ${msg}`);
      return;
    }
  
    const pubSubMessage = req.body.message.data;
    const decodedMessage = JSON.parse(Buffer.from(pubSubMessage, 'base64').toString());
    const bucket = decodedMessage.bucket;
    const name = decodedMessage.name;
    const timeCreated = decodedMessage.timeCreated;
    const updated = decodedMessage.updated;

    console.log(`Bucket: ${bucket}, File: ${name}, Time Created: ${timeCreated}, Updated: ${updated}`)

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    console.log(client)
    // Performs text detection on the gcs file
    const [result] = await client.textDetection(`gs://${bucket}/${name}`);
    const detections = result.textAnnotations;
    detections.forEach(text => {
      word = text.description.toLowerCase()
      if (word == "aws" || word == "gcp" || word == "azure" || word == "google" || word == "amazon" || word == "microsoft") {
        console.log(word)
        publishMessageWithCustomAttributes(word)
      }
    }); 
    res.status(200).send();
});

module.exports = app;