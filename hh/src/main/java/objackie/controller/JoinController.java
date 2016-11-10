package objackie.controller;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.JoinDao;
import objackie.util.FileUploadUtil;
import objackie.vo.JsonResult;
import objackie.vo.Member;

@Controller
@RequestMapping("/auth/")
public class JoinController {
  @Autowired
  JoinDao joinDao;
  @Autowired
  ServletContext sc;

  @RequestMapping(path = "join")
  public Object add(Member member) throws Exception {
    // System.out.println("join컨트롤러에 들어옵니다.");
    // System.out.println(member.toString());
    try {
      joinDao.insert(member);
      // System.out.println("DB 들어간 후 출력");
      // System.out.println(member.toString());
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "updateFile")
  @ResponseBody
  public Object updateFile(@RequestParam("email") String email, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    String newFilename = null;

    try {
      if (file != null && !file.isEmpty()) {
        newFilename = FileUploadUtil.getNewFilename(file.getOriginalFilename());
        file.transferTo(new File(uploadDir + newFilename));
        Member member = new Member();
        member.setEmail(email);
        member.setPhoPath(newFilename);
        //System.out.println(member);
        joinDao.updatePhoto(member);
      }
      return JsonResult.success();
    } catch (Exception e) {
      // e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}
