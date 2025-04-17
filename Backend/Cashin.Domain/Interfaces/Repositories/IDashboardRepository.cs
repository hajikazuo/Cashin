using Cashin.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Interfaces.Repositories
{
    public interface IDashboardRepository
    {
        Task<FinancialSummary?> GetDashboardData(Guid userId, DateTime? startDate, DateTime? endDate);
    }
}
