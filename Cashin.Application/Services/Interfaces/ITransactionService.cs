using Cashin.Application.DTOs.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionResponseDto>> GetAll();
        Task<TransactionResponseDto> GetById(Guid id);
        Task Add(TransactionRequestDto transactionDto);
        Task Update(Guid id, TransactionRequestDto transactionDto);
        Task Remove(Guid id);
    }
}
