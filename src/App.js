import "./App.css";
import SideBar from "./components/SideBar/sideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // <-- notice Routes
import Home from "./Pages/Home/home";
import ClothingBuilder from "./Pages/ClothingBuilder/clothing-builder";
import ClothingSelector from "./Pages/ClothingSelector/clothingSelector";
import SavedClothing from "./Pages/SavedClothing/saved-clothing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothing-builder" element={<ClothingBuilder />} />
          <Route path="/clothing-selector" element={<ClothingSelector />} />
          <Route path="/saved-clothing" element={<SavedClothing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
