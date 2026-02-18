-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "billingStatus" TEXT NOT NULL DEFAULT 'FREE',
ADD COLUMN     "billingUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'STARTER',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;
