import fs from 'fs'
import path from 'path'


export function readDirAsync(dir: string): Promise<string[]> {

  return new Promise((resolve, reject) => {

    fs.readdir(dir, (err, files) => {

      if(err) reject(err)
      resolve(files.map(file => { return path.join(dir, file) }))

    })

  })

}


export function readFileAsync(filename: string, encoding: string) {

  return new Promise((resolve, reject) => {

    let file = path.basename(filename)

    fs.readFile(filename, encoding, (err, data) => {

      if(err) reject(err)
      resolve({ file, data })

    })

  })

}


export function fileExists(file: string) {

  return fs.existsSync(file)

}


export function getFile(file: string) {

  return readFileAsync(file, 'utf8')

}


export function isDataFile(file: string) {

  return file.endsWith('.json')

}
