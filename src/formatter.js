function getSportEmoji(sport) {
    const emojis = {
        football: "⚽",
        tennis: "🎾",
        basketball: "🏀",
        baseball: "⚾",
        hockey: "🏒",
        volleyball: "🏐",
        handball: "🤾",
        rugby: "🏉",
        cricket: "🏏",
        esports: "🎮",
        mma: "🥊"
    };

    return emojis[sport] || "🏆";
}

function formatPrediction(prediction) {

    const voteType = prediction.votes[0].voteType;

    let market = "Prediction";
    let pick = prediction.vote;

    switch (voteType) {

        case 1:
            market = "Full Time Result";

            if (prediction.vote === "1")
                pick = "🏠 Home Win";

            else if (prediction.vote === "X")
                pick = "🤝 Draw";

            else if (prediction.vote === "2")
                pick = "✈ Away Win";

            break;

        case 5:
            market = "Both Teams To Score";

            pick =
                prediction.vote.toLowerCase() === "yes"
                    ? "✅ YES"
                    : "❌ NO";

            break;

        default:
            market = `Market ${voteType}`;
    }

    const kickoff = new Date(prediction.startDateTimestamp * 1000);

    const kickoffTime = kickoff.toLocaleString("en-NG", {
        timeZone: "Africa/Lagos",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }) + " WAT";

    const match =
        `${prediction.homeTeamName} vs ${prediction.awayTeamName}`;

    const url =
        `https://www.sofascore.com/${prediction.sportSlug}/match/` +
        `${prediction.eventSlug}/${prediction.customId}`;

    return `🔔 And.A posted a new prediction

${getSportEmoji(prediction.sportSlug)} ${
    prediction.sportSlug.charAt(0).toUpperCase() +
    prediction.sportSlug.slice(1)
}

🏟 ${match}

📊 Market
${market}

🎯 Prediction
${pick}

💰 Odds
${prediction.odds.decimalValue}

🕒 Kickoff
${kickoffTime}

🔗 ${url}`;
}

module.exports = formatPrediction;