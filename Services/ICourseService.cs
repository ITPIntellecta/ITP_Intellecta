using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Dtos.Course;
using back.Models;

namespace back.Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<List<GetCourseDto>>> AddCharacter(AddCourseDto newCharacter);
        
    }
}