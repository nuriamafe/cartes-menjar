import { Flex, Modal, Button, Image } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const ALLERGENS = [
  "celery",
  "crustaceans",
  "dairy",
  "egg",
  "fish",
  "gluten",
  "lupins",
  "mollusks",
  "mustard",
  "peanuts",
  "peelfruits",
  "sesame",
  "soy",
  "sulfur",
];

function AllergenFilter({
  open,
  pendingAllergens,
  setPendingAllergens,
  onOk,
  onCancel,
  loading,
}) {
  const handleAllergenClick = (allergen) => {
    setPendingAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  return (
    <Modal
      className="ModalFilter"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      title="Selecciona per a no mostrar"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button
          key="clear"
          className="ClearCart"
          onClick={() => setPendingAllergens([])}
          icon={<ClearOutlined />}
        />,
        <Button key="back" onClick={onCancel}>
          Cancel·lar
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={onOk}>
          Aplicar
        </Button>,
      ]}
    >
      <Flex className="AllergensContainer" gap="middle">
        {ALLERGENS.map((allergen) => (
          <Flex className="Allergen" key={allergen}>
            <input
              type="checkbox"
              className="AllergenCheckbox"
              checked={pendingAllergens.includes(allergen)}
              onChange={() => handleAllergenClick(allergen)}
              style={{ display: "none" }}
              id={`allergen-checkbox-${allergen}`}
            />
            <label
              htmlFor={`allergen-checkbox-${allergen}`}
              style={{ cursor: "pointer" }}
            >
              <Image
                alt={allergen}
                src={require(`../assets/allergens/${allergen}.png`)}
                preview={false}
                className={
                  pendingAllergens.includes(allergen)
                    ? "AllergenImage selected"
                    : "AllergenImage"
                }
              />
            </label>
          </Flex>
        ))}
      </Flex>
    </Modal>
  );
}

export default AllergenFilter;
