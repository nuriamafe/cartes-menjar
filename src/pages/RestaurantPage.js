import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sections from "../components/Sections";
import {
  Flex,
  Typography,
  Spin,
  FloatButton,
  Select,
  Button,
  Space,
  Modal,
  Tabs,
} from "antd";
import {
  InfoCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRestaurant } from "../context/RestaurantContext";
const { Title, Text, Link } = Typography;

const { TabPane } = Tabs;

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
    <Title className="Description" level={5} style={{ marginTop: ".5em" }}>
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

  function renderSelectSection(section) {
    return (
      <div className="SelectContainer">
        <Select
          className="SelectSection"
          defaultValue={0}
          onChange={handleChange}
          options={section.categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>
    );
  }

  const renderFood = () => (
    <Flex className="SectionContainer" gap={50}>
      {sections[0] &&
        sections[0].categories.map((category) => (
          <Sections
            key={category.id}
            sectionId={sections[0].id}
            categoryName={category.name}
            items={category.items}
            restaurantName={restaurantName}
            categoryId={category.id}
          />
        ))}
    </Flex>
  );

  const renderDrinks = () => (
    <Flex className="SectionContainer" gap={50}>
      {sections[1] &&
        sections[1].categories.map((category) => (
          <Sections
            key={category.id}
            sectionId={sections[1].id}
            categoryName={category.name}
            items={category.items}
            restaurantName={restaurantName}
            categoryId={category.id}
          />
        ))}
    </Flex>
  );
  const renderMenus = () => (
    <Flex className="SectionContainer" gap={50}>
      {sections[2] &&
        sections[2].categories.map((category) => (
          <Sections
            key={category.id}
            sectionId={sections[2].id}
            categoryName={category.name}
            items={category.items}
            restaurantName={restaurantName}
            categoryId={category.id}
          />
        ))}
    </Flex>
  );

  const renderTabs = () => (
    <Tabs centered size="large">
      {sections
        .filter((section) => section.categories.length !== 0)
        .map((section) => (
          <TabPane tab={section.name} key={section.id}>
            {renderSelectSection(section)}
            {section.id === 0 && renderFood()}
            {section.id === 1 && renderDrinks()}
            {section.id === 2 && renderMenus()}
          </TabPane>
        ))}
    </Tabs>
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
          {renderTabs()}
          <FloatButton.BackTop />
        </Flex>
      )}
    </>
  );
}

export default RestaurantPage;
