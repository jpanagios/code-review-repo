using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Services;
using TechnicoBackend.Models;
using TechnicoBackend.DTOs;

namespace TechnicoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            try
            {
                if (!Request.Cookies.TryGetValue("userId", out var userId))
                {
                    return Unauthorized("Ο χρήστης δεν είναι συνδεδεμένος.");
                }

                var properties = await _propertyService.GetPropertiesByUserIdAsync(Guid.Parse(userId));
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return BadRequest($"Σφάλμα κατά την ανάκτηση των properties: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            try
            {
                var property = await _propertyService.GetPropertyByIdAsync(id);
                return Ok(property);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProperty([FromBody] PropertyDTO propertyDto)
        {
            try
            {
                if (!Request.Cookies.TryGetValue("userId", out var userId))
                {
                    return Unauthorized("Ο χρήστης δεν είναι συνδεδεμένος.");
                }

                propertyDto.UserId = Guid.Parse(userId);

                var createdProperty = await _propertyService.AddPropertyAsync(propertyDto);
                return CreatedAtAction(nameof(GetProperty), new { id = createdProperty.Id }, createdProperty);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(Guid id, [FromBody] PropertyDTO propertyDto)
        {
            try
            {
                await _propertyService.UpdatePropertyAsync(id, propertyDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("Invalid property ID.");
            }

            try
            {
                await _propertyService.DeletePropertyAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}