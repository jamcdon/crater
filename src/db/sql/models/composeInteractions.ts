import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ComposeInteractionAttributes {
    id: number;
    creator: boolean;
    star: boolean;
    composeID: string;
    imageID: string;
}

export interface ComposeInteractionInput extends Optional<ComposeInteractionAttributes, 'id' | 'creator' | 'star' | 'composeID'> {}
export interface ComposeInteractionOutput extends Required<ComposeInteractionAttributes> {}

class ComposeInteractions extends Model<ComposeInteractionAttributes, ComposeInteractionInput> implements ComposeInteractionAttributes{
    public id!: number
    public creator!: boolean
    public star!: boolean
    public composeID!: string
    public imageID!: string
}

ComposeInteractions.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    creator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    star: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    composeID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    },
    imageID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    }
},
{
    timestamps: false,
    sequelize: sequelizeConnection
})

export default ComposeInteractions