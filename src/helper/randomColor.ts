export const randomColor = (a: number = 1) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;

  return color;
};
