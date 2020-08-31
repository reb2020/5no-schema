import SchemaCore from '@5no/schema'

declare module '@5no/schema' {
  export type AllowTypes = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date';

  export interface InitializeFnParams {
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

  export interface FieldsSchema {
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

  type SchemaFn = (data: object) => Promise<object>;

  export interface Schema {
    isChild: boolean;
    filter: SchemaFn;
    validate: SchemaFn;
    json: () => object;
  }

  export = SchemaCore
}
