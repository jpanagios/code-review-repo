using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(15, ErrorMessage = "Ο ΑΦΜ πρέπει να είναι μέχρι 15 χαρακτήρες.")]
        public string VatNumber { get; set; } = string.Empty;

        public string UserType { get; set; } = "User";

        public ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}