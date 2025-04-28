const RECOMMENDATIONS_KEY = "recommendations";

export function saveRecommendations(recommendations) {
  localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(recommendations));
}

export function loadRecommendations() {
  const saved = localStorage.getItem(RECOMMENDATIONS_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function clearRecommendations() {
  localStorage.removeItem(RECOMMENDATIONS_KEY);
}
