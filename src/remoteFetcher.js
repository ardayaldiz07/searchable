export async function fetchSearchablesFromRoutes(routes) {
  const parser = new DOMParser();
  const allSearchables = [];

  for (const route of routes) {
    try {
      const res = await fetch(route);
      const htmlText = await res.text();
      const doc = parser.parseFromString(htmlText, "text/html");
      const found = Array.from(doc.querySelectorAll(".searchable"));
      
      found.forEach((el) => {
        el.setAttribute("data-route", route);
      });

      allSearchables.push(...found);
    } catch (err) {
      console.warn(`"${route}" sayfası çekilemedi:`, err);
    }
  }
  return allSearchables;
}