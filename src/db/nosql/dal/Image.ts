import { Image } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput> => {

}

export const update = async(id: number, payload: Partial<ImageInput>): Promise<ImageOutput> => {

}

export const getById = async(id: number): Promise<ImageOutput> => {

}

export const getByImageName = async(imageName: string): Promise<ImageOutput> => {

}

export const deleteById = async (id: number): Promise<boolean> => {

}