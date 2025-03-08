# Claude Desktop Configuration Examples

This directory contains example configurations for Claude Desktop.

## claude_desktop_config_example.json

This is a complete example configuration for Claude Desktop that includes:

1. The desktopCommander MCP server with environment variables in the path
2. Additional commonly used MCP servers

### Using this configuration:

1. Copy the content of `claude_desktop_config_example.json`
2. Paste it into your Claude Desktop configuration file located at:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
3. Modify the paths or API keys as needed
4. Save the file and restart Claude Desktop

### Environment Variables

The configuration uses Windows environment variables `%USERNAME%` and `%USERDOMAIN%` to make it portable across different Windows computers. When Windows runs the command, it automatically replaces these variables with your actual username and domain.

For example, if your username is "john" and your domain is "ACME", the path:
```
C:\Users\%USERNAME%.%USERDOMAIN%\ClaudeComputerCommander\dist\index.js
```

Will become:
```
C:\Users\john.ACME\ClaudeComputerCommander\dist\index.js
```

### Important Notes:

1. Make sure the ClaudeComputerCommander repository is cloned to the correct location
2. Build the project before trying to use it:
   ```
   cd C:\Users\[YourUsername]\ClaudeComputerCommander
   npm install
   npm run build
   ```
3. Replace placeholder API keys with your actual keys for services like GitHub and Brave Search
4. For security, do not share your configuration file with API keys
