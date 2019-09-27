const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { absoltePath } = require('../path')

function HTMLWebpackPlugin(option = {}) {
  this.option = option
}

HTMLWebpackPlugin.prototype = {
  constructor: HTMLWebpackPlugin,
  init(modules, config) {
    this.getInitOption(this.option, config.output)
    let readFileString = fs.readFileSync(this.template, {encoding: 'utf8'}).toString()
    const {
      parseFileName
    } = modules

    const {
      output = {}
    } = config

    readFileString = readFileString.split('</body>').join(`   <script src="./${path.join(parseFileName)}"></script>
</body>`)
    fs.writeFile(this.targetHTML, readFileString, 'utf-8' ,err => {
    })
  },
  getInitOption(option, output = {}) {
    this.template = option.template ? absoltePath(option.template) : absoltePath(process.cwd(), './index.html')
    this.targetHTML = option.file ? absoltePath(option.file) : absoltePath(`${output.path || process.cwd()}`, `./${this.option.file || 'index'}.html`)
    console.log(this.targetHTML);
    if (!fs.existsSync(this.template)) return console.log(colors.red(`${this.template} is no Exist`))

    this.templateHTML = fs.readFileSync(this.template, 'utf-8')
  }
}


module.exports = HTMLWebpackPlugin
