const getPredictions = require("./scraper");
const formatPrediction = require("./formatter");

(async () => {

    const predictions = await getPredictions();

    console.log(
        formatPrediction(predictions[0])
    );

})();