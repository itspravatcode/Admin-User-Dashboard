import { Card } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Link} from 'react-router';

const Logged = () => {
  return (
    <Card 
      style={{ maxWidth: 400, margin: "100px auto", textAlign: "center", padding: 20 }}
    >
      <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "48px", marginBottom: 16 }} />
      <h2>Logged in Successfully</h2>
      <Link 
      type="primary" 
      to='/blogs'
    >
     Blogs
    </Link>
    </Card>
  );
};

export default Logged;
