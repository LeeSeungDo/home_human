package objackie.service; 

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.Complain;

public interface ComplainService {
  
 List<Complain> getComplainList(int pageNo, int length) throws Exception;
 List<Complain> getComplainListbyRsvd0(int pageNo, int length, String email) throws Exception;
 List<Complain> getComplainListbyRsvd1(int pageNo, int length, String email) throws Exception;
 List<Complain> getComplainListbyRsvd0_t(int pageNo, int length, String email) throws Exception;
 List<Complain> getComplainListbyRsvd1_t(int pageNo, int length, String email) throws Exception;
 void insertComplain(Complain complain, MultipartFile file, String uploadDir) throws Exception; 
 Complain getComplain(int no) throws Exception;
 int getTotalPage(int pageSize) throws Exception;
 int getTotalPageRsvd0(int pageSize) throws Exception;
 int getTotalPageRsvd1(int pageSize) throws Exception;
 void updateComplain(Complain complain) throws Exception;
 void deleteComplain(int no) throws Exception;
 
}



