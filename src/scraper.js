const { exec } = require("child_process");
const config = require("./config");

function getPredictions() {

    console.log("API URL:", config.API_URL);
    
    return new Promise((resolve, reject) => {

        const command =
            `curl --ssl-no-revoke -s "${config.API_URL}"`;

        exec(command, (error, stdout, stderr) => {

            if (error)
                return reject(error);

            if (stderr)
                console.log(stderr);

            try {

                const data = JSON.parse(stdout);

                resolve(data.predictions);

            } catch (err) {

                reject(err);

            }

        });

    });
}

module.exports = getPredictions;