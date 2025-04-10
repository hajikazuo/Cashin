using Cashin.Application.DTOs.Auth;
using Cashin.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Infrastructure.Services.Interfaces
{
    public interface ITokenService
    {
        TokenResultDto CreateJwtToken(User user, IList<string> roles);
    }
}
