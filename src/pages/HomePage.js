import { restaurantsInfo } from "../data/restaurants";
import React, { useState } from "react";
import { Flex, Input } from "antd";
import RestaurantCard from "../components/RestaurantCard";

function HomePage() {
  const [restaurants, setRestaurants] = useState(restaurantsInfo);
  const [restaurantsData] = useState(restaurantsInfo);

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
  return (
    <Flex vertical align="center">
      <Input
        className="SearchBar"
        placeholder="Buscar un restaurant"
        onChange={handleSearch}
        size="large"
        allowClear
      />
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
