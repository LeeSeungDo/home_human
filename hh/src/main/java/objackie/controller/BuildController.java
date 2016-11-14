package objackie.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import objackie.dao.BuildDao;
import objackie.vo.Build;
import objackie.vo.JsonResult;

@Controller
@RequestMapping("/build/")
public class BuildController {

  @Autowired BuildDao buildDao;

  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int length) throws Exception {

    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);

      return JsonResult.success(buildDao.selectList(map));

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="add")
  public Object add(Build build)throws Exception {
    try {
      buildDao.insert(build);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="detail")
  public Object detail(int buildNo) throws Exception {
    try {
      Build build = buildDao.selectOne(buildNo);

      if (build == null)
        throw new Exception("해당 번호의 건물이 존재하지 않습니다.");

      return JsonResult.success(build);

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="update")
  public Object update(Build build) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("buildNo", build.getBuildNo());
      paramMap.put("email", build.getEmail());

      buildDao.update(build);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="delete")
  public Object delete(int buildNo, String email) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("buildNo", buildNo);
      paramMap.put("email", email);

      if (buildDao.selectOne(buildNo) == null) {
        throw new Exception("해당 번호의 건물이 없거나 회원정보가 없습니다.");
      }
      buildDao.delete(buildNo);
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}
