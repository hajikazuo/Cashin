using Cashin.Application.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto?> GetDashboardData(Guid userId, DateTime? startDate, DateTime? endDate);
    }
}
