package objackie.service;

import org.springframework.web.multipart.MultipartFile;

import objackie.vo.Board;

public interface BoardService {
  
 void insertBoard(Board board, MultipartFile file, String uploadDir) throws Exception; 
 
}



