import { initClient } from 'messagebird';
import { config } from 'dotenv';

config();

const client = initClient(process.env.API_KEY);

export function sendMessage(reminder) {
    const messageOptions = {
        originator: process.env.FROM_PHONE_NUMBER,
        recipients: reminder.phones,
        body: reminder.message,
    };

    client.messages.create(messageOptions, (err, message) => {
        if (err) {
            console.log(`\n\nMessage was not sent to ${reminder.phones}!\n\n`);
            return console.log(err);
        }

        console.log(`\n\nA message sent to ${reminder.phones.join(', ')} at ${getCurrentTime()} with the following message:\n\n${message.body}\n\n`);
    });
}

function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
