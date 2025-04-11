using Cashin.API.Extensions;
using Cashin.Application.DTOs.Transaction;
using Cashin.Application.Services.Interfaces;
using Cashin.Infrastructure.Helpers.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace Cashin.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService service;

        public TransactionController(ITransactionService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParams paginationParams)
        {
            var transactions = await service.GetAll(paginationParams.PageNumber, paginationParams.PageSize);
            Response.AddPaginationHeader(new PaginationHeader(paginationParams.PageNumber, paginationParams.PageSize, transactions.TotalCount, transactions.TotalPages));
            return Ok(transactions);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var transaction = await service.GetById(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] TransactionRequestDto transactionDto)
        {
            try
            {
                if (transactionDto == null)
                {
                    return BadRequest("Transação não pode ser vazia");
                }
                await service.Add(transactionDto);
                return Ok("Cadastrado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TransactionRequestDto transactionDto)
        {
            try
            {
                if (transactionDto == null)
                {
                    return BadRequest("Transação não pode ser vazia");
                }

                await service.Update(id, transactionDto);
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
