using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Dtos.Statistics
{
    public class AddCourseStatisticsDto
    {

        public int? UserId {get;set;}
        public int? CourseId {get;set;}

        public int? MaterialId {get;set;}
        public bool Completed {get;set;}
        public int Week {get;set;}
    }
}