/**
 * Contains the initReminders function that initializes the reminders.
 * @returns {unknown[]}
 */
export function initReminders() {
    return [...Array(9)].map((_, i) => {
        const nameKey = `REMINDERS_USER_${i}_NAME`;
        const phoneKey = `REMINDERS_USER_${i}_PHONE`;
        const dayOfWeekKey = `REMINDERS_USER_${i}_DAYOFWEEK`;
        const time1Key = `REMINDERS_USER_${i}_TIME1`;
        const time2Key = `REMINDERS_USER_${i}_TIME2`;
        const message = `REMINDERS_USER_${i}_MESSAGE`;

        if (
            process.env[nameKey] &&
            process.env[phoneKey] &&
            process.env[dayOfWeekKey] &&
            (process.env[time1Key] || process.env[time2Key])
        ) {
            const phoneNumbers = process.env[phoneKey]
                .split(',')
                .map((phone) => phone.trim());

            return {
                name: process.env[nameKey],
                phones: phoneNumbers,
                message: process.env[message] ? process.env[message] : process.env.DEFAULT_MESSAGE.replace('{name}', process.env[nameKey]),
                dayOfWeek: parseInt(process.env[dayOfWeekKey], 10),
                time1: process.env[time1Key],
                time2: process.env[time2Key],
            };
        } else {
            console.error(
                `Reminder for ${process.env[nameKey]} is not set because their required environment variables are not set`
            );
            return null;
        }
    }).filter(Boolean);
}
