package com.jiabo.medical.controller.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jiabo.medical.entity.Contract;
import com.jiabo.medical.entity.Equipment;
import com.jiabo.medical.entity.Purchase;
import com.jiabo.medical.pojo.ResponseDTO;
import com.jiabo.medical.service.contract.ContractService;
import com.jiabo.medical.service.equip.EquipService;
import com.jiabo.medical.service.purchase.PurchaseService;

@RestController
@RequestMapping("/purchase")
public class PurchaseController {
	
	@Autowired
	private PurchaseService purchaseService;
	
	@RequestMapping(value="/getPurchaseList",method=RequestMethod.POST)
	public ResponseDTO getPurchaseInfos(Purchase pur) {
		return purchaseService.getPurchaseInfos(pur);
	}
	
	@RequestMapping(value="/getPurchaseInfo",method=RequestMethod.POST)
	public ResponseDTO getContractInfo(@RequestParam("purchaseId") int purchaseId) {
		return purchaseService.getPurchaseInfo(purchaseId);
	}
	
	@RequestMapping(value="/addPurchaseInfo",method=RequestMethod.POST)
	public ResponseDTO addPurchaseInfo(Purchase pur) {
		return purchaseService.addPurchaseInfo(pur);
	}
	
	@RequestMapping(value="/updPurchaseInfo",method=RequestMethod.POST)
	public ResponseDTO updPurchaseInfo(Purchase pur) {
		return purchaseService.updPurchaseInfo(pur);
	}
	
	@RequestMapping(value="/delPurchase",method=RequestMethod.POST)
	public ResponseDTO delPurchase(@RequestParam("purchaseId") int purchaseId) {
		return purchaseService.delPurchase(purchaseId);
	}
	
}
