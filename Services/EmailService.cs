using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace ITP_Intellecta.Services
{
    public class EmailService:IEmailService
    {      
        private readonly DataContext _context;
        public EmailService(DataContext context)
        {            
            _context = context;
        }
        //     public async Task<ServiceResponse<string>> SendEmailAsync(int userId, string message)
        //     {
        //         var response=new ServiceResponse<string>();
        //         var user= await _context.Users
        //                         .FirstOrDefaultAsync(c => c.Id == userId);
        //         var client = new SmtpClient("smtp.gmail.com", 465)
        //         {
        //             EnableSsl = true,
        //             UseDefaultCredentials = false,
        //             Credentials = new NetworkCredential("intellecta18@gmail.com", "lenaivana")
        //         };
        
        //         await client.SendMailAsync(new MailMessage(
        //     from: "intellecta18@gmail.com",
        //     to: user.Email,
        //     subject: "Intellecta - Notification",
        //     body: message
        // ));

        //         response.Success=true;
        //         return response;
        //     }

        public async Task<ServiceResponse<string>> SendEmail(int userId, string message)
        {
            var response=new ServiceResponse<string>();
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new NetworkCredential("intellecta18@gmail.com", "gwrs uliy lync pwxw");
            var user= await _context.Users.FirstOrDefaultAsync(c => c.Id == userId);
                // Potrebno je omogućiti SSL
            smtpClient.EnableSsl = true;

            if(user!=null)
            {
                // Email poruka
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("intellecta18@gmail.com");
                mailMessage.To.Add(user.Email);
                mailMessage.Subject = "Intellecta - Notification";
                mailMessage.Body = message;

                try
                {
                    // Slanje emaila
                  //  smtpClient.Send(mailMessage);
                    await smtpClient.SendMailAsync(mailMessage);

                    Console.WriteLine("Email je uspješno poslan.");
                    response.Success=true;
                    response.Message="Success";
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Greška prilikom slanja emaila: " + ex.Message);
                }
            }
                 return response;
        }
   
    }
}