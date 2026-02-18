-- CreateTable
CREATE TABLE "FundingReadiness" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT NOT NULL,
    "personalScore" INTEGER,
    "utilization" DOUBLE PRECISION,
    "inquiries6m" INTEGER,
    "openAccounts" INTEGER,
    "negativeItems" INTEGER,
    "readinessScore" INTEGER,
    "readinessBand" TEXT,
    "lastSimulatedAt" TIMESTAMP(3),

    CONSTRAINT "FundingReadiness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FundingReadiness_tenantId_key" ON "FundingReadiness"("tenantId");

-- AddForeignKey
ALTER TABLE "FundingReadiness" ADD CONSTRAINT "FundingReadiness_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
