using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using System.Security.Claims;


namespace Services
{
    public class CourseService : ICourseService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public CourseService(IMapper mapper, DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ServiceResponse<string>> GetUser()
        {
            var servresp=new ServiceResponse<string>();
            int id = int.Parse(_httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            //servresp.Data=id.ToString();
            
            var user = await _context.Users.FirstOrDefaultAsync(c => c.Id == id);
            if(user != null)
            {
                servresp.Data=user.FirstName;
            }

            
            return servresp;
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