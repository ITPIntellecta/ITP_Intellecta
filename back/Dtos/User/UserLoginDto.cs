using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dtos.User
{
    public class UserLoginDto
    {
         public string Email { get; set; }=string.Empty;
        public string Password { get; set; }=string.Empty;
    }
}