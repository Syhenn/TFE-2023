# Étape de construction
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copier les fichiers de l'application
COPY . .

# Restaurer les dépendances et construire l'application
RUN dotnet restore
RUN dotnet build --no-restore --configuration Release

# Étape de publication
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS publish
WORKDIR /app
COPY --from=build /src/CodingTime.API/bin/Release/net6.0/publish .

# Exposer le port de l'application
EXPOSE 7227

# Exécuter l'application
ENTRYPOINT ["dotnet", "CodingTime.API.dll"]
