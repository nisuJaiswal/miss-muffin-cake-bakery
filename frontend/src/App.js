import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from './store'

// import Navbar from "./components/Navbar";
import Index from "./pages/Index"
import Login from "./pages/Login"
import EditProfile from "./pages/EditProfile";
import MyProfile from "./pages/MyProfile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      {/* history={createBrowserHistory} */}
      <Router >
        {/* <Navbar /> */}
        <Routes>
          {/* <Route exact path="/" component={Index} /> */}
          <Route exact path="/" element={<Index />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/editProfile" element={<EditProfile />} />
          <Route exact path="/myProfile" element={<MyProfile />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/cart" element={<Cart />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
