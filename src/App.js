import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { RestaurantProvider } from "./context/RestaurantContext";
const { Content, Header } = Layout;

function App() {
  return (
    <RestaurantProvider>
      <Layout
        className="App"
        style={{ minHeight: "100vh", textAlign: "center" }}
      >
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
    </RestaurantProvider>
  );
}

export default App;
