package objackie.dao;

import objackie.vo.Member;

public interface JoinDao {
  int insert(Member member) throws Exception;
  int updatePhoto(Member member) throws Exception;
}



