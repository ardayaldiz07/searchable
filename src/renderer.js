export function renderResults(wrapper, results, mode, highlightColor) {
  wrapper.innerHTML = "";

  results.forEach(({ element, text, title }) => {
    const item = document.createElement("div");
    item.className = `
      bg-white
      shadow
      rounded-xl
      p-4
      mb-4
      border
      border-gray-200
      hover:shadow-lg
      transition
      cursor-pointer
    `.replace(/\s+/g, ' ').trim();

    if (mode === "titled" && title) {
      const h4 = document.createElement("h4");
      h4.className = "text-lg font-semibold mb-2 text-blue-600";
      h4.textContent = title;
      item.appendChild(h4);
    }

    const p = document.createElement("p");
    p.className = "text-gray-700 text-sm";
    p.textContent = text;
    item.appendChild(p);

    const route = element.getAttribute("data-route");

    if (route) {
      // Başka sayfadan geldiyse, link haline getir
      item.addEventListener("click", () => {
        window.location.href = `${route}#${encodeURIComponent(title || text.slice(0, 30))}`;
      });
    } else {
      // Aynı sayfadaysa scroll ve highlight
      item.addEventListener("click", () => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const originalColor = element.style.color;
        element.classList.add("ring", "ring-opacity-40");
        element.style.transition = "color 0.5s ease";
        element.style.color = highlightColor;

        setTimeout(() => {
          element.classList.remove("ring", "ring-opacity-40");
          element.style.color = originalColor || "";
        }, 4000);
      });
    }

    wrapper.appendChild(item);
  });
}