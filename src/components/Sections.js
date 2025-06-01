import { List, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
const { Title } = Typography;

function Sections(props) {
  const { sectionId, categoryName, items, restaurantName, categoryId } = props;
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} ha sido añadido al carrito`);
  };

  return (
    <div className="Sections" id={categoryId}>
      <Title level={3}>{categoryName}</Title>
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
                  <Link
                    to={`/${restaurantName}/section/${sectionId}/category/${categoryId}/items/${item.id}`}
                  >
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

export default Sections;
