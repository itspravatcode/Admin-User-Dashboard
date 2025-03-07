
import { Card, Descriptions, Avatar, Typography } from "antd";
import type { DescriptionsProps } from "antd";
import { useParams } from "react-router-dom";
import { useUsers } from "../../Contexts/userContext";
import { useUserStore } from "../../stores/userStore";
import { useMemo } from "react";

const { Title, Text } = Typography;

const UserDetails = () => {
  const { userID } = useParams();
  const { users: apiUsers } = useUsers();
  const persistedUsers = useUserStore(state => state.users);
  const updatedUsers = useUserStore(state => state.updatedUsers);
  const deletedUserIds = useUserStore(state => state.deletedUserIds);

  const mergedUsers = useMemo(() => {
    const processedApiUsers = (apiUsers || [])
      .filter(u => !deletedUserIds.includes(u.id))
      .map(u => updatedUsers[u.id] || u);
    const processedPersistedUsers = persistedUsers.filter(u => !deletedUserIds.includes(u.id));
    return [...processedApiUsers, ...processedPersistedUsers];
  }, [apiUsers, persistedUsers, updatedUsers, deletedUserIds]);

  const ID = Number(userID);
  const user = mergedUsers.find(u => u.id === ID);

  if (!user) return <Text type="danger">User not found</Text>;

  const items: DescriptionsProps["items"] = [
    { key: "1", label: "User ID", children: user.id },
    { key: "2", label: "Name", children: user.name || "N/A" },
    { key: "3", label: "Username", children: user.username || "N/A" },
    { key: "4", label: "Email", children: user.email || "N/A" },
    { key: "5", label: "Company", children: user.company || "N/A" },
    { key: "6", label: "Address", children: user.address || "N/A" },
    { key: "7", label: "Zip", children: user.zip || "N/A" },
    { key: "8", label: "State", children: user.state || "N/A" },
    { key: "9", label: "Country", children: user.country || "N/A" },
    { key: "10", label: "Phone", children: user.phone || "N/A" },
  ];

  return (
    <Card 
      style={{ padding: 24, borderRadius: 10, maxWidth: 600, margin: "20px auto", background: "#fafafa" }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar
          size={100}
          src={user.photo || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
        />
        <Title level={4} style={{ marginTop: 10 }}>
          {user.name || "Unknown"}
        </Title>
        <Text type="secondary">{user.company || "No company info"}</Text>
      </div>

      <Descriptions title="User Information" layout="vertical" bordered items={items} />
    </Card>
  );
};

export default UserDetails;
