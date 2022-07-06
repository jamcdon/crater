//nosql

export type CreateImageDTO = {
    _id: String;
    name: String;
    hyperlink: String;
}

export type UpdateImageDTO = Partial<CreateImageDTO>