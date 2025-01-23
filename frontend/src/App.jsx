import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from "./components/NavBar"
import Login from "./components/Login"
import {Provider} from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Body from "./Body"
import Profile from "./components/Profile"

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
  