using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ECommerceAPI.Models;
using ECommerceAPI.Repositories;
using Microsoft.AspNetCore.Cors;

namespace ECommerceAPI
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AuthController :ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public IActionResult Login( LoginModel model)
        {
            var user = _userRepository.GetUserByUsernameAndPassword(model.Username, model.Password);
            if (user != null)
            {
                return Ok(new { success = true, message = "Giriş Başarılı" });
            }
            else
            {
                return Unauthorized(new {success= false,message = "Giriş Başarısız"});
            }
        }
        [HttpGet("getUser")]
        public IActionResult Users()
        {
            List<USERS> lst = _userRepository.GetAllUsers();
            if (lst.Count > 0)
            {
                return Ok(new { success = true, message = "userlar var" });
            }
            else
            {
                return Ok(new { success = true, message = "userlar yok" });
            }
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "test başarılı" });
        }

        [HttpPost("createUser")]
        public async Task<IActionResult> CreateUser(USERS user)
        {
            try
            {
                await _userRepository.CreateUserAsync(user);
                if (!_userRepository.IsUserExist(user))
                {
                    return Ok(new { success = true, message = "kullanıcı Başarıyla oluşturuldu" });
                }
                else
                {
                    return Ok(new { success = false, message = "Kullanıcı adı zaten Kullanımda" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = $"Kullanıcı oluştururken hata: {ex.Message}" });
            }
        }

    }
}
