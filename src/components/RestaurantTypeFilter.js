import { Flex, Modal, Button, Checkbox } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const TYPES = ["asian", "burger", "pizza", "sushi"];

function RestaurantTypeFilter({
  open,
  pendingTypes,
  setPendingTypes,
  onOk,
  onCancel,
}) {
  const handleTypeChange = (type) => {
    setPendingTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <Modal
      className="ModalType"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      title="Selecciona per a mostrar"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button
          key="clear"
          className="ClearSelection"
          onClick={() => setPendingTypes([])}
          icon={<ClearOutlined />}
        />,
        <Button key="back" onClick={onCancel}>
          Cancel·lar
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Aplicar
        </Button>,
      ]}
    >
      <Flex className="TypesContainer" gap="middle">
        {TYPES.map((type) => (
          <Checkbox
            key={type}
            className="TypeCheckbox"
            checked={pendingTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Checkbox>
        ))}
      </Flex>
    </Modal>
  );
}

export default RestaurantTypeFilter;
