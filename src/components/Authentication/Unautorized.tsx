import { Card } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";

const Unauthorized = () => {
  return (
    <Card 
      style={{ maxWidth: 400, margin: "100px auto", textAlign: "center", padding: 20 }}
    >
      <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "48px", marginBottom: 16 }} />
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </Card>
  );
};

export default Unauthorized;
