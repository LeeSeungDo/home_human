package objackie.dao;

import objackie.vo.FreeBoardFile;

public interface FreeBoardFileDao {
  int insert(FreeBoardFile freeboardFile);
  int delete(int no) throws Exception;
}