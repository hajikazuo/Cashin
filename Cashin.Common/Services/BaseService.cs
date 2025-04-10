using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.Interfaces.Services;

namespace Cashin.Infrastructure.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class
    {
        private readonly IBaseRepository<TEntity> repository;

        public BaseService(IBaseRepository<TEntity> repository)
        {
            this.repository = repository;
        }

        async Task<IEnumerable<TEntity>> IBaseService<TEntity>.GetAll()
        {
            return await repository.GetAll();
        }

        async Task<TEntity> IBaseService<TEntity>.GetById(Guid id)
        {
            return await repository.GetById(id);
        }

        async Task IBaseService<TEntity>.Add(TEntity obj)
        {
            await repository.Add(obj);
        }

        async Task IBaseService<TEntity>.Update(TEntity obj)
        {
            await repository.Update(obj);
        }


        async Task IBaseService<TEntity>.Remove(TEntity obj)
        {
            await repository.Remove(obj);
        }
    }
}
