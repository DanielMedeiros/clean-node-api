import { HttpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serveError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requireFields = ['name', 'email', 'password', 'passwordConfirmatio']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmatio } = httpRequest.body

      if (password !== passwordConfirmatio) {
        return badRequest(new InvalidParamError('passwordConfirmatio'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serveError()
    }
  }
}
