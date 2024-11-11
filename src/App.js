import "./App.css";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
const { Content, Header } = Layout;

function App() {
  return (
    <Layout className="App" style={{ minHeight: "100vh" }}>
      <Header style={{ height: 80 }}>
        <Navbar />
      </Header>
      <Content>
        <Routes>
          <Route path="/cartes-menjar" element={<HomePage />} />
          <Route
            path="/restaurants/:restaurantName"
            element={<RestaurantPage />}
          />
          <Route
            path="/:restaurantName/:sectionId/items/:itemId"
            element={<ItemDetails />}
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
