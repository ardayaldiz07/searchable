export function createSearchInput(customInput) {
  if (customInput instanceof HTMLElement && customInput.tagName === "INPUT") {
    return customInput;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Ürün, başlık veya açıklama ara...";
  input.className = `
    w-full
    px-4
    py-2
    mb-6
    border
    border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition
    duration-200
    text-sm
    placeholder-gray-400
  `.replace(/\s+/g, ' ').trim();

  return input;
}
