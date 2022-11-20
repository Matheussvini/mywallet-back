import joi from "joi";
import dayjs from 'dayjs'

const today = dayjs(Date.now()).format("YYYY/MM/DD")
export const transactionSchema = joi.object({
  date: joi.date().max(today).required(),
  description: joi.string().min(3).required(),
  value: joi.number().positive().precision(2).required(),
  type: joi.string().valid("entry", "exit").required(),
});
