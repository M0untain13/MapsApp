import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markers = sqliteTable('markers', {
    id: text('id').primaryKey(),
    latitude: real('latitude'),
    longitude: real('longitude'),
});

export const images = sqliteTable('images', {
    id: text('id').primaryKey(),
    markerId: text('markerId'),
    uri: text('uri'),
});