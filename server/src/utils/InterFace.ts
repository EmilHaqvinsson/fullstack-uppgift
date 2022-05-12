export interface CreateU {
    userName: string,
    eMail: string,
    pass: string
}

export interface ReadU {
    _id: string;
    userName: string;
    eMail: string;
    pass: string;
    createdAt: Date,
    updatedAt: Date
}