import { useSelector, useDispatch } from "react-redux";
import "./savedClothing.css";
import { removeSetFromList } from "../../redux/clothingSetSlice";

export default function SavedClothing() {
  const savedSets = useSelector((state) => state.clothingSet.savedSets);
  const dispatch = useDispatch();
  const removeSet = (setId) => {
    dispatch(removeSetFromList({ setId }));
  };

  return (
    <div className="saved-clothing-container">
      <h2 className="title">Saved Clothing Sets</h2>

      {savedSets.length === 0 ? (
        <p className="no-results">No saved sets yet.</p>
      ) : (
        <div className="sets-grid">
          {savedSets.map((set, index) => (
            <div key={index} className="clothing-set-card">
              <h3>Set {index + 1}</h3>
              <p>Duration: {set.duration}</p>
              <div className="clothing-items">
                {["shirt", "pants", "shoes"].map((type) => (
                  <div key={type} className="clothing-item">
                    {set[type] && (
                      <>
                        <img
                          src={set[type].imageUrl}
                          alt={type}
                          className="item-icon"
                        />
                        <div className="item-details">
                          <p>
                            <strong>{type}</strong>
                          </p>
                          <p>Brand: {set[type].brand}</p>
                          <p>Color: {set[type].color}</p>
                          <p>Size: {set[type].size}</p>
                        </div>
                      </>
                    )}
                    {!set[type] && <p>Not selected</p>}
                  </div>
                ))}
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeSet(set.id)}
              >
                {" "}
                Remove{" "}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
