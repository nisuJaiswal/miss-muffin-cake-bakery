import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import Navbar from "./components/Navbar";
import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { createBrowserHistory } from 'history';
export const customHistory = createBrowserHistory();
function App() {
  return (
    <>
      <Router history={customHistory}>
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
