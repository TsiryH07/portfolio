import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const enableStorybookTests = process.env.STORYBOOK_TESTS === "true"

const unitProject: any = {
  test: {
    name: "unit",
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/tests/**/*.test.{ts,tsx}"],
  },
}

const projects: any[] = [unitProject]

if (enableStorybookTests) {
  const storybookProject: any = {
    plugins: [
      storybookTest({
        configDir: path.join(dirname, ".storybook"),
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: "chromium" }],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  }

  projects.push(storybookProject)
}

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.*)$/, replacement: path.resolve(dirname, "src/$1") },
      { find: "@", replacement: path.resolve(dirname, "src") },
    ],
  },
  test: {
    passWithNoTests: true,
    projects,
  },
});
