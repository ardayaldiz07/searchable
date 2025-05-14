export function renderResults(wrapper, results, mode) {
  wrapper.innerHTML = "";

  results.forEach(({ text, title }) => {
    const item = document.createElement("div");
    item.className = "bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200";

    if (mode === "titled" && title) {
      const h4 = document.createElement("h4");
      h4.className = "text-lg font-semibold mb-1 text-blue-700";
      h4.textContent = title;
      item.appendChild(h4);
    }

    const p = document.createElement("p");
    p.className = "text-gray-700 text-sm";
    p.textContent = text;
    item.appendChild(p);

    wrapper.appendChild(item);
  });
}
