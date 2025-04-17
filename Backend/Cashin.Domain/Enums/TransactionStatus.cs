using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Enums
{
    public enum TransactionStatus : byte
    {
        Pending = 1,
        Completed = 2,
        Failed = 3,
    }
}
