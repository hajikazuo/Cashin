using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cashin.Domain.Enums
{
    public enum PaymentType : byte
    {
        Cash = 1,
        CreditCard = 2,
        DebitCard = 3,
        Pix = 4,
        BankTransfer = 5,
        Other = 6
    }
}
