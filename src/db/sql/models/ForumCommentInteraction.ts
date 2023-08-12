import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface ForumCommentInteractionAttributes {
    id: number;
    creator: boolean;
    upvote: number;
    commentID: string;
    postID: string;
}

export interface ForumCommentInteractionInput extends Optional<ForumCommentInteractionAttributes, 'id' | 'creator' | 'commentID' | 'upvote' > {}
export interface ForumCommentInteractionOutput extends Required<ForumCommentInteractionAttributes> {}

class ForumCommentInteractions extends Model<ForumCommentInteractionAttributes, ForumCommentInteractionInput> implements ForumCommentInteractionAttributes{
    public id!: number
    public creator!: boolean
    public upvote!: number
    public commentID!: string
    public postID!: string
}

ForumCommentInteractions.init({
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
    commentID: {
        type: DataTypes.STRING(24),
        allowNull: false,
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

export default ForumCommentInteractions