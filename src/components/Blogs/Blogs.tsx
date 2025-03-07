import { useBlogs } from "../../Contexts/blogsContext";
import { useUsers } from "../../Contexts/userContext";
import {
  Card,
  Typography,
  List,
  Avatar,
  Space,
  Button,
  Divider,
  Flex,
  Spin,
} from "antd";
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";

const { Title, Text, Link } = Typography;

const Blogs = () => {
  const { blogs, isLoading } = useBlogs();
  const { users } = useUsers();

  const getUserById = (userId: number) =>
    users?.find((user) => user.id === userId);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}
        size="large"
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Posts
        </Title>

        <List
          dataSource={blogs}
          renderItem={(blog) => {
            const author = getUserById(blog.userId);
            return (
              <List.Item>
                <Card
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Space align="center" style={{ marginBottom: 10 }}>
                    <Avatar src={author?.photo} size={50} />
                    <div>
                      <Text strong>
                        <NavLink to={`/users/${author?.id}`}>
                          {author?.name}
                        </NavLink>
                      </Text>
                      <Text type="secondary" style={{ display: "block" }}>
                        {author?.company}
                      </Text>
                    </div>
                  </Space>

                  <Title level={4} style={{ margin: "5px 0" }}>
                    <Link href={blog.link} target="_blank">
                      {blog.title}
                    </Link>
                  </Title>

                  <Space style={{ marginBottom: 10 }}>
                    <Button icon={<InfoCircleOutlined />}>
                      {" "}
                      <NavLink to={`/blogs/${blog.id}`}>Details</NavLink>
                    </Button>
                  </Space>

                  <Divider style={{ margin: "10px 0" }} />
                </Card>
              </List.Item>
            );
          }}
        />
      </Spin>
    </div>
  );
};

export default Blogs;
