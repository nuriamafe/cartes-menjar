import { Link, useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import { LeftOutlined, HomeOutlined } from "@ant-design/icons";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="Navbar">
      <Flex justify="center">
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
      </Flex>
    </nav>
  );
}

export default Navbar;
