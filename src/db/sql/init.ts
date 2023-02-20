import { User, Interactions } from './models';

const sqlInit = () => {
    Interactions.belongsTo(User)

    User.sync()
    Interactions.sync()

    console.log('Connecting to SQL database...')
}

export default sqlInit;