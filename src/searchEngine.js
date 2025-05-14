import { renderResults } from "./Renderer.js";
import { normalizeText } from "./Utils.js";

export default class SearchEngine {
  constructor(options) {
    this.container = options.container;
    this.mode = options.mode || "list";
    this.searchables = Array.from(document.querySelectorAll(".searchable"));
  }

  mount() {
    // input
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Ara...";
    this.input.className = "w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    // results wrapper
    this.resultsWrapper = document.createElement("div");

    this.container.appendChild(this.input);
    this.container.appendChild(this.resultsWrapper);

    this.input.addEventListener("input", (e) => this.search(e.target.value));
    this.container.className="p-16 m-auto"
  }

  search(query) {
    const q = normalizeText(query);
    const results = [];

    this.searchables.forEach((el) => {
      const text = normalizeText(el.textContent);
      const title = el.getAttribute("data-title");

      if (text.includes(q)) {
        results.push({
          element: el,
          text: el.textContent,
          title: title || null,
        });
      }
    });

    renderResults(this.resultsWrapper, results, this.mode);
  }
}
