package example.dao;

import java.util.List;
import java.util.Map;

import example.vo.Notice;

public interface NoticeDao {
  List<Notice> selectList(Map<String,Object> paramMap) throws Exception;
  Notice selectOne(int no) throws Exception;
  Notice selectOneByPassword(Map<String,Object> paramMap) throws Exception;
  int insert(Notice notice) throws Exception;
  int update(Notice notice) throws Exception;
  int delete(int no) throws Exception;
}








