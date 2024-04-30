using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Data;
using back.Dtos.User;
using back.Models;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers

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
        public async Task<ActionResult<ServiceResponse<int>>> Reg(UserRegisterDto request)
        {
            //ova metoda kao rez vraca id korisnika
 
            //koristimo kao objekat da bi mogli kasnije dodati jos neke podatke useru
            var response=await _authRepo.Register(new User {Email=request.Email},request.Password);
            
            //ako je uspjesan odgovor, vracamo 200, u suprotnom 400
            if(!response.Success)
                return BadRequest(response);
            return Ok(response);
        }


    }
}

