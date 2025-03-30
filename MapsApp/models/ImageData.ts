import { v4 as uuid } from 'uuid'

export class ImageData {
    id: string;
    markerId: string | null | undefined;
    uri: string | null | undefined;

    constructor(url: string | null | undefined, markerId: string | null | undefined) {
        this.id = uuid()
        this.uri = url;
        this.markerId = markerId;
    }
}