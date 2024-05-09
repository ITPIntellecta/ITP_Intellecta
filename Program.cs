global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
global using System.IdentityModel.Tokens.Jwt;
global using ITP_Intellecta.Dtos.Course;
global using ITP_Intellecta.Models;
global using ITP_Intellecta.Data;
global using Services;
global using AutoMapper;
global using ITP_Intellecta.Services;
global using ITP_Intellecta.Models;
global using Microsoft.AspNetCore.Identity;
global using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
global using System.Net.Mail;
global using System.Net;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Filters;

using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;



var builder = WebApplication.CreateBuilder(args);

    // var emailConfig = builder.Configuration.GetSection("EmailConfiguration")
    //     .Get<EmailConfig>();
    // builder.Services.AddSingleton(emailConfig);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// builder.Services.AddIdentity<User, IdentityRole>()
//             .AddEntityFrameworkStores<DataContext>()
//             .AddDefaultTokenProviders();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


//   builder.Services.AddIdentity<User, IdentityRole>()
//         .AddEntityFrameworkStores<DataContext>()
//         .AddDefaultTokenProviders();

// builder.Services.AddSwaggerGen(c=>{

//     //dodajemo security definition
//     c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme{
//         Description="""Standard Authorization header using the Bearer scheme. Example: "bearer {token}" """,
//         In=ParameterLocation.Header,
//         Name="Authorization",
//         Type=SecuritySchemeType.ApiKey,
//     });
//     c.OperationFilter<SecurityRequirementsOperationFilter>();
// });
builder.Services.AddSwaggerGen(c=>{
    var jwtSecurityScheme=new OpenApiSecurityScheme{
        BearerFormat="JWT",
        Name="Authorization",
        In=ParameterLocation.Header,
        Type=SecuritySchemeType.ApiKey,
        Scheme=JwtBearerDefaults.AuthenticationScheme,
        Reference=new OpenApiReference{
            Id=JwtBearerDefaults.AuthenticationScheme,
            Type=ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id,jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            jwtSecurityScheme,Array.Empty<string>()
        }
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Configuration.GetSection("EmailConfiguration")
        .Get<EmailConfig>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ICourseMaterialService, CourseMaterialService>();
builder.Services.AddScoped<IEmailService, EmailService>();




builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options=>
{
    options.TokenValidationParameters=new TokenValidationParameters{
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)), //null forgiving operator
        ValidateIssuer=false,
        ValidateAudience=false
    };
});



builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", 
    origin =>
    {
        origin.WithOrigins("http://localhost:5136")
              .AllowAnyHeader()
              .AllowCredentials()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "")),
    //RequestPath = "//"
});




    app.UseCors("AllowAllOrigins");



app.UseHttpsRedirection();

//dodamo ovo !!!!!!
app.UseAuthentication();


app.UseAuthorization();

app.MapControllers();

app.Run();
