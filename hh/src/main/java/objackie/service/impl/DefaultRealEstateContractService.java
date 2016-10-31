package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.RealEstateContractDao;
import objackie.dao.RealEstateContractFileDao;
import objackie.service.RealEstateContractService;
import objackie.util.FileUploadUtil;
import objackie.vo.RealEstateContract;
import objackie.vo.RealEstateContractFile;

@Service 
public class DefaultRealEstateContractService implements RealEstateContractService {
  @Autowired RealEstateContractDao realEstateContractDao;
  @Autowired RealEstateContractFileDao realEstateContractFileDao;
  
  public List<RealEstateContract> getRealEstateContractList1(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return realEstateContractDao.selectList1(map);
  }
  
  public List<RealEstateContract> getRealEstateContractList2(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return realEstateContractDao.selectList2(map);
  }
  
  public List<RealEstateContract> getRealEstateContractList3(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return realEstateContractDao.selectList3(map);
  }
  
  public void insertRealEstateContract(RealEstateContract realEstateContract, 
      MultipartFile file1,
      MultipartFile file2,
      String uploadDir) throws Exception {
    
    realEstateContractDao.insert(realEstateContract);
    
    String newFilename = null;
    if (file1 != null && !file1.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file1.getOriginalFilename());
      file1.transferTo(new File(uploadDir + newFilename));
      RealEstateContractFile realEstateContractFile = new RealEstateContractFile();
      realEstateContractFile.setPhopath(newFilename);
      realEstateContractFile.setNo(realEstateContract.getContractNo());
      //realEstateContractFile.setrealEstateContractNo(10200); //트랜잭션 테스트 용 
      realEstateContractFileDao.insert(realEstateContractFile);
    }
    
    if (file2 != null && !file2.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file2.getOriginalFilename());
      file2.transferTo(new File(uploadDir + newFilename));
      RealEstateContractFile realEstateContractFile = new RealEstateContractFile();
      realEstateContractFile.setPhopath(newFilename);
      realEstateContractFile.setNo(realEstateContract.getContractNo());
      realEstateContractFileDao.insert(realEstateContractFile);
    }
  }
  
  public RealEstateContract getRealEstateContract(int no) throws Exception {
    return realEstateContractDao.selectOne(no);
  }
    
    
  public void updateRealEstateContract(RealEstateContract realEstateContract) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("contractNo", realEstateContract.getContractNo());
    paramMap.put("tenantEmail", realEstateContract.getTenantEmail());
    
    realEstateContractDao.update(realEstateContract);
  }
  
  public void deleteRealEstateContract(int no) throws Exception {
    realEstateContractDao.delete(no);
  }

}







