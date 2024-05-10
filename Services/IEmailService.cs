using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITP_Intellecta.Services
{
    public interface IEmailService
    {
    //Task<ServiceResponse<string>> SendEmailAsync(int userId, string message);
        Task<ServiceResponse<string>> SendEmail(int userId, string message);
    }
}