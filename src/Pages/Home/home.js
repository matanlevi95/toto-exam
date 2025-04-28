import Counter from "../../components/Counter/counter";
import { useNavigate } from "react-router-dom";
import { GiConverseShoe, GiArmoredPants, GiClothes } from "react-icons/gi";
import { IoShirt } from "react-icons/io5";
import items from "../../data/data.json";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const savedSets = useSelector((state) => state.clothingSet.savedSets);

  const GoToSavedSets = () => {
    navigate("/saved-clothing");
  };

  const GoToClothingBuilder = (itemType) => {
    navigate("/clothing-selector", { state: { itemType } });
  };

  const shoes = items.filter((item) => item.type == "shoes");
  const pants = items.filter((item) => item.type == "pants");
  const shirts = items.filter((item) => item.type == "shirt");

  return (
    <div>
      <div>
        <Counter
          endNumber={savedSets.length}
          suffix="Saved Sets"
          Icon={GiClothes}
          onClick={GoToSavedSets}
        />
      </div>
      <div className="counter_clothingContainer">
        <Counter
          endNumber={shirts.length}
          suffix="Shirts"
          Icon={IoShirt}
          onClick={() => GoToClothingBuilder("shirt")}
        />
        <Counter
          endNumber={pants.length}
          suffix="Pants"
          Icon={GiArmoredPants}
          onClick={() => GoToClothingBuilder("pants")}
        />
        <Counter
          endNumber={shoes.length}
          suffix="Shoes"
          Icon={GiConverseShoe}
          onClick={() => GoToClothingBuilder("shoes")}
        />
      </div>
    </div>
  );
}
