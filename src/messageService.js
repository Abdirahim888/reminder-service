import { initClient } from 'messagebird';
import { config } from "dotenv";

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
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
