using System.Net.WebSockets;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Dto;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;
using SampleApp.API.Services;
using SampleApp.API.Validations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly ITokenService _token;
    private HMACSHA256 hmac = new HMACSHA256();

    public UsersController(IUserRepository repo, TokenService token)
    {
        _repo = repo;
        _token = token;
    }

    [HttpPost]
    public ActionResult CreateUser(UserDto userDto)
    {
        var user = new User()
        {
            Login = userDto.Login,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
            PasswordSalt = hmac.Key,
            Name = "",
            Token = _token.CreateToken(userDto.Login),
        };

        var validator = new UserValidator();
        var result = validator.Validate(user);

        if (!result.IsValid)
        {
            return BadRequest(result.Errors.First().ErrorMessage);
        }

        var createdUser = _repo.CreateUser(user);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }

    [Authorize]
    [HttpGet]
    public ActionResult GetUsers()
    {
        return Ok(_repo.GetUsers());
    }

    [HttpPut]
    public ActionResult UpdateUser(User user)
    {
        return Ok(_repo.EditUser(user, user.Id));
    }

    [HttpGet("{id}")]
    public ActionResult GetUserById(int id)
    {
        return Ok(_repo.FindUserById(id));
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteUser(int id)
    {
        return Ok(_repo.DeleteUser(id));
    }
}
