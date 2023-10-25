namespace Student_Data_Management_App_v2.Models
{
    public class DepartmentInfo
    {
        public int depID { get; set; }
        public string depName { get; set; }
        public int uniID { get; set; }

        public DepartmentInfo() { }
        public DepartmentInfo(int id, string name, int uni)
        {
            depID = id;
            depName = name;
            uniID = uni;
        }
    }
}
