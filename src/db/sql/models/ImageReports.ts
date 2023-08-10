import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ImageReportsInitAttributes {
    id: number;
    reportedImageID: string;
    badDescription: boolean;
    badPicture: boolean;
    badLink: boolean;
    badContainerImage: boolean;
    message: string;
}

interface ImageReportsAttributes extends ImageReportsInitAttributes{
    UserId: number
}

export interface ImageReportsInput extends Optional<ImageReportsAttributes, 'id' | 'message'> {}
export interface ImageReportsOutput extends Required<ImageReportsAttributes> {}

class ImageReports extends Model<ImageReportsInitAttributes, ImageReportsInput> implements ImageReportsAttributes {
    public id!: number;
    public reportedImageID!: string;
    public badDescription!: boolean;
    public badPicture!: boolean;
    public badLink!: boolean;
    public badContainerImage!: boolean;
    public message!: string;
    public UserId!: number
}

ImageReports.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    reportedImageID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    },
    badDescription:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badPicture:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    badLink:{
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

export default ImageReports