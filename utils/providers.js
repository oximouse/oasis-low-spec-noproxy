import { generateRandomId } from "./system.js";  // For ID generation
import { readToken, saveToken } from "./file.js"; // For handling tokens
import { logger } from "./logger.js";             // For logging
import axios from 'axios';                        // For API requests

// Function to generate provider IDs using a prefix
async function generateProviderId(prefix) {
    return generateRandomId(prefix);  // Generate ID with the provided prefix
}

// Function to connect with the API using a token and return the created provider details
async function connectWithToken(token, prefix) {
    const url = 'https://api.oasis.ai/internal/authConnect?batch=1';
    const randomId = await generateProviderId(prefix);  // Generate the ID with prefix
    const payload = {
        "0": {
            "json": {
                "name": randomId,
                "platform": "browser"
            }
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    try {
        const response = await axios.post(url, payload, { headers });
        const logToken = response.data[0].result.data.json;
        logger('Creating Providers successful:', logToken);
        return logToken;
    } catch (error) {
        logger('Creating Providers error:', error.response ? error.response.status : error.response.statusText, 'error');
        return null;
    }
}

// Main function to create multiple providers using multiple tokens
export async function createProviders(numID, prefix) {
    try {
        // Read tokens from the file
        const tokens = await readToken('tokens.txt');
        
        for (const token of tokens) { 
            logger(`Creating Providers using token: ${token}`);
            // Loop through the number of providers to create
            for (let i = 0; i < numID; i++) {
                logger(`Creating Provider #${i + 1}...`);

                // Connect with the token and generate the provider
                const logToken = await connectWithToken(token, prefix);
                
                // If provider creation is successful, save the token
                if (logToken) {
                    saveToken("providers.txt", logToken);  // Save the logToken to providers.txt
                } else {
                    logger('Failed to create provider', 'error');
                    continue;
                }
            };
        };

        return true;
    } catch (error) {
        logger("Error reading token or connecting:", error, 'error');
        return false;
    }
}
