import { Button, Dropdown, Menu, Space } from "antd";
import {
  Form,
  NavLink,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  HomeOutlined,
  DownOutlined,
  PlusOutlined,
  LoadingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { getRole } from "../util/auth";
import CourseModal from "./CourseModal";
import { useContext, useMemo, useState } from "react";
import { CourseContext } from "../context/course-context";
import Search from "antd/es/input/Search";
import { useQuery } from "@tanstack/react-query";

const StyledHeader = styled.header`
  margin: 0 auto;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: antiquewhite;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledMenu = styled(Menu)`
  display: flex;
  align-items: center;
  background-color: antiquewhite;
  flex-wrap: nowrap;
  & a {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: none;
    color: #110e0e;
    font-weight: bold;
    text-decoration: none;
    margin-right: 1rem;
  }
  & a:hover {
    color: #e30d7c;
  }
  & a.active {
    color: #e30d7c;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }
`;

const StyledSearch = styled(Search)`
  width: 400px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledDropdownLink = styled.a`
  font: inherit;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export default function MainNavigation() {
  const [visible, setVisible] = useState(false);
  const { searchCourses, categories, loadingCategories, categoryError } =
    useContext(CourseContext);
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const role = getRole();
  const submit = useSubmit();

  let admin = false;

  if (role === "ROLE_ADMIN") {
    admin = true;
  }

  let dropDownItems;
  if (loadingCategories) {
    dropDownItems = <LoadingOutlined />;
  }

  if (categories) {
    dropDownItems = categories.map((category) => ({
      key: category,
      label: category,
    }));
  }

  function handleCategoryClick({ key }) {
    navigate(`courses/category/${key}`);
  }

  function handleSearch(value) {
    searchCourses(value);
  }

  function showModal() {
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleLogout() {
    submit(null, { action: "/logout", method: "post" });
  }

  return (
    <StyledHeader>
      <StyledMenu>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          <Space>
            <HomeOutlined />
            Home
          </Space>
        </NavLink>

        <Dropdown
          menu={{
            items: dropDownItems,
            onClick: handleCategoryClick,
          }}
          trigger={["click"]}
        >
          <StyledDropdownLink onClick={(e) => e.preventDefault()}>
            <Space>
              Categories
              <DownOutlined />
            </Space>
          </StyledDropdownLink>
        </Dropdown>

        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end
        >
          <StyledSearch
            placeholder="Search Courses"
            style={{ width: 400 }}
            onSearch={handleSearch}
          />
          {/* Courses */}
        </NavLink>
      </StyledMenu>
      <StyledMenu>
        {token && admin && (
          <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add New Course
            </Button>
            <CourseModal visible={visible} onCancel={handleCancel} />
          </>
        )}

        {token && !admin && (
          <>
            <NavLink
              to="/user/mycourses"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              My Courses
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <Space>
                <ProfileOutlined />
                Profile
              </Space>
            </NavLink>
          </>
        )}

        {!token && (
          <>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Log in
            </NavLink>
            <NavLink
              to="/auth?mode=signup"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Sign Up
            </NavLink>
          </>
        )}
        {token && <a onClick={handleLogout}>Log out</a>}
      </StyledMenu>
    </StyledHeader>
  );
}
