import fs from 'fs'
import path from 'path'

import { Action } from '../action'

import * as paths from '../../paths'



export const FileExists = Action({
  public: false,
  fields: {
    file: { default: null, type: 'string', required: true }
  },
  method: async function({ file }) {
    await fs.promises.access(file, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  }
})


/**
 * Creates a new file on the system.
 */

export const CreateFile = Action({
  public: true,
  icon: 'file-plus',
  title: 'Create File',
  description: 'Creates a new file on the system',
  fields: {
    location: { default: paths.root, field: 'text', type: 'string', required: true },
    filename: { default: null, type: 'string', field: 'text', required: true },
    content:  { default: null, type: 'string', field: 'textarea', required: true }
  },
  method: async function({ location, filename, content }) {
    await fs.promises.writeFile(path.join(location, filename), content)
  }
})


/**
 * Deletes a file from the system.
 */

export const DeleteFile = Action({
  public: true,
  icon: 'file-times',
  title: 'Delete File',
  description: 'Deletes a file from the system',
  fields: {
    file: { default: null, type: 'string', field: 'text', required: true }
  },
  method: async function({ file }) {
    await fs.promises.unlink(file)
  }
})
