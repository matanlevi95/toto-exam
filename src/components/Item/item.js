import Color from "../ClothingFilters/Color/color";
import Size from "../ClothingFilters/Size/size";

export default function Item({ item, handleSelectItem }) {
  return (
    <div key={item.id} className="item-card">
      <img src={item.imageUrl} alt={item.brand} className="item-image" />
      <h4 className="item-brand">{item.brand}</h4>
      <p className="item-info">
        Color: <Color color={item.color} />{" "}
        Size: <Size size={item.size} />
      </p>
      <button className="select-button" onClick={() => handleSelectItem(item)}>
        Select
      </button>
    </div>
  );
}
