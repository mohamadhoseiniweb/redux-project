import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommonLayout from "../src/layouts/CommonLayout";
import HomePage from "../src/pages/Home";
import ProductsProvider from "./contexts/products";
function App() {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
