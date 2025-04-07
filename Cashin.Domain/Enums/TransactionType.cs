using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Enums
{
    public enum TransactionType : byte
    {
        Income = 1,
        Expense = 2,
        Transfer = 3,
        Refund = 4,
        Chargeback = 5,
        Adjustment = 6,
        Fee = 7,
        Interest = 8,
        Dividend = 9,
        Other = 10
    }
}
