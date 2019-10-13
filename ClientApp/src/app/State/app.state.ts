import { State, Action, StateContext, Selector } from '@ngxs/store'
import { UserModel, AppModel, ChannelModel } from '../Models/app.model'
import { ChangeChannelSet, ChangeCurrentChannel, AddMessage } from '../Actions/app.actions'

export class AppStateModel {
    currentChannel: ChannelModel
    channelSet: ChannelModel[]
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        currentChannel: {
            name: 'General',
            description: 'General Chat',
            messages: [],
            adminUID: '1',
            adminName: 'Nick'
        },
        channelSet: [{
            name: 'General',
            description: 'General Chat',
            messages: [],
            adminUID: '1',
            adminName: 'Nick'
        }]
    }
})

export class AppState {
    @Selector()
    static getState(state: AppStateModel) {
        return state
    }

    @Action(ChangeChannelSet)
    changeChannelSet({getState, patchState}, {payload}: ChangeChannelSet) {
        const state = getState()
        patchState({
            ...state,
            channelSet: [...state.channelSet, payload]
        })
    }

    @Action(ChangeCurrentChannel)
    changeCurrentChannel({getState, patchState}, {payload}: ChangeCurrentChannel) {
        const state = getState()
        patchState({
            ...state,
            currentChannel: payload
        })
    }

    @Action(AddMessage)
    AddMessage({getState, patchState}, {payload}: AddMessage) {
        const state = getState()
        patchState({
            ...state,
            currentChannel: [...state.messages, payload]
        })
    }
}