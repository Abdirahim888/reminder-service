import express from 'express';

const app = express();
import cron from 'node-cron';
import twilio from 'twilio';
import {config} from 'dotenv';

config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const reminders = [];
const EVERY_SECOND_WEEK_USERS = [1];

app.get('/test', (req, res) => {
    res.send('Reminder service is running!')
})


// Iterate over environment variables and generate reminder objects
for (let i = 1; i <= 8; i++) {
    const nameKey = `REMINDERS_USER_${i}_NAME`;
    const phoneKey = `REMINDERS_USER_${i}_PHONE`;
    const dayOfWeekKey = `REMINDERS_USER_${i}_DAYOFWEEK`;
    const time1Key = `REMINDERS_USER_${i}_TIME1`;
    const time2Key = `REMINDERS_USER_${i}_TIME2`;

    // Check if all required environment variables are defined
    if (process.env[nameKey] && process.env[phoneKey] && process.env[dayOfWeekKey] && (process.env[time1Key] || process.env[time2Key])) {
        const phoneNumbers = process.env[phoneKey].split(',').map(phone => phone.trim());
        reminders.push({
            name: process.env[nameKey],
            phones: phoneNumbers,
            message: process.env.MESSAGE.replace('{name}', process.env[nameKey]),
            dayOfWeek: parseInt(process.env[dayOfWeekKey], 10),
            time1: process.env[time1Key],
            time2: process.env[time2Key]
        });
    } else {
        console.error(`Reminder for ${process.env[nameKey]} is not set because their required environment variables are not set`);
    }
}

cron.schedule('* * * * *', () => {
    const today = new Date();
    today.setDate(new Date().getDate() + 6)
    console.log('Current time is: ', today);
    const dayOfWeek = today.getDay();

    // isSecondMonday is used for every second monday
    const isSecondMonday = (Math.floor(today.getDate() / 7) % 2 === 1 && dayOfWeek === 1);

    reminders.forEach((reminder) => {
        const weeklyUser = !EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && dayOfWeek === reminder.dayOfWeek;
        const everySecondWeekUser = EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && dayOfWeek === reminder.dayOfWeek;

        if (weeklyUser || (everySecondWeekUser && (!isSecondMonday && reminder.name === process.env.REMINDERS_USER_4_NAME) || (isSecondMonday && reminder.name === process.env.REMINDERS_USER_3_NAME))) {

            const currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;
            if (currentTime === reminder.time1 || currentTime === reminder.time2) {
                Promise.all(reminder.phones.map(phone => {
                    const messageOptions = {
                        body: reminder.message, to: phone, from: process.env.FROM_PHONE_NUMBER
                    };
                    return client.messages.create(messageOptions)
                })).then((messages) => {
                    messages.forEach((message) => {
                        console.log(`A message sent to ${message.to} at ${currentTime}: ${message.body} `, messages);
                    })
                }).catch((err) => {
                    console.log(`Message was not sent to ${reminder.phones}!`);
                    console.error(err);
                });
            }
        }
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${process.env.HOST}:${PORT}`);
});
