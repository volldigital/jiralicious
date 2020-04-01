(function() {
  if (window.jiraliciousConfig) {
    // toggle background color
    let bgColor =
      jiraliciousConfig.originalColor === document.body.style.backgroundColor
        ? jiraliciousConfig.color
        : jiraliciousConfig.originalColor;
    document.body.style.backgroundColor = bgColor;
  }
})();
