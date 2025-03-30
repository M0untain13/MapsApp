import { v4 as uuid } from 'uuid'

export class MarkerData {
    id: string;
    latitude: number | null | undefined;
    longitude: number | null | undefined;

    constructor(latitude: number| null | undefined, longitude: number | null | undefined) {
        this.id = uuid()
        this.latitude = latitude;
        this.longitude = longitude;
    }
}