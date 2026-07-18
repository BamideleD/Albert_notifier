const runNotifier = require("./notifier");

const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

async function start() {

    console.log("Albert Notifier started.");

    while (true) {

        try {
            await runNotifier();
        } catch (err) {
            console.error(err);
        }

        console.log("Sleeping for 5 minutes...\n");

        await new Promise(resolve =>
            setTimeout(resolve, CHECK_INTERVAL)
        );
    }
}

start();