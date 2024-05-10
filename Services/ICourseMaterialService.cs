using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Services
{
    public interface ICourseMaterialService
    {
        Task<ServiceResponse<GetCourseMaterialDto>> AddCourseMaterial(AddCourseMaterialDto newCourseMaterial);
        Task<ServiceResponse<List<GetCourseMaterialDto>>> GetMaterialById(int id);
    }
}