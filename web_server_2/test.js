'use strict'

const assert = require('assert')

const tableinfile = require('./src/tableinfile')

let users = tableinfile.getTable('users.json')
console.log(users)
// const expectedUsers = [
//     {
//         id: 100,
//         userName: 'mvachon',
//         age: 12
//     },
//     {
//         id: 101,
//         userName: 'jcote',
//         age: 66
//     },
//     {
//         id: 102,
//         userName: 'pmartineau',
//         age: 99
//     }
// ]
// assert.deepStrictEqual(users, expectedUsers)

tableinfile.saveTable('users.json', users)
// test the saveTable
users = tableinfile.getTable('users.json')
// assert.deepStrictEqual(users, expectedUsers)

let rec = tableinfile.getRec('users.json', 101)
assert.deepStrictEqual(rec, { id: 101, userName: 'jcote', age: 66 })
console.log(rec)

// tableinfile.addRec('users.json', { id: 199, userName: 'stephane lapointe', age: 26 })
// users = tableinfile.getTable('users.json')
// assert(users.length === 4)

tableinfile.updateRec('users.json', {
    id: 299,
    userName: 'sophie lemieux',
    age: 36
})
rec = tableinfile.getRec('users.json', 199)
assert.deepStrictEqual(rec, { id: 199, userName: 'sophie lemieux', age: 36 })
// console.log(rec)
