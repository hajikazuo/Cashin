using AutoMapper;
using Cashin.Application.DTOs.Category;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Services;
using RT.Comb;

namespace Cashin.Application.Services
{
    public class ApplicationCategoryService : IApplicationCategoryService
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;
        private readonly ICombProvider comb;

        public ApplicationCategoryService(ICategoryService categoryService, IMapper mapper, ICombProvider comb)
        {
            this.categoryService = categoryService;
            this.mapper = mapper;
            this.comb = comb;
        }

        public async Task<IEnumerable<CategoryResponseDto>> GetAll()
        {
            var categories = await categoryService.GetAll();
            return mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
        }

        public async Task<CategoryResponseDto> GetById(Guid id)
        {
            var category = await categoryService.GetById(id);
            return mapper.Map<CategoryResponseDto>(category);
        }

        public async Task Add(CategoryRequestDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            category.Id = comb.Create();
            await categoryService.Add(category);
        }

        public async Task Update(CategoryUpdateDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            await categoryService.Update(category);
        }

        public async Task Remove(Guid id)
        {
            var category = await categoryService.GetById(id);
            await categoryService.Remove(category);
        }
    }
}
