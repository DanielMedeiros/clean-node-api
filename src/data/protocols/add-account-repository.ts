import { AddAccountModel } from '../../domain/usecasos/add-accountt'
import { AccountModel } from '../../domain/model/account'

export interface AddAccountRepository{
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
