import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface UserAttributes {
	id: number;
	email: string;
	username: string;
	passwordSalt: string;
	passwordHash: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'username'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes{
	public id!: number
	public email!: string
	public username!: string
	public passwordSalt!: string
	public passwordHash!: string

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

User.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordSalt: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
	}
},
{
	timestamps: true,
	sequelize: sequelizeConnection,
	paranoid: true
});

export default User