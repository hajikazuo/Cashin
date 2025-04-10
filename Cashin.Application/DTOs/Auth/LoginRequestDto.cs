using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.DTOs.Auth
{
    public class LoginRequestDto
    {
        [EmailAddress(ErrorMessage = "Invalid email.")]

        public string Email { get; set; }
        public string Password { get; set; }
    }
}
