using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Data;
using TechnicoBackend.Models;

namespace TechnicoBackend.Repositories
{
    public class RepairRepository
    {
        private readonly TechnicoDbContext _context;

        public RepairRepository(TechnicoDbContext context)
        {
            _context = context;
        }

        public async Task<Repair?> GetByIdAsync(Guid id)
        {
            return await _context.Repairs
                .Include(r => r.Property)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Repair>> GetAllAsync()
        {
            return await _context.Repairs
                .Include(r => r.Property)
                .ToListAsync();
        }

        public async Task AddAsync(Repair repair)
        {
            await _context.Repairs.AddAsync(repair);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Repair repair)
        {
            _context.Repairs.Update(repair);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var repair = await GetByIdAsync(id);
            if (repair != null)
            {
                _context.Repairs.Remove(repair);
                await _context.SaveChangesAsync();
            }
        }
    }
}