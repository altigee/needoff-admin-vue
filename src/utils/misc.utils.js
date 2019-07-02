export function colorFromWorkspaceId(id) {
  const GOLDEN_RATIO = 0.618033988749895;
  const hue = ((id / 20 + GOLDEN_RATIO) % 1) * 360 * (id % 2 ? -0.5 : 1.5);
  const color = `hsl(${hue}, 70%, 80%)`;
  return color;
}
