create database GESGAS;
use GESGAS;

create table user_info(
id_user int primary key not null auto_increment,
username varchar(50),
pass BLOB,
email varchar(50)
);

create table gastos(
id_gasto int primary key not null auto_increment,
fecha date,
cantidad dec(9,2),
id_categoria int,
Foreign key (id_categoria) references categorias(id_categoria)
);

create table categorias(
id_categoria int primary key not null auto_increment,
nombre varchar(50)
);

INSERT INTO categorias (nombre) VALUES
('Transporte'),
('Ocio'),
('Alimentación'),
('Trabajo'),
('Hogar'),
('Ropa'),
('Otras compras'),
('Salud');

insert into user_info values (1, "sergiong", "usuario","serg@gmail.com");
select * from categorias;
select * from gastos order by fecha;

/*Procedimiento para insertar registros aleatorios en la tabla gastos. OK*/
delimiter //
create procedure fast_insert(cant int)
begin
declare dia int;
declare mes int;
declare año int;
declare fecha date;
declare cantidad dec(9,2);
declare id_categoria int;
declare cont int;

set cont=1;
while(cont<=cant) do

set dia=floor(rand()*(31-1+1)+1);
set mes=floor(rand()*(12-1+1)+1);
if((mes in(4,6,9,11) and dia=31) or (mes=2 and dia>28)) then
set dia=floor(rand()*(31-1+1)+1);
end if;
set año=floor(rand()*(2023-2020+1)+2020);

set fecha=str_to_date(concat(año,'-',LPAD(mes,2,'0'),'-',LPAD(dia,2,'0')), '%Y-%m-%d'); /*Fecha se genera ok*/

while(fecha>curdate()) do
set dia=floor(rand()*(31-1+1)+1);
set mes=floor(rand()*(12-1+1)+1);
if((mes in(4,6,9,11) and dia=31) or (mes=2 and dia>28)) then
set dia=floor(rand()*(31-1+1)+1);
end if;
set año=floor(rand()*(2023-2020+1)+2020);

set fecha=str_to_date(concat(año,'-',LPAD(mes,2,'0'),'-',LPAD(dia,2,'0')), '%Y-%m-%d'); /*Fecha se genera ok*/
end while;

set cantidad=rand()*(500-1+1)+1; /*Cantidad ok*/
set id_categoria=floor(rand()*(8-1+1)+1);

insert into gastos (fecha, cantidad, id_categoria) values(fecha, cantidad, id_categoria);
set cont=cont+1;

end while;

end //

call fast_insert(100);

alter table gastos add column asunto varchar(20);

select fecha, sum(cantidad) from gastos  where year(fecha)=2023 and month(fecha)=05 group by fecha order by fecha ;
SELECT YEAR(fecha) as AÑOS, SUM(cantidad) as TOTAL FROM gastos GROUP BY YEAR(fecha);
SELECT YEAR(fecha) as AÑO, MONTH(fecha) as MES, SUM(cantidad) as TOTAL FROM gastos GROUP BY MONTH(fecha), YEAR(fecha) ORDER BY YEAR(fecha), MONTH(fecha);
SELECT YEAR(fecha) as AÑO, MONTH(fecha) as MES, SUM(cantidad) as TOTAL FROM gastos GROUP BY MONTH(fecha), YEAR(fecha) ORDER BY YEAR(fecha), MONTH(fecha), DAY(FECHA);
SELECT fecha as ANIO, DAY(fecha) as DIA, sum(cantidad) AS GASTO FROM gastos WHERE YEAR(fecha)='2023' AND MONTH(fecha)='05' group by DAY(fecha), MONTH(fecha) ORDER BY DIA;


select fecha, sum(cantidad), cat.nombre from gastos as gast inner join categorias as cat on gast.id_categoria=cat.id_categoria where year(fecha)=2023 group by cat.nombre, year(fecha) order by fecha desc;
select asunto, fecha, sum(cantidad), cat.nombre from gastos as gast inner join categorias as cat on gast.id_categoria=cat.id_categoria where year(fecha)=2023 and month(fecha)=08 group by cat.nombre, month(fecha), year(fecha) order by fecha desc;


alter table user_info add column primer_apellido varchar(20);
insert into user_info values (1, "Sergio N.", aes_encrypt("usuario", "666"), "serfer65@gmail.com", 675234897, "C\ Alcalde Joaquin, Nº35"); 
alter table user_info add column telefono dec(9,0);
alter table user_info add column direccion varchar(60);
alter table user_info rename column username to Nombre;
update user_info set Nombre="Sergio", primer_apellido="Navarro" where id_user=1;
select distinct YEAR(fecha) as años from gastos order by años;
select Nombre, primer_apellido, email, telefono, direccion from user_info;
select * from gastos order by fecha desc;
select cat.nombre, fecha, cantidad from gastos as gast inner join categorias as cat on gast.id_categoria=cat.id_categoria where year(fecha)=2023 group by cat.nombre order by cat.nombre;
select cat.nombre, fecha, cantidad from gastos as gast inner join categorias as cat on gast.id_categoria=cat.id_categoria where year(fecha)=2023 and month(fecha)=08 group by cat.nombre order by cat.nombre;