-- CreateTable
CREATE TABLE "Adriana2FA" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,

    CONSTRAINT "Adriana2FA_pkey" PRIMARY KEY ("id")
);
