using Cashin.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Cashin.Application.DTOs.Transaction
{
    public class TransactionRequestDto
    {
        [Required]
        public Guid CategoryId { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public TransactionStatus Status { get; set; }

        [Required]
        public PaymentType PaymentType { get; set; }
    }

}
