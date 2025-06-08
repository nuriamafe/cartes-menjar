import { restaurantsInfo } from "../data/restaurants";
import { useState } from "react";
import { Flex, Input, Button } from "antd";
import RestaurantCard from "../components/RestaurantCard";
import { ControlOutlined } from "@ant-design/icons";
import RestaurantTypeFilter from "../components/RestaurantTypeFilter";

function HomePage() {
  const [restaurants, setRestaurants] = useState(restaurantsInfo);
  const [restaurantsData] = useState(restaurantsInfo);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pendingTypes, setPendingTypes] = useState([]);

  const handleSearch = (e) => {
    searchRestaurants(e.target.value);
  };

  const searchRestaurants = (str) => {
    let filteredList;
    filteredList = restaurantsData.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(str.toLowerCase());
    });

    setRestaurants(filteredList);
  };

  const showModalFilter = () => {
    setPendingTypes(selectedTypes);
    setIsModalFilterOpen(true);
  };
  const handleCancelFilter = () => {
    setIsModalFilterOpen(false);
  };
  // Actualizar filtro por tipo
  const handleOkFilter = () => {
    setSelectedTypes(pendingTypes);
    setIsModalFilterOpen(false);
    // Filtrar usando el filtro de tipo
    let filteredList = restaurantsData.filter((restaurant) => {
      return (
        !pendingTypes || pendingTypes.length === 0 ||
        (Array.isArray(restaurant.type) && restaurant.type.some((t) => pendingTypes.includes(t)))
      );
    });
    setRestaurants(filteredList);
  };

  return (
    <Flex vertical align="center">
      <Flex align="center" className="SearchContainer">
        <Input
          className="SearchBar"
          placeholder="Buscar un restaurant"
          onChange={handleSearch}
          size="large"
          allowClear
        />
        <Button
          icon={<ControlOutlined />}
          className="FilterRestaurant"
          onClick={showModalFilter}
        />
        <RestaurantTypeFilter
          open={isModalFilterOpen}
          pendingTypes={pendingTypes}
          setPendingTypes={setPendingTypes}
          onOk={handleOkFilter}
          onCancel={handleCancelFilter}
        />
      </Flex>
      <Flex className="CardContainer" gap="middle">
        {restaurants &&
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.jsonName} restaurant={restaurant} />
          ))}
      </Flex>
    </Flex>
  );
}

export default HomePage;
