import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import Navbar from "./components/Navbar";
import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import { createBrowserHistory } from 'history';
// import history from "./util/history"
// import history from './history'
function App() {
  return (
    <>
      {/* history={createBrowserHistory} */}
      <Router >
        <Navbar />
        <Routes>
          {/* <Route exact path="/" component={Index} /> */}
          <Route exact path="/" element={<Index />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
