import cron from 'node-cron';

const SATURDAY = 6;
const MONDAY = 1;
const EVERY_SECOND_WEEK_USERS = [MONDAY, SATURDAY];

/**
 * This file contains the initCronJob function, which sets up the cron job for scheduling reminders.
 * It takes the reminders array and the sendMessage function as arguments.
 * @param reminders
 * @param sendMessage
 */
export function initCronJob(reminders, sendMessage) {
    cron.schedule('* * * * *', () => {
        const today = new Date();
        const dayOfWeek = today.getDay();

        const isSecondMonday = Math.floor(today.getDate() / 7) % 2 === 1 && dayOfWeek === MONDAY;
        const isSecondSaturday = Math.floor(today.getDate() / 7) % 2 === 1 && dayOfWeek === SATURDAY;

        reminders.forEach((reminder) => {
            switch (dayOfWeek) {
                case reminder.dayOfWeek:
                    if (
                        !EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) || // Check if not Monday or Saturday
                        (EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && !isSecondMonday && reminder.name === process.env.REMINDERS_USER_4_NAME) ||
                        (EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && isSecondMonday && reminder.name === process.env.REMINDERS_USER_3_NAME) ||
                        (EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && !isSecondSaturday && reminder.name === process.env.REMINDERS_USER_1_NAME) ||
                        (EVERY_SECOND_WEEK_USERS.includes(dayOfWeek) && isSecondSaturday && reminder.name === process.env.REMINDERS_USER_0_NAME)
                    ) {
                        const currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;

                        if (currentTime === reminder.time1 || currentTime === reminder.time2) {
                            sendMessage(reminder);
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    });
}
