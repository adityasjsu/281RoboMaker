drop database if exists db281;
create database db281;
use db281;
CREATE TABLE user_role (
  role_id  int(100) NOT NULL AUTO_INCREMENT,
  role_name varchar(20) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  primary key (role_id)
);


CREATE TABLE user (
  user_id  int(100) NOT NULL AUTO_INCREMENT,
  user_password varchar(100) not null, 
  first_name  varchar(50) not null, 
  last_name   varchar(50) not null, 
  email varchar(100) not null, 
  mobile_no varchar(10) not null,
  country_code varchar(5) not null,
  role_id int(100) not null,
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  foreign key (role_id) references user_role(role_id),
  primary key(user_id)
);



CREATE TABLE status (
  status_id  int(20) NOT NULL AUTO_INCREMENT,
  status_name varchar(50) not null,
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  primary key (status_id)
);	


CREATE TABLE robot (
  robot_id  int(100) NOT NULL AUTO_INCREMENT,
  robot_name  varchar(100) NOT NULL,
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  primary key (robot_id)
);	



CREATE TABLE user_robot (
  robot_id  int(100) NOT NULL,
  user_id int(100) not null, 
  robot_name  varchar(100) not null, 
  status_id   varchar(20) not null, 
  is_active varchar(1) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  foreign key (user_id) references user(user_id),
  foreign key (robot_id) references robot(robot_id),
  primary key (robot_id,user_id)
);	



CREATE TABLE building (
  building_id  int(100) NOT NULL AUTO_INCREMENT,
  building_name  varchar(100) not null, 
  is_active varchar(1) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  primary key (building_id)
);	



CREATE TABLE floors (
  floor_id  int(100) NOT NULL AUTO_INCREMENT,
  building_id  int(100) not null, 
  is_active varchar(1) not null, 
  room_nums varchar(10) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  primary key (floor_id),
  foreign key (building_id) references building(building_id)
);	




CREATE TABLE room (
  room_id  int(100) NOT NULL AUTO_INCREMENT,
  building_id  int(100) not null, 
  floor_id  int(100) not null, 
  is_active varchar(1) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  location_x double,
  location_y double,
  location_z double,
  foreign key (building_id) references building(building_id),
  foreign key (floor_id) references floors(floor_id),
  primary key (room_id)
);	



CREATE TABLE robot_schedule (
  schedule_id  int(100) NOT NULL AUTO_INCREMENT,
  robot_id  int(100) NOT NULL,
  start_date varchar(100) not null, 
  end_date  varchar(100) not null, 
  schedule_status  varchar(100) not null, 
  is_active varchar(1) not null, 
  room_id  int(100) not null,
  building_id  int(100), 
  floor_id  int(100), 
  status_id   varchar(10) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  foreign key (robot_id) references robot(robot_id),
  foreign key (building_id) references building(building_id),
  foreign key (floor_id) references floors(floor_id),
  foreign key (room_id) references room(room_id),
  primary key(schedule_id)
);	

CREATE TABLE robot_simulation (
  simulation_id  int(100) NOT NULL AUTO_INCREMENT,
  schedule_id  int(100) NOT NULL, 
  robot_id  int(100) NOT NULL,
  user_id int(100) NOT NULL,
  start_date varchar(100) not null, 
  end_date  varchar(100) not null, 
  schedule_status  varchar(100) not null, 
  is_active varchar(1) not null, 
  status_id   varchar(10) not null, 
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  foreign key (robot_id) references robot(robot_id),
  foreign key (schedule_id) references robot_schedule(schedule_id),
  primary key(simulation_id)
);

CREATE TABLE billing (
  billing_id  int(100) NOT NULL AUTO_INCREMENT,
  user_id  int(100) NOT NULL, 
  simulation_id int(100) NOT NULL,
  amount   int(100) NOT NULL, 
  duration int(100) NOT NULL,
  created_date varchar(100), 
  created_by  varchar(50),
  updated_date varchar(100),
  updated_by varchar(50),
  foreign key (user_id) references user(user_id),
  primary key(billing_id)
);

alter table floors add column floor_name varchar(100);
alter table room add column room_name varchar(100);
alter table robot add column robot_type varchar(50);
alter table robot add column operation_system varchar(50);
alter table robot add column version varchar(50);
alter table robot add column x_loc varchar(100);
alter table robot add column y_loc varchar(100);
alter table robot add column z_loc varchar(100);
alter table robot add column manufacturer_name varchar(100);
alter table robot add column is_active varchar(1);

INSERT INTO user_role (ROLE_NAME) VALUES ('ADMIN');
INSERT INTO user_role (ROLE_NAME) VALUES ('CUSTOMER');
INSERT INTO user (USER_PASSWORD,FIRST_NAME,LAST_NAME,EMAIL,MOBILE_NO,COUNTRY_CODE,ROLE_ID)VALUES
('USER_PASSWORD','PETER','PARKER','peter.parker@gmail.com','6696696690','USA',1);
INSERT INTO status (status_name)VALUES('Scheduled');
INSERT INTO status (status_name)VALUES('Running');
INSERT INTO status (status_name)VALUES('Terminated');
INSERT INTO status (status_name)VALUES('Stopped');
INSERT INTO robot (ROBOT_NAME)VALUES('SAMPLE ROBOT');
INSERT INTO user_robot (ROBOT_ID,USER_ID,ROBOT_NAME,STATUS_ID,IS_ACTIVE)VALUES
(1,1,'SAMPLE ROBOT',1,'Y');

INSERT INTO building (BUILDING_NAME,IS_ACTIVE)VALUES
('BUILDING ONE','Y');

INSERT INTO floors (BUILDING_ID,IS_ACTIVE,ROOM_NUMS)VALUES
(1,'Y',3);
INSERT INTO room (BUILDING_ID,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,1,'Y','37.8041','122.4046','142.5046');
INSERT INTO robot_schedule (ROBOT_ID,START_DATE,END_DATE,SCHEDULE_STATUS,IS_ACTIVE,ROOM_ID,BUILDING_ID,FLOOR_ID,STATUS_ID)VALUES
(1,'2021-11-12 21:53:32','2021-11-12 22:53:32','1','Y',1,1,1,1);

INSERT INTO robot (ROBOT_NAME)VALUES('SAMPLE ROBOT 2');
INSERT INTO robot (ROBOT_NAME)VALUES('SAMPLE ROBOT 3');

INSERT INTO user_robot (ROBOT_ID,USER_ID,ROBOT_NAME,STATUS_ID,IS_ACTIVE)VALUES
(2,1,'SAMPLE ROBOT 2',1,'Y');
INSERT INTO user_robot (ROBOT_ID,USER_ID,ROBOT_NAME,STATUS_ID,IS_ACTIVE)VALUES
(3,1,'SAMPLE ROBOT 3',1,'Y');
INSERT INTO building (BUILDING_NAME,IS_ACTIVE)VALUES
('BUILDING TWO','Y');
INSERT INTO building (BUILDING_NAME,IS_ACTIVE)VALUES
('BUILDING THREE','Y');

INSERT INTO floors (BUILDING_ID,FLOOR_NAME,IS_ACTIVE,ROOM_NUMS)VALUES
(1,'FLOOR-1','Y',3);
INSERT INTO floors (BUILDING_ID,FLOOR_NAME,IS_ACTIVE,ROOM_NUMS)VALUES
(1,'FLOOR-2','Y',3);
INSERT INTO floors (BUILDING_ID,FLOOR_NAME,IS_ACTIVE,ROOM_NUMS)VALUES
(1,'FLOOR-3','Y',3);

INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-101',1,'Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-102',1,'Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-103',1,'Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-201',1,'Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-202','1','Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-203','1','Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-301','1','Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-302','1','Y','37.8041','122.4046','142.5046');
INSERT INTO room (BUILDING_ID,ROOM_NAME,FLOOR_ID,IS_ACTIVE,LOCATION_X,LOCATION_Y,LOCATION_Z)VALUES
(1,'ROOM-303','1','Y','37.8041','122.4046','142.5046');


insert into robot_simulation( schedule_id, robot_id, user_id, start_date, end_date, schedule_status, is_active, status_id) values(1, 3, 1, '2021-11-20 14:45:15', '2021-11-20 18:47:40', 'N', 'N', 1);
insert into robot_simulation(schedule_id, robot_id, user_id, start_date, end_date, schedule_status, is_active, status_id) values(1, 3, 1, '2021-11-11 13:15:00', '2021-11-11 14:27:38', 'N', 'N', 1);
insert into robot_simulation(schedule_id, robot_id, user_id, start_date, end_date, schedule_status, is_active, status_id) values(1, 3, 1, '2021-11-15 13:15:00', '2021-11-15 14:27:38', 'N', 'N', 1);

