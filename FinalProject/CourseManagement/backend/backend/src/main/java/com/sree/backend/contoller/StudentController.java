package com.sree.backend.contoller;

import com.sree.backend.model.User;
import com.sree.backend.model.StudentProfile;
import com.sree.backend.model.UserPrincipal;
import com.sree.backend.service.CourseService;
import com.sree.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<String> enrollCourse(@PathVariable("courseId") int courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User student = userPrincipal.getUser();
        try{
            courseService.enrollCourse(courseId, student.getId());
            return ResponseEntity.ok("Enrolled successfully");
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/unroll/{courseId}")
    public ResponseEntity<String> unrollCourse(@PathVariable("courseId") int courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User student = userPrincipal.getUser();
        try{
            courseService.unrollCourse(courseId, student.getId());
            return ResponseEntity.ok("Unenrolled successfully");
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> profile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User student = userPrincipal.getUser();
        StudentProfile studentProfile = studentService.getStudentProfile(student.getId());
        return ResponseEntity.ok(studentProfile);
    }

}
