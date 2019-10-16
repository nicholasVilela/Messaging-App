import { State, Action, StateContext, Selector } from '@ngxs/store'
import { UserModel, AppModel, ChannelModel, MessageModel } from '../Models/app.model'
import { ChangeChannelSet, ChangeCurrentChannel, AddMessage, ClearChannelSet, ClearCurrentMessages } from '../Actions/app.actions'

export class AppStateModel {
    currentChannel: ChannelModel
    channelSet: ChannelModel[]
    currentMessages: MessageModel[]
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        currentChannel: null,
        channelSet: [],
        currentMessages: []
    }
})

export class AppState {
    @Selector()
    static getState(state: AppStateModel) {
        return state
    }

    @Action(ChangeChannelSet)
    changeChannelSet({getState, patchState}: StateContext<AppStateModel>, {payload}: ChangeChannelSet) {
        const state = getState()
        patchState({
            channelSet: [...state.channelSet, payload]
        })
    }

    @Action(ChangeCurrentChannel)
    changeCurrentChannel({getState, patchState}: StateContext<AppStateModel>, {payload}: ChangeCurrentChannel) {
        const state = getState()
        patchState({
            currentChannel: payload
        })
    }

    @Action(ClearChannelSet)
    clearChannelSet({getState, patchState}: StateContext<AppStateModel>, {payload}: ClearChannelSet) {
        patchState({
            channelSet: payload
        })
    }

    @Action(AddMessage)
    addMessage({getState, patchState}: StateContext<AppStateModel>, {payload}: AddMessage) {
        const state = getState()
        patchState({
            currentMessages: [...state.currentMessages, payload]
        })
    }

    @Action(ClearCurrentMessages)
    clearCurrentMessages({patchState}: StateContext<AppStateModel>, {payload}: ClearCurrentMessages) {
        patchState({
            currentMessages: payload
        })
    }
}