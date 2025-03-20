-- CreateTable
CREATE TABLE "MarkerData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ImageData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "markerId" TEXT NOT NULL,
    "uri" TEXT NOT NULL
);
