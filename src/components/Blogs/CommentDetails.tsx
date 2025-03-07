import { useParams, useNavigate } from "react-router";
import { useComments } from "../../Contexts/blogsContext";
import { List, Avatar, Space, Typography, Button } from "antd";
import {RollbackOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const CommentDetails = () => {
  const navigate = useNavigate();
  const { commentID } = useParams();
  const ID = Number(commentID);
  const { comments } = useComments();
  console.log(ID);

  const comment = comments?.find((c) => c.id === ID);
  console.log(comment);
  if (!comment) return <Title level={4}>Comment Not Found</Title>;

  return (
    <div>
      <Title level={2} style={{ textAlign: "center" }}>
        {comment.name}'s comment
      </Title>
      <Button icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
        Back
      </Button>

      <List
        size="small"
        dataSource={[comment]}
        renderItem={(comment) => (
          <List.Item>
            <Space align="center">
              <Avatar
                src={`https://i.pravatar.cc/40?u=${comment.email}`}
                size={30}
              />
              <div>
                <Text strong>
                  {comment.name}
                  <Text type="secondary" style={{ display: "block" }}>
                    {comment.body}
                  </Text>
                </Text>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentDetails;
