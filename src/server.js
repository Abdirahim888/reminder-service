import express from 'express';
import { config } from 'dotenv';
import { initCronJob } from './cronJob.js';
import { initReminders } from './reminders.js';
import { sendMessage } from './messageService.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.get('/test', (req, res) => {
    res.send('Reminder service is running!');
});

// initializes the reminders
const reminders = initReminders();

// sets up the cron job for scheduling and send messages using the MessageBird API.
initCronJob(reminders, sendMessage);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
