async function loadMIT() {
  const url =
    "https://ocw.mit.edu/api/v0/courses/?department=electrical-engineering-and-computer-science";

  const res = await fetch(url);
  const data = await res.json();

  const box = document.getElementById("mit");

  data.results.slice(0, 8).forEach(c => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${c.title}</h3>
      <p>Course: ${c.course_number}</p>
      <a href="https://ocw.mit.edu${c.url}" target="_blank">
        📄 Open Course (PDFs inside)
      </a>
      <hr>
    `;
    box.appendChild(div);
  });
}

loadMIT();
