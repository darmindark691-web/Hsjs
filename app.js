async function loadUniversityData() {
  const url =
    "https://repository.iitd.ac.in/oai/request?verb=ListRecords&metadataPrefix=oai_dc";

  const res = await fetch(url);
  const xmlText = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const records = xml.getElementsByTagName("record");
  const list = document.getElementById("list");

  for (let i = 0; i < Math.min(records.length, 10); i++) {
    const title =
      records[i].getElementsByTagName("dc:title")[0]?.textContent || "No title";

    const creator =
      records[i].getElementsByTagName("dc:creator")[0]?.textContent || "Unknown";

    const li = document.createElement("li");
    li.innerHTML = `<b>${title}</b><br><small>${creator}</small>`;
    list.appendChild(li);
  }
}

loadUniversityData();
