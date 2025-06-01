import { Link, useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import {
  LeftOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex justify="center" className="Navbar">
      <Button
        className="Back"
        type="link"
        onClick={() => {
          navigate(-1);
        }}
      >
        <LeftOutlined />
      </Button>

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
