using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace Services
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

        public async Task<ServiceResponse<GetCourseDto>> AddCourse(AddCourseDto newCourse)
        {
            var serviceResponse = new ServiceResponse<GetCourseDto>();
            var course=_mapper.Map<Course>(newCourse);

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            var kurs=await _context.Courses
                    .Where(c => c.CourseId==course.CourseId)
                    .Select(c => _mapper.Map<GetCourseDto>(c))
                    .ToListAsync();
            serviceResponse.Data=kurs.FirstOrDefault(); 
            return serviceResponse;
        }
    }
}