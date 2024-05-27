using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Review;
using ITP_Intellecta.Dtos.User;


namespace Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<GetCourseDto>> AddCourse(AddCourseDto newCourse);
        Task<ServiceResponse<GetReviewDto>> AddReview(AddReviewDto newReview);
        
        Task<ServiceResponse<User>> GetUser();
        Task<ServiceResponse<List<GetCourseDto>>> GetAllCourses();
        Task<ServiceResponse<GetCourseDto>> UpdateCourse(UpdateCourseDto updatedCourse);
        Task<ServiceResponse<GetCourseDto>> GetCourseById(int id);
        Task<ServiceResponse<GetUserDto>> AddUserCourse (AddUserCourseDto newUserCourse);

        Task<ServiceResponse<List<GetCourseDto>>> GetMyLearning(int userId);
        Task<ServiceResponse<User>> GetCreator(int creatorId);

        Task<ServiceResponse<List<GetCourseDto>>> DeleteCourse(int id);

    } 
}