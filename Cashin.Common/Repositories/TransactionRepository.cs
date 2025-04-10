using Cashin.Domain.Entities;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
