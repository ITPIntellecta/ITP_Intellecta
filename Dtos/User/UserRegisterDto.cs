using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Dtos.User
{
    public class UserRegisterDto
    {
         public string Email { get; set; }=string.Empty;
        public string Password { get; set; }=string.Empty;        
        public string UserType { get; set; }=string.Empty;

         public string FirstName { get; set; }=string.Empty;
        public string LastName { get; set; }=string.Empty;
         public DateTime DateOfBirth { get; set; }
        public string Title { get; set; }=string.Empty;
        public bool Approved {get; set;}
    }
}