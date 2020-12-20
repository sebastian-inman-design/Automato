import { Browser } from '../browser'
import { Action } from '../action'


/**
 * Alias method for checking the DOM for an element using the
 * provided selector. It will parse the active page and look
 * for the first element that matches the provided selector.
 */

export const Select = Action({
  public: true,
  icon: 'clock',
  title: 'Wait for Element',
  description: 'Waits for an element to become visible on the page',
  helper: 'When {{selector}} becomes visible',
  fields: {
    selector: { label: 'Element Selector', default: null, type: 'string', field: 'text', required: true }
  },
  method: async function({ selector }) {
    await Browser.page.waitForSelector(selector, { visible: true })
  }
})


/**
 * Alias method for hovering over a DOM element in the browser.
 * This alias method first checks to make sure the element actually
 * exists before attempting to hover over it.
 */

export const Hover = Action({
  public: true,
  icon: 'mouse-pointer',
  title: 'Hover Element',
  description: 'Triggers a hover event on the element',
  helper: 'Hover over {{selector}}',
  fields: {
    selector: { label: 'Element Selector', default: null, type: 'string', field: 'text', required: true }
  },
  method: async function({ selector }) {
    await Select({ selector })
    await Browser.page.hover(selector)
  }
})


/**
 * Alias method for focusing on a DOM element in the browser.
 * This alias method first checks to make sure the element actually
 * exists before attempting to focus on it.
 */

export const Focus = Action({
  public: true,
  icon: 'eye',
  title: 'Focus Element',
  description: 'Triggers a focus event on the element',
  helper: 'Focus on {{selector}}',
  fields: {
    selector: { label: 'Element Selector', default: null, type: 'string', field: 'text', required: true }
  },
  method: async function({ selector }) {
    await Select({ selector })
    await Browser.page.focus(selector)
  }
})


/**
 * Alias method for clicking on a DOM element in the browser.
 * The default Puppeteer "click" method seems to only work about 50% of the time.
 * This alias method forces the virtual mouse to "hover" over the element before 
 * emulating the actual click, making it much more reliable.
 */

export const Click = Action({
  public: true,
  icon: 'hand-pointer',
  title: 'Click Element',
  description: 'Triggers a click event on the element',
  helper: 'Click on {{selector}}',
  fields: {
    selector: { label: 'Element Selector', default: null, type: 'string', field: 'text', required: true }
  },
  method: async function({ selector }) {
    await Hover({ selector })
    await Browser.page.click(selector)
  }
})


/**
 * Alias method for typing a value into an input DOM element in the browser.
 * The method attempts to focus on the input before trying to type anything
 * into the input.
 */

export const Type = Action({
  public: true,
  icon: 'i-cursor',
  title: 'Enter Text',
  description: 'Enters text into the input field',
  helper: 'Type "{{value}}" into {{selector}}',
  fields: {
    selector: { label: 'Element Selector', default: null, type: 'string', field: 'text', required: true },
    value: { label: 'Text Value', default: null, type: 'string', field: 'text', required: true },
    delay: { label: 'Input Delay', default: 75, type: 'number', field: 'number', required: false }
  },
  method: async ({ selector, value, delay }) => {
    await Focus({ selector })
    await Browser.page.type(selector, value, { delay })
  }
})
