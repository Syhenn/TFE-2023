using API.DTO;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsersAsync()
    {
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }
    [Authorize]
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserDto>> GetUserAsync(int userId)
    {
        var user = await _userService.GetUserAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUserAsync(UserDto userDto)
    {
        var createdUser = await _userService.CreateUserAsync(userDto);
        return createdUser;
    }
    [Authorize]
    [HttpPut("{userId}")]
    public async Task<ActionResult<UserDto>> UpdateUserAsync(int userId, UserDto userDto)
    {
        var updatedUser = await _userService.UpdateUserAsync(userId, userDto);
        if (updatedUser == null)
        {
            return NotFound();
        }

        return Ok(updatedUser);
    }
    [Authorize]
    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUserAsync(int userId)
    {
        await _userService.DeleteUserAsync(userId);
        return NoContent();
    }
    [Authorize]
    [HttpGet("{userId}/langages")]
    public async Task<ActionResult<IEnumerable<LangageDto>>> GetLangagesByUserId(int userId)
    {
        var user = await _userService.GetUserAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        var langages = await _userService.GetLangagesByUserAsync(user);
        return Ok(langages);

    }
    [HttpPost("login")]
    public async Task<ActionResult<string>> LoginAsync([FromBody] LoginCredentialsDto loginCredentialsDto)
    {
        var user = await _userService.Authenticate(loginCredentialsDto.Email, loginCredentialsDto.Password);
        if (user == null)
        {
            return Unauthorized();
        }

        var token = JwtHelper.GenerateJwtToken(user.Id.ToString(), user.Email);
        return Ok(token);
    }
}