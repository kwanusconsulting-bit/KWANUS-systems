-- AlterTable
ALTER TABLE "DecisionCard" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "heldAt" TIMESTAMP(3),
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "requestId" TEXT;

-- CreateTable
CREATE TABLE "MotherboardLock" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "lockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotherboardLock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MotherboardLock_tenantId_key" ON "MotherboardLock"("tenantId");
