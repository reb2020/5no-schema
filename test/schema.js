const chai = require('chai')
const i18n = require('@5no/i18n')

const Schema = require('../index')

i18n.init([
  {
    language: 'en',
    default: true,
    db: {
      '%name% has incorrect type': '%name% has incorrect type :)',
    },
  },
])

const expect = chai.expect

const schemaBooleanJson = {
  active: {
    type: Boolean,
    required: true,
    defaultValue: true,
  },
}

const schemaJson = {
  id: {
    type: Number,
    defaultValue: null,
    format: '0',
    required: true,
  },
  amount: {
    type: Number,
    defaultValue: 0,
    required: true,
  },
  cost: {
    type: Number,
    defaultValue: 0.00,
    format: '0.00',
    required: true,
  },
  email: {
    type: String,
    required: true,
    validators: [
      'email',
    ],
  },
  type: {
    type: String,
    required: false,
    allowedValues: [
      'active',
      'banned',
    ],
  },
  active: {
    type: Boolean,
    prefilled: true,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    defaultValue: '',
    format: 'YYYY-MM-DD',
  },
  informations: {
    type: Object,
    required: true,
    defaultValue: {},
    schema: {
      id: {
        type: String,
        required: true,
        validators: [
          'uuidv4',
        ],
      },
      firstName: {
        type: String,
        required: true,
        filters: [
          'lowerCase',
        ],
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: Object,
        defaultValue: {},
        schema: {
          number: {
            type: String,
            required: false,
            prefilled: true,
            defaultValue: '100500',
          },
        },
      },
    },
  },
  parameters: {
    type: Array,
    required: true,
    defaultValue: [],
    schema: {
      name: {
        type: String,
        required: true,
        filters: [
          'lowerCase',
        ],
      },
      value: {
        type: String,
        required: true,
      },
    },
  },
  address: {
    type: Object,
    defaultValue: null,
  },
  roles: {
    type: Array,
    defaultValue: null,
  },
  roleName: {
    type: String,
    defaultValue: null,
  },
}

const schemaJsonOptions = {
  id: {
    type: 'number',
    defaultValue: null,
    format: '0',
    required: true,
  },
  amount: {
    type: 'number',
    defaultValue: 0,
    required: true,
  },
  cost: {
    type: 'number',
    defaultValue: 0.00,
    format: '0.00',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  type: {
    type: 'string',
    required: false,
    allowedValues: [
      'active',
      'banned',
    ],
  },
  active: {
    type: 'boolean',
    defaultValue: false,
    required: false,
  },
  createdAt: {
    type: 'date',
    required: false,
  },
  updatedAt: {
    type: 'date',
    defaultValue: '',
    format: 'YYYY-MM-DD',
    required: false,
  },
  informations: {
    type: 'object',
    defaultValue: {},
    required: true,
    schema: {
      id: {
        type: 'string',
        required: true,
      },
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
      phone: {
        type: 'object',
        required: false,
        defaultValue: {},
        schema: {
          number: {
            type: 'string',
            required: false,
            defaultValue: '100500',
          },
        },
      },
    },
  },
  parameters: {
    type: 'array',
    defaultValue: [],
    required: true,
    schema: {
      name: {
        type: 'string',
        required: true,
      },
      value: {
        type: 'string',
        required: true,
      },
    },
  },
  address: {
    type: 'object',
    defaultValue: null,
    required: false,
  },
  roles: {
    type: 'array',
    defaultValue: null,
    required: false,
  },
  roleName: {
    type: 'string',
    defaultValue: null,
    required: false,
  },
}

const schemaJsonData = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  active: true,
  type: 'active',
  test: 'Param Is Not Described In Schema',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'FirstName',
    lastName: 'LastNname',
  },
  parameters: [
    {
      name: 'FirstName',
      value: 'LastNname',
    },
    {
      name: 'FirstName1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaJsonDataReturn = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  active: true,
  type: 'active',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'FirstName',
    lastName: 'LastNname',
    phone: {
      number: '100500',
    },
  },
  parameters: [
    {
      name: 'FirstName',
      value: 'LastNname',
    },
    {
      name: 'FirstName1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaPrefilledJsonData = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  type: 'active',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'FirstName',
    lastName: 'LastNname',
  },
  parameters: [
    {
      name: 'FirstName',
      value: 'LastNname',
    },
    {
      name: 'FirstName1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaPrefilledDataReturn = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  active: false,
  type: 'active',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  address: null,
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'firstname',
    lastName: 'LastNname',
    phone: {},
  },
  parameters: [
    {
      name: 'firstname',
      value: 'LastNname',
    },
    {
      name: 'firstname1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaPrefilledDataReturnOne = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  active: false,
  type: 'active',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'firstname',
    lastName: 'LastNname',
  },
  parameters: [
    {
      name: 'firstname',
      value: 'LastNname',
    },
    {
      name: 'firstname1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaFilterJsonDataReturn = {
  id: 123,
  amount: 10.5,
  cost: 12.89,
  email: 'customer@test.test',
  active: true,
  type: 'active',
  createdAt: new Date('2018-12-12 12:12:12'),
  updatedAt: '2018-12-12',
  informations: {
    id: 'b52879ec-8e3f-4ec2-8c8a-b35e0e1dd661',
    firstName: 'firstname',
    lastName: 'LastNname',
  },
  parameters: [
    {
      name: 'firstname',
      value: 'LastNname',
    },
    {
      name: 'firstname1',
      value: 'LastNname1',
    },
  ],
  roles: [
    'customer',
    'admin',
  ],
  roleName: null,
}

const schemaFilterJsonDataReturnOnePart = {
  id: 123,
  cost: 12.89,
  active: true,
  createdAt: new Date('2018-12-12 12:12:12'),
}

describe('Schema', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Validate', () => {
    it('validator has to return data', async() => {
      const SchemaData = new Schema(schemaJson)
      const SchemaDataValidate = await SchemaData.validate(schemaJsonData)

      expect(SchemaDataValidate).to.eql(Object.assign({}, schemaJsonDataReturn, {updatedAt: '2018-12-12'}))
    })

    it('validator has to return error of type Number', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {id: 'test'}))
      } catch (e) {
        SchemaDataValidate = e.id[0]
      }

      expect(SchemaDataValidate).to.eql('id has incorrect type :)')
    })

    it('validator has to return error of format Number', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {cost: 12.123}))
      } catch (e) {
        SchemaDataValidate = e.cost[0]
      }

      expect(SchemaDataValidate).to.eql('cost has incorrect number format')
    })

    it('validator has to return error of type String', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {email: 150}))
      } catch (e) {
        SchemaDataValidate = e.email[0]
      }

      expect(SchemaDataValidate).to.eql('email has incorrect type :)')
    })

    it('validator has to return error of type Boolean', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {active: 1}))
      } catch (e) {
        SchemaDataValidate = e.active[0]
      }

      expect(SchemaDataValidate).to.eql('active has incorrect type :)')
    })

    it('validator has to return error of type Date', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {createdAt: 'test'}))
      } catch (e) {
        SchemaDataValidate = e.createdAt[0]
      }

      expect(SchemaDataValidate).to.eql('createdAt has incorrect date format')
    })

    it('validator has to return error of type Object', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {address: 'test'}))
      } catch (e) {
        SchemaDataValidate = e.address[0]
      }

      expect(SchemaDataValidate).to.eql('address has incorrect type :)')
    })

    it('validator has to return error of type Array', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {roles: 'test'}))
      } catch (e) {
        SchemaDataValidate = e.roles[0]
      }

      expect(SchemaDataValidate).to.eql('roles has incorrect type :)')
    })

    it('validator has to return error of type String with additional validator by email', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {email: 'test@'}))
      } catch (e) {
        SchemaDataValidate = e.email[0]
      }

      expect(SchemaDataValidate).to.eql('email has incorrect email format')
    })

    it('validator has to return error of type String with additional validator by allowedValues', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {type: 'test'}))
      } catch (e) {
        SchemaDataValidate = e.type[0]
      }

      expect(SchemaDataValidate).to.eql('type should be equal to one of the allowed values')
    })

    it('validator has not to return error of type Boolean', async() => {
      const SchemaData = new Schema(schemaBooleanJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, {active: false}))
      } catch (e) {
        SchemaDataValidate = e.active[0]
      }

      expect(SchemaDataValidate.active).to.eql(false)
    })

    it('validator has to return errors', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {
          id: 'tt',
          email: 112,
          active: 0,
          createdAt: true,
          informations: '1000',
          roles: '222',
        }))
      } catch (e) {
        SchemaDataValidate = e
      }

      expect(SchemaDataValidate).to.eql({
        id: ['id has incorrect type :)'],
        email: ['email has incorrect type :)'],
        active: ['active has incorrect type :)'],
        createdAt: ['createdAt has incorrect type :)'],
        roles: ['roles has incorrect type :)'],
        informations: ['informations has incorrect type :)'],
      })
    })

    it('validator has to return uuid errors', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {
          id: 'tt',
          email: 112,
          active: 0,
          createdAt: true,
          informations: {
            id: '123',
            firstName: '123',
            lastName: '123',
          },
          roles: '222',
        }))
      } catch (e) {
        SchemaDataValidate = e
      }

      expect(SchemaDataValidate).to.eql({
        id: ['id has incorrect type :)'],
        email: ['email has incorrect type :)'],
        active: ['active has incorrect type :)'],
        createdAt: ['createdAt has incorrect type :)'],
        roles: ['roles has incorrect type :)'],
        informations: {
          id: [
            'id has incorrect uuid format',
          ],
        },
      })
    })

    it('validator does not need to return errors of not required fields', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        email: {
          type: String,
          required: false,
          defaultValue: '',
          validators: [
            'email',
          ],
        },
      }))
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate({
          id: 123,
          amount: 10.5,
          cost: 10.5,
          email: '',
          informations: {},
          parameters: [],
        })
      } catch (e) {
        SchemaDataValidate = e
      }

      expect(SchemaDataValidate).to.eql({ active: false, id: 123, amount: 10.5, cost: 10.5, email: '', informations: {}, parameters: [] })
    })

    it('validator has to return errors of required fields', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate({
          active: false,
        })
      } catch (e) {
        SchemaDataValidate = e
      }

      expect(SchemaDataValidate).to.eql({
        id: ['id is required'],
        amount: ['amount is required'],
        cost: ['cost is required'],
        email: ['email is required'],
        informations: [
          'informations is required',
        ],
        parameters: [
          'parameters is required',
        ],
      })
    })

    it('custom validator has to return error', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        id: {
          type: Number,
          defaultValue: null,
          required: true,
          validators: [
            ({value}) => {
              if (value > 100) {
                return 'Test Custom Error'
              }
              return true
            },
            async({value}) => {
              if (value > 100) {
                return 'async Test Custom Error'
              }
              return true
            },
            {
              fn: ({value, options, previousResult}) => {
                if (previousResult === true) {
                  if (value > 100) {
                    return options.message
                  }
                  return true
                }
              },
              options: {
                message: 'Test Custom Error Options',
              },
            },
          ],
        },
      }))
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData))
      } catch (e) {
        SchemaDataValidate = []
        Object.keys(e).forEach((name) => {
          for (let error of e[name]) {
            SchemaDataValidate.push(error)
          }
        })
      }

      expect(SchemaDataValidate).to.eql([
        'Test Custom Error',
        'async Test Custom Error',
      ])
    })

    it('validator doesn\'t exist', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        id: {
          type: Number,
          defaultValue: null,
          required: true,
          validators: [
            'test',
          ],
        },
      }))
      let SchemaDataValidate = null
      try {
        SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData))
      } catch (e) {
        SchemaDataValidate = e.message
      }

      expect(SchemaDataValidate).to.eql("Doesn\'t exist \'test\'")
    })
  })

  describe('Filter', () => {
    it('filter has to return correct data types', async() => {
      const SchemaData = new Schema(schemaJson)
      const SchemaDataFiltered = await SchemaData.filter(Object.assign({}, schemaJsonData, {
        id: '123',
        cost: 12.892,
        active: 1,
        createdAt: '2018-12-12 12:12:12',
      }))

      expect(SchemaDataFiltered).to.eql(schemaFilterJsonDataReturn)
    })

    it('filter has to return one part of correct data types', async() => {
      const SchemaData = new Schema(schemaJson)
      const SchemaDataFiltered = await SchemaData.filter(Object.assign({}, {
        id: 123.1,
        cost: '12.892',
        active: 1,
        createdAt: '2018-12-12 12:12:12',
      }))

      expect(SchemaDataFiltered).to.eql(schemaFilterJsonDataReturnOnePart)
    })

    it('filter schema', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataFiltered = null
      try {
        SchemaDataFiltered = await SchemaData.filter(Object.assign({}, schemaJsonData, {
          id: 'tt',
          email: 112,
          active: 0,
          createdAt: true,
          informations: '1000',
          roles: '222',
        }))
      } catch (e) {
        SchemaDataFiltered = e
      }

      expect(SchemaDataFiltered.informations).to.eql({})
    })

    it('custom filter', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        id: {
          type: Number,
          defaultValue: null,
          required: true,
          filters: [
            async({value}) => {
              return value + 1000
            },
            {
              fn: ({value, options}) => {
                return value + options.step
              },
              options: {
                step: 100,
              },
            },
          ],
        },
      }))
      const SchemaDataFiltered = await SchemaData.filter(schemaJsonData)

      expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaFilterJsonDataReturn, {
        id: 1223,
      }))
    })

    it('trim filter', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        email: {
          type: String,
          defaultValue: null,
          required: true,
          filters: [
            'trim',
          ],
        },
      }))
      const SchemaDataFiltered = await SchemaData.filter(Object.assign({}, schemaJsonData, {
        email: '  customer@test.test   ',
      }))

      expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaFilterJsonDataReturn, {
        email: 'customer@test.test',
      }))
    })

    it('lowerCase filter', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        email: {
          type: String,
          defaultValue: null,
          required: true,
          filters: [
            'lowerCase',
          ],
        },
      }))
      const SchemaDataFiltered = await SchemaData.filter(Object.assign({}, schemaJsonData, {
        email: 'Test@Test',
      }))

      expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaFilterJsonDataReturn, {
        email: 'test@test',
      }))
    })

    it('upperCase filter', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        email: {
          type: String,
          defaultValue: null,
          required: true,
          filters: [
            'upperCase',
          ],
        },
      }))
      const SchemaDataFiltered = await SchemaData.filter(Object.assign({}, schemaJsonData, {
        email: 'Test@Test',
      }))

      expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaFilterJsonDataReturn, {
        email: 'TEST@TEST',
      }))
    })

    it('filter doesn\'t exist', async() => {
      const SchemaData = new Schema(Object.assign({}, schemaJson, {
        email: {
          type: String,
          defaultValue: null,
          required: true,
          filters: [
            'test',
          ],
        },
      }))

      let SchemaDataFiltered = null
      try {
        SchemaDataFiltered = await SchemaData.filter(schemaJsonData)
      } catch (e) {
        SchemaDataFiltered = e.message
      }

      expect(SchemaDataFiltered).to.eql("Doesn\'t exist \'test\'")
    })
  })

  describe('Prefilled', () => {
    it('return prefilled data', async() => {
      const SchemaData = new Schema(schemaJson, true)
      let SchemaDataFiltered = null
      try {
        SchemaDataFiltered = await SchemaData.filter(schemaPrefilledJsonData)
      } catch (e) {
        SchemaDataFiltered = e.message
      }

      expect(SchemaDataFiltered).to.eql(schemaPrefilledDataReturn)
    })

    it('return prefilled data for one field', async() => {
      const SchemaData = new Schema(schemaJson)
      let SchemaDataFiltered = null
      try {
        SchemaDataFiltered = await SchemaData.filter(schemaPrefilledJsonData)
      } catch (e) {
        SchemaDataFiltered = e.message
      }

      expect(SchemaDataFiltered).to.eql(schemaPrefilledDataReturnOne)
    })
  })

  describe('JSON', () => {
    it('return json format for options', async() => {
      const SchemaData = new Schema(schemaJson)
      const SchemaDataJSON = SchemaData.json()

      expect(schemaJsonOptions).to.eql(SchemaDataJSON)
    })
  })
})
