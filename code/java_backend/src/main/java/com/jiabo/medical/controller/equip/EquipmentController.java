package com.jiabo.medical.controller.equip;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.equip.EquipService;
import com.jiabo.medical.util.QRCodeUtil;

@RestController
@RequestMapping("/equip")
public class EquipmentController {
	
	@Autowired
	private EquipService equipService;
	
	@RequestMapping(value="/getDeviceList",method=RequestMethod.POST)
	public ResponseDTO getEquipmentInfos(@RequestBody Equipment equip) {
		return equipService.getEquipmentInfos(equip);
	}
	
	@RequestMapping(value="/getDevice",method=RequestMethod.POST)
	public ResponseDTO getEquipmentInfo(@RequestBody Equipment equip) {
		return equipService.getEquipmentInfo(equip.getDeviceId());
	}
	
	@RequestMapping(value="/addDevice",method=RequestMethod.POST)
	public ResponseDTO addEquipmesntInfo(@RequestBody Equipment equip) {
		return equipService.addEquipmentInfo(equip);
	}
	
	@RequestMapping(value="/updDevice",method=RequestMethod.POST)
	public ResponseDTO updEquipmentInfo(@RequestBody Equipment equip) {
		return equipService.updEquipmentInfo(equip);
	}
	
	@RequestMapping(value="/delDevice",method=RequestMethod.POST)
	public ResponseDTO delEquipmentInfo(@RequestBody Equipment equip) {
		return equipService.delEquipment(equip.getDeviceId());
	}
	
	@RequestMapping(value = "getQRCode")
	public void getQRCode(@RequestParam("qrCode") Integer qrCode, HttpServletResponse response) {
		QRCodeUtil.createQRCode(qrCode.toString(), response);
	}
	
	
}
