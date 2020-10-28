const fsModule=require('fs')

const readFile = fsModule.readFileSync('./jsondata.json')
const bufferedData=JSON.parse(readFile)
console.log(bufferedData.name)

bufferedData.name='soumajit'
bufferedData.age='30'

const parseData=JSON.stringify(bufferedData)
const writeFile=fsModule.writeFileSync('./jsondata.json',parseData)