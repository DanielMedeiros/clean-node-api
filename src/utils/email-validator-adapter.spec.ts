import { EmailValidatorAdapter } from '../utils/email-validator'

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalidemail@email.com')
    expect(isValid).toBe(false)
  })
})
