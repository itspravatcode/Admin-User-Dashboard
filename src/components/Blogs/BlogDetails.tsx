import React, { useState } from "react";
import { useBlogs, useComments } from "../../Contexts/blogsContext";
import { useUsers } from "../../Contexts/userContext";
import { Card, Typography, List, Avatar, Space, Button, Divider, Collapse } from "antd";
import { InfoCircleOutlined, MessageOutlined, RollbackOutlined } from "@ant-design/icons";
import { NavLink, useParams, useNavigate } from "react-router";

const { Title, Text, Link, Paragraph } = Typography;
const { Panel } = Collapse;

const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const ID = Number(blogID);
  const { blogs } = useBlogs();
  const { comments } = useComments();
  const { users } = useUsers();

  const blog = blogs?.find((c) => c.id === ID);

  if (!blog) return <Title level={4}>Company Not Found</Title>;

  const getUserById = (userId: number) =>
    users?.find((user) => user.id === userId);
  const author = getUserById(blog.userId);


  const [activeKey, setActiveKey] = useState<string | null>(null);


  const toggleComments = () => {
    setActiveKey(activeKey === "comments" ? null : "comments");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {author?.name}'s Post
      </Title>

      <List
        dataSource={[blog]}
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
                <Paragraph>{blog.body}</Paragraph>

                <Space style={{ marginBottom: 10 }}>
                  <Button icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </Space>

                <Divider style={{ margin: "10px 0" }} />

                {/* Comments Accordion */}
                <Collapse activeKey={activeKey} onChange={(key) => setActiveKey(key as string)} accordion>
                  <Panel header="Comments" key="comments">
                    <List
                      size="small"
                      dataSource={comments?.filter((c) => c.postId === blog.id)}
                      renderItem={(comment) => (
                        <List.Item>
                          <Space align="center">
                            <Avatar
                              src={`https://i.pravatar.cc/40?u=${comment.email}`}
                              size={30}
                            />
                            <div>
                              <Text strong>
                                {comment.name}{" "}
                                <NavLink to={`/comments/${comment.id}`}>
                                  <InfoCircleOutlined />
                                </NavLink>
                              </Text>
                            </div>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default BlogDetails;
