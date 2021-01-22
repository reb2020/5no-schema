export namespace FiveNoSchema {
  type AllowTypes = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';

  type ObjectAllowTypes = String | Number | Boolean | Object | Array | Date;

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
    t: (value: string) => string;
  }

  type Fn = (props: InitializeFnParams) => any;

  interface FnInit {
    fn: string | Fn;
    options?: {
      [name: string]: any;
    };
  }

  interface FieldsSchema {
    [name: string]: {
      type: AllowTypes | ObjectAllowTypes;
      defaultValue?: any;
      format?: string;
      prefilled?: boolean;
      required?: boolean;
      allowedValues?: Array<any>;
      validators?: Array<Fn | FnInit | string>;
      filters?: Array<Fn | FnInit | string>;
      schema?: FieldsSchema;
    }
  }

  interface Validators {
    type: Fn;
    required: Fn;
    date: Fn;
    email: Fn;
    enum: Fn;
    number: Fn;
    uuidv4: Fn;
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

  type FunctionArguments = Omit<InitializeFnParams, 'options' | 't'>;

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
