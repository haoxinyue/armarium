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
    IS '工单状态：10，报修中，20，已取消，30，维修中，50，已关闭';

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


	
	
	
	
	








