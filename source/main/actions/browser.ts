import { Action } from '../action'


/**
 * Static method for creating a new instance of the application.
 * This will create an instance of Puppeteer, open a new Chromium
 * browser, and set the default page.
 * @param {string} url
 * @param {puppetter.LaunchOptions} options
 */

export const Launch = Action({
  public: false,
  method: async function() {
    console.log('launch action called')
  }
})


/**
 * Overrides the browsers default permissions.
 * This allows you to force the browser to allow
 * certain permissions by default, such as notifications,
 * geolocation, webcam access, etc.
 */

export const Allow = Action({
  public: false,
  fields: { 
    permissions: { default: [], required: true }
   },
  method: async function({ permissions }) {
    return new Promise(resolve => {
      console.log('allow action called')
    })
  }
})


/**
 * Alias method for getting all available pages
 * that are currently open in the browser.
 */

export const GetPages = Action({
  public: false,
  method: async () => {
    console.log('get pages action called')
  }
})


/**
 * Sets the active page to the supplied page index.
 */

export const SetActivePage = Action({
  public: false,
  fields: {
    index: { default: 0, type: 'number', required: true }
  },
  method: async function({ index }) {
    await GetPages()
    console.log('set active page action called')
  }
})


/**
 * Alias method for creating a new page within the browser
 * and optionally navigating to a URL in that page. If no
 * URL is specified, it will just open a blank page.
 * @param {string|null} url
 */

export const NewPage = Action({
  public: true,
  icon: 'window-alt',
  title: 'New Page',
  description: 'Opens a new page in the browser',
  helper: 'Open a new page at {{url}}',
  fields: {
    url: { label: 'Web Address', default: null, type: 'string', field: 'url', required: true }
  },
  method: async function({ url }) {
    console.log('new page action called')
    if(url) await Navigate({ url })
  }
})


export const RefreshPage = Action({
  public: true,
  icon: 'sync-alt',
  title: 'Refresh Page',
  description: 'Refreshes the active page',
  helper: 'Refresh the current page',
  method: async function() {
    console.log('refresh page action called')
  }
})


/**
 * Alias method for closing the currently active
 * page in the browser.
 */

export const ClosePage = Action({
  public: false,
  icon: 'window-close',
  title: 'Close Page',
  description: 'Closes the active page',
  helper: 'Close the current page',
  method: async function() {
    console.log('close page action called')
  }
})


/**
 * Alias method for navigating the active page to the URL.
 * The method will wait for the DOM content to finish loading 
 * before resolving.
 * @param {string} url
 */

export const Navigate = Action({
  public: true,
  icon: 'search',
  title: 'Enter URL',
  description: 'Navigates to the supplied URL',
  helper: 'Navigate to {{url}}',
  fields: {
    url: { label: 'Web Address', default: null, type: 'string', field: 'url', required: true }
  },
  method: async function({ url }) {
    console.log('navigate action called')
  }
})


/**
 * Alias method for closing the browser window
 * and destroying the Puppeteer instance.
 */

export const Close = Action({
  public: false,
  title: 'Close Browser',
  method: async function() {
    console.log('close browser action called')
  }
})
