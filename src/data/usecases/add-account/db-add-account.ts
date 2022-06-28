import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepositiry } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepositiry

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepositiry) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
    // return await new Promise(resolve => resolve(null))
  }
}
