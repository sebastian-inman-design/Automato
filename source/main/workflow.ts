import { Browser } from './browser'
import * as Actions from './actions'

export class Workflow {

  public currentStep: number = 0
  public running: boolean = false
  public warnings: Array<any> = []

  constructor(
    public filename: string,
    public data: {
      title: string,
      steps: [any],
      thumbnail?: string
    }, 
  ) {}

  public async Execute() {

    const _Actions: any = Actions

    for(const step of this.data.steps) {

      let params: any = {}
      Object.entries(step.fields).map(([field, param]: any) => {
        params[field] = param.value || param.default
      })

      try {

        await _Actions[step.category][step.action](params)
        this.currentStep++

      } catch(error) {

        console.error(error)

      }

    }

    /** Wait for 1 second after completing all steps. */
    await Actions.Tools.Sleep({ delay: 1 })

    if(!this.data.thumbnail) {

      await Actions.Tools.Sleep({ delay: 1 })

      let thumbnail = await Browser.page.screenshot({ encoding: 'base64' }) as string
      this.data.thumbnail = `data:image/png;base64,${thumbnail}`
      
    }

  }

}