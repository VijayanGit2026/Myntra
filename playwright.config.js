// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html"],
    ["list"],
    ["allure-playwright", {
      resultsDir: "allure-results",
    }],
  ],

  use: {
    headless: false,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
          slowMo: 1000,
        },
      },
    },
  ],
});