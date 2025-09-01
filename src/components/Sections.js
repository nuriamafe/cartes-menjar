import { useState, useEffect } from "react";
import { List, Typography, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import ItemDetails from "./ItemDetails";
const { Title } = Typography;

function Sections(props) {
  const {
    sectionId,
    categoryName,
    items,
    restaurantName,
    restaurantId,
    categoryId,
    selectedAllergens = [],
    selectedItemKey,
    setSelectedItemKey,
  } = props;
  const { addToCart } = useCart();
  const [messageApi, contextHolder] = message.useMessage();
  const [itemId, setItemId] = useState(null);

  const getItemKey = (item) =>
    `${restaurantId}-${sectionId}-${categoryId}-${item.id}`;

  const handleOnClickItem = (item) => {
    const key = getItemKey(item);
    setSelectedItemKey(selectedItemKey === key ? null : key);
    setItemId(item.id);
  };

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
    // Añadir categoryId y sectionId al producto antes de pasarlo al carrito
    addToCart({
      ...product,
      categoryId,
      sectionId,
    });
    messageApi.success("Producte afegit al carret");
  };

  // Ya no se necesita useEffect para cerrar el panel aquí, porque el control es global

  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="Sections" id={categoryId}>
      <Title level={3}>{categoryName}</Title>
      {contextHolder}
      {filteredItems && (
        <>
          <List
            className="ListItems"
            itemLayout="horizontal"
            dataSource={filteredItems}
            renderItem={(item) => (
              <>
                <List.Item
                  onClick={() => handleOnClickItem(item)}
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
                    key={item.id}
                    title={item.name}
                    description={item.price === "€" ? "" : item.price}
                  />
                </List.Item>
                {selectedItemKey === getItemKey(item) && (
                  <div>
                    <ItemDetails
                      restaurantName={restaurantName}
                      sectionId={sectionId}
                      categoryId={categoryId}
                      itemId={itemId}
                    />
                  </div>
                )}
              </>
            )}
          />
        </>
      )}
    </div>
  );
}

export default Sections;
