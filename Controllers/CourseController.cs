using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<GetCourseDto>>> AddCourse(AddCourseDto newCourse)
        {
            ObjectResult a=Ok(await _courseService.AddCourse(newCourse));
            return a;
        }
        [HttpGet("User")]
        public async Task<ActionResult<ServiceResponse<string>>> GetUserInfo()
        {
                var user = await _courseService.GetUser();
                return Ok(user);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetCourseDto>>>> Get()
        {
            return Ok(await _courseService.GetAllCourses());
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<GetCourseDto>>> UpdateCourse(UpdateCourseDto updatedCourse)
        {
            return Ok(await _courseService.UpdateCourse(updatedCourse));
        }  

        [HttpGet("GetCourseById/{id}")]
        public async Task<ActionResult<ServiceResponse<GetCourseDto>>> GetCourseById(int id)
        {
            return Ok(await _courseService.GetCourseById(id));
        }
    }
}