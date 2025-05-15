import { renderResults } from "./Renderer.js";
import { normalizeText } from "./Utils.js";
import { createSearchInput } from "./inputCreate.js";
import { fetchSearchablesFromRoutes } from "./remoteFetcher.js";

export default class SearchEngine {
  constructor(options) {
    this.container = options.container;
    this.mode = options.mode || "list";
    this.routes = options.routes || [];
    this.searchables = [];
    this.customInput = options.customInput || null;
    this.compact = options.compact ?? false;
    this.highlightColor = options.highlightColor || "#1D4ED8"; //Tailwind blue-700
  }

  async mount() {

    if (this.compact) {
      //this.createCompactSearch();
    } else {
      this.input = createSearchInput(this.customInput);
      this.resultsWrapper = document.createElement("div");

      // Check custom inp
      if (!this.customInput) {
        this.container.appendChild(this.input);
      }

      this.container.appendChild(this.resultsWrapper);

      this.input.addEventListener("input", (e) => this.search(e.target.value));

      const currentPageItems = Array.from(document.querySelectorAll(".searchable"));
      this.searchables.push(...currentPageItems);

      const remoteItems = await fetchSearchablesFromRoutes(this.routes);
      this.searchables.push(...remoteItems);
    }

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

    if(query.length == 0){
      this.resultsWrapper.innerHTML = "";
      return;
    }

    renderResults(this.resultsWrapper, results, this.mode, this.highlightColor);
  }
}