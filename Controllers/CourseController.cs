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

        public CourseController(ICourseService characterService)
        {
            _courseService = characterService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetCourseDto>>>> AddCharacter(AddCourseDto newCourse)
        {
            return Ok(await _courseService.AddCourse(newCourse));
        }
    }
}