export interface CreateOrUpdateUser {
	fullName: string;
	eMail: string;
	pass: string; 
}

export interface ReadUser {
	_id: string;
	name: string;
	age: number;
	gender: string;
	createdAt: Date,
	updatedAt: Date,
	message?: string;
}