import { List, Typography, Button, Empty, Flex } from "antd";
import { PlusOutlined, MinusOutlined, ClearOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext"; // Usamos el contexto para acceder al carrito

const Cart = () => {
  // Accedemos al carrito y a las funciones desde el contexto
  const { cart, increaseQuantity, decreaseQuantity, getTotal, clearCart } =
    useCart();

  return (
    <Flex vertical align="center" className="CartContainer">
      <div className="Cart">
        <Flex justify="center" className="CartHeader">
          <Typography.Title level={2}>Carret</Typography.Title>
          {cart.length > 0 && (
            <Button
              className="ClearCart"
              onClick={clearCart}
              icon={<ClearOutlined />}
            />
          )}
        </Flex>

        {cart.length > 0 ? (
          <>
            <List
              className="ListItems"
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    // Botón para aumentar la cantidad
                    <Button
                      type="link"
                      onClick={() => increaseQuantity(item.id)} // Aumentar cantidad
                    >
                      <PlusOutlined className="ModifyQuantity" />
                    </Button>,
                    // Botón para disminuir la cantidad
                    <Button
                      type="link"
                      onClick={() => decreaseQuantity(item.id)} // Disminuir cantidad
                    >
                      <MinusOutlined className="ModifyQuantity" />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`${item.quantity} x ${item.price}`}
                  />
                </List.Item>
              )}
            />
            {/* Mostrar el total */}
            <Typography.Title level={4}>Total: {getTotal()}€</Typography.Title>
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
      </div>
    </Flex>
  );
};

export default Cart;
