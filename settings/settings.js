function parseSections(text) {
  if (!text.includes("/")) {
    return ["uncategorized", text]; // Return the original text if no slashes found
  }

  const parts = text.split("/");
  const result = [];

  let currentPath = "";
  const n = parts.length;
  for (let i = 0; i < n - 1; i++) {
    currentPath = currentPath ? currentPath + "/" + parts[i] : parts[i];
    result.push(currentPath);
  }
  result.push(parts[n - 1]);
  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  const linkContainer = document.getElementById("links-container");
  function createSection(name) {
    const section = document.createElement("div");
    section.classList.add("section");

    const title = document.createElement("h2");
    title.textContent = name;
    linkContainer.appendChild(title);

    linkContainer.appendChild(section);
    return section;
  }
  function createLinkCard(orig_url, go_link, container) {
    const card = document.createElement("div");
    card.classList.add("link-card");

    const icon = document.createElement("span");
    icon.classList.add("link-icon");
    icon.textContent = "🔗";
    card.appendChild(icon);

    const text = document.createElement("span");
    text.textContent = go_link;
    card.appendChild(text);

    container.appendChild(card);
  }
  chrome.storage.local.get("urls", (data) => {
    urls = data.urls || {};
    let sections = new Map();
    for (const go_url in urls) {
      const category = parseSections(go_url);
      const long_link = urls[go_url];
      if (!sections.has(category[0])) {
        sections.set(category[0], createSection(category[0]));
      }
      let section = sections.get(category[0]);
      createLinkCard(long_link, category[1], section);
    }
  });
});
