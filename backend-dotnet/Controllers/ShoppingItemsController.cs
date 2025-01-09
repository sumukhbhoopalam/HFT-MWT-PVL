using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShoppingItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetShoppingItems()
        {
            return await _context.ShoppingItems.ToListAsync();
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<ShoppingItem>> GetShoppingItemByName(string name)
        {
            var item = await _context.ShoppingItems.FirstOrDefaultAsync(i => i.Name == name);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingItem>> CreateShoppingItem(ShoppingItem shoppingItem)
        {
            _context.ShoppingItems.Add(shoppingItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingItemByName), new { name = shoppingItem.Name }, shoppingItem);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateShoppingItem(string name, ShoppingItem shoppingItem)
        {
            var item = await _context.ShoppingItems.FirstOrDefaultAsync(i => i.Name == name);

            if (item == null)
            {
                return NotFound();
            }

            item.Amount = shoppingItem.Amount;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteShoppingItem(string name)
        {
            var item = await _context.ShoppingItems.FirstOrDefaultAsync(i => i.Name == name);

            if (item == null)
            {
                return NotFound();
            }

            _context.ShoppingItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
