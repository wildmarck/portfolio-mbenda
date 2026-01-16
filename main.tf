terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

variable "container_name" {
  description = "Portfolio"
  type        = string
  default     = "site_web_etudiant_devops"
}

resource "docker_image" "nginx" {
  name         = "nginx:alpine"
  keep_locally = false
}

resource "docker_container" "site_web" {
  image = docker_image.nginx.image_id
  name  = var.container_name
  
  ports {
    internal = 80
    external = 8080
  }

  # --- C'EST ICI QUE LA MAGIE OPÈRE ---
  # On dit au conteneur : "Remplace ton dossier html par mon dossier actuel"
  volumes {
    host_path      = abspath(path.cwd)        # Chemin absolu de ton dossier projet
    container_path = "/usr/share/nginx/html"  # Dossier cible dans Nginx
  }
}