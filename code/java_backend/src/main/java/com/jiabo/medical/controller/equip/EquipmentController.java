package com.jiabo.medical.controller.equip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.equip.EquipService;

@RestController
@RequestMapping("/equip")
public class EquipmentController {
	
	@Autowired
	private EquipService equipService;
	
	@RequestMapping(value="/getDeviceList",method=RequestMethod.POST)
	public ResponseDTO getEquipmentInfos(Equipment equip) {
		return equipService.getEquipmentInfos(equip);
	}
	
	@RequestMapping(value="/getDevice",method=RequestMethod.POST)
	public ResponseDTO getEquipmentInfo(@RequestParam("deviceId") int deviceId) {
		return equipService.getEquipmentInfo(deviceId);
	}
	
	@RequestMapping(value="/addDevice",method=RequestMethod.POST)
	public ResponseDTO addEquipmentInfo(Equipment equip) {
		return equipService.addEquipmentInfo(equip);
	}
	
	@RequestMapping(value="/updDevice",method=RequestMethod.POST)
	public ResponseDTO updEquipmentInfo(Equipment equip) {
		return equipService.updEquipmentInfo(equip);
	}
	
	@RequestMapping(value="/delDevice",method=RequestMethod.POST)
	public ResponseDTO delEquipmentInfo(@RequestParam("deviceId") int deviceId) {
		return equipService.delEquipment(deviceId);
	}
	
}
