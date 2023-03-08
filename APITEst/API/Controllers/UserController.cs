﻿using APITEst.DTO;
using APITEst.Services;
using Microsoft.AspNetCore.Mvc;

namespace APITEst.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsersAsync()
    {
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }

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

    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUserAsync(int userId)
    {
        await _userService.DeleteUserAsync(userId);
        return NoContent();
    }
}