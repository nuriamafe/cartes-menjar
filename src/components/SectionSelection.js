import { Flex, Space, Select, Button } from "antd";
import { ControlOutlined } from "@ant-design/icons";
import AllergenFilter from "../components/AllergenFilter";

function SectionSelection({
  section,
  handleSelectionChange,
  showModalFilter,
  isModalFilterOpen,
  pendingAllergens,
  setPendingAllergens,
  handleOkFilter,
  handleCancelFilter,
  loading,
}) {
  // Solo mostrar el Select si hay más de una categoría
  const showSelect = section.categories && section.categories.length > 1;
  return (
    <Flex className="SelectContainer">
      <Space direction="horizontal">
        {showSelect && (
          <Select
            className="SelectSection"
            defaultValue={0}
            onChange={handleSelectionChange}
            options={section.categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        )}
        <Button
          icon={<ControlOutlined />}
          className="FilterFood"
          onClick={showModalFilter}
        />
        <AllergenFilter
          open={isModalFilterOpen}
          pendingAllergens={pendingAllergens}
          setPendingAllergens={setPendingAllergens}
          onOk={handleOkFilter}
          onCancel={handleCancelFilter}
          loading={loading}
        />
      </Space>
    </Flex>
  );
}

export default SectionSelection;
