package objackie.service.impl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.BoardDao;
import objackie.dao.BoardFileDao;
import objackie.service.BoardService;
import objackie.util.FileUploadUtil;
import objackie.vo.Board;
import objackie.vo.BoardFile;

@Service
public class DefaultBoardService implements BoardService {

  @Autowired
  BoardDao boardDao;
  @Autowired
  BoardFileDao boardFileDao;

  @Override
  public void insertBoard(Board board, MultipartFile file, String uploadDir) throws Exception {
    System.out.println("여기부터");
    try {
      boardDao.insert(board);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        BoardFile boardFile = new BoardFile();
        boardFile.setFilename(newFilename);
        boardFile.setBoardNo(board.getBoardNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        boardFileDao.insert(boardFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("여기까지");
  }

}
