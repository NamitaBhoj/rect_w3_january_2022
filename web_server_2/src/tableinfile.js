const fs = require('fs')

function getTable (fileName) {
    const fileContentString = fs.readFileSync(fileName, 'utf8')
    const fileContentJSON = JSON.parse(fileContentString)
    return fileContentJSON
}
function saveTable (filename, table) {
    const fileContentString = JSON.stringify(table)
    fs.writeFileSync(filename, fileContentString)
}

function getRec (filename, id) {
    const table = getTable(filename)
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === id) {
            return table[i]
        }
    }
    return {}
}
function addRec (filename, rec) {
    const table = getTable(filename)
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === rec.id) {
            return false
        }
    }
    table.push(rec)
    saveTable(filename, table)
    return true
}
function updateRec (filename, rec) {
    const table = getTable(filename)
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === rec.id) {
            table.put(rec)
        } else {
            throw new Error ('id not found.')
        }
    }
}
module.exports = {
    getTable: getTable,
    saveTable: saveTable,
    getRec: getRec,
    addRec: addRec,
    updateRec: updateRec
}