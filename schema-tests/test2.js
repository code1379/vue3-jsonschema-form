// https://github.com/ajv-validator/ajv#getting-started
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
addFormats(ajv)
ajv.addFormat('test', (data) => {
  console.log('data', data)
  return data === 'haha'
})

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email'
    },
    msg: {
      type: 'string',
      format: 'test'
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
  name: 'jocky@xxx.com',
  msg: 'haha',
  age: 18,
  pets: ['mimi', 'mama'],
  isWorker: true
  // code: 123
}
const valid = validate(data)
if (!valid) console.log(validate.errors)
