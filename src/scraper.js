const { exec } = require("child_process");
const os = require("os");
const config = require("./config");

function getPredictions() {

    return new Promise((resolve, reject) => {

        const isWindows = os.platform() === "win32";

        const command = isWindows
            ? `curl --ssl-no-revoke -s "${config.API_URL}"`
            : `curl -s "${config.API_URL}"`;

        exec(command, (error, stdout, stderr) => {

            if (error)
                return reject(error);

            if (stderr)
                console.log(stderr);

            try {

                const data = JSON.parse(stdout);

                if (data.error) {
                    return reject(
                        new Error(
                            `SofaScore API: ${data.error.code} ${data.error.reason}`
                        )
                    );
                }

                resolve(data.predictions);

            } catch (err) {

                reject(err);

            }

        });

    });

}

module.exports = getPredictions;