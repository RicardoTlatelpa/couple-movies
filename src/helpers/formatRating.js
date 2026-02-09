/**
 * Rounds TMDB rating (0-10) to one decimal place for display.
 * Preserves accuracy: 7.34 → 7.3, 7.36 → 7.4
 */
export function formatRating(rating) {
  if (rating == null || rating === '' || isNaN(Number(rating))) {
    return '—';
  }
  const num = Number(rating);
  return (Math.round(num * 10) / 10).toFixed(1);
}
