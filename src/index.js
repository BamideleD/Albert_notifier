const runNotifier = require("./notifier");

const CHECK_INTERVAL = 60 * 1000; // 1 minute

async function start() {

    console.log("Albert Notifier started.");

    while (true) {

        try {
            await runNotifier();
        } catch (err) {
            console.error(err);
        }

        console.log("Sleeping for 1 minute...\n");

        await new Promise(resolve =>
            setTimeout(resolve, CHECK_INTERVAL)
        );
    }
}

start();