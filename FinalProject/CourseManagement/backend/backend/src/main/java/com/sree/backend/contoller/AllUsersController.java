package com.sree.backend.contoller;

import com.sree.backend.dto.CourseMapper;
import com.sree.backend.model.Course;
import com.sree.backend.model.CourseResponse;
import com.sree.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class AllUsersController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses() {
        List<Course> clist = courseService.getAllCourses();
        List<CourseResponse> courseResponses = clist.stream()
                .map(CourseMapper::toCourseResponse)
                .toList();

        return ResponseEntity.ok(courseResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable int id) {
        Optional<Course> optionalCourse = Optional.ofNullable(courseService.getCourseById(id));
        if(optionalCourse.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Course course = optionalCourse.get();
        CourseResponse courseResponse = CourseMapper.toCourseResponse(course);

        return ResponseEntity.ok(courseResponse);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCourseCategories() {
        return ResponseEntity.ok(courseService.getAllCategories());
    }

    @GetMapping("/categories/{category}")
    public ResponseEntity<List<CourseResponse>> getCoursesByCategory(@PathVariable String category) {
        List<Course> clist = courseService.findByCategory(category);
        List<CourseResponse> courseResponses = clist.stream()
                .map(CourseMapper::toCourseResponse)
                .toList();

        return ResponseEntity.ok(courseResponses);
    }
}
