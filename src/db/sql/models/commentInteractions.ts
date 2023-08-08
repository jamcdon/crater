import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface CommentInteractionAttributes {
    id: number;
    creator: boolean;
    upvote: number;
    commentID: string;
    composeID: string;
}

export interface CommentInteractionInput extends Optional<CommentInteractionAttributes, 'id' | 'creator' | 'commentID' | 'upvote' > {}
export interface CommentInteractionOutput extends Required<CommentInteractionAttributes> {}

class CommentInteractions extends Model<CommentInteractionAttributes, CommentInteractionInput> implements CommentInteractionAttributes{
    public id!: number
    public creator!: boolean
    public upvote!: number
    public commentID!: string
    public composeID!: string
}

CommentInteractions.init({
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
    composeID: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: false
    }
},
{
    timestamps: false,
    sequelize: sequelizeConnection
})

export default CommentInteractions