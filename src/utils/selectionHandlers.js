import { saveCurrentSet, addItemToSet } from "../redux/clothingSetSlice";
import {
  setRecommendations,
  resetRecommendations,
} from "../redux/recommendationsSlice";
import {
  suggestPantsSizeFromShirt,
  suggestPantsSizeFromShoes,
  suggestShirtSizeFromPants,
  suggestShirtSizeFromShoes,
  suggestShoesSizeFromPants,
  suggestShoesSizeFromShirt,
} from "./sizeMatcher";
import { suggestMatchingColors } from "./colorMatcher";
import { toast } from "react-toastify";

export function handleSelectItem({ item, currentSet, dispatch, navigate }) {
  dispatch(addItemToSet({ item }));

  const updatedSet = { ...currentSet, [item.type]: item };

  const isShirtSelected = !!updatedSet.shirt;
  const isPantsSelected = !!updatedSet.pants;
  const isShoesSelected = !!updatedSet.shoes;

  if (isShirtSelected && isPantsSelected && isShoesSelected) {
    dispatch(saveCurrentSet());
    dispatch(resetRecommendations());

    toast.success("The set added successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    navigate("/");
  } else {
    let nextType;
    if (!isShirtSelected) nextType = "shirt";
    else if (!isPantsSelected) nextType = "pants";
    else if (!isShoesSelected) nextType = "shoes";

    let recommendedSizes = [];
    let recommendedColors = suggestMatchingColors(item.color);

    if (nextType === "pants") {
      if (updatedSet.shirt) {
        recommendedSizes = suggestPantsSizeFromShirt(updatedSet.shirt.size);
      } else if (updatedSet.shoes) {
        recommendedSizes = suggestPantsSizeFromShoes(updatedSet.shoes.size);
      }
    } else if (nextType === "shoes") {
      if (updatedSet.shirt) {
        recommendedSizes = suggestShoesSizeFromShirt(updatedSet.shirt.size);
      } else if (updatedSet.pants) {
        recommendedSizes = suggestShoesSizeFromPants(updatedSet.pants.size);
      }
    } else if (nextType === "shirt") {
      if (updatedSet.pants) {
        recommendedSizes = suggestShirtSizeFromPants(updatedSet.pants.size);
      } else if (updatedSet.shoes) {
        recommendedSizes = suggestShirtSizeFromShoes(updatedSet.shoes.size);
      }
    }

    if (nextType === "shoes") {
      recommendedSizes = [];
    }

    dispatch(
      setRecommendations({
        recommendedSizes,
        recommendedColors,
      })
    );

    navigate("/clothing-selector", { state: { itemType: nextType } });
  }
}
