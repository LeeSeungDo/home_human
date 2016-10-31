package objackie.controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import objackie.service.RealEstateContractService;
import objackie.vo.RealEstateContract;
import objackie.vo.JsonResult;

@Controller 
@RequestMapping("/contract/")
public class RealEstateContractController {
  
  @Autowired RealEstateContractService realEstateContractService;
     
  @RequestMapping(path="list1")
  public Object list1(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="12") int length) throws Exception {
    
    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList1(pageNo, length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
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
      @RequestParam(defaultValue="12") int length) throws Exception {
    
    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList2(pageNo, length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
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
      @RequestParam(defaultValue="12") int length) throws Exception {
    
    try {
      List<RealEstateContract> list = realEstateContractService.getRealEstateContractList3(pageNo, length);
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  public Object add(RealEstateContract realEstateContract) throws Exception {
    try {
      realEstateContractService.insertRealEstateContract(realEstateContract, null, null, null);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    try {
      RealEstateContract realEstateContract = realEstateContractService.getRealEstateContract(no);
      
      if (realEstateContract == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(realEstateContract);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="update")
  public Object update(RealEstateContract realEstateContract) throws Exception {
    try {
      if (realEstateContractService.getRealEstateContract(realEstateContract.getBuildNo()) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      realEstateContractService.updateRealEstateContract(realEstateContract);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  
  @RequestMapping(path="delete")
  public Object delete(int no) throws Exception {
    try {      
      if (realEstateContractService.getRealEstateContract(no) == null) {
        throw new Exception("해당 게시물이 없거나 암호가 일치하지 않습니다!");
      }
      realEstateContractService.deleteRealEstateContract(no);
      return JsonResult.success();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}



