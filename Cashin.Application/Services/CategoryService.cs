using AutoMapper;
using Cashin.Application.DTOs.Category;
using Cashin.Application.DTOs.Transaction;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.Interfaces.Services;
using Cashin.Domain.Pagination;
using RT.Comb;

namespace Cashin.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository repository;
        private readonly IMapper mapper;
        private readonly ICombProvider comb;

        public CategoryService(ICategoryRepository repository, IMapper mapper, ICombProvider comb)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.comb = comb;
        }

        public async Task<PagedList<CategoryResponseDto>> GetAll(int pageNumber, int pageSize)
        {
            var categories = await repository.GetAll(pageNumber, pageSize);
            var categoriesDto = mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
            return new PagedList<CategoryResponseDto>(pageNumber, pageSize, categories.TotalCount, categoriesDto);
        }

        public async Task<CategoryResponseDto> GetById(Guid id)
        {
            var category = await repository.GetById(id);
            return mapper.Map<CategoryResponseDto>(category);
        }

        public async Task Add(CategoryRequestDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            category.Id = comb.Create();
            await repository.Add(category);
        }

        public async Task Update(Guid id, CategoryRequestDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            category.Id = id;
            await repository.Update(category);
        }

        public async Task Remove(Guid id)
        {
            var category = await repository.GetById(id);
            await repository.Remove(category);
        }
    }
}
