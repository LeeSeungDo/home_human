package objackie.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.RealEstateContract;

public interface RealEstateContractService {
  List<RealEstateContract> getRealEstateContractList(int pageNo, int length) throws Exception;
  void insertRealEstateContract(RealEstateContract realEstateContract, MultipartFile file1, MultipartFile file2, String uploadDir) throws Exception;
  RealEstateContract getRealEstateContract(int no) throws Exception;
  void updateRealEstateContract(RealEstateContract realEstateContract) throws Exception;
  void deleteRealEstateContract(int no) throws Exception;
}







