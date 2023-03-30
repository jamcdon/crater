// sql
export interface User {
    id: number;
	email: string;
	username: string;
	passwordSalt: string;
	passwordHash: string;
	bio?: string;
	admin: boolean;
	sso: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;

}