import { AddAccountModel } from '../../domain/usecasos/add-accountt'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository{
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
