using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.ValueObjects
{
    public class FinancialSummary
    {
        public decimal TotalIncome { get; }
        public decimal TotalExpense { get; }
        public decimal Balance { get; }

        public FinancialSummary(decimal totalIncome, decimal totalExpense, decimal balance)
        {
            TotalIncome = totalIncome;
            TotalExpense = totalExpense;
            Balance = balance;
        }
    }

}
