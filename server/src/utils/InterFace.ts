export interface CreateU {
    fullName: string,
    eMail: string,
    pass: string,
    hash: string,
    salt: string
}

export interface ReadU {
    _id: string;
    fullName: string;
    eMail: string;
    pass: string;
    hash: string;
    salt: string;
    createdAt: Date,
    updatedAt: Date
}