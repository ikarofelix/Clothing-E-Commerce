import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./components/sign-in/sign-in.component";

const Search = () => {
  return (
    <div>
      <h1>You made a search bro</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Search />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
