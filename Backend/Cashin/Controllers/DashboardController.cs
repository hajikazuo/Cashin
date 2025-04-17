using Cashin.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cashin.API.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService service;
        public DashboardController(IDashboardService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardData([FromQuery] DateTime? startDate, DateTime? endDate)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var dashboardData = await service.GetDashboardData(userId, startDate, endDate);

            return Ok(dashboardData);
        }
    }
}
