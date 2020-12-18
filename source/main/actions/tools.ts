import path from 'path'

import { Action } from '../action'

import * as paths from '../../paths'


/**
 * An asynchronus setTimeout method.
 * Allows for delays in between other async methods.
 */

export const Sleep = Action({
  public: true,
  icon: 'snooze',
  title: 'Sleep',
  description: 'Delays the following action',
  helper: 'Wait for {{delay}} seconds',
  fields: {
    delay: { label: "Seconds", default: 1, type: 'number', field: 'number', required: true }
  },
  method: async function(params) {
    return new Promise(resolve => setTimeout(resolve, Number(params.delay) * 1000))
  }
})



/**
 * Alias utility method that takes a screenshot of the active page
 * in it's current state and saves it to the specified directory. 
 */

export const Screenshot = Action({
  public: true,
  icon: 'camera',
  title: "Screenshot",
  description: 'Takes a screenshot of the active page and saves it to the system',
  helper: 'Take a screenshot of the current page',
  fields: {
    filename: { default: `${Date.now()}`, type: 'string', field: 'text', required: true },
    folder: { default: '', type: 'string', field: 'text', required: false}
  },
  method: async function({ filename, folder }) {
    if(!filename.endsWith('.png')) filename += '.png'
    return new Promise( async (resolve: any, reject: any) => {
      console.log('screenshot action called')
    })
  }
})


/**
 * Sends a push notification to the browser.
 * This just sends a websocket message to the browser,
 * the browser intercepts the message and pushed a notification
 * using the payload.
 */

export const Notification = Action({
  public: true,
  icon: 'bell',
  title: 'Notification',
  description: 'Sends a push notification',
  fields: {
    title: { label: 'Title', default: null, type: 'string', field: 'text', required: true },
    body:  { label: 'Body', default: null, type: 'string', field: 'textarea', required: false }
  },
  method: async function ({ title, body }) {
    console.log('notification action called')
  }
})