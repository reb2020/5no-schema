const chai = require('chai')

const Schema = require('../compiled')

const expect = chai.expect

const schemaJson = {
    id: {
      type: Number,
      defaultValue: null,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      defaultValue: false
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date,
      format: 'YYYY-MM-DD'
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


const schemaJsonOptions = {
    id: {
      type: "number",
      defaultValue: null,
      required: true
    },
    email: {
      type: "string",
      required: true
    },
    active: {
      type: "boolean",
      defaultValue: false,
      required: false
    },
    createdAt: {
      type: "date",
      required: false
    },
    updatedAt: {
      type: "date",
      format: 'YYYY-MM-DD',
      required: false
    },
    informations: {
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

const schemaJsonData = {
    id: 123,
    email: 'test@test.test',
    active: true,
    test: 'Param Is Not Described In Schema',
    createdAt: new Date('2018-12-12 12:12:12'),
    updatedAt: '2018-12-12 10:10:10',
    informations: {
        firstName: 'Test'
    },
    roles: [
        'customer',
        'admin'
    ]
}

const schemaJsonDataReturn = {
    id: 123,
    email: 'test@test.test',
    active: true,
    createdAt: new Date('2018-12-12 12:12:12'),
    updatedAt: '2018-12-12',
    informations: {
        firstName: 'Test'
    },
    roles: [
        'customer',
        'admin'
    ]
}

describe('Schema', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('Validate', () => {
    it('validator has to return data', async () => {
        const SchemaData = new Schema(schemaJson)
        const SchemaDataValidate = await SchemaData.validate(schemaJsonData)
        
        expect(SchemaDataValidate).to.eql(Object.assign({}, schemaJsonDataReturn, {updatedAt: '2018-12-12 10:10:10'}))
    })
    
    it('validator has to return error of type Number', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {id: 'test'}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('id has incorrect type')
    })
    
    it('validator has to return error of type String', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {email: 150}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('email has incorrect type')
    })
    
    it('validator has to return error of type Boolean', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {active: 1}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('active has incorrect type')
    })
    
    it('validator has to return error of type Date', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {createdAt: 'test'}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('createdAt has incorrect date format')
    })
    
    it('validator has to return error of type Object', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {informations: 'test'}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('informations has incorrect type')
    })
    
    it('validator has to return error of type Array', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {roles: 'test'}))
        } catch (e) {
            SchemaDataValidate = e[0].message
        }
        
        expect(SchemaDataValidate).to.eql('roles has incorrect type')
    })
    
    it('validator has to return errors', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData, {
                id: 'tt',
                email: 112,
                active: 0,
                createdAt: true,
                informations: 'test',
                roles: '222'
            }))
        } catch (e) {
            SchemaDataValidate = []
            for (let error of e) {
                SchemaDataValidate.push(error.message)
            }
        }
        
        expect(SchemaDataValidate).to.eql([ 
            "id has incorrect type",
            "email has incorrect type",
            "active has incorrect type",
            "createdAt has incorrect type",
            "informations has incorrect type",
            "roles has incorrect type"
        ])
    })
    
    it('validator has to return errors of required fields', async () => {
        const SchemaData = new Schema(schemaJson)
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate({
                active: false
            })
        } catch (e) {
            SchemaDataValidate = []
            for (let error of e) {
                SchemaDataValidate.push(error.message)
            }
        }
        
        expect(SchemaDataValidate).to.eql([ 
            "id is required",
            "email is required"
        ])
    })
    
    it('custom validator has to return error', async () => {
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
            }
        }))
        let SchemaDataValidate = null
        try {
            SchemaDataValidate = await SchemaData.validate(Object.assign({}, schemaJsonData))
        } catch (e) {
            SchemaDataValidate = []
            for (let error of e) {
                SchemaDataValidate.push(error.message)
            }
        }
        
        expect(SchemaDataValidate).to.eql([ 
            "Test Custom Error",
            "Test Custom Error Options"
        ])
    })
  })

  describe('Filter', () => {
    it('filter has to return correct data types', async () => {
        const SchemaData = new Schema(schemaJson)
        const SchemaDataFiltered = SchemaData.filter(Object.assign({}, schemaJsonData, {
            id: '123',
            active: 1,
            createdAt: '2018-12-12 12:12:12'
        }))
        
        expect(SchemaDataFiltered).to.eql(schemaJsonDataReturn)
    })
    
    it('custom filter', async () => {
        const SchemaData = new Schema(Object.assign({}, schemaJson, {
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
            }
        }))
        const SchemaDataFiltered = SchemaData.filter(schemaJsonData)
        
        expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaJsonDataReturn, {
            id: 1223
        }))
    })
    
    it('trim filter', async () => {
        const SchemaData = new Schema(Object.assign({}, schemaJson, {
            email: {
                type: String,
                defaultValue: null,
                required: true,
                filters: [
                    'trim'
                ]
            },
        }))
        const SchemaDataFiltered = SchemaData.filter(Object.assign({}, schemaJsonData, {
            email: '  test@test   ',
        }))
        
        expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaJsonDataReturn, {
            email: 'test@test'
        }))
    })
    
    it('lowerCase filter', async () => {
        const SchemaData = new Schema(Object.assign({}, schemaJson, {
            email: {
                type: String,
                defaultValue: null,
                required: true,
                filters: [
                    'lowerCase'
                ]
            },
        }))
        const SchemaDataFiltered = SchemaData.filter(Object.assign({}, schemaJsonData, {
            email: 'Test@Test',
        }))
        
        expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaJsonDataReturn, {
            email: 'test@test'
        }))
    })
    
    it('upperCase filter', async () => {
        const SchemaData = new Schema(Object.assign({}, schemaJson, {
            email: {
                type: String,
                defaultValue: null,
                required: true,
                filters: [
                    'upperCase'
                ]
            },
        }))
        const SchemaDataFiltered = SchemaData.filter(Object.assign({}, schemaJsonData, {
            email: 'Test@Test',
        }))
        
        expect(SchemaDataFiltered).to.eql(Object.assign({}, schemaJsonDataReturn, {
            email: 'TEST@TEST'
        }))
    })

    it('filter doesn\'t exist', async () => {
        

        let SchemaDataFiltered = null
        try {
            const SchemaData = new Schema(Object.assign({}, schemaJson, {
                email: {
                    type: String,
                    defaultValue: null,
                    required: true,
                    filters: [
                        'test'
                    ]
                },
            }))
            SchemaDataFiltered = SchemaData.filter(schemaJsonData)
        } catch (e) {
            SchemaDataFiltered = e.message
        }
        
        expect(SchemaDataFiltered).to.eql("Doesn't exist 'test'")
    })
  })

  describe('JSON', () => {
    it('return json format for options', async () => {
        const SchemaData = new Schema(schemaJson)
        const SchemaDataJSON = SchemaData.json()
        
        expect(schemaJsonOptions).to.eql(SchemaDataJSON)
    })
  })
})
