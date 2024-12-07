package com.sree.backend.repository;

import com.sree.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course, Integer> {
    List<Course> findByCategory(String category);

    @Query("select distinct category from Course")
    List<String> findAllCategories();
}
