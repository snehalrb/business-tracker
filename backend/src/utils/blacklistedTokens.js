const blackListedTokens = new set();

export const addToBlacklisted = (token) => {
  blackListedTokens.add(token);
};

export const isBlacklisted = (token) => {
  return blackListedTokens.has(token);
};
