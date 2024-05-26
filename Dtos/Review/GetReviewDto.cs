using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Dtos.Review
{
    public class GetReviewDto
    {
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public string ReviewText {get;set;}=string.Empty;
        public int Mark {get;set;}

    }
}