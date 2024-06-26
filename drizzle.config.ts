import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schema/*",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
