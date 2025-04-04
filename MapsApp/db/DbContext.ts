/// <reference types="@cloudflare/workers-types" />
import { eq } from 'drizzle-orm';
import * as SQLite from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { markers, images } from './schema';

export class DbContext {
    db: ExpoSQLiteDatabase<Record<string, never>> & {
        $client: SQLite.SQLiteDatabase;
    };

    constructor() {
        const expo = SQLite.openDatabaseSync('db.db');
        this.db = drizzle(expo);
    }

    async TryAction(action: () => Promise<any>): Promise<any> {
        try {
            await action();
        } catch (e) {
            console.error(e);
        }
    }

    async addMarker(marker: typeof markers.$inferInsert) {
        await this.TryAction(async () => {
            await this.db.insert(markers).values({ id: marker.id, latitude: marker.latitude, longitude: marker.longitude });
        })
    };

    async deleteMarker(id: string) {
        await this.TryAction(async () => {
            await this.db.delete(markers).where(eq(markers.id, id));
        });
    };

    async getMarkers(): Promise<{ id: string; latitude?: number | null | undefined; longitude?: number | null | undefined; }[]> {
        let result: any = [];
        await this.TryAction(async () => {
            result = await this.db.select().from(markers);
        });
        return result;
    };

    async addImage(image: typeof images.$inferInsert) {
        await this.TryAction(async () => {
            await this.db.insert(images).values({ id: image.id, markerId: image.markerId, uri: image.uri });
        });
    };

    async deleteImage(id: string) {
        await this.TryAction(async () => {
            await this.db.delete(images).where(eq(images.id, id));
        });
    };

    async getMarkerImages(markerId: string): Promise<{ id: string; markerId?: string | null | undefined; uri?: string | null | undefined; }[]> {
        let result: any = [];
        await this.TryAction(async () => {
            result = await this.db.select().from(images).where(eq(images.markerId, markerId));
        });
        return result;
    };
}

