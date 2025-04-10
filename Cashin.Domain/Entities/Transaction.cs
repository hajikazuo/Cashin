using Cashin.Domain.Entities.Users;
using Cashin.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Entities
{
    public class Transaction : Base
    {
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public TransactionType Type { get; set; } 
        public TransactionStatus Status { get; set; }
        public PaymentType PaymentType { get; set; }

        public virtual Category? Category { get; set; }
        public virtual User? User { get; set; }
    }
}
