const getPredictions = require("./scraper");

(async () => {

    try {

        const predictions = await getPredictions();

        console.log(predictions[0]);

    } catch (err) {

        console.error(err);

    }

})();