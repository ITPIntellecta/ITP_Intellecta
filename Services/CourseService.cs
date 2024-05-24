using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using System.Security.Claims;
using ITP_Intellecta.Dtos.User;


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


        public async Task<ServiceResponse<List<GetCourseDto>>> GetAllCourses()
        {
            var serviceResponse = new ServiceResponse<List<GetCourseDto>>();
            var courses = await _context.Courses
                .ToListAsync();
            serviceResponse.Data = courses.Select(c => _mapper.Map<GetCourseDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDto>> UpdateCourse(UpdateCourseDto updatedCourse)
        {

            var serviceResponse = new ServiceResponse<GetCourseDto>();

            try
            {
                var course =
                    await _context.Courses
                        .FirstOrDefaultAsync(c => c.CourseId == updatedCourse.CourseId);
                if (course is null )
                    throw new Exception($"Course with Id '{updatedCourse.CourseId}' not found.");

                course.Title=updatedCourse.Title;
                course.Subtitle=updatedCourse.Subtitle;
                course.Highlights=updatedCourse.Highlights;
                course.WeeklyHours=updatedCourse.WeeklyHours;
                course.Approved=updatedCourse.Approved;
                course.Category=updatedCourse.Category;
                course.CreatorId=updatedCourse.CreatorId;
                course.DurationInWeeks=updatedCourse.DurationInWeeks;
                course.CourseMark=updatedCourse.CourseMark;
                course.CourseId=updatedCourse.CourseId;

                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetCourseDto>(course);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDto>> GetCourseById(int id)
        {
            var serviceResponse = new ServiceResponse<GetCourseDto>();
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.CourseId == id);
                
                if (course is null )
                    throw new Exception($"Course with Id '{id}' not found.");
            serviceResponse.Data = _mapper.Map<GetCourseDto>(course);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> AddUserCourse (AddUserCourseDto newUserCourse)
        {
            var response=new ServiceResponse<GetUserDto>();
            try{
                var user=await _context.Users.Include(c=>c.Courses).FirstOrDefaultAsync(c=>c.Id==newUserCourse.UserId);
 
                if(user is null)
                {
                    response.Success=false;
                    response.Message="User not found!";
                    return response;
                }
 
                var course=await _context.Courses.FirstOrDefaultAsync(s=>s.CourseId==newUserCourse.CourseId);
 
                if(course is null)
                {
                    response.Success=false;
                    response.Message="Course not found!";
                    return response;
                }
 
                user.Courses!.Add(course);
                await _context.SaveChangesAsync();
                response.Data=_mapper.Map<GetUserDto>(user);
 
 
            }
            catch(Exception ex){
                response.Success=false;
                response.Message=ex.Message;
            }
            return response;
        }
    }
    }
