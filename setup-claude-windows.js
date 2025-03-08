#!/usr/bin/env node

import { homedir, platform } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, appendFileSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verify we're on Windows
if (platform() !== 'win32') {
    console.error('This script is intended for Windows only.');
    process.exit(1);
}

// Set path to Claude config
const claudeConfigPath = join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');

// Create backup filename with timestamp
const getBackupFilename = (originalPath) => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}`;
    const pathObj = originalPath.split('.');
    const extension = pathObj.pop();
    return `${pathObj.join('.')}-bk-${timestamp}.${extension}`;
};

// Setup logging
const LOG_FILE = join(__dirname, 'setup-windows.log');

function logToFile(message, isError = false) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${isError ? 'ERROR: ' : ''}${message}\n`;
    try {
        appendFileSync(LOG_FILE, logMessage);
        // For setup script, we'll still output to console
        console.log(isError ? `ERROR: ${message}` : message);
    } catch (err) {
        // Last resort error handling
        console.error(`Failed to write to log file: ${err.message}`);
    }
}

// Check if package is published to npm
function isPackagePublished() {
    try {
        execSync('npm view @jasondsmith72/desktop-commander version', { stdio: 'pipe' });
        return true;
    } catch (error) {
        return false;
    }
}

// Main setup function
async function setup() {
    logToFile('Starting Windows setup for ClaudeComputerCommander...');

    // Check if config file exists
    if (!existsSync(claudeConfigPath)) {
        logToFile(`Claude config file not found at: ${claudeConfigPath}`, true);
        logToFile('Please make sure Claude Desktop is installed and has been run at least once.');
        logToFile(`If Claude is installed in a non-standard location, please edit this script with the correct path.`);
        process.exit(1);
    }

    // Create backup of config file
    const backupPath = getBackupFilename(claudeConfigPath);
    try {
        copyFileSync(claudeConfigPath, backupPath);
        logToFile(`Created backup of Claude config at: ${backupPath}`);
    } catch (err) {
        logToFile(`Error creating backup: ${err.message}`, true);
        logToFile('Please make sure you have permissions to write to the Claude config directory.');
        process.exit(1);
    }

    // Read config content
    let configContent;
    try {
        configContent = readFileSync(claudeConfigPath, 'utf8');
        logToFile('Successfully read Claude configuration');
    } catch (err) {
        logToFile(`Error reading Claude configuration: ${err.message}`, true);
        process.exit(1);
    }

    // Parse config as JSON
    let config;
    try {
        config = JSON.parse(configContent);
        logToFile('Successfully parsed Claude configuration');
    } catch (err) {
        logToFile(`Error parsing Claude configuration: ${err.message}`, true);
        logToFile('The configuration file appears to be invalid JSON.');
        process.exit(1);
    }

    // Ensure mcpServers section exists
    if (!config.mcpServers) {
        config.mcpServers = {};
        logToFile('Added mcpServers section to configuration');
    }

    // Determine if running through npx or locally
    const isNpx = import.meta.url.endsWith('dist/setup-claude-windows.js');
    const isPublished = isPackagePublished();

    // Configure server based on environment
    let serverConfig;
    
    if (isPublished && isNpx) {
        // Package is published and we're running through npx
        serverConfig = {
            "command": "npx",
            "args": [
                "@jasondsmith72/desktop-commander"
            ]
        };
        logToFile('Configuring to use published npm package');
    } else {
        // Either package is not published or we're running locally
        // Use the direct path to the script
        const scriptPath = join(__dirname, 'dist', 'index.js');
        serverConfig = {
            "command": "node",
            "args": [
                scriptPath
            ]
        };
        logToFile(`Configuring to use local script at: ${scriptPath}`);
    }

    // Add desktopCommander server
    config.mcpServers.desktopCommander = serverConfig;
    logToFile('Added desktopCommander to mcpServers configuration');

    // Write the updated config
    try {
        writeFileSync(claudeConfigPath, JSON.stringify(config, null, 2), 'utf8');
        logToFile(`Successfully updated Claude configuration at: ${claudeConfigPath}`);
    } catch (err) {
        logToFile(`Error writing Claude configuration: ${err.message}`, true);
        logToFile('Please ensure you have write permissions to the Claude config directory.');
        logToFile(`You can manually add the configuration to ${claudeConfigPath}:`);
        logToFile(JSON.stringify(config, null, 2));
        process.exit(1);
    }
    
    // Final message
    logToFile('\nSetup completed successfully!');
    logToFile('Please restart Claude Desktop to apply the changes.');
    logToFile('\nYou can customize allowed directories by editing the config.json file.');
}

// Run the setup
setup().catch(err => {
    logToFile(`Unhandled error during setup: ${err.message}`, true);
    process.exit(1);
});
