package objackie.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.ComplainDao;
import objackie.vo.Complain;

public interface ComplainService {
  
 List<Complain> getComplainList(int pageNo, int length) throws Exception;
 List<Complain> getComplainListbyRsvd(int pageNo, int length) throws Exception;
 void insertComplain(Complain complain, MultipartFile file, String uploadDir) throws Exception; 
 Complain getComplain(int no) throws Exception;
 int getTotalPage(int pageSize) throws Exception;
 int getTotalPageRsvd(int pageSize) throws Exception;
 void updateComplain(Complain complain) throws Exception;
 void deleteComplain(int no) throws Exception;
 
}



