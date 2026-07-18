const runNotifier = require("./notifier");

(async () => {
    try {
        await runNotifier();
    } catch (err) {
        console.error(err);
    }
})();{}