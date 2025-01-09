using Microsoft.EntityFrameworkCore;
using Backend.Data;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddSwaggerGen();

        // Add database context
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase("ShoppingDb"));

        // Add CORS configuration
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin() // Allow requests from any origin
                       .AllowAnyMethod() // Allow any HTTP method
                       .AllowAnyHeader(); // Allow any headers
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShoppingAPI v1"));
        }

        // Enable CORS
        app.UseCors("AllowAll");

        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}