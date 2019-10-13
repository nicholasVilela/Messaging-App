import { AppModel, UserModel, MessageModel, ChannelModel } from '../Models/app.model'

export class AddUser {
    static readonly type = 'ADD_USER'

    constructor(public payload: UserModel) {}
}

export class AddMessage {
    static readonly type = 'ADD_MESSAGE'

    constructor(public payload: MessageModel) {}
}

export class ChangeCurrentChannel {
    static readonly type = 'CHANGE_CHANNEL'

    constructor(public payload: ChannelModel) {}
}

export class ChangeChannelSet {
    static readonly type = 'CHANGE_CHANNEL_SET'

    constructor(public payload: ChannelModel) {}
}