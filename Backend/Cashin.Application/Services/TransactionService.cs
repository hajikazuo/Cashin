using AutoMapper;
using Cashin.Application.DTOs.Transaction;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.Pagination;
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

        public async Task<PagedList<TransactionResponseDto>> GetAll(Guid userId, int pageNumber, int pageSize, DateTime? startDate, DateTime? endDate)
        {
            var transactions = await repository.GetAll(userId, pageNumber, pageSize, startDate, endDate);
            var transactionsDto = mapper.Map<IEnumerable<TransactionResponseDto>>(transactions);
            return new PagedList<TransactionResponseDto>(pageNumber, pageSize, transactions.TotalCount, transactionsDto);
        }

        public async Task<TransactionResponseDto> GetById(Guid id)
        {
            var transaction = await repository.GetById(id);
            return mapper.Map<TransactionResponseDto>(transaction);
        }

        public async Task Add(Guid userId, TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            transaction.Id = comb.Create();
            transaction.UserId = userId;
            await repository.Add(transaction);
        }

        public async Task Update(Guid userId, Guid id, TransactionRequestDto transactionDto)
        {
            var transaction = mapper.Map<Transaction>(transactionDto);
            transaction.Id = id;
            transaction.UserId = userId;
            await repository.Update(transaction);
        }

        public async Task Remove(Guid id)
        {
            var transaction = await repository.GetById(id);
            await repository.Remove(transaction);
        }
    }
}
