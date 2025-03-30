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

    async addMarker(marker: typeof markers.$inferInsert) {
        await this.db.insert(markers).values(marker);
    };

    async deleteMarker(id: string) {
        await this.db.delete(markers).where(eq(markers.id, id));
    };

    async getMarkers(): Promise<{ id: string; latitude?: number | null | undefined; longitude?: number | null | undefined; }[]>{
        const result = await this.db.select().from(markers);
        return result;
    };

    async addImage(image: typeof images.$inferInsert) {
        await this.db.insert(images).values(image);
    };

    async deleteImage(id: string) {
        await this.db.delete(images).where(eq(images.id, id));
    };

    async getMarkerImages(markerId: string) : Promise<{ id: string; markerId?: string | null | undefined; uri?: string | null | undefined; }[]>{
        const result = await this.db.select().from(images).where(eq(images.markerId, markerId));
        return result;
    };
}

