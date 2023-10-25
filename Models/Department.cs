namespace VanriseInternship
{
    public class Department
    {
        public int depID { get; set; }
        public string depName { get; set; }
        public int uniID { get; set; }

        public Department() { }

        public Department(int id, string name, int uni)
        {
            depID = id;
            depName = name;
            uniID = uni;
        }
    }
}
