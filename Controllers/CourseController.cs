using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    
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
                
    }
}