import { Image } from './Image'
import { Compose } from './Compose'
import { Comment } from './Comment'
import { ForumComment } from './ForumComment'
import { ForumPost } from './ForumPost'
import { ForumTopic } from './ForumTopic'

export {
    Image,
    Compose,
    Comment,
    ForumComment,
    ForumPost,
    ForumTopic
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