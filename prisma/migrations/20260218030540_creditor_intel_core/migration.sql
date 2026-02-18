-- CreateTable
CREATE TABLE "Creditor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "Creditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditorAddress" (
    "id" TEXT NOT NULL,
    "creditorId" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CreditorAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BureauRule" (
    "id" TEXT NOT NULL,
    "creditorId" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "notes" TEXT,
    "preferredDisputeType" TEXT,

    CONSTRAINT "BureauRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisputeOutcome" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditorId" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "disputeType" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "daysToResponse" INTEGER,

    CONSTRAINT "DisputeOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creditor_normalized_key" ON "Creditor"("normalized");

-- CreateIndex
CREATE INDEX "Creditor_name_idx" ON "Creditor"("name");

-- CreateIndex
CREATE INDEX "CreditorAddress_bureau_idx" ON "CreditorAddress"("bureau");

-- CreateIndex
CREATE INDEX "BureauRule_bureau_idx" ON "BureauRule"("bureau");

-- CreateIndex
CREATE INDEX "DisputeOutcome_creditorId_idx" ON "DisputeOutcome"("creditorId");

-- CreateIndex
CREATE INDEX "DisputeOutcome_bureau_idx" ON "DisputeOutcome"("bureau");

-- AddForeignKey
ALTER TABLE "CreditorAddress" ADD CONSTRAINT "CreditorAddress_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "Creditor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BureauRule" ADD CONSTRAINT "BureauRule_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "Creditor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisputeOutcome" ADD CONSTRAINT "DisputeOutcome_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "Creditor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
