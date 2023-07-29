(function(){
  const tabs = document.querySelectorAll(".js-tabs");

  Array.from(tabs, tab => {
    const tabsLinks = tab.querySelectorAll(".js-tab-link");
    let currentTab = tab.querySelector(".js-tab-link.is-active");

    const toggleTab = (toggledTabLink = currentTab) => {
      currentTab = toggledTabLink || currentTab;
      toggledTabLink.classList.toggle("is-active");
      const toggledTabData = toggledTabLink.dataset.index;
      const toggledTabArea = tab.querySelector(`.js-tab-area[data-indexed=${toggledTabData}]`);
      toggledTabArea.classList.toggle("is-active")
    }
    if (!currentTab) {
      toggleTab(tabsLinks[0]);
    }

    tabsLinks.forEach(tabsLink => {
      tabsLink.addEventListener("click", function(event) {
        if (currentTab === this) {
          return;
        }

        if (currentTab) {
          toggleTab();
        }

        toggleTab(this)
      })
    })
  })
})();
