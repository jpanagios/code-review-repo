using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TechnicoBackend.Models;
using TechnicoBackend.Repositories;

namespace TechnicoBackend.Services
{
    public class RepairService
    {
        private readonly RepairRepository _repairRepository;
        private readonly PropertyRepository _propertyRepository;

        public RepairService(RepairRepository repairRepository, PropertyRepository propertyRepository)
        {
            _repairRepository = repairRepository;
            _propertyRepository = propertyRepository;
        }

        public async Task<Repair?> GetRepairByIdAsync(Guid repairId)
        {
            var repair = await _repairRepository.GetByIdAsync(repairId);
            if (repair == null)
            {
                throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
            }
            return repair;
        }

        public async Task<List<Repair>> GetAllRepairsAsync()
        {
            return await _repairRepository.GetAllAsync();
        }

        public async Task AddRepairAsync(Repair repair)
        {
            var property = await _propertyRepository.GetByIdAsync(repair.PropertyId);
            if (property == null)
            {
                throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");
            }

            repair.RepairAddress = property.Address;

            await _repairRepository.AddAsync(repair);
        }

        public async Task UpdateRepairAsync(Repair repair)
        {
            var existingRepair = await _repairRepository.GetByIdAsync(repair.Id);
            if (existingRepair == null)
            {
                throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
            }

            existingRepair.Description = repair.Description;
            existingRepair.RepairDate = repair.RepairDate;
            existingRepair.Cost = repair.Cost;
            existingRepair.Type = repair.Type;
            existingRepair.Status = repair.Status;

            await _repairRepository.UpdateAsync(existingRepair);
        }

        public async Task DeleteRepairAsync(Guid repairId)
        {
            var repair = await _repairRepository.GetByIdAsync(repairId);
            if (repair == null)
            {
                throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
            }
            await _repairRepository.DeleteAsync(repairId);
        }
    }
}