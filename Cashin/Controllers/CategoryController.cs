using Cashin.API.Extensions;
using Cashin.Application.DTOs.Category;
using Cashin.Application.Services.Interfaces;
using Cashin.Infrastructure.Helpers.Pagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cashin.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService service;

        public CategoryController(ICategoryService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParams paginationParams)
        {
            var categories = await service.GetAll(paginationParams.PageNumber, paginationParams.PageSize);
            Response.AddPaginationHeader(new PaginationHeader(paginationParams.PageNumber, paginationParams.PageSize, categories.TotalCount, categories.TotalPages));
            return Ok(categories);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var category = await service.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CategoryRequestDto categoryDto)
        {
            try
            {
                if (categoryDto == null)
                {
                    return BadRequest("Categoria não pode ser vazia");
                }
                await service.Add(categoryDto);
                return Ok("Cadastrado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryRequestDto categoryDto)
        {
            try
            {
                if (categoryDto == null)
                {
                    return BadRequest("Categoria não pode ser vazia");
                }

                await service.Update(id, categoryDto);
                return Ok("Alterado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await service.Remove(id);
                return Ok("Removido com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
