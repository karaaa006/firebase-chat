export function scrollBottom(elem) {
  const element = document.querySelector(elem);
  element.scroll({ top: element.scrollHeight, behavior: "smooth" });
}
