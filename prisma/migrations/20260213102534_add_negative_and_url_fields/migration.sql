-- AlterTable
ALTER TABLE "CreditReport" ADD COLUMN "fileUrl" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "creditorName" TEXT NOT NULL,
    "accountNumber" TEXT,
    "status" TEXT NOT NULL,
    "balance" REAL,
    "isNegative" BOOLEAN NOT NULL DEFAULT false,
    "isDisputed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditItem_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "CreditReport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditItem" ("accountNumber", "balance", "createdAt", "creditorName", "id", "isDisputed", "reportId", "status") SELECT "accountNumber", "balance", "createdAt", "creditorName", "id", "isDisputed", "reportId", "status" FROM "CreditItem";
DROP TABLE "CreditItem";
ALTER TABLE "new_CreditItem" RENAME TO "CreditItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
