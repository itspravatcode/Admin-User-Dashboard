
import { useState, useMemo } from "react";
import { useUsers } from "../../Contexts/userContext";
import { useUserStore } from "../../stores/userStore";
import { Avatar, List, Input, Card, Typography, Popconfirm, Button, Flex, Spin } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { useAuth } from "../../Contexts/AuthContext";

const { Title, Text } = Typography;

const Users = () => {
  const { users: apiUsers = [], setShowUserDetails,isLoading } = useUsers();
  const persistedUsers = useUserStore(state => state.users);
  const updatedUsers = useUserStore(state => state.updatedUsers);
  const deletedUserIds = useUserStore(state => state.deletedUserIds);
  const deleteUser = useUserStore(state => state.deleteUser);

  const [searchQuery, setSearchQuery] = useState("");

  const mergedUsers = useMemo(() => {
    const processedApiUsers = (apiUsers || [])
      .filter(u => !deletedUserIds.includes(u.id))
      .map(u => updatedUsers[u.id] || u);
    const processedPersistedUsers = persistedUsers.filter(u => !deletedUserIds.includes(u.id));
    return [...processedApiUsers, ...processedPersistedUsers];
  }, [apiUsers, persistedUsers, updatedUsers, deletedUserIds]);

  const filteredUsers = mergedUsers.filter(user =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.role === "Admin";
  if(isLoading){
    <Flex align="center" gap="middle">

    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </Flex>
  }
  return (
    <Card style={{ padding: "20px", borderRadius: "10px" }}>
      <Title level={4} style={{ marginBottom: "16px" }}>
        Users
      </Title>

  

      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 16, width: "100%" }}
      />
        <Link to='/adduser' type="primary"> <Button type="primary"><UserAddOutlined /></Button></Link>
      <List
        dataSource={filteredUsers}
        renderItem={(user) => (
          <List.Item
            style={{
              padding: "12px",
              borderRadius: "8px",
              transition: "0.3s",
              cursor: "pointer",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Link onClick={() => setShowUserDetails(true)} to={`/users/${user.id}`} style={{ flex: 1 }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                    size={48}
                  />
                }
                title={<Text strong>{user?.name || "Unknown"}</Text>}
                description={<Text type="secondary">{user?.company || "No company info"}</Text>}
              />
            </Link>
           { isAdmin&&<Link to={`/edituser/${user.id}`} style={{ marginRight: "8px" }}>
              <EditOutlined style={{ fontSize: "18px", color: "blue" }} />
            </Link>}
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => deleteUser(user.id)}
              okText="Yes"
              cancelText="No"
            >
             { isAdmin&&<DeleteOutlined style={{ fontSize: "18px", color: "red" }} />}
            </Popconfirm>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Users;
