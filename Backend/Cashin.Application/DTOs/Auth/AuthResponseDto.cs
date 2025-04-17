using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.DTOs.Auth
{
    public class AuthResponseDto
    {
        public UserDto User { get; set; }
        public string AuthToken { get; set; }
    }
}
