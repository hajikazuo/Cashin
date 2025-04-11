using AutoMapper;
using Cashin.Application.DTOs.Transaction;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using RT.Comb;

namespace Cashin.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository repository;
        private readonly IMapper mapper;
        private readonly ICombProvider comb;

        public TransactionService(ITransactionRepository repository, IMapper mapper, ICombProvider comb)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.comb = comb;
        }

        public async Task<IEnumerable<TransactionResponseDto>> GetAll()
        {
            var transactions = await repository.GetAll();
            return mapper.Map<IEnumerable<TransactionResponseDto>>(transactions);
        }

        public async Task<TransactionResponseDto> GetById(Guid id)
        {
            var transaction = await repository.GetById(id);
            return mapper.Map<TransactionResponseDto>(transaction);
        }

        public async Task Add(TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            transaction.Id = comb.Create();
            await repository.Add(transaction);
        }

        public async Task Update(Guid id, TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            transaction.Id = id;
            await repository.Update(transaction);
        }

        public async Task Remove(Guid id)
        {
            var transaction = await repository.GetById(id);
            await repository.Remove(transaction);
        }
    }
}
