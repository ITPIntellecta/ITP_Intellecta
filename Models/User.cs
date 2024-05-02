using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Models
{
    public class User
    {
          public int Id { get; set; }
        public string Email { get; set; }=string.Empty;
        public string FirstName { get; set; }=string.Empty;
        public string LastName { get; set; }=string.Empty;
        //byte array
        public byte[] PasswordHash { get; set; }=new byte[0];
        public byte[] PasswordSalt { get; set; }=new byte[0];
        public DateTime DateOfBirth { get; set; }
        public string UserType { get; set; }=string.Empty;
        public string Title { get; set; }=string.Empty;
    }
}