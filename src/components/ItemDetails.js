import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Spin, Flex, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPepperHot } from "@fortawesome/free-solid-svg-icons";
const { Title, Text } = Typography;

function ItemDetails() {
  const { restaurantName, sectionId, itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      const userModule = await import(`../data/${restaurantName}.js`);
      setRestaurantInfo(userModule[`${restaurantName}`]);
      setLoading(false);
    };
    fetchRestaurantInfo();
  }, [restaurantName]);

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

  return (
    <>
      {itemDetails && (
        <Flex vertical align="center" className="ItemDetails">
          <Title level={3}>{itemDetails.name}</Title>
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
            <Text>{itemDetails.description}</Text>
          </Flex>

          {itemDetails.allergens.length !== 0 && (
            <Flex align="center" className="Allergens">
              {itemDetails.allergens &&
                itemDetails.allergens.map((allergen) => {
                  return (
                    <Image
                      preview={false}
                      alt={allergen}
                      src={require(`../assets/allergens/${allergen}.png`)}
                    />
                  );
                })}
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
}

export default ItemDetails;
