using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Mapper;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Langage, LangageDto>().ReverseMap();
    }
}