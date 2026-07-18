const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "data", "seenPredictions.json");

function loadSeen() {
    if (!fs.existsSync(FILE))
        return {};

    try {
        return JSON.parse(fs.readFileSync(FILE, "utf8"));
    } catch {
        return {};
    }
}

function saveSeen(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function makeKey(prediction) {
    return `${prediction.eventId}-${prediction.votes[0].voteType}-${prediction.vote}`;
}

module.exports = {
    loadSeen,
    saveSeen,
    makeKey
};