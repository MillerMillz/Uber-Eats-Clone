using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class LoginAPIModel
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
            public ApplicationUser? Data { get; set; }
            public string? Token { get; set; }
          
        }
    }
}
