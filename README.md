
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
      defaultValue: null, // This value is optionally
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
    informations: {
      type: Object,
      defaultValue: null
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
    informations: {
      firstName: 'Test'
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
  informations: { firstName: 'Test' },
  roles: [ 'customer', 'admin' ] 
}
*/

SchemaData.validate(SchemaDataFiltered).then(function(data) {
    //data = SchemaDataFiltered
    console.log(data)
}).catch(function(errors) {
    //errors = array of Error objects
    for (let error of errors) {
        console.log(error.message)
    }
})
   
```

## License

MIT Licensed, Copyright (c) 2018 Aleksandr Sokol