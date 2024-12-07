import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useReducer } from "react";
import { fetchAllCategories, fetchCourses } from "../util/http";

export const CourseContext = createContext({
  courses: [],
  categories: [],
});

function reducer(state, action) {
  if (action.type === "INIT") {
    return { ...state, courses: action.payload };
  }
  if(action.type === "INIT_CATEGORIES"){
    return { ...state, categories: action.payload };
  }
  if (action.type === "SEARCH") {
    return { ...state, searchResults: action.payload };
  }
  return state;
}

export default function CourseContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { courses: [] });

  const { data, isLoading: coursesLoading, error: courseError } = useQuery({
    queryKey: ["courses"],
    queryFn: ({ signal }) => fetchCourses({ signal }),
  });

  const {
    data: categories,
    isLoading: loadingCategories,
    isError: categoryError,
  } = useQuery({
    queryKey: ["courses", "categories"],
    queryFn: ({ signal }) => fetchAllCategories({ signal }),
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "INIT", payload: data });
    }
    if(categories){
      dispatch({type: "INIT_CATEGORIES", payload: categories});
    }
  }, [data, categories]);


  function searchCourses(searchTerm) {
    const filteredCourses = data.filter(
      (course) =>
        (course.title && course.title.toLowerCase().includes(searchTerm)) ||
        (course.category && course.category.toLowerCase() === searchTerm)
    );
    
    dispatch({ type: "SEARCH", payload: {searchTerm, filteredCourses} });
  }

  const value = {
    courses: state.courses,
    categories: state.categories,
    searchResults: state.searchResults,
    coursesLoading,
    courseError,
    loadingCategories,
    categoryError,
    searchCourses,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}
