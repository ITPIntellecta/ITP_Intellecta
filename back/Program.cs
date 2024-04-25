global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication;
//global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
using back.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseStaticFiles(new StaticFileOptions
// {
//     FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
//         Path.Combine(Directory.GetCurrentDirectory(), "../front")),
//     RequestPath = "/front"
// });


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
