using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Services;
using TechnicoBackend.Models;
using TechnicoBackend.DTOs;

namespace TechnicoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RepairController : ControllerBase
    {
        private readonly RepairService _repairService;
        private readonly PropertyService _propertyService; // Προσθήκη PropertyService

        // Constructor με Injection και του PropertyService
        public RepairController(RepairService repairService, PropertyService propertyService)
        {
            _repairService = repairService;
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRepairs()
        {
            try
            {
                var repairs = await _repairService.GetAllRepairsAsync();
                return Ok(repairs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepair(Guid id)
        {
            try
            {
                var repair = await _repairService.GetRepairByIdAsync(id);
                return Ok(repair);
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
        public async Task<IActionResult> AddRepair([FromBody] RepairDTO repairDto)
        {
            try
            {
                if (!Request.Cookies.TryGetValue("userId", out var userId))
                {
                    return Unauthorized("Ο χρήστης δεν είναι συνδεδεμένος.");
                }

                var property = await _propertyService.GetPropertyByIdAsync(repairDto.PropertyId);
                if (property == null || property.UserId != Guid.Parse(userId))
                {
                    return Unauthorized("Το ακίνητο δεν ανήκει στον χρήστη.");
                }

                var repair = new Repair
                {
                    Description = repairDto.Description,
                    RepairDate = repairDto.RepairDate ?? DateTime.Now,
                    Cost = repairDto.Cost ?? 0,
                    Type = repairDto.Type,
                    Status = "Pending",
                    PropertyId = repairDto.PropertyId
                };

                await _repairService.AddRepairAsync(repair);
                return CreatedAtAction(nameof(GetRepair), new { id = repair.Id }, repair);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRepair(Guid id, [FromBody] Repair repair)
        {
            try
            {
                repair.Id = id;
                await _repairService.UpdateRepairAsync(repair);
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
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            try
            {
                await _repairService.DeleteRepairAsync(id);
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