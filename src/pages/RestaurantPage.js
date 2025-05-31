import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuSection from "../components/MenuSection";
import {
  Flex,
  Typography,
  Spin,
  FloatButton,
  Select,
  Button,
  Space,
  Modal,
} from "antd";
import {
  InfoCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRestaurant } from "../context/RestaurantContext";
const { Title, Text, Link } = Typography;

function RestaurantPage() {
  const { restaurantName } = useParams();
  const { restaurantInfo, loading, fetchRestaurantInfo, setRestaurantInfo } =
    useRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setRestaurantInfo(null);
    fetchRestaurantInfo(restaurantName);
  }, [restaurantName, fetchRestaurantInfo, setRestaurantInfo]);

  if (loading || !restaurantInfo) {
    return <Spin />;
  }

  const {
    name,
    information,
    description,
    address,
    phone,
    sections,
    restaurantHours,
  } = restaurantInfo[0];

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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const splitText = (text) =>
    restaurantInfo && text.split(";").map((word) => word.trim());

  const contentInformation = (
    <Space direction="vertical">
      {information && (
        <>
          <Title level={5} style={{ marginBottom: "0em" }}>
            Informació
          </Title>
          {splitText(information).map((word, index) => (
            <Text key={index}>{word}</Text>
          ))}
        </>
      )}

      {restaurantHours && (
        <>
          <Title level={5} style={{ marginTop: "1em", marginBottom: "0em" }}>
            Horari
          </Title>
          {splitText(restaurantHours).map((word, index) => (
            <Text key={index}>{word}</Text>
          ))}
        </>
      )}
    </Space>
  );

  const contentPhone = splitText(phone).map((word, index) => (
    <Space direction="horizontal">
      <PhoneOutlined />
      <Link key={index} href={`tel:${word}`} target="_blank">
        {word}
      </Link>
    </Space>
  ));

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
        <Space direction="vertical">{contentPhone}</Space>
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

  return (
    <>
      {restaurantInfo && (
        <Flex vertical align="center" className="RestaurantPage">
          {/* Restaurant info */}
          <Flex justify="center" className="RestaurantInfo">
            <Space direction="horiontal">
              <Title level={2}>{name}</Title>
              {(information || restaurantHours) && (
                <>
                  <Button
                    shape="circle"
                    icon={<InfoCircleOutlined />}
                    className="Info"
                    onClick={showModal}
                  />
                  <Modal
                    closable={{ "aria-label": "Custom Close Button" }}
                    open={isModalOpen}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    {contentInformation}
                  </Modal>
                </>
              )}
            </Space>
          </Flex>

          {description && renderDescriptionSection()}

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
