const files = [
  'bulma/css/bulma.min.css',
  'normalize.css/normalize.css'
]

const fs = require('fs-extra')
const path = require('path')
const copy = (file) => {
  fs.copySync(`./node_modules/${file}`, `./static/lib/${path.basename(file)}`)
}
files.forEach(copy)
