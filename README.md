# Chris LaRocque mmhmm take home
[![Netlify Status](https://api.netlify.com/api/v1/badges/11b845a9-2463-4101-ac0a-30040f4b6acc/deploy-status)](https://app.netlify.com/sites/mmhmm-chrislarocque/deploys)

## Links
Live page: https://mmhmm-chrislarocque.netlify.app/<br>
Video overview: https://drive.google.com/file/d/1fM3UD5YBsb0Tyb9s-WgOGNc-OC35hDbY/view?usp=sharing

## Setup 
Standard `create-next-app` implementation. I'm using node v14.18.1. Should be able to `nvm use 14.18.1 && npm install && npm run dev` to see the page at `localhost:3000`.

## Directory structure
### /components
While not necessarily _ideal_, I put the API calls within the component whose state depended on them most closely for the sake of not passing getters + setters everywhere or having to veer too far outside the scope of the ask and start setting up context providers.

Components have an accompanying `COMPONENT_NAME.module.scss` file for their styles. 

#### BookShelf
*BookShelf.jsx*<br>
Main parent component for list and BookForm. Fetches the initial book list on page load and displays it.

*BookForm*<br>
The basic form + API call to add a book to the list.

#### Modal
Straight from w3schools.com and tweaked - https://www.w3schools.com/howto/howto_css_modals.asp.

#### Spinner
Initially was expecting to call this several places but currently just for loading state for deleting a book.

### /pages
#### _app.js
Boilerplate next wrapper for app, calls `global.scss`.
#### index.js
Boilerplate next wrapper for homepage, calls the `<Bookshelf />` component.

### /public
SVGs and favicons

### /styles
#### breakpoints.scss
Phone and tablet max-width mixins used in component `.module.scss` files.
#### globals.scss
Boilerplate from next plus 2 small helpers for `section` elements and their children.

### next.config.js
Only change here was accounting for the picsum.photos host when using `next/image`.

