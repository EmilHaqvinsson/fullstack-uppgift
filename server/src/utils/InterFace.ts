export interface CreateU {
    name: string;
    userName: string;
    eMail: string;
}

export interface ReadU {
    _id: string;
    name: string;
    userName: string;
    eMail: string;
    createdAt: Date,
    updatedAt: Date
}