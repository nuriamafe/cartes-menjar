import { List, Typography, message, Button } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
const { Title } = Typography;

function Sections(props) {
  const {
    sectionId,
    categoryName,
    items,
    restaurantName,
    categoryId,
    selectedAllergens = [],
  } = props;
  const { addToCart } = useCart();
  const [messageApi, contextHolder] = message.useMessage();

  // Filtrar los items según los alérgenos seleccionados
  const filteredItems =
    selectedAllergens.length === 0
      ? items
      : items.filter(
          (item) =>
            !item.allergens ||
            item.allergens.every(
              (allergen) => !selectedAllergens.includes(allergen)
            )
        );

  const handleAddToCart = (product) => {
    addToCart(product);
    messageApi.success("Producte afegit al carret");
  };

  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="Sections" id={categoryId}>
      <Title level={3}>{categoryName}</Title>
      {contextHolder}
      {filteredItems && (
        <List
          className="ListItems"
          itemLayout="horizontal"
          dataSource={filteredItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined className="ModifyQuantity" />}
                  onClick={() => handleAddToCart(item)}
                />,
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
