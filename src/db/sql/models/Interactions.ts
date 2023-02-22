import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface InteractionsInitAttributes {
    id: number;
    composeID?: string;
    imageID?: string;
    comment: boolean;
    star: boolean;
    creator: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

interface InteractionsAttributes extends InteractionsInitAttributes {
    UserId: number;
}

export interface InteractionsInput extends Optional<InteractionsAttributes, 'id'> {}
export interface InteractionsQuery extends Optional<InteractionsAttributes, 'composeID'> {}
export interface InteractionsOutput extends Required<InteractionsAttributes> {}

class Interactions extends Model<InteractionsInitAttributes, InteractionsInput> implements InteractionsAttributes{
    public id!: number
    public composeID!: string
    public imageID!: string
    public comment!: boolean
    public star!: boolean
    public creator!: boolean
    public UserId!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Interactions.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    composeID: {
        type: DataTypes.STRING
    },
    imageID: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.BOOLEAN,
    },
    star: {
        type: DataTypes.BOOLEAN
    },
    creator: {
        type: DataTypes.BOOLEAN
    }/*,
    UserID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'User'
        }
    }
    this column exists through ../init.ts with User.hasMany(...) and Interactions.belongsTo(User)
    */
},
{
    timestamps: true,
    sequelize: sequelizeConnection
    
});

export default Interactions