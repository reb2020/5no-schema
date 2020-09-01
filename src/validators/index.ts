import ValidatorRequired from './required'
import ValidatorType from './type'
import ValidatorDate from './date'
import ValidatorEmail from './email'
import ValidatorEnum from './enum'
import ValidatorNumber from './number'
import ValidatorUuidv4 from './uuidv4'

export default {
  type: ValidatorType,
  required: ValidatorRequired,
  date: ValidatorDate,
  email: ValidatorEmail,
  enum: ValidatorEnum,
  number: ValidatorNumber,
  uuidv4: ValidatorUuidv4,
}
