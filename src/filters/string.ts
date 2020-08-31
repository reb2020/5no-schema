export default function({ value, defaultValue }: FiveNoSchema.InitializeFnParams): string | null {
  if (value === null) {
    return null
  }

  if (value === defaultValue) {
    return defaultValue
  }

  return String(value)
}
