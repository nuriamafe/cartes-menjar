import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function Navbar() {
  return (
    <Flex justify="center" className="Navbar">
      <Link to="/">
        <Button className="Home" type="link">
          <HomeOutlined />
        </Button>
      </Link>

      <Link to="/cart">
        <Button className="Cart" type="link">
          <ShoppingCartOutlined />
        </Button>
      </Link>
    </Flex>
  );
}

export default Navbar;
