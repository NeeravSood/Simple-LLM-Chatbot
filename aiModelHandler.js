const { exec } = require('child_process');

// Function to load the model
// This is more symbolic in this context as the actual model loading happens in Python
const loadModel = () => {
    console.log("Model assumed to be loaded via Python script.");
};

// Function to handle incoming messages and interact with the Python model
const handleMessage = async (text) => {
    return new Promise((resolve, reject) => {
        exec(`python3 ./python/model.py "${text}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Python stderr: ${stderr}`);
                reject(`Error: ${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
};

module.exports = { loadModel, handleMessage };
