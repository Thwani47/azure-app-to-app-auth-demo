using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = builder.Environment.ApplicationName,
        Version = "v1"
    });
});
builder.Services.AddDbContext<TodoDb>(options => options.UseInMemoryDatabase("Todos"));

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{builder.Environment.ApplicationName} v1"));

// Get All Todos
app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync());

// Get Todo by ID
app.MapGet("/todo/{id:guid}", async (Guid id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);
    return todo == null ? Results.NotFound() : Results.Ok(todo);
});

// Get complete todos
app.MapGet("/todos/complete", async (TodoDb db) => await db.Todos.Where(todo => todo.IsComplete).ToListAsync());

// Create todo
app.MapPost("/todo", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todo/{todo.Id}", todo);
});

// Update Todo
app.MapPut("/todo/{id:guid}", async (Guid id, Todo update, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo == null)
    {
        return Results.NotFound();
    }

    todo.Title = update.Title == null ?   todo.Title : update.Title;
    todo.IsComplete = update.IsComplete;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Delete Todo
app.MapDelete("/todo/{id:guid}", async (Guid id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo == null)
    {
        return Results.NotFound();
    }

    db.Todos.Remove(todo);

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
