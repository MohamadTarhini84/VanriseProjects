namespace VanriseInternship
{
    public class University
    {
        public int uniID { get; set; }
        public string uniName { get; set; }

        public University() { }
        public University(int id, string name)
        {
            uniID = id;
            uniName = name;
        }
    }
}
