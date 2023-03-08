using APITEst.DTO;
using APITEst.Models;
using AutoMapper;

namespace APITEst.Mapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
    }
}