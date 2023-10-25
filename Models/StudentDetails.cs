namespace VanriseInternship
{
    public class StudentDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public string University { get; set; }
        public string Department { get; set; }

        public StudentDetails() { }

        public StudentDetails(Student std, string uni, string dep)
        {
            Id = std.studentID;
            Name = std.studentName;
            Gender = std.studentGender;
            University = uni;
            Department= dep;
        }
    }
}
