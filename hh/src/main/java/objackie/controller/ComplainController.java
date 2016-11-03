package objackie.controller;

import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.ComplainDao;
import objackie.service.ComplainService;
import objackie.vo.Complain;
import objackie.vo.JsonResult;

@Controller 
@RequestMapping("/complain/")
public class ComplainController {
  
  @Autowired ServletContext sc;
  @Autowired ComplainService complainService;
  
  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length) throws Exception {
    
    try {
      List<Complain> list = complainService.getComplainList(pageNo, length);
      int totalPage = complainService.getTotalPage(length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="list2")
  public Object list2(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length,
      String email) throws Exception {
    
    try {
      List<Complain> list = complainService.getComplainListbyRsvd0(pageNo, length, email);
      int totalPage = complainService.getTotalPageRsvd0(length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="list3")
  public Object list3(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length,
      String email) throws Exception {
    
    try {
      List<Complain> list = complainService.getComplainListbyRsvd1(pageNo, length, email);
      int totalPage = complainService.getTotalPageRsvd1(length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  @RequestMapping(path="list4")
  public Object list4(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length,
      String email) throws Exception {
    
    try {
      List<Complain> list = complainService.getComplainListbyRsvd0_t(pageNo, length, email);
      int totalPage = complainService.getTotalPageRsvd0(length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="list5")
  public Object list5(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length,
      String email) throws Exception {
    
    try {
      List<Complain> list = complainService.getComplainListbyRsvd1_t(pageNo, length, email);
      int totalPage = complainService.getTotalPageRsvd1(length);
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  @ResponseBody
  public Object add(@ModelAttribute Complain complain, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    System.out.println("-----------------------파일 업로드--------------------------------");
    System.out.println(complain.getEmail());
    System.out.println(complain.getTitle());
    System.out.println(complain.getContents());
    System.out.println(file);
    System.out.println(uploadDir);
    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      complainService.insertComplain(complain, file, uploadDir);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      Complain complain = complainService.getComplain(no);
      
      if (complain == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(complain);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  } 
  
  @RequestMapping(path="update")
  public Object update(Complain complain) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", complain.getNo());
      paramMap.put("email", complain.getEmail());
      
      System.out.println(complain.getNo());
      System.out.println(complain.getTitle());
      System.out.println(complain.getContents());
      System.out.println(complain.getRsvd());
      System.out.println(complain.getEmail());
      complainService.updateComplain(complain);
      System.out.println("성공");
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  } 

  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {
      
      complainService.deleteComplain(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
}

