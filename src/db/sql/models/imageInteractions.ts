import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ImageInteractionAttributes {
    id: number;
    creator: boolean;
    star: boolean
    imageID: string;
}

export interface ImageInteractionInput extends Optional<ImageInteractionAttributes, 'id' | 'creator' | 'star' | 'imageID'> {}
export interface ImageInteractionOutput extends Required<ImageInteractionAttributes> {}

class ImageInteractions extends Model<ImageInteractionAttributes, ImageInteractionInput> implements ImageInteractionAttributes{
    public id!: number
    public creator!: boolean
    public star!: boolean
    public imageID!: string
}

ImageInteractions.init({
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

export default ImageInteractions