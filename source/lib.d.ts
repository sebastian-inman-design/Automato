type TextFields = 'text'|'textarea'|'number'|'url'|'email'
type BoolFields = 'checkbox'|'radio'

type ActionField = {
  label?: string,
  default: any,
  required: boolean,
  type?: 'string'|'boolean'|'number',
  field?: TextFields|BoolFields,
  value?: any
}

type ActionFields = {[key: string]: ActionField}

type ActionOptions = {
  icon?: string,
  title?: string,
  public: boolean,
  description?: string,
  helper?: string,
  fields?: ActionFields,
  method: (args?: any) => Promise<any>
}
