package com.jiabo.medical.controller.contract;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.contract.ContractService;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/contract")
public class ContractController {
	
	@Autowired
	private ContractService contractService;
	
	@RequestMapping(value="/getContractList",method=RequestMethod.POST)
	public ResponseDTO getContractInfos(@RequestBody Contract contr) {
		return contractService.getContractInfos(contr);
	}
	
	@RequestMapping(value="/getContractInfo",method=RequestMethod.POST)
	public ResponseDTO getContractInfo(@RequestBody Contract contr) {
		return contractService.getContractInfo(contr.getContractId());
	}
	
	@RequestMapping(value="/addContractInfo",method=RequestMethod.POST)
	public ResponseDTO addContractInfo(@RequestBody Contract contr) {
		return contractService.addContractInfo(contr);
	}
	
	@RequestMapping(value="/updContractInfo",method=RequestMethod.POST)
	public ResponseDTO updContractInfo(@RequestBody Contract contr) {
		return contractService.updContractInfo(contr);
	}
	
	@RequestMapping(value="/delContract",method=RequestMethod.POST)
	public ResponseDTO delContractInfo(@RequestBody Contract contr) {
		return contractService.delContract(contr.getContractId());
	}
	
}
