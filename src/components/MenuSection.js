import { List, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;

function MenuSection(props) {
  const { sectionName, items, restaurantName, sectionId } = props;
  return (
    <div className="MenuSection" id={sectionId}>
      <Title level={3}>{sectionName}</Title>
      {items && (
        <List
          className="ListItems"
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item) => (
            <List.Item actions={[item.price]}>
              <List.Item.Meta
                title={
                  <Link to={`/${restaurantName}/${sectionId}/items/${item.id}`}>
                    {item.name}
                  </Link>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default MenuSection;
