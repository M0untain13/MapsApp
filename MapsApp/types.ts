export interface MarkerData {
    id: string;
    latitude: number;
    longitude: number;
    images: ImageData[];
}

export interface ImageData {
    id: string;
    url: string;
}

export interface NavigationParams {
    id: string;
}

export interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};