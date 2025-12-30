const RSS_URL =
  "https://api.allorigins.win/raw?url=" +
  encodeURIComponent("https://www.open.edu/openlearn/science-maths-technology/rss.xml");

fetch(RSS_URL)
  .then(res => res.text())
  .then(xml => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const items = doc.querySelectorAll("item");
    const container = document.getElementById("courses");
    container.innerHTML = "";

    items.forEach((item, i) => {
      if (i >= 15) return; // limit
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      container.innerHTML += `
        <div class="course">
          <a href="${link}" target="_blank">${title}</a>
          <div class="source">Source: OpenLearn (Open University UK)</div>
        </div>
      `;
    });
  })
  .catch(err => {
    document.getElementById("courses").innerText =
      "Failed to load OpenLearn courses";
    console.error(err);
  });
