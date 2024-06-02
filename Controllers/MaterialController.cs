using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Statistics;
using ITP_Intellecta.Services;
using Microsoft.AspNetCore.Mvc;

namespace ITP_Intellecta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialController: ControllerBase
    {
            private readonly ICourseMaterialService _materialService;

            public MaterialController(ICourseMaterialService materialService)
            {
                _materialService = materialService;
            }

            [HttpPost("uploadMaterial")]
            public async Task<ActionResult<ServiceResponse<GetCourseMaterialDto>>> AddCourseMaterial(AddCourseMaterialDto newMaterial)
            {
                return Ok(await _materialService.AddCourseMaterial(newMaterial));
            }
    
            [HttpPost("allFiles")]
            public async Task<IActionResult> UploadAllFiles(IFormCollection form)
            {
                var files = form.Files;
                if (files == null || files.Count == 0)
                    return BadRequest("No files uploaded.");
                    
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            var fileName = file.FileName;

                            var filePath = Path.Combine("folder", fileName);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }
                        }
                    }

                    return Ok(new { message = "All files uploaded successfully." });

                }

            [HttpGet("GetMaterialById/{id}")]
            public async Task<ActionResult<ServiceResponse<GetCourseDto>>> GetMaterialById(int id)
            {
                return Ok(await _materialService.GetMaterialById(id));
            }
                        

            [HttpPost("UpdateMaterialStatus")]
            public async Task<ActionResult<ServiceResponse<GetCourseStatisticsDto>>> UpdateMaterialStatus(AddCourseStatisticsDto stat)
            {
                return Ok(await _materialService.ChangeLessonStatus(stat));
            }


            [HttpPost("ChangeCompletedStatus")]
            public async Task<ActionResult<ServiceResponse<GetCourseStatisticsDto>>> ChangeLessonComplete(AddCourseStatisticsDto stat)
            {
                return Ok(await _materialService.ChangeLessonComplete(stat));
            }

            [HttpGet("GetLessonStatus/{userId}/{courseId}/{materialId}")]
            public async Task<ActionResult<ServiceResponse<GetCourseStatisticsDto>>> GetLessonStatus(int userId, int courseId, int materialId)
            {
                return Ok(await _materialService.GetLessonStatus(userId, courseId, materialId));
            }

            [HttpGet("checkAllCompleted/{week}/{courseId}/{userId}")]
            public async Task<ActionResult<ServiceResponse<bool>>> CheckAllCompleted(int week, int courseId, int userId)
            {
                

                return Ok(await _materialService.CheckAllCompleted(week, courseId, userId));
            }
    }
}