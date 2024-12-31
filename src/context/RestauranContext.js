import React, { createContext, useState, useContext } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantInfo = async (restaurantName) => {
    const userModule = await import(`../data/${restaurantName}.js`);
    setRestaurantInfo(userModule[`${restaurantName}`]);
    setLoading(false);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantInfo,
        loading,
        fetchRestaurantInfo,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
