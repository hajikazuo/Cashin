using Cashin.Application.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface IApplicationCategoryService
    {
        Task<IEnumerable<CategoryResponseDto>> GetAll();
        Task<CategoryResponseDto> GetById(Guid id);
        Task Add(CategoryRequestDto categoryDto);
        Task Update(CategoryUpdateDto categoryDto);
        Task Remove(Guid id);
    }
}
