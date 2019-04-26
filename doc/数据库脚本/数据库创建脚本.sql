CREATE TABLE public.tb_contract
(
    contract_id serial NOT NULL,
    contract_no character varying(50),
    contract_name character varying(50),
    contract_file character varying(100),
    hospital_id integer NOT NULL,
    device_count integer,
    accept_date timestamp without time zone,


    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (contract_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_contract
    OWNER to armarium;
COMMENT ON TABLE public.tb_contract
    IS '合同信息表';

COMMENT ON COLUMN public.tb_contract.contract_no
    IS '合同号';

COMMENT ON COLUMN public.tb_contract.contract_name
    IS '合同名称';

COMMENT ON COLUMN public.tb_contract.contract_file
    IS '合同文件路径';

COMMENT ON COLUMN public.tb_contract.hospital_id
    IS '医院ID';

COMMENT ON COLUMN public.tb_contract.device_count
    IS '设备数量';

COMMENT ON COLUMN public.tb_contract.accept_date
    IS '到货时间';

































CREATE TABLE public.tb_hospital
(
    hospital_id serial NOT NULL,
    hospital_name character varying(50),
    hospital_addr character varying(100),
    area_id integer,


    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (hospital_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_hospital
    OWNER to armarium;
COMMENT ON TABLE public.tb_hospital
    IS '医院信息表';

COMMENT ON COLUMN public.tb_hospital.hospital_addr
    IS '医院地址';

COMMENT ON COLUMN public.tb_hospital.hospital_name
    IS '医院名称';

COMMENT ON COLUMN public.tb_hospital.area_id
    IS '所属区域';



































CREATE TABLE public.tb_purchase
(
    purchase_id serial NOT NULL,
    contract_id integer NOT NULL,
    purchase_owner character varying(50),
    has_bid smallint NOT NULL,


    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (purchase_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_purchase
    OWNER to armarium;
COMMENT ON TABLE public.tb_purchase
    IS '采购信息表';




COMMENT ON COLUMN public.tb_purchase.contract_id
    IS '合同ID';

COMMENT ON COLUMN public.tb_purchase.has_bid
    IS '是否招标';

COMMENT ON COLUMN public.tb_purchase.purchase_owner
    IS '采购负责人';
















CREATE TABLE public.tb_area
(
    area_id serial NOT NULL,
    area_name character varying(50) NOT NULL,
    area_type smallint NOT NULL,
    area_depth smallint NOT NULL,
    area_path character varying(100),
    parent_id integer,
    admin_code character varying(50),
    weather_code character varying(50),
    zipcode character varying(50),
    country_code character varying(50),
    district_code character varying(50),
    remark character varying(200),

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (area_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_area
    OWNER to armarium;
COMMENT ON TABLE public.tb_area
    IS '区域信息表';




COMMENT ON COLUMN public.tb_area.area_type
    IS '区域类型：10：国家，30：省，50，市；70：县，';

COMMENT ON COLUMN public.tb_area.area_depth
    IS '区域深度';

COMMENT ON COLUMN public.tb_area.zipcode
    IS '邮政编码';

COMMENT ON COLUMN public.tb_area.district_code
    IS '区号';

COMMENT ON COLUMN public.tb_area.country_code
    IS '国家编码';

COMMENT ON COLUMN public.tb_area.admin_code
    IS '行政区域编号';






CREATE TABLE public.tb_department
(
    dept_id serial NOT NULL,
    dept_name character varying(50) NOT NULL,
    dept_owner character varying(50),
    dept_path character varying(100), 
    parent_id integer,
    hospital_id integer, 
    remark character varying(200),

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (dept_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_department
    OWNER to armarium;
COMMENT ON TABLE public.tb_department
    IS '区域信息表';

COMMENT ON COLUMN public.tb_department.dept_owner
    IS '部门负责人';
	
COMMENT ON COLUMN public.tb_department.dept_path
    IS '部门路径';
COMMENT ON COLUMN public.tb_department.parent_id
    IS '父ID';
COMMENT ON COLUMN public.tb_department.hospital_id
    IS '医院ID';
COMMENT ON COLUMN public.tb_department.remark
    IS '备注ID';







































































CREATE TABLE public.tb_device_accessory
(
    accessory_id serial NOT NULL,
    user_manual smallint NOT NULL default 0,
    maintenance_manual smallint NOT NULL default 0,
    handbook smallint NOT NULL default 0,
    data1file character varying(100),
    data1desc character varying(200),
    data2file character varying(100),
    data2desc character varying(200),
    data3file character varying(100),
    data3desc character varying(200),
    data4file character varying(100),
    data4desc character varying(200),
    data5file character varying(100),
    data5desc character varying(200),

    paper_file_place character varying(100),
    paper_file_content character varying(500),

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (accessory_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_device_accessory
    OWNER to armarium;
COMMENT ON TABLE public.tb_device_accessory
    IS '设备资料表';




COMMENT ON COLUMN public.tb_device_accessory.user_manual
    IS '是否有用户手册：1：有，0：没有';

COMMENT ON COLUMN public.tb_device_accessory.maintenance_manual
    IS '是否有维护手册：1：有，0：没有';

COMMENT ON COLUMN public.tb_device_accessory.handbook
    IS '是否有操作手册：1：有，0：没有';

COMMENT ON COLUMN public.tb_device_accessory.paper_file_place
    IS '纸质文件存放地点';

COMMENT ON COLUMN public.tb_device_accessory.paper_file_content
    IS '纸质文件存放内容';












CREATE TABLE public.tb_role
(
    role_id serial NOT NULL,
    role_name character varying(50),

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,


    PRIMARY KEY (role_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_role
    OWNER to armarium;
COMMENT ON TABLE public.tb_role
    IS '角色表';

COMMENT ON COLUMN public.tb_role.role_name
    IS '角色名称';



CREATE TABLE public.tr_user_role
(
    rel_id serial NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    PRIMARY KEY (rel_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tr_user_role
    OWNER to armarium;
COMMENT ON TABLE public.tr_user_role
    IS '用户角色关系表';





CREATE TABLE public.tb_mt_case_history
(
    his_id serial NOT NULL,
    case_id integer NOT NULL,
    case_state smallint NOT NULL,
    his_remark character varying(500),
    assignee_user_id integer,
    
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,

    PRIMARY KEY (his_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_mt_case_history
    OWNER to armarium;
COMMENT ON TABLE public.tb_mt_case_history
    IS '维修工单表';

COMMENT ON COLUMN public.tb_mt_case_history.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_mt_case_history.his_remark
    IS '历史备注';
COMMENT ON COLUMN public.tb_mt_case_history.assignee_user_id
    IS '当前指派人用户ID';
COMMENT ON COLUMN public.tb_mt_case_history.case_state
    IS '见维修工单表的case state';


CREATE TABLE public.tb_mt_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    reporter_weixin character varying(50),
    reporter_user_id integer,
    assignee_user_id integer,
    device_id integer NOT NULL,
    response_interval integer,
    solve_interval integer,
    feedback_score smallint, 
    feedback_content character varying(500),
    cost integer,  
    case_file_path character varying(100),
	reporter_name character varying(50),
	reporter_company character varying(50),
	reporter_mobile character varying(30),
	
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,

    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_mt_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_mt_case
    IS '维修工单表';

COMMENT ON COLUMN public.tb_mt_case.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_mt_case.case_subject
    IS '工单主题';

COMMENT ON COLUMN public.tb_mt_case.case_remark
    IS '工单描述';
COMMENT ON COLUMN public.tb_mt_case.case_state
    IS '工单状态：10，报修中，20，已取消，25，已派单，30，维修中，50，已关闭';

COMMENT ON COLUMN public.tb_mt_case.reporter_weixin
    IS '创建工单用户微信';

COMMENT ON COLUMN public.tb_mt_case.reporter_user_id
    IS '创建工单用户ID';

COMMENT ON COLUMN public.tb_mt_case.assignee_user_id
    IS '当前指派人用户ID';

COMMENT ON COLUMN public.tb_mt_case.device_id
    IS '设备ID';

COMMENT ON COLUMN public.tb_mt_case.response_interval
    IS '响应时长，单位分钟';

COMMENT ON COLUMN public.tb_mt_case.solve_interval
    IS '处理时长，单位分钟';

COMMENT ON COLUMN public.tb_mt_case.feedback_score
    IS '反馈打分，1-5分';

COMMENT ON COLUMN public.tb_mt_case.feedback_content
    IS '反馈内容';

COMMENT ON COLUMN public.tb_mt_case.cost
    IS '工单成本，单位，分';

COMMENT ON COLUMN public.tb_mt_case.case_file_path
    IS '工单上传的地址';

COMMENT ON COLUMN public.tb_mt_case.reporter_name
    IS '报修人名字';

COMMENT ON COLUMN public.tb_mt_case.reporter_company
    IS '报修人公司';

COMMENT ON COLUMN public.tb_mt_case.reporter_mobile
    IS '报修人手机';


	-- Table: public.tb_device

-- DROP TABLE public.tb_device;

CREATE TABLE public.tb_device
(
    device_id serial NOT NULL,
    device_code character varying(50),
    device_name character varying(50),
    hospital_id integer,
    dept_id integer,
    picture1 character varying(100),
    picture2 character varying(100),
    picture3 character varying(100),
    picture4 character varying(100),
    picture5 character varying(100),
    asset_no character varying(50),
    device_model character varying(50) NOT NULL,
    device_desc character varying(500),
    device_state smallint,
    device_type integer NOT NULL,
    serial_number character varying(100) NULL,
    usage_state smallint NOT NULL,
    qr_code character varying(100),
    manufacturer character varying(50),
    producing_place character varying(50),
    setup_date timestamp without time zone,
    accessory character varying(200),
    accept_date timestamp without time zone,
    accept_remark character varying(100),
    accept_file character varying(100),
    use_date timestamp without time zone,
    device_owner character varying(50),
    storage_date timestamp without time zone,
    purchase_amount integer,
    maintenance_end_date timestamp without time zone,
    warranty_begin_date timestamp without time zone,
    warranty_end_date timestamp without time zone,
    warranty_amount integer,
    warranty_content character varying(500),
    sales_supplier character varying(50),
    sales_supplier_contact character varying(50),
    sales_supplier_phone character varying(50),
    sales_supplier_desc character varying(500),
    after_sale_provider character varying(50),
    after_sale_provider_engineer character varying(50),
    after_sale_provider_phone character varying(50),
    after_sale_provider_desc character varying(500),
    contract_id integer,
	
	setup_case_id integer,
	need_inspection smallint DEFAULT 0,
	inspection_interval integer,
	next_inspection_date timestamp without time zone,
	
	need_metering smallint DEFAULT 0,
	metering_interval integer,
	next_metering_date timestamp without time zone,
	inspection_owner integer,

	
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
    CONSTRAINT tb_device_pkey PRIMARY KEY (device_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_device
    OWNER to armarium;

COMMENT ON COLUMN public.tb_device.device_code
    IS '设备编号';

COMMENT ON COLUMN public.tb_device.hospital_id
    IS '医院ID';

COMMENT ON COLUMN public.tb_device.dept_id
    IS '部门ID';

COMMENT ON COLUMN public.tb_device.asset_no
    IS '资产编号';

COMMENT ON COLUMN public.tb_device.device_model
    IS '设备型号';

COMMENT ON COLUMN public.tb_device.device_desc
    IS '设备描述';

COMMENT ON COLUMN public.tb_device.device_state
    IS '设备状态';

COMMENT ON COLUMN public.tb_device.device_type
    IS '设备类型，关联字典表';

COMMENT ON COLUMN public.tb_device.serial_number
    IS '序列号';

COMMENT ON COLUMN public.tb_device.usage_state
    IS '使用状态：1，使用； 0，停用；2，待安装';

COMMENT ON COLUMN public.tb_device.qr_code
    IS '二维码';

COMMENT ON COLUMN public.tb_device.manufacturer
    IS '设备厂家';

COMMENT ON COLUMN public.tb_device.producing_place
    IS '产地';

COMMENT ON COLUMN public.tb_device.setup_date
    IS '安装日期';

COMMENT ON COLUMN public.tb_device.accessory
    IS '设备附件';

COMMENT ON COLUMN public.tb_device.accept_date
    IS '验收日期';

COMMENT ON COLUMN public.tb_device.accept_remark
    IS '验收评价';

COMMENT ON COLUMN public.tb_device.accept_file
    IS '验收清单文件地址';

COMMENT ON COLUMN public.tb_device.use_date
    IS '使用日期';

COMMENT ON COLUMN public.tb_device.device_owner
    IS '设备负责人';

COMMENT ON COLUMN public.tb_device.storage_date
    IS '入库日期';

COMMENT ON COLUMN public.tb_device.purchase_amount
    IS '采购金额，单位：分';

COMMENT ON COLUMN public.tb_device.maintenance_end_date
    IS '保修期结束时间';

COMMENT ON COLUMN public.tb_device.warranty_begin_date
    IS '保修合同开始时间';

COMMENT ON COLUMN public.tb_device.warranty_end_date
    IS '保修合同结束时间';

COMMENT ON COLUMN public.tb_device.warranty_amount
    IS '保修合同金额，单位：分';

COMMENT ON COLUMN public.tb_device.warranty_content
    IS '保修合同内容';

COMMENT ON COLUMN public.tb_device.sales_supplier
    IS '销售供应商名称';

COMMENT ON COLUMN public.tb_device.sales_supplier_contact
    IS '销售供应商联系人';

COMMENT ON COLUMN public.tb_device.sales_supplier_phone
    IS '销售供应商电话';

COMMENT ON COLUMN public.tb_device.sales_supplier_desc
    IS '销售供应商描述';

COMMENT ON COLUMN public.tb_device.after_sale_provider
    IS '售后服务供应商名称';

COMMENT ON COLUMN public.tb_device.after_sale_provider_engineer
    IS '售后服务供应商工程师';

COMMENT ON COLUMN public.tb_device.after_sale_provider_phone
    IS '售后服务供应商电话';

COMMENT ON COLUMN public.tb_device.after_sale_provider_desc
    IS '售后服务供应商描述';

COMMENT ON COLUMN public.tb_device.contract_id
    IS '合同ID，关联合同表';
	
	
COMMENT ON COLUMN public.tb_device.setup_case_id
    IS '安装工单ID';

COMMENT ON COLUMN public.tb_device.need_inspection
    IS '是否需要巡检；0，不需要；1，需要';

COMMENT ON COLUMN public.tb_device.inspection_interval
    IS '巡检周期：单位，天';
COMMENT ON COLUMN public.tb_device.next_inspection_date
    IS '下一次巡检的日期';
	
	
COMMENT ON COLUMN public.tb_device.need_metering
    IS '是否需要计量；0，不需要；1，需要';

COMMENT ON COLUMN public.tb_device.metering_interval
    IS '计量周期：单位，天';
COMMENT ON COLUMN public.tb_device.next_metering_date
    IS '下一次计量的日期';
	
ALTER TABLE public.tb_device
    ADD COLUMN need_maintain smallint;

COMMENT ON COLUMN public.tb_device.need_maintain
    IS '是否需要保养';

ALTER TABLE public.tb_device
    ADD COLUMN maintenance_interval integer;

COMMENT ON COLUMN public.tb_device.maintenance_interval
    IS '保养周期：单位，天';

ALTER TABLE public.tb_device
    ADD COLUMN next_maintenance_date timestamp without time zone;

COMMENT ON COLUMN public.tb_device.next_maintenance_date
    IS '下一次保养时间';
	
COMMENT ON COLUMN public.tb_device.inspection_owner
    IS '巡检负责人';
	
CREATE TABLE public.tb_bad_event
(
    event_id serial NOT NULL,
    event_subject character varying(50),
    device_id integer NOT NULL,
	event_time timestamp without time zone NOT NULL,
	event_remark character varying(500),
	
	discussion_suggestion character varying(500),
	discussion_participant character varying(100),
	discussion_time timestamp without time zone,
	
	solve_result character varying(500),
	solve_time timestamp without time zone,
	
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,

    PRIMARY KEY (event_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_bad_event
    OWNER to armarium;
COMMENT ON TABLE public.tb_bad_event
    IS '不良事件';

COMMENT ON COLUMN public.tb_bad_event.event_id
    IS '事件ID';

COMMENT ON COLUMN public.tb_bad_event.event_subject
    IS '事件主题';

COMMENT ON COLUMN public.tb_bad_event.device_id
    IS '设备ID';
COMMENT ON COLUMN public.tb_bad_event.event_time
    IS '事件发生时间 ';

COMMENT ON COLUMN public.tb_bad_event.event_remark
    IS '事件备注';

COMMENT ON COLUMN public.tb_bad_event.discussion_suggestion
    IS '讨论的建议';

COMMENT ON COLUMN public.tb_bad_event.discussion_participant
    IS '讨论的与会人员';

COMMENT ON COLUMN public.tb_bad_event.discussion_time
    IS '讨论的时间';

	
	
	
COMMENT ON COLUMN public.tb_bad_event.solve_result
    IS '处理结果';

COMMENT ON COLUMN public.tb_bad_event.solve_time
    IS '处理时间';


	
	
	
	
	



	
	
	

	

	
	
	
CREATE TABLE public.tb_setup_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    
	hospital_id integer NOT NULL,
	dept_id integer,
	
	expected_time timestamp without time zone,
    device_name character varying(50) NOT NULL,
	device_type integer NOT NULL,
	assignee_user_id integer,
	
	
	setup_time timestamp without time zone,
	setup_remark character varying(500), 
	setup_begin_time timestamp without time zone,

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	

    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_setup_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_setup_case
    IS '安装工单表';

COMMENT ON COLUMN public.tb_setup_case.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_setup_case.case_subject
    IS '工单主题';

COMMENT ON COLUMN public.tb_setup_case.case_remark
    IS '工单描述';

COMMENT ON COLUMN public.tb_setup_case.case_state
    IS '工单状态：10，安装中，20，已取消，50，已关闭，';

COMMENT ON COLUMN public.tb_setup_case.hospital_id
    IS '医院ID';

COMMENT ON COLUMN public.tb_setup_case.dept_id
    IS '部门ID';
	
COMMENT ON COLUMN public.tb_setup_case.expected_time
    IS '期望安装时间';

COMMENT ON COLUMN public.tb_setup_case.device_name
    IS '设备名称';
	
COMMENT ON COLUMN public.tb_setup_case.device_type
    IS '设备类型，关联字典表';

COMMENT ON COLUMN public.tb_setup_case.assignee_user_id
    IS '当前指派人用户ID';
	
COMMENT ON COLUMN public.tb_setup_case.setup_time
    IS '实际安装时间';
	
COMMENT ON COLUMN public.tb_setup_case.setup_remark
    IS '安装备注';
	

COMMENT ON COLUMN public.tb_setup_case.setup_begin_time
    IS '安装开始时间';

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	

	
	
	
	
	

	
CREATE TABLE public.tb_device_timeline
(
    timeline_id serial NOT NULL,
    device_id integer NOT NULL,
    event_subject character varying(50),
    event_type smallint NOT NULL,
    event_time timestamp without time zone NOT NULL,
	event_id integer NOT NULL,
    user_id integer NOT NULL,

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	
    PRIMARY KEY (timeline_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_device_timeline
    OWNER to armarium;
COMMENT ON TABLE public.tb_device_timeline
    IS '设备时间轴表';

COMMENT ON COLUMN public.tb_device_timeline.timeline_id
    IS '时间轴ID';

COMMENT ON COLUMN public.tb_device_timeline.device_id
    IS '设备ID';

COMMENT ON COLUMN public.tb_device_timeline.event_subject
    IS '事件主题';
COMMENT ON COLUMN public.tb_device_timeline.event_type
    IS '事件类型：10，安装；20，盘点；30，报修；40，保养；50，巡检；60，不良事件';

COMMENT ON COLUMN public.tb_device_timeline.event_time
    IS '事件的时间，和各个详情表的时间一致';

COMMENT ON COLUMN public.tb_device_timeline.event_id
    IS '事件ID，对应各个状态详情表的ID';
	
COMMENT ON COLUMN public.tb_device_timeline.user_id
    IS '设备的这个事件所属的用户id，操作人。
举例，如果是报修，则是报修人医生或者护士的用户id，如果是维修中则是工程师的用户id，如果是报修关单，则有可能是调度的用户id，以此类推';
	
	
	
	
	
	
	
	
	
	
	


CREATE TABLE public.tb_inspection_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    
    device_id  integer NOT NULL,
	assignee_user_id integer,
	
	inspection_type smallint NOT NULL DEFAULT 1,
	device_on_state smallint,
	device_elec_evn_state smallint,
	device_func_state smallint, 
	device_param_input character varying(500),  
	inspection_time timestamp without time zone,
	inspection_remark character varying(500), 
	

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	

    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_inspection_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_inspection_case
    IS '巡检工单表';

COMMENT ON COLUMN public.tb_inspection_case.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_inspection_case.case_subject
    IS '工单主题';

COMMENT ON COLUMN public.tb_inspection_case.case_remark
    IS '工单描述';
	
COMMENT ON COLUMN public.tb_inspection_case.inspection_type
    IS '巡检类型：1，巡检；2，强检';

COMMENT ON COLUMN public.tb_inspection_case.case_state
    IS '工单状态：10，待巡检，20，已取消，30，巡检中，50，已关闭，';



COMMENT ON COLUMN public.tb_inspection_case.device_id
    IS '设备ID';
	
COMMENT ON COLUMN public.tb_inspection_case.assignee_user_id
    IS '当前指派人用户ID';
	
	
COMMENT ON COLUMN public.tb_inspection_case.device_on_state
    IS '设备开机状态：1，正常；2，不正常';
	
	
	
COMMENT ON COLUMN public.tb_inspection_case.device_elec_evn_state
    IS '设备电气环境状态：1，正常；2，不正常';
	
COMMENT ON COLUMN public.tb_inspection_case.device_func_state
    IS '设备功能状态：1，正常；2，不正常';
	
COMMENT ON COLUMN public.tb_inspection_case.device_param_input
    IS '设备参数输入';	
	
	
COMMENT ON COLUMN public.tb_inspection_case.inspection_time
    IS '巡检时间';
	
COMMENT ON COLUMN public.tb_inspection_case.inspection_remark
    IS '巡检备注';

	
		


		

		

		
CREATE TABLE public.tb_metering_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    
    device_id  integer NOT NULL,
	assignee_user_id integer,
	
	metering_type smallint,
	
	metering_time timestamp without time zone,
	metering_data character varying(500), 
    metering_result smallint DEFAULT 1,
	result_file character varying(200),

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	

    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_metering_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_metering_case
    IS '计量工单表';

COMMENT ON COLUMN public.tb_metering_case.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_metering_case.case_subject
    IS '工单主题';

COMMENT ON COLUMN public.tb_metering_case.case_remark
    IS '工单描述';
	
COMMENT ON COLUMN public.tb_metering_case.metering_type
    IS '计量类型：';

COMMENT ON COLUMN public.tb_metering_case.case_state
    IS '工单状态：10，待计量，20，已取消，30，计量中，50，已关闭，';



COMMENT ON COLUMN public.tb_metering_case.device_id
    IS '设备ID';
	
COMMENT ON COLUMN public.tb_metering_case.assignee_user_id
    IS '当前指派人用户ID';
	

	
COMMENT ON COLUMN public.tb_metering_case.metering_data
    IS '计量数据';

COMMENT ON COLUMN public.tb_metering_case.metering_time
    IS '计量时间';
	
COMMENT ON COLUMN public.tb_metering_case.metering_result
    IS '1：通过， 0：不通过';
	
COMMENT ON COLUMN public.tb_metering_case.result_file
    IS '上传的结果文件';
	
	 
	
	
CREATE TABLE public.tb_stocktaking_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    plan_begin_time timestamp without time zone,
	plan_end_time timestamp without time zone,
	assignee_user_id integer,
	actual_time timestamp without time zone, 
	hospital_id integer NOT NULL,
	
    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	
    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_stocktaking_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_stocktaking_case
    IS '盘点计划表';

COMMENT ON COLUMN public.tb_stocktaking_case.case_id
    IS '盘点ID';

COMMENT ON COLUMN public.tb_stocktaking_case.case_subject
    IS '盘点主题';

COMMENT ON COLUMN public.tb_stocktaking_case.case_remark
    IS '盘点描述';
	

COMMENT ON COLUMN public.tb_stocktaking_case.case_state
    IS '盘点状态：10，待执行，20，已取消，30，执行中，50，已关闭，';

	
COMMENT ON COLUMN public.tb_stocktaking_case.assignee_user_id
    IS '盘点当前指派人用户ID';
	

COMMENT ON COLUMN public.tb_stocktaking_case.plan_begin_time
    IS '盘点计划执行开始时间';
	
COMMENT ON COLUMN public.tb_stocktaking_case.plan_begin_time
    IS '盘点计划执行结束时间';

COMMENT ON COLUMN public.tb_stocktaking_case.actual_time
    IS '盘点实际执行时间';
	
COMMENT ON COLUMN public.tb_stocktaking_case.hospital_id
    IS '医院ID';
	

	

	
CREATE TABLE public.tb_stocktaking_case_plan_dept
(
	id serial NOT NULL,
    case_id integer NOT NULL,
    dept_id integer NOT NULL,
	
    
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_stocktaking_case_plan_dept
    OWNER to armarium;
COMMENT ON TABLE public.tb_stocktaking_case_plan_dept
    IS '盘点计划科室表';

COMMENT ON COLUMN public.tb_stocktaking_case_plan_dept.id
    IS 'ID';

COMMENT ON COLUMN public.tb_stocktaking_case_plan_dept.case_id
    IS '盘点case_id，关联tb_stocktaking_case的case_id';
	
COMMENT ON COLUMN public.tb_stocktaking_case_plan_dept.dept_id
    IS '科室ID';

	
	
	
CREATE TABLE public.tb_stocktaking_case_actual_device
(
	id serial NOT NULL,
    case_id integer NOT NULL,
    device_id integer NOT NULL,
	operation_user_id integer,
	operation_time timestamp without time zone, 
    
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_stocktaking_case_actual_device
    OWNER to armarium;
COMMENT ON TABLE public.tb_stocktaking_case_actual_device
    IS '盘点实际设备表';

COMMENT ON COLUMN public.tb_stocktaking_case_actual_device.id
    IS 'ID';

COMMENT ON COLUMN public.tb_stocktaking_case_actual_device.case_id
    IS '盘点case_id，关联tb_stocktaking_case的case_id';
	
COMMENT ON COLUMN public.tb_stocktaking_case_actual_device.device_id
    IS '设备ID';
	
COMMENT ON COLUMN public.tb_stocktaking_case_actual_device.operation_user_id
    IS '操作人ID';
	
COMMENT ON COLUMN public.tb_stocktaking_case_actual_device.operation_time
    IS '操作时间';

	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	

		
CREATE TABLE public.tb_pm_case
(
    case_id serial NOT NULL,
    case_subject character varying(50),
    case_remark character varying(500),
    case_state smallint NOT NULL,
    
    device_id  integer NOT NULL,
	assignee_user_id integer,
	
	
	plan_pm_time timestamp without time zone,
	actual_pm_time timestamp without time zone,
	actual_pm_user_id integer,
	
	accessory_info character varying(500),
	pm_file character varying(200),
	remark character varying(500),
	

    create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	

    PRIMARY KEY (case_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tb_pm_case
    OWNER to armarium;
COMMENT ON TABLE public.tb_pm_case
    IS '保养工单';

COMMENT ON COLUMN public.tb_pm_case.case_id
    IS '工单ID';

COMMENT ON COLUMN public.tb_pm_case.case_subject
    IS '工单主题';

COMMENT ON COLUMN public.tb_pm_case.case_remark
    IS '工单描述';
	

COMMENT ON COLUMN public.tb_pm_case.case_state
    IS '工单状态：10，待保养，20，已取消，30，保养中，50，已关闭，';



COMMENT ON COLUMN public.tb_pm_case.device_id
    IS '设备ID';
	
COMMENT ON COLUMN public.tb_pm_case.assignee_user_id
    IS '当前指派人用户ID';
	

	
	
COMMENT ON COLUMN public.tb_pm_case.plan_pm_time
    IS '计划保养时间';
	
COMMENT ON COLUMN public.tb_pm_case.actual_pm_time
    IS '实际保养时间';
	
COMMENT ON COLUMN public.tb_pm_case.actual_pm_user_id
    IS '实际保养人';
	
COMMENT ON COLUMN public.tb_pm_case.accessory_info
    IS '配件信息';

	
COMMENT ON COLUMN public.tb_pm_case.pm_file
    IS '上传的保养单';


COMMENT ON COLUMN public.tb_pm_case.remark
    IS '备注';

	

	
CREATE TABLE public.tsys_config
(
    config_id serial NOT NULL,
    config_key character varying(100) NOT NULL,
    config_value character varying(500) NOT NULL,
    config_desc character varying(500),
	config_code character varying(50),


	
	create_time timestamp without time zone NOT NULL,
    creater integer NOT NULL,
    modify_time timestamp without time zone NOT NULL,
    modifier integer NOT NULL,
	
    PRIMARY KEY (config_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tsys_config
    OWNER to armarium;
COMMENT ON TABLE public.tsys_config
    IS '系统配置表';
	
COMMENT ON COLUMN public.tsys_config.config_code
    IS '配置编码';
	
	
	
	
	
	
	
	
	
	
	
	
	

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."tb_user";
CREATE TABLE "public"."tb_user" (
"user_id" int4 DEFAULT nextval('tb_user_user_id_seq'::regclass) NOT NULL,
"login_name" varchar(50) COLLATE "default",
"login_password" varchar(50) COLLATE "default" NOT NULL,
"mobile" varchar(50) COLLATE "default",
"email" varchar(50) COLLATE "default",
"display_name" varchar(50) COLLATE "default",
"create_time" timestamp(6) NOT NULL,
"creater" int4 NOT NULL,
"modify_time" timestamp(6) NOT NULL,
"modifier" int4 NOT NULL,
"weixin_openid" varchar(100) COLLATE "default"
)
WITH (OIDS=FALSE)

;
COMMENT ON COLUMN "public"."tb_user"."weixin_openid" IS '微信openid';

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table tb_user
-- ----------------------------
ALTER TABLE "public"."tb_user" ADD PRIMARY KEY ("user_id");
	
	
	
	
	
	
	
	
	
	
	
	
	
	
