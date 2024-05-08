using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using ITP_Intellecta.Models;
using ITP_Intellecta.Dtos.User;


namespace ITP_Intellecta.Data
{
    public class AuthRepository:IAuthRepository
    {
        private readonly DataContext _context;
        
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;



        public AuthRepository(DataContext context, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _context=context;
            _configuration=configuration;
            _httpContextAccessor=httpContextAccessor;
            _mapper=mapper;
        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response=new ServiceResponse<string>();
            var user=await _context.Users.FirstOrDefaultAsync(u=>u.Email.ToLower().Equals(email.ToLower()));

            if(user is null)
            {
                response.Success=false;
                response.Message="User not found!";
            }
            else if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
           {
            response.Success=false;
            response.Message="Wrong password";
           }
           else
           {
            response.Data=CreateToken(user);
           }

            return response;


        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            var response=new ServiceResponse<int>();
            if(await UserExists(user.Email)){
                response.Success=false;
                response.Message="User already exists.";
                return response;
            }

            //pozivamo privatnu metodu sa out parametrima koje mozemo da koristimo
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            //setujemo propertije u user objektu
            user.PasswordHash=passwordHash;
            user.PasswordSalt=passwordSalt;


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //kao rez vraca id korisnika
            response.Data=user.Id;
            return response;

        }

        public async Task<bool> UserExists(string email)
        {
            if(await _context.Users.AnyAsync(u => u.Email.ToLower()==email.ToLower())){
                return true;
            }
            return false;
        }

        //FIXTHIS
        // public async Task<ServiceResponse<int>> CheckAdmin()
        // {
        //     var response = new ServiceResponse<int>();
        //     // Implementacija provjere admina
        //     return response; // Povratna vrijednost ovisi o implementaciji
        // }

        // public async Task<ServiceResponse<int>> ApproveAdmin()
        // {
        //     var response = new ServiceResponse<int>();
        //     // Implementacija odobravanja admina
        //     return response; // Povratna vrijednost ovisi o implementaciji
        // }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512()){
                //kreiranje ove instance vec generise kljuc koji moji da se koristi kao password salt
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

         private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash); //poredimo hesiranu vrijednost unesene sifre, sa hesiranom vrijednoscu u bazi
            }
        }

        private string CreateToken(User user)
        {
            //pravimo listu tvrdnji u koje dodajemo stavke
            var claims=new List<Claim>
            {
               new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
               new Claim(ClaimTypes.Name, user.Email)
            };

            //u konstruktoru inicijalizujemo varijablu configuration pomocu IConfiguration i tada mozemo da pristupamo fajlu appsettings.json


            //pristupamo sekciji, nasa se zove AppSettings
            var appSettingsToken=_configuration.GetSection("AppSettings:Token").Value;
            if(appSettingsToken is null)
                throw new Exception("AppSettings Token is null!");

            //pravimo instancu symmetric security class-e
            SymmetricSecurityKey key=new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(appSettingsToken));

            SigningCredentials creds=new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //security token descriptor - ovaj objekat dobija informaciju koja se koristi za kreiranje krajnjeg tokena

            //ovom objektu dodajemo claims i npr datum isteka
            // var tokenDescriptor=new SecurityTokenDescriptor
            // {
            //     Subject=new ClaimsIdentity(claims),
            //     Expires=DateTime.Now.AddDays(1),
            //     SigningCredentials=creds

            // };
             var token=new JwtSecurityToken(
                issuer:null,
                audience:null,
                claims:claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: creds
             );



            JwtSecurityTokenHandler tokenHandler=new JwtSecurityTokenHandler();
            // SecurityToken token=tokenHandler.CreateToken(tokenDescriptor); //ovo je fja za hendler, nije rekurzivni poziv

            var a=tokenHandler.WriteToken(token); //serijalizujemo security token u JSON web token

            _httpContextAccessor.HttpContext!.Response.Cookies.Append("Token", a);
            return a; 
        }


        
        public async Task<ServiceResponse<List<UserRegisterDto>>> GetAllUsers()
        {
            var serviceResponse = new ServiceResponse<List<UserRegisterDto>>();
            var users = await _context.Users
                .ToListAsync();
            serviceResponse.Data = users.Select(c => _mapper.Map<UserRegisterDto>(c)).ToList();
            return serviceResponse;
        }

        
    }
}