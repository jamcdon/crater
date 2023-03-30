import { User, Interactions, Admin } from './models';

const sqlInit = () => {
    Interactions.belongsTo(User)
    Admin.belongsTo(User)

    User.sync()
    Interactions.sync()
    Admin.sync()

    console.log('Connecting to SQL database...')
}

export default sqlInit;