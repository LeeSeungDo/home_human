package objackie.dao.auth;

import java.util.List;
import java.util.Map;

import objackie.vo.Complain;

public interface ComplainDao {
  List<ComplainDao> selectList(Map<String,Object> paramMap) throws Exception;
  Complain selectOne(int no) throws Exception;
  Complain selectOneByPassword(Map<String,Object> paramMap) throws Exception;
  int insert(Complain complain) throws Exception;
  int update(Complain complain) throws Exception;
  int delete(int no) throws Exception;
}








