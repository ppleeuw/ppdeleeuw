# Amberscript -> Documents/AGI sync (Windows)
# Runs Claude Code headlessly; requires the amber-notes MCP server to be
# registered at user scope (see README.md).

$AgiDir = Join-Path $env:USERPROFILE "Documents\AGI"
New-Item -ItemType Directory -Force -Path $AgiDir | Out-Null
Set-Location $AgiDir

$Prompt = @"
Sync my Amberscript transcripts into the current directory.
1. Use the amber-notes MCP tools to list all available transcripts/notes.
2. Check which transcripts are already saved here: existing files are named
   YYYY-MM-DD-<title>.md. Match on date and title.
3. For each transcript that is not yet saved, fetch its full content and write
   it to a new file named YYYY-MM-DD-<title-in-lowercase-with-hyphens>.md with
   YAML front matter: title, date, source: amberscript.
4. Never modify or overwrite existing files.
5. Finish with a one-line summary: how many transcripts found, how many new
   files written.
"@

claude -p $Prompt --allowedTools "mcp__amber-notes,Read,Glob,Grep,Write"
