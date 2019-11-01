CREATE DATABASE M_Cleveland

USE M_Cleveland

CREATE TABLE Medicos(
	IdMedico INT PRIMARY KEY IDENTITY,
	Nome VARCHAR(100) not null ,
	DataNascimento date not null,
	Crm VARCHAR(100) NOT NULL unique,
	Especialidade VARCHAR(100) NOT NULL,
	Status VARCHAR(100) NOT NULL
	);

	DROP TABLE Medicos

INSERT INTO Medicos(Nome, DataNascimento, Crm, Especialidade, Status) 
VALUES ('Lucas Alvarez','09/09/1970','015498', 'Ortopedista','Ativo')

INSERT INTO Medicos(Nome, DataNascimento, Crm, Especialidade, Status) 
VALUES ('Jorge Fernando','17/05/1985','159624', 'Cardiologista','Ativo')


