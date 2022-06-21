import { User } from './models';

const sqlInit = () => {
    User.sync()
    console.log('Connected to SQL database.')
}

export default sqlInit;