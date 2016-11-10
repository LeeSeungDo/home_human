package objackie.dao;

import objackie.vo.RealEstateContractFile;

public interface RealEstateContractFileDao {
  int insert(RealEstateContractFile realEstateContractFile);
  int delete(int no) throws Exception;
}