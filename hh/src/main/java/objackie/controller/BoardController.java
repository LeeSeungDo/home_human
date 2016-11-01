package objackie.controller;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import objackie.dao.BoardDao;
import objackie.service.BoardService;
import objackie.vo.Board;
import objackie.vo.JsonResult;

@Controller 
@RequestMapping("/board/")
public class BoardController {
  
  @Autowired ServletContext sc;
  @Autowired BoardDao boardDao;
  @Autowired BoardService boardService;
  
  @RequestMapping(path="firstlist")
  public Object firstlist(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="1") int length) throws Exception {
    
    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(boardDao.selectList(map));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="6") int length) throws Exception {
    
    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(boardDao.selectList(map));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  @ResponseBody
  public Object add(@ModelAttribute Board board, MultipartFile file) throws Exception {
    String uploadDir = sc.getRealPath("/upload") + "/";
    System.out.println("-----------------------파일 업로드--------------------------------");
    System.out.println(board.getEmail());
    System.out.println(board.getTitle());
    System.out.println(board.getContents());
    System.out.println(file);
    System.out.println(uploadDir);
    System.out.println("-----------------------/파일 업로드--------------------------------");
    try {
      boardService.insertBoard(board, file, uploadDir);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      Board board = boardDao.selectOne(no);
      
      if (board == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(board);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="update")
  public Object update(Board board) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", board.getBoardNo());
      paramMap.put("email", board.getEmail());
        
      boardDao.update(board);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  
  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {      
      boardDao.delete(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}



