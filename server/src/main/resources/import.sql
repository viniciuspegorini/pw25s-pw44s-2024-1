insert into tb_category (name) values ('Informática');
insert into tb_category (name) values ('UD');
insert into tb_category (name) values ('Cozinha');
insert into tb_category (name) values ('Móveis');
insert into tb_category (name) values ('Eletrônico');

insert into tb_product (name, description, price, category_id) values ('Refrigerador 429L','Refrigerador 429L Branco, duplex....',1990.0,2);
insert into tb_product (name, description, price, category_id) values ('Notebook Arus 15.6','Notebook Arus 15.6 Core I7, 16Gb Ram...',2449.0,1);
insert into tb_product (name, description, price, category_id) values ('Monitor 27pol','Monitor Gamer 27pol 144Hz, 1ms',1129.99,1);
insert into tb_product (name, description, price, category_id) values ('Kit Teclado e Mouse','Kit com teclado ABNT e mouse com 5 botões',199.0,1);
insert into tb_product (name, description, price, category_id) values ('Smartphone XYZ','Smatphone com tela de 9pol, 12GB....',9999.0,5);
insert into tb_product (name, description, price, category_id) values ('TV LCD 75pol','TV LCD 75pol, 5 HDMI...',7555.0,5);
insert into tb_product (name, description, price, category_id) values ('Fogão 6 Bocas','Fogão 6 Bocas em aço inox, ...', 799.99,3);
insert into tb_product (name, description, price, category_id) values ('Roteador Wi-Fi 5.4GhZ','Roteador Wi-Fi 5.4GhZ, 6 antenas...',1299.0,1);

INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');