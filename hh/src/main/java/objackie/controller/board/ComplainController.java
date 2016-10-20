package objackie.controller.board;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import objackie.dao.ComplainDao;
import objackie.vo.Complain;
import objackie.vo.JsonResult;

@Controller
@RequestMapping("/complain/")
public class ComplainController {
 
  @Autowired
  ComplainDao complainDao;

  @RequestMapping(path = "list")
  public Object list(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "6") int length)
      throws Exception {

    try {
      HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);

      return JsonResult.success(complainDao.selectList(map));

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "add")
  public Object add(Complain complain) throws Exception {
    try {
      complainDao.insert(complain);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "detail")
  public Object detail(int no) throws Exception {
    try {
      Complain complain = complainDao.selectOne(no);

      if (complain == null)
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");

      return JsonResult.success(complain);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "update")
  public Object update(Complain complain) throws Exception {
    try {
      HashMap<String, Object> paramMap = new HashMap<>();
      paramMap.put("no", complain.getNo());
      paramMap.put("email", complain.getEmail());

      complainDao.update(complain);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "delete")
  public Object delete(int no) throws Exception {
    try {

      complainDao.delete(no);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
}
