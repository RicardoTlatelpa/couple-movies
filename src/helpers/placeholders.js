/**
 * Dark-themed placeholder images that match the site's premium streaming aesthetic.
 * Uses inline SVG data URIs - no external dependencies, always available.
 */

// Poster placeholder (2:3 aspect) - dark gradient with subtle film icon
const posterPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%231a1a1a'/%3E%3Crect x='50' y='50' width='400' height='650' fill='%230f0f0f' rx='8'/%3E%3Cpath d='M200 350 L300 350 M250 300 L250 400' stroke='%23333' stroke-width='2' opacity='0.5'/%3E%3Ccircle cx='250' cy='375' r='40' fill='none' stroke='%23444' stroke-width='1' opacity='0.4'/%3E%3C/svg%3E";

// Profile/avatar placeholder
const profilePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='342' height='342' viewBox='0 0 342 342'%3E%3Crect width='342' height='342' fill='%231a1a1a'/%3E%3Ccircle cx='171' cy='120' r='55' fill='%23222'/%3E%3Cellipse cx='171' cy='280' rx='90' ry='60' fill='%23222'/%3E%3C/svg%3E";

// Backdrop placeholder
const backdropPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23141414'/%3E%3Cpath d='M960 440 L1040 490 L1040 390 Z M880 490 L1040 490 L1040 390 L880 440 Z' fill='%23222' opacity='0.3'/%3E%3Ccircle cx='960' cy='540' r='80' fill='none' stroke='%23333' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E";

export const PLACEHOLDERS = {
  poster: posterPlaceholder,
  profile: profilePlaceholder,
  backdrop: backdropPlaceholder,
};

export function getPosterUrl(path, size = 'w500') {
  if (!path) return PLACEHOLDERS.poster;
  const baseUrl = 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path.startsWith('/') ? path : '/' + path}`;
}

export function getProfileUrl(path, size = 'w342') {
  const baseUrl = 'https://image.tmdb.org/t/p';
  return path ? `${baseUrl}/${size}${path}` : PLACEHOLDERS.profile;
}

export function getBackdropUrl(path) {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  return path ? `${baseUrl}${path}` : PLACEHOLDERS.backdrop;
}
