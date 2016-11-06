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
  
  public void insertRealEstateContract(RealEstateContract realEstateContract, MultipartFile file,
      String uploadDir) throws Exception {
    
    try{
      
    realEstateContractDao.insert(realEstateContract);
    
    String newFilename = null;
    if (file != null && !file.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
      file.transferTo(new File(uploadDir + newFilename));
      RealEstateContract realEstateContractFile = new RealEstateContract();
      realEstateContractFile.setContractPhoto(newFilename);
      realEstateContractFile.setContractNo(realEstateContract.getContractNo());
      //realEstateContractFile.setrealEstateContractNo(10200); //트랜잭션 테스트 용 
      realEstateContractDao.insert(realEstateContractFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("여기까지");
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







