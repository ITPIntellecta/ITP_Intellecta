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
            smtpClient.EnableSsl = true;

            if(user!=null)
            {
                // Email poruka
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("intellecta18@gmail.com");
                mailMessage.To.Add(user.Email);
                mailMessage.Subject = "Intellecta - Obavještenje";
                mailMessage.Body = message;

                try
                {
                    await smtpClient.SendMailAsync(mailMessage);

                    Console.WriteLine("Email je uspješno poslat.");
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

             public ServiceResponse<string> SendEmailSync(int userId, string message)
        {
            var response=new ServiceResponse<string>();
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new NetworkCredential("intellecta18@gmail.com", "gwrs uliy lync pwxw");
            var user=  _context.Users.FirstOrDefault(c => c.Id == userId);
            smtpClient.EnableSsl = true;

            if(user!=null)
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("intellecta18@gmail.com");
                mailMessage.To.Add(user.Email);
                mailMessage.Subject = "Intellecta - Podsjetnik";
                mailMessage.Body = message;

                try
                {
                    smtpClient.SendMailAsync(mailMessage);

                    Console.WriteLine("Email je uspješno poslat.");
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

        public void SendEmailToAllUsers()
        {
            var users= _context.Users.Include(c => c.Courses).ToList();

        foreach(var user in users)
            {
                string message = "";
                if (user!.Courses!.Count != 0)
                {
                    message = "Poštovani " + user.FirstName + ", \nNadamo se da ste dobro. Ako još niste završili kurseve koje ste započeli, sada je savršeno vrijeme da nastavite svoje obrazovno putovanje. Trenutno ste upisani na ove kurseve:\n";
                    foreach (var course in user.Courses)
                    {
                        message += "- " + course.Title + "\n";
                    }
                    message += "\nSrdačno,\nVaš Intellecta tim";
                    SendEmailSync(user.Id, message);
                    
                }
            }
        }
   
    }
}