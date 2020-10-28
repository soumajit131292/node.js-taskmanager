const producer = require('amqplib')
const consumer = require('../rabbitmq/consumer')

const sendMessage = async (user_message) => {
    const queueName = 'jobs'
    try {

        const connect = await producer.connect('amqp://localhost:5672')
        const channel = await connect.createChannel()
        const queue = channel.assertQueue(queueName)
        channel.sendToQueue(queueName, Buffer.from(user_message))

    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMessage