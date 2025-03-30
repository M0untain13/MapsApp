import { v4 as uuid } from 'uuid'

export class ImageData {
    id: string;
    url: string | null | undefined;
    markerId: string | null | undefined;

    constructor(url: string | null | undefined, markerId: string | null | undefined) {
        this.id = uuid()
        this.url = url;
        this.markerId = markerId;
    }
}