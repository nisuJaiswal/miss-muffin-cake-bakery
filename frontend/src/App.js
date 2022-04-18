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
import MyProfile from "./pages/MyProfile";

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
          <Route exact path="/myProfile" element={<MyProfile />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
