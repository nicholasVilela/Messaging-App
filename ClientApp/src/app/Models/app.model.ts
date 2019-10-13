export interface MessageModel {
    message: string
    user: string
}

export interface UserModel {
    uid: string
    displayName: string
    email: string
} 

export interface ChannelModel {
    name: string
    description: string
    messages: MessageModel[]
    adminUID: string
    adminName: string
}

export interface AppModel {
    currentChannel: string
    channelSet: ChannelModel[]
    currentMessages: MessageModel[]
}