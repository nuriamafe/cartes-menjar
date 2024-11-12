import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuSection from "../components/MenuSection";
import { Flex, Typography, Spin, FloatButton, Select } from "antd";
const { Title, Text } = Typography;

function RestaurantPage() {
  const { restaurantName } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      const userModule = await import(`../data/${restaurantName}.js`);
      setRestaurantInfo(userModule[`${restaurantName}`]);
      setLoading(false);
    };
    fetchRestaurantInfo();
  }, [restaurantName]);

  if (loading) {
    return <Spin />;
  }

  const handleChange = (value) => {
    const targetSection = document.getElementById(value);
    if (targetSection) {
      const offsetTop =
        targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: offsetTop - 60,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {restaurantInfo[0] && (
        <Flex vertical align="center" className="RestaurantPage">
          <Title level={2}>{restaurantInfo[0].name}</Title>

          <Title level={4} style={{ marginTop: ".5em" }}>
            {restaurantInfo[0].description}
          </Title>

          <Flex className="Contact" gap="large">
            <Text>{restaurantInfo[0].phone}</Text>
            <Text>{restaurantInfo[0].address}</Text>
          </Flex>

          <div className="SelectContainer">
            <Select
              className="SelectSection"
              defaultValue={0}
              onChange={handleChange}
              options={restaurantInfo[0].sections.map((section) => {
                return {
                  label: section.name,
                  value: section.id,
                };
              })}
            />
          </div>
          <Flex className="CardContainer" gap={50}>
            {restaurantInfo[0].sections &&
              restaurantInfo[0].sections.map((section) => (
                <MenuSection
                  key={section.id}
                  sectionName={section.name}
                  items={section.items}
                  restaurantName={restaurantName}
                  sectionId={section.id}
                />
              ))}
          </Flex>
          <FloatButton.BackTop />
        </Flex>
      )}
    </>
  );
}

export default RestaurantPage;
