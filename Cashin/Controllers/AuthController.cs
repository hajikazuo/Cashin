using Cashin.Application.DTOs.Auth;
using Cashin.Domain.Entities.Users;
using Cashin.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RT.Comb;
using System.Security.Claims;

namespace Cashin.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenService tokenRepository;
        private readonly ICombProvider comb;

        public AuthController(UserManager<User> userManager, ITokenService tokenRepository, ICombProvider comb)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.comb = comb;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestDto request)
        {
            var identityUser = await userManager.FindByEmailAsync(request.Email);

            if (identityUser is not null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());
                    var response = new SignInResponseDto()
                    {
                        Email = identityUser.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken.Token,
                        Expiration = jwtToken.Expiration
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email ou senha inválidos");
            return ValidationProblem(ModelState);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto request)
        {
            var user = new User
            {
                Id = comb.Create(),
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            var identityResult = await userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(user, "Client");

                if (identityResult.Succeeded)
                {
                    return Ok();
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Me()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized();

            var user = await userManager.FindByEmailAsync(userEmail);

            if (user is null)
                return NotFound("Usuário não encontrado");

            var roles = await userManager.GetRolesAsync(user);

            var response = new UserProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                Roles = roles.ToList()
            };
            return Ok(response);
        }
    }
}
