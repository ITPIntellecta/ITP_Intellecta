using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Data;
using ITP_Intellecta.Dtos.User;
using ITP_Intellecta.Models;
using Microsoft.AspNetCore.Mvc;

namespace ITP_Intellecta.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IAuthRepository _authRepo;
       public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }


         [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(UserLoginDto request)
        {
         

            var response=await _authRepo.Login(request.Email, request.Password);


            //ako je uspjesan odgovor, vracamo 200, u suprotnom 400
            if(!response.Success)
                return BadRequest(response);
            return Ok(response);

        }


        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDto model)
        {
            var response=await _authRepo.Register(new User {Email=model.Email, DateOfBirth=model.DateOfBirth, FirstName=model.FirstName, LastName=model.LastName, Title=model.Title, UserType=model.UserType, Approved=model.Approved},model.Password);
                
                //ako je uspjesan odgovor, vracamo 200, u suprotnom 400
                if(!response.Success)
                    return BadRequest(response);
                return Ok(response);
        }
    }
}

