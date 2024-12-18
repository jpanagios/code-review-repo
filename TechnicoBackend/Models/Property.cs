using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TechnicoBackend.Models
{
    public class Property
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Address { get; set; }

        [Required]
        public string? City { get; set; }

        [Required]
        public string? PostalCode { get; set; }

        public Guid UserId { get; set; }

        [JsonIgnore] 
        public User? User { get; set; }

        public ICollection<Repair>? Repairs { get; set; } = new List<Repair>();
    }
}