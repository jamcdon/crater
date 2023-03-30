import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface UserAttributes {
	id: number;
	email: string;
	username: string;
	passwordSalt?: string;
	passwordHash?: string;
	bio?: string;
	sso: string;
	admin: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'username' | 'sso' | 'admin' | 'bio'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes{
	public id!: number
	public email!: string
	public username!: string
	public passwordSalt!: string
	public passwordHash!: string
	public bio!: string
	public sso!: string
	public admin!: boolean

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
		allowNull: false,
		unique: true
	},
	username: {
		type: DataTypes.STRING(20),
		allowNull: false,
		unique: true
	},
	passwordSalt: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bio: {
		type: DataTypes.STRING(140),
		allowNull: true
	},
	sso: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: false
	},
	admin: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		unique: false
	}
},
{
	timestamps: true,
	sequelize: sequelizeConnection,
	paranoid: true
});

export default User