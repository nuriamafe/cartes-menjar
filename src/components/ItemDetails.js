import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Spin, Flex, Image, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { useRestaurant } from "../context/RestaurantContext";
const { Title, Text } = Typography;

function ItemDetails() {
  const { restaurantName, sectionId, itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const { restaurantInfo, loading, fetchRestaurantInfo } = useRestaurant();

  useEffect(() => {
    fetchRestaurantInfo(restaurantName);
  }, [restaurantName, fetchRestaurantInfo]);

  useEffect(() => {
    const fetchItem = async () => {
      if (!loading) {
        setItemDetails(restaurantInfo[0].sections[sectionId].items[itemId]);
      }
    };
    fetchItem();
  }, [loading, restaurantInfo, sectionId, itemId]);

  if (loading) {
    return <Spin />;
  }

  const splitDescription =
    itemDetails &&
    itemDetails.description.split(";").map((word) => word.trim());

  return (
    <>
      {itemDetails && (
        <Flex vertical align="center" className="ItemDetails">
          <Title level={3}>{itemDetails.name}</Title>
          {itemDetails.image !== "" && (
            <Image
              className="itemImage"
              src={itemDetails.image}
              alt={itemDetails.name}
            />
          )}
          <Title level={4} style={{ marginTop: ".5em" }}>
            {itemDetails.price}
          </Title>

          {itemDetails.extras.length !== 0 && (
            <Flex align="center" className="Extras" gap="small">
              {itemDetails.extras &&
                itemDetails.extras.map((extra) => {
                  return (
                    <>
                      {extra === "faThumbsUp" && (
                        <>
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </>
                      )}
                      {extra === "faPepperHot" && (
                        <FontAwesomeIcon icon={faPepperHot} />
                      )}
                    </>
                  );
                })}
            </Flex>
          )}

          <Flex align="center" className="ItemDescription">
            <Space direction="vertical">
              {splitDescription.map((word, index) => (
                <Text key={index}>{word}</Text>
              ))}
            </Space>
          </Flex>

          {itemDetails.allergens.length !== 0 && (
            <Flex align="center" className="Allergens" gap="small">
              <Image.PreviewGroup>
                {itemDetails.allergens &&
                  itemDetails.allergens.map((allergen) => {
                    return (
                      <Image
                        alt={allergen}
                        src={require(`../assets/allergens/${allergen}.png`)}
                      />
                    );
                  })}
              </Image.PreviewGroup>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
}

export default ItemDetails;
