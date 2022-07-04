//nosql

export type CreateImageDTO = {
    name: String;
    hyperlink: String;
}

export type UpdateImageDTO = Partial<CreateImageDTO>