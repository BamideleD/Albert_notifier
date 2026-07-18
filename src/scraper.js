const { exec } = require("child_process");
const config = require("./config");

function getPredictions() {

    console.log("API URL:", config.API_URL);

    return new Promise((resolve, reject) => {

        const command = `curl -L -s \
        -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" \
        -H "Referer: https://www.sofascore.com/" \
        -H "Accept: application/json" \
        "${config.API_URL}"`;

        exec(command, (error, stdout, stderr) => {

            if (error)
                return reject(error);

            if (stderr)
                console.log(stderr);

            try {

                const data = JSON.parse(stdout);

                console.log("=== RAW RESPONSE ===");
                console.log(stdout);

                console.log("=== KEYS ===");
                console.log(Object.keys(data));

                console.log("=== PREDICTIONS ===");
                console.log(data.predictions);

                resolve(data.predictions);

            } catch (err) {

                reject(err);

            }

        });

    });
}

module.exports = getPredictions;