using Cashin.Common.DTOs.Auth;
using Cashin.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Common.Interfaces
{
    public interface ITokenService
    {
        TokenResultDto CreateJwtToken(User user, IList<string> roles);
    }
}
