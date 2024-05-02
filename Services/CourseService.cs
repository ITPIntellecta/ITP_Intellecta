using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ITP_Intellecta.Data;
using ITP_Intellecta.Dtos.Course;
using ITP_Intellecta.Models;


namespace ITP_Intellecta.Services
{
    public class CourseService:ICourseService
    {
         private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CourseService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<ServiceResponse<List<GetCourseDto>>> AddCharacter(AddCourseDto newCharacter)
        {
            throw new NotImplementedException();
        }
    }
}