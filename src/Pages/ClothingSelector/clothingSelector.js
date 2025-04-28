import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../components/ClothingFilters/Color/color";
import Size from "../../components/ClothingFilters/Size/size";
import Item from "../../components/Item/item";
import clothingData from "../../data/data.json";
import { filterItems } from "../../utils/filterHandlers";
import { handleSelectItem } from "../../utils/selectionHandlers";
import { startNewSet } from "../../redux/clothingSetSlice";
import "./clothingSelector.css";

const ClothingSelector = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const clothingType = location.state?.itemType || "shirt";

  const currentSet = useSelector((state) => state.clothingSet.currentSet);
  const { recommendedSizes, recommendedColors } = useSelector(
    (state) => state.recommendations
  );

  useEffect(() => {
    const filtered = clothingData.filter((item) => item.type === clothingType);
    setItems(filtered);
    setSelectedColor("");
    setSelectedSize("");

    if (!currentSet.shirt && !currentSet.pants && !currentSet.shoes) {
      dispatch(startNewSet());
    }
  }, [clothingType, dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      filterAndSetItems(selectedColor, selectedSize);
    }
  }, [items, recommendedColors, recommendedSizes]);

  const filterAndSetItems = (color, size) => {
    let filtered = filterItems({
      items,
      clothingType,
      recommendedColors,
      recommendedSizes: clothingType === "shoes" ? [] : recommendedSizes,
      color,
      size,
    });

    if (filtered.length === 0) {
      filtered = items;
    }

    setFilteredItems(filtered);
  };

  const handleColorSelect = (color) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    filterAndSetItems(newColor, selectedSize);
  };

  const handleSizeSelect = (size) => {
    const newSize = selectedSize === size ? "" : size;
    setSelectedSize(newSize);
    filterAndSetItems(selectedColor, newSize);
  };

  const handleSelect = (item) => {
    handleSelectItem({ item, currentSet, dispatch, navigate });
  };

  const showingAllItems = filteredItems.length === items.length;

  const availableColorsInItems = useMemo(
    () => [...new Set(filteredItems.map((item) => item.color))],
    [filteredItems]
  );

  const availableSizesInItems = useMemo(
    () => [...new Set(filteredItems.map((item) => String(item.size)))],
    [filteredItems]
  );

  const displayedColors =
    recommendedColors.length > 0 && !showingAllItems
      ? availableColorsInItems.filter((color) =>
          recommendedColors.includes(color)
        )
      : availableColorsInItems;

  const displayedSizes =
    recommendedSizes.length > 0 && clothingType !== "shoes" && !showingAllItems
      ? availableSizesInItems.filter((size) =>
          recommendedSizes.includes(String(size))
        )
      : availableSizesInItems;

  return (
    <div className="clothing-selector-container">
      <h2 className="title">Select {clothingType}</h2>

      <div className="filters">
        <div className="color-filter">
          {displayedColors.map((color) => (
            <Color
              key={color}
              color={color}
              isSelected={selectedColor === color}
              isRecommended={recommendedColors.includes(color)}
              handleColorSelect={handleColorSelect}
            />
          ))}
        </div>

        <div className="size-filter">
          {displayedSizes.map((size) => (
            <Size
              key={size}
              size={size}
              isSelected={selectedSize === size}
              isRecommended={recommendedSizes.includes(String(size))}
              handleSizeSelect={handleSizeSelect}
            />
          ))}
        </div>
      </div>

      {!showingAllItems && filteredItems.length === items.length && (
        <div className="info-message">
          No perfect matches found. Showing all available items.
        </div>
      )}

      <div className="items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Item key={item.id} item={item} handleSelectItem={handleSelect} />
          ))
        ) : (
          <div className="no-results">No matching items found 😢</div>
        )}
      </div>
    </div>
  );
};

export default ClothingSelector;
