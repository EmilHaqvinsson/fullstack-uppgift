export interface CreateMessage {
    message: string
}

export interface ReadMessage {
    _id: string,
    message: string,
    createdAt: Date,
    updatedAt: Date,
}