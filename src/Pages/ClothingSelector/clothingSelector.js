import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Color from "../../components/ClothingFilters/Color/color";
import clothingData from "../../Data/data.json";
import "./clothingSelector.css";
import Size from "../../components/ClothingFilters/Size/size";
import Item from "../../components/Item/item";

export default function ClothingSelector() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const clothingType = location.state?.type || "shirt";

  useEffect(() => {
    const filtered = clothingData.filter((item) => item.type === clothingType);
    setItems(filtered);
    setFilteredItems(filtered);

    const uniqueColors = [...new Set(filtered.map((item) => item.color))];
    const uniqueSizes = [...new Set(filtered.map((item) => item.size))];

    setColors(uniqueColors);
    setSizes(uniqueSizes);
  }, [clothingType]);

  function handleColorSelect(color) {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    filterItems(newColor, selectedSize);
  }

  function handleSizeSelect(size) {
    const newSize = selectedSize === String(size) ? "" : String(size);
    setSelectedSize(newSize);
    filterItems(selectedColor, newSize);
  }

  function filterItems(color, size) {
    let filtered = items;
    if (color) {
      filtered = filtered.filter((item) => item.color === color);
    }
    if (size) {
      filtered = filtered.filter((item) => String(item.size) === String(size));
    }
    setFilteredItems(filtered);
  }

  function handleSelectItem(item) {
    console.log("Selected item:", item);

    if (clothingType === "shirt") {
      navigate("/clothing-selector", { state: { type: "pants" } });
    } else if (clothingType === "pants") {
      navigate("/clothing-selector", { state: { type: "shoes" } });
    } else {
      navigate("/");
    }
  }

  return (
    <div className="clothing-selector-container">
      <h2 className="title">Select {clothingType}</h2>

      <div className="filters">
        <div className="color-filter">
          {colors.map((color) => (
            <Color
              color={color}
              isSelected={selectedColor === color}
              handleColorSelect={handleColorSelect}
            />
          ))}
        </div>

        <div className="size-filter">
          {sizes.map((size) => (
            <Size
              size={size}
              isSelected={selectedSize === size}
              handleSizeSelect={handleSizeSelect}
            />
          ))}
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <Item item={item} handleSelectItem={handleSelectItem}/>
        ))}
      </div>
    </div>
  );
}
