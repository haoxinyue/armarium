--设备类型
INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', '超声扫描', '超声扫描','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'大型影像', '大型影像','2018-09-06', 0, '2018-09-06', 0);
	
INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'大型影像辅助', '大型影像辅助','2018-09-06', 0, '2018-09-06', 0);
	
INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'电子仪器', '电子仪器','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'光学内窥', '光学内窥','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'核素放疗', '核素放疗','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'核素放疗辅助', '核素放疗辅助','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'基础设施', '基础设施','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'激光高频', '激光高频','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'检验生化', '检验生化','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'口腔', '口腔','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'普通放射', '普通放射','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'其他超声', '其他超声','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'手术急救', '手术急救','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'手术器械', '手术器械','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'物理治疗', '物理治疗','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'血透净化', '血透净化','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'中医诊疗', '中医诊疗','2018-09-06', 0, '2018-09-06', 0);

INSERT INTO public.tsys_config(	config_key, config_value, config_desc, create_time, creater, modify_time, modifier)	VALUES ('device_type', 
'综合', '综合','2018-09-06', 0, '2018-09-06', 0);




--初始化医院
INSERT INTO public.tb_hospital(	hospital_name, hospital_addr, area_id, create_time, creater, modify_time, modifier)	VALUES ('太仓第一人民医院', '太仓市常胜南路58号', 10002971, '2018-09-06', 10001, '2018-09-06', 10001);


--初始化科室
1000003

























--初始化系统功能点表
INSERT INTO public.tb_system_func(	func_name, func_code, func_desc)	VALUES ('设备添加', 'device.create', '设备添加');
INSERT INTO public.tb_system_func(	func_name, func_code, func_desc)	VALUES ('设备删除', 'device.delete', '设备删除');
INSERT INTO public.tb_system_func(	func_name, func_code, func_desc)	VALUES ('设备修改', 'device.update', '设备修改');
INSERT INTO public.tb_system_func(	func_name, func_code, func_desc)	VALUES ('设备查询', 'device.retrieve', '设备查询');





--初始化角色和系统功能点关系表
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (1, 1, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (1, 2, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (1, 3, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (1, 4, '2019-05-19', 10001);

INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (2, 1, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (2, 2, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (2, 3, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (2, 4, '2019-05-19', 10001);

INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (4, 4, '2019-05-19', 10001);
INSERT INTO public.tr_role_func(role_id, func_id, create_time, creater) VALUES (7, 4, '2019-05-19', 10001);





	
