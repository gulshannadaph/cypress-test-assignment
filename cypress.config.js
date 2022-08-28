const { defineConfig } = require("cypress");
const base_url = "https://wave-trial.getbynder.com";

module.exports = defineConfig({
  env: {
    login_url: `${base_url}/login/`,
    dashboard_url: `${base_url}/account/dashboard/`,
    valid_email: "gul@mailinator.com",
    invalid_email: "gul1@mailinator.com",
    password: "Tester@123",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
