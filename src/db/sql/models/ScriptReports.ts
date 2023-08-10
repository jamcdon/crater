import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ScriptReportsInitAttributes {
    id: number;
    reportedScriptID: string;
    badName: boolean;
    badScript: boolean;
    badTags: boolean;
    badComments: boolean;
    badContainerImage: boolean;
    message: string;
}

interface ScriptReportsAttributes extends ScriptReportsInitAttributes{
    UserId: number
}

export interface ScriptReportsInput extends Optional<ScriptReportsAttributes, 'id' | 'message'> {}
export interface ScriptReportsOutput extends Required<ScriptReportsAttributes> {}

class ScriptReports extends Model<ScriptReportsInitAttributes, ScriptReportsInput> implements ScriptReportsAttributes {
    public id!: number;
    public reportedScriptID!: string;
    public badName!: boolean;
    public badScript!: boolean;
    public badTags!: boolean;
    public badComments!: boolean;
    public badContainerImage!: boolean
    public message!: string;
    public UserId!: number
}

ScriptReports.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    reportedScriptID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    },
    badName:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badScript:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badTags:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badComments:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badContainerImage:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }/*,
    UserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'User'
        }
    }*/
},
{
    sequelize: sequelizeConnection
})

export default ScriptReports