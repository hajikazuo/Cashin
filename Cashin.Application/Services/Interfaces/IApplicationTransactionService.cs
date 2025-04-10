using Cashin.Application.DTOs.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface IApplicationTransactionService
    {
        Task<IEnumerable<TransactionResponseDto>> GetAll();
        Task<TransactionResponseDto> GetById(Guid id);
        Task Add(TransactionRequestDto transactionDto);
        Task Update(TransactionRequestDto transactionDto);
        Task Remove(TransactionRequestDto transactionDto);
    }
}
