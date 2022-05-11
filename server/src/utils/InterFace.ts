export interface CreateU {
    fullName: string;
    eMail: string;
    pass: string; 
}

export interface ReadU {
    _id: string;
    name: string;
    userName: string;
    eMail: string;
    createdAt: Date,
    updatedAt: Date
}