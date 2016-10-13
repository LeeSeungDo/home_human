package objackie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import objackie.dao.JoinDao;
import objackie.vo.JsonResult;
import objackie.vo.Member;

@Controller
@RequestMapping("/member/")
public class JoinController {
  @Autowired
  JoinDao joinDao;

  @RequestMapping(path = "add")
  public Object add(Member member) throws Exception {
    try {
      System.out.println("?????");
      System.out.println(member);
      joinDao.insertMember(member);
      System.out.println("aaaa");
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}