export function createSearchInput(customInput) {
  if (customInput instanceof HTMLElement && customInput.tagName === "INPUT") {
    return customInput;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Ara...";
  input.className = "w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return input;
}
