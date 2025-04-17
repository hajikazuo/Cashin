using Cashin.Application.DTOs.Category;
using Cashin.Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponseDto>> GetAll(Guid userId);
        Task<CategoryResponseDto> GetById(Guid id);
        Task Add(Guid UserId, CategoryRequestDto categoryDto);
        Task Update(Guid UserId, Guid id, CategoryRequestDto categoryDto);
        Task Remove(Guid id);
    }
}
