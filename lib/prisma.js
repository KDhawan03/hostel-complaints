import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// 1. Create the Pool
const pool = new Pool({ connectionString });

// 2. Pass Pool to Adapter
const adapter = new PrismaPg(pool);

const globalForPrisma = global;

// 3. Use 'export const' so your API route can find it
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;