import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sections from "../components/Sections";
import {
  Flex,
  Typography,
  Spin,
  FloatButton,
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
import SectionSelection from "../components/SectionSelection";
const { Title, Text, Link } = Typography;

function RestaurantPage() {
  const { restaurantName } = useParams();
  const { restaurantInfo, loading, fetchRestaurantInfo, setRestaurantInfo } =
    useRestaurant();
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [pendingAllergens, setPendingAllergens] = useState([]);

  useEffect(() => {
    setRestaurantInfo(null);
    fetchRestaurantInfo(restaurantName);
  }, [restaurantName]);

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

      {/* {restaurantHours && (
        <>
          <Title level={5} style={{ marginTop: "1em", marginBottom: "0em" }}>
            Horari
          </Title>
          {splitText(restaurantHours).map((word, index) => (
            <Text key={index}>{word}</Text>
          ))}
        </>
      )} */}
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

  const showModalInfo = () => {
    setIsModalInfoOpen(true);
  };
  const handleCancelInfo = () => {
    setIsModalInfoOpen(false);
  };

  const renderInformationSection = () => (
    <Flex justify="center" className="RestaurantInfo">
      <Space direction="horiontal">
        <Title level={2}>{name}</Title>
        {(information || restaurantHours) && (
          <>
            <Button
              shape="circle"
              icon={<InfoCircleOutlined />}
              className="Info"
              onClick={showModalInfo}
            />
            <Modal
              closable={{ "aria-label": "Custom Close Button" }}
              open={isModalInfoOpen}
              footer={null}
              onCancel={handleCancelInfo}
            >
              {contentInformation}
            </Modal>
          </>
        )}
      </Space>
    </Flex>
  );

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

  const showModalFilter = () => {
    setPendingAllergens(selectedAllergens);
    setIsModalFilterOpen(true);
  };
  const handleCancelFilter = () => {
    setIsModalFilterOpen(false);
  };
  const handleOkFilter = () => {
    setSelectedAllergens(pendingAllergens);
    setIsModalFilterOpen(false);
  };

  const handleSelectionChange = (value) => {
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

  function renderSelectSection(section) {
    return (
      <SectionSelection
        section={section}
        handleSelectionChange={handleSelectionChange}
        showModalFilter={showModalFilter}
        isModalFilterOpen={isModalFilterOpen}
        pendingAllergens={pendingAllergens}
        setPendingAllergens={setPendingAllergens}
        handleOkFilter={handleOkFilter}
        handleCancelFilter={handleCancelFilter}
        loading={loading}
      />
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
            selectedAllergens={selectedAllergens}
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
            selectedAllergens={selectedAllergens}
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
            selectedAllergens={selectedAllergens}
          />
        ))}
    </Flex>
  );

  const renderTabs = () => {
    const tabItems = sections
      .filter((section) => section.categories.length !== 0)
      .map((section) => ({
        key: section.id,
        label: section.name,
        children: (
          <>
            {renderSelectSection(section)}
            {section.id === 0 && renderFood()}
            {section.id === 1 && renderDrinks()}
            {section.id === 2 && renderMenus()}
          </>
        ),
      }));
    return <Tabs centered size="large" items={tabItems} />;
  };

  return (
    <>
      {restaurantInfo && (
        <Flex vertical align="center" className="RestaurantPage">
          {renderInformationSection()}
          {description && renderDescriptionSection()}
          {/* {renderContactSection()} */}
          {renderTabs()}
          <FloatButton.BackTop />
        </Flex>
      )}
    </>
  );
}

export default RestaurantPage;
