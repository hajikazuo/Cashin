using Cashin.Domain.Entities.Users;
using Cashin.Domain.Interfaces.Services;
using Cashin.Infrastructure.Context;
using Microsoft.AspNetCore.Identity;

namespace Cashin.Infrastructure.Services
{
    public class SeedService : ISeedService
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;

        private const string ClientRole = "Client";
        private const string AdminRole = "Admin";

        public SeedService(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public void Seed()
        {
            CreateRole(ClientRole).GetAwaiter().GetResult();
            CreateRole(AdminRole).GetAwaiter().GetResult();
            CreateUser("admin@cashin.com", "Admin", "Test@2025!", roles: new List<string> { ClientRole, AdminRole }).GetAwaiter().GetResult();
        }

        private async Task<IdentityResult> CreateRole(string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var role = new Role
                {
                    Name = roleName
                };
                return await roleManager.CreateAsync(role);
            }
            return default;
        }

        private async Task<IdentityResult> CreateUser(string email, string name, string password, IEnumerable<string> roles)
        {
            var request = await userManager.FindByEmailAsync(email);
            if (request == null)
            {
                var user = new User
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true,
                };

                IdentityResult result = await userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    await userManager.AddToRolesAsync(user, roles);
                }

                return result;
            }
            else
            {
                return default;
            }
        }
    }
}
