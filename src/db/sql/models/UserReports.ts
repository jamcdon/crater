import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface UserReportsInitAttributes {
    id: number;
    reportedUserID: number;
    message: string;
}

interface UserReportsAttributes extends UserReportsInitAttributes {
    UserId: number;
}

export interface UserReportsInput extends Optional<UserReportsAttributes, 'id'> {}
export interface UserReportsOutput extends Required<UserReportsAttributes> {}

class UserReports extends Model<UserReportsInitAttributes, UserReportsInput> implements UserReportsAttributes {
    public id!: number
    public reportedUserID!: number;
    public message!: string;
    UserId!: number;
}

UserReports.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    reportedUserID: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    message: {
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
    sequelize: sequelizeConnection
})

export default UserReports