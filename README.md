 Portfolio & DevOps Showcase

[![CI/CD Pipeline](https://github.com/wildmarck/portfolio-mbenda/actions/workflows/main.yml/badge.svg)](https://github.com/wildmarck/portfolio-mbenda/actions/workflows/main.yml)
[![Docker Image](https://img.shields.io/badge/docker-pull-blue)](https://hub.docker.com/r/wildmarckgamming/portfolio)
[![Terraform](https://img.shields.io/badge/terraform-managed-purple)](https://www.terraform.io/)

Ce projet est une démonstration d'un flux de travail **DevOps complet**, intégrant des pratiques modernes (Conteneurisation, IaC) tout en assurant le maintien de systèmes legacy (déploiement FTP).

##  Architecture du Projet

Le projet suit une approche **Hybride** pour démontrer la flexibilité des outils DevOps :

1.  **Infrastructure as Code (IaC) :** Utilisation de **Terraform** pour gérer l'environnement de développement local (orchestration Docker locale).
2.  **Conteneurisation :** Le site est empaqueté via **Docker** (Nginx Alpine) pour assurer la portabilité.
3.  **CI/CD (GitHub Actions) :**
    * **Quality Gate :** Vérification automatique du style du code (Linting Terraform).
    * **Modern Delivery :** Build et Push de l'image sur **Docker Hub**.
    * **Legacy Deployment :** Déploiement automatique des fichiers sources sur un serveur **FTP** (InfinityFree).

##  Démarrage Rapide (Local)

Prérequis : [Terraform](https://www.terraform.io/) et [Docker](https://www.docker.com/).

Cloner le projet et lancer l'environnement via Terraform :

```bash
git clone [https://github.com/wildmarck/portfolio-mbenda.git](https://github.com/wildmarck/portfolio-mbenda.git)
cd portfolio-mbenda

# Initialiser et appliquer l'infra locale
terraform init
terraform apply