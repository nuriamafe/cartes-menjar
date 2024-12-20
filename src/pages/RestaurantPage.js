import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuSection from "../components/MenuSection";
import {
  Flex,
  Typography,
  Spin,
  FloatButton,
  Select,
  Popover,
  Button,
  Space,
} from "antd";
import {
  InfoCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
const { Title, Text, Link } = Typography;

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

  const splitDescription =
    restaurantInfo &&
    restaurantInfo[0].information.split(",").map((word) => word.trim());

  const content = (
    <Space direction="vertical">
      {splitDescription.map((word, index) => (
        <Text key={index}>{word}</Text>
      ))}
    </Space>
  );
  return (
    <>
      {restaurantInfo[0] && (
        <Flex vertical align="center" className="RestaurantPage">
          <Flex align="center">
            <Space direction="horiontal">
              <Title level={2}>{restaurantInfo[0].name}</Title>
              {restaurantInfo[0].information && (
                <Popover content={content} trigger="click" placement="bottom">
                  <Button shape="circle" className="Info">
                    <InfoCircleOutlined />
                  </Button>
                </Popover>
              )}
            </Space>
          </Flex>

          {restaurantInfo[0].description && (
            <Title level={4} style={{ marginTop: ".5em" }}>
              {restaurantInfo[0].description}
            </Title>
          )}

          <Flex className="Contact" gap="large">
            <Space direction="vertical">
              <Space direction="horizontal">
                <EnvironmentOutlined />
                <Link
                  href={`https://maps.google.com/?q=${restaurantInfo[0].address}`}
                  target="_blank"
                >
                  {restaurantInfo[0].address}
                </Link>
              </Space>

              <Space direction="horizontal">
                <PhoneOutlined />
                <Link href={`tel:${restaurantInfo[0].phone}`} target="_blank">
                  {restaurantInfo[0].phone}
                </Link>
              </Space>
            </Space>
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
          <Flex className="SectionContainer" gap={50}>
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
