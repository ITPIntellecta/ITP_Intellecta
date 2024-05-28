using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Models
{
    public class Review
    {
        public int Id{get;set;}

        public User? User{get;set;}
        public int UserId { get; set; }

        public Course? Course{get;set;}

        public int CourseId { get; set; }
        public string ReviewText {get;set;}=string.Empty;
        public int Mark {get;set;}

    }
}