package objackie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import objackie.dao.JoinDao;
import objackie.vo.JsonResult;
import objackie.vo.Member;

@Controller
@RequestMapping("/auth/")
public class JoinController {
  @Autowired
  JoinDao joinDao;

  @RequestMapping(path = "join")
  public Object add(Member member) throws Exception {
    try {
      joinDao.insert(member);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}



