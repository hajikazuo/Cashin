using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.Pagination;
using Cashin.Infrastructure.Context;
using Cashin.Infrastructure.Helpers.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Cashin.Infrastructure.Repositories
{
    public class TransactionRepository : RepositoryBase<Transaction>, ITransactionRepository
    {
        private readonly CashinContext context;

        public TransactionRepository(CashinContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task<PagedList<Transaction>> GetAll(int pageNumber, int pageSize)
        {
            var query = context.Set<Transaction>()
                .Include(t => t.Category)
                .Include(t => t.User)
                .AsNoTracking();

            return await PaginationHelper.CreateAsync(query, pageNumber, pageSize);
        }

        public async Task<Transaction?> GetById(Guid id)
        {
            return await context.Set<Transaction>()
                .Include(t => t.Category)
                .Include(t => t.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
        }

    }
}
