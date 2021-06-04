import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serveError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requireFields = ['name', 'email', 'password', 'passwordConfirmatio']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmatio } = httpRequest.body

      if (password !== passwordConfirmatio) {
        return badRequest(new InvalidParamError('passwordConfirmatio'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serveError()
    }
  }
}
