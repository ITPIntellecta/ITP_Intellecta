using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.User;


namespace Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<GetCourseDto>> AddCourse(AddCourseDto newCourse);
        Task<ServiceResponse<User>> GetUser();
        Task<ServiceResponse<List<GetCourseDto>>> GetAllCourses();
        Task<ServiceResponse<GetCourseDto>> UpdateCourse(UpdateCourseDto updatedCourse);
        Task<ServiceResponse<GetCourseDto>> GetCourseById(int id);
        Task<ServiceResponse<GetUserDto>> AddUserCourse (AddUserCourseDto newUserCourse);



    } 
}