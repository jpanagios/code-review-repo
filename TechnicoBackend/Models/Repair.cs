using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TechnicoBackend.Models
{
    public class Repair
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Description { get; set; }

        [Required]
        public DateTime RepairDate { get; set; }

        [Required]
        public string? Type { get; set; }

        [Required]
        public string? Status { get; set; } = "Pending";

        [Required]
        public decimal Cost { get; set; }

        public string? RepairAddress { get; set; }

        public Guid PropertyId { get; set; }

        [JsonIgnore] 
        public Property? Property { get; set; }
    }
}