import {
    User,
    Admin,

    ComposeInteractions,
    CommentInteractions,
    ImageInteractions,
    ManifestInteractions,
    Interactions,
    ForumCommentInteractions,
    ForumPostInteractions,

    UserReports,
    ImageReports,
    ScriptReports
} from './models';

const sqlInit = () => {
    ComposeInteractions.hasMany(Interactions)
    ManifestInteractions.hasMany(Interactions)
    CommentInteractions.hasMany(Interactions)
    ImageInteractions.hasMany(Interactions)
    ForumCommentInteractions.hasMany(Interactions)
    ForumPostInteractions.hasMany(Interactions)
    
    Interactions.belongsTo(CommentInteractions)
    Interactions.belongsTo(ComposeInteractions)
    Interactions.belongsTo(ManifestInteractions)
    Interactions.belongsTo(ImageInteractions)
    Interactions.belongsTo(ForumCommentInteractions)
    Interactions.belongsTo(ForumPostInteractions)

    Interactions.belongsTo(User)
    Admin.belongsTo(User)
    UserReports.belongsTo(User)
    ImageReports.belongsTo(User)
    ScriptReports.belongsTo(User)

    User.hasMany(Interactions)
    User.hasMany(Admin)
    User.hasMany(UserReports)
    User.hasMany(ImageReports)
    User.hasMany(ScriptReports)


    User.sync()
    ComposeInteractions.sync()
    ManifestInteractions.sync()
    CommentInteractions.sync()
    ImageInteractions.sync()
    ForumCommentInteractions.sync()
    ForumPostInteractions.sync()
    Interactions.sync()
    Admin.sync()
    UserReports.sync()
    ImageReports.sync()
    ScriptReports.sync()

    console.log('Connecting to SQL database...')
}

export default sqlInit;