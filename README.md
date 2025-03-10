# Claude Desktop Commander MCP

[![npm downloads](https://img.shields.io/npm/dw/@jasondsmith72/desktop-commander)](https://www.npmjs.com/package/@jasondsmith72/desktop-commander)
[![GitHub Repo](https://img.shields.io/badge/GitHub-jasondsmith72%2FClaudeComputerCommander-blue)](https://github.com/jasondsmith72/ClaudeComputerCommander)

Enhanced version of Claude Desktop Commander with advanced monitoring, backup, and management features.

This is a server that allows Claude desktop app to execute long-running terminal commands on your computer and manage processes through Model Context Protocol (MCP) + Built on top of [MCP Filesystem Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) to provide additional search and replace file editing capabilities.

This is a fork of [wonderwhy-er/ClaudeComputerCommander](https://github.com/wonderwhy-er/ClaudeComputerCommander) with enhanced configuration options.

## Features

### Core Features
- Execute terminal commands with output streaming
- Command timeout and background execution support
- Process management (list and kill processes)
- Session management for long-running commands
- Full filesystem operations including read/write, directory creation, move files, and more
- Configurable allowed directories

### Enhanced Features
- **File History & Versioning**: Track changes to files and roll back to previous versions
- **Enhanced Backup & Restore System**: Comprehensive file backup with easy restoration
- **Enhanced Security Controls**: Granular permission levels for directories and files
- **Monitoring Dashboard**: Web interface to monitor Claude's activity on your system
- **Command Aliasing**: Create shortcuts for frequently used commands
- **Integration with MCP Servers**: Better coordination with other MCP servers
- **User-Friendly Web Interface**: Configure Claude Desktop Commander through a web browser
- **Auto-Update System**: Keep your installation up-to-date automatically
- **Cross-Platform Compatibility**: Tested across different operating systems

## Installation

First, ensure you've downloaded and installed the [Claude Desktop app](https://claude.ai/download) and you have [npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Option 1: Custom Setup (Recommended)

This method is best if you don't have permissions to directly modify the Claude config file or prefer a guided approach:

1. Clone the repository:
```bash
git clone https://github.com/jasondsmith72/ClaudeComputerCommander.git C:\\Users\\[YourUsername]\\ClaudeComputerCommander
```

```bash
cd C:\\Users\\[YourUsername]\\ClaudeComputerCommander
```

2. Install dependencies and run the appropriate setup script based on your needs:
```bash
# For Windows with automatic configuration:
npm run setup:windows
```

```bash
# For guided manual setup (works on any platform):
npm run setup:custom
```

```bash
# For standard setup (requires write access to Claude config):
npm run setup
```

3. Follow any on-screen instructions provided by the setup script.

4. Restart Claude if it's running.

### Option 2: Add to claude_desktop_config manually

Add this entry to your claude_desktop_config.json (on Windows, found at %APPDATA%\\Claude\\claude_desktop_config.json):

#### Standard config (replacing with your username):
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

#### Using Windows environment variables (recommended):
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

This makes your configuration more portable between different Windows computers. Windows will automatically expand the `%USERNAME%` and `%USERDOMAIN%` variables when running the command.

Make sure to restart Claude after making changes to the configuration file.

## Uninstallation

To uninstall ClaudeComputerCommander, you have two options:

### Option 1: Using the uninstall script (Recommended)

If you have the repository locally:
```bash
cd ClaudeComputerCommander
```

```bash
npm run uninstall
```

If you've installed it globally:
```bash
npx @jasondsmith72/desktop-commander uninstall
```

This will:
1. Create a backup of your Claude configuration file
2. Remove all references to desktopCommander from the configuration
3. Log the changes made for reference

### Option 2: Manual uninstallation

1. Open your Claude Desktop configuration file:
   - Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Remove the `desktopCommander` entry from the `mcpServers` section.

3. Restart Claude Desktop.

4. If you installed the package globally, uninstall it:
```bash
npm uninstall -g @jasondsmith72/desktop-commander
```

## New Enhanced Features

### Web Configuration Interface

Access the web-based configuration interface by running:

```
start_web_ui
```

This opens a browser interface where you can:
- Configure security settings
- Manage command aliases
- Control integrations with other MCP servers
- View system statistics
- Check for updates

### File Versioning System

Create automatic backups of files before modifications:

```
backup_file path="/path/to/yourfile.txt"
```

List available versions:

```
get_file_versions path="/path/to/yourfile.txt"
```

Restore a previous version:

```
restore_version path="/path/to/yourfile.txt" versionId="version-uuid"
```

Compare versions:

```
compare_versions path="/path/to/yourfile.txt" versionId1="old-version" versionId2="new-version"
```

### Monitoring Dashboard

Start the monitoring dashboard:

```
start_monitoring_dashboard
```

The dashboard shows:
- Command history
- File modifications
- Backup statistics
- System status

### Command Aliases

Create shortcuts for frequently used commands:

```
aliases
```

This lists all available aliases. Common examples:
- `ls` for listing directories
- `cat` for reading files
- `mkdir` for creating directories
- `dashboard` for starting the monitoring dashboard

### Enhanced Security

Set permission levels for directories:

```
security/permissions
```

Permission levels include:
- No Access (0)
- Read-Only (1)
- Read & Write (2)
- Read, Write & Execute (3)
- Full Access (4)

### Integration with Other MCP Servers

Enable or list other MCP servers:

```
integrations
```

Supported integrations:
- puppeteer
- memory
- github
- weather
- brave_search
- fetch

## Configuration

### Allowed Directories
By default, Claude can only access:
1. The current working directory (where the server is running from)
2. The user's home directory

You can customize this by editing the `config.json` file in the root of the project:

```json
{
  "blockedCommands": [
    "format",
    "mount",
    "umount",
    ...
  ],
  "allowedDirectories": [
    "~",                 // User's home directory
    "~/Documents",       // Documents folder
    "~/Projects",        // Projects folder
    ".",                 // Current working directory
    "/path/to/folder"    // Any absolute path
  ]
}
```

**Notes on allowed directories:**
- Use `~` to refer to the user's home directory
- Use `.` to refer to the current working directory
- You can specify absolute paths as well
- For security reasons, each path is validated before access is granted

### Blocked Commands
You can configure which commands are blocked by editing the `blockedCommands` array in `config.json`:

```json
{
  "blockedCommands": [
    "format",
    "mount",
    "umount",
    "mkfs",
    "fdisk",
    "dd",
    "sudo",
    "su",
    ...
  ]
}
```

## Usage

The server provides these tool categories:

### Terminal Tools
- `execute_command`: Run commands with configurable timeout
```
execute_command command="your_command_here" timeout_ms=5000
```

- `read_output`: Get output from long-running commands
```
read_output pid=12345
```

- `force_terminate`: Stop running command sessions
```
force_terminate pid=12345
```

- `list_sessions`: View active command sessions
```
list_sessions
```

- `list_processes`: View system processes
```
list_processes
```

- `kill_process`: Terminate processes by PID
```
kill_process pid=12345
```

- `block_command`: Add a command to the blacklist
```
block_command command="dangerous_command"
```

- `unblock_command`: Remove a command from the blacklist
```
unblock_command command="command_name"
```

- `list_blocked_commands`: View all blocked commands
```
list_blocked_commands
```

### Filesystem Tools
- `read_file`: Read contents of a file
```
read_file path="/path/to/file.txt"
```

- `read_multiple_files`: Read multiple files at once
```
read_multiple_files paths=["/path/to/file1.txt", "/path/to/file2.txt"]
```

- `write_file`: Write content to a file
```
write_file path="/path/to/file.txt" content="Your file content here"
```

- `create_directory`: Create a new directory
```
create_directory path="/path/to/new_directory"
```

- `list_directory`: List contents of a directory
```
list_directory path="/path/to/directory"
```

- `move_file`: Move or rename a file
```
move_file source="/path/to/source.txt" destination="/path/to/destination.txt"
```

- `search_files`: Search for files matching a pattern
```
search_files path="/path/to/search" pattern="*.txt"
```

- `get_file_info`: Get metadata about a file
```
get_file_info path="/path/to/file.txt"
```

- `list_allowed_directories`: List directories Claude can access
```
list_allowed_directories
```

### Edit Tools
- `edit_block`: Apply surgical text replacements
```
edit_block blockContent="filepath.ext
<<<<<<< SEARCH
existing code to replace
=======
new code to insert
>>>>>>> REPLACE"
```

- `write_file`: Complete file rewrites
```
write_file path="/path/to/file.txt" content="Complete new content for the file"
```

### Backup Tools
- `backup_file`: Create a backup of a file
```
backup_file path="/path/to/yourfile.txt"
```

- `restore_version`: Restore a specific version of a file
```
restore_version path="/path/to/yourfile.txt" versionId="version-uuid"
```

- `get_file_versions`: Get version history for a file
```
get_file_versions path="/path/to/yourfile.txt"
```

- `compare_versions`: Compare different versions of a file
```
compare_versions path="/path/to/yourfile.txt" versionId1="old-version" versionId2="new-version"
```

- `get_backup_stats`: Get backup system statistics
```
get_backup_stats
```

### Monitoring Tools
- `start_monitoring_dashboard`: Start monitoring dashboard
```
start_monitoring_dashboard
```

- `stop_monitoring_dashboard`: Stop monitoring dashboard
```
stop_monitoring_dashboard
```

- `get_monitoring_status`: Get dashboard status
```
get_monitoring_status
```

### Web UI Tools
- `start_web_ui`: Start web configuration interface
```
start_web_ui
```

- `stop_web_ui`: Stop web configuration interface
```
stop_web_ui
```

- `get_web_ui_status`: Get web UI status
```
get_web_ui_status
```

### Update Tools
- `check_for_updates`: Check for available updates
```
check_for_updates
```

- `perform_update`: Update to latest version
```
perform_update
```

Search/Replace Block Format:
```
filepath.ext
<<<<<<< SEARCH
existing code to replace
=======
new code to insert
>>>>>>> REPLACE
```

Example:
```
src/main.js
<<<<<<< SEARCH
console.log("old message");
=======
console.log("new message");
>>>>>>> REPLACE
```

## Handling Long-Running Commands

For commands that may take a while:

1. `execute_command` returns after timeout with initial output
2. Command continues in background
3. Use `read_output` with PID to get new output
4. Use `force_terminate` to stop if needed

## Troubleshooting

If you encounter issues:

1. Check the [Installation Troubleshooting Guide](INSTALLATION_TROUBLESHOOTING.md) for common installation issues
2. Check the monitoring dashboard for error logs
3. Verify permissions in the configuration UI
4. Run `check_for_updates` to ensure you have the latest version
5. Visit the web configuration interface for detailed system status
6. Ensure your desired file paths are in the allowed directories configuration
7. If you're getting "access denied" errors, use the `list_allowed_directories` tool to see which directories are accessible

## Contributing

If you find this project useful, please consider giving it a ⭐ star on GitHub! This helps others discover the project and encourages further development.

We welcome contributions from the community! Whether you've found a bug, have a feature request, or want to contribute code, here's how you can help:

- **Found a bug?** Open an issue at [github.com/jasondsmith72/ClaudeComputerCommander/issues](https://github.com/jasondsmith72/ClaudeComputerCommander/issues)
- **Have a feature idea?** Submit a feature request in the issues section
- **Want to contribute code?** Fork the repository, create a branch, and submit a pull request
- **Questions or discussions?** Start a discussion in the GitHub Discussions tab

All contributions, big or small, are greatly appreciated!

## License

MIT