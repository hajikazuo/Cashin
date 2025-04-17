using Cashin.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Entities
{
    public class Category : Base
    {
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }
        public Guid? UserId { get; set; }

        public virtual User? User { get; set; }
    }
}
