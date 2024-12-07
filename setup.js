import { readToken, delay } from "./utils/file.js";
import { showBanner } from "./utils/banner.js";
import { loginFromFile } from "./utils/login.js";
import { createProviders } from "./utils/providers.js";
import { logger } from "./utils/logger.js";
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  showBanner();
  
  // First, prompt the user for the prefix ID
  const prefix = await askQuestion('Please Input Your PROVIDER Name: ');

  // Validate prefix if necessary (Optional)
  if (!prefix || prefix.length === 0) {
    logger("Invalid prefix. Please provide a valid prefix.", "", "error");
    rl.close();
    return;
  }

  // Ask for the number of providers to create
  const input = await askQuestion('How Much PROVIDER You want to Create? MAX is 100: ');
  const numProv = parseInt(input, 10);
  
  if (isNaN(numProv) || numProv < 1 || numProv > 100) {
    logger("Invalid input. Please enter a number between 1 and 100.", "", "error");
    rl.close();
    return;
  }

  const isLogin = await loginFromFile('accounts.txt');

  if (!isLogin) {
    logger("No accounts were successfully logged in. Exiting...", "", "error");
    rl.close();
    return; 
  }

  logger(`Creating ${numProv} Providers with prefix: ${prefix}...`);
  await createProviders(numProv, prefix);  // Pass prefix to createProviders
  
  rl.close();
}

setup();
