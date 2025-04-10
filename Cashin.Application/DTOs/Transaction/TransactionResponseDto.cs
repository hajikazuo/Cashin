using Cashin.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Application.DTOs.Transaction
{
    public class TransactionResponseDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
        public TransactionType Type { get; set; }
        public TransactionStatus Status { get; set; }
        public PaymentType PaymentType { get; set; }


        public string CategoryName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }

}
