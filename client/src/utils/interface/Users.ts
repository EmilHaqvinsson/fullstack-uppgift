export interface CreateOrUpdateUser {
	fullName: string;
	eMail: string;
	pass: string; 
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