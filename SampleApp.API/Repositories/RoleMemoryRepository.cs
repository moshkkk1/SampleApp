using SampleApp.API.Entities;
using SampleApp.API.Interfaces;

namespace SampleApp.API.Repositories;

public class RolesMemoryRepository : IRoleRepository
{
    public IList<Role> Roles { get; set; } = new List<Role>();

    public Role CreateRole(Role role)
    {
        Roles.Add(role);
        return role;
    }

    public bool DeleteRole(int id)
    {
        var result = FindRoleById(id);
        Roles.Remove(result);
        return true;
    }

    public Role EditRole(Role role, int id)
    {
        var result = FindRoleById(id);
        result.Name = role.Name;
        return result;
    }

    public Role FindRoleById(int id)
    {
        var result = Roles.Where(u => u.Id == id).FirstOrDefault();

        if (result == null)
        {
            throw new Exception($"Нет роли с id = {id}");
        }

        return result;
    }

    public List<Role> GetRoles()
    {
        return (List<Role>)Roles;
    }

    List<User> IRoleRepository.GetRoles()
    {
        throw new NotImplementedException();
    }
}
