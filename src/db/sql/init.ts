import {
    User,
    ComposeInteractions,
    CommentInteractions,
    ImageInteractions,
    Interactions,
    Admin,
    UserReports,
    ImageReports,
    ScriptReports
} from './models';

const sqlInit = () => {
    ComposeInteractions.hasMany(Interactions)
    CommentInteractions.hasMany(Interactions)
    ImageInteractions.hasMany(Interactions)
    
    Interactions.belongsTo(CommentInteractions)
    Interactions.belongsTo(ComposeInteractions)
    Interactions.belongsTo(ImageInteractions)

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
    CommentInteractions.sync()
    ImageInteractions.sync()
    Interactions.sync()
    Admin.sync()
    UserReports.sync()
    ImageReports.sync()
    ScriptReports.sync()

    console.log('Connecting to SQL database...')
}

export default sqlInit;