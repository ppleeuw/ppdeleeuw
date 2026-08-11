# Amberscript → Documents/AGI → Claude

This folder contains everything needed to automatically pull your Amberscript
transcripts into `Documents/AGI` as markdown files, and to make Claude aware of
them in every session.

The pipeline has three parts:

1. **Connect** the Amber Notes MCP server to Claude Code (one-time).
2. **Sync** transcripts to `Documents/AGI` as markdown (a script, optionally scheduled).
3. **Infuse** the folder into Claude's context via your global `CLAUDE.md` (one-time).

Everything below runs on **your own PC**, not in this repository.

---

## 1. Connect the MCP server (one-time)

On your PC, in a terminal:

```bash
claude mcp add --scope user --transport http amber-notes https://api.ambernotes.eu/mcp --header "X-API-Key: YOUR_AMBER_API_KEY"
```

Notes:

- `--scope user` makes the server available in every Claude Code session on your
  machine (not just one project). This matters because the sync script runs
  Claude headlessly from the `Documents/AGI` folder.
- Replace `YOUR_AMBER_API_KEY` with your key from the Amberscript/Ambernotes
  dashboard. **Never commit this key to a repository** — this key grants access
  to all your transcripts.
- Verify it works: run `claude mcp list` (should show `amber-notes` as connected),
  then open `claude` and ask *"list my amberscript transcripts"*.

## 2. Sync transcripts to Documents/AGI

Pick the script for your operating system and copy it into `Documents/AGI`:

- **Windows:** `sync-transcripts.ps1`
- **macOS / Linux:** `sync-transcripts.sh` (make it executable: `chmod +x sync-transcripts.sh`)

The script runs Claude Code headlessly. Claude uses the amber-notes MCP tools to
list your transcripts, compares them with the markdown files already in the
folder, and writes any new ones as `YYYY-MM-DD-title.md` with YAML front matter.
Existing files are never modified, so you can freely annotate them.

Run it manually first to check it works:

```powershell
# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\Documents\AGI\sync-transcripts.ps1"
```

```bash
# macOS / Linux
~/Documents/AGI/sync-transcripts.sh
```

### Schedule it (optional but recommended)

**Windows — Task Scheduler, daily at 08:00:**

```powershell
schtasks /Create /SC DAILY /ST 08:00 /TN "AmberscriptSync" /TR "powershell -ExecutionPolicy Bypass -File %USERPROFILE%\Documents\AGI\sync-transcripts.ps1"
```

**macOS / Linux — cron, daily at 08:00** (`crontab -e`, then add):

```cron
0 8 * * * "$HOME/Documents/AGI/sync-transcripts.sh" >> "$HOME/Documents/AGI/.sync.log" 2>&1
```

You can also skip scheduling entirely and just say *"sync my transcripts"* in any
Claude Code session — with the MCP server connected, Claude can do the same
thing interactively.

## 3. Make Claude always aware of the transcripts

Add the snippet in `claude-md-snippet.md` to your **global** Claude memory file
at `~/.claude/CLAUDE.md` (Windows: `C:\Users\<you>\.claude\CLAUDE.md`). Create
the file if it doesn't exist.

This tells Claude, in every session on your machine, that your transcripts live
in `Documents/AGI` and that it should search and read them whenever a question
touches your meetings or notes. This scales better than loading every transcript
into context up front: Claude pulls in only the transcripts relevant to what you
ask, so the setup keeps working even when you have hundreds of files.

If you also use the Claude desktop app (Cowork), grant it access to the
`Documents/AGI` folder there as well — the same markdown files then feed both.

## Security

- Treat the `X-API-Key` like a password. If it has ever been pasted into a chat,
  email, or document, **rotate it** in your Ambernotes account and re-run the
  `claude mcp add` command with the new key.
- Keep the key out of any git repository — especially this one, which is public.
