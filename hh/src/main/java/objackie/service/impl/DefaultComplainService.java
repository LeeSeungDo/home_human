package objackie.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.ComplainDao;
import objackie.dao.ComplainFileDao;
import objackie.service.ComplainService;
import objackie.util.FileUploadUtil;
import objackie.vo.Complain;
import objackie.vo.ComplainFile;

@Service 
public class DefaultComplainService implements ComplainService {
  @Autowired ComplainDao complainDao;
  @Autowired ComplainFileDao complainFileDao;
  
  public List<Complain> getComplainList(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return complainDao.selectList(map);
  }
  
  public List<Complain> getComplainListbyRsvd(int pageNo, int length) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);
    return complainDao.selectListbyRsvd(map);
  }
  
  public void insertComplain(Complain complain, 
      MultipartFile file, String uploadDir) throws Exception {
        
    complainDao.insert(complain);
    
    String newFilename = null;
    if (!file.isEmpty()) {
      newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        ComplainFile complainFile = new ComplainFile();
        complainFile.setFilename(newFilename);
        //complainFile.setComplainNo(complain.getNo());
        complainFile.setComplainNo(10200);
        complainFileDao.insert(complainFile);
       }
    
  }
  
  public Complain getComplain(int no) throws Exception {
    return complainDao.selectOne(no);
  }
  
  public void updateComplain(Complain complain) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no", complain.getNo());
    paramMap.put("email", complain.getEmail());

    complainDao.update(complain);
  }
  
  public void deleteComplain(int no) throws Exception {
    complainDao.delete(no);
  }
  
  public int getTotalPage(int pageSize) throws Exception {
    int countAll = complainDao.countAll();
    
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }

  public int getTotalPageRsvd(int pageSize) throws Exception {
    int countAllRsvd = complainDao.countAllRsvd();
    
    int totalPage = countAllRsvd / pageSize;
    if ((countAllRsvd % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }

 
}




