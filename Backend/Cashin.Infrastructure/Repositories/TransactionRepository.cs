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

        public async Task<PagedList<Transaction>> GetAll(Guid userId, int pageNumber, int pageSize, DateTime? startDate, DateTime? endDate)
        {
            var now = DateTime.UtcNow;

            var start = startDate ?? new DateTime(now.Year, now.Month, 1);
            var end = (endDate ?? start.AddMonths(1).AddDays(-1)).Date.AddDays(1).AddTicks(-1);

            var query = context.Set<Transaction>()
                .Where(t => t.UserId == userId && t.Date >= start && t.Date <= end)
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
