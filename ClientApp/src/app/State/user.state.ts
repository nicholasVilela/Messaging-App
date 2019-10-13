import { State, Action, StateContext, Selector } from '@ngxs/store'
import { UserModel } from '../Models/app.model'
import { AddUser } from '../Actions/app.actions'

export class UserStateModel {
    user: UserModel
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: {
            uid: '1',
            displayName: '2',
            email: '3'
        }
    }
})

export class UserState {
    @Selector()
    static getUser(state: UserStateModel) {
        return state.user
    }

    @Action(AddUser)
    addUser({getState, patchState}, {payload}: AddUser) {
        const state = getState()
        patchState({
            uid:  payload.uid,
            displayName: payload.displayName,
            email: payload.email
        })
    }
}