declare namespace FiveNoSchema {
  type AllowTypes = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';

  interface List<T> {
    [name: string]: T;
  }

  interface InitializeFnParams {
    name: string;
    type: AllowTypes;
    value: any;
    defaultValue: any;
    options: {
      [name: string]: any;
    };
    allValues: object;
    previousResult: any;
  }

  interface FieldsSchema {
    [name: string]: {
      type: string | object;
      defaultValue?: any;
      format?: string;
      prefilled?: boolean;
      required?: boolean;
      allowedValues?: Array<any>;
      validators?: Array<any>;
      filters?: Array<any>;
      schema?: FieldsSchema;
    }
  }

  type Fn = (props: InitializeFnParams) => any;

  interface Validators {
    type: Fn;
    required: Fn;
    date: Fn;
    email: Fn;
    enum: Fn;
    number: Fn;
  }

  interface Filters {
    number: Fn;
    string: Fn;
    boolean: Fn;
    object: Fn;
    date: Fn;
    array: Fn;
    trim: Fn;
    lowerCase: Fn;
    upperCase: Fn;
  }

  type FunctionArguments = Omit<InitializeFnParams, 'options'>;

  interface FnInit {
    fn: string | Fn;
    options?: {
      [name: string]: any;
    };
  }

  interface InitializeFunctions {
    fn: Fn,
    data: InitializeFnParams;
  }

  interface Result {
    field: string;
    child: boolean;
    result: any;
  }

  interface ChildResult {
    field: string;
    child: boolean;
    errors: any;
    result: any;
  }

  type SchemaFn = (data: object) => Promise<object>;

  interface Schema {
    isChild: boolean;
    filter: SchemaFn;
    validate: SchemaFn;
    json: () => object;
  }
}

declare module '@5no/schema' {
  class Schema implements FiveNoSchema.Schema {
    isChild: boolean;
    private _schemas;
    private _fields;
    private _validators;
    private _filters;
    private _allowedValues;
    private _formats;
    private _types;
    private _prefilled;
    private _required;
    private _prefilledSchema;
    constructor(fieldsSchema: FiveNoSchema.FieldsSchema, prefilledSchema?: boolean);
    filter: (data: object) => Promise<object>;
    validate: (data: object) => Promise<object>;
    json: () => {};
  }

  export = Schema
}
