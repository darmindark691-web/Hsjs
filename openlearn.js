const OPENLEARN_RSS =
  "https://r.jina.ai/http://www.open.edu/openlearn/science-maths-technology/rss.xml";

fetch(OPENLEARN_RSS)
  .then(res => res.text())
  .then(text => {
    const container = document.getElementById("courses");
    container.innerHTML = "";

    // RSS item blocks
    const items = text.split("<item>").slice(1);

    items.slice(0, 15).forEach(item => {
      const title =
        item.match(/<title>(.*?)<\/title>/)?.[1] || "Untitled";
      const link =
        item.match(/<link>(.*?)<\/link>/)?.[1] || "#";

      const div = document.createElement("div");
      div.className = "course";
      div.innerHTML = `
        <a href="${link}" target="_blank">${title}</a>
        <div class="source">Source: OpenLearn (Open University UK)</div>
      `;
      container.appendChild(div);
    });

    if (container.innerHTML === "") {
      container.innerText = "No courses found";
    }
  })
  .catch(err => {
    document.getElementById("courses").innerText =
      "Failed to load OpenLearn courses";
    console.error(err);
  });
