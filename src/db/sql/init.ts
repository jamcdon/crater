import { User } from './models';

const sqlInit = () => {
    User.sync()
    console.log('Connecting to SQL database...')
}

export default sqlInit;