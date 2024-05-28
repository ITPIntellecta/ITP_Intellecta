using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Data;
using ITP_Intellecta.Dtos.User;
using ITP_Intellecta.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITP_Intellecta.Controllers

{
    // [AllowAnonymous]
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
                //         // Provera da li je korisnik već ulogovan
                // if(User.Identity.IsAuthenticated)
                // {
                //     // Ako je korisnik već ulogovan, vraćamo status 400 Bad Request sa odgovarajućom porukom
                //     return BadRequest(new ServiceResponse<int> { Message = "Već ste ulogovani.", Success = false });
                // }

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

        

        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> GetAllUsers()
        {
            return Ok(await _authRepo.GetAllUsers());
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<ServiceResponse<GetUserDto>>> GetUserById(int id)
        {
            return Ok(await _authRepo.GetUserById(id));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<GetUserDto>>> UpdateUser(UpdateUserDto updatedUser)
        {
            return Ok(await _authRepo.UpdateUser(updatedUser));
        }  

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<ServiceResponse<GetUserDto>>> DeleteUser(int id)
        {
            var response = await _authRepo.DeleteUser(id);
            if (response.Data is null)
            {
                return NotFound(response);
            } 
            return Ok(response);
        }
    }
}

