const consumer = require('amqplib')

const consumeMessage = async () => {
    const queueName = 'jobs'
   // var ms=''

    try {
        const connect = await consumer.connect('amqp://localhost:5672')
        const channel = await connect.createChannel()
        const queue = channel.assertQueue(queueName)
        const consumerMessage = channel.consume(queueName, message => {   
          const  ms=message.content.toString()
          console.log('in consumer',ms)
          return ms
        },{noAck:true})
    } catch (error) {
        console.log(error)
    }
}

module.exports = consumeMessage