using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Models
{
    public class Course
    {
        public int CourseId { get; set; }
       public User? Creator {get;set;}
       public User[]? Students {get;set;}
        public string Title { get; set; }=string.Empty;
        public string Subtitle { get; set; }=string.Empty;
        public int DurationInWeeks { get; set; }
        public int WeeklyHours { get; set; }
        public string Highlights { get; set; }=string.Empty;
        public string Category { get; set; }=string.Empty;
        public float CourseMark {get; set;}

        public bool Approved {get; set;}


        
    }
}