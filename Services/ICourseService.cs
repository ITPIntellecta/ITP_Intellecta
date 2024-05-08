using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<GetCourseDto>> AddCourse(AddCourseDto newCourse);
        Task<ServiceResponse<User>> GetUser();
        Task<ServiceResponse<List<GetCourseDto>>> GetAllCourses();
        Task<ServiceResponse<GetCourseDto>> UpdateCourse(UpdateCourseDto updatedCourse);
        Task<ServiceResponse<GetCourseDto>> GetCourseById(int id);


    } 
}