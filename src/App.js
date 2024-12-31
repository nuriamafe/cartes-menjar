import "./App.css";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import { CartProvider } from "./functions/CartContext";
import Cart from "./components/Cart";
const { Content, Header } = Layout;

function App() {
  return (
    <Layout className="App" style={{ minHeight: "100vh" }}>
      <Header style={{ height: 80, padding: 0 }}>
        <Navbar />
      </Header>
      <Content>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/restaurants/:restaurantName"
              element={<RestaurantPage />}
            />
            <Route
              path="/:restaurantName/:sectionId/items/:itemId"
              element={<ItemDetails />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </Content>
    </Layout>
  );
}

export default App;
