'use strict'
// const myMod = require('./firstModule.js')

// console.log(myMod.myHello())

const myMod = require('./src/myfirstmodule/index.js')
console.log(myMod.myHello())
console.log(myMod.length)
console.log(myMod.L1)
console.log(myMod.myByeBye('Marc'))

// const fs = require('fs')

// function logMsgSync (msg) {
//     if (!fs.existsSync('log')) {
//         fs.mkdirSync('log')
//         console.log('created')
//     }
//     fs.appendFileSync('./log/server_log.log ', msg)
// }
// logMsgSync('heyyyy!!!')

// // function logMsg (msg) {
// //     if (!mtLog.exists('server_log.log')) {
// //         fs.mkdir('log')
// //         console.log('created')
// //     } else {
// //         console.log('already there')
// //     }
// //     fs.appendFileSync('./log/server_log.log ', msg)
// // }
// // logMsg('this is also test')
