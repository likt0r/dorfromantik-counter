import { reactive, watch, computed } from 'vue'

export interface WingspanPlayerScore {
  // Punkte auf Vogelkarten
  birds: number | null

  // Bonuskarten-Punkte
  bonusCards: number | null

  // Rundenziele-Punkte
  roundGoals: number | null

  // Eier (je 1 Punkt)
  eggs: number | null

  // Futter auf Karten (je 1 Punkt)
  foodOnCards: number | null

  // Unterlegte Karten Punkte
  tuckedCards: number | null

  // Nectar-Punkte (Oceania-Expansion)
  nectar: number | null
}

export interface WingspanGame {
  id: string
  date: number
  players: [WingspanPlayerScore, WingspanPlayerScore]
}

const STORAGE_KEY = 'wingspan-duel-games'

function createEmptyPlayer(): WingspanPlayerScore {
  return {
    birds: null,
    bonusCards: null,
    roundGoals: null,
    eggs: null,
    foodOnCards: null,
    tuckedCards: null,
    nectar: null,
  }
}

export function createNewWingspanGame(): WingspanGame {
  return {
    id: crypto.randomUUID(),
    date: Date.now(),
    players: [createEmptyPlayer(), createEmptyPlayer()],
  }
}

// Global state
const state = reactive<{
  games: WingspanGame[]
  currentId: string | null
}>({
  games: [],
  currentId: null,
})

// Load from storage
const saved = localStorage.getItem(STORAGE_KEY)
if (saved) {
  try {
    state.games = JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load wingspan games', e)
  }
}

// Auto-save
watch(
  () => state.games,
  (games) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  },
  { deep: true },
)

export function useWingspanStore() {
  const currentGame = computed(() => {
    if (!state.currentId) return null
    return state.games.find((g) => g.id === state.currentId) || null
  })

  function createWingspanGame() {
    const game = createNewWingspanGame()
    state.games.unshift(game)
    state.currentId = game.id
    return game
  }

  function loadWingspanGame(id: string) {
    state.currentId = id
  }

  function deleteWingspanGame(id: string) {
    const index = state.games.findIndex((g) => g.id === id)
    if (index !== -1) {
      state.games.splice(index, 1)
      if (state.currentId === id) {
        state.currentId = state.games[0]?.id || null
      }
    }
  }

  function resetCurrentWingspanGame() {
    const game = state.games.find((g) => g.id === state.currentId)
    if (game) {
      // Keep date and ID, just reset scores
      game.players = [createEmptyPlayer(), createEmptyPlayer()]
    }
  }

  // Helper to sum a player's score across all categories
  function calculateWingspanScore(p: WingspanPlayerScore) {
    const sum = (nums: (number | null)[]) => nums.reduce((a, b) => (a || 0) + (b || 0), 0) || 0

    const birds = sum([p.birds])
    const bonusCards = sum([p.bonusCards])
    const roundGoals = sum([p.roundGoals])
    const eggs = sum([p.eggs])
    const foodOnCards = sum([p.foodOnCards])
    const tuckedCards = sum([p.tuckedCards])
    const nectar = sum([p.nectar])

    return {
      birds,
      bonusCards,
      roundGoals,
      eggs,
      foodOnCards,
      tuckedCards,
      nectar,
      total: birds + bonusCards + roundGoals + eggs + foodOnCards + tuckedCards + nectar,
    }
  }

  return {
    state,
    currentGame,
    createWingspanGame,
    loadWingspanGame,
    deleteWingspanGame,
    resetCurrentWingspanGame,
    calculateWingspanScore,
  }
}
