using Newtonsoft.Json;
using System;
using System.ComponentModel;
using VanriseInternship;

namespace VanriseInternship
{
    public abstract class Payment
    {
        public int Amount { get; set; }
        public abstract string GetDescription();
    }

    public class Cash: Payment
    {
        public Currency CurrencyId { get; set; }
        public override string GetDescription()
        {
            return Amount + System.Enum.GetName(typeof(Currency), CurrencyId);
        }
    }

    public class Bank : Payment
    {
        public string BankName{ get; set; }
        public override string GetDescription()
        {
            return Amount + "From: " + BankName;
        }
    }

    public enum Currency
    {
        [Description("LBP")]
        LBP =1,
        [Description("USD")]
        USD=2
    }
}