const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
  INITIAL_DELTA: {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  MIN_CANLENDAR_YEAR: 1980,
  MAX_CANLENDAR_YEAR: 2099,
  CALENDER_YEAR_SELECTOR_COLUMN: 4,
} as const;

export {numbers};
