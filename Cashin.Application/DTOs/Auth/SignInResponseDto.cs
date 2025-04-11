using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.DTOs.Auth
{
    public class SignInResponseDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
        public DateTime Expiration { get; set; }
    }
}
