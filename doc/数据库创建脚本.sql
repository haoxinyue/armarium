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





