// https://github.com/ajv-validator/ajv#getting-started
const Ajv = require('ajv')
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
      // minLength: 10
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age'],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  name: 'jocky',
  age: 18,
  pets: ['mimi', 'mama'],
  isWorker: true
  // code: 123
}
const valid = validate(data)
if (!valid) console.log(validate.errors)
