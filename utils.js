const fs = require('fs')
const chalk = require('chalk')

const addnotes = (title, body) => {
    const previousNote = loadNotes();
    previousNote.push({
        title: title,
        body: body
    })
    saveNote(previousNote)
}

const saveNote = previousNote => {
    const stringData = JSON.stringify(previousNote)
    fs.writeFileSync('./notes.json', stringData)
}

const loadNotes = () => {
    try {
        const getBufferedNotes = fs.readFileSync('./notes.json')
        const notes = JSON.parse(getBufferedNotes)
        return notes
    }
    catch (e) {
        return []
    }
}

const removeNotes = title => {
    const previousNote = loadNotes()
    const noteToKeep = previousNote.filter(function (note) {
        return note.title !== title
    })
    saveNote(noteToKeep)
}

const listNotes = () => {
    const allNotes = loadNotes()
    allNotes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = title => {
    const loadAllNotes = loadNotes()
    const findNotes = loadAllNotes.find((note) => {
        return note.title === title
    })
debugger

    if (findNotes) {
        console.log(chalk.inverse.green(findNotes.title))
    }
    else {
        console.log(chalk.inverse.red('no notes found'))
    }
}
module.exports = {
    addNotes: addnotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}