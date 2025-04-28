import "./App.css";
import SideBar from "./components/SideBar/sideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // <-- notice Routes
import Home from "./pages/Home/home";
import ClothingSelector from "./pages/ClothingSelector/clothingSelector";
import SavedClothing from "./pages/SavedClothing/saved-clothing";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentSetFromLocalStorage } from "./redux/clothingSetSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentSetFromLocalStorage());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothing-selector" element={<ClothingSelector />} />
          <Route path="/saved-clothing" element={<SavedClothing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
