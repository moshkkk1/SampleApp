using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.JSInterop;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;
using SampleApp.API.Data;
using SampleApp.API.Extensions;
using SampleApp.API.Interfaces;
using SampleApp.API.Repositories;
using SampleApp.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserRepository, UsersRepository>(); // Добавьте эту строку
builder.Services.AddScoped<TokenService>(); // Добавьте эту строку
// builder.Services.AddSingleton<IRoleRepository, RolesMemoryRepository>();
builder.Services.AddCors();
builder.Services.AddDbContext<SampleAppContext>(o => o.UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"]));
builder.Services.AddJwtServices(builder.Configuration);

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader());
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
