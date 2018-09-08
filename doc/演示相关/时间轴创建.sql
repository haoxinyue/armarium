INSERT INTO public.tb_setup_case(
	case_subject, case_remark, case_state, hospital_id, dept_id, expected_time, device_name, device_type, assignee_user_id, setup_time, setup_remark, create_time, creater, modify_time, modifier, setup_begin_time)
	VALUES ('设备安装', null, 50, 1000003, 260, '2017-09-01', '高频氩气电刀', 9, 10007, '2017-09-01', '成功安装', '2017-09-01', 10003, '2017-09-01', 10003, '2017-09-01');

select * from tb_setup_case where device_name = '高频氩气电刀';

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '设备安装', 10, '2017-09-01', 19, '2017-09-01', 10007, '2017-09-01', 10007, 10007);

INSERT INTO public.tb_mt_case(
	case_subject, case_remark, case_state, reporter_weixin, reporter_user_id, assignee_user_id, device_id, response_interval, solve_interval, feedback_score, feedback_content, cost, case_file_path, create_time, creater, modify_time, modifier, reporter_name, reporter_company, reporter_mobile)
	VALUES ('设备报修', null, 50, null, 10008, 10007, 100002893, 8, 8, 5, '很满意', 0, null, '2017-12-12', 10007, '2017-12-15', 10007, null, null, null);

select * from tb_mt_case where device_id = 100002893;

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '设备报修', 30, '2017-12-12', 23, '2017-12-12', 10007, '2017-12-12', 10007, 10007);

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '完成维修', 30, '2017-12-15', 23, '2017-12-15', 10007, '2017-12-15', 10007, 10007);

INSERT INTO public.tb_bad_event(
	event_subject, device_id, event_time, event_remark, discussion_suggestion, discussion_participant, discussion_time, solve_result, solve_time, create_time, creater, modify_time, modifier)
	VALUES ('错误使用设备', 100002893, '2018-01-03', '错误使用设备', '科室医务人员集体培训', '科室医务人员', '2018-01-04', '开会培训学习使用手册，安全使用设备进入KPI', '2018-01-04', '2018-01-03', 100008, '2018-01-04', 100008);

select * from tb_bad_event where device_id = 100002893;

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '不良事件', 60, '2018-01-03', 10, '2018-01-03', 10008, '2018-01-03', 10008, 10008);


INSERT INTO public.tb_pm_case(
	case_subject, case_remark, case_state, device_id, assignee_user_id, plan_pm_time, actual_pm_time, actual_pm_user_id, accessory_info, pm_file, remark, create_time, creater, modify_time, modifier)
	VALUES ('设备保养', '设备保养', 50, 100002893, 10006, '2018-02-02', '2018-02-02', 10006, null, null, null, '2018-01-15', 10001, '2018-01-15', 10001);

select * from tb_pm_case where device_id = 100002893;

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '设备保养', 40, '2018-02-02', 4, '2018-02-02', 10006, '2018-02-02', 10006, 10006);


INSERT INTO public.tb_inspection_case(
	case_subject, case_remark, case_state, device_id, assignee_user_id, device_on_state, device_elec_evn_state, device_func_state, device_param_input, inspection_time, inspection_remark, create_time, creater, modify_time, modifier, inspection_type)
	VALUES ('设备巡检', '设备巡检', 50, 100002893, 10006, 1, 1, 1, 1, '2018-03-15', null, '2018-03-15', 10006, '2018-03-15', 10006, 1);
	
select * from tb_inspection_case where device_id = 100002893;

INSERT INTO public.tb_device_timeline(
	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)
	VALUES (100002893, '设备巡检', 50, '2018-03-15', 8, '2018-03-15', 10006, '2018-03-15', 10006, 10006);


select * from tb_device_timeline where device_id = 100002893;


