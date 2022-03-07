const rollup = require('rollup')
const fs = require('fs')

const builds = require('./config').getAllBuilds()
build(builds)

function build(builds) {
    let built = 0
    const total = builds.length
    const next = () => {
        buildEntry(builds[built]).then(() => {
            built++
            if (built < total){
                next()
            }
        })
    }
    next()
}
function buildEntry(config) {
    const output = config.output
    const { file } = output

    return rollup.rollup(config)
        .then(bundle => bundle.generate(output))
        .then(({ output: [{ code }] }) => {
            return write(file, code)
        }).catch(logError)
}
function logError (e) {
    console.log(e)
}
function write (dest, code, zip) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if (err) reject(err)
            resolve()
        })
    })
}