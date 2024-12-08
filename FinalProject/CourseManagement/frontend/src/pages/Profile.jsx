import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient,  getProfile, updateProfile } from "../util/http";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import { getAuthToken, getRole } from "../util/auth";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

const { Title, Text } = Typography;

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileDetails = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DetailsList = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const DetailItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled(Text)`
  width: 150px;
  font-weight: bold;
  text-align: right;
  background-color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 4px;
`;

const DetailValue = styled(Text)`
  flex: 1;
  text-align: left;
  background-color: #fafafa;
  padding: 0.5rem;
  border-radius: 4px;
`;

const EditButton = styled(Button)`
  margin-top: 1rem;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Bio = styled(Text)`
  font-size: 1rem;
  color: #555;
  margin-top: 1rem;
`;

export default function ProfilePage() {
  const token = getAuthToken();
  const role = getRole();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();

  const isAdmin = role === "ROLE_ADMIN";

  const { data, isLoading, error } = useQuery({
    queryKey: ["userprofile"],
    queryFn: () => getProfile(),
    enabled: !!token && !isAdmin,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsModalVisible(false);
    },
  });

  function handleEdit() {
    setIsModalVisible(true);
  }

  function handleSave() {
    form.submit();
  }

  async function handleCancel() {
    setIsModalVisible(false);
  }

  function handleFinish(values) {
    mutate(values);
    setIsModalVisible(false);
  }

  let content;
  if (isLoading) {
    content = <LoadingOutlined />;
  }

  if (error) {
    content = <p>{error.info}</p>;
  }

  if (data) {
    content = (
      <>
        <ProfileHeader>
          <ProfileImage
            src={data.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <Title level={3}>Hi, {data.firstname}</Title>
        </ProfileHeader>
        <ProfileDetails>
          <DetailsList>
            <DetailItem>
              <DetailLabel>Firstname:</DetailLabel>
              <DetailValue>{data.firstname}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Lastname:</DetailLabel>
              <DetailValue>{data.lastname}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Username:</DetailLabel>
              <DetailValue>{data.username}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{data.email || "No email available"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Phone:</DetailLabel>
              <DetailValue>{data.phone || "No phone available"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Bio:</DetailLabel>
              <DetailValue>{data.bio || "No bio available."}</DetailValue>
            </DetailItem>
          </DetailsList>
        </ProfileDetails>
        <EditButton type="primary" icon={<EditOutlined />} onClick={handleEdit}>
          Edit Profile
        </EditButton>
      </>
    );
  }

  return (
    <ProfileContainer>
      {content}
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            Save Changes
          </Button>,
        ]}
      >
        <FormContainer
          form={form}
          layout="vertical"
          initialValues={data}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Username:"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your Username.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Firstname:"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please enter your firstname.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname:"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please enter your lastname.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email:" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Phone no:" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Bio:" name="bio">
            <Input />
          </Form.Item>
        </FormContainer>
      </Modal>
    </ProfileContainer>
  );
}
