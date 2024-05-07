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
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }
        private int GetUserId()
        {
        
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.ReadJwtToken(_httpContextAccessor.HttpContext!.Request.Cookies["Token"]);

                var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                var userId=-1;
                if (userIdClaim != null)
                {
                    userId = int.Parse(userIdClaim.Value);
                }
                return userId;
        
        }

        public async Task<ServiceResponse<User>> GetUser()
        {
            var servresp=new ServiceResponse<User>();

            var user=await _context.Users.FirstOrDefaultAsync(u=>u.Id==GetUserId());


            servresp.Data=user;
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