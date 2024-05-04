using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace back
{
    public class AutoMapper :Profile
    {
         public AutoMapper()
        {
            CreateMap<Course, GetCourseDto>();
            CreateMap<AddCourseDto, Course>();
            CreateMap<AddCourseMaterialDto, CourseContent>();
            CreateMap<CourseContent, GetCourseMaterialDto>();
            // CreateMap<Weapon, GetWeaponDto>();
            // CreateMap<Skill, GetSkillDto>();
            // CreateMap<Character, HighscoreDto>();

        }
    }
}