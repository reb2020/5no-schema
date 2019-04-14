import ValidatorRequired from './required'
import ValidatorType from './type'
import ValidatorDate from './date'
import ValidatorEmail from './email'

export default {
  type: ValidatorType,
  required: ValidatorRequired,
  date: ValidatorDate,
  email: ValidatorEmail,
}
