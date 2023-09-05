using Swashbuckle.AspNetCore.Annotations;

namespace Domain.Dtos;

[SwaggerSchema("DocumentDto")]
public record DocumentDto(byte[] PdfData);