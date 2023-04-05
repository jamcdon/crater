import { User, Interactions, Admin, UserReports } from './models';

const sqlInit = () => {
    Interactions.belongsTo(User)
    Admin.belongsTo(User)
    UserReports.belongsTo(User)

    User.sync()
    Interactions.sync()
    Admin.sync()
    UserReports.sync()

    console.log('Connecting to SQL database...')
}

export default sqlInit;