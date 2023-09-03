using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

public interface IEmailService
{
    Task SendVerificationEmail(string toEmail, string verificationToken);
}

public class SendGridEmailService : IEmailService
{
    private readonly string _apiKey;
    private readonly string _senderEmail;
    private readonly string _senderName;

    public SendGridEmailService(IConfiguration configuration)
    {
        _apiKey = configuration["SendGrid:ApiKey"];
        _senderEmail = configuration["SendGrid:SenderEmail"];
        _senderName = configuration["SendGrid:SenderName"];
    }

    public async Task SendVerificationEmail(string toEmail, string verificationToken)
    {
        var client = new SendGridClient(_apiKey);
        var from = new EmailAddress(_senderEmail, _senderName);
        var to = new EmailAddress(toEmail);
        var subject = "Vérification de votre compte";
        var plainTextContent = $"Cliquez sur le lien suivant pour vérifier votre compte : https://localhost:7227/User/verify?verificationToken={verificationToken}";
        var htmlContent = @"
        <!DOCTYPE html>
        <html lang=""fr"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Vérification de votre compte</title>
        </head>
        <body style=""font-family: Arial, sans-serif; text-align: center; background-color: #f0f0f0; padding: 20px;"">
            <table style=""width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;"">
                <tr>
                    <td style=""padding: 20px;"">
                        <h1 style=""color: #333;"">Vérification de votre compte</h1>
                        <p style=""font-size: 16px; color: #555;"">Cliquez sur le lien ci-dessous pour vérifier votre compte :</p>
                        <p style=""font-size: 16px;"">
                            <a href=""https://localhost:7227/User/verify?verificationToken=" + verificationToken + @""" style=""background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;"">Vérifier mon compte</a>
                        </p>
                        <p style=""font-size: 12px; color: #777;"">Si vous n'avez pas demandé cette vérification, ignorez cet e-mail.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    ";

        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

        var response = await client.SendEmailAsync(msg);
        if (response.StatusCode != HttpStatusCode.Accepted)
        {
            // Gérez les erreurs d'envoi d'e-mails ici
            throw new Exception("Échec de l'envoi de l'e-mail de vérification.");
        }
    }
}