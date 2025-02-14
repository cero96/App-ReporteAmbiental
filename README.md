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
  "name" varchar(255),
  "email" varchar(255) UNIQUE,
  "password" varchar(255),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "appliances" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "name" varchar(255),
  "brand" varchar(255),
  "model" varchar(255),
  "type" varchar(255),
  "energy_rating" varchar(255),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "appliance_features" (
  "id" serial PRIMARY KEY,
  "appliance_id" integer,
  "feature_name" varchar(255),
  "feature_value" varchar(255),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "comparisons" (
  "id" serial PRIMARY KEY,
  "name" varchar(255),
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "users_comparisons" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "comparison_id" integer,
  "comparison_result" jsonb,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "consumption_history" (
  "id" serial PRIMARY KEY,
  "appliance_id" integer,
  "date" timestamp,
  "consumption_kwh" decimal(10,2),
  "carbon_footprint_kg" decimal(10,2),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "appliances" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "appliance_features" ADD FOREIGN KEY ("appliance_id") REFERENCES "appliances" ("id");

ALTER TABLE "user_comparisons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_comparisons" ADD FOREIGN KEY ("comparison_id") REFERENCES "comparisons" ("id");

ALTER TABLE "consumption_history" ADD FOREIGN KEY ("appliance_id") REFERENCES "appliances" ("id");
