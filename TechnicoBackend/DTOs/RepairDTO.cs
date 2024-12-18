using System;
using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.DTOs
{
    public class RepairDTO
    {
        [Required]
        public string? Description { get; set; }

        [Required]
        public DateTime? RepairDate { get; set; }

        [Required]
        public decimal? Cost { get; set; }

        [Required]
        public string? Type { get; set; }

        [Required]
        public Guid PropertyId { get; set; }
    }
}