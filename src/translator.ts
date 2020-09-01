import { FiveNoSchema } from '../typings/app'

let translator = {}

export const setLib = (lib: FiveNoSchema.List<string>): void => {
  translator = lib
}

export const getLib = (): FiveNoSchema.List<string> => translator

export const translate = (value: string): string => translator[value] ?? value
