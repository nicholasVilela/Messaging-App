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
            uid: null,
            displayName: null,
            email: null
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
            user: payload
        })
    }
}