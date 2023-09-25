CREATE DATABASE marketart;
USE marketart;

CREATE TABLE user_info(
id_user int primary key not null auto_increment,
nombre varchar(30),
primer_apellido varchar(30),
segundo_apellido varchar(30),
correo varchar(50) not null,
telefono dec(9,0),
direccion varchar(120),
contraseña_hash varchar(128) not null,
UNIQUE(correo)
);


CREATE TABLE categorias(
id_categoria int primary key not null auto_increment,
nombre varchar(30),
id_categoria_padre int
);

CREATE TABLE productos(
id_producto int primary key not null auto_increment,
nombre varchar(30),
descripcion varchar(400),
precio_unitario dec(4,2),
id_categoria int,
url_imagen varchar(200),
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE pedidos(
id_pedido int primary key not null auto_increment,
fecha datetime,
estado ENUM('en espera', 'pagado', 'enviado', 'entregado') default('en espera'),
id_cliente int,
gasto_total dec(6,2),
FOREIGN KEY (id_cliente) REFERENCES user_info(id_user)
);



alter table pedidos add column gasto_total dec(6,2);

CREATE TABLE detalle_pedidos(
id_detalle_pedido int primary key not null auto_increment,
cantidad int,
id_pedido int,
id_producto int,
FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

INSERT INTO categorias VALUES
('1','Joyería',null),
('2','Colgantes','1'),
('3','Pulseras','1'),
('4','Anillos','1'),
('5','Accesorios',null),
('6','Bolsos','5'),
('7','Guantes','5'),
('8','Sombreros','5'),
('9','Artículos de papelería',null),
('10','Cuadernos','9'),
('11','Álbumes de fotos','9'),
('12','Calendarios','9'),
('13','Decoración del Hogar',null),
('14','Cojines','13'),
('15','Mantas','13'),
('16','Cuadros','13'),
('17','Cerámica y Alfarería',null),
('18','Platos y cuencos','17'),
('19','Tazas y vasos','17'),
('20','Figuras','17'),
('21','Jardinería',null),
('22','Macetas','21'),
('23','Herramientas','21');


insert into productos values
('1','Descubre el colgante que encapsula la belleza mística de la luna. Una obra de arte esculpida que añade un toque celestial y encanto a tu estilo.','39.99','2'),
('2','Eleva tu estilo con nuestro colgante dorado: una fusión perfecta de elegancia y modernidad. El delicado diseño en oro brillante aporta un toque de sofisticación a cualquier atuendo. ','35.60','2'),
('3','Descubre nuestra joya: el colgante Árbol de la Vida. Un poderoso símbolo de crecimiento, conexión y fortaleza. Con intrincados detalles, este colgante enriquece tu estilo con su significado atemporal. Hecho con esmero, es el accesorio perfecto para llevar contigo la profundidad de la vida en cada momento.','40.00','2'),
('4','Deslumbra con nuestro colgante dorado de Italia. El lujo cobra vida en este diseño exquisito, resaltado por detalles intrincados y piedras incrustadas. Convierte cualquier ocasión en un evento sofisticado con este accesorio audaz y elegante que refleja tu estilo único. Atrévete a brillar con la fuerza dorada.','89.99','2'),
('5','Cada pieza cuenta una historia única de destreza y pasión por la artesanía. La calidez de la madera se entrelaza con tu esencia, brindando un toque natural y auténtico a tu look. Lleva contigo la esencia de lo hecho a mano y conecta con la belleza de lo artesanal.','25.99','3'),
('6','Descubre la sutil elegancia de nuestra pulsera con bolas de madera artesanales. Cada cuenta cuenta una historia de habilidad y pasión. La cálida textura de la madera se entrelaza armoniosamente, aportando un toque orgánico a tu estilo. ','28.99','3'),
('7','Adorna tu muñeca con nuestra pulsera dorada de elegancia radiante. Cada cristal brillante, meticulosamente incrustado, captura la luz con un resplandor cautivador. La fusión de dorado y destellos añade un toque de glamour a cualquier atuendo. Celebra la sofisticación con esta joya deslumbrante, diseñada para destacar en tus momentos más especiales.','59.99','3'),
('8','Engalana tu muñeca con nuestra pulsera plateada, una obra de arte centelleante. Cada cristal brillante está meticulosamente incrustado para deslumbrar con cada movimiento. La elegancia del plateado se fusiona con el resplandor de los cristales, añadiendo un toque de lujo a cualquier ocasión. Deja que esta joya exquisita realce tu estilo con su destello único y atemporal.','40.00','3'),
('9','Descubre la belleza en la simplicidad con nuestro anillo plateado básico. Su diseño atemporal en plata resalta la elegancia en la sutileza. Perfecto para el uso diario o para combinar con otros accesorios. Este anillo es la expresión de la sofisticación discreta que complementa tu estilo con un toque versátil y refinado.','19.99','4'),
('10','Eleva tu estilo con nuestro anillo plateado doble, una fusión audaz de modernidad y elegancia. Dos bandas plateadas se entrelazan en un diseño único, simbolizando conexión y equilibrio. Perfecto para expresar tu estilo individual con un toque contemporáneo. Este anillo doble es la declaración de sofisticación que realza tus manos con un toque distintivo y chic.','24.99','4'),
('11','Descubre el encanto atemporal de nuestro anillo dorado con circonio. El cálido resplandor del oro realza la belleza de la piedra centelleante, creando una elegancia deslumbrante. Este anillo es el equilibrio perfecto entre sofisticación y brillo, ideal para acentuar tu estilo con un toque de lujo sutil. Lleva contigo la esencia de la distinción en cada ocasión.','27.99','4'),
('12','Reconcíliate con la elegancia moderna gracias a nuestro anillo plateado doble con topacio incrustado. Dos bandas entrelazadas en plata rodean con gracia una piedra centelleante, creando un equilibrio armonioso entre estilo y brillo. Este anillo encarna la sofisticación y la originalidad, ideal para elevar tu look con un toque de luminosidad y distinción.','29.99','4');

insert into productos values
('13','Lleva la primavera contigo con nuestro bolso artesanal de diseño exclusivo, desbordante de elegantes flores. Confeccionado a mano con atención al detalle, este bolso con estampado floral es una obra de arte funcional. Añade encanto natural a tu estilo mientras llevas contigo la esencia de la naturaleza. Moda artesanal que florece en cada paso.','39.99','6'),
('14','Descubre la vitalidad del color en nuestro bolso artesanal naranja. Hecho a mano con destreza y pasión, este accesorio fusiona estilo y funcionalidad de manera única. Lleva contigo un toque audaz y artesanal que complementa tu individualidad. El bolso perfecto para quienes buscan destacar con autenticidad en cada ocasión.','32.99','6'),
('15','Sumérgete en la sutileza del rosa con nuestro bolso artesanal. Creado meticulosamente a mano, este accesorio encarna la elegancia artesanal y la practicidad. Con un delicado tono rosa que evoca dulzura y estilo, este bolso refleja la esencia de la creatividad y la autenticidad. Lleva contigo un toque de encanto artesanal en cada paso que des.','29.99','6'),
('16','Explora la excelencia artesanal con nuestro bolso rosa de diseño único. Confeccionado meticulosamente a mano, este accesorio fusiona estilo y funcionalidad de manera excepcional. El diseño original captura la esencia de la individualidad, mientras que el suave tono rosa añade un toque de elegancia. Lleva contigo una pieza exclusiva que refleja tu autenticidad y amor por lo artesanal.','35.99','6'),
('17','Experimenta la pasión y el estilo con nuestros guantes artesanales rojos. Confeccionados meticulosamente para brindar calidez y elegancia. Elaborados a mano con amor, estos guantes son la fusión perfecta de comodidad y diseño vibrante. Añade un toque de color a tus días y mantén tus manos acogedoras con un toque artesanal.','12.99','7'),
('18','Descubre la alegría en cada detalle con nuestros guantes de cuero artesanales amarillos. Confeccionados con esmero para ofrecer confort y estilo único. Hechos a mano con dedicación, estos guantes fusionan perfectamente la calidez con el encanto artesanal. Agrega un toque radiante a tus atuendos mientras mantienes tus manos cómodas y alegres.','15.99','7'),
('19','Sumérgete en la elegancia atemporal con nuestros guantes artesanales de cuero marrón. Creados con destreza para ofrecer sofisticación y comodidad inigualables. Diseñados a mano con pasión, estos guantes representan la fusión perfecta entre estilo y durabilidad. Eleva tus looks con un toque de artesanía y brinda a tus manos el lujo del cuero genuino.','15.99','7'),
('20','Explora la versatilidad con nuestra colección de guantes artesanales de cuero en diversos colores. Diseñados con maestría para fusionar estilo y confort. Confeccionados a mano con dedicación, estos guantes son la expresión suprema de la artesanía. Elige entre una paleta de colores rica y añade un toque personalizado a tu vestuario mientras disfrutas de la calidad del cuero genuino.','11.99','7'),
('21','Encuentra encanto rústico en el sombrero de paja marrón. Hecho a mano con destreza, combina estilo y protección solar. Luce elegante y natural mientras te resguardas del sol con autenticidad artesanal.','11.99','8'),
('22','Sumérgete en la belleza floral con el sombrero de paja blanco adornado con flores. Creado a mano para un look único, combina elegancia y encanto primaveral. Disfruta el resplandor artesanal y floral.','14.99','8'),
('23','Captura la esencia del verano con el sombrero de paja beige. Hecho a mano con amor, brinda frescura y estilo. Disfruta el sol con autenticidad artesanal y un toque suave.','10.99','8'),
('24','Añade calidez con el sombrero de paja marrón oscuro. Confeccionado a mano, fusiona moda y funcionalidad. Descubre la artesanía y protege tu piel con un toque distintivo y elegante.','11.99','8');

insert into productos values
('25','Hecho a mano con meticulosa atención al detalle, su cubierta de cuero marrón evoca calidez y autenticidad. Con 200 páginas de papel reciclado de alta calidad, es el lienzo perfecto para plasmar tus pensamientos y creatividad. Un compañero inspirador para tus aventuras escritas.','6.00','10'),
('26','Explora nuestra colección de cuadernos artesanales. Elige entre una gama de vibrantes colores que se adaptan a tu estilo. Hechos a mano con esmero y con papel de alta calidad, estos cuadernos son ideales para capturar tus ideas con elegancia y originalidad.','8.00','10'),
('27','Descubre nuestra joya artesanal: el cuaderno negro. Elegante y atemporal, su cubierta de cuero cuidadosamente elaborada evoca sofisticación. Cada página de papel de calidad superior es una invitación a plasmar tus pensamientos, proyectos y creatividad. El complemento perfecto para aquellos que buscan la belleza en cada palabra.','9.00','10'),
('28','Sumérgete en la diversidad de nuestra colección de cuadernos artesanales con estampados únicos. Cada diseño es una obra de arte, meticulosamente creado para inspirar tu escritura. Elige entre una variedad de estampados originales que se adaptan a tu estilo y personalidad. Hechos a mano con pasión, cada cuaderno es una expresión de creatividad y funcionalidad en perfecta armonía.','5.00','10'),
('29','Descubre nuestro álbum de fotos artesanal en cautivador rojo. Creado para atesorar tus recuerdos con estilo y pasión. Las páginas de alta calidad preservarán tus momentos más preciados. Confeccionado a mano con atención artesana, es el regalo perfecto para capturar y compartir emociones en un elegante lienzo rojo.','7.99','11'),
('30','Explora nuestro álbum de fotos artesanal en negro, la elegancia clásica redefinida. Cada página cuenta historias a través de tus imágenes más queridas. Elaborado meticulosamente a mano, su cubierta de cuero negro genuino emana sofisticación atemporal. Preserva tus memorias con estilo y distinción, o regala emociones enmarcadas en este tesoro artesano.','10.99','11'),
('31','Descubre nuestro calendario de mesa artesanal, fusionando utilidad y belleza. Diseñado meticulosamente para acompañarte día a día, sus páginas exhiben ilustraciones únicas mientras mantienen la organización. Hecho a mano con atención artesana y materiales de calidad, es una obra práctica que agrega encanto a tu espacio. Refleja tu estilo con este imprescindible funcional y estético.','6.00','12'),
('32','Explora nuestro encantador calendario mini artesanal. Con detalles meticulosos y creatividad palpable, este diminuto tesoro es perfecto para dar vida a espacios reducidos. Añade un toque de estilo a la organización diaria. Hecho a mano con pasión y atención al detalle, es un regalo encantador que celebra la practicidad y la artesanía.','4.00','12'),
('33','Eleva tu entorno con nuestro calendario de mesa artesanal. Creado con pasión y maestría, combina estilo y practicidad. Cada página mensual es una exhibición de diseño meticuloso. Hecho a mano con los mejores materiales, este calendario no solo te mantiene al día, sino que también añade un toque de artesanía a tu día a día.','6.00','12'),
('34','Descubre nuestro calendario de pared artesanal: una fusión de funcionalidad y estética. Cada mes cobra vida con ilustraciones meticulosamente elaboradas. Hecho a mano con pasión y materiales excepcionales, este calendario organiza tu tiempo y decora tu espacio con autenticidad artesanal. Celebra cada día con estilo y practicidad.','7.00','12');

insert into productos values
('35','Dale un toque natural a tu espacio con nuestro cojín artesanal de cactus. El estampado cautivador de cactus añade un encanto desértico único. Hecho a mano con amor, este cojín fusiona estilo y comodidad de manera perfecta. Eleva tu decoración con este toque de naturaleza tejido en cada puntada.','8.99','14'),
('36','Agrega elegancia a tu hogar con nuestro cojín artesanal blanco con flecos. Creado meticulosamente para realzar cualquier espacio con su diseño sofisticado y textura única. Los sutiles flecos añaden un toque de movimiento y estilo. Transforma tu ambiente con este cojín de calidad que combina artesanía y confort de manera excepcional.','9.99','14'),
('37','Eleva tu decoración con nuestro cojín artesanal de rayas minimalista. El estampado de líneas limpias y modernas añade un toque de sofisticación a tu espacio. Confeccionado a mano con atención al detalle, este cojín combina estilo y confort a la perfección. Agrega un toque de sencilla elegancia a tu hogar con este accesorio de alta calidad y diseño atemporal.','8.99','14'),
('38','Descubre la serenidad del diseño artesanal con nuestro cojín gris. Su tonalidad versátil se integra sin esfuerzo en cualquier ambiente. Confeccionado a mano con pasión y destreza, este cojín ofrece comodidad y estilo en uno. Añade un toque de elegancia sutil a tu hogar con este accesorio cuidadosamente elaborado que refleja la belleza de la artesanía.','8.99','14'),
('39','Sumérgete en el lujo con nuestra manta artesanal de terciopelo. Su textura exquisita acaricia la piel mientras brinda calidez. Confeccionada a mano con habilidad experta, esta manta fusiona confort y elegancia. Añade un toque de sofisticación a tus momentos de relajación con este accesorio de alta calidad que captura la esencia misma de la artesanía.','9.99','15'),
('40','Abrázate a la comodidad con nuestras mantas de punto artesanales, disponibles en variados diseños. Cada manta cuenta una historia única, tejida a mano con destreza. Elige entre estilos que reflejan la esencia de la artesanía. Aporta calidez y estilo a tus momentos de descanso con estas mantas de alta calidad, donde la tradición y la creatividad se entrelazan amorosamente.','8.99','15'),
('41','Envuélvete en lujo con nuestra manta de pelo gris artesanal. La suavidad del pelo sintético ofrece calidez y textura única. Cada hebra está cuidadosamente tejida a mano, reflejando la pasión por la artesanía. Eleva tus momentos de confort con esta manta de alta calidad, donde el estilo y la habilidad se entrelazan en un abrazo acogedor.','9.99','15'),
('42','Sumérgete en la calidez y estilo con nuestra manta artesanal azul, adornada con suaves pelos en los bordes. Cada detalle refleja la dedicación de nuestros artesanos. La combinación del tono azul y los pelos agrega un toque de lujo a tu espacio. Disfruta de la comodidad y distinción que solo una creación artesanal puede brindar, elevando tus momentos de descanso con autenticidad y encanto.','8.99','15'),
('43','Captura la belleza efímera con nuestro cuadro artesanal de una flor rosa. Cada pincelada refleja la delicadeza y pasión de nuestros artistas. El vibrante rosa cobra vida en este retrato único de la naturaleza. Añade un toque de frescura y elegancia a tu espacio con esta obra que celebra la artesanía y la belleza etérea de las flores.','25.99','16'),
('44','Explora la creatividad con nuestro cuadro artesanal amarillo compuesto por múltiples cuadrados. Cada bloque es una pieza única, unida con habilidad artesanal. El tono amarillo vibrante irradia energía positiva, iluminando tu espacio. Aporta un toque contemporáneo y artístico a tu decoración, con esta obra que refleja la destreza y pasión por la creación manual.','35.99','16'),
('45','Nuestra obra artesanal presenta una catedral en estilo minimalista. Cada línea y espacio esculpen su esencia con elegancia. La sutileza de tonos y formas realza su belleza icónica. Agrega un toque de serenidad y armonía a tus espacios con esta pieza que captura la majestuosidad en su forma más simple, celebrando la artesanía y la grandeza atemporal.','10.99','16'),
('46','Descubre la profundidad de la simplicidad con nuestro cuadro artesanal de fondo negro y frase central. La tipografía cuidadosamente seleccionada resalta en contraste. Cada detalle es creado con pasión y habilidad. Añade un toque de elegancia minimalista y significado a tu espacio con esta pieza que combina artesanía y expresión en un equilibrio perfecto.','15.99','16');

insert into productos values
('47','Nuestro plato artesanal blanco, salpicado de delicados puntitos, evoca encanto y originalidad. Cada punto es cuidadosamente aplicado a mano, reflejando la destreza del artesano. La simplicidad y el detalle se unen en este diseño único. Eleva tu experiencia culinaria con este plato que fusiona estilo y autenticidad, capturando la esencia de la artesanía en cada comida.','4.99','18'),
('48','Explora la calidez natural con nuestro cuenco artesanal de madera. Tallado con maestría, cada surco y textura cuenta una historia única. El tono cálido y los detalles naturales hacen de este cuenco un tesoro rústico. Disfruta de la autenticidad y funcionalidad en cada uso, llevando la artesanía a tu mesa y conectando con la naturaleza en cada bocado.','2.99','18'),
('49','Descubre la elegancia artesanal con nuestro plato a cuadros. El estampado geométrico es realizado a mano con esmero, reflejando la destreza del artesano. Cada cuadro es una obra maestra de diseño y creatividad. Agrega estilo y encanto a tus comidas con este plato único que combina la tradición y la innovación en una pieza funcional y estética.','5.99','18'),
('50','Nuestro bol artesanal blanco encarna la belleza de la simplicidad. Moldeado a mano con precisión, su forma ergonómica y tono puro destacan la artesanía única. Un lienzo en blanco para tus creaciones culinarias, este bol combina funcionalidad y estilo, aportando autenticidad y calidad a cada comida que sirves.','4.99','18'),
('51','Añade diversión a tu rutina con nuestras tazas artesanales con caritas dibujadas. Cada expresión simple está cuidadosamente creada a mano, añadiendo carácter a tu bebida favorita. Estas tazas únicas reflejan la creatividad del artesano y te acompañarán con alegría en cada sorbo. Celebra la artesanía y la sonrisa en tu día a día con estas tazas encantadoras y auténticas.','7.99','19'),
('52','Descubre la elegancia en la simplicidad con nuestro vaso circular artesanal blanco. Moldeado a mano con precisión, su forma suave y tono puro resaltan la artesanía cuidadosa. Disfruta de tus bebidas con autenticidad y estilo, mientras este vaso se convierte en un compañero fiel en tus momentos cotidianos. Cada sorbo es una experiencia única de calidad y diseño.','5.99','19'),
('53','Explora la autenticidad con nuestras tazas de arcilla artesanales. Cada taza es moldeada a mano con amor y experiencia, lo que resulta en una textura y forma únicas. El encanto terroso de la arcilla añade calidez a tus momentos de bebida. Disfruta de la sensación artesanal en cada sorbo, conectando con la tradición y el trabajo dedicado detrás de cada taza.','2.99','19'),
('54','Descubre la sutil elegancia con nuestras tazas artesanales blancas de puntitos. Cada punto es aplicado a mano con cuidado, creando un diseño único en cada taza. La combinación del blanco puro y los detalles juguetones agrega un toque de encanto a tu experiencia de bebida. Celebra la artesanía en cada sorbo mientras disfrutas de la funcionalidad y belleza de estas tazas que hacen de cada momento una ocasión especial.','6.99','19'),
('55','Revive la magia de la película con nuestra figura artesanal del Gigante de Hierro. Cada detalle está esculpido con pasión y precisión, capturando la esencia de este icónico personaje. Hecho a mano con destreza, esta figura evoca nostalgia y admiración. Celebra la artesanía y la cultura pop en tu espacio, honrando la amistad entre humano y máquina en una pieza atemporal llena de significado.','9.99','20'),
('56','Sumérgete en la fantasía con nuestra figura artesanal de la mariposa humanoide dorada. Cada detalle reluce con maestría, capturando la belleza y la imaginación. Confeccionada a mano con pasión, esta figura evoca asombro y encanto. Celebra la creatividad y la artesanía en tu espacio, incorporando un toque de magia y misterio en esta pieza única que refleja el cruce entre naturaleza y humanidad.','12.99','20'),
('57','Embárcate en la aventura con nuestra figura artesanal de un gato astronauta. Cada detalle está meticulosamente esculpido, capturando la intriga y el encanto del espacio. Elaborada a mano con dedicación, esta figura evoca curiosidad y admiración. Celebra la creatividad y la artesanía en tu espacio, incorporando un toque de exploración y fantasía en esta pieza única que combina la dulzura felina con el vasto universo.','9.99','20'),
('58','Revive la saga con nuestra figura artesanal de Kylo Ren. Cada rasgo es esculpido con pasión, capturando la intensidad y carisma del personaje. Hecha a mano con destreza, esta figura evoca nostalgia y admiración. Celebra la artesanía y el legado en tu espacio, honrando la oscuridad y el conflicto en esta pieza única que rinde homenaje a una icónica historia galáctica.','20.99','20');

insert into productos values
('59','Añade naturalidad a tu espacio con nuestro macetero artesanal de madera. Cada detalle refleja la destreza del artesano, creando un hogar acogedor para tus plantas. La madera cálida y el diseño único fusionan funcionalidad y estilo. Eleva tu decoración con esta pieza que celebra la artesanía y la conexión con la naturaleza en cada brote que crece.','8.99','22'),
('60','Embellece tu entorno con nuestro macetero artesanal de aluminio, decorado con un encantador estampado floral. Cada flor es una obra de arte cuidadosamente esculpida. La fusión del aluminio duradero y el diseño vibrante crea un rincón de naturaleza en tu hogar. Celebra la creatividad y la funcionalidad con esta pieza que añade un toque de color y alegría a tus plantas.','9.99','22'),
('61','Agrega elegancia y brillo a tu espacio con nuestro macetero artesanal de color cobre. Su tono rico y cálido resalta la destreza del artesano. Moldeado con amor, este macetero combina funcionalidad y estilo de manera excepcional. Dale un toque de lujo a tus plantas y a tu decoración con esta pieza que celebra la artesanía y añade un toque de distinción a tus espacios verdes.','7.99','22'),
('62','Dale vida a tus plantas con nuestro macetero artesanal de arcilla, decorado con encantadoras franjas pintadas. Cada franja es trazada a mano, revelando la habilidad del artesano. La textura natural de la arcilla y el diseño vibrante se combinan en una pieza única. Celebra la creatividad y la conexión con la naturaleza al enmarcar tus plantas en este macetero.','12.99','22'),
('63','Encuentra la armonía en el riego con nuestra regadera artesanal azul. Moldeada con cuidado, su tono sereno refleja la destreza del artesano. Una fusión de funcionalidad y estilo, esta regadera se convierte en una pieza decorativa única. Celebra la artesanía y cuida tus plantas con elegancia, añadiendo un toque de frescura y autenticidad a tu jardín con cada gota de amor.','6.99','23'),
('64','Eleva tus labores de jardinería con nuestra pequeña pala de mano artesanal. Forjada con pasión, su diseño ergonómico refleja la destreza del artesano. La combinación de funcionalidad y belleza se une en esta herramienta esencial. Celebra la artesanía y cuida tus plantas con estilo, añadiendo un toque de autenticidad y comodidad a cada movimiento en tu jardín.','4.99','23'),
('65','Domina la poda con nuestras tijeras de podar artesanales. Diseñadas con maestría, cada corte es preciso y eficiente, destacando la destreza del artesano. La combinación de funcionalidad y durabilidad se encuentra en esta herramienta esencial. Celebra la artesanía y cuida tus plantas con estilo, añadiendo un toque de autenticidad y eficacia a cada paso en tu jardín.','8.99','23');

alter table productos add column url_imagen varchar(200);
/*JOYERÍA*/
/*Colgantes*/
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/1. Colgantes/colg1.jpg" where id_producto=1;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/1. Colgantes/colg2.jpg" where id_producto=2;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/1. Colgantes/colg3.jpg" where id_producto=3;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/1. Colgantes/colg4.jpg" where id_producto=4;

/*Pulseras*/
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/2. Pulseras/pul1.jpg" where id_producto=5;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/2. Pulseras/pul2.jpg" where id_producto=6;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/2. Pulseras/pul3.jpg" where id_producto=7;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/2. Pulseras/pul4.jpg" where id_producto=8;

/*Anillos*/
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/3. Anillos/ani1.jpg" where id_producto=9;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/3. Anillos/ani2.jpg" where id_producto=10;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/3. Anillos/ani3.jpg" where id_producto=11;
update productos set url_imagen="../../../assets/imagenes/1. Joyeria/3. Anillos/ani4.jpg" where id_producto=12;

/*ACCESORIOS*/
/*Bolsos*/
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/1. Bolsos/bol1.jpg" where id_producto=13;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/1. Bolsos/bol2.jpg" where id_producto=14;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/1. Bolsos/bol3.jpg" where id_producto=15;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/1. Bolsos/bol4.jpg" where id_producto=16;

/*Guantes*/
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/2. Guantes/gua1.jpg" where id_producto=17;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/2. Guantes/gua2.jpg" where id_producto=18;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/2. Guantes/gua3.jpg" where id_producto=19;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/2. Guantes/gua4.jpg" where id_producto=20;

/*Sombreros*/
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/3. Sombreros/somb1.jpg" where id_producto=21;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/3. Sombreros/somb2.jpg" where id_producto=22;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/3. Sombreros/somb3.jpg" where id_producto=23;
update productos set url_imagen="../../../assets/imagenes/2. Accesorios/3. Sombreros/somb4.jpg" where id_producto=24;

/*ARTÍCULOS DE PAPELERÍA*/
/*Cuadernos*/
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/1. Cuadernos/cuad1.jpg" where id_producto=25;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/1. Cuadernos/cuad2.jpg" where id_producto=26;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/1. Cuadernos/cuad3.jpg" where id_producto=27;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/1. Cuadernos/cuad4.jpg" where id_producto=28;

/*Álbumes de fotos*/
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/2. Álbumes/alb1.jpg" where id_producto=29;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/2. Álbumes/alb2.jpg" where id_producto=30;

/*Calendarios*/
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/3. Calendarios/cal1.jpg" where id_producto=31;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/3. Calendarios/cal2.jpg" where id_producto=32;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/3. Calendarios/cal3.jpg" where id_producto=33;
update productos set url_imagen="../../../assets/imagenes/3. Artículos de Papelería/3. Calendarios/cal4.jpg" where id_producto=34;

/*DECORACIÓN DEL HOGAR*/
/*Cojines*/
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/1. Cojines/coj1.jpg" where id_producto=35;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/1. Cojines/coj2.jpg" where id_producto=36;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/1. Cojines/coj3.jpg" where id_producto=37;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/1. Cojines/coj4.jpg" where id_producto=38;

/*Mantas*/
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/2. Mantas/man1.jpg" where id_producto=39;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/2. Mantas/man2.jpg" where id_producto=40;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/2. Mantas/man3.jpg" where id_producto=41;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/2. Mantas/man4.jpg" where id_producto=42;

/*Cuadros*/
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/3. Cuadros/cua1.jpg" where id_producto=43;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/3. Cuadros/cua2.jpg" where id_producto=44;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/3. Cuadros/cua3.jpg" where id_producto=45;
update productos set url_imagen="../../../assets/imagenes/4. Decoración del Hogar/3. Cuadros/cua4.jpg" where id_producto=46;


/*CERÁMICA Y ALFARERÍA*/
/*Platos y cuencos*/
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/1. Platos y cuencos/pla1.jpg" where id_producto=47;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/1. Platos y cuencos/pla2.jpg" where id_producto=48;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/1. Platos y cuencos/pla3.jpg" where id_producto=49;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/1. Platos y cuencos/pla4.jpg" where id_producto=50;

/*Tazas y vasos*/
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/2. Tazas y vasos/vas1.jpg" where id_producto=51;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/2. Tazas y vasos/vas2.jpg" where id_producto=52;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/2. Tazas y vasos/vas3.jpg" where id_producto=53;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/2. Tazas y vasos/vas4.jpg" where id_producto=54;

/*Figuras*/
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/3. Figuras/fig1.jpg" where id_producto=55;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/3. Figuras/fig2.jpg" where id_producto=56;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/3. Figuras/fig3.jpg" where id_producto=57;
update productos set url_imagen="../../../assets/imagenes/5. Cerámica y Alfarería/3. Figuras/fig4.jpg" where id_producto=58;

/*JARDINERÍA*/
/*Macetas*/
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/1. Macetas/mac1.jpg" where id_producto=59;
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/1. Macetas/mac2.jpg" where id_producto=60;
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/1. Macetas/mac3.jpg" where id_producto=61;
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/1. Macetas/mac4.jpg" where id_producto=62;

/*Herramientas*/
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/2. Herramientas jardin/her1.jpg" where id_producto=63;
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/2. Herramientas jardin/her2.jpg" where id_producto=64;
update productos set url_imagen="../../../assets/imagenes/6. Jardinería/2. Herramientas jardin/her3.jpg" where id_producto=65;



/*JOYERÍA*/
/*Colgantes*/
update productos set nombre="Colgante luna llena" where id_producto=1;
update productos set nombre="Colgante dorado amanecer" where id_producto=2;
update productos set nombre="Colgante árbol de vida" where id_producto=3;
update productos set nombre="Colgante luz radiante" where id_producto=4;

/*Pulseras*/
update productos set nombre="Pulsera cuentas de almendro" where id_producto=5;
update productos set nombre="Pulsera madera de roble" where id_producto=6;
update productos set nombre="Pulsera brillos dorados" where id_producto=7;
update productos set nombre="Pulsera plata 925" where id_producto=8;

/*Anillos*/
update productos set nombre="Anillo plata 925" where id_producto=9;
update productos set nombre="Anillo plata trenzado" where id_producto=10;
update productos set nombre="Anillo piedra preciosa" where id_producto=11;
update productos set nombre="Anillo de la corona" where id_producto=12;

/*ACCESORIOS*/
/*Bolsos*/
update productos set nombre="Bolso jungla salvaje" where id_producto=13;
update productos set nombre="Bolso cuero naranja" where id_producto=14;
update productos set nombre="Bolso Miami" where id_producto=15;
update productos set nombre="Bolso inspiración" where id_producto=16;

/*Guantes*/
update productos set nombre="Guantes terciopelo rojo" where id_producto=17;
update productos set nombre="Guantes cuero amarillo" where id_producto=18;
update productos set nombre="Guantes cuero marrón" where id_producto=19;
update productos set nombre="Guantes multicolor" where id_producto=20;

/*Sombreros*/
update productos set nombre="Sombrero paja" where id_producto=21;
update productos set nombre="Sombrero mimbre blanco" where id_producto=22;
update productos set nombre="Sombrero paja beige" where id_producto=23;
update productos set nombre="Sombrero fiesta" where id_producto=24;

/*ARTÍCULOS DE PAPELERÍA*/
/*Cuadernos*/
update productos set nombre="Cuaderno cartón reciclado" where id_producto=25;
update productos set nombre="Cuaderno multicolor" where id_producto=26;
update productos set nombre="Cuaderno cuero negro" where id_producto=27;
update productos set nombre="Cuaderno estampado" where id_producto=28;

/*Álbumes de fotos*/
update productos set nombre="Álbum tapa dura roja" where id_producto=29;
update productos set nombre="Álbum cuero negro" where id_producto=30;

/*Calendarios*/
update productos set nombre="Calendario de oficina" where id_producto=31;
update productos set nombre="Calendario mini" where id_producto=32;
update productos set nombre="Calendario detalles rojos" where id_producto=33;
update productos set nombre="Calendario pared" where id_producto=34;

/*DECORACIÓN DEL HOGAR*/
/*Cojines*/
update productos set nombre="Cojín cactus" where id_producto=35;
update productos set nombre="Cojín flecos" where id_producto=36;
update productos set nombre="Cojín minimalista" where id_producto=37;
update productos set nombre="Cojín monocolor" where id_producto=38;

/*Mantas*/
update productos set nombre="Manta terciopelo" where id_producto=39;
update productos set nombre="Mantas punto" where id_producto=40;
update productos set nombre="Manta beige" where id_producto=41;
update productos set nombre="Manta flecos" where id_producto=42;

/*Cuadros*/
update productos set nombre="Explosión rosa" where id_producto=43;
update productos set nombre="Caos y orden" where id_producto=44;
update productos set nombre="Catedral minimalista" where id_producto=45;
update productos set nombre="Motivación diaria" where id_producto=46;


/*CERÁMICA Y ALFARERÍA*/
/*Platos y cuencos*/
update productos set nombre="Plato punteado" where id_producto=47;
update productos set nombre="Cuenco beige básico" where id_producto=48;
update productos set nombre="Plato estampado" where id_producto=49;
update productos set nombre="Cuenco blanco básico" where id_producto=50;

/*Tazas y vasos*/
update productos set nombre="Tazas sonrientes" where id_producto=51;
update productos set nombre="Vaso básico blanco" where id_producto=52;
update productos set nombre="Vasos cerámica artesanales" where id_producto=53;
update productos set nombre="Vaso blanco puntos" where id_producto=54;

/*Figuras*/
update productos set nombre="Figura Gigante de Hierro" where id_producto=55;
update productos set nombre="Figura libélula humana" where id_producto=56;
update productos set nombre="Figura astro-gato" where id_producto=57;
update productos set nombre="Figura Kylo Ren" where id_producto=58;

/*JARDINERÍA*/
/*Macetas*/
update productos set nombre="Maceta madera" where id_producto=59;
update productos set nombre="Maceta estampado" where id_producto=60;
update productos set nombre="Maceta cobre" where id_producto=61;
update productos set nombre="Maceta cerámica" where id_producto=62;

/*Herramientas*/
update productos set nombre="Regadera" where id_producto=63;
update productos set nombre="Pala de mano" where id_producto=64;
update productos set nombre="Tijeras de podar" where id_producto=65;


select * from user_info;
select * from pedidos;
select * from detalle_pedidos;

insert into pedidos values(1, now(), 'entregado', 1);
insert into detalle_pedidos values(1, 1, 1, 55);
insert into detalle_pedidos values(2, 1, 1, 57);
insert into detalle_pedidos values(3, 1, 1, 58);

SELECT ui.id_user, ui.nombre, ui.primer_apellido, ui.segundo_apellido, ui.correo, ui.telefono, ui.direccion, p.id_pedido, p.fecha, p.estado, p.id_cliente, dp.id_detalle_pedido, dp.cantidad, dp.id_pedido, dp.id_producto, prod.precio_unitario, prod.url_imagen FROM user_info AS ui INNER JOIN pedidos AS p ON ui.id_user=p.id_cliente INNER JOIN detalle_pedidos as dp ON p.id_pedido=dp.id_pedido INNER JOIN productos as prod ON prod.id_producto=dp.id_producto WHERE ui.id_user=1 AND ui.correo="ser@gmail.com";


select p.id_pedido, dp.id_detalle_pedido, prod.id_producto, prod.nombre, dp.cantidad, prod.precio_unitario, prod.url_imagen from detalle_pedidos as dp inner join pedidos as p on dp.id_pedido=p.id_pedido inner join productos as prod on prod.id_producto=dp.id_producto WHERE dp.id_pedido=1;


SELECT nombre, primer_apellido, segundo_apellido, correo, telefono, direccion FROM user_info WHERE id_user=1 AND correo='ser@gmail.com';

update pedidos set gasto_total=40.97 where id_pedido=1;
select * from pedidos;
select * from detalle_pedidos;
select * from productos;

delete from pedidos where id_pedido=14;
delete from detalle_pedidos where id_detalle_pedido=24;
delete from detalle_pedidos where id_detalle_pedido=25;
