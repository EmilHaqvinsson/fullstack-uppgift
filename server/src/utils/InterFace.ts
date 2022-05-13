export interface CreateU {
    fullName: string,
    eMail: string,
    pass: string
}

export interface ReadU {
    _id: string;
    fullName: string;
    eMail: string;
    pass: string;
    createdAt: Date,
    updatedAt: Date
}