# Dorfromantik Counter

## Architecture
- Vue 3 + TypeScript + Vite (rolldown-vite)
- Tailwind CSS v4 for styling
- Pinia-like reactive store pattern (custom, in `src/stores/game.ts`)
- vue-router installed but currently unused (routes: [])
- Components: ScoreBoard.vue, ScoreRow.vue, ScoreInput.vue, GameHistory.vue, Icon.vue
- LocalStorage for persistence

## Key Commands
- `npm run dev` — start dev server (http://localhost:5173)
- `npm run build` — type-check + build
- `npm run type-check` — vue-tsc type checking

## Code Standards
- Vue 3 `<script setup lang="ts">` SFC style
- Tailwind utility classes, no custom CSS (except scoped input styling)
- German UI text
- 2px gap grid layout pattern: `grid grid-cols-5 gap-[2px]`
- Color scheme: rose for player 1, blue for player 2, slate-600 for labels
