import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/shared/config/test/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],

    coverage: {
      exclude: [
        "**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)",
        "**/test/**",
        "**/*.d.ts",
        "**/.{npm,prettier,docker-compose,gitlab-ci}rc.{?(c|m)js,yml}",
        "**/.sh",
        "src/types/**",
        "**/types.ts",
      ],
      provider: "v8",
      all: true,
      reporter: ["html", "text", "text-summary", "cobertura"],
    },
  },
});
