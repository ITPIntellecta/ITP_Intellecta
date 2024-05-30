using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
namespace ITP_Intellecta.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _service;
        

        public EmailController(IEmailService service)
        {
            _service=service;
        }

        [HttpPost("send-email/{userId}/{message}")]
        public async Task<IActionResult> Index(int userId, string message)
        {
            await _service.SendEmail(userId, message);
            return Ok(); // Vratiti odgovor ako je slanje mejla uspešno
            
        }


    }
}        