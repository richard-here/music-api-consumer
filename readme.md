# Introduction
This is [music API's](https://github.com/richard-here/music-api) consumer code to run a consumer node that will subscribe to the messages published in the queue specified in music API's publisher code.

# Setup Instructions
To run the API locally, these services must be running in the local machine.

 - RabbitMQ
 - PostgreSQL

Additionally, you will need some secrets from [Mailtrap](https://mailtrap.io/) listed below. As such, you need to create a Mailtrap account first if you do not have one.

Afterwards, create an `.env` file with the following configurations.
```
#db config
PGUSER={YOUR_PGUSER}
PGHOST=localhost
PGPASSWORD={YOUR_PASSWORD}
PGDATABASE=musicapi
PGPORT=5432

#rabbitmq config
RABBITMQ_SERVER=amqp://localhost

#mailtrap config

MAIL_ADDRESS={YOUR_MAILTRAP_ADDRESS}
MAIL_PASSWORD={YOUR_MAILTRAP_PASSWORD}
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
```

`YOUR_PGUSER` and `YOUR_PASSWORD` must be configured so that they match the values in the `.env` file of the music API project.

`MAIL_ADDRESS` and `MAIL_PASSWORD` must contain the values that are gotten from your account's SMTP credentials.

Then, run the following.
```
node src/consumer.js
```

Your consumer code should be running locally and is ready to consume messages published.
