using Cashin.Domain.Entities;
using Cashin.Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Interfaces.Repositories
{
    public interface ITransactionRepository : IBaseRepository<Transaction>
    {
        Task<PagedList<Transaction>> GetAll(Guid userId, int pageNumber, int pageSize, DateTime? startDate, DateTime? endDate);

        Task<Transaction?> GetById(Guid id);
    }
}
