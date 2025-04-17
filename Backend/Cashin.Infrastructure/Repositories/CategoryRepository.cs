using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.Pagination;
using Cashin.Infrastructure.Context;
using Cashin.Infrastructure.Helpers.Pagination;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Infrastructure.Repositories
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly CashinContext context;

        public CategoryRepository(CashinContext context)
            : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Category>> GetAll(Guid userId)
        {
            return await context.Set<Category>()
                .Where(t => t.UserId == null || t.UserId == userId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
            return await context.Set<Category>().FindAsync(id);
        }
    }
}
