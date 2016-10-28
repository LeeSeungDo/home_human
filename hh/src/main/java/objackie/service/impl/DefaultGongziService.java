package objackie.service.impl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.GongziDao;
import objackie.dao.GongziFileDao;
import objackie.service.GongziService;
import objackie.util.FileUploadUtil;
import objackie.vo.Gongzi;
import objackie.vo.GongziFile;

@Service
public class DefaultGongziService implements GongziService {

  @Autowired
  GongziDao gongziDao;
  @Autowired
  GongziFileDao gongziFileDao;

  @Override
  public void insertGongzi(Gongzi gongzi, MultipartFile file, String uploadDir) throws Exception {
    System.out.println("여기부터");
    try {
      gongziDao.insert(gongzi);

      String newFilename = null;
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        GongziFile gongziFile = new GongziFile();
        gongziFile.setFilename(newFilename);
        gongziFile.setGongziNo(gongzi.getNo());
        // boardFile.setBoardNo(10200); //트랜잭션 테스트 용
        gongziFileDao.insert(gongziFile);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("여기까지");
  }

}
