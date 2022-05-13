export interface CreateMessage {
    message: string
}

export interface ReadMessage {
    _id: number,
    message: string,
    createdAt: Date,
    updatedAt: Date,
}