package objackie.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import objackie.dao.MyinfoDao;
import objackie.vo.JsonResult;
import objackie.vo.Member;

@Controller
@RequestMapping("/auth/")
public class MyinfoController {

  @Autowired MyinfoDao myinfoDao;
  
  @RequestMapping(path="update")
  public Object update(Member member) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("email", member.getEmail());
      paramMap.put("password", member.getPassword());
      
      if (myinfoDao.selectOneByPassword(paramMap) == null) {
        throw new Exception("해당 회원정보가 없거나 암호가 일치하지 않습니다.");
      }
      myinfoDao.update(member);
      return JsonResult.success();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="delete")
  public Object delete(String email, String password) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("email", email);
      paramMap.put("password", password);
      
      if (myinfoDao.selectOneByPassword(paramMap) == null) {
        throw new Exception("해당 회원정보가 없거나 암호가 일치하지 않습니다.");
      }
      myinfoDao.delete(email);
      return JsonResult.success();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}
