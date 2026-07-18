const getPredictions = require("./scraper");
const sendTelegram = require("./telegram");
const formatPrediction = require("./formatter");
const { loadSeen, saveSeen, makeKey } = require("./storage");

const TELEGRAM_DELAY = 500;

async function runNotifier() {
    console.log("Checking And.A...");

    let predictions;

    try {
        predictions = await getPredictions();
    } catch (err) {
        console.error("Failed to fetch predictions.");
        console.error(err);
        return;
    }

    console.log(`${predictions.length} prediction(s) found.`);

    // Oldest first
    predictions.sort(
        (a, b) => a.startDateTimestamp - b.startDateTimestamp
    );

    const seen = loadSeen();
    let newCount = 0;

    for (const prediction of predictions) {

        const key = makeKey(prediction);

        if (seen[key]) {
            continue;
        }

        const message = formatPrediction(prediction);

        try {

            await sendTelegram(message);

            seen[key] = {
                sentAt: new Date().toISOString(),
                eventId: prediction.eventId,
                sport: prediction.sportSlug,
                home: prediction.homeTeamName,
                away: prediction.awayTeamName,
                vote: prediction.vote
            };

            // Save immediately
            saveSeen(seen);

            newCount++;

            console.log(
                `✓ Sent: ${prediction.homeTeamName} vs ${prediction.awayTeamName}`
            );

        } catch (err) {

            console.error(
                `✗ Failed to send notification for ${prediction.homeTeamName} vs ${prediction.awayTeamName}`
            );

            console.error(err);

        }

        // Prevent Telegram rate limits
        await new Promise(resolve => setTimeout(resolve, TELEGRAM_DELAY));
    }

    console.log(`Finished. ${newCount} new prediction(s).`);
}

module.exports = runNotifier;