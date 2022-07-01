//nosql

export type CreateImageDTO = {
    id: Number;
    name: String;
    hyperlink: String;
}

export type UpdateImageDTO = Partial<CreateImageDTO>