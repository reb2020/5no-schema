
JSON Schema Filter/Validator

## Install

5no-schema requires Node version 8 or above.

```sh
npm install --save 5no-schema
```

## Doc

```js

const schemaJson = {
    [name]: {
      type: Number, // Number, String, Boolean, Date, Array, Object
      schema: {}, // Can describe object schema
      defaultValue: null, // This value is optionally
      format: 'YYYY-MM-DD HH:mm:ss', // This value only for Date type
      required: true, // true or false
      filters: [], // Can be 'trim', 'upperCase', 'lowerCase' or custom functions
      validators: [], // Can be custom functions
    }
}

const customFilertOrValidator = ({name, type, value, defaultValue, options}) {
  //name field
  //type field
  //value field
  //defaultValue field
  //options custom data
}
   
```

## Examples

```js
const Schema = require('5no-schema')

const schemaJson = {
    id: {
      type: Number,
      defaultValue: null,
      required: true,
      filters: [
                    ({value}) => {
                        return value + 1000
                    },
                    {
                        fn: ({value, options}) => {
                            return value + options.step
                        },
                        options: {
                            step: 100
                        }
                    }
                ],
        validators: [
                    ({value}) => {
                        if (value > 100) {
                            return 'Test Custom Error'
                        }
                        return true
                    },
                    async ({value}) => {
                        if (value > 100) {
                            return 'async Test Custom Error'
                        }
                        return true
                    },
                    {
                        fn: ({value, options}) => {
                            if (value > 100) {
                                return options.message
                            }
                            return true
                        },
                        options: {
                            message: 'Test Custom Error Options'
                        }
                    }
                ]
    },
    email: {
      type: String,
      defaultValue: null,
      required: true,
      filters: [
        'trim',
        'lowerCase'
      ]
    },
    active: {
      type: Boolean,
      defaultValue: false
    },
    createdAt: {
      type: Date,
      defaultValue: null
    },
    updatedAt: {
      type: Date,
      defaultValue: null,
      format: 'YYYY-MM-DD'
    },
    informations: {
      type: Object,
      schema: {
        firstName: {
          type: String,
          required: true
        },
        lastName: {
          type: String,
          required: true
        }
      }
    },
    address: {
      type: Object,
      defaultValue: null,
    },
    roles: {
      type: Array,
      defaultValue: null
    }
}

const schemaJsonData = {
    id: 123,
    email: 'test@test.test',
    active: true,
    createdAt: '2018-12-12 12:12:12',
    updatedAt: '2018-12-12 12:12:12',
    informations: {
        firstName: 'FirstName',
        lastName: 'LastNname'
    },
    roles: [
      'customer',
      'admin'
    ]
}

const SchemaData = new Schema(schemaJson)

const SchemaDataFiltered = SchemaData.filter(schemaJsonData)

/*
{ 
  id: 1223,
  email: 'test@test.test',
  active: true,
  createdAt: 2018-12-12T10:12:12.000Z,
  updatedAt: '2018-12-12',
  informations: { firstName: 'FirstName', lastName: 'LastNname' },
  roles: [ 'customer', 'admin' ] 
}
*/

SchemaData.validate(SchemaDataFiltered).then(function(data) {
    //data = SchemaDataFiltered
    console.log(data)
}).catch(function(errors) {
    //errors = The object consist of fields which have errors

    /*
    { 
      email: [ 'email is required' ],
      informations:
      { 
        firstName: [ 'firstName is required' ],
        lastName: [ 'lastName is required' ] 
      } 
    }
    */

    Object.keys(errors).forEach((name) => {
        for (let error of errors[name]) {
            console.log(error)
        }
    })
})


const SchemaDataJsonOptions = SchemaData.json()

/*
{
    id: {
      type: "number",
      defaultValue: null,
      required: true
    },
    email: {
      type: "string",
      defaultValue: null,
      required: true
    },
    active: {
      type: "boolean",
      defaultValue: false,
      required: false
    },
    createdAt: {
      type: "date",
      defaultValue: null,
      required: false
    },
    updatedAt: {
      type: "date",
      defaultValue: null,
      format: "YYYY-MM-DD",
      required: false
    },
    informations: {
      type: "object",
      schema: {
        firstName: {
          type: "string",
          required: true
        },
        lastName: {
          type: "string",
          required: true
        }
      }
    },
    address: {
      type: "object",
      defaultValue: null,
      required: false
    },
    roles: {
      type: "array",
      defaultValue: null,
      required: false
    }
}
*/
   
```

## License

MIT Licensed, Copyright (c) 2018 Aleksandr Sokol