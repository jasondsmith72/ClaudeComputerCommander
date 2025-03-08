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
   git clone https://github.com/jasondsmith72/ClaudeComputerCommander.git C:\Users\[YourUsername]\ClaudeComputerCommander
   ```

2. Navigate to the cloned directory:
   ```
   cd C:\Users\[YourUsername]\ClaudeComputerCommander
   ```

3. Install dependencies and build the project:
   ```
   npm install
   npm run build
   ```

4. Run the appropriate setup script for your platform:
   - For Windows: `npm run setup:windows`
   - For custom setup with manual instructions: `npm run setup:custom`
   - For standard setup: `npm run setup`

## Manual Configuration

You can also manually configure Claude Desktop to use this package:

1. Locate your Claude Desktop configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Update or add the following to the file:
   ```json
   {
     "mcpServers": {
       "desktopCommander": {
         "command": "node",
         "args": [
           "C:\\Users\\[YourUsername]\\ClaudeComputerCommander\\dist\\index.js"
         ]
       }
     }
   }
   ```
   (Replace `[YourUsername]` with your actual Windows username)

### Using Environment Variables (Windows)

For better portability on Windows, you can use environment variables in your path:

```json
{
  "mcpServers": {
    "desktopCommander": {
      "command": "node",
      "args": [
        "C:\\Users\\%USERNAME%.%USERDOMAIN%\\ClaudeComputerCommander\\dist\\index.js"
      ]
    }
  }
}
```

This makes it easier to share configurations between different computers or users. When Claude runs the command, Windows will automatically expand the `%USERNAME%` and `%USERDOMAIN%` variables to the correct values for the current user.

## Example Working Configurations

### Standard path configuration:

```json
{
  "mcpServers": {
    "desktopCommander": {
      "command": "node",
      "args": [
        "C:\\Users\\administrator.MTUSACLOUD\\ClaudeComputerCommander\\dist\\index.js"
      ]
    }
  }
}
```

### With environment variables:

```json
{
  "mcpServers": {
    "desktopCommander": {
      "command": "node",
      "args": [
        "C:\\Users\\%USERNAME%.%USERDOMAIN%\\ClaudeComputerCommander\\dist\\index.js"
      ]
    }
  }
}
```

## Still Having Issues?

If you're still experiencing problems, please:

1. Check the log files in the ClaudeComputerCommander directory:
   - `setup.log`
   - `setup-windows.log`
   - `setup-custom.log`

2. Ensure the file actually exists at the path specified in the configuration.

3. Try running this command to verify the correct path:
   ```
   dir "C:\Users\%USERNAME%\ClaudeComputerCommander\dist\index.js"
   ```

4. Open an issue on GitHub with details about the error and your environment.
