import { reactive, watch, computed } from 'vue'

export interface PlayerScore {
  // Trees (Wald)
  treeTask: number | null
  treeFlag: number | null

  // Grain (Getreide/Feld)
  grainTask: number | null
  grainFlag: number | null

  // Houses (Häuser)
  houseTask: number | null
  houseFlag: number | null

  // Rails (Schiene)
  railTask: number | null
  railFlag: number | null // Points for number of tiles/flags?
  railLongest: number | null // Bonus for longest track

  // Water (Wasser)
  waterTask: number | null
  waterFlag: number | null
  waterLongest: number | null // Bonus for longest river

  // Special
  hexagons: number | null // Enclosed areas (Gebiete)
  circus: number | null // Sonderplättchen

  // Modules
  moduleCup: number | null
  moduleStar: number | null
}

export interface Game {
  id: string
  date: number
  players: [PlayerScore, PlayerScore]
}

const STORAGE_KEY = 'dorfromantik-counter-games'

function createEmptyPlayer(): PlayerScore {
  return {
    treeTask: null,
    treeFlag: null,
    grainTask: null,
    grainFlag: null,
    houseTask: null,
    houseFlag: null,
    railTask: null,
    railFlag: null,
    railLongest: null,
    waterTask: null,
    waterFlag: null,
    waterLongest: null,
    hexagons: null,
    circus: null,
    moduleCup: null,
    moduleStar: null,
  }
}

export function createNewGame(): Game {
  return {
    id: crypto.randomUUID(),
    date: Date.now(),
    players: [createEmptyPlayer(), createEmptyPlayer()],
  }
}

// Global state
const state = reactive<{
  games: Game[]
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
    console.error('Failed to load games', e)
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

export function useGameStore() {
  const currentGame = computed(() => {
    if (!state.currentId) return null
    return state.games.find((g) => g.id === state.currentId) || null
  })

  function createGame() {
    const game = createNewGame()
    state.games.unshift(game)
    state.currentId = game.id
    return game
  }

  function loadGame(id: string) {
    state.currentId = id
  }

  function deleteGame(id: string) {
    const index = state.games.findIndex((g) => g.id === id)
    if (index !== -1) {
      state.games.splice(index, 1)
      if (state.currentId === id) {
        state.currentId = state.games[0]?.id || null
      }
    }
  }

  function resetCurrentGame() {
    const game = state.games.find((g) => g.id === state.currentId)
    if (game) {
      // Keep date and ID, just reset scores
      game.players = [createEmptyPlayer(), createEmptyPlayer()]
    }
  }

  // Helper to sum a player's score
  function calculateScore(p: PlayerScore) {
    const sum = (nums: (number | null)[]) => nums.reduce((a, b) => (a || 0) + (b || 0), 0) || 0

    // Column 1 (Tasks) - Main Game
    const subtotalTopCol1 = sum([
      p.treeTask,
      p.grainTask,
      p.houseTask,
      p.railTask,
      p.waterTask,
      p.hexagons,
      p.circus,
    ])

    // Column 2 (Flags/Longest) - Main Game
    const subtotalTopCol2 = sum([
      p.treeFlag,
      p.grainFlag,
      p.houseFlag,
      p.railLongest,
      p.waterLongest,
    ])

    // Column 1 (Modules)
    const subtotalModulesCol1 = sum([p.moduleCup])

    // Column 2 (Modules)
    const subtotalModulesCol2 = sum([p.moduleStar])

    // Calculated Totals
    const subtotalTop = subtotalTopCol1 + subtotalTopCol2
    const subtotalModules = subtotalModulesCol1 + subtotalModulesCol2

    return {
      subtotalTopCol1,
      subtotalTopCol2,
      subtotalModulesCol1,
      subtotalModulesCol2,
      subtotalTop,
      subtotalModules,
      total: subtotalTop + subtotalModules,
    }
  }

  return {
    state,
    currentGame,
    createGame,
    loadGame,
    deleteGame,
    resetCurrentGame,
    calculateScore,
  }
}
