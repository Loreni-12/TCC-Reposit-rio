import { defineConfig } from "vitest/config";

// Testes das Security Rules do Firestore. Precisam do emulador:
// rode sempre via `npm run test:rules` (firebase emulators:exec).
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    fileParallelism: false,
    testTimeout: 20_000,
  },
});
