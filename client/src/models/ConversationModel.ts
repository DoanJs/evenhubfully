export interface ConversationModel {
  avatar: Avatar[]
  createAt: number
  creatorId: number
  deleteAt: any
  id: string
  isGroup: number
  msgLast: string
  msgLastSenderId: number
  msgLastTime: number
  participantIds: number[]
  title: Title[]
  updateAt: any
}

export interface Avatar {
  data: string
  id: number
}

export interface Title {
  data: string
  id: number
}
