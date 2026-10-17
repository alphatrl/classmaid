<p align="center" style="background-color: #FAFAFA;">
    <img alt="smu-shortcut logo" src="./public/images/logo/icon-192x192-nobg.png" width="100px">
    <h1 align="center">Classmaid</h1>
</p>

<h4 align="center">
   Your digital campus guide for schools in Singapore. </br>
  This site is non-affiliated with any Singapore-based schools.
</h4>

---

<p align="center">
  <img alt="smu-shortcut promotion-image" src="./promotion/promo-image.png">
</p>

---

## 💻 Try it

Visit [Classmaid.sg](https://www.classmaid.sg)

## 🤩 Features

- Bookmarks of commonly-used websites used by schools
- View upcoming school events
- View current school term event

## 🛠 Develop

Run the following commands:

```bash
# Clone the repo
git clone https://github.com/alphatrl/classmaid.git && cd classmaid

# Install dependencies
pnpm install

# Copy the env.example files
cp .env.example .env

# Run the app (Development)
pnpm dev

# Run the app (Production)
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 💾 Data

The data used by SMU-Shortcuts is stored in [smu-scraper](https://github.com/foldaway/smu-scraper)

## Content

Public content lives in JSON in this repo; private links (the School Guides, formerly on Taskade) live in a private Google Sheet so that monetised links never enter the codebase. Both are served through `/api/content`:

| Route                                 | Response                                                           |
| ------------------------------------- | ------------------------------------------------------------------ |
| `GET /api/content/schools`            | Enabled schools (profile only)                                     |
| `GET /api/content/site`               | Global links and meta from `data/site.json`                        |
| `GET /api/content/[school]/all`       | School profile, bookmarks, guides, `guidesStatus`, links and meta  |
| `GET /api/content/[school]/config`    | School profile (SSO domain, LMS, calendar keys, colours, features) |
| `GET /api/content/[school]/bookmarks` | Bookmark sections                                                  |
| `GET /api/content/[school]/guides`    | `{ guides, guidesStatus }` from the guides sheet                   |
| `GET /api/content/[school]/links`     | Global links merged with the school's                              |
| `GET /api/content/[school]/meta`      | Global meta, then the school's, then the guides sheet `meta` rows  |
| `POST /api/content/revalidate`        | Clears and reloads the guides cache                                |

### Public config (JSON)

- `data/schools/<slug>.json`: one file per school, validated by `data/schools/school.schema.json` (editors pick it up through `"$schema"`). Holds the profile (`slug`, `name`, `shortName`, `enabled`, `sso.domain`, `lms`, `calendar` keys, `colors.accent`, `features`), `bookmarks` (sections of `{ id, title, icon, color, type, link?, description? }`, with Lucide icon names from [lucide.dev](https://lucide.dev/icons) and `type` `url`, `internal` or `guides`), and school `links` and `meta`. Colours must be branding-neutral, never the school's trademark colours.
- `data/site.json`: global `links` and `meta`.

The JSON is bundled at build time and validated on load and by `pnpm test`; an invalid file fails the build. Changes ship with a deploy.

**Adding a school:** create `data/schools/<slug>.json` (the file name must equal `slug`), register it in `src/lib/content/schools.ts`, and optionally add a `<slug>` tab to the guides sheet.

### Private guides (Google Sheets)

One spreadsheet (`SHEET_ID_GUIDES`):

- One tab per school slug: `group, group_icon, category, category_icon, title, link, description, enabled`. Row order is display order; `category` may be blank; `enabled` accepts TRUE/FALSE (blank means TRUE); icons are Lucide names.
- Optional `meta` tab: `school, key, value` (blank school applies to every school), e.g. `smu, guides_note, <text>`.
- Tabs starting with `_` are ignored.

Setup:

1. Create a GCP project and enable the Google Sheets API.
2. Create a service account and a JSON key.
3. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` (base64 of the PEM private key, e.g. `jq -r .private_key key.json | base64`).
4. Share the spreadsheet with the service account email as Viewer and set `SHEET_ID_GUIDES` (the part of the sheet URL between `/d/` and `/edit`).
5. Set `CONTENT_REVALIDATE_SECRET`.

The sheet is cached in memory for 5 minutes and responses at the CDN (`s-maxage`). If the sheet is unreachable the last good data is served; with nothing cached, or without credentials, `guides` is empty and `guidesStatus` is `unavailable`. There is deliberately no bundled copy of the guides.

After editing the sheet, revalidate instead of waiting for the cache:

```bash
curl -X POST -H "x-revalidate-secret: $CONTENT_REVALIDATE_SECRET" "https://<host>/api/content/revalidate"
```

This clears the cache on the instance that receives the request; the CDN may serve the previous response for up to 5 minutes.

## 🙋 Contribute

If you found a bug, or if you have an idea for this app, please [file an issue here](https://github.com/alphatrl/classmaid/issues). We appreciate your feedbacks and inputs.

## 📜 License

MIT License. See [LICENSE](./LICENSE) file for more information.

## ⭐️ Credits

Created by [Amos](http://github.com/alphatrl)

A huge thanks to the following contributors for their amazing work:

[![Duncan Leo](https://avatars3.githubusercontent.com/u/7417870?s=80&v=4)](https://github.com/duncanleo)
[![Chester How](https://avatars3.githubusercontent.com/u/9312956?s=80&v=4)](https://github.com/chesterhow)
