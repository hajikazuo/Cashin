using Cashin.Application.DTOs.Category;
using Cashin.Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cashin.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IApplicationCategoryService applicationCategoryService;

        public CategoryController(IApplicationCategoryService applicationCategoryService)
        {
            this.applicationCategoryService = applicationCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await applicationCategoryService.GetAll());
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var category = await applicationCategoryService.GetById(id);
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
                await applicationCategoryService.Add(categoryDto);
                return Ok("Cadastrado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryUpdateDto categoryDto)
        {
            try
            {
                if (categoryDto == null)
                {
                    return BadRequest("Categoria não pode ser vazia");
                }

                categoryDto.Id = id;

                await applicationCategoryService.Update(categoryDto);
                return Ok("Alterado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await applicationCategoryService.Remove(id);
                return Ok("Removido com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
