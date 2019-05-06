package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Department;
import com.jiabo.medical.entity.DvTimelineDTO;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.Hospital;
import com.jiabo.medical.entity.InspCaseDTO;
import com.jiabo.medical.entity.InstCaseDTO;
import com.jiabo.medical.entity.MtCaseDTO;
import com.jiabo.medical.entity.PmCaseDTO;
import com.jiabo.medical.entity.StockTKCaseDTO;


@Mapper
public interface CommonMapper  {
	public List<Hospital> getHosptList() throws DataAccessException;
    public List<String> getDeviceTypeList() throws DataAccessException;
}
