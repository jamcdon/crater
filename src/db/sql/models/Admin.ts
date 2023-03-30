import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface AdminInitAttributes {
    id: number;
    compose?: string;
    comment?: string;
    image?: string;
    user?: number;
    actionDelete: boolean;
    actionModify: boolean;
    actionCreate: boolean;
    action: string;
}

interface AdminAttributes extends AdminInitAttributes {
    UserId: number;
}

export interface AdminInput extends Optional<AdminAttributes, 'id'> {}
export interface AdminOutput extends Required<AdminAttributes> {}

class Admin extends Model<AdminInitAttributes, AdminInput> implements AdminAttributes {
    public id!: number
    public compose!: string
    public comment!: string
    public image!: string
    public user!: number
    public actionDelete!: boolean
    public actionModify!: boolean
    public actionCreate!: boolean
    public action!: string
    public UserId!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Admin.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    compose: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.STRING
    },
    actionDelete: {
        type: DataTypes.BOOLEAN
    },
    actionModify: {
        type: DataTypes.BOOLEAN
    },
    actionCreate: {
        type: DataTypes.BOOLEAN
    },
    action: {
        type: DataTypes.STRING
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
})

export default Admin