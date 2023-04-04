# Reminder Service

This is a simple Node.js application that sends scheduled reminders using the MessageBird API. The application uses the `express`, `node-cron`, and `messagebird` packages.

## Features

- Schedule reminders based on specific days of the week and times.
- Sends reminders to multiple recipients via SMS.
- Allows for different users to receive reminders at different times
- Supports custom messages for each user.

## Requirements

- Node.js >= 12.x
- A MessageBird account and API key.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Abdirahim888/reminder-service.git
```

2. Install dependencies:

```bash
cd reminder-service
npm install
```

## Configuration

1. Copy the .env.example file to .env:

```bash
cp .env.example .env
```

2. Fill in the .env file with your MessageBird API key, origin phone number, and reminder configurations.


## Running the Application

Start the application by running:

```bash
npm start
```

The application will be accessible at http://localhost:3000. Visit http://localhost:3000/test to test if the application is running correctly.

## Reminder Setup

To configure reminders, you will need to set environment variables in the .env file. Each reminder is configured with the following variables:

- REMINDERS_USER_X_NAME: The name of the user receiving the reminder.
- REMINDERS_USER_X_PHONE: A comma-separated list of phone numbers to send the reminder to.
- REMINDERS_USER_X_DAYOFWEEK: The day of the week for the reminder (0-6, where 0 is Sunday and 6 is Saturday).
- REMINDERS_USER_X_TIME1: The first time of the day to send the reminder (24-hour format, e.g., 08:00 or 14:30).
- REMINDERS_USER_X_TIME2: The second time of the day to send the reminder (24-hour format, e.g., 08:00 or 14:30).
- REMINDERS_USER_X_MESSAGE: The custom message for the user (optional). If not set, the default message from .env will be used, with {name} replaced by the user's name.

Replace X with the index of the reminder (0-8). You can configure up to 9 reminders in this application.

Note: If you need to add more than 9 reminders, you will need to update the reminders array in the application code.

## License

This project is licensed under the MIT License.




