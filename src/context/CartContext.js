import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto para el carrito
const CartContext = createContext();

// Componente proveedor del contexto que envuelve a la aplicación
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde sessionStorage al iniciar
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar el carrito en sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no está, agregarlo con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para aumentar la cantidad de un producto
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para disminuir la cantidad de un producto
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      // Actualiza la cantidad de ese producto
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity >= 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      // Filtra los productos con cantidad mayor que 0
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Calcular el total a pagar
  const getTotal = () => {
    const total = cart.reduce((total, item) => {
      // Reemplazamos la coma por el punto antes de multiplicar
      const priceWithPoint = parseFloat(
        item.price.toString().replace(",", ".")
      );
      return total + priceWithPoint * item.quantity;
    }, 0);
    return total.toFixed(2).replace(".", ","); // Mostrar el total con coma como separador decimal
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCart = () => useContext(CartContext);
