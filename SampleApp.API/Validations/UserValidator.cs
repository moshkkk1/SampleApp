using FluentValidation;
using SampleApp.API.Entities;

namespace SampleApp.API.Validations;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(u => u.Login)
            .NotEmpty()
            .WithMessage("Логин обязателен")
            .Length(2, 50)
            .WithMessage("Логин должен быть от 2 до 50 символов")
            .Must(StartsWithCapitalLetter)
            .WithMessage("Логин должен начинаться с заглавной буквы");
    }

    private bool StartsWithCapitalLetter(string Login)
    {
        if (string.IsNullOrEmpty(Login))
            return false;
        return char.IsUpper(Login[0]);
    }
}
