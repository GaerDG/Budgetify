-- CreateTable
CREATE TABLE "Finances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "value" INTEGER NOT NULL,
    "type" TEXT,
    "date" DATETIME NOT NULL
);
