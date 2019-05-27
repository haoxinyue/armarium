package com.jiabo.medical.service.cases;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.jiabo.medical.constant.ConstantInfo;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.entity.StockCaseDTO;
import com.jiabo.medical.entity.StockTKCaseDTO;
import com.jiabo.medical.mapper.DvTimelineMapper;
import com.jiabo.medical.mapper.EquipmentMapper;
import com.jiabo.medical.mapper.MaintainCaseMapper;
import com.jiabo.medical.mapper.StockTKCaseMapper;
import com.jiabo.medical.pojo.ResponseDTO;


@Service
public class StockTKCaseService {
	
	@Autowired
	private StockTKCaseMapper caseMapper;
	
	@Autowired
	private DvTimelineMapper tlCaseMapper;
	
	@Autowired
	private EquipmentMapper equipMapper;

	private final Logger log = Logger.getLogger(this.getClass());
	
	public ResponseDTO<List<StockTKCaseDTO>> getStockCaseInfos(StockTKCaseDTO caseDto) {

		ResponseDTO<List<StockTKCaseDTO>> res = new ResponseDTO<List<StockTKCaseDTO>>();
		
		if (caseDto.getAssigneeUserId() != null) {
			List<String> roleNames = caseMapper.getRoleName(caseDto.getAssigneeUserId());
			
			boolean engineerFlg = false;
			for (String roleName : roleNames) {
				if (roleName.endsWith(ConstantInfo.ROLE_ENGINEER)) {
					engineerFlg = true;
				}
			}
			
			if (!engineerFlg) {
				caseDto.setAssigneeUserId(null);
			}
			
		}
		
		int recordsCount = caseMapper.getCaseRecCount(caseDto);
		
		if (recordsCount == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的盘点单信息!";
			return res;
		}
		
		if (caseDto.getPageIndex() == null) {
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*caseDto.getPageSize());
		}
		
		List<StockTKCaseDTO> mtCases = caseMapper.getStockTKCaseList(caseDto);
		
		res.data = mtCases;
		res.recordCount = recordsCount;
		
		if (res.recordCount == 0) {
			
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的盘点单信息!";

		} else {
			res.code = ConstantInfo.NORMAL;
		}
		
		return res;
	}
	
	
	public ResponseDTO<List<StockCaseDTO>> getStockTKDeviceList(StockCaseDTO caseDto) {

		ResponseDTO<List<StockCaseDTO>> res = new ResponseDTO<List<StockCaseDTO>>();
		
		if (caseDto.getPageIndex() == null) {
			
			caseDto.setPageIndex(0);
		} else {
			caseDto.setPageIndex(caseDto.getPageIndex()*10);
		}
		
		List<StockCaseDTO> devList = caseMapper.getStockTKDeviceList(caseDto);
		
		res.data = devList;
		res.recordCount = devList.size();
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}


@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public ResponseDTO completePmCase(PmCaseDTO caseDto) {

	ResponseDTO res = new ResponseDTO();
	
	if (caseDto.getDeviceId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未选择巡检设备!";
		return res;
	}

	if (caseDto.getActualUserId() == null) {
		res.code = ConstantInfo.INVALID;
		res.message = "未输入实际保养人!";
		return res;
	}

	// 工单状态设置为'已关闭（50）'
	caseDto.setCaseState(50);
	
	Timestamp now = new Timestamp(System.currentTimeMillis());
	
	caseDto.setModifyTime(now);
	caseDto.setCreateTime(now);
	
	try {
		int count=0;
		//= caseMapper.updStockTKCase(caseDto);
		
		if (count > 0) {
			
			Equipment intervalInfo = equipMapper.getPmDeviceInfo(caseDto.getDeviceId());
			
			Equipment equip = new Equipment();
			
			equip.setDeviceId(caseDto.getDeviceId());
			
			long interval = intervalInfo.getMaintenanceInterval();
			
			long nextPmDate = now.getTime() + interval*24*3600*1000;
			
			equip.setNextMaintenanceDate(new Timestamp(nextPmDate));
			
			equipMapper.updEquipPmTime(equip);
			
			res.code = ConstantInfo.NORMAL;
			res.message = "工单更新成功";
			res.recordCount = count;
			res.data = caseDto;
			
		} else {
			res.code = ConstantInfo.INVALID;
			res.message = "工单更新失败，请确认是否存在此纪录";
		}
	} catch (DataAccessException e) {
		res.code = ConstantInfo.INVALID;
		res.message = e.getMessage();
		log.error(e.getMessage());
	}
	
	return res;
	
}

	public ResponseDTO rotateTKCaseState(Integer assigneeUserId) {
		ResponseDTO res = new ResponseDTO();
		
		if (assigneeUserId == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "被指派人ID为空";
			
			return res;
		}
		
		//轮询待处理工单
		int count = caseMapper.rotateTKCaseState(assigneeUserId);
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.recordCount = count;
			res.message = "有新的盘点工单待处理";
		} else {
			res.code = ConstantInfo.NORMAL;
			res.message = "";
		}
		
		return res;
	}

	// 增加盘点单
	@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
	public  ResponseDTO addStockTKCase(StockTKCaseDTO caseDto) {
		
		
		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getHospitalId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定医院";
			
			return res;
		}
		
		if (caseDto.getDepts().size() == 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定科室";
			
			return res;
		}
		
		if (caseDto.getAssigneeUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定盘点人";
			
			return res;
		}
		
		if (StringUtils.isEmpty(caseDto.getPlanBeginTime())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未输入计划盘点开始时间!";
			return res;
		}
		
		if (StringUtils.isEmpty(caseDto.getPlanEndTime())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未输入计划盘点结束时间!";
			return res;
		}
		
		// 工单状态设置为'待执行（10）'
		caseDto.setCaseState(10);
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		caseDto.setCreateTime(now);
		
		int count = caseMapper.addStockTKCase(caseDto);
		
		if (count > 0) {
			int caseSeqNo= caseMapper.getSequenceNo();
			
			StockCaseDTO stkDto = new StockCaseDTO();
			stkDto.setCaseId(caseSeqNo);
			
			for (Integer deptId : caseDto.getDepts()) {
				stkDto.setDeptId(deptId);
				
				count = caseMapper.addStockDeptCase(stkDto);
				
				List<Integer> deviceIds = caseMapper.getDeviceIds(deptId);
				
				for (Integer deviceId : deviceIds) {
					stkDto.setDeviceId(deviceId);
					count = caseMapper.addStockDeviceCase(stkDto);
					
				}
			}
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "盘点单创建成功";
			}
			
		}
		
		return res;
		
	}



	public ResponseDTO updStockTKCase(StockCaseDTO caseDto) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getOperationUserId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定实际盘点人";
			
			return res;
		}
		
		if (StringUtils.isEmpty(caseDto.getOperationTime())) {
			res.code = ConstantInfo.INVALID;
			res.message = "未输入实际盘点时间!";
			return res;
		}
		
		// 无caseId场合
		if (caseDto.getCaseId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "请指定一个盘点计划!";
			return res;
		}
		
		if (caseMapper.getStockTKCaseStatus(caseDto) > 0) {
			res.code = ConstantInfo.INVALID;
			res.message = "该设备已盘点!";
			return res;
		}
		
		int count = caseMapper.updStockTKDevCase(caseDto);
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.message = "该设备盘点成功";
			
			count = caseMapper.getDeviceTKCount(caseDto.getCaseId());
			
			if (count == 0) {
				
				caseMapper.updStockTKCase(caseDto.getCaseId());
				
				Timestamp now = new Timestamp(System.currentTimeMillis());
				
				DvTimelineDTO timelineDto = new DvTimelineDTO();
				
				timelineDto.setDeviceId(caseDto.getDeviceId());
				timelineDto.setEventSubject(caseDto.getCaseSubject());
				timelineDto.setEventType(20);  // 报修
				timelineDto.setEventId(caseDto.getCaseId());
				timelineDto.setEventTime(now);
				
				timelineDto.setCreateTime(now);
				timelineDto.setModifyTime(now);
				timelineDto.setCreater(caseDto.getModifier());
				timelineDto.setModifier(caseDto.getModifier());
				timelineDto.setUserId(caseDto.getOperationUserId());
				
				tlCaseMapper.addDvTimelineCase(timelineDto);

			}
		}
		return res;
	}
	
	// 审核盘点计划
	public ResponseDTO updStockTKCaseState(StockCaseDTO caseDto) {
		
		ResponseDTO res = new ResponseDTO();
		
		if (caseDto.getModifier() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "未指定审核人";
			
			return res;
		}
		
		// 无caseId场合
		if (caseDto.getCaseId() == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "请指定一个盘点计划!";
			return res;
		}
		
		// 更新审核状态
		caseDto.setAuditState(1);
		
		Timestamp now = new Timestamp(System.currentTimeMillis());
		
		caseDto.setModifyTime(now);
		
		int count = caseMapper.updStockTKCaseState(caseDto);
		
		if (count > 0) {
			res.code = ConstantInfo.NORMAL;
			res.message = "盘点计划审核成功";
			
			
		}
		return res;
	}
	
	// 审核盘点计划
		public ResponseDTO delStockTKCase(StockCaseDTO caseDto) {
			
			ResponseDTO res = new ResponseDTO();
			
			if (caseDto.getModifier() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "未指定审核人";
				
				return res;
			}
			
			// 无caseId场合
			if (caseDto.getCaseId() == null) {
				res.code = ConstantInfo.INVALID;
				res.message = "请指定一个盘点计划!";
				return res;
			}
			
			int count = caseMapper.delStockTKCase(caseDto.getCaseId());
			
			if (count > 0) {
				res.code = ConstantInfo.NORMAL;
				res.message = "盘点计划删除成功";
				
				
			}
			return res;
		}


	public ResponseDTO getStockTKDevice(StockCaseDTO caseDto) {
		ResponseDTO<StockTKCaseDTO> res = new ResponseDTO<StockTKCaseDTO>();

		StockTKCaseDTO mtCase = caseMapper.getStockTKDevice(caseDto);
		
		if (mtCase == null) {
			res.code = ConstantInfo.INVALID;
			res.message = "没有符合该条件的盘点设备信息!";
			return res;
		}
		
		res.data = mtCase;
		res.recordCount = 1;
		res.code = ConstantInfo.NORMAL;
		
		return res;
	}
	
	

}
