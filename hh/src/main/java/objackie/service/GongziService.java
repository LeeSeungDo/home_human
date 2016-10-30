package objackie.service;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.Gongzi;

public interface GongziService {
  
 void insertGongzi(Gongzi gongzi, MultipartFile file, String uploadDir) throws Exception; 
 
}



