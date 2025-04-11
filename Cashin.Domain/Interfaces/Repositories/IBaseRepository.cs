using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task Add(TEntity obj);

        Task Update(TEntity obj);

        Task Remove(TEntity obj);
    }
}
