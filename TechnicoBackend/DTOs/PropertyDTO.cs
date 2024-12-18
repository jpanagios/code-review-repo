using System;
using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.DTOs
{
    public class PropertyDTO
    {
        [Required]
        public string? Address { get; set; }

        [Required]
        public string? City { get; set; }

        [Required]
        public string? PostalCode { get; set; }

        [Required]
        public Guid UserId { get; set; }
    }
}