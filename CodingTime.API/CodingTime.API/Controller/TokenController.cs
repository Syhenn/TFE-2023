using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Context.User;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CodingTime.API.Controller;
[Route("token")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IMediator _mediator;

    public TokenController(IConfiguration configuration, IMediator mediator)
    {
        _configuration = configuration;
        _mediator = mediator;
    }
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]UserCredentials credentials)
    {
        if (credentials != null && credentials.Email != null && credentials.Email != null)
        {
            var user = await LoginUser(credentials.Email, credentials.Password);

            if (user != null)
            {
                //create claims details based on the user information
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                    // Add more claims as needed
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest();
        }
    }

    private async Task<User> LoginUser(string email, string password)
    {
        var commandResult = await _mediator.Send(new LoginUserCommand(email, password), new CancellationToken());
        return commandResult;
    }
}
public class UserCredentials
{
    public string Email { get; set; }
    public string Password { get; set; }
}