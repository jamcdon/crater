import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ForumPostInteractionAttributes {
    id: number;
    creator: boolean;
    upvote: number;
    postID: string;
}

export interface ForumPostInteractionInput extends Optional<ForumPostInteractionAttributes, 'id' | 'creator' | 'upvote' > {}
export interface ForumPostInteractionOutput extends Required<ForumPostInteractionAttributes> {}

class ForumPostInteractions extends Model<ForumPostInteractionAttributes, ForumPostInteractionInput> implements ForumPostInteractionAttributes{
    public id!: number
    public creator!: boolean
    public upvote!: number
    public commentID!: string
    public postID!: string
}

ForumPostInteractions.init({
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
    upvote: {
        type: DataTypes.TINYINT,
        allowNull: true,
        unique: false
    },
    postID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    }
},
{
    timestamps: false,
    sequelize: sequelizeConnection
})

export default ForumPostInteractions