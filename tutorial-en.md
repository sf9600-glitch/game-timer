# Game Timer — Getting Started

Welcome! This guide assumes you're opening the app for the first time. It walks you from **setting up accounts and tags** to **starting your first countdown**, plus advanced features.

---

## What can this app do?

- Manage countdown timers for **multiple game accounts** (e.g. different servers or characters).
- Bind each timer to a **task tag** (idle, event, dungeon, etc.) and optional **sub-items** (map name, squad, etc.).
- **Red flash warning** on cards when time is almost up.
- When time is up, timers move to **Finished** with end time and elapsed duration.
- **Undo** accidental deletes, **export/import backups**, and (if configured) **cloud sync** across devices.

---

## Layout overview

| Area | Description |
|------|-------------|
| **Main area (right / full screen)** | Timers grouped by account — Active and Finished sections. |
| **Settings panel (left)** | Accounts, tags, start timers, system & theme. Always visible on desktop; on mobile tap **Settings** to slide it out. |

The settings panel has four collapsible sections (tap the title to expand/collapse):

1. **Account management** — Game accounts and characters  
2. **Edit task tags** — Task types (with optional sub-tags)  
3. **New timer** — Pick account, set time, start  
4. **System & theme** — Backup, undo, language, appearance, cloud  

---

## Five-minute quick start

### Step 1: Open the settings panel

- **Desktop**: The left panel should already be visible.  
- **Mobile**: Tap **Settings** in the account toolbar, or **‹ Collapse** to close; tap the dimmed area to dismiss.

### Step 2: Add a game account

1. Expand **Account management**.  
2. Enter a name (e.g. `sf9600`) and tap **Add**.  
3. *(Optional)* Add **character names** under the account card (e.g. `VINCE`) to tell timers apart.  
4. *(Optional)* Tap color swatches next to account or character names to customize colors on the main screen.

> **Rename**: Tap underlined names to rename.  
> **Delete**: Tap **×**; deleting an account removes all active timers under it (confirmation shown first).

### Step 3: Create task tags

1. Expand **Edit task tags**.  
2. Enter a tag name (e.g. `Idle`) and tap **Add**.  
3. Tap a tag card to expand and add **sub-items** (e.g. `Forest`, `Mine`) with **+**.  
4. **Drag** tags to reorder; sub-items can be reordered too.

### Step 4: Set time and start

1. Expand **New timer**.  
2. Choose **Account**, **Character**, and **Task tag**; if the tag has sub-items, a dropdown appears.  
3. Set the countdown using any of:  
   - **D / H / M / S** fields (days, hours, minutes, seconds)  
   - Shortcuts: **+1d, +12h, +1h, +10m, +1m, +30s**  
   - The large **00:00:00** shows total duration (h:m:s)  
   - When a value changes, **only that field briefly pulses** so you can confirm at a glance  
4. Set **Flash warning** (often default `0:30`): the card flashes red when remaining time enters this window.  
5. Tap **Start timer**.  

After starting, a card appears under that account on the main screen; on mobile the settings panel usually closes so you can focus on the countdown.

### Step 5: Read the results

- **Active**: Remaining time, estimated end date; progress bar color shifts over time.  
- **Warning**: Red pulse when inside your flash-warning window.  
- **Finished**: After time is up, moves to Finished with end time and elapsed duration.  
- **Remove one timer**: Tap **×** on the card.  

---

## Account management (details)

| Action | How |
|--------|-----|
| Add account | Enter name → **Add** |
| Add character | Under account card → enter name → **+** |
| Rename | Tap underlined name |
| Change color | Tap color swatch |
| Delete | Tap **×** |
| Section color | Color swatch on **Account management** title |

Each game account is a **block** on the main screen with **Active** and **Finished** subsections.

---

## Edit task tags (details)

Tags represent task types, e.g. Idle, Event, Gathering.

| Action | How |
|--------|-----|
| Add tag | Enter name → **Add** |
| Sub-items | Expand tag card → enter → **+** |
| Rename | Tap underlined tag or sub-item name |
| Change color | Swatch on the right of the tag |
| Reorder | Drag tag or sub-item |
| Delete | **×** |
| Expand all | Button near tag section title (when collapsed) |

**Default tags (advanced)**

- **★ Save current tags as default**: Stores current tags as your personal default.  
- **↺ Restore default tags**: Reverts to your saved default (accounts and active timers unchanged; undo can revert this step).

---

## New timer (details)

### How time works

- **D/H/M/S** and shortcuts all update the same total seconds.  
- Large display is **h:m:s** (days roll into hours; 1 day shows as 24:00:00).  
- **Reset time** clears everything to zero.

### Flash warning

Format **m:s** (e.g. `0:30` = flash in last 30 seconds, `5:0` = last 5 minutes).

### After start

- When a timer hits zero you can immediately set the next one.  
- Multiple active timers per account are allowed.

### Clear finished

- **Clear finished timers**: Removes all timers that have ended.  
- The button is highlighted when finished items exist.  
- Use **↩ Undo** at bottom-right within the countdown window to restore.

---

## Timer cards on the main screen

Each card shows:

- **#Number** — Sequence within the account  
- **Character badge** — If a character was set  
- **Task name** — With sub-item: `Tag (sub-item)`  
- **Remaining time** — Large countdown  
- **End hint** — e.g. `3/15 (in 2 h)`  

**Finished** cards instead show:

- End time (month/day hour:minute)  
- Elapsed (e.g. `Elapsed 2 h`)  

---

## Undo

After deleting timers, clearing finished, removing accounts/tags, etc., **↩ Undo** appears at the bottom-right.

- Default window about **10 seconds** (adjust under **System & theme → System → Undo display** , 1–120 s).  
- Tap **↩** to undo; tap **×** on the toast to dismiss.  
- Multiple steps can be undone (shows “and N more”).

---

## System & theme

### System

| Feature | Description |
|---------|-------------|
| **☁ Cloud sync** | After sign-in, accounts, tags, and active timers sync to the cloud; same login on phone and desktop shares data. (Requires Supabase — see `DEPLOY.md`) |
| **Sync now** | Manually merge local and cloud, keeping the newer side |
| **Export backup** | Download JSON with all settings |
| **Import** | Restore from JSON (overwrites local settings — export first) |

### Theme

| Option | Description |
|--------|-------------|
| **Language** | 繁體中文 / 简体中文 / English |
| **Appearance** | Light, Dark, Auto (follow system) |
| **Neon glow (dark)** | Glow on cards and panel in dark/auto-dark (can turn off) |

---

## Mobile tips

| Situation | Action |
|-----------|--------|
| Open settings | Tap **Settings** on the account bar |
| Close settings | **‹ Collapse**, or tap dimmed main area |
| No timers yet | First visit may auto-open settings to create your first task |
| After start | Panel often closes so you can watch the countdown |

---

## FAQ

**Q: Nothing happens when I tap Start timer?**  
A: Duration must be greater than zero (not 00:00:00).

**Q: Why are ended timers still on screen?**  
A: They move to Finished automatically; use **Clear finished timers** or delete individually with **×**.

**Q: Deleted by mistake?**  
A: Check bottom-right for **↩ Undo** before the countdown expires.

**Q: Data missing on a new phone?**  
A: Without cloud sign-in, data stays in that browser only. **Export backup** or sign in to cloud sync on the same account.

**Q: Warning not flashing?**  
A: Check flash warning isn’t too short or `0:0`; timer must still be Active and not finished.

**Q: Dark mode too flashy?**  
A: **System & theme → Theme → Neon glow (dark) → Off**.

---

## Suggested daily workflow

1. **First time**: Create accounts → create common tags → *(optional)* save as default tags.  
2. **Each session**: Open settings → New timer → pick account/character/tag → set time → start.  
3. **After events**: Check main screen; **Clear finished** when you want a clean list.  
4. **Before switching devices**: **Export backup** or confirm cloud sign-in and sync.  

---

## Technical setup

- Local test: In the project folder run `python3 -m http.server 8765`, open `http://localhost:8765`.  
- Deploy & cloud: See `DEPLOY.md` and `AUTO_DEPLOY.md` in the repo.

---

Open this guide in the app from **System & theme → System → 📖 User guide**.
