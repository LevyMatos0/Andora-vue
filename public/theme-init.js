// Runs before the page styles so a saved theme does not flash the opposite theme.
(function () {
  var theme;
  try { theme = localStorage.getItem('andora_theme'); } catch (_) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = typeof matchMedia === 'function' && !matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
