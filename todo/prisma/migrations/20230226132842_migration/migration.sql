-- CreateTable
CREATE TABLE "Hello" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT 'Hello World',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hello_pkey" PRIMARY KEY ("id")
);
