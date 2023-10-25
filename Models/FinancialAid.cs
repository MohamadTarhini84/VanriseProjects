namespace VanriseInternship
{
    public class FinancialAid
    {
        public string FinancerName { get; set; }
        public FinancialAidType AidType { get; set; }
    }

    public abstract class FinancialAidType : FinancialAid
    {
        public abstract string GetDescription();
    }

    public class Percentage : FinancialAidType
    {
        public int PercentageValue { get; set; }
        public override string GetDescription()
        {
            return FinancerName + " - " + PercentageValue + "%";
        }
    }

    public class FixedAmount : FinancialAidType
    {
        public decimal AidValue { get; set; }
        public Currency CurrencyId { get; set; }

        public override string GetDescription()
        {
            return FinancerName + " - " + AidValue + " - " + CurrencyId;
        }
    }
}
