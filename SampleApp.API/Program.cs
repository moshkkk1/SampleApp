using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop;
using SampleApp.API.Data;
using SampleApp.API.Interfaces;
using SampleApp.API.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserRepository, UsersRepository>(); // Добавьте эту строку
builder.Services.AddSingleton<IRoleRepository, RolesMemoryRepository>(); 
builder.Services.AddCors();
builder.Services.AddDbContext<SampleAppContext>(o => o.UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"]));

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader());
app.MapControllers();
app.Run();