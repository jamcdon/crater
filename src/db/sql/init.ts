import { User } from './models';

const dbInit = () => {
    User.sync()
}

export default dbInit;