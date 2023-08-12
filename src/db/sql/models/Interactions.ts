import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface InteractionsInitAttributes {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface InteractionsAttributes extends InteractionsInitAttributes {
    UserId: number;
    ComposeInteractionId?: number;
    ImageInteractionId?: number;
    CommentInteractionId?: number;
}

export interface InteractionsInput extends Optional<InteractionsAttributes, 'id'> {}
export interface InteractionsQuery extends Optional<InteractionsAttributes, 'ComposeInteractionId'> {}
export interface InteractionsOutput extends Required<InteractionsAttributes> {}

class Interactions extends Model<InteractionsInitAttributes, InteractionsInput> implements InteractionsAttributes {
    public id!: number
    public ComposeInteractionId!: number
    public ImageInteractionId!: number
    public CommentInteractionId!: number
    public UserId!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Interactions.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }/*,
    composeInteractionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'ComposeInteraction'
        }
    },
    imageInteractionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'ImageInteraction'
        }
    },
    commentInteractionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'CommentInteraction'
        }
    },
    UserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'User'
        }
    },
    forumCommentInteractionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'ForumCommentInteraction'
        }
    },
    forumPostInteractionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            key: 'id',
            model: 'ForumPostInteraction'
        }
    }
    these column exists through ../init.ts with User.hasMany(...) and Interactions.belongsTo(User)
    */
},
{
    timestamps: true,
    sequelize: sequelizeConnection
    
});

export default Interactions