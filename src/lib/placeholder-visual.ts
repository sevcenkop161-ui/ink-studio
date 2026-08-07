const GRADIENT_POSITIONS = [
  "top right",
  "bottom left",
  "top left",
  "bottom right",
] as const;

export function getPlaceholderGradient(index: number) {
  const position = GRADIENT_POSITIONS[index % GRADIENT_POSITIONS.length];
  return `radial-gradient(ellipse at ${position}, rgba(139,92,246,0.16), transparent 65%)`;
}
