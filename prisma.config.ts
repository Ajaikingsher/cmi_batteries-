import { defineConfig } from '@prisma/config';
import fs from 'fs';
import path from 'path';

// Force load .env manually
if (!process.env.DIRECT_URL) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([^=#]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match) {
        process.env[match[1]] = match[2];
      }
    });
  }
}

export default defineConfig({
  datasource: {
    // CLI operations (like db push/migrate) MUST use the Direct URL (Port 5432)
    // and not the connection pooler URL (Port 6543), otherwise the CLI hangs indefinitely.
    url: process.env.DIRECT_URL,
  },
});
