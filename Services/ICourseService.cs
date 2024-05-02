using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Course;
using ITP_Intellecta.Models;

namespace ITP_Intellecta.Services
{
    public interface ICourseService
    {
        Task<ServiceResponse<List<GetCourseDto>>> AddCharacter(AddCourseDto newCharacter);
    }
}