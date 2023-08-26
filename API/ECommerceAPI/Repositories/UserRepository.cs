using ECommerceAPI.Models;

namespace ECommerceAPI.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DatabaseContext? _context;
        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public USERS GetUserByUsernameAndPassword(string username, string password)
        {
            return _context.Users.FirstOrDefault(u=> u.USERNAME == username && u.PASSWORD == password);
        }

        public List<USERS> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public async Task CreateUserAsync(USERS user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public bool IsUserExist(USERS user)
        {
            if(_context.Users.FirstOrDefault(u=> u.USERNAME == user.USERNAME) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    public interface IUserRepository
    {
        USERS GetUserByUsernameAndPassword(string username, string password);

        List<USERS> GetAllUsers();

        Task CreateUserAsync(USERS user);
        bool IsUserExist(USERS user);
    }
}
