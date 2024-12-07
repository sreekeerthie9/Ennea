package com.sree.backend.dto;

import com.sree.backend.model.Course;
import com.sree.backend.model.CourseResponse;

public class CourseMapper {
    public static CourseResponse toCourseResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getCategory(),
                course.getImage()
        );
    }
}
