// sql
export interface User {
    id: number;
	email: string;
	username: string;
	passwordSalt: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;

}