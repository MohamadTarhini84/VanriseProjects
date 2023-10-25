namespace VanriseInternship
{
    public class UniversityInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public UniversityInfo() { }

        public UniversityInfo(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
