using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cashin.Application.DTOs.Dashboard;
using Cashin.Application.Services.Interfaces;
using Cashin.Domain.Interfaces.Repositories;
using AutoMapper;
using Cashin.Application.DTOs.Category;

namespace Cashin.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository repository;
        private readonly IMapper mapper;

        public DashboardService(IDashboardRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<DashboardDto?> GetDashboardData(Guid userId, DateTime? startDate, DateTime? endDate)
        {
            var data = await repository.GetDashboardData(userId, startDate, endDate);
            var dashboardDto = mapper.Map<DashboardDto>(data);

            return dashboardDto;

        }
    }
}
