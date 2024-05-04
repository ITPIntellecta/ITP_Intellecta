using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<GetCourseMaterialDto>>> AddCourseMaterial(AddCourseMaterialDto newMaterial)
        {
            return Ok(await _materialService.AddCourseMaterial(newMaterial));
        }
                
    }
}