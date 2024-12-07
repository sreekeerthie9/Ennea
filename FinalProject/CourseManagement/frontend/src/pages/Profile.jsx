import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../util/http"; // Assume you have a API function
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import { getAuthToken, getRole } from "../util/auth";
import { Button, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  text-align: center;
`;

const ProfileTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProfileDetail = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const EditButton = styled(Button)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormContainer = styled.div`
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

const Bio = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 1rem;
`;

export default function ProfilePage() {
  const token = getAuthToken();
  const role = getRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isAdmin = role === "ROLE_ADMIN";

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token && !isAdmin,
  });

  const handleEdit = () => {
    setEditData(data);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
     // await updateProfile(editData); // Assume this updates the profile via an API call
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadChange = ({ file }) => {
    if (file.status === 'done') {
      setEditData(prev => ({ ...prev, profilePicture: file.response.url }));
    }
  };

  let content;
  if (isLoading) {
    content = <LoadingOutlined />;
  } else if (error) {
    content = <p>{error.info}</p>;
  } else if (data) {
    content = (
      <>
        <ProfileImage src={data.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" />
        <ProfileTitle>Hi, {data.firstname}</ProfileTitle>
        <ProfileDetail>Firstname: {data.firstname}</ProfileDetail>
        <ProfileDetail>Lastname: {data.lastname}</ProfileDetail>
        <ProfileDetail>Username: {data.username}</ProfileDetail>
        <Bio>{data.bio || 'No bio available.'}</Bio>
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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormContainer>
          <Upload
            name="profilePicture"
            action="/upload" // Your API endpoint for uploading files
            listType="picture"
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
          <Input
            placeholder="Firstname"
            name="firstname"
            value={editData.firstname || ''}
            onChange={handleChange}
          />
          <Input
            placeholder="Lastname"
            name="lastname"
            value={editData.lastname || ''}
            onChange={handleChange}
          />
          <Input
            placeholder="Username"
            name="username"
            value={editData.username || ''}
            onChange={handleChange}
          />
          <Input.TextArea
            placeholder="Bio"
            name="bio"
            value={editData.bio || ''}
            onChange={handleChange}
            rows={4}
          />
        </FormContainer>
      </Modal>
    </ProfileContainer>
  );
}
