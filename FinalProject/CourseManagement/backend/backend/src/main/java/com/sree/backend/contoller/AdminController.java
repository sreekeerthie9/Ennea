package com.sree.backend.contoller;

import com.sree.backend.model.Course;
import com.sree.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CourseService courseService;


    @PostMapping("/course/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.addCourse(course));
    }

    @PutMapping("/course/{id}")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course, @PathVariable int id) {
        return ResponseEntity.ok(courseService.editCourse(id, course));
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Deleted course");
    }

    @GetMapping("/course/{id}/students")
    public ResponseEntity<Integer> getEnrolledStudents(@PathVariable Integer id) {

        return ResponseEntity.ok(courseService.getEnrolledStudents(id));
    }

}
