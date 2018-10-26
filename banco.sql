create database desafioSP;

use desafioSP;

create table if not exists users(
    id int auto_increment primary key,
    name varchar(64),
    email varchar(64),
    password varchar(64),
    dt_nasc date 
)default charset=utf8;