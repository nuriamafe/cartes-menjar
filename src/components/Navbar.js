import { Link, useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <Flex justify="center">
        <Link to="/cartes-menjar">
          <Button
            className="Back"
            type="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined />
          </Button>
        </Link>
        <Link to="/cartes-menjar">
          <Button className="Home" type="link">
            <HomeOutlined />
          </Button>
        </Link>
      </Flex>
    </nav>
  );
}

export default Navbar;
