using SampleApp.API.Entities;

namespace SampleApp.API.Interfaces;

public interface IRoleRepository
{
    Role CreateRole(Role user);
    List<User> GetRoles();
    Role EditRole(Role user, int id);
    bool DeleteRole(int id);
    Role FindRoleById(int id);
}
