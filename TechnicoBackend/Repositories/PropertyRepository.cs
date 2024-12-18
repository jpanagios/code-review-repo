using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Data;
using TechnicoBackend.Models;

namespace TechnicoBackend.Repositories
{
    public class PropertyRepository
    {
        private readonly TechnicoDbContext _context;

        public PropertyRepository(TechnicoDbContext context)
        {
            _context = context;
        }

        public async Task<Property?> GetByIdAsync(Guid id)
        {
            return await _context.Properties
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Property>> GetAllAsync()
        {
            return await _context.Properties
                .ToListAsync();
        }

        public async Task AddAsync(Property property)
        {
            await _context.Properties.AddAsync(property);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Property property)
        {
            _context.Properties.Update(property);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var property = await GetByIdAsync(id);
            if (property != null)
            {
                _context.Properties.Remove(property);
                await _context.SaveChangesAsync();
            }
        }

    }
}