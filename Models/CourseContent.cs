using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace ITP_Intellecta.Models
{
    public class CourseContent
    {
         [Key]
        public int ContentId {get;set;}
        public int CourseId { get; set; }
        public string VideoFile { get; set; }=string.Empty;
        public string TxtFile { get; set; }=string.Empty;
        public int WeekNumber {get;set;}
        public int FileOrder {get;set;}
        
    }
}