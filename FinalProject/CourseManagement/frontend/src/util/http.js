import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

export async function fetchCourses({ signal }) {
  const response = await fetch("http://localhost:8080/courses", { signal });

  if (!response.ok) {
    const error = new Error("An error occured while fetching the courses");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const courses = await response.json();

  return courses;
}

export async function fetchCourseDetails({ id, signal }) {
  const response = await fetch(`http://localhost:8080/courses/${id}`, {
    signal,
  });
  if (!response.ok) {
    const error = new Error(
      "An error occured while fetching the course details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const course = await response.json();

  return course;
}

export async function fetchAllCategories({ signal }) {
  const response = await fetch("http://localhost:8080/courses/categories", {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occured while fetching the courses");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const courses = await response.json();

  return courses;
}

export async function fetchCategory(categoryName) {
 
  const response = await fetch(
    `http://localhost:8080/courses/categories/${categoryName}`
  );
  if (!response.ok) {
    const error = new Error(
      "An error occured while fetching the course details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const courses = await response.json();
  
  return courses;
}

export async function addNewCourse(courseDetails) {
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/admin/course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseDetails),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while adding the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const course = await response.json();

  return course;
}

export async function deleteCourse(id) {
  const token = getAuthToken();
  const response = await fetch(`http://localhost:8080/admin/course/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.text();
}

export async function editCourse(courseDetails) {
  const token = getAuthToken();
  const id = courseDetails.id;
  const response = await fetch("http://localhost:8080/admin/course/" + id, {
    method: "PUT",

    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseDetails),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const course = await response.json();

  return course;
}

export async function getEnrolledStudents(courseId) {
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8080/admin/course/${courseId}/students`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching number of enrolled students."
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const enrolledStudents = await response.json();
  
  return enrolledStudents;
}

export async function enrollTOCourse(courseId) {
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8080/student/enroll/${courseId}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  
  if (!response.ok) {
    const error = new Error("An error occurred while enrolling to the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.text();
  return data;
}

export async function unrollCourse(courseId) {
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8080/student/unroll/${courseId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  
  if (!response.ok) {
    const error = new Error("An error occurred while deleting the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.text();
  
  return data;
}

export async function getProfile() {
  const token = getAuthToken();
  const response = await fetch(`http://localhost:8080/student/profile`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the course");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const profile = await response.json();
  
  return profile;
}
