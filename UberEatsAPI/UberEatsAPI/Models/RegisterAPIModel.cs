using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class RegisterAPIModel
    {
        public class Request 
        {
            [Required]
            [EmailAddress]
            public string? Email { get; set; }
            [Required]
            public string? Password { get; set; }
        }
        public class Response
        {
            
            public string? Email { get; set; }
          
            public IEnumerable<IdentityError>? Errors { get; internal set; }
        }
    }
}
