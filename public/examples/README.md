# Drasard restaurant concept websites

Four static websites. No build step, no dependencies. Fonts load from Google Fonts.

| Folder | Site | Type |
|---|---|---|
| nova/ | Nova Café | Multi-page: ordering, cart, demo checkout, reservations |
| aurelia/ | Aurelia | Multi-page: experiences, gift certificates, demo payment, reservations |
| north-table/ | North Table | Single page |
| ember/ | Ember | Single page |
| index.html | Hub page linking all four | |

## Add them to your Vercel project
Vite/React project: copy these folders (without _source) into `public/demos/`.
They will be live at `/demos/nova/`, `/demos/aurelia/`, `/demos/north-table/`, `/demos/ember/`.
If your vercel.json rewrites every path to index.html, add a rule above it so these folders are served as files.

## Replace the photo placeholders
Every image is a tonal placeholder. To use a real photo, save it as `assets/img/<name>.jpg`
inside the site folder. The `<name>` is the `data-n` attribute on the image block
(for example `hero`, `bun`, `toast`, `g1`). It is picked up automatically, no code change needed.

## Edit Nova and Aurelia content
Their pages are generated from `_source/build_nova.py` and `_source/build_aurelia.py`
(menu items, prices, copy). Edit, then run `python3 _source/build_nova.py`.
Keep `_source` out of `public/`.

## Demo payments
Checkout in Nova and Aurelia is visual only. There is no payment provider, no network request,
and the card fields are never stored or sent anywhere. The forms do not send email either.
