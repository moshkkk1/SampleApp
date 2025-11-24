
using FluentValidation;
using SampleApp.API.Entities;

namespace SampleApp.API.Validations;

public class RoleValidator : AbstractValidator<Role>
{
    public RoleValidator()
    {
        RuleFor(r => r.Name)
            .NotEmpty()
            .WithMessage("Название роли обязательно")
            .Length(2, 50)
            .WithMessage("Роль должна быть от 2 до 50 символов")
            .Must(StartsWithCapitalLetter)
            .WithMessage("Роль должна начинаться с заглавной буквы");

        RuleFor(r => r.Id).GreaterThan(0).WithMessage("ID должен быть положительным числом");
    }

    private bool StartsWithCapitalLetter(string name)
    {
        if (string.IsNullOrEmpty(name))
            return false;
        return char.IsUpper(name[0]);
    }
}
