CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`markerId` text,
	`uri` text
);
--> statement-breakpoint
CREATE TABLE `markers` (
	`id` text PRIMARY KEY NOT NULL,
	`latitude` real,
	`longitude` real
);
