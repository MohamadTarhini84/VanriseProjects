namespace VanriseInternship
{
    public class DepartmentDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UniversityName { get; set; }

        public DepartmentDetails() { }

        public DepartmentDetails(Department dep, string name) 
        {
            Id = dep.depID;
            Name = dep.depName;
            UniversityName = name;
        }
    }
}
