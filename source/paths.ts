import path from 'path'


/** Project root */
export const root = path.join(__dirname, '../')

/** Root level directories */
export const tmp = path.join(root, './tmp')
export const build = path.join(root, './build')
export const source = path.join(root, './source')

/** Temp level directories */
// export const cache = path.join(tmp, './cache')
// export const reports = path.join(tmp, './reports')
// export const workflows = path.join(tmp, './workflows')
// export const pipelines = path.join(tmp, './pipelines')
// export const screenshots = path.join(tmp, './screenshots')
