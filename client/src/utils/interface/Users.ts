export interface CreateOrUpdateUser {
	fullName: string;
	eMail: string;
	pass: string; 
}

export interface LoginU {
    email: string,
    pass: string,
    authenticated: string | boolean,
}

export interface ReadUser {
	_id: string;
	fullName: string;
	eMail: string;
	pass: string;
	createdAt: Date,
	updatedAt: Date,
	message?: string;
}