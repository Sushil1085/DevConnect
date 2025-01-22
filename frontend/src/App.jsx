import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from "./NavBar"
import Login from "./Login"

function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<h1>Login Page</h1>} /> */}
      </Routes>
    </BrowserRouter>
   {/* <Navbar /> */}
    </>
  )
}

export default App;
  