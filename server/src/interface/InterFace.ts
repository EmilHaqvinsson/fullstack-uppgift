export interface CreateU {
    fullName: string,
    eMail: string,
    pass: string
}

export interface LoginU {
    eMail: string,
    pass: string,
}

export interface CheckLogin {
    userId: string,
    token: string | boolean
}

export interface ReadU {
    _id: string;
    fullName: string;
    eMail: string;
    pass: string;
    authenticated: string | boolean;
    createdAt: Date
    updatedAt: Date
}