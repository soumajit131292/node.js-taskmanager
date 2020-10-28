const nodemailer = require('nodemailer');
const consumer = require('../rabbitmq/consumer')
const producer = require('../rabbitmq/producer')

/*************************************  MAIL SENDER CONFIG AND OPTIONS **************************************/

//sendGrid a different website for sending email need to implement 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soumajit131292@gmail.com',
        pass: '9883739884Sr',
    }
});

const sendMail = async (user_email) => {
    const sendtest = await producer('successfully registered')
   console.log(sendtest)
   setTimeout(()=>{
    transporter.sendMail({
        from: 'soumajit131292@gmail.com',
        to: user_email,
        subject: 'Registration',
        text: sendtest
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
   },6000)
    
    // const user_message =await consumer()   
   
}
// const postemail=(user_message)=> {
    // console.log('in sender', user_message)
    // transporter.sendMail({
    //     from: 'soumajit131292@gmail.com',
    //     to: user_email,
    //     subject: 'Registration',
    //     text: user_message
    // }, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })
// }

// setTimeout(postemail(user_message),7000)

module.exports = sendMail