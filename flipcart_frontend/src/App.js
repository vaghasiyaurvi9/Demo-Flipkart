import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from "./Components/Index";
import './App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import SingleProduct from "./Components/SingleProduct";
import ProductIndex from "./Admin/Index";
import AddCategory from "./Admin/AddCategory";
import ProductByCategory from "./Components/ProductByCategory";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import AddCartData from "./Components/AddCartData";
import ChangePassword from "./Components/ChangePassword";
import Bill from "./Components/Bill";
import Forgetpassword from "./Components/Forgetpassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchContext from "./Components/SearchContext";



function App() {
  return (
    <div className="App">
      <Routes>
      {/* <Route path="/" element={<Index />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/category/:name" element={<ProductByCategory />} />
        <Route path="/addproduct" element={<ProductIndex />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/addcartdata" element={<AddCartData />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/" element={<SearchContext />} />  

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
