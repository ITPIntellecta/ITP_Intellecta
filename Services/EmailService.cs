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

        public async Task SendEmailToAllUsers()
        {
            var usersS= _context.Users.ToListAsync();
            var users=await usersS;
int i=0;
for ( i = 0; i < users.Count; i++)
    {
        string message = "";
        var courses = await _context.Users.Include(c => c.Courses).Where(c => c.Id == users[i].Id).FirstOrDefaultAsync();
        if (courses != null && courses.Courses.Count != 0)
        {
            message = "Dear " + users[i].FirstName + ", \nWe hope this message finds you well. If you haven't completed the courses you started, now is the perfect time to continue your learning journey. You are currently enrolled in these courses:\n";
            foreach (var course in courses.Courses)
            {
                message += "- " + course.Title + "\n";
            }
            message += "\nBest regards,\nThe Intellecta Team";
            await SendEmail(users[i].Id, message);
        }
    }
        }
   
    }
}