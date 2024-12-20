# Use an official FastAPI image with Uvicorn and Gunicorn for production
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# Set the working directory in the container to /app
WORKDIR /app

# Copy requirements.txt into the container at /app
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the /app/app folder in the container
COPY ./app /app/app

# Expose port 80 (for FastAPI in production)
EXPOSE 80

# Command to run the FastAPI app using Uvicorn (this is the entry point)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]