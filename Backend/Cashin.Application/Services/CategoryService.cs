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

        public async Task<PagedList<CategoryResponseDto>> GetAll(Guid userId, int pageNumber, int pageSize)
        {
            var categories = await repository.GetAll(userId, pageNumber, pageSize);
            var categoriesDto = mapper.Map<IEnumerable<CategoryResponseDto>>(categories);
            return new PagedList<CategoryResponseDto>(pageNumber, pageSize, categories.TotalCount, categoriesDto);
        }

        public async Task<CategoryResponseDto> GetById(Guid id)
        {
            var category = await repository.GetById(id);
            return mapper.Map<CategoryResponseDto>(category);
        }

        public async Task Add(Guid UserId, CategoryRequestDto categoryDto)
        {
            var category = mapper.Map<Category>(categoryDto);
            category.Id = comb.Create();
            category.UserId = UserId;
            await repository.Add(category);
        }

        public async Task Update(Guid userId, Guid id, CategoryRequestDto categoryDto)
        {
            var existingCategory = await repository.GetById(id);
            if (existingCategory.UserId == null)
            {
                throw new InvalidOperationException("Não é permitido editar categorias do sistema.");
            }

            mapper.Map(categoryDto, existingCategory); 
            existingCategory.UserId = userId;

            await repository.Update(existingCategory);
        }

        public async Task Remove(Guid id)
        {
            var category = await repository.GetById(id);
            if (category.UserId == null)
            {
                throw new InvalidOperationException("Não é permitido deletar categorias do sistema.");
            }

            await repository.Remove(category);
        }
    }
}
