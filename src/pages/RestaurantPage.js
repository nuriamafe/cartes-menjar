import { useParams } from "react-router-dom";
import { useEffect } from "react";
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
import { useRestaurant } from "../context/RestauranContext";
const { Title, Text, Link } = Typography;

function RestaurantPage() {
  const { restaurantName } = useParams();
  const { restaurantInfo, loading, fetchRestaurantInfo, setRestaurantInfo } =
    useRestaurant();

  useEffect(() => {
    setRestaurantInfo([]);
    fetchRestaurantInfo(restaurantName);
  }, [restaurantName, fetchRestaurantInfo, setRestaurantInfo]);

  if (loading) {
    return <Spin />;
  }

  const { name, information, description, address, phone, sections } =
    restaurantInfo[0];

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

  const renderDescriptionSection = () => (
    <Title level={4} style={{ marginTop: ".5em" }}>
      {description}
    </Title>
  );

  const renderContactSection = () => (
    <Flex className="Contact" gap="large">
      <Space direction="vertical">
        <Space direction="horizontal">
          <EnvironmentOutlined />
          <Link href={`https://maps.google.com/?q=${address}`} target="_blank">
            {address}
          </Link>
        </Space>
        <Space direction="horizontal">
          <PhoneOutlined />
          <Link href={`tel:${phone}`} target="_blank">
            {phone}
          </Link>
        </Space>
      </Space>
    </Flex>
  );

  const renderSelectSection = () => (
    <div className="SelectContainer">
      <Select
        className="SelectSection"
        defaultValue={0}
        onChange={handleChange}
        options={sections.map((section) => ({
          label: section.name,
          value: section.id,
        }))}
      />
    </div>
  );

  const renderMenuSections = () => (
    <Flex className="SectionContainer" gap={50}>
      {sections.map((section) => (
        <MenuSection
          key={section.id}
          sectionName={section.name}
          items={section.items}
          restaurantName={restaurantName}
          sectionId={section.id}
        />
      ))}
    </Flex>
  );

  const splitDescription =
    restaurantInfo && information.split(",").map((word) => word.trim());

  const content = (
    <Space direction="vertical">
      {splitDescription.map((word, index) => (
        <Text key={index}>{word}</Text>
      ))}
    </Space>
  );

  return (
    <>
      {restaurantInfo && (
        <Flex vertical align="center" className="RestaurantPage">
          {/* Restaurant info */}
          <Flex justify="center" className="RestaurantInfo">
            <Space direction="horiontal">
              <Title level={2}>{name}</Title>
              {information && (
                <Popover content={content} trigger="click" placement="bottom">
                  <Button
                    shape="circle"
                    icon={<InfoCircleOutlined />}
                    className="Info"
                  />
                </Popover>
              )}
            </Space>
          </Flex>

          {description && renderDescriptionSection}

          {renderContactSection()}
          {renderSelectSection()}
          {renderMenuSections()}
          <FloatButton.BackTop />
        </Flex>
      )}
    </>
  );
}

export default RestaurantPage;
