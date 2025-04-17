using Cashin.Domain.Entities;
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
        private readonly CashinContext context;

        private const string ClientRole = "Client";
        private const string AdminRole = "Admin";

        public SeedService(UserManager<User> userManager, RoleManager<Role> roleManager, CashinContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.context = context;
        }

        public void Seed()
        {
            CreateRole(ClientRole).GetAwaiter().GetResult();
            CreateRole(AdminRole).GetAwaiter().GetResult();
            CreateUser("admin@cashin.com", "Admin", "Test@2025!", roles: new List<string> { ClientRole, AdminRole }).GetAwaiter().GetResult();
            SeedCategories().GetAwaiter().GetResult();  
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
                    Name = name,
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

        private async Task SeedCategories()
        {
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category { Id = Guid.NewGuid(), Name = "Alimentação", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Transporte", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Lazer", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Educação", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Saúde", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Moradia", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Serviços", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Compras", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Viagem", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Salário", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Investimentos", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Presentes", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Impostos", UserId = null },
                    new Category { Id = Guid.NewGuid(), Name = "Assinaturas", UserId = null }
                };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }
        }
    }
}
