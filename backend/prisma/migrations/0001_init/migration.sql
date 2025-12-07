-- Initial migration for address route optimizer
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "AddressList" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "startingNote" TEXT
);

CREATE TABLE "Address" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "addressListId" UUID NOT NULL REFERENCES "AddressList"(id) ON DELETE CASCADE,
    "rawText" TEXT NOT NULL,
    "formattedAddress" TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    comment TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "RouteEmailRecipient" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "addressListId" UUID NOT NULL REFERENCES "AddressList"(id) ON DELETE CASCADE,
    email TEXT NOT NULL
);

CREATE INDEX "idx_addresslist_user" ON "AddressList"("userId");
CREATE INDEX "idx_address_list" ON "Address"("addressListId");
