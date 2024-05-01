using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using back.Data;
using back.Dtos.Course;
using back.Models;

namespace back.Services
{
    public class CourseService : ICourseService
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