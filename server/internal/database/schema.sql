create database "ingenieria";

create table "user" (
    "id"       bigserial primary key,
	"name"     varchar not null unique,
	"email"    varchar not null unique,
	"phone"    varchar not null unique,
	"password" varchar not null,
	"role"     varchar not null default 'user'
);


create table "feedback" (
    "id" bigserial primary key,
	"username" varchar not null,
	"email" varchar not null,
	"message"  varchar not null,
	"created" time not null default now(),
	"estado" varchar not null default 'no_leido'
);



create table "servicio" (
	id bigserial primary key,
	nombre varchar not null unique,
	price int not null default 0,
	descripcion varchar not null,
	imgpath varchar not null unique
);

create table "pedido" (
	id              bigserial,
	idservico       bigint not null references "servicio"(id),
	userid          bigint not null references "user"(id),
	phone           text not null,
	municipio       varchar not null,
	addressreference text not null,
	fechainicio      date not null,
	fechaculminacion date not null,
	status varchar not null default 'no atendido'
);



create table "producto" (
	id      bigserial primary key,
	nombre  varchar not null unique,
	precio  int    not null,
	imgpath varchar not null
);




create table "subscripcion" (
	id bigserial primary key,
	email varchar not null unique
);


create table "notification" (
	id bigserial primary key,
	userid bigint not null references "user"("id"),
	texto text not null,
    visto boolean default false
);


