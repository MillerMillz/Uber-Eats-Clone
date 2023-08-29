using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UberEatsAPI.Models;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private IConfiguration config;

        public AuthController(SignInManager<ApplicationUser> _signInManager,IConfiguration _config, UserManager<ApplicationUser> _userManager)
        {
            signInManager = _signInManager;
            userManager = _userManager;
            config = _config;
        }
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<APIResponse<RegisterAPIModel.Response>>> Register(RegisterAPIModel.Request request)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Email,
                Email = request.Email
            };
            var result = await userManager.CreateAsync(user, request.Password);
            var responseModel = new APIResponse<RegisterAPIModel.Response>();
            if (result.Succeeded)
            {

                responseModel.Response = new RegisterAPIModel.Response()
                {
                    Email = request.Email
                };

                return responseModel;
            }
            else
            {
                responseModel.Errors.AddRange(result.Errors.Select(error => error.Description));

                return responseModel;
            }

        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<APIResponse<LoginAPIModel.Response>>> Login(LoginAPIModel.Request request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            var responseModel = new APIResponse<LoginAPIModel.Response>();
            if (user == null)
            {
                responseModel.Errors.Add("Invalid User name");
                return responseModel;
            }


            var result = await signInManager.PasswordSignInAsync(user, request.Password, false, false);

            if (result.Succeeded)
            {

                responseModel.Response = new LoginAPIModel.Response()
                {
                    Data = user,
                    Token = Guid.NewGuid().ToString(),
                };

                return Ok(responseModel);
            }
            responseModel.Errors.Add("Invalid Password");
            return responseModel;


        }
        [HttpPost]
        [Route("JwtLogin")]
        public async Task<ActionResult<Token>> JwtLogin([FromBody]LoginAPIModel.Request request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
           
            if (user == null)
            {
                Token rete = new Token() { token = "Invalid User name" };
                return Ok(rete);
            }


            var result = await signInManager.PasswordSignInAsync(user, request.Password, false, false);

            if (result.Succeeded)
            {
                var token = Generate(user);
                Token pass = new Token() {token=token };
              //  Response.Cookies.Append("jwt", token,new CookieOptions {  SameSite=SameSiteMode.None, Secure=true});
                return Ok(pass);
            }

            Token ret = new Token() { token = "Wrong password" };
            return Ok(ret);



        }

        private string Generate(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Email,user.Email),
                //new Claim(ClaimTypes.GivenName,user.FirstName),
                //new Claim(ClaimTypes.Surname,user.LastName)
              

            };
            var token = new JwtSecurityToken(config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires:DateTime.Now.AddHours(72),
                signingCredentials:credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        [Route("QueryUser")]
        public async Task<ActionResult<ApplicationUser>> QueryUser()
        {
            var user = await userManager.GetUserAsync(User);
            return Ok(user);
        }
        [HttpGet]
        [Route("JwtQueryUser/{token}")]
      
        public async Task<ActionResult<ApplicationUser>> JwtQueryUser(string token)
        {
            
            var verifiedToken = Verifry(token);
//verifiedToken.Claims.
            //var identity = HttpContext.User.Identity as ClaimsIdentity;
            if(verifiedToken != null) 
            { 
            var user = await userManager.FindByIdAsync(verifiedToken.Claims
                .FirstOrDefault(o=>o.Type ==  ClaimTypes.NameIdentifier)?.Value);
            return Ok(user);
            }
            return null;
        }
        public JwtSecurityToken Verifry(string jwt )
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(config["Jwt:Key"]);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validateToken);

                return (JwtSecurityToken)validateToken;
            }
            catch(Exception e)
            {
                return null;
            }
        }
        [HttpPost]
        [Route("Signout")]
        public async Task<ActionResult<ApplicationUser>> Signout()
        {   
            var user = await userManager.GetUserAsync(User);
            await signInManager.SignOutAsync();
            
            return user;
        }
    }
}
