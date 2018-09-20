from openpyxl import load_workbook
import psycopg2

conn = psycopg2.connect(host="47.100.198.255", dbname="armarium", user="armarium", password="armarium")
cur = conn.cursor()

device_name = '1.5T磁共振成像系统'
device_id = 100002645




sql1 = "INSERT INTO public.tb_setup_case(case_subject, case_remark, case_state, hospital_id, dept_id, expected_time, device_name, device_type, assignee_user_id, setup_time, setup_remark, create_time, creater, modify_time, modifier, setup_begin_time)	VALUES ('设备安装', null, 50, 1000003, 260, '2017-09-01', %s, 9, 10007, '2017-09-01', '成功安装', '2017-09-01', 10003, '2017-09-01', 10003, '2017-09-01')"
cur.execute(sql1, (device_name,))

sql2 = "select case_id from tb_setup_case where device_name = %s order by case_id desc"
cur.execute(sql2, (device_name,))
rows2 = cur.fetchall()

setup_case_id = rows2[0][0]

sql3 = "update tb_device set setup_case_id = %s where device_id = %s"
cur.execute(sql3, (setup_case_id, device_id))


sql4 = "INSERT INTO public.tb_device_timeline(device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '设备安装', 10, '2017-09-01', 20, '2017-09-01', 10007, '2017-09-01', 10007, 10007)"
cur.execute(sql4, (device_id,))

sql5 = "INSERT INTO public.tb_mt_case(case_subject, case_remark, case_state, reporter_weixin, reporter_user_id, assignee_user_id, device_id, response_interval, solve_interval, feedback_score, feedback_content, cost, case_file_path, create_time, creater, modify_time, modifier, reporter_name, reporter_company, reporter_mobile)	 VALUES ('设备报修', null, 50, null, 10008, 10007, %s, 8, 8, 5, '很满意', 0, null, '2017-12-12', 10007, '2017-12-15', 10007, null, null, null)"
cur.execute(sql5, (device_id,))

sql6 = "select case_id from tb_mt_case where device_id = %s  order by case_id desc"
cur.execute(sql6, (device_id,))
rows6 = cur.fetchall()
mt_case_id = rows6[0][0]


sql7 = "INSERT INTO public.tb_device_timeline(	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '设备报修', 30, '2017-12-12', %s, '2017-12-12', 10007, '2017-12-12', 10007, 10007)"
cur.execute(sql7, (device_id, mt_case_id))


sql8 = "INSERT INTO public.tb_device_timeline(	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '完成维修', 30, '2017-12-15', %s, '2017-12-15', 10007, '2017-12-15', 10007, 10007)"
cur.execute(sql8, (device_id, mt_case_id))

sql9 = "INSERT INTO public.tb_bad_event(	event_subject, device_id, event_time, event_remark, discussion_suggestion, discussion_participant, discussion_time, solve_result, solve_time, create_time, creater, modify_time, modifier)	VALUES ('错误使用设备', %s, '2018-01-03', '错误使用设备', '科室医务人员集体培训', '科室医务人员', '2018-01-04', '开会培训学习使用手册，安全使用设备进入KPI', '2018-01-04', '2018-01-03', 100008, '2018-01-04', 100008);"
cur.execute(sql9, (device_id,))

sql10 = "select event_id from tb_bad_event where device_id = %s;"
cur.execute(sql10, (device_id,))
rows10 = cur.fetchall()
event_id = rows10[0][0]

sql11 = "INSERT INTO public.tb_device_timeline(	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '不良事件', 60, '2018-01-03', %s, '2018-01-03', 10008, '2018-01-03', 10008, 10008);"
cur.execute(sql11, (device_id,event_id))


sql12 = "INSERT INTO public.tb_pm_case(	case_subject, case_remark, case_state, device_id, assignee_user_id, plan_pm_time, actual_pm_time, actual_pm_user_id, accessory_info, pm_file, remark, create_time, creater, modify_time, modifier)	VALUES ('设备保养', '设备保养', 50, %s, 10006, '2018-02-02', '2018-02-02', 10006, null, null, null, '2018-01-15', 10001, '2018-01-15', 10001);"
cur.execute(sql12, (device_id,))

sql13 = "select case_id from tb_pm_case where device_id = %s order by case_id desc"
cur.execute(sql13, (device_id,))
rows13 = cur.fetchall()
pm_case_id = rows13[0][0]

sql14 = "INSERT INTO public.tb_device_timeline(	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '设备保养', 40, '2018-02-02', %s, '2018-02-02', 10006, '2018-02-02', 10006, 10006);"
cur.execute(sql14, (device_id,pm_case_id))





sql15 = "INSERT INTO public.tb_inspection_case(	case_subject, case_remark, case_state, device_id, assignee_user_id, device_on_state, device_elec_evn_state, device_func_state, device_param_input, inspection_time, inspection_remark, create_time, creater, modify_time, modifier, inspection_type)	VALUES ('设备巡检', '设备巡检', 50, %s, 10006, 1, 1, 1, 1, '2018-03-15', null, '2018-03-15', 10006, '2018-03-15', 10006, 1);	"
cur.execute(sql15, (device_id,))


sql16 = "select case_id from tb_inspection_case where device_id = %s order by case_id desc"
cur.execute(sql16, (device_id,))
rows16 = cur.fetchall()
inspection_case_id = rows16[0][0]


sql17 = "INSERT INTO public.tb_device_timeline(	device_id, event_subject, event_type, event_time, event_id, create_time, creater, modify_time, modifier, user_id)	VALUES (%s, '设备巡检', 50, '2018-03-15',%s, '2018-03-15', 10006, '2018-03-15', 10006, 10006);"
cur.execute(sql17, (device_id,inspection_case_id))


conn.commit()

print('done')


