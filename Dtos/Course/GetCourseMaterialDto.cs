using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Dtos.Course
{
    public class GetCourseMaterialDto
    {
        public int ContentId {get;set;}
        public int CourseId { get; set; }
        public string VideoFile { get; set; }=string.Empty;
        public string TxtFile { get; set; }=string.Empty;
        public int WeekNumber {get;set;}
        public int FileOrder {get;set;}
    }
}