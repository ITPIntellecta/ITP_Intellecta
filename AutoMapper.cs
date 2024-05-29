using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ITP_Intellecta.Dtos.Review;
using ITP_Intellecta.Dtos.Statistics;
using ITP_Intellecta.Dtos.User;

namespace back
{
    public class AutoMapper :Profile
    {
         public AutoMapper()
        {
            CreateMap<Course, GetCourseDto>();
            CreateMap<Review, GetReviewDto>();

            CreateMap<AddCourseDto, Course>();
            CreateMap<AddReviewDto, Review>();

            CreateMap<AddCourseMaterialDto, CourseContent>();
            CreateMap<CourseContent, GetCourseMaterialDto>();
            CreateMap<User, GetUserDto>();
            CreateMap<User, UpdateUserDto>();

           CreateMap<AddCourseStatisticsDto, CourseStatistics>();
            CreateMap<CourseStatistics, GetCourseStatisticsDto>();

        
        }
    }
}