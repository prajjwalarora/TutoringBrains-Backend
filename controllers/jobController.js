const cron = require("node-cron");

cron.schedule("*/5 * * * *", function () {
  console.log("running a task every 5 minutes");
});
