import { defineConfig } from '@prisma/config';

// Vercel automatically handles .env loading, so we can skip the fs/path logic
export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL,
  },
});