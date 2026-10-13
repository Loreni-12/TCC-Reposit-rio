import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Testes de lógica (sem emulador). Testes de regras ficam em vitest.rules.config.ts.
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
