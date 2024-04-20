using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Models;

namespace back.Data
{
    public class AuthRepository : IAuthRepository
    {
        public Task<ServiceResponse<string>> Login(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<int>> Register(User user, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UserExists(string email)
        {
            throw new NotImplementedException();
        }
    }
}