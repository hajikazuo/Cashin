using Cashin.Domain.Interfaces.Repositories;
using Cashin.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Cashin.Infrastructure.Repositories
{
    public class RepositoryBase<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        private readonly CashinContext context;

        public RepositoryBase(CashinContext context)
        {
            this.context = context;
        }

        public async Task Add(TEntity obj)
        {
            try
            {
                await context.Set<TEntity>().AddAsync(obj);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Update(TEntity obj)
        {
            try
            {
                context.Entry(obj).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task Remove(TEntity obj)
        {
            try
            {
                context.Set<TEntity>().Remove(obj);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
