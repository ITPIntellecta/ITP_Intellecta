using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<GetCourseDto>> AddCourse(AddCourseDto newCourse);
        Task<string> GetUser();
    }
}