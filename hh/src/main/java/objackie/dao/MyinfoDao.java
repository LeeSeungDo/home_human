package objackie.dao;

import java.util.Map;

import objackie.vo.Member;

public interface MyinfoDao {
  Member selectOneByPassword(Map<String,Object> paramMap) throws Exception;
  int update(Member member) throws Exception;
  int delete(String email) throws Exception;
}
