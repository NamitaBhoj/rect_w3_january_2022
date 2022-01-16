'use strict'

const assert = require('assert')


const tableinfile = require('./src/tableinfile.js')


let users = tableinfile.getTable('users.json')

console.log(users)

tableinfile.saveTable('users.json', users)

let rec = tableinfile.getRec('users.json', 101)

assert.deepStrictEqual(rec, { id: 101, userName: 'jcote', age: 66 })

console.log(rec)


tableinfile.addRec('users.json', { id: 190, userName: 'stephane lapointe', age: 57 })

users = tableinfile.getTable('users.json')

assert(users.length === 4)



tableinfile.updateRec('users.json', { id: 199, userName: 'sophie lemieux', age: 60 })

rec = tableinfile.getRec('users.json', 199)

assert.deepStrictEqual(rec, { id: 199, userName: 'sophie lemieux', age: 36 })

console.log(rec)