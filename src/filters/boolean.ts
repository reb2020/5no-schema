export default function({ value, defaultValue }: FiveNoSchema.InitializeFnParams): boolean | null {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  return Boolean(!(value === 'false' || value === '0' || !value))
}
