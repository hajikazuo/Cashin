using Cashin.Domain.Entities;
using Cashin.Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Interfaces.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        Task<PagedList<Category>> GetAll(Guid userId, int pageNumber, int pageSize);

        Task<Category?> GetById(Guid id);
    }
}
