export default function Color({ color, isSelected, handleColorSelect }) {
  return (
    <button
      key={color}
      className={`color-circle ${isSelected ? "selected" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => handleColorSelect && handleColorSelect(color)}
    />
  );
}
