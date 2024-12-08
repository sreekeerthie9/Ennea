package com.sree.backend.service;

import com.sree.backend.dto.CourseMapper;
import com.sree.backend.model.CourseResponse;
import com.sree.backend.model.User;
import com.sree.backend.model.StudentProfile;
import com.sree.backend.repository.CourseRepo;
import com.sree.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private UserRepo userRepo;

    public List<CourseResponse> getEnrolledCourses(Integer studentId) {
        User student = userRepo.findById(studentId).orElseThrow();
        return student.getCourses().stream()
                .map(CourseMapper::toCourseResponse)
                .toList();
    }

    public StudentProfile getStudentProfile(Integer studentId) {
        User student = userRepo.findById(studentId).orElseThrow();
        List<CourseResponse> coursesEnrolled = getEnrolledCourses(studentId);
        return new StudentProfile(
                student.getId(),
                student.getFirstname(),
                student.getLastname(),
                student.getUsername(),
                student.getEmail(),
                student.getPhone(),
                student.getBio(),
                student.getRole(),
                coursesEnrolled
        );
    }

    public StudentProfile updateStudentProfile(Integer studentId, StudentProfile studentProfile) {
        User student = userRepo.findById(studentId).orElseThrow();
        student.setFirstname(studentProfile.getFirstname());
        student.setLastname(studentProfile.getLastname());
        student.setEmail(studentProfile.getEmail());
        student.setPhone(studentProfile.getPhone());
        student.setBio(studentProfile.getBio());
        student.setUsername(studentProfile.getUsername());
        userRepo.save(student);

        return getStudentProfile(studentId);
    }
}
