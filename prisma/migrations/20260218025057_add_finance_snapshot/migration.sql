-- CreateTable
CREATE TABLE "FinanceSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "revenue" INTEGER NOT NULL,
    "expenses" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "FinanceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinanceSnapshot_tenantId_createdAt_idx" ON "FinanceSnapshot"("tenantId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceSnapshot_tenantId_period_key" ON "FinanceSnapshot"("tenantId", "period");

-- AddForeignKey
ALTER TABLE "FinanceSnapshot" ADD CONSTRAINT "FinanceSnapshot_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
