using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Statistics;

namespace ITP_Intellecta.Services
{
    public interface ICourseMaterialService
    {
        Task<ServiceResponse<GetCourseMaterialDto>> AddCourseMaterial(AddCourseMaterialDto newCourseMaterial);
        Task<ServiceResponse<List<GetCourseMaterialDto>>> GetMaterialById(int id);

        Task<ServiceResponse<GetCourseStatisticsDto>> ChangeLessonStatus (AddCourseStatisticsDto stat);

        Task<ServiceResponse<GetCourseStatisticsDto>> ChangeLessonComplete (AddCourseStatisticsDto stat);

        Task<ServiceResponse<GetCourseStatisticsDto>> GetLessonStatus(int userId, int courseId, int materialId);
        Task<ServiceResponse<bool>> CheckAllCompleted(int week, int courseId, int userId);

    }
}