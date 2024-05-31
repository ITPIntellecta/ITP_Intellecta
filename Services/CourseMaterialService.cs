using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.Statistics;

namespace ITP_Intellecta.Services
{
    public class CourseMaterialService : ICourseMaterialService
    {
         private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CourseMaterialService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<GetCourseMaterialDto>> AddCourseMaterial(AddCourseMaterialDto newCourseMaterial)
        {
            var serviceResponse = new ServiceResponse<GetCourseMaterialDto>();
            var courseMaterial=_mapper.Map<CourseContent>(newCourseMaterial);

            _context.Materials.Add(courseMaterial);
            await _context.SaveChangesAsync();

            serviceResponse.Data =(
                await _context.Materials
                    .Where(c => c.ContentId==courseMaterial.ContentId)
                    .Select(c => _mapper.Map<GetCourseMaterialDto>(c))
                    .ToListAsync()).FirstOrDefault();

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseStatisticsDto>> ChangeLessonComplete(AddCourseStatisticsDto stat)
        {
             var serviceResponse = new ServiceResponse<GetCourseStatisticsDto>();

            try
            {

                var statistic=await _context.Statistics.Where(c=>c.UserId==stat.UserId).Where(c=>c.CourseId==stat.CourseId).Where(c=>c.MaterialId==stat.MaterialId).FirstOrDefaultAsync();


                
                if (statistic is null )
                    throw new Exception($"Statistic not found.");

                statistic.Completed=stat.Completed;

                
                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetCourseStatisticsDto>(statistic);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseStatisticsDto>> ChangeLessonStatus(AddCourseStatisticsDto stat)
        {
            var serviceResponse = new ServiceResponse<GetCourseStatisticsDto>();
            var courseStatistics=_mapper.Map<CourseStatistics>(stat);

            var user = await _context.Users.FindAsync(stat.UserId);
            var course = await _context.Courses.FindAsync(stat.CourseId);
            var material=await _context.Materials.Where(c=>c.ContentId==stat.MaterialId).FirstOrDefaultAsync();

            if (user == null || course == null || material==null)
            {
                throw new Exception("User or Course not found");
            }

            // Popunite povezane entitete
            courseStatistics.User = user;
            courseStatistics.Course = course;
            courseStatistics.Material=material;

            _context.Statistics.Add(courseStatistics);
            await _context.SaveChangesAsync();

            serviceResponse.Data =(
                await _context.Statistics
                    .Where(c => c.CourseId==courseStatistics.CourseId).Where(c=>c.MaterialId==stat.MaterialId)
                    .Select(c => _mapper.Map<GetCourseStatisticsDto>(c))
                    .ToListAsync()).FirstOrDefault();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseMaterialDto>>> GetMaterialById(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetCourseMaterialDto>>();
            var materials = await _context.Materials
                .Where(c => c.CourseId == id).ToListAsync();
                
                if (materials is null )
                    throw new Exception($"Course with Id '{id}' not found.");
            serviceResponse.Data = materials.Select(c => _mapper.Map<GetCourseMaterialDto>(c)).ToList();;
            return serviceResponse;
        }
    }
}