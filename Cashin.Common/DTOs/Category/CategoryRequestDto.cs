using System.ComponentModel.DataAnnotations;

namespace Cashin.Common.DTOs.Category
{
    public class CategoryRequestDto
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
        public string Name { get; set; } = string.Empty;
    }

}
