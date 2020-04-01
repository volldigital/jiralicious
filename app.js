(function() {
  var jiraContainer = document.getElementById('ghx-content-group');
  var jiraGroups = Array.from(jiraContainer.children);
  var jiraStats = jiraGroups.map(group => {
    let groupName = group.querySelector('.ghx-name').textContent;
    let badges = Array.from(
      group.querySelectorAll('.aui-badge.ghx-statistic-badge')
    );
    let badgesWithPoints = badges
      .filter(b => !!parseInt(b.textContent))
      .map(b => parseInt(b.textContent));
    let badgesWithoutPoints = badges.filter(b => !parseInt(b.textContent));
    let storypoints = getSum(badgesWithPoints);

    return {
      Name: groupName,
      Storypunkte: storypoints,
      Tickets: badges.length,
      Tickets_mit_Punkten: badgesWithPoints.length,
      Tickets_ohne_Punkte: badgesWithoutPoints.length
    };
  });

  function getSum(points = []) {
    return points.reduce((n, i) => n + i, 0);
  }

  // console.table(jiraStats);

  return jiraStats;
})();

/* var badgeMutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});

// Stops the MutationObserver from listening for changes.
mutationObserver.disconnect(); */
