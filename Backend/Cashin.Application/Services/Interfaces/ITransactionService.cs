using Cashin.Application.DTOs.Transaction;
using Cashin.Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<PagedList<TransactionResponseDto>> GetAll(Guid userId, int pageNumber, int pageSize, DateTime? startDate, DateTime? endDate);
        Task<TransactionResponseDto> GetById(Guid id);
        Task Add(Guid userId, TransactionRequestDto transactionDto);
        Task Update(Guid userId, Guid id, TransactionRequestDto transactionDto);
        Task Remove(Guid id);
    }
}
