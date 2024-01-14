const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    latitudeDelta: 0.09219913934698809,
    longitudeDelta: 0.05370184779164333,
  },
} as const;

export {numbers};
