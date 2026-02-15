/*
  Warnings:

  - You are about to drop the column `creditor` on the `CreditItem` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `CreditItem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `creditor` on the `Dispute` table. All the data in the column will be lost.
  - Added the required column `creditorName` to the `CreditItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditorName` to the `Dispute` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "reportId" TEXT,
    "creditorName" TEXT NOT NULL,
    "accountNumber" TEXT,
    "balance" REAL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "emotionalTone" TEXT,
    "isNegative" BOOLEAN NOT NULL DEFAULT false,
    "isDisputed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CreditItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditItem" ("accountNumber", "balance", "createdAt", "emotionalTone", "id", "status", "updatedAt", "userId") SELECT "accountNumber", "balance", "createdAt", "emotionalTone", "id", "status", "updatedAt", "userId" FROM "CreditItem";
DROP TABLE "CreditItem";
ALTER TABLE "new_CreditItem" RENAME TO "CreditItem";
CREATE TABLE "new_Dispute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "creditorName" TEXT NOT NULL,
    "accountNumber" TEXT,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "emotionalTone" TEXT,
    "creditItemId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Dispute_creditItemId_fkey" FOREIGN KEY ("creditItemId") REFERENCES "CreditItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dispute" ("accountNumber", "bureau", "createdAt", "creditItemId", "emotionalTone", "id", "reason", "status", "updatedAt", "userId") SELECT "accountNumber", "bureau", "createdAt", "creditItemId", "emotionalTone", "id", "reason", "status", "updatedAt", "userId" FROM "Dispute";
DROP TABLE "Dispute";
ALTER TABLE "new_Dispute" RENAME TO "Dispute";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
