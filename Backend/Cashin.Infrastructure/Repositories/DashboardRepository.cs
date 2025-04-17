using Cashin.Application.DTOs.Dashboard;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Interfaces.Repositories;
using Cashin.Domain.ValueObjects;
using Cashin.Infrastructure.Context;
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly DbConnection connection;

        public DashboardRepository(CashinContext context)
        {
            this.connection = context.Database.GetDbConnection();
        }

        public async Task<FinancialSummary?> GetDashboardData(Guid userId, DateTime? startDate, DateTime? endDate)
        {
            var now = DateTime.UtcNow;

            var start = startDate ?? new DateTime(now.Year, now.Month, 1);
            var end = (endDate ?? start.AddMonths(1).AddDays(-1)).Date.AddDays(1).AddTicks(-1);

            return await connection.QuerySingleOrDefaultAsync<FinancialSummary>(
            sql: Domain.Resources.Queries.dashboard,
            param: new
            {
                userId = userId,
                startDate = start,
                endDate = end
            });
        }
    }
}
