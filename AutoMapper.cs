using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ITP_Intellecta.Dtos.User;

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
            CreateMap<User, UserRegisterDto>();

            // CreateMap<Weapon, GetWeaponDto>();
            // CreateMap<Skill, GetSkillDto>();
            // CreateMap<Character, HighscoreDto>();

        }
    }
}