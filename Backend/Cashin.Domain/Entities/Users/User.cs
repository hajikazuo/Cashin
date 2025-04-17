using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Entities.Users
{
    public class User : IdentityUser<Guid>
    {
        [MaxLength(200)]
        public string Name { get; set; }
    }
}
