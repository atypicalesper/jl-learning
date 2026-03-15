// Single source of truth for mock user data shared across pages.
// Replace with real API/data-fetching when the backend is ready.

export const USER_STATS = {
  streak: 14,
  words: 342,
  grammarPoints: 28,
  hoursWatched: 9.5,
  reviewsDue: 47,
} as const;

export const CURRENT_EPISODE = {
  show: "Demon Slayer",
  jp: "鬼滅の刃",
  epNumber: 5,
  epLabel: "EP 5",
  title: "Sabito and Makomo",
  emoji: "🗡️",
} as const;
