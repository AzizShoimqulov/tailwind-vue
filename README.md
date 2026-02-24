# Tailwind + Vue (minimal starter)

This is a minimal Vue 3 + Vite project pre-wired with Tailwind CSS.

Quick start

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
```

Notes
- Tailwind is configured in `tailwind.config.cjs` and imported in `src/assets/index.css`.
- `src/App.vue` contains a simple button to demonstrate interactivity and Tailwind styling.

Firebase usage
- The project initializes Firebase in `src/firebase.js` and attaches common services to the Vue app.
	You can access them inside components via `this.$firebase` or directly as `this.$db`, `this.$auth`, `this.$storage`, `this.$rtdb`.

Example (in a component):
```js
// inside a Vue <script setup> or options API method
const usersRef = this.$db.collection('users') // use firestore APIs normally
const user = this.$auth.currentUser
```
