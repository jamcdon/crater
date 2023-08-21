import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ManifestInteractionAttributes {
    id: number;
    creator: boolean;
    star: boolean;
    composeID: string;
    imageID: string;
}

export interface ManifestInteractionInput extends Optional<ManifestInteractionAttributes, 'id' | 'creator' | 'star' | 'composeID'> {}
export interface ManifestInteractionOutput extends Required<ManifestInteractionAttributes> {}

class ManifestInteractions extends Model<ManifestInteractionAttributes, ManifestInteractionInput> implements ManifestInteractionAttributes{
    public id!: number
    public creator!: boolean
    public star!: boolean
    public composeID!: string
    public imageID!: string
}

ManifestInteractions.init({
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

export default ManifestInteractions