export interface CreateU {
    fullname: string,
    username: string,
    password: string
}

export interface ReadU {
    _id: string;
    fullname: string;
    username: string;
    password: string;
    authenticated: string | boolean;
    createdAt: Date
    updatedAt: Date
}