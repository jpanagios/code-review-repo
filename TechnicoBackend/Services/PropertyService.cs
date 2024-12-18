using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechnicoBackend.Models;
using TechnicoBackend.DTOs;
using TechnicoBackend.Repositories;

namespace TechnicoBackend.Services
{
    public class PropertyService
    {
        private readonly PropertyRepository _propertyRepository;

        public PropertyService(PropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        public async Task<List<Property>> GetPropertiesByUserIdAsync(Guid userId)
        {
            var properties = await _propertyRepository.GetAllAsync();
            return properties.Where(p => p.UserId == userId).ToList();
        }

        public async Task<Property?> GetPropertyByIdAsync(Guid propertyId)
        {
            var property = await _propertyRepository.GetByIdAsync(propertyId);

            if (property == null)
                throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");

            return property;
        }

        public async Task<Property> AddPropertyAsync(PropertyDTO propertyDto)
        {
            var property = new Property
            {
                Address = propertyDto.Address,
                City = propertyDto.City,
                PostalCode = propertyDto.PostalCode,
                UserId = propertyDto.UserId
            };

            await _propertyRepository.AddAsync(property);
            return property;
        }

        public async Task UpdatePropertyAsync(Guid id, PropertyDTO propertyDto)
        {
            var property = await _propertyRepository.GetByIdAsync(id);
            if (property == null)
                throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");

            property.Address = propertyDto.Address;
            property.City = propertyDto.City;
            property.PostalCode = propertyDto.PostalCode;

            await _propertyRepository.UpdateAsync(property);
        }

        public async Task DeletePropertyAsync(Guid propertyId)
        {
            var property = await _propertyRepository.GetByIdAsync(propertyId);
            if (property == null)
                throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");

            await _propertyRepository.DeleteAsync(propertyId);
        }
    }
}
