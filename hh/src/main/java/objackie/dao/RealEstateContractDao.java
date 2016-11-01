 package objackie.dao;

import java.util.List;
import java.util.Map;

import objackie.vo.RealEstateContract;

public interface RealEstateContractDao {
  List<RealEstateContract> selectList1(Map<String,Object> paramMap) throws Exception;
  List<RealEstateContract> selectList2(Map<String,Object> paramMap) throws Exception;
  List<RealEstateContract> selectList3(Map<String,Object> paramMap) throws Exception;
  RealEstateContract selectOne(int no) throws Exception;
  int insert(RealEstateContract realEstateContract) throws Exception;
  int update(RealEstateContract realEstateContract) throws Exception;
  int delete(int no) throws Exception;
}








