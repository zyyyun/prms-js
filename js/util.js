export function toShow(node) {
  node.className = node.className.replace("v-none", "v-show");
}

export function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}

export function validatePrice(currentFunds, currentAmount) {
  const result = currentFunds - currentAmount >= 0;
  return result;
}

export function validateRequired({ category, description, price }) {
  const result = Boolean(category) && Boolean(description) && price > 0;
  return result;
}
