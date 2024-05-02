using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Services
{
    public interface ICourseMaterialService
    {
        Task<ServiceResponse<List<GetCourseMaterialDto>>> AddCourseMaterial(AddCourseMaterialDto newCourseMaterial);
        
    }
}