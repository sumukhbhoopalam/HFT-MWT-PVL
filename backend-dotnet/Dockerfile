# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Development

# Install curl in the base runtime image
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Build image with the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything into the container
COPY . .

# Restore dependencies
RUN dotnet restore

# Build the app
RUN dotnet build -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Final runtime image
FROM base AS final
WORKDIR /app

# Copy published app to the runtime image
COPY --from=publish /app/publish .

# Entry point for the application
ENTRYPOINT ["dotnet", "backend-dotnet.dll"]