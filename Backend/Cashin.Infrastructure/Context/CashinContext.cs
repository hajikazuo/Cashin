using Cashin.Domain.Entities;
using Cashin.Domain.Entities.Users;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Infrastructure.Context
{
    public class CashinContext : IdentityDbContext<User, Role, Guid>
    {
        public CashinContext(DbContextOptions<CashinContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
