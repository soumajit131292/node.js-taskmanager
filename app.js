const { demandOption } = require('yargs')
// const fs=require('fs')

// fs.writeFileSync('note.txt','hi, I am soumajit Roy ')
// fs.appendFileSync('note.txt','hi, I am looking for a new job ')

const yargs = require('yargs')
const note = require('./utils.js')
// const getNotes = myNotes()
// console.log(getNotes)

// const chalk=require('chalk')

// const log=console.log

// const error=chalk.italic.redBright
console.log(yargs.argv)
yargs.version('1.10.01')

// log(error('hi'))

yargs.command({
    command: 'list',
    describe: 'list all your notes',
    handler: () => {
        note.listNotes()
    }
}).argv

yargs.command({
    command: 'add',
    describe: 'add your notes',
    builder: {
        title: {
            describe: 'enter your title',
            demandOption: 'true',
            type: 'string'
        },
        body: {
            describe: 'enter your title',
            demandOption: 'true',
            type: 'string'
        }
    },

    handler: argv => {
        note.addNotes(argv.title, argv.body)
    }
}).argv

yargs.command({
    command: 'remove',
    describe: 'delete your notes',
    builder: {
        title: {
            describe: 'enter the title to delete your note',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler: argv => {
        note.removeNotes(argv.title)
    }
}).argv

yargs.command({
    command: 'read',
    describe: 'readyour notes',
    builder: {
        title: {
            describe: 'enter your note title',
            demandOption: 'true',
            type: 'string'
        }

    },
    handler: argv => {
        note.readNote(argv.title)
    }
}).argv