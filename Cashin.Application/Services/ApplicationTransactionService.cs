using AutoMapper;
using Cashin.Application.DTOs.Transaction;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Services;
using RT.Comb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services
{
    public class ApplicationTransactionService : IApplicationTransactionService
    {
        private readonly ITransactionService transactionService;
        private readonly IMapper mapper;
        private readonly ICombProvider comb;

        public ApplicationTransactionService(ITransactionService transactionService, IMapper mapper, ICombProvider comb)
        {
            this.transactionService = transactionService;
            this.mapper = mapper;
            this.comb = comb;
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetAll()
        {
            var transactions = await transactionService.GetAll();
            return mapper.Map<IEnumerable<TransactionResponseDto>>(transactions);
        }

        public async Task<TransactionResponseDto> GetById(Guid id)
        {
            var transaction = await transactionService.GetById(id);
            return mapper.Map<TransactionResponseDto>(transaction);
        }

        public async Task Add(TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            transaction.Id = comb.Create();
            await transactionService.Add(transaction);
        }

        public  async Task Update(TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            await transactionService.Update(transaction);
        }

        public  async Task Remove(TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            await transactionService.Remove(transaction);
        }
    }
}
