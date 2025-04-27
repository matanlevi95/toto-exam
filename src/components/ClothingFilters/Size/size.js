export default function Size({ size, isSelected, handleSizeSelect }) {
  return (
    <button
      key={size}
      className={`size-button ${isSelected ? "selected" : ""}`}
      onClick={() => handleSizeSelect && handleSizeSelect(size)}
    >
      {size}
    </button>
  );
}
