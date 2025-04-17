using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.DTOs.Auth
{
    public class SignUpDto
    {
        [EmailAddress(ErrorMessage = "Email inválido.")]

        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
