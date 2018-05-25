package com.jiabo.medical.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;

import com.jiabo.medical.entity.Purchase;


@Mapper
public interface PurchaseMapper  {
	public int getPurchaseCount( Purchase purchase) throws DataAccessException;
	public List<Purchase> getPurchaseList( Purchase purchase) throws DataAccessException;
	public Purchase getPurchaseInfo( int purchaseId) throws DataAccessException;
	public int getSequenceNo() throws DataAccessException;
    public int addPurchaseInfo( Purchase purchase) throws DataAccessException;
    public int updPurchaseInfo(Purchase purchase) throws DataAccessException;
    public int delPurchase(int purchaseId) throws DataAccessException;  
}
