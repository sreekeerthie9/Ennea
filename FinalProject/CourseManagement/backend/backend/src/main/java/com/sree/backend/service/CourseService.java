package com.sree.backend.service;

import com.sree.backend.model.Course;
import com.sree.backend.model.User;
import com.sree.backend.repository.CourseRepo;
import com.sree.backend.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class CourseService {

    @Autowired
    private final CourseRepo courseRepo;

    @Autowired
    private final UserRepo userRepo;

    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Course getCourseById(int id) {
        return courseRepo.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public Course editCourse(Integer id, Course updatedCourse) {
        Course existingCourse = courseRepo.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));

        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setCategory(updatedCourse.getCategory());
        existingCourse.setImage(updatedCourse.getImage());

        return courseRepo.save(existingCourse);
    }

    public void deleteCourse(Integer id) {
        courseRepo.deleteById(id);
    }

    public List<String> getAllCategories() {
        return courseRepo.findAllCategories();
    }

    public List<Course> findByCategory(String category) {
        return courseRepo.findByCategory(category);
    }

    public Integer getEnrolledStudents(Integer id) {

        return courseRepo.findById(id).orElseThrow().getStudents().size();
    }

    @Transactional
    public void enrollCourse(int courseId, int studentId){

        User student = userRepo.findById(studentId).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();
        if(student.getCourses().contains(course)){
            throw new RuntimeException("Student already enrolled");
        }
        course.getStudents().add(student);
        courseRepo.save(course);
        student.getCourses().add(course);
        userRepo.save(student);
    }

    @Transactional
    public void unrollCourse(int courseId, int studentId){


        Course course = courseRepo.findById(courseId).orElseThrow();
        User student = userRepo.findById(studentId).orElseThrow();
        if(!student.getCourses().contains(course)){
            throw new RuntimeException("Student not enrolled");
        }
        course.getStudents().remove(student);
        student.getCourses().remove(course);

        userRepo.save(student);
        courseRepo.save(course);
    }

}
