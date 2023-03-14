import { Image } from './Image'
import { Compose } from './Compose'
import { Comment } from './Comment'

export {
    Image,
    Compose,
    Comment,
}

export type QueryObject = [
    {
        [key: string]: string
    }
]

export type QueryArrayObject = [
    {
        [key: string]: Array<string>
    }
]