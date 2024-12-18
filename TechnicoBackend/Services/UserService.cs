using TechnicoBackend.Repositories;
using TechnicoBackend.Models;

namespace TechnicoBackend.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<List<User>> GetUsersAsync(string currentUserType)
        {
            if (currentUserType == "Admin")
            {
                return await _userRepository.GetAllAsync();
            }

            throw new UnauthorizedAccessException("Μόνο οι διαχειριστές μπορούν να δουν όλους τους χρήστες.");
        }

        public async Task AddUserAsync(User user)
        {
            await _userRepository.AddAsync(user);
        }

        public async Task UpdateUserAsync(User user, string currentUserType)
        {
            if (currentUserType == "Admin" || user.UserType == "PropertyOwner")
            {
                await _userRepository.UpdateAsync(user);
            }
            else
            {
                throw new UnauthorizedAccessException("Δεν μπορείτε να τροποποιήσετε αυτόν τον χρήστη.");
            }
        }

        public async Task DeleteUserAsync(Guid userId, string currentUserType)
        {
            if (currentUserType == "Admin")
            {
                await _userRepository.DeleteAsync(userId);
            }
            else
            {
                throw new UnauthorizedAccessException("Μόνο οι διαχειριστές μπορούν να διαγράψουν χρήστες.");
            }
        }
    }
}