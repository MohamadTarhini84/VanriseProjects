namespace VanriseInternship
{
    public class Student
    {
        public int studentID { get; set; }
        public string studentName { get; set; }
        public Gender studentGender{ get; set; }
        public int uniID { get; set; }
        public int depID { get; set; }
        public Payment PaymentMethod { get; set; }
        public FinancialAid FinancialAid { get; set; }

        public Student() { }

        public Student(int id, string name, Gender gender, int uni, int dep, Payment payment, FinancialAid aid)
        {
            studentID = id;
            studentName = name;
            studentGender = gender;
            uniID = uni;
            depID = dep;
            PaymentMethod = payment;
            FinancialAid = aid;
        }
    }

    public enum Gender
    {
        Male=1,
        Female=2
    }
}