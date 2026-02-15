/*
  Warnings:

  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreditItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreditProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreditReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmotionalState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FundingProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Journey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JourneyEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Letter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RitualCompletion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Round` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `amountApproved` on the `FundingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `FundingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `FundingApplication` table. All the data in the column will be lost.
  - Added the required column `accountNumber` to the `Dispute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bureau` to the `Dispute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditor` to the `Dispute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Dispute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountRequested` to the `FundingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `FundingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FundingApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bank";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BankProduct";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CreditItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CreditProfile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CreditReport";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EmotionalState";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FundingProfile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Journey";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "JourneyEvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Letter";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RitualCompletion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Round";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SystemEvent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "emotionalNote" TEXT,
    "story" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dispute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "creditor" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "emotionalTone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dispute" ("createdAt", "id", "status", "updatedAt", "userId") SELECT "createdAt", "id", "status", "updatedAt", "userId" FROM "Dispute";
DROP TABLE "Dispute";
ALTER TABLE "new_Dispute" RENAME TO "Dispute";
CREATE TABLE "new_FundingApplication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "amountRequested" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "emotionalTone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FundingApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FundingApplication" ("createdAt", "id", "status", "userId") SELECT "createdAt", "id", "status", "userId" FROM "FundingApplication";
DROP TABLE "FundingApplication";
ALTER TABLE "new_FundingApplication" RENAME TO "FundingApplication";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");
