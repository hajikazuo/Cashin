namespace Cashin.Application.DTOs.Auth
{
    public class TokenResultDto
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
