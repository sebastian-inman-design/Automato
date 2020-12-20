import puppeteer from 'puppeteer'

import { Browser } from '../browser'
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
  fields: {
    browser: { default: 'chome', required: true }
  },
  method: async function({ browser }) {
    Browser.instance = await puppeteer.launch({ ...Browser.options, ...{ product: browser || 'chome' }})
    Browser.context = Browser.instance.defaultBrowserContext()
    await SetActivePage({ index: 0 })
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
      resolve(Browser.context.overridePermissions(`http://localhost`, permissions))
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
    Browser.pages = await Browser.instance.pages()
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
    Browser.page = Browser.pages[index]
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
    await Browser.page.setCacheEnabled(false)
    await Browser.page.goto(url, { waitUntil: 'load' })
  }
})


/**
 * Alias method for creating a new page within the browser
 * and optionally navigating to a URL in that page. If no
 * URL is specified, it will just open a blank page.
 * @param {string|null} url
 */

export const NewPage = Action({
  public: false,
  fields: {
    url: { label: 'Web Address', default: null, type: 'string', field: 'url', required: true }
  },
  method: async function({ url }) {
    Browser.page = await Browser.context.newPage()
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
    await Browser.page.reload()
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
    await Browser.page.close()
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
    await Browser.instance.close()
  }
})
