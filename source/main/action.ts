export function Action(options: ActionOptions) {

  return ((options: ActionOptions) => {

    async function action(args?: any) {

      try {

        await action.validate(args)
        await options.method(args)

      } catch(error) {

        console.error(error)

      }

    }

    action.validate = async function(args: any) {

      return new Promise( async(resolve: any, reject: any) => {

        if(!action.options.fields || Object.keys(action.options.fields).length === 0) {

          resolve()

        } else {

          Object.entries(action.options.fields).map(([key, field]: [any, ActionField]) => {

            if(field.required && args[key] === undefined) {
              reject(`${key} is a required field`)
            }

            if((field.required && field.type) && typeof args[key] !== field.type) {
              reject(`${key} must be a ${field.type}`)
            }

            if(args[key] === '') {
              reject(`${key} can not be left empty`)              
            }

          })

          resolve()

        }

      })

    }

    action.options = options

    return action

  })(options)

}
