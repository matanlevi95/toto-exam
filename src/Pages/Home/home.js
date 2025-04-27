import Counter from "../../components/Counter/counter";
import { useNavigate } from "react-router-dom";
import { GiConverseShoe, GiArmoredPants, GiClothes } from "react-icons/gi";
import { IoShirt } from "react-icons/io5";
import items from "../../Data/data.json";

export default function Home() {
  const navigate = useNavigate();

  const GoToSavedSets = () => {
    navigate("/saved-clothing");
  };

  const shoes = items.filter((item) => item.type == "shoes");
  const pants = items.filter((item) => item.type == "pants");
  const shirts = items.filter((item) => item.type == "shirt");

  return (
    <div>
      <div>
        <Counter
          endNumber={items.length}
          suffix="Saved Sets"
          Icon={GiClothes}
          onClick={GoToSavedSets}
        />
      </div>
      <div className="counter_clothingContainer">
        <Counter endNumber={shirts.length} suffix="Shirts" Icon={IoShirt} />
        <Counter
          endNumber={pants.length}
          suffix="Pants"
          Icon={GiArmoredPants}
        />
        <Counter
          endNumber={shoes.length}
          suffix="Shoes"
          Icon={GiConverseShoe}
        />
      </div>
    </div>
  );
}
