import { join, dirname } from 'path' 
import { createRequire } from "module";
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import chalk from "chalk"
import { createInterface } from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) 
const { name, author } = require(join(__dirname, './package.json')) 
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

try {
const startColor = chalk.rgb(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
console.log(startColor('❤️ Iniciando...'));

function getRandomColor() {
const colors = ['system', 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright', 'candy'];
const randomIndex = Math.floor(Math.random() * colors.length);
return colors[randomIndex]}

function getRandomHexColor() {
const hexColors = ['#3456ff', '#f80', '#f00808', '#fefe62', '#ff00ff', '#00ffff', '#ffffff', '#00ff00', '#8b00ff', '#ff5733', '#00ced1']
const randomIndex = Math.floor(Math.random() * hexColors.length)
return hexColors[randomIndex]}

const options = {
 font: 'block',
 align: 'center',
 colors: getRandomGradient(),
 background: 'transparent',
 letterSpacing: 1,
 lineHeight: 1,
 space: true,
 maxLength: '0',
}

function getRandomGradient() {  
const useRandomHexColors = Math.random() < 0.5; // 50% colors
if (useRandomHexColors) {
return [getRandomHexColor(), getRandomHexColor()]
} else {
return [getRandomColor(), getRandomColor()];
}}
cfonts.say('gatabot\nlite\nmd'.trim(), options)

} catch (err) {
say('GataBot\nLite\nMD', {
 font: 'chrome',
 align: 'center',
 gradient: ['red', 'magenta']
})}

say(`Project Author:\nGataNina-Li (@gata_dios)\n\nDeveloper:\nelrebelde21 (Mario)`.trim(), {
 font: 'console',
 align: 'center',
 colors: ['candy']
})

let isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true
const args = [join(__dirname, file), ...process.argv.slice(2)]

setupMaster({
exec: args[0],
args: args.slice(1)})
const p = fork()
p.on('message', (data) => {
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
isRunning = false;
console.error('⚠️ ERROR ⚠️ >> ', code)
p.process.kill()
isRunning = false
start.apply(this, arguments)
if (process.env.pm_id) {
process.exit(1)
} else {
process.exit()
}})
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test']) {
if (!rl.listenerCount()) {
rl.on('line', (line) => {
p.emit('message', line.trim())
})
}}}
start('main.js')
