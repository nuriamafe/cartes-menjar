import { List, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
const { Title } = Typography;

function MenuSection(props) {
  const { sectionName, items, restaurantName, sectionId } = props;
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} ha sido añadido al carrito`);
  };

  return (
    <div className="MenuSection" id={sectionId}>
      <Title level={3}>{sectionName}</Title>
      {items && (
        <List
          className="ListItems"
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link onClick={() => handleAddToCart(item)}>
                  <PlusOutlined className="ModifyQuantity" />
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/${restaurantName}/${sectionId}/items/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={item.price}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default MenuSection;
