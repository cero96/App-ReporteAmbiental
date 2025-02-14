setear proyecto con git flow 

git branch develop
git flow init 
git push -u origin develop
git checkout -b feature/1GitFlow
git checkout develop
git merge feature_branch


# React + Vite
Comando Utilizados 

-- Creacion de proyecto React + vite 

npm create vite@latest

--instalar Dependecia

npm install 

-- levantar el servidor
npm run dev 

npm install bootstrap


npm install react-router-dom
npm install react-chartjs-2 chart.js


script creacion de tablas 
 CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "appliances" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" varchar(255) NOT NULL,
  "brand" varchar(255),
  "model" varchar(255),
  "type" varchar(255),
  "energy_rating" varchar(255),
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_appliances FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "appliance_features" (
  "id" serial PRIMARY KEY,
  "appliance_id" integer NOT NULL,
  "feature_name" varchar(255) NOT NULL,
  "feature_value" varchar(255),
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_appliance_features FOREIGN KEY ("appliance_id") REFERENCES "appliances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "comparisons" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "description" text,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users_comparisons" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "comparison_id" integer NOT NULL,
  "comparison_result" jsonb,
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_comparisons_user FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_users_comparisons_comparison FOREIGN KEY ("comparison_id") REFERENCES "comparisons" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "consumption_history" (
  "id" serial PRIMARY KEY,
  "appliance_id" integer NOT NULL,
  "date" timestamp NOT NULL,
  "consumption_kwh" decimal(10,2),
  "carbon_footprint_kg" decimal(10,2),
  "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_consumption_history FOREIGN KEY ("appliance_id") REFERENCES "appliances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);