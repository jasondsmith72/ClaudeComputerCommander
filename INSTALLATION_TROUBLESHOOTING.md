# Installation Troubleshooting

## Common Issues

### npm 404 Error: `@jasondsmith72/desktop-commander` Not Found

If you're seeing an error like this:

```
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@jasondsmith72%2fdesktop-commander - Not found
npm ERR! 404 
npm ERR! 404  '@jasondsmith72/desktop-commander@*' is not in this registry.
```

This means Claude Desktop is trying to install the package from npm, but the package hasn't been published to the npm registry yet.

### Solution

The setup scripts have been updated to check if the package is published to npm, and if not, they will configure Claude Desktop to use a local path to the script instead. To fix this issue:

1. Clone this repository:
   ```
   git clone https://github.com/jasondsmith72/ClaudeComputerCommander.git
   ```

2. Navigate to the cloned directory:
   ```
   cd ClaudeComputerCommander
   ```

3. Run the appropriate setup script for your platform:
   - For Windows: `npm run setup:windows`
   - For custom setup with manual instructions: `npm run setup:custom`
   - For standard setup: `npm run setup`

## Manual Configuration

You can also manually configure Claude Desktop to use this package:

1. Locate your Claude Desktop configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add the following to the `mcpServers` section:
   ```json
   "desktopCommander": {
     "command": "node",
     "args": [
       "C:\\path\\to\\ClaudeComputerCommander\\dist\\index.js"
     ]
   }
   ```
   (Replace the path with the actual path to where you've cloned the repository)

3. Save the file and restart Claude Desktop.

## Still Having Issues?

If you're still experiencing problems, please:

1. Check the log files in the ClaudeComputerCommander directory:
   - `setup.log`
   - `setup-windows.log`
   - `setup-custom.log`

2. Open an issue on GitHub with details about the error and your environment.
