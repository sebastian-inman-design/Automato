import puppeteer from 'puppeteer'

export class Browser {

  /** Puppeteer default options. */
  static options: puppeteer.LaunchOptions = {
    product: 'chrome',
    headless: false,
    defaultViewport: null,
    executablePath: process.env.chrome,
    args: ['--start-maximized', '--disable-web-security']
  }

  /** Reference to the browser. */
  static instance: puppeteer.Browser

  /** Reference to the browser context. */
  static context: puppeteer.BrowserContext

  /** Reference to all open pages. */
  static pages: Array<puppeteer.Page>

  /** Reference to the active page. */
  static page: puppeteer.Page

}
