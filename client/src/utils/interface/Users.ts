export interface CreateOrUpdateUser {
	fullname?: string;
	username: string;
	password: string; 
}

export interface LoginU {
	fullname?: string,
    username: string,
    password: string,
}

export interface ReadUser {
	_id: string;
	fullname: string;
	username: string;
	password: string;
	createdAt: Date,
	updatedAt: Date,
	message?: string;
}