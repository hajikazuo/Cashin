using AutoMapper;
using Cashin.Application.DTOs.Category;
using Cashin.Application.DTOs.Dashboard;
using Cashin.Application.DTOs.Transaction;
using Cashin.Domain.Entities;
using Cashin.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Cashin.Application.Mappings
{
    public class EntitiesToDTOMappingProfile : Profile
    {
        public EntitiesToDTOMappingProfile()
        {
            CreateMap<Category, CategoryResponseDto>().ReverseMap();
            CreateMap<CategoryRequestDto, Category>().ReverseMap();

            CreateMap<Transaction, TransactionResponseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User != null ? src.User.UserName : string.Empty));


            CreateMap<TransactionRequestDto, Transaction>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<FinancialSummary, DashboardDto>().ReverseMap();
        }
    }
}
