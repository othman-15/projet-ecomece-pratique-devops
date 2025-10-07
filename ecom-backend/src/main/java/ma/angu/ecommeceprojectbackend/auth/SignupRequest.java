package ma.angu.ecommeceprojectbackend.auth;

import java.time.LocalDate;

public class SignupRequest {
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public String confirmPassword;
    public String phone;
    public LocalDate dob;
    public String gender;
    public String address;
    public String country;
}