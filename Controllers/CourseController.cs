using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Review;
using ITP_Intellecta.Dtos.User;
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

        [HttpPost("AddCourse")]
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

        [HttpGet("Creator/{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> GetCreator(int id)
        {
                var user = await _courseService.GetCreator(id);
                return Ok(user);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetCourseDto>>>> Get()
        {
            return Ok(await _courseService.GetAllCourses());
        }

        [HttpGet("GetMyLearning/{userId}")]
        public async Task<ActionResult<ServiceResponse<List<GetCourseDto>>>> GetMyLearning(int userId)
        {
            return Ok(await _courseService.GetMyLearning(userId));
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

         [HttpPost("Course")]
        public async Task<ActionResult<ServiceResponse<GetUserDto>>> AddUserCourse(AddUserCourseDto newUserCourse)
        {
            return Ok(await _courseService.AddUserCourse(newUserCourse));
        }

        [HttpPost("AddReview")]
        public async Task<ActionResult<ServiceResponse<GetReviewDto>>> AddReview(AddReviewDto newReviewDto)
        {
            return Ok(await _courseService.AddReview(newReviewDto));
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ServiceResponse<GetCourseDto>>> DeleteCourse(int id)
        {
            var response = await _courseService.DeleteCourse(id);
            if (response.Data is null)
            {
                return NotFound(response);
            } 
            return Ok(response);
        }
    }
}