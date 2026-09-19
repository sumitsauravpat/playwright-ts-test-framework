export function stripLegalPlaceholder(text: string) {
  const pieces = text.split("${LEGAL.");
  const cleanedPieces = pieces.slice(1).map((item) => item.slice(item.indexOf("}") + 1));

  return pieces[0] + cleanedPieces.join("");
}

export function formatCurrency(num: number) {
  return num % 1 === 0 ? String(num) : num.toFixed(2);
}
